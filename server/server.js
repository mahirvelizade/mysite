const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');
const { PDFDocument } = require('pdf-lib');

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_FILE_SIZE = 70 * 1024 * 1024;
const MAX_QUEUE = 1;
const JOB_TIMEOUT = 120_000;
const CLEANUP_INTERVAL = 5 * 60_000;
const TEMP_DIR = path.join(__dirname, 'tmp');

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

const GS_PRESETS = { low: '/screen', medium: '/ebook', high: '/printer' };
const HAS_GS = (() => { try { return require('child_process').execSync('which gs', { stdio:'pipe' }).toString().trim().length > 0; } catch { return false; }})();

let processing = false;
let queue = [];

function cleanup() {
  const cutoff = Date.now() - 10 * 60_000;
  fs.readdir(TEMP_DIR, (_, files) => {
    for (const f of files) {
      const fp = path.join(TEMP_DIR, f);
      try { const s = fs.statSync(fp); if (s.isFile() && s.mtimeMs < cutoff) fs.unlinkSync(fp); } catch {}
    }
  });
}
setInterval(cleanup, CLEANUP_INTERVAL);

const storage = multer.diskStorage({
  destination: TEMP_DIR,
  filename: (req, file, cb) => cb(null, `upload_${uuidv4()}${path.extname(file.originalname) || '.pdf'}`),
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') return cb(new Error('Only PDF files are accepted.'));
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

function sendResult(res, originalSize, outputPath, originalName) {
  let compressedSize;
  try { compressedSize = fs.statSync(outputPath).size; } catch { return void res.status(500).json({ error: 'Compression failed — no output produced.' }); }
  const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
  const token = uuidv4();
  fs.writeFileSync(path.join(TEMP_DIR, `${token}.meta`), JSON.stringify({ outputPath, originalName }));
  res.json({ success: true, originalSize, compressedSize, ratio: parseFloat(ratio), downloadToken: token, filename: originalName.replace(/\.pdf$/i, '_compressed.pdf') });
}

async function compressWithPdfLib(inputPath, outputPath) {
  const buf = fs.readFileSync(inputPath);
  const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const out = await doc.save({ useObjectStreams: true });
  fs.writeFileSync(outputPath, out);
}

function compressWithGS(inputPath, outputPath, preset) {
  return new Promise((resolve, reject) => {
    const child = execFile('gs', [
      '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.4', `-dPDFSETTINGS=${preset}`,
      '-dNOPAUSE', '-dQUIET', '-dBATCH', `-sOutputFile=${outputPath}`, inputPath,
    ], { timeout: JOB_TIMEOUT }, (err) => {
      err ? reject(err) : resolve();
    });
  });
}

async function runJob(req, res, quality, id) {
  const file = req.file;
  if (!file) { processing = false; res.status(400).json({ error: 'No file uploaded.' }); processQueue(); return; }

  const originalSize = file.size;
  const outputPath = path.join(TEMP_DIR, `compressed_${id}.pdf`);

  try {
    if (HAS_GS) {
      await compressWithGS(file.path, outputPath, GS_PRESETS[quality] || GS_PRESETS.medium);
    } else {
      await compressWithPdfLib(file.path, outputPath);
    }
    fs.unlink(file.path, () => {});
    sendResult(res, originalSize, outputPath, file.originalname);
  } catch (err) {
    fs.unlink(file.path, () => {});
    try { fs.unlinkSync(outputPath); } catch {}
    if (err.killed) {
      res.status(504).json({ error: 'Compression timed out. Try a smaller file or lower quality.' });
    } else {
      res.status(500).json({ error: 'Compression failed. The PDF may be corrupted or protected.' });
    }
  }

  processing = false;
  processQueue();
}

app.post('/api/compress', (req, res) => {
  upload.single('pdf')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) return res.status(413).json({ error: err.code === 'LIMIT_FILE_SIZE' ? 'File exceeds 70MB limit.' : err.message });
      return res.status(400).json({ error: err.message });
    }
    const id = uuidv4();
    const quality = req.body.quality || 'medium';
    if (queue.length >= MAX_QUEUE && processing) { fs.unlink(req.file.path, () => {}); return res.status(503).json({ error: 'Server busy. Please try again in a moment.' }); }
    queue.push({ req, res, quality, id });
    processQueue();
  });
});

app.get('/api/download/:token', (req, res) => {
  const metaPath = path.join(TEMP_DIR, `${req.params.token}.meta`);
  if (!fs.existsSync(metaPath)) return res.status(404).json({ error: 'File expired or not found.' });
  let meta;
  try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')); } catch { return res.status(500).json({ error: 'Metadata read error.' }); }
  if (!fs.existsSync(meta.outputPath)) { fs.unlink(metaPath, () => {}); return res.status(404).json({ error: 'File already deleted.' }); }
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
  console.log(`PDF Compressor running on port ${PORT}`);
  console.log(`Temp: ${TEMP_DIR}`);
  console.log(`Max: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  console.log(`Timeout: ${JOB_TIMEOUT / 1000}s`);
  console.log(`Engine: ${HAS_GS ? 'Ghostscript' : 'pdf-lib (install Ghostscript for better compression)'}`);
});
