const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_FILE_SIZE = 70 * 1024 * 1024; // 70MB
const MAX_QUEUE = 1;
const JOB_TIMEOUT = 120_000;
const CLEANUP_INTERVAL = 5 * 60_000;
const TEMP_DIR = path.join(__dirname, 'tmp');

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

const GS_PRESETS = {
  low: '/screen',
  medium: '/ebook',
  high: '/printer',
};

let processing = false;
let queue = [];

function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 200);
}

function cleanup() {
  const cutoff = Date.now() - 10 * 60_000;
  fs.readdir(TEMP_DIR, (_, files) => {
    for (const f of files) {
      const fp = path.join(TEMP_DIR, f);
      try {
        const stat = fs.statSync(fp);
        if (stat.isFile() && stat.mtimeMs < cutoff) fs.unlinkSync(fp);
      } catch {}
    }
  });
}
setInterval(cleanup, CLEANUP_INTERVAL);

const storage = multer.diskStorage({
  destination: TEMP_DIR,
  filename: (req, file, cb) => {
    const id = uuidv4();
    const ext = path.extname(file.originalname) || '.pdf';
    cb(null, `upload_${id}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Only PDF files are accepted.'));
      return;
    }
    cb(null, true);
  },
});

app.use(cors());
app.use(express.json());

function processQueue() {
  if (processing || queue.length === 0) return;
  processing = true;
  const { req, res, quality, id } = queue.shift();
  runJob(req, res, quality, id);
}

function runJob(req, res, quality, id) {
  const file = req.file;
  if (!file) {
    processing = false;
    res.status(400).json({ error: 'No file uploaded.' });
    processQueue();
    return;
  }

  const originalSize = file.size;
  const outputName = `compressed_${id}.pdf`;
  const outputPath = path.join(TEMP_DIR, outputName);
  const preset = GS_PRESETS[quality] || GS_PRESETS.medium;

  const gsArgs = [
    '-sDEVICE=pdfwrite',
    '-dCompatibilityLevel=1.4',
    `-dPDFSETTINGS=${preset}`,
    '-dNOPAUSE',
    '-dQUIET',
    '-dBATCH',
    `-sOutputFile=${outputPath}`,
    file.path,
  ];

  const child = execFile('gs', gsArgs, { timeout: JOB_TIMEOUT }, (err) => {
    fs.unlink(file.path, () => {});

    if (err) {
      if (err.killed) {
        res.status(504).json({ error: 'Compression timed out. Try a smaller file or lower quality.' });
      } else {
        res.status(500).json({ error: 'Compression failed. The PDF may be corrupted or protected.' });
      }
      try { fs.unlinkSync(outputPath); } catch {}
      processing = false;
      processQueue();
      return;
    }

    let compressedSize;
    try {
      compressedSize = fs.statSync(outputPath).size;
    } catch {
      res.status(500).json({ error: 'Compression failed — no output produced.' });
      processing = false;
      processQueue();
      return;
    }

    const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    const downloadToken = uuidv4();
    const metaPath = path.join(TEMP_DIR, `${downloadToken}.meta`);
    fs.writeFileSync(metaPath, JSON.stringify({ outputPath, originalName: file.originalname }));

    res.json({
      success: true,
      originalSize,
      compressedSize,
      ratio: parseFloat(ratio),
      downloadToken,
      filename: file.originalname.replace(/\.pdf$/i, '_compressed.pdf'),
    });

    processing = false;
    processQueue();
  });
}

app.post('/api/compress', (req, res) => {
  upload.single('pdf')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ error: 'File exceeds 70MB limit.' });
        }
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: err.message });
    }

    const id = uuidv4();
    const quality = req.body.quality || 'medium';

    if (queue.length >= MAX_QUEUE && processing) {
      fs.unlink(req.file.path, () => {});
      return res.status(503).json({ error: 'Server busy. Please try again in a moment.' });
    }

    queue.push({ req, res, quality, id });
    processQueue();
  });
});

app.get('/api/download/:token', (req, res) => {
  const metaPath = path.join(TEMP_DIR, `${req.params.token}.meta`);
  if (!fs.existsSync(metaPath)) {
    return res.status(404).json({ error: 'File expired or not found.' });
  }

  let meta;
  try {
    meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch {
    return res.status(500).json({ error: 'Metadata read error.' });
  }

  if (!fs.existsSync(meta.outputPath)) {
    fs.unlink(metaPath, () => {});
    return res.status(404).json({ error: 'File already deleted.' });
  }

  res.download(meta.outputPath, meta.originalName.replace(/\.pdf$/i, '_compressed.pdf'), () => {
    fs.unlink(meta.outputPath, () => {});
    fs.unlink(metaPath, () => {});
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`PDF Compressor server running on port ${PORT}`);
  console.log(`Temp directory: ${TEMP_DIR}`);
  console.log(`Max file size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  console.log(`Job timeout: ${JOB_TIMEOUT / 1000}s`);
});
