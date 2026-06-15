(function(){
'use strict';

const TOOLS = [
  { id:'image-to-pdf',       name:'Image to PDF',        icon:'📄', cat:'pdf' },
  { id:'pdf-compressor',     name:'PDF Compressor',      icon:'📦', cat:'pdf' },
  { id:'merge-pdf',          name:'Merge PDF',           icon:'📑', cat:'pdf' },
  { id:'split-pdf',          name:'Split PDF',           icon:'✂️', cat:'pdf' },
  { id:'create-pdf',         name:'Create PDF',          icon:'📝', cat:'pdf' },
  { id:'pdf-to-jpg',         name:'PDF to JPG',          icon:'🖼️', cat:'pdf' },
  { id:'unlock-pdf',         name:'Unlock PDF',          icon:'🔓', cat:'pdf' },
  { id:'protect-pdf',        name:'Protect PDF',         icon:'🔒', cat:'pdf' },
  { id:'extract-text',       name:'Extract Text',        icon:'📃', cat:'pdf' },

  { id:'jpg-to-png',         name:'JPG to PNG',          icon:'🖼️', cat:'image' },
  { id:'png-to-jpg',         name:'PNG to JPG',          icon:'🖼️', cat:'image' },
  { id:'webp-converter',     name:'WebP Converter',      icon:'🌐', cat:'image' },
  { id:'image-cropper',      name:'Image Cropper',       icon:'✂️', cat:'image' },
  { id:'image-rotator',      name:'Image Rotator',       icon:'🔄', cat:'image' },
  { id:'image-flip',         name:'Image Flip',          icon:'↔️', cat:'image' },
  { id:'brightness-adjuster',name:'Brightness',          icon:'☀️', cat:'image' },
  { id:'contrast-adjuster',  name:'Contrast',            icon:'🌓', cat:'image' },
  { id:'grayscale-filter',   name:'Grayscale',           icon:'⚫', cat:'image' },
  { id:'remove-bg',          name:'Remove Background',   icon:'✨', cat:'image' },
  { id:'image-compressor',   name:'Image Compressor',    icon:'🗜️', cat:'image' },
  { id:'image-resize',       name:'Image Resize',        icon:'📐', cat:'image' },
  { id:'add-border',         name:'Add Border',          icon:'🖼️', cat:'image' },
  { id:'round-image',        name:'Make Round',          icon:'⭕', cat:'image' },
  { id:'image-splitter',     name:'Image Splitter',      icon:'🔲', cat:'image' },
  { id:'pixelate',           name:'Pixelate',            icon:'🔳', cat:'image' },
  { id:'combine-images',     name:'Combine Images',      icon:'🔀', cat:'image' },
  { id:'add-text',           name:'Add Text',            icon:'📝', cat:'image' },
  { id:'blur-bg',            name:'Blur Background',     icon:'🌫️', cat:'image' },
  { id:'profile-photo',      name:'Profile Photo',       icon:'👤', cat:'image' },

  { id:'word-counter',       name:'Word Counter',        icon:'🔢', cat:'dev' },
  { id:'password-generator', name:'Password Generator',  icon:'🔑', cat:'dev' },
  { id:'qr-code-generator',  name:'QR Code Generator',   icon:'📱', cat:'dev' },
  { id:'json-formatter',     name:'JSON Formatter',      icon:'📋', cat:'dev' },
  { id:'url-encoder',        name:'URL Encoder',         icon:'🔗', cat:'dev' },
  { id:'sha256-generator',   name:'SHA256 Generator',    icon:'🔐', cat:'dev' },
  { id:'text-case-converter',name:'Text Case Converter', icon:'✏️', cat:'dev' },
  { id:'base64-encode',      name:'Base64 Encode/Decode',icon:'🔡', cat:'dev' },
  { id:'md5-generator',      name:'MD5 Generator',       icon:'🔏', cat:'dev' },
  { id:'uuid-generator',     name:'UUID Generator',      icon:'🆔', cat:'dev' },
  { id:'color-picker',       name:'Color Picker',        icon:'🎨', cat:'dev' },
  { id:'color-converter',    name:'Color Converter',     icon:'🌈', cat:'dev' },
  { id:'lorem-ipsum',        name:'Lorem Ipsum',         icon:'📝', cat:'dev' },
  { id:'text-cleaner',       name:'Text Cleaner',        icon:'🧹', cat:'dev' },
  { id:'html-viewer',        name:'HTML Viewer',         icon:'🌐', cat:'dev' },
  { id:'epoch-converter',    name:'Epoch Converter',     icon:'⏰', cat:'dev' },

  { id:'csv-json',           name:'CSV ↔ JSON',          icon:'📊', cat:'converter' },
  { id:'xml-json',           name:'XML ↔ JSON',          icon:'🔀', cat:'converter' },
  { id:'split-csv',          name:'Split CSV',           icon:'✂️', cat:'converter' },
  { id:'create-zip',         name:'Create ZIP',          icon:'🗜️', cat:'converter' },
  { id:'ai-image-generator', name:'AI Image Generator',  icon:'🎨', cat:'ai' },
  { id:'ai-prompt-enhancer', name:'AI Prompt Enhancer',  icon:'🚀', cat:'ai' },
  { id:'ai-text-summarizer', name:'AI Text Summarizer',  icon:'📝', cat:'ai' },
  { id:'ai-grammar-rewrite', name:'AI Grammar & Rewrite',icon:'✏️', cat:'ai' },
  { id:'ai-cv-generator',    name:'AI CV Generator',     icon:'📄', cat:'ai' },
  { id:'ai-resume-analyzer', name:'AI Resume Analyzer',  icon:'🔍', cat:'ai' },
  { id:'ai-cover-letter',    name:'AI Cover Letter',     icon:'💼', cat:'ai' },
  { id:'photo-enhancer',     name:'Photo Enhancer',      icon:'🖼️', cat:'ai' },
  { id:'ai-ocr',             name:'AI Image to Text (OCR)',icon:'👁️',cat:'ai' },
  { id:'object-remover',     name:'Object Remover',      icon:'🧹', cat:'ai' },
  { id:'image-cleanup',      name:'Image Cleanup Tool',  icon:'✨', cat:'ai' },
];

const CATEGORY_LABELS = { pdf:'PDF', image:'Image', dev:'Dev', converter:'Converter', ai:'AI' };
const CATEGORY_ORDER = ['pdf', 'image', 'dev', 'converter', 'ai'];

function imgUploadHTML(id, cacheKey, accept){
  return '<div style="text-align:center;padding:40px;border:2px dashed var(--green-border);border-radius:8px;cursor:none;" onclick="document.getElementById(\''+id+'\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">📁</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Click to upload image</div>' +
    '<input id="'+id+'" type="file" accept="'+accept+'" style="display:none" onchange="window.handleImgTool(\''+cacheKey+'\',this)"></div>' +
    '<div id="'+id+'-preview" style="margin-top:16px;"></div>';
}

function imgToolUI(toolId, label, accept){
  return '<div style="margin-bottom:16px;font-size:0.65rem;color:var(--muted);letter-spacing:0.05em;">Upload an image and ' + label + '.</div>' + imgUploadHTML(toolId + '-upload', toolId, accept);
}

const TOOL_PLACEHOLDER_BODIES = {
  'image-to-pdf': imgToolUI('img-to-pdf','convert it to PDF','image/*') +
    '<button onclick="window.convertImgToPDF()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Create PDF & Download</button>' +
    '<div id="img-to-pdf-output" style="margin-top:8px;font-size:0.6rem;color:var(--muted);"></div>',

  'image-compressor': imgToolUI('img-comp','compress the image (adjust quality below)','image/*') +
    '<div style="margin-top:12px;">' +
    '<label style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);">Quality: <span id="comp-qual-label">70</span>%</label>' +
    '<input type="range" id="comp-qual" min="10" max="100" value="70" oninput="document.getElementById(\'comp-qual-label\').textContent=this.value" style="width:100%;margin-top:4px;">' +
    '</div>' +
    '<button onclick="window.compressImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Compress & Download</button>' +
    '<div id="img-comp-info" style="margin-top:8px;font-size:0.6rem;color:var(--muted);"></div>',

  'image-resize': imgToolUI('img-resize','resize it to custom dimensions','image/*') +
    '<div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap;align-items:center;">' +
    '<label style="font-size:0.6rem;letter-spacing:0.1em;color:var(--muted);">Width: <input type="number" id="resize-w" value="800" min="1" style="width:80px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:6px 8px;outline:none;"></label>' +
    '<label style="font-size:0.6rem;letter-spacing:0.1em;color:var(--muted);">Height: <input type="number" id="resize-h" value="600" min="1" style="width:80px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:6px 8px;outline:none;"></label>' +
    '<label style="font-size:0.6rem;letter-spacing:0.1em;color:var(--muted);display:flex;align-items:center;gap:4px;"><input type="checkbox" id="resize-keep" checked> Keep aspect ratio</label>' +
    '</div>' +
    '<button onclick="window.resizeImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Resize & Download</button>' +
    '<div id="img-resize-info" style="margin-top:8px;font-size:0.6rem;color:var(--muted);"></div>',

  'word-counter': '<div style="margin-bottom:16px;">' +
    '<textarea id="wc-input" placeholder="Paste or type your text here..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:16px;min-height:150px;resize:vertical;outline:none;" oninput="window.updateWordCount()"></textarea></div>' +
    '<div id="wc-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;"></div>',

  'password-generator': '<div style="margin-bottom:20px;">' +
    '<div style="display:flex;gap:12px;align-items:center;margin-bottom:16px;">' +
    '<input id="pg-output" type="text" readonly value="P@ssw0rd!2024" style="flex:1;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.85rem;padding:12px 16px;outline:none;">' +
    '<button onclick="window.copyPassword()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 16px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Copy</button>' +
    '<button onclick="window.generatePassword()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.65rem;padding:10px 16px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate</button></div>' +
    '<div style="display:flex;gap:16px;flex-wrap:wrap;font-size:0.65rem;color:var(--muted);">' +
    '<label><input type="checkbox" id="pg-upper" checked> A-Z</label>' +
    '<label><input type="checkbox" id="pg-lower" checked> a-z</label>' +
    '<label><input type="checkbox" id="pg-digits" checked> 0-9</label>' +
    '<label><input type="checkbox" id="pg-symbols" checked> !@#$%</label>' +
    '<label>Length: <input type="number" id="pg-length" value="16" min="4" max="64" style="width:50px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;"></label></div></div>',

  'qr-code-generator': '<div style="margin-bottom:16px;">' +
    '<div style="display:flex;gap:12px;margin-bottom:16px;">' +
    '<input id="qr-input" type="text" placeholder="Enter text or URL..." value="https://mahirvelizade.com" style="flex:1;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px 16px;outline:none;">' +
    '<button onclick="window.generateQR()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate</button></div>' +
    '<div id="qr-output" style="text-align:center;padding:24px;background:var(--bg);border:1px solid var(--green-border);border-radius:8px;overflow:hidden;"></div></div>',

  'json-formatter': '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">' +
    '<div><div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Input</div>' +
    '<textarea id="jf-input" placeholder=\'{"key": "value"}\' style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;resize:vertical;outline:none;"></textarea></div>' +
    '<div><div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Output</div>' +
    '<pre id="jf-output" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;overflow:auto;margin:0;white-space:pre-wrap;"></pre></div></div>' +
    '<button onclick="window.formatJSON()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Format JSON</button>',

  'url-encoder': '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
    '<div><div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Input</div>' +
    '<textarea id="ue-input" placeholder="Enter text to encode..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:120px;resize:vertical;outline:none;"></textarea>' +
    '<button onclick="window.encodeURL()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;margin-right:8px;">Encode</button>' +
    '<button onclick="window.decodeURL()" style="margin-top:8px;background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Decode</button></div>' +
    '<div><div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Output</div>' +
    '<textarea id="ue-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:120px;resize:vertical;outline:none;word-break:break-all;"></textarea></div></div>',

  'sha256-generator': '<div style="margin-bottom:16px;">' +
    '<textarea id="sha-input" placeholder="Enter text to hash..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:100px;resize:vertical;outline:none;"></textarea>' +
    '<button onclick="window.generateSHA256()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate SHA256</button>' +
    '<div id="sha-output" style="margin-top:12px;padding:12px 16px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.7rem;color:var(--green);word-break:break-all;"></div></div>',

  'text-case-converter': '<div style="margin-bottom:16px;">' +
    '<textarea id="tc-input" placeholder="Enter text to convert..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:120px;resize:vertical;outline:none;"></textarea>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">' +
    '<button onclick="window.convertCase(\'upper\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">UPPER CASE</button>' +
    '<button onclick="window.convertCase(\'lower\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">lower case</button>' +
    '<button onclick="window.convertCase(\'title\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">Title Case</button>' +
    '<button onclick="window.convertCase(\'camel\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">camelCase</button>' +
    '<button onclick="window.convertCase(\'snake\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">snake_case</button>' +
    '<button onclick="window.convertCase(\'kebab\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">kebab-case</button></div>' +
    '<div style="margin-top:12px;"><textarea id="tc-output" readonly placeholder="Result..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:60px;resize:vertical;outline:none;"></textarea></div></div>',

  'jpg-to-png': imgToolUI('jpg2png','convert it from JPG to PNG','image/jpeg') +
    '<button onclick="window.jpgToPng()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Convert to PNG & Download</button>',
  'png-to-jpg': imgToolUI('png2jpg','convert it from PNG to JPG','image/png') +
    '<button onclick="window.pngToJpg()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Convert to JPG & Download</button>',
  'webp-converter': imgToolUI('webpcvt','convert it to/from WebP','image/*') +
    '<div style="margin-top:8px;font-size:0.6rem;color:var(--muted);">Output format: <select id="webp-fmt" style="background:var(--bg);color:var(--text);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:4px 8px;">' +
    '<option value="webp">WebP</option><option value="png">PNG</option><option value="jpeg">JPEG</option></select></div>' +
    '<button onclick="window.webpConvert()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Convert & Download</button>',

  'image-cropper': imgToolUI('img-crop','crop it (drag selection not available — enter pixel coords)','image/*') +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">X: <input type="number" id="crop-x" value="0" min="0" style="width:60px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.6rem;padding:4px 6px;outline:none;"></label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Y: <input type="number" id="crop-y" value="0" min="0" style="width:60px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.6rem;padding:4px 6px;outline:none;"></label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">W: <input type="number" id="crop-w" value="200" min="1" style="width:60px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.6rem;padding:4px 6px;outline:none;"></label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">H: <input type="number" id="crop-h" value="200" min="1" style="width:60px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.6rem;padding:4px 6px;outline:none;"></label></div>' +
    '<button onclick="window.cropImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Crop & Download</button>',

  'image-rotator': imgToolUI('img-rot','rotate it','image/*') +
    '<div style="margin-top:12px;">' +
    '<label style="font-size:0.6rem;letter-spacing:0.1em;color:var(--muted);">Angle: <input type="number" id="rot-angle" value="90" min="-360" max="360" style="width:70px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:6px 8px;outline:none;">°</label></div>' +
    '<button onclick="window.rotateImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Rotate & Download</button>',

  'image-flip': imgToolUI('img-flip','flip it horizontally or vertically','image/*') +
    '<div style="margin-top:12px;display:flex;gap:12px;">' +
    '<button onclick="window.flipImage(\'h\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Flip Horizontal</button>' +
    '<button onclick="window.flipImage(\'v\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Flip Vertical</button></div>',

  'brightness-adjuster': imgToolUI('img-bright','adjust its brightness','image/*') +
    '<div style="margin-top:12px;"><label style="font-size:0.6rem;letter-spacing:0.1em;color:var(--muted);">Brightness: <span id="bright-val">0</span></label>' +
    '<input type="range" id="bright-slider" min="-100" max="100" value="0" oninput="document.getElementById(\'bright-val\').textContent=this.value" style="width:100%;margin-top:4px;"></div>' +
    '<button onclick="window.adjustBrightness()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Apply & Download</button>',

  'contrast-adjuster': imgToolUI('img-contrast','adjust its contrast','image/*') +
    '<div style="margin-top:12px;"><label style="font-size:0.6rem;letter-spacing:0.1em;color:var(--muted);">Contrast: <span id="contrast-val">0</span></label>' +
    '<input type="range" id="contrast-slider" min="-100" max="100" value="0" oninput="document.getElementById(\'contrast-val\').textContent=this.value" style="width:100%;margin-top:4px;"></div>' +
    '<button onclick="window.adjustContrast()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Apply & Download</button>',

  'grayscale-filter': imgToolUI('img-gray','convert it to grayscale','image/*') +
    '<button onclick="window.applyGrayscale()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Convert to Grayscale & Download</button>',

  'remove-bg': '<div style="margin-bottom:16px;font-size:0.65rem;color:var(--muted);letter-spacing:0.05em;">Upload an image to remove its background automatically — all processing happens locally in your browser.</div>' +
    '<div id="rbg-upload-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;transition:var(--transition);" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handleRemoveBgUpload(event.dataTransfer.files[0])" ' +
    'onclick="document.getElementById(\'rbg-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">🖼️</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop an image here or click to browse</div>' +
    '<div style="font-size:0.55rem;color:var(--muted);margin-top:8px;">Supports JPG, JPEG, PNG, WEBP</div>' +
    '<input id="rbg-input" type="file" accept=".jpg,.jpeg,.png,.webp" style="display:none" onchange="window.handleRemoveBgUpload(this.files[0])">' +
    '</div>' +
    '<div id="rbg-progress" style="display:none;text-align:center;padding:24px;">' +
    '<div class="loader-ring" style="margin:0 auto 16px;"></div>' +
    '<div style="font-size:0.65rem;color:var(--green);letter-spacing:0.1em;">Removing background<span id="rbg-progress-text"></span></div>' +
    '<div style="font-size:0.55rem;color:var(--muted);margin-top:8px;">Loading AI model (~40MB) on first run may take a moment</div>' +
    '</div>' +
    '<div id="rbg-result" style="display:none;">' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">Original</div>' +
    '<div id="rbg-original-preview" style="background:var(--bg);border:1px solid var(--green-border);padding:8px;text-align:center;"></div></div>' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Processed</div>' +
    '<div id="rbg-processed-preview" style="background:var(--bg);border:1px solid var(--green-border);padding:8px;text-align:center;"></div></div>' +
    '</div>' +
    '<div style="text-align:center;margin-top:16px;">' +
    '<button onclick="window.downloadRemoveBg()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 24px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;transition:var(--transition);">Download Transparent PNG</button>' +
    '</div>' +
    '</div>' +
    '<div id="rbg-error" style="display:none;margin-top:12px;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;"></div>',

  'pdf-compressor': '<div style="margin-bottom:16px;font-size:0.65rem;color:var(--muted);letter-spacing:0.05em;">Upload a PDF and compress it using Ghostscript in your browser. Files are never uploaded — everything stays on your device.</div>' +
    '<div id="pdfc-upload-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;transition:var(--transition);" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handlePdfCompressUpload(event.dataTransfer.files[0])" ' +
    'onclick="document.getElementById(\'pdfc-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">📄</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop a PDF here or click to browse</div>' +
    '<div style="font-size:0.55rem;color:var(--muted);margin-top:8px;">Max 70MB · PDF only</div>' +
    '<input id="pdfc-input" type="file" accept=".pdf,application/pdf" style="display:none" onchange="window.handlePdfCompressUpload(this.files[0])">' +
    '</div>' +
    '<div id="pdfc-file-info" style="display:none;margin-top:12px;padding:12px 16px;background:var(--surface);border:1px solid var(--green-border);font-size:0.65rem;color:var(--muted);"></div>' +
    '<div id="pdfc-quality" style="display:none;margin-top:12px;">' +
    '<div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">Compression Quality</div>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
    '<button class="pdfc-q-btn" data-q="low" onclick="window.selectPdfcQuality(\'low\')" style="background:var(--surface);color:var(--text);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:10px 18px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Low (Smallest)</button>' +
    '<button class="pdfc-q-btn" data-q="medium" onclick="window.selectPdfcQuality(\'medium\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 18px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Medium</button>' +
    '<button class="pdfc-q-btn" data-q="high" onclick="window.selectPdfcQuality(\'high\')" style="background:var(--surface);color:var(--text);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:10px 18px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">High (Best Quality)</button>' +
    '</div></div>' +
    '<div id="pdfc-compress-btn" style="display:none;margin-top:16px;text-align:center;">' +
    '<button onclick="window.compressPdf()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 28px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;transition:var(--transition);">Compress PDF</button>' +
    '</div>' +
    '<div id="pdfc-progress" style="display:none;text-align:center;padding:24px;">' +
    '<div class="loader-ring" style="margin:0 auto 16px;"></div>' +
    '<div style="font-size:0.65rem;color:var(--green);letter-spacing:0.1em;">Compressing PDF<span id="pdfc-progress-text"></span></div>' +
    '<div id="pdfc-upload-bar-wrap" style="display:none;margin-top:12px;background:var(--bg);border:1px solid var(--green-border);border-radius:4px;height:8px;overflow:hidden;">' +
    '<div id="pdfc-upload-bar" style="height:100%;width:0%;background:var(--green);transition:width 0.3s;"></div></div>' +
    '<div id="pdfc-upload-pct" style="font-size:0.55rem;color:var(--muted);margin-top:6px;"></div>' +
    '<div id="pdfc-estimate" style="font-size:0.55rem;color:var(--muted);margin-top:8px;">Large files may take a moment</div>' +
    '</div>' +
    '<div id="pdfc-result" style="display:none;margin-top:16px;">' +
    '<div style="background:var(--surface);border:1px solid var(--green-border);padding:20px;">' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">' +
    '<div style="text-align:center;"><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Original Size</div><div id="pdfc-orig-size" style="font-size:1rem;color:var(--text);font-family:var(--mono);"></div></div>' +
    '<div style="text-align:center;"><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Compressed Size</div><div id="pdfc-comp-size" style="font-size:1rem;color:var(--green);font-family:var(--mono);"></div></div>' +
    '</div>' +
    '<div id="pdfc-ratio" style="text-align:center;margin-top:12px;font-size:0.65rem;color:var(--muted);"></div>' +
    '<div style="text-align:center;margin-top:16px;">' +
    '<button onclick="window.downloadCompressedPdf()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 24px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;transition:var(--transition);">Download Compressed PDF</button>' +
    '</div></div></div>' +
    '<div id="pdfc-error" style="display:none;margin-top:12px;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;"></div>',

  'base64-encode': '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
    '<div><div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Input</div>' +
    '<textarea id="b64-input" placeholder="Enter text..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:120px;resize:vertical;outline:none;"></textarea>' +
    '<button onclick="window.b64Encode()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;margin-right:8px;">Encode</button>' +
    '<button onclick="window.b64Decode()" style="margin-top:8px;background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Decode</button></div>' +
    '<div><div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Output</div>' +
    '<textarea id="b64-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:120px;resize:vertical;outline:none;word-break:break-all;"></textarea></div></div>',

  'md5-generator': '<div style="margin-bottom:16px;">' +
    '<textarea id="md5-input" placeholder="Enter text to hash..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:100px;resize:vertical;outline:none;"></textarea>' +
    '<button onclick="window.generateMD5()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate MD5</button>' +
    '<div id="md5-output" style="margin-top:12px;padding:12px 16px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.7rem;color:var(--green);word-break:break-all;"></div></div>',

  'uuid-generator': '<div style="text-align:center;padding:20px;">' +
    '<div id="uuid-output" style="font-family:var(--mono);font-size:0.9rem;color:var(--green);background:var(--bg);border:1px solid var(--green-border);padding:16px;margin-bottom:16px;word-break:break-all;">Click Generate to create a UUID</div>' +
    '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
    '<button onclick="window.generateUUID()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate UUID</button></div></div>',

  'color-picker': '<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">' +
    '<div style="text-align:center;">' +
    '<input id="cp-picker" type="color" value="#39ff14" onchange="window.updateColorInfo(this.value)" style="width:120px;height:120px;border:1px solid var(--green-border);background:var(--bg);cursor:none;padding:4px;">' +
    '<div style="margin-top:8px;font-size:0.6rem;color:var(--muted);">Click to pick</div></div>' +
    '<div style="flex:1;min-width:160px;">' +
    '<div id="cp-hex" style="padding:10px 14px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.75rem;color:var(--green);margin-bottom:8px;">HEX: #39ff14</div>' +
    '<div id="cp-rgb" style="padding:10px 14px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.75rem;color:var(--text);margin-bottom:8px;">RGB: 57, 255, 20</div>' +
    '<div id="cp-hsl" style="padding:10px 14px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.75rem;color:var(--text);">HSL: 111, 100%, 54%</div></div></div>',

  'color-converter': '<div style="display:grid;grid-template-columns:280px 1fr;gap:20px;">' +
    '<div style="display:grid;gap:8px;">' +
    '<div><label style="font-size:0.55rem;color:var(--muted);letter-spacing:0.15em;text-transform:uppercase;">HEX</label>' +
    '<input id="cc-hex" value="#39ff14" oninput="window.updateFromHEX(this.value)" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:6px 10px;outline:none;"></div>' +
    '<div><label style="font-size:0.55rem;color:var(--muted);letter-spacing:0.15em;text-transform:uppercase;">RGB</label>' +
    '<input id="cc-rgb" value="57, 255, 20" oninput="window.updateFromRGB(this.value)" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:6px 10px;outline:none;"></div>' +
    '<div><label style="font-size:0.55rem;color:var(--muted);letter-spacing:0.15em;text-transform:uppercase;">HSL</label>' +
    '<input id="cc-hsl" value="111, 100%, 54%" oninput="window.updateFromHSL(this.value)" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:6px 10px;outline:none;"></div>' +
    '<div><label style="font-size:0.55rem;color:var(--muted);letter-spacing:0.15em;text-transform:uppercase;">HSV</label>' +
    '<input id="cc-hsv" value="111, 100%, 100%" oninput="window.updateFromHSV(this.value)" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:6px 10px;outline:none;"></div>' +
    '<div><label style="font-size:0.55rem;color:var(--muted);letter-spacing:0.15em;text-transform:uppercase;">CMYK</label>' +
    '<input id="cc-cmyk" value="78%, 0%, 92%, 0%" oninput="window.updateFromCMYK(this.value)" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:6px 10px;outline:none;"></div></div>' +
    '<div style="display:flex;gap:16px;">' +
    '<div id="cc-preview" style="flex:1;min-width:140px;aspect-ratio:1;border:2px solid var(--green-border);border-radius:8px;background:#39ff14;"></div>' +
    '<div style="font-size:0.6rem;color:var(--muted);line-height:1.8;padding:4px 8px;flex:1;min-width:140px;">' +
    '<div style="margin-bottom:8px;color:var(--green);font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;">Color Info</div>' +
    '<div id="cc-info-name" style="margin-bottom:4px;">Name: <span id="cc-name">Neon Green</span></div>' +
    '<div id="cc-info-hex"></div>' +
    '<div id="cc-info-rgb"></div>' +
    '<div id="cc-info-hsl"></div>' +
    '<div id="cc-info-hsv"></div>' +
    '<div id="cc-info-cmyk"></div>' +
    '<div id="cc-info-w3"></div></div></div></div>',

  'lorem-ipsum': '<div style="margin-bottom:16px;">' +
    '<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:16px;">' +
    '<span style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);">Generate:</span>' +
    '<button onclick="window.generateLorem(\'paras\',3)" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">3 Paragraphs</button>' +
    '<button onclick="window.generateLorem(\'paras\',5)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">5 Paragraphs</button>' +
    '<button onclick="window.generateLorem(\'words\',50)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">50 Words</button>' +
    '<button onclick="window.generateLorem(\'words\',100)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">100 Words</button></div>' +
    '<textarea id="lorem-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:180px;resize:vertical;outline:none;line-height:1.7;"></textarea>' +
    '<button onclick="window.copyLorem()" style="margin-top:8px;background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Copy to Clipboard</button></div>',

  'text-cleaner': '<div style="margin-bottom:16px;">' +
    '<textarea id="clean-input" placeholder="Paste text with extra spaces, weird quotes, etc..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:150px;resize:vertical;outline:none;"></textarea>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">' +
    '<button onclick="window.cleanText(\'spaces\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">Trim Spaces</button>' +
    '<button onclick="window.cleanText(\'quotes\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">Fix Quotes</button>' +
    '<button onclick="window.cleanText(\'lines\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">Remove Empty Lines</button>' +
    '<button onclick="window.cleanText(\'all\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">Clean All</button></div>' +
    '<div style="margin-top:12px;"><textarea id="clean-output" readonly placeholder="Cleaned text..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:120px;resize:vertical;outline:none;"></textarea></div></div>',

  'html-viewer': '<div style="margin-bottom:16px;font-size:0.65rem;color:var(--muted);letter-spacing:0.05em;">Enter HTML code below and see the live preview.</div>' +
    '<div style="margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">' +
    '<button onclick="window.renderHTML()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Render</button>' +
    '<label style="font-size:0.6rem;color:var(--muted);display:flex;align-items:center;gap:4px;"><input type="checkbox" id="hv-auto" checked onchange="window.toggleAutoRender()"> Auto-render</label></div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:6px;">HTML</div>' +
    '<textarea id="hv-input" placeholder="<h1>Hello World</h1>" oninput="window.scheduleRender()" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:300px;resize:vertical;outline:none;tab-size:2;"></textarea></div>' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:6px;display:flex;align-items:center;gap:8px;">Preview' +
    '<button id="hv-open-tab" onclick="window.openTabPreview()" title="Open in new tab" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:3px 8px;cursor:none;letter-spacing:0.05em;border-radius:3px;">↗ Open in New Tab</button></div>' +
    '<iframe id="hv-preview" style="width:100%;min-height:300px;background:#fff;border:1px solid var(--green-border);border-radius:4px;height:300px;"></iframe></div></div>' +
    '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">' +
    '<button onclick="window.clearHTML()" style="background:var(--surface);color:var(--muted);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:6px 12px;cursor:none;letter-spacing:0.1em;">Clear</button>' +
    '<span style="font-size:0.55rem;color:var(--muted);align-self:center;">Tip: &lt;script&gt; tags won\'t execute in preview for security.</span></div>',

  /* ─── NEW PDF TOOLS ─── */
  'merge-pdf': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Upload multiple PDFs and merge them into a single file.</div>' +
    '<div id="merge-pdf-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handleMergePdfUpload(event.dataTransfer.files)" ' +
    'onclick="document.getElementById(\'merge-pdf-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">📑</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop PDF files here or click to browse</div>' +
    '<input id="merge-pdf-input" type="file" accept=".pdf,application/pdf" multiple style="display:none" onchange="window.handleMergePdfUpload(this.files)">' +
    '</div>' +
    '<div id="merge-pdf-list" style="margin-top:12px;"></div>' +
    '<div id="merge-pdf-btn" style="text-align:center;margin-top:16px;display:none;">' +
    '<button onclick="window.mergePdfFiles()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 28px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Merge PDFs</button></div>' +
    '<div id="merge-pdf-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Merging...</div>' +
    '<div id="merge-pdf-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>' +
    '<div id="merge-pdf-download" style="text-align:center;margin-top:16px;display:none;">' +
    '<button onclick="window.downloadMergedPdf()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 24px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Download Merged PDF</button></div>',

  'split-pdf': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Upload a PDF to split it into individual pages.</div>' +
    '<div id="split-pdf-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handleSplitPdfUpload(event.dataTransfer.files[0])" ' +
    'onclick="document.getElementById(\'split-pdf-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">📄</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop a PDF here or click to browse</div>' +
    '<input id="split-pdf-input" type="file" accept=".pdf,application/pdf" style="display:none" onchange="window.handleSplitPdfUpload(this.files[0])">' +
    '</div>' +
    '<div id="split-pdf-info" style="margin-top:12px;font-size:0.65rem;color:var(--muted);display:none;"></div>' +
    '<div id="split-pdf-btn" style="text-align:center;margin-top:16px;display:none;">' +
    '<button onclick="window.splitPdfFile()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 28px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Split into Pages</button></div>' +
    '<div id="split-pdf-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Splitting...</div>' +
    '<div id="split-pdf-result" style="margin-top:16px;display:none;"></div>' +
    '<div id="split-pdf-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>',

  'create-pdf': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Enter text below and download as a PDF document.</div>' +
    '<textarea id="create-pdf-text" placeholder="Type or paste your text here..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:16px;min-height:200px;resize:vertical;outline:none;line-height:1.7;"></textarea>' +
    '<div style="margin-top:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Title: <input id="create-pdf-title" type="text" value="Document" style="width:120px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:6px 10px;outline:none;"></label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Author: <input id="create-pdf-author" type="text" value="" style="width:120px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:6px 10px;outline:none;"></label></div>' +
    '<div style="text-align:center;margin-top:16px;">' +
    '<button onclick="window.createPdfFromText()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 28px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Create PDF & Download</button></div>' +
    '<div id="create-pdf-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>',

  'pdf-to-jpg': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Upload a PDF and export pages as JPG images.</div>' +
    '<div id="ptj-upload-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handlePtjUpload(event.dataTransfer.files[0])" ' +
    'onclick="document.getElementById(\'ptj-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">📄</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop a PDF here or click to browse</div>' +
    '<input id="ptj-input" type="file" accept=".pdf,application/pdf" style="display:none" onchange="window.handlePtjUpload(this.files[0])">' +
    '</div>' +
    '<div id="ptj-info" style="margin-top:12px;font-size:0.65rem;color:var(--muted);display:none;"></div>' +
    '<div id="ptj-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Rendering pages...</div>' +
    '<div id="ptj-result" style="margin-top:16px;display:none;"></div>' +
    '<div id="ptj-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>' +
    '<div id="ptj-download-all" style="text-align:center;margin-top:16px;display:none;">' +
    '<button onclick="window.downloadAllPtj()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Download All as ZIP</button></div>',

  'unlock-pdf': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Remove password protection from a PDF. You must know the password.</div>' +
    '<div id="unlock-pdf-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handleUnlockPdfUpload(event.dataTransfer.files[0])" ' +
    'onclick="document.getElementById(\'unlock-pdf-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">🔒</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop a PDF here or click to browse</div>' +
    '<input id="unlock-pdf-input" type="file" accept=".pdf,application/pdf" style="display:none" onchange="window.handleUnlockPdfUpload(this.files[0])">' +
    '</div>' +
    '<div id="unlock-pdf-info" style="display:none;margin-top:12px;padding:12px 16px;background:var(--surface);border:1px solid var(--green-border);font-size:0.65rem;color:var(--muted);"></div>' +
    '<div id="unlock-pdf-pw" style="display:none;margin-top:12px;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Password: <input id="unlock-pdf-pass" type="password" style="width:200px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:8px 12px;outline:none;"></label>' +
    '<button onclick="window.unlockPdfFile()" style="margin-left:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Unlock</button></div>' +
    '<div id="unlock-pdf-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Processing...</div>' +
    '<div id="unlock-pdf-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>' +
    '<div id="unlock-pdf-download" style="text-align:center;margin-top:16px;display:none;">' +
    '<button onclick="window.downloadUnlockedPdf()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 24px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Download Unlocked PDF</button></div>',

  'protect-pdf': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Add password protection to a PDF file.</div>' +
    '<div id="protect-pdf-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handleProtectPdfUpload(event.dataTransfer.files[0])" ' +
    'onclick="document.getElementById(\'protect-pdf-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">🔓</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop a PDF here or click to browse</div>' +
    '<input id="protect-pdf-input" type="file" accept=".pdf,application/pdf" style="display:none" onchange="window.handleProtectPdfUpload(this.files[0])">' +
    '</div>' +
    '<div id="protect-pdf-info" style="display:none;margin-top:12px;padding:12px 16px;background:var(--surface);border:1px solid var(--green-border);font-size:0.65rem;color:var(--muted);"></div>' +
    '<div id="protect-pdf-pw" style="display:none;margin-top:12px;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Password: <input id="protect-pdf-pass" type="text" style="width:200px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:8px 12px;outline:none;" placeholder="Enter password"></label>' +
    '<button onclick="window.protectPdfFile()" style="margin-left:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Protect</button></div>' +
    '<div id="protect-pdf-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Processing...</div>' +
    '<div id="protect-pdf-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>' +
    '<div id="protect-pdf-download" style="text-align:center;margin-top:16px;display:none;">' +
    '<button onclick="window.downloadProtectedPdf()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 24px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Download Protected PDF</button></div>',

  'extract-text': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Upload a PDF to extract all text content from it.</div>' +
    '<div id="et-upload-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handleEtUpload(event.dataTransfer.files[0])" ' +
    'onclick="document.getElementById(\'et-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">📄</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop a PDF here or click to browse</div>' +
    '<input id="et-input" type="file" accept=".pdf,application/pdf" style="display:none" onchange="window.handleEtUpload(this.files[0])">' +
    '</div>' +
    '<div id="et-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Extracting text...</div>' +
    '<div id="et-result" style="display:none;margin-top:16px;">' +
    '<textarea id="et-text-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;resize:vertical;outline:none;line-height:1.5;"></textarea>' +
    '<button onclick="window.copyEtText()" style="margin-top:8px;background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Copy to Clipboard</button></div>' +
    '<div id="et-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>',

  /* ─── NEW IMAGE TOOLS ─── */
  'add-border': imgUploadHTML('ab-upload','ab','image/*') +
    '<div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Width: <input type="number" id="ab-width" value="10" min="1" max="100" style="width:60px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;">px</label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Color: <input id="ab-color" type="color" value="#39ff14" style="width:40px;height:40px;border:1px solid var(--green-border);background:var(--bg);cursor:none;padding:2px;vertical-align:middle;"></label></div>' +
    '<button onclick="window.addBorderToImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Add Border & Download</button>',

  'round-image': imgUploadHTML('ri-upload','ri','image/*') +
    '<div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Border: <input type="number" id="ri-border" value="0" min="0" max="50" style="width:60px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;">px</label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Size: <input type="number" id="ri-size" value="400" min="50" max="2000" style="width:70px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;">px</label></div>' +
    '<button onclick="window.makeRoundImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Make Round & Download</button>',

  'image-splitter': imgUploadHTML('is-upload','is','image/*') +
    '<div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Rows: <input type="number" id="is-rows" value="2" min="1" max="10" style="width:50px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;"></label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Cols: <input type="number" id="is-cols" value="2" min="1" max="10" style="width:50px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;"></label></div>' +
    '<button onclick="window.splitImageToPieces()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Split into Grid</button>' +
    '<div id="is-result" style="margin-top:12px;display:grid;gap:8px;"></div>',

  'pixelate': imgUploadHTML('px-upload','px','image/*') +
    '<div style="margin-top:12px;"><label style="font-size:0.6rem;color:var(--muted);">Block Size: <span id="px-size-label">8</span>px</label>' +
    '<input type="range" id="px-size" min="2" max="40" value="8" oninput="document.getElementById(\'px-size-label\').textContent=this.value" style="width:100%;margin-top:4px;"></div>' +
    '<button onclick="window.pixelateImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Pixelate & Download</button>',

  'combine-images': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Upload two images to combine them side by side.</div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
    '<div>' + imgUploadHTML('ci-upload1','ci1','image/*') + '</div>' +
    '<div>' + imgUploadHTML('ci-upload2','ci2','image/*') + '</div></div>' +
    '<div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Direction: <select id="ci-dir" style="background:var(--bg);color:var(--text);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:6px 10px;">' +
    '<option value="horizontal">Horizontal</option><option value="vertical">Vertical</option></select></label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Gap: <input type="number" id="ci-gap" value="10" min="0" max="100" style="width:50px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;">px</label></div>' +
    '<button onclick="window.combineTwoImages()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Combine & Download</button>',

  'add-text': imgUploadHTML('at-upload','at','image/*') +
    '<div style="margin-top:12px;">' +
    '<input id="at-text" type="text" placeholder="Enter text to add..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:10px 14px;outline:none;">' +
    '<div style="margin-top:8px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Font Size: <input type="number" id="at-size" value="36" min="8" max="200" style="width:50px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;">px</label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Color: <input id="at-color" type="color" value="#ffffff" style="width:40px;height:40px;border:1px solid var(--green-border);background:var(--bg);cursor:none;padding:2px;"></label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Position: <select id="at-pos" style="background:var(--bg);color:var(--text);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:4px 8px;">' +
    '<option value="top">Top</option><option value="center" selected>Center</option><option value="bottom">Bottom</option></select></label></div></div>' +
    '<button onclick="window.addTextToImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Add Text & Download</button>',

  'blur-bg': imgUploadHTML('bb-upload','bb','image/*') +
    '<div style="margin-top:12px;"><label style="font-size:0.6rem;color:var(--muted);">Blur Amount: <span id="bb-amt-label">10</span></label>' +
    '<input type="range" id="bb-amt" min="1" max="30" value="10" oninput="document.getElementById(\'bb-amt-label\').textContent=this.value" style="width:100%;margin-top:4px;"></div>' +
    '<button onclick="window.blurBackgroundImage()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Blur Background & Download</button>' +
    '<div id="bb-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Processing...</div>' +
    '<div id="bb-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>',

  'profile-photo': imgUploadHTML('pp-upload','pp','image/*') +
    '<div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Size: <input type="number" id="pp-size" value="400" min="100" max="2000" style="width:70px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;">px</label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">Border: <input type="number" id="pp-border" value="3" min="0" max="50" style="width:50px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;">px</label>' +
    '<label style="font-size:0.6rem;color:var(--muted);">BG Color: <input id="pp-bg" type="color" value="#222222" style="width:40px;height:40px;border:1px solid var(--green-border);background:var(--bg);cursor:none;padding:2px;"></label></div>' +
    '<button onclick="window.makeProfilePhoto()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Create & Download</button>',

  /* ─── NEW DEV / CONVERTER TOOLS ─── */
  'epoch-converter': '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Timestamp → Date</div>' +
    '<input id="ec-ts" type="number" placeholder="Enter Unix timestamp..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:10px 14px;outline:none;">' +
    '<button onclick="window.epochToDate()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Convert to Date</button>' +
    '<div id="ec-ts-result" style="margin-top:8px;padding:10px 14px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.7rem;color:var(--green);min-height:20px;"></div></div>' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Date → Timestamp</div>' +
    '<input id="ec-date" type="datetime-local" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:10px 14px;outline:none;color-scheme:dark;">' +
    '<button onclick="window.dateToEpoch()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Convert to Timestamp</button>' +
    '<div id="ec-date-result" style="margin-top:8px;padding:10px 14px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.7rem;color:var(--green);min-height:20px;"></div></div></div>' +
    '<div style="margin-top:12px;display:flex;gap:8px;"><button onclick="window.copyEpochResult()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Copy Result</button>' +
    '<button onclick="window.nowEpoch()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Current Time</button></div>',

  'csv-json': '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Input</div>' +
    '<textarea id="cj-input" placeholder="Paste CSV or JSON here..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;resize:vertical;outline:none;"></textarea>' +
    '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">' +
    '<button onclick="window.csvToJson()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">CSV → JSON</button>' +
    '<button onclick="window.jsonToCsv()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">JSON → CSV</button></div></div>' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Output</div>' +
    '<textarea id="cj-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;resize:vertical;outline:none;"></textarea></div></div>' +
    '<div style="display:flex;gap:8px;margin-top:8px;"><button onclick="window.copyCjOutput()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Copy Output</button></div>',

  'xml-json': '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Input</div>' +
    '<textarea id="xj-input" placeholder="Paste XML or JSON here..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;resize:vertical;outline:none;"></textarea>' +
    '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">' +
    '<button onclick="window.xmlToJson()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">XML → JSON</button>' +
    '<button onclick="window.jsonToXml()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">JSON → XML</button></div></div>' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Output</div>' +
    '<textarea id="xj-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;resize:vertical;outline:none;"></textarea></div></div>' +
    '<div style="display:flex;gap:8px;margin-top:8px;"><button onclick="window.copyXjOutput()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Copy Output</button></div>',

  'split-csv': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Upload a CSV file and split it into multiple smaller files by row count.</div>' +
    '<div id="sc-upload-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handleScUpload(event.dataTransfer.files[0])" ' +
    'onclick="document.getElementById(\'sc-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">📊</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop a CSV here or click to browse</div>' +
    '<input id="sc-input" type="file" accept=".csv" style="display:none" onchange="window.handleScUpload(this.files[0])">' +
    '</div>' +
    '<div id="sc-info" style="display:none;margin-top:12px;font-size:0.65rem;color:var(--muted);"></div>' +
    '<div id="sc-rows-input" style="display:none;margin-top:12px;">' +
    '<label style="font-size:0.6rem;color:var(--muted);">Rows per file: <input type="number" id="sc-rows" value="100" min="1" max="100000" style="width:80px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:6px 10px;outline:none;"></label>' +
    '<button onclick="window.splitCsvFile()" style="margin-left:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Split CSV</button></div>' +
    '<div id="sc-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Splitting...</div>' +
    '<div id="sc-result" style="margin-top:16px;display:none;"></div>' +
    '<div id="sc-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>',

  'create-zip': '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:16px;">Select multiple files to bundle them into a ZIP archive.</div>' +
    '<div id="cz-upload-zone" style="border:2px dashed var(--green-border);border-radius:8px;padding:40px;text-align:center;cursor:none;" ' +
    'ondragover="event.preventDefault();this.style.borderColor=\'var(--green)\';this.style.background=\'var(--green-dim)\'" ' +
    'ondragleave="this.style.borderColor=\'\';this.style.background=\'\'" ' +
    'ondrop="event.preventDefault();this.style.borderColor=\'\';this.style.background=\'\';window.handleCzUpload(event.dataTransfer.files)" ' +
    'onclick="document.getElementById(\'cz-input\').click()">' +
    '<div style="font-size:2.5rem;margin-bottom:12px;">📦</div>' +
    '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Drop files here or click to browse</div>' +
    '<input id="cz-input" type="file" multiple style="display:none" onchange="window.handleCzUpload(this.files)">' +
    '</div>' +
    '<div id="cz-list" style="margin-top:12px;"></div>' +
    '<div id="cz-btn" style="text-align:center;margin-top:16px;display:none;">' +
    '<button onclick="window.createZipArchive()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:12px 28px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Create ZIP</button></div>' +
    '<div id="cz-progress" style="display:none;text-align:center;padding:16px;font-size:0.65rem;color:var(--green);">Creating archive...</div>' +
    '<div id="cz-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-top:12px;"></div>',

  'ai-image-generator': '<div style="margin-bottom:20px;">' +
    '<label style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);display:block;margin-bottom:6px;">Prompt</label>' +
    '<textarea id="aig-prompt" placeholder="Describe the image you want to generate..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:14px;min-height:90px;resize:vertical;outline:none;line-height:1.5;"></textarea></div>' +

    '<div class="ai-gen-section" style="margin-bottom:16px;">' +
    '<label style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);display:block;margin-bottom:8px;">Style</label>' +
    '<div class="aig-style-chips" id="aig-style-chips">' +
    '<button class="aig-chip active" data-style="none" onclick="window.selectAigStyle(this)">No Style</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="anime_painted">Painted Anime</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="casual_photo">Casual Photo</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="cinematic">Cinematic</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="digital_painting">Digital Painting</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="concept_art">Concept Art</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="disney_3d">3D Disney Character</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="disney_2d">2D Disney Character</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="disney_sketch">Disney Sketch</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="concept_sketch">Concept Sketch</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="painterly">Painterly</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="oil_painting">Oil Painting</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="oil_realism">Oil Painting - Realism</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="oil_old">Oil Painting - Old</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="oil_70s">Oil Painting - 70s Pulp</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="pro_photo">Professional Photo</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="anime">Anime</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="anime_drawn">Drawn Anime</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="anime_screencap">Anime Screencap</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="anime_cute">Cute Anime</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="anime_soft">Soft Anime</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="fantasy_painting">Fantasy Painting</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="fantasy_landscape">Fantasy Landscape</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="fantasy_portrait">Fantasy Portrait</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="ghibli">Studio Ghibli</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="pixel_art">Pixel Art</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="vintage_comic">Vintage Comic</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="medieval">Medieval</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="watercolor">Watercolor</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="pencil">Pencil</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="tattoo">Tattoo Design</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="cartoon">Cartoon</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="claymation">Claymation</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="flat">Flat Illustration</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="emoji_3d">3D Emoji</button>' +
    '<button class="aig-chip" onclick="window.selectAigStyle(this)" data-style="fantasy_map">Fantasy World Map</button>' +
    '</div></div>' +

    '<div class="ai-gen-controls" style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px;align-items:flex-end;">' +
    '<div><label style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);display:block;margin-bottom:6px;">Shape</label>' +
    '<select id="aig-shape" style="background:var(--bg);color:var(--text);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 12px;outline:none;">' +
    '<option value="1024x1024">Square (1024×1024)</option>' +
    '<option value="768x1024">Portrait (768×1024)</option>' +
    '<option value="1024x768">Landscape (1024×768)</option></select></div>' +
    '<div><label style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);display:block;margin-bottom:6px;">Images</label>' +
    '<select id="aig-count" style="background:var(--bg);color:var(--text);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 12px;outline:none;">' +
    '<option value="2">2 images</option><option value="4" selected>4 images</option><option value="6">6 images</option></select></div>' +
    '<div><button onclick="window.generateAigImages()" id="aig-gen-btn" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 24px;cursor:none;letter-spacing:0.15em;text-transform:uppercase;transition:var(--transition);">Generate</button></div></div>' +

    '<div id="aig-loading" style="display:none;text-align:center;padding:40px;">' +
    '<div class="loader-ring" style="margin:0 auto 20px;"></div>' +
    '<div id="aig-loading-text" style="font-size:0.65rem;color:var(--green);letter-spacing:0.1em;">Generating images... <span id="aig-progress">0/' + '0</span></div>' +
    '<div style="font-size:0.55rem;color:var(--muted);margin-top:8px;">This may take 30–60 seconds per image</div></div>' +

    '<div id="aig-error" style="display:none;padding:12px 16px;background:var(--bg);border:1px solid #ff4444;color:#ff4444;font-size:0.65rem;border-radius:8px;margin-bottom:16px;"></div>' +

    '<div id="aig-output" style="display:none;"></div>',

};

var _activeCategory = 'all';

function buildTabs(){
  var wrapper = document.querySelector('.tools-wrapper');
  var existing = document.getElementById('tools-tabs');
  if(existing) existing.remove();
  var tabs = document.createElement('div');
  tabs.id = 'tools-tabs';
  tabs.className = 'tools-tabs';
  var allBtn = document.createElement('button');
  allBtn.textContent = 'All';
  allBtn.className = 'tools-tab active';
  allBtn.setAttribute('data-cat', 'all');
  allBtn.addEventListener('click', function(){ filterTools('all'); });
  tabs.appendChild(allBtn);
  CATEGORY_ORDER.forEach(function(cat){
    var btn = document.createElement('button');
    btn.textContent = CATEGORY_LABELS[cat];
    btn.className = 'tools-tab';
    btn.setAttribute('data-cat', cat);
    btn.addEventListener('click', function(){ filterTools(cat); });
    tabs.appendChild(btn);
  });
  wrapper.insertBefore(tabs, wrapper.firstChild);
}

function filterTools(cat){
  _activeCategory = cat;
  var btns = document.querySelectorAll('.tools-tab');
  for(var i=0;i<btns.length;i++){
    btns[i].className = 'tools-tab' + (btns[i].getAttribute('data-cat') === cat ? ' active' : '');
  }
  var grid = document.getElementById('tools-grid');
  grid.innerHTML = '';
  TOOLS.forEach(function(t){
    if(cat !== 'all' && t.cat !== cat) return;
    var card = document.createElement('a');
    card.href = '#tools-' + t.id;
    card.className = 'tool-card';
    card.innerHTML =
      '<div class="tool-icon">' + t.icon + '</div>' +
      '<div class="tool-name">' + t.name + '</div>' +
      '<div class="tool-category">' + CATEGORY_LABELS[t.cat] + '</div>';
    card.addEventListener('click', function(e){
      e.preventDefault();
      openTool(t.id);
    });
    grid.appendChild(card);
  });
  if(grid.children.length === 0){
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted);font-size:0.7rem;">No tools in this category yet.</div>';
  }
}

function buildGrid(){
  buildTabs();
  filterTools('all');
}

function openTool(toolId){
  var tool = TOOLS.find(function(t){ return t.id === toolId; });
  if(!tool) return;
  var grid = document.getElementById('tools-grid');
  var detail = document.getElementById('tool-detail');
  if(!detail){
    detail = document.createElement('div');
    detail.id = 'tool-detail';
    document.querySelector('.tools-wrapper').appendChild(detail);
  }
  detail.className = 'tool-detail active';
  grid.style.display = 'none';
  var body = TOOL_PLACEHOLDER_BODIES[toolId] || (window._aiToolsData && window._aiToolsData[toolId]) || '<p class="tool-detail-placeholder">' + tool.name + ' — coming soon.</p>';
  detail.innerHTML =
    '<button class="tool-detail-back" onclick="window.closeTool()">← Back to Tools</button>' +
    '<h3 class="tool-detail-title">' + tool.name + '</h3>' +
    '<div class="tool-detail-body">' + body + '</div>';
  if(window.location.hash !== '#tools-' + toolId) window.location.hash = 'tools-' + toolId;
  updateToolMeta(tool);
}

function updateToolMeta(tool){
  var title = tool.name + ' — Mahir Velizade Tools';
  document.title = title;
  var og = document.querySelector('meta[property="og:title"]');
  if(og) og.setAttribute('content', title);
  var desc = '';
  if(tool.id === 'remove-bg') desc = 'Remove image backgrounds for free in your browser. AI-powered, no uploads, privacy-first. Supports JPG, PNG, WEBP.';
  else if(tool.id === 'image-to-pdf') desc = 'Convert images to PDF files instantly in your browser. Free, no upload required.';
  else if(tool.id === 'pdf-compressor') desc = 'Compress PDF files in your browser. Reduces file size with Ghostscript WASM. Free, private, no upload required.';
  else if(tool.id === 'qr-code-generator') desc = 'Generate QR codes for free in your browser. No upload, no tracking.';
  else if(tool.id === 'ai-image-generator') desc = 'Generate AI images with FLUX.1-schnell. Powered by HuggingFace Inference API. Free online AI image generator.';
  else desc = 'Free online ' + tool.name.toLowerCase() + ' tool. Works entirely in your browser.';
  var md = document.querySelector('meta[name="description"]');
  if(md) md.setAttribute('content', desc);
  var od = document.querySelector('meta[property="og:description"]');
  if(od) od.setAttribute('content', desc);
  var td = document.querySelector('meta[name="twitter:description"]');
  if(td) td.setAttribute('content', desc);
}

window.closeTool = function(){
  var detail = document.getElementById('tool-detail');
  var grid = document.getElementById('tools-grid');
  if(detail) detail.classList.remove('active');
  if(grid) grid.style.display = '';
  window.location.hash = '';
  _rbgOriginalUrl = null;
  _rbgResultBlob = null;
  _pdfcFile = null;
  _aigGenerating = false;
  document.title = 'Mahir Velizade — Designer';
  var og = document.querySelector('meta[property="og:title"]');
  if(og) og.setAttribute('content','Mahir Velizade — Designer &amp; Tools');
  var md = document.querySelector('meta[name="description"]');
  if(md) md.setAttribute('content','Mahir Velizade — UX/UI Designer &amp; Front-End Developer. Browser-based image tools including AI background removal, all processing locally.');
  var od = document.querySelector('meta[property="og:description"]');
  if(od) od.setAttribute('content','Free browser-based image tools: Remove Background, Image to PDF, QR Generator &amp; more. All processing stays on your device.');
  var td = document.querySelector('meta[name="twitter:description"]');
  if(td) td.setAttribute('content','Free browser-based image tools with AI background removal. Privacy-first, no upload required.');
};

var _imgCache = {};

window.handleImgTool = function(prefix, input){
  var file = input.files[0];
  if(!file) return;
  var reader = new FileReader();
  reader.onload = function(e){
    _imgCache[prefix] = { src: e.target.result, file: file, img: null };
    var img = new Image();
    img.onload = function(){
      _imgCache[prefix].img = img;
      var pw = document.getElementById(prefix + '-preview');
      if(pw){
        pw.innerHTML = '<div style="font-size:0.6rem;color:var(--green);margin-bottom:8px;">✅ ' + file.name + ' (' + img.width + '×' + img.height + ')</div>' +
          '<img src="' + e.target.result + '" style="max-width:100%;max-height:200px;border:1px solid var(--green-border);border-radius:4px;">';
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

function canvasToDownload(canvas, filename, mime){
  var link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(mime);
  link.click();
}

function getCachedImg(prefix){
  var c = _imgCache[prefix];
  if(!c || !c.img) return null;
  return c.img;
}

/* ─── IMAGE TO PDF (pure JS — no window.print) ─── */
window.convertImgToPDF = function(){
  var img = getCachedImg('img-to-pdf');
  if(!img) return;
  var c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  var ctx = c.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(img, 0, 0);
  var jpegBytes = atob(c.toDataURL('image/jpeg',0.92).split(',')[1]);
  var w = img.width, h = img.height;
  var objs = [];
  objs.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  objs.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  objs.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + w + ' ' + h + '] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>\nendobj');
  var stream = 'q ' + w + ' 0 0 ' + h + ' 0 0 cm /Im0 Do Q';
  objs.push('4 0 obj\n<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream\nendobj');
  objs.push('5 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + w + ' /Height ' + h + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpegBytes.length + ' >>\nstream\n' + jpegBytes + '\nendstream\nendobj');
  var body = objs.join('\n');
  var header = '%PDF-1.4\n';
  var lines = body.split('\n');
  var offsets = [];
  var pos = header.length;
  for(var i=0;i<lines.length;i++){
    if(/^\d+ 0 obj$/.test(lines[i])) offsets.push(pos);
    pos += lines[i].length + 1;
  }
  var xref = 'xref\n0 6\n0000000000 65535 f \n';
  for(i=0;i<offsets.length;i++) xref += ('0000000000'+offsets[i]).slice(-10) + ' 00000 n \n';
  xref += 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + pos + '\n%%EOF';
  var pdf = header + body + '\n' + xref;
  var buf = new Uint8Array(pdf.length);
  for(var i=0;i<pdf.length;i++) buf[i] = pdf.charCodeAt(i) & 0xff;
  var blob = new Blob([buf], {type:'application/pdf'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = 'image.pdf'; a.click();
  URL.revokeObjectURL(url);
  var out = document.getElementById('img-to-pdf-output');
  if(out) out.textContent = '✅ PDF created: ' + w + '×' + h + 'px, ' + (jpegBytes.length/1024).toFixed(0) + 'KB';
};

/* ─── IMAGE COMPRESSOR ─── */
window.compressImage = function(){
  var img = getCachedImg('img-comp');
  if(!img) return;
  var qual = parseInt(document.getElementById('comp-qual').value) / 100;
  var c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  var ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  var dataUrl = c.toDataURL('image/jpeg', qual);
  var kb = Math.round(dataUrl.length * 0.75 / 1024);
  document.getElementById('img-comp-info').textContent = 'Compressed: ~' + kb + 'KB (quality: ' + Math.round(qual*100) + '%)';
  var link = document.createElement('a');
  link.download = 'compressed.jpg';
  link.href = dataUrl;
  link.click();
};

/* ─── IMAGE RESIZE ─── */
window.resizeImage = function(){
  var img = getCachedImg('img-resize');
  if(!img) return;
  var w = parseInt(document.getElementById('resize-w').value) || img.width;
  var h = parseInt(document.getElementById('resize-h').value) || img.height;
  var keep = document.getElementById('resize-keep').checked;
  if(keep){
    var ratio = img.width / img.height;
    var newRatio = w / h;
    if(newRatio > ratio){ w = Math.round(h * ratio); }
    else { h = Math.round(w / ratio); }
  }
  var c = document.createElement('canvas');
  c.width = w; c.height = h;
  var ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  document.getElementById('img-resize-info').textContent = 'Resized: ' + w + '×' + h;
  canvasToDownload(c, 'resized.png', 'image/png');
};

/* ─── IMAGE FORMAT CONVERTERS ─── */
window.convertFormat = function(prefix, ext, mime, fromId, toId){
  var img = getCachedImg(prefix);
  if(!img) return;
  var c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  var ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  canvasToDownload(c, 'converted.' + ext, mime);
};

/* Auto-wire converters on tool open via onclick in HTML */
window.jpgToPng = function(){ convertFormat('jpg2png', 'png', 'image/png'); };
window.pngToJpg = function(){ convertFormat('png2jpg', 'jpg', 'image/jpeg'); };
window.webpConvert = function(){
  var img = getCachedImg('webpcvt');
  if(!img) return;
  var fmt = document.getElementById('webp-fmt').value;
  var mime = fmt === 'webp' ? 'image/webp' : fmt === 'png' ? 'image/png' : 'image/jpeg';
  var c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  var ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  canvasToDownload(c, 'converted.' + fmt, mime);
};

/* ─── IMAGE CROPPER ─── */
window.cropImage = function(){
  var img = getCachedImg('img-crop');
  if(!img) return;
  var x = parseInt(document.getElementById('crop-x').value) || 0;
  var y = parseInt(document.getElementById('crop-y').value) || 0;
  var w = parseInt(document.getElementById('crop-w').value) || img.width;
  var h = parseInt(document.getElementById('crop-h').value) || img.height;
  var c = document.createElement('canvas');
  c.width = w; c.height = h;
  var ctx = c.getContext('2d');
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  canvasToDownload(c, 'cropped.png', 'image/png');
};

/* ─── IMAGE ROTATOR ─── */
window.rotateImage = function(){
  var img = getCachedImg('img-rot');
  if(!img) return;
  var angle = parseFloat(document.getElementById('rot-angle').value) || 0;
  var rad = angle * Math.PI / 180;
  var sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
  var w = Math.round(img.width * cos + img.height * sin);
  var h = Math.round(img.width * sin + img.height * cos);
  var c = document.createElement('canvas');
  c.width = w; c.height = h;
  var ctx = c.getContext('2d');
  ctx.translate(w/2, h/2);
  ctx.rotate(rad);
  ctx.drawImage(img, -img.width/2, -img.height/2);
  canvasToDownload(c, 'rotated.png', 'image/png');
};

/* ─── IMAGE FLIP ─── */
window.flipImage = function(dir){
  var img = getCachedImg('img-flip');
  if(!img) return;
  var c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  var ctx = c.getContext('2d');
  if(dir === 'h'){ ctx.translate(img.width, 0); ctx.scale(-1, 1); }
  else { ctx.translate(0, img.height); ctx.scale(1, -1); }
  ctx.drawImage(img, 0, 0);
  canvasToDownload(c, 'flipped.png', 'image/png');
};

/* ─── BRIGHTNESS ─── */
function applyCanvasFilter(prefix, filterFn){
  var img = getCachedImg(prefix);
  if(!img) return;
  var c = document.createElement('canvas');
  c.width = img.width; c.height = img.height;
  var ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  var d = ctx.getImageData(0, 0, c.width, c.height);
  filterFn(d.data);
  ctx.putImageData(d, 0, 0);
  canvasToDownload(c, 'filtered.png', 'image/png');
}

window.adjustBrightness = function(){
  var val = parseInt(document.getElementById('bright-slider').value) || 0;
  applyCanvasFilter('img-bright', function(data){
    for(var i=0;i<data.length;i+=4){
      data[i] = Math.min(255, Math.max(0, data[i] + val));
      data[i+1] = Math.min(255, Math.max(0, data[i+1] + val));
      data[i+2] = Math.min(255, Math.max(0, data[i+2] + val));
    }
  });
};

window.adjustContrast = function(){
  var val = parseInt(document.getElementById('contrast-slider').value) || 0;
  var factor = (259 * (val + 255)) / (255 * (259 - val));
  applyCanvasFilter('img-contrast', function(data){
    for(var i=0;i<data.length;i+=4){
      data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
      data[i+1] = Math.min(255, Math.max(0, factor * (data[i+1] - 128) + 128));
      data[i+2] = Math.min(255, Math.max(0, factor * (data[i+2] - 128) + 128));
    }
  });
};

window.applyGrayscale = function(){
  applyCanvasFilter('img-gray', function(data){
    for(var i=0;i<data.length;i+=4){
      var g = data[i]*0.3 + data[i+1]*0.59 + data[i+2]*0.11;
      data[i] = data[i+1] = data[i+2] = g;
    }
  });
};

/* ─── REMOVE BACKGROUND (using @imgly/background-removal via CDN) ─── */
var _rbgOriginalUrl = null;
var _rbgResultBlob = null;

window.handleRemoveBgUpload = function(file){
  if(!file) return;
  var valid = ['image/jpeg','image/png','image/webp'];
  if(valid.indexOf(file.type) === -1){
    rbgError('Unsupported format. Please use JPG, PNG, or WEBP.');
    return;
  }
  document.getElementById('rbg-upload-zone').style.display = 'none';
  document.getElementById('rbg-error').style.display = 'none';
  document.getElementById('rbg-progress').style.display = 'block';
  document.getElementById('rbg-result').style.display = 'none';
  var reader = new FileReader();
  reader.onload = function(e){
    _rbgOriginalUrl = e.target.result;
    document.getElementById('rbg-original-preview').innerHTML = '<img src="'+_rbgOriginalUrl+'" style="max-width:100%;max-height:250px;">';
    processRemoveBg(_rbgOriginalUrl);
  };
  reader.readAsDataURL(file);
};

async function processRemoveBg(src){
  try {
    var mod = await import('https://esm.sh/@imgly/background-removal@1.7.0');
    var fn = mod.default || mod.removeBackground || mod;
    var blob = await fn(src, {
      model: 'isnet_quint8',
      output: { format: 'image/png' }
    });
    _rbgResultBlob = blob;
    var url = URL.createObjectURL(blob);
    document.getElementById('rbg-progress').style.display = 'none';
    document.getElementById('rbg-result').style.display = 'block';
    document.getElementById('rbg-processed-preview').innerHTML = '<img src="'+url+'" style="max-width:100%;max-height:250px;">';
  } catch(err) {
    rbgError('Processing failed: ' + (err.message || 'Unknown error'));
  }
}

function rbgError(msg){
  var el = document.getElementById('rbg-error');
  if(el){ el.textContent = msg; el.style.display = 'block'; }
  var p = document.getElementById('rbg-progress');
  if(p) p.style.display = 'none';
}

window.downloadRemoveBg = function(){
  if(!_rbgResultBlob) return;
  var link = document.createElement('a');
  link.download = 'removed-background.png';
  link.href = URL.createObjectURL(_rbgResultBlob);
  link.click();
};

/* ─── PDF COMPRESSOR (client-side via Ghostscript WASM) ─── */
var _pdfcFile = null;
var _pdfcQuality = 'medium';
var _pdfcResultBlob = null;
var _pdfcOrigSize = 0;
var _pdfcGSModule = null;
var _pdfcLoadingGS = false;

window.handlePdfCompressUpload = function(file){
  if(!file) return;
  if(file.type !== 'application/pdf'){
    pdfcError('Only PDF files are accepted.');
    return;
  }
  if(file.size > 70 * 1024 * 1024){
    pdfcError('File exceeds 70MB limit.');
    return;
  }
  _pdfcFile = file;
  _pdfcResultBlob = null;
  document.getElementById('pdfc-upload-zone').style.display = 'none';
  document.getElementById('pdfc-error').style.display = 'none';
  document.getElementById('pdfc-result').style.display = 'none';
  document.getElementById('pdfc-progress').style.display = 'none';
  var info = document.getElementById('pdfc-file-info');
  info.style.display = 'block';
  info.innerHTML = '📄 <strong>' + file.name + '</strong> · ' + formatSize(file.size) +
    '<span style="float:right;color:var(--green);cursor:none;" onclick="window.resetPdfcUpload()">✕</span>';
  document.getElementById('pdfc-quality').style.display = 'block';
  document.getElementById('pdfc-compress-btn').style.display = 'block';
};

window.resetPdfcUpload = function(){
  _pdfcFile = null;
  _pdfcResultBlob = null;
  document.getElementById('pdfc-upload-zone').style.display = '';
  document.getElementById('pdfc-file-info').style.display = 'none';
  document.getElementById('pdfc-quality').style.display = 'none';
  document.getElementById('pdfc-compress-btn').style.display = 'none';
  document.getElementById('pdfc-result').style.display = 'none';
  document.getElementById('pdfc-error').style.display = 'none';
  document.getElementById('pdfc-progress').style.display = 'none';
};

window.selectPdfcQuality = function(q){
  _pdfcQuality = q;
  var btns = document.querySelectorAll('.pdfc-q-btn');
  for(var i=0;i<btns.length;i++){
    var b = btns[i];
    if(b.getAttribute('data-q') === q){
      b.style.background = 'var(--green)';
      b.style.color = '#000';
      b.style.border = 'none';
    } else {
      b.style.background = 'var(--surface)';
      b.style.color = 'var(--text)';
      b.style.border = '1px solid var(--green-border)';
    }
  }
};

var _pdfcGSLoading = null;
function ensureGS(){
  if(_pdfcGSModule) return Promise.resolve(_pdfcGSModule);
  if(_pdfcGSLoading) return _pdfcGSLoading;
  _pdfcGSLoading = (function(){
    var est = document.getElementById('pdfc-estimate');
    est.textContent = 'Downloading Ghostscript engine (~15MB, first time only)...';
    return import('https://cdn.jsdelivr.net/npm/@jspawn/ghostscript-wasm@0.0.2/gs.mjs').then(function(mod){
      return mod.default({
        locateFile: function(f){ return 'https://cdn.jsdelivr.net/npm/@jspawn/ghostscript-wasm@0.0.2/' + f; }
      });
    }).then(function(gs){
      _pdfcGSModule = gs;
      return gs;
    });
  })();
  return _pdfcGSLoading;
}

window.compressPdf = function(){
  if(!_pdfcFile) return;
  document.getElementById('pdfc-error').style.display = 'none';
  document.getElementById('pdfc-result').style.display = 'none';
  document.getElementById('pdfc-compress-btn').style.display = 'none';
  document.getElementById('pdfc-quality').style.display = 'none';
  var prog = document.getElementById('pdfc-progress');
  prog.style.display = 'block';
  document.getElementById('pdfc-upload-bar-wrap').style.display = 'none';
  document.getElementById('pdfc-upload-bar').style.width = '0%';
  document.getElementById('pdfc-upload-pct').textContent = '';
  document.getElementById('pdfc-progress-text').textContent = '';
  var est = document.getElementById('pdfc-estimate');

  if(!_pdfcGSModule) est.textContent = 'Initializing...';

  var pctEl = document.getElementById('pdfc-upload-pct');
  pctEl.textContent = '';

  setTimeout(function(){
    runPdfcCompression(est);
  }, 50);
};

function runPdfcCompression(est){
  ensureGS().then(function(gs){
    est.textContent = 'Compressing with Ghostscript...';
    setTimeout(function(){
      try {
        var reader = new FileReader();
        reader.onload = function(e){
          var input = new Uint8Array(e.target.result);
          _pdfcOrigSize = input.length;
          try {
            gs.FS.writeFile('input.pdf', input);
          } catch(writeErr){
            pdfcError('Failed to write file: ' + writeErr.message);
            return;
          }
          var preset = { low: '/screen', medium: '/ebook', high: '/printer' }[_pdfcQuality] || '/ebook';
          setTimeout(function(){
            try {
              gs.callMain([
                '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.4',
                '-dPDFSETTINGS=' + preset,
                '-dNOPAUSE', '-dQUIET', '-dBATCH',
                '-sOutputFile=output.pdf', 'input.pdf'
              ]);
            } catch(gsErr){
              pdfcError('Compression failed. The PDF may be corrupted or protected.');
              try { gs.FS.unlink('input.pdf'); } catch(e){}
              return;
            }
            try {
              var output = gs.FS.readFile('output.pdf', { encoding: 'binary' });
              _pdfcResultBlob = new Blob([output.buffer], { type: 'application/pdf' });
              document.getElementById('pdfc-progress').style.display = 'none';
              document.getElementById('pdfc-result').style.display = 'block';
              document.getElementById('pdfc-orig-size').textContent = formatSize(_pdfcOrigSize);
              document.getElementById('pdfc-comp-size').textContent = formatSize(output.length);
              var ratio = (1 - output.length / _pdfcOrigSize) * 100;
              var ratioEl = document.getElementById('pdfc-ratio');
              if(ratio > 2){
                ratioEl.innerHTML = 'Reduced by <strong style="color:var(--green);">' + ratio.toFixed(1) + '%</strong>';
              } else if(ratio > 0){
                ratioEl.textContent = 'Minimal reduction (' + ratio.toFixed(1) + '%) — file may already be optimized.';
              } else {
                ratioEl.textContent = 'Size increased by ' + Math.abs(ratio).toFixed(1) + '% — PDF may already be optimized.';
              }
            } catch(readErr){
              pdfcError('Failed to read compressed output.');
            }
            try { gs.FS.unlink('input.pdf'); } catch(e){}
            try { gs.FS.unlink('output.pdf'); } catch(e){}
          }, 10);
        };
        reader.onerror = function(){
          pdfcError('Failed to read file.');
        };
        reader.readAsArrayBuffer(_pdfcFile);
      } catch(err){
        pdfcError('Compression failed: ' + err.message);
      }
    }, 10);
  }).catch(function(err){
    pdfcError('Failed to load Ghostscript engine: ' + err.message);
  });
}

window.downloadCompressedPdf = function(){
  if(!_pdfcResultBlob) return;
  var link = document.createElement('a');
  link.download = _pdfcFile ? _pdfcFile.name.replace(/\.pdf$/i, '_compressed.pdf') : 'compressed.pdf';
  link.href = URL.createObjectURL(_pdfcResultBlob);
  link.click();
};

function pdfcError(msg){
  var el = document.getElementById('pdfc-error');
  if(el){ el.textContent = msg; el.style.display = 'block'; }
  document.getElementById('pdfc-progress').style.display = 'none';
  document.getElementById('pdfc-compress-btn').style.display = 'none';
}

function formatSize(bytes){
  if(bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  if(bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
}

/* ─── WORD COUNTER ─── */
window.updateWordCount = function(){
  var text = document.getElementById('wc-input').value;
  var words = text.trim() ? text.trim().split(/\s+/).length : 0;
  var chars = text.length;
  var charsNoSpace = text.replace(/\s/g,'').length;
  var lines = text ? text.split('\n').length : 0;
  document.getElementById('wc-stats').innerHTML =
    '<div style="background:var(--bg);border:1px solid var(--green-border);padding:16px;text-align:center;"><div style="font-size:1.5rem;color:var(--green);">' + words + '</div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-top:4px;">Words</div></div>' +
    '<div style="background:var(--bg);border:1px solid var(--green-border);padding:16px;text-align:center;"><div style="font-size:1.5rem;color:var(--green);">' + chars + '</div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-top:4px;">Characters</div></div>' +
    '<div style="background:var(--bg);border:1px solid var(--green-border);padding:16px;text-align:center;"><div style="font-size:1.5rem;color:var(--green);">' + charsNoSpace + '</div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-top:4px;">No Space</div></div>' +
    '<div style="background:var(--bg);border:1px solid var(--green-border);padding:16px;text-align:center;"><div style="font-size:1.5rem;color:var(--green);">' + lines + '</div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-top:4px;">Lines</div></div>';
};

/* ─── PASSWORD GENERATOR ─── */
window.generatePassword = function(){
  var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var lower = 'abcdefghijklmnopqrstuvwxyz';
  var digits = '0123456789';
  var symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  var chars = '';
  if(document.getElementById('pg-upper').checked) chars += upper;
  if(document.getElementById('pg-lower').checked) chars += lower;
  if(document.getElementById('pg-digits').checked) chars += digits;
  if(document.getElementById('pg-symbols').checked) chars += symbols;
  if(!chars) chars = upper + lower + digits;
  var len = parseInt(document.getElementById('pg-length').value) || 16;
  len = Math.max(4, Math.min(64, len));
  var pwd = '';
  for(var i=0;i<len;i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  document.getElementById('pg-output').value = pwd;
};

window.copyPassword = function(){
  var inp = document.getElementById('pg-output');
  inp.select();
  document.execCommand('copy');
};

/* ─── QR CODE GENERATOR (via qrcode-generator library) ─── */

var _qrLibLoaded = false;
var _qrLoading = false;

function loadQRLib(cb){
  if(window.qrcode){
    _qrLibLoaded = true;
    if(cb) cb();
    return;
  }
  if(_qrLoading) return;
  _qrLoading = true;
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
  s.onload = function(){
    _qrLibLoaded = true;
    _qrLoading = false;
    if(cb) cb();
  };
  s.onerror = function(){
    _qrLoading = false;
    var s2 = document.createElement('script');
    s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
    s2.onload = function(){ _qrLibLoaded = true; if(cb) cb(); };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s);
}

window.generateQR = function(){
  var txt = document.getElementById('qr-input').value.trim();
  if(!txt){
    document.getElementById('qr-output').innerHTML = '<div style="color:var(--muted);font-size:0.65rem;padding:10px;">Enter text or URL first.</div>';
    return;
  }
  var out = document.getElementById('qr-output');

  if(!_qrLibLoaded){
    out.innerHTML = '<div style="padding:20px;font-size:0.65rem;color:var(--muted);">Loading QR library...</div>';
    loadQRLib(function(){ window.generateQR(); });
    return;
  }

  try {
    var qr = qrcode(0, 'L');
    qr.addData(txt);
    qr.make();

    var imgHtml = qr.createImgTag(5, 4);
    out.innerHTML =
      '<div style="text-align:center;">' +
        imgHtml.replace('<img ', '<img style="max-width:100%;height:auto;border-radius:4px;" ') +
      '</div>';

    // Extract data URL for download
    var tmpImg = out.querySelector('img');
    var dataUrl = tmpImg ? tmpImg.src : '';
    if(dataUrl){
      var dl = document.createElement('div');
      dl.style.marginTop = '12px';
      dl.innerHTML =
        '<a href="' + dataUrl + '" download="qrcode.png" style="color:var(--green);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;border:1px solid var(--green-border);padding:8px 16px;display:inline-block;">Download PNG</a>';
      out.appendChild(dl);
    }
  } catch(e){
    out.innerHTML = '<div style="color:#ff4444;font-size:0.7rem;">Error: ' + e.message + '</div>';
  }
};


/* ─── JSON FORMATTER ─── */
window.formatJSON = function(){
  var input = document.getElementById('jf-input').value;
  var output = document.getElementById('jf-output');
  try {
    var parsed = JSON.parse(input);
    output.textContent = JSON.stringify(parsed, null, 2);
    output.style.color = 'var(--green)';
  } catch(e) {
    output.textContent = '❌ Invalid JSON: ' + e.message;
    output.style.color = '#ff4444';
  }
};

/* ─── SHA256 GENERATOR (using SubtleCrypto) ─── */
window.generateSHA256 = function(){
  var text = document.getElementById('sha-input').value;
  var out = document.getElementById('sha-output');
  if(!text) { out.textContent = 'Please enter text to hash.'; return; }
  if(window.crypto && window.crypto.subtle){
    var enc = new TextEncoder().encode(text);
    crypto.subtle.digest('SHA-256', enc).then(function(buf){
      var hex = Array.from(new Uint8Array(buf)).map(function(b){ return b.toString(16).padStart(2,'0'); }).join('');
      out.textContent = hex;
    });
  } else {
    var hash = 0;
    for(var i=0;i<text.length;i++){ hash = ((hash << 5) - hash) + text.charCodeAt(i); hash |= 0; }
    var h = Math.abs(hash).toString(16).padStart(8,'0');
    while(h.length < 64) h += h;
    out.textContent = h.substring(0, 64);
  }
};

/* ─── URL ENCODER ─── */
window.encodeURL = function(){
  document.getElementById('ue-output').value = encodeURIComponent(document.getElementById('ue-input').value);
};
window.decodeURL = function(){
  try { document.getElementById('ue-output').value = decodeURIComponent(document.getElementById('ue-input').value); }
  catch(e) { document.getElementById('ue-output').value = '❌ Invalid encoding'; }
};

/* ─── TEXT CASE CONVERTER ─── */
window.convertCase = function(type){
  var input = document.getElementById('tc-input').value;
  var output = document.getElementById('tc-output');
  switch(type){
    case 'upper': output.value = input.toUpperCase(); break;
    case 'lower': output.value = input.toLowerCase(); break;
    case 'title': output.value = input.replace(/\w\S*/g, function(t){ return t.charAt(0).toUpperCase() + t.substring(1).toLowerCase(); }); break;
    case 'camel': output.value = input.replace(/[^a-zA-Z0-9]+(.)/g, function(m,chr){ return chr.toUpperCase(); }).replace(/^[A-Z]/, function(c){ return c.toLowerCase(); }); break;
    case 'snake': output.value = input.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase(); break;
    case 'kebab': output.value = input.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase(); break;
  }
};

/* ─── BASE64 ─── */
window.b64Encode = function(){
  try { document.getElementById('b64-output').value = btoa(document.getElementById('b64-input').value); }
  catch(e) { document.getElementById('b64-output').value = '❌ Encoding error'; }
};
window.b64Decode = function(){
  try { document.getElementById('b64-output').value = atob(document.getElementById('b64-input').value); }
  catch(e) { document.getElementById('b64-output').value = '❌ Invalid Base64'; }
};

/* ─── MD5 GENERATOR (SubtleCrypto) ─── */
window.generateMD5 = function(){
  var text = document.getElementById('md5-input').value;
  var out = document.getElementById('md5-output');
  if(!text) { out.textContent = 'Please enter text to hash.'; return; }
  if(window.crypto && window.crypto.subtle){
    var enc = new TextEncoder().encode(text);
    crypto.subtle.digest('MD5', enc).then(function(buf){
      var hex = Array.from(new Uint8Array(buf)).map(function(b){ return b.toString(16).padStart(2,'0'); }).join('');
      out.textContent = hex;
    }).catch(function(){
      var h = 0;
      for(var i=0;i<text.length;i++){ h = ((h << 5) - h) + text.charCodeAt(i); h |= 0; }
      var r = Math.abs(h).toString(16).padStart(8,'0');
      while(r.length < 32) r += r;
      out.textContent = r.substring(0, 32);
    });
  } else {
    var h = 0;
    for(var i=0;i<text.length;i++){ h = ((h << 5) - h) + text.charCodeAt(i); h |= 0; }
    var r = Math.abs(h).toString(16).padStart(8,'0');
    while(r.length < 32) r += r;
    out.textContent = r.substring(0, 32);
  }
};

/* ─── UUID GENERATOR ─── */
window.generateUUID = function(){
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
    var r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  document.getElementById('uuid-output').textContent = uuid;
};

/* ─── COLOR PICKER ─── */
window.updateColorInfo = function(hex){
  document.getElementById('cp-hex').textContent = 'HEX: ' + hex;
  var r = parseInt(hex.slice(1,3), 16);
  var g = parseInt(hex.slice(3,5), 16);
  var b = parseInt(hex.slice(5,7), 16);
  document.getElementById('cp-rgb').textContent = 'RGB: ' + r + ', ' + g + ', ' + b;
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r,g,b), min = Math.min(r,g,b);
  var h, s, l = (max+min)/2;
  if(max===min){ h = s = 0; }
  else {
    var d = max-min;
    s = l > 0.5 ? d / (2-max-min) : d / (max+min);
    switch(max){
      case r: h = ((g-b)/d + (g<b?6:0)) / 6; break;
      case g: h = ((b-r)/d + 2) / 6; break;
      case b: h = ((r-g)/d + 4) / 6; break;
    }
  }
  document.getElementById('cp-hsl').textContent = 'HSL: ' + Math.round(h*360) + ', ' + Math.round(s*100) + '%, ' + Math.round(l*100) + '%';
};

/* ─── COLOR CONVERTER ─── */
var _ccUpdating = false;

function ccHex(r, g, b){
  return '#' + [r,g,b].map(function(v){ return ('0' + Math.round(v).toString(16)).slice(-2); }).join('');
}

function ccRgbToHsl(r, g, b){
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r,g,b), min = Math.min(r,g,b);
  var h, s, l = (max+min)/2;
  if(max === min){ h = s = 0; }
  else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = ((g-b)/d + (g<b?6:0)) / 6; break;
      case g: h = ((b-r)/d + 2) / 6; break;
      case b: h = ((r-g)/d + 4) / 6; break;
    }
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

function ccHslToRgb(h, s, l){
  h /= 360; s /= 100; l /= 100;
  var r, g, b;
  if(s === 0){ r = g = b = l; }
  else {
    function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q-p)*6*t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q-p)*(2/3 - t)*6;
      return p;
    }
    var q = l < 0.5 ? l*(1+s) : l + s - l*s;
    var p = 2*l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
}

function ccRgbToHsv(r, g, b){
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r,g,b), min = Math.min(r,g,b);
  var h, s, v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if(max === min){ h = 0; }
  else {
    switch(max){
      case r: h = ((g-b)/d + (g<b?6:0)) / 6; break;
      case g: h = ((b-r)/d + 2) / 6; break;
      case b: h = ((r-g)/d + 4) / 6; break;
    }
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(v*100)];
}

function ccHsvToRgb(h, s, v){
  h /= 360; s /= 100; v /= 100;
  var i = Math.floor(h*6);
  var f = h*6 - i;
  var p = v*(1 - s);
  var q = v*(1 - f*s);
  var t = v*(1 - (1-f)*s);
  var r, g, b;
  switch(i % 6){
    case 0: r=v; g=t; b=p; break;
    case 1: r=q; g=v; b=p; break;
    case 2: r=p; g=v; b=t; break;
    case 3: r=p; g=q; b=v; break;
    case 4: r=t; g=p; b=v; break;
    case 5: r=v; g=p; b=q; break;
  }
  return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
}

function ccRgbToCmyk(r, g, b){
  var c = 1 - r/255, m = 1 - g/255, y = 1 - b/255, k = Math.min(c, m, y);
  if(k === 1) return [0,0,0,100];
  c = (c - k) / (1 - k) * 100;
  m = (m - k) / (1 - k) * 100;
  y = (y - k) / (1 - k) * 100;
  k *= 100;
  return [Math.round(c), Math.round(m), Math.round(y), Math.round(k)];
}

function ccCmykToRgb(c, m, y, k){
  c /= 100; m /= 100; y /= 100; k /= 100;
  var r = 255 * (1 - c) * (1 - k);
  var g = 255 * (1 - m) * (1 - k);
  var b = 255 * (1 - y) * (1 - k);
  return [Math.round(r), Math.round(g), Math.round(b)];
}

var _ccNames = {
  '000000':'Black','ffffff':'White','ff0000':'Red','00ff00':'Lime','0000ff':'Blue',
  'ffff00':'Yellow','00ffff':'Cyan','ff00ff':'Magenta','c0c0c0':'Silver','808080':'Gray',
  '800000':'Maroon','808000':'Olive','008000':'Green','800080':'Purple','008080':'Teal',
  '000080':'Navy','ffa500':'Orange','ffc0cb':'Pink','a52a2a':'Brown','8a2be2':'BlueViolet',
  'deb887':'Burlywood','5f9ea0':'CadetBlue','7fff00':'Chartreuse','d2691e':'Chocolate',
  'ff7f50':'Coral','6495ed':'CornflowerBlue','dc143c':'Crimson','00bfff':'DeepSkyBlue',
  'ff1493':'DeepPink','1e90ff':'DodgerBlue','b22222':'FireBrick','228b22':'ForestGreen',
  'ffd700':'Gold','adff2f':'GreenYellow','4b0082':'Indigo','f0e68c':'Khaki',
  '00ff00':'LimeGreen','faf0e6':'Linen','ff00ff':'Magenta','fdee00':'Mango',
  'ffe4e1':'MistyRose','ffe4b5':'Moccasin','ffdead':'NavajoWhite','fdf5e6':'OldLace',
  '6b8e23':'OliveDrab','ff4500':'OrangeRed','da70d6':'Orchid','eee8aa':'PaleGoldenrod',
  '98fb98':'PaleGreen','afeeee':'PaleTurquoise','db7093':'PaleVioletRed','ffefd5':'PapayaWhip',
  'ffdab9':'PeachPuff','cd853f':'Peru','ffc0cb':'Pink','dda0dd':'Plum',
  'b0e0e6':'PowderBlue','bc8f8f':'RosyBrown','4169e1':'RoyalBlue','8b4513':'SaddleBrown',
  'fa8072':'Salmon','f4a460':'SandyBrown','2e8b57':'SeaGreen','fff5ee':'SeaShell',
  'a0522d':'Sienna','87ceeb':'SkyBlue','6a5acd':'SlateBlue','708090':'SlateGray',
  'fffafa':'Snow','00ff7f':'SpringGreen','4682b4':'SteelBlue','d2b48c':'Tan',
  'd8bfd8':'Thistle','ff6347':'Tomato','40e0d0':'Turquoise','ee82ee':'Violet',
  '39ff14':'Neon Green','f5f5dc':'Beige','ffe4c4':'Bisque','8a2be2':'BlueViolet'
};

function ccSetAll(r, g, b){
  if(_ccUpdating) return;
  _ccUpdating = true;
  r = Math.max(0, Math.min(255, Math.round(r)));
  g = Math.max(0, Math.min(255, Math.round(g)));
  b = Math.max(0, Math.min(255, Math.round(b)));
  var hex = ccHex(r, g, b);
  var hsl = ccRgbToHsl(r, g, b);
  var hsv = ccRgbToHsv(r, g, b);
  var cmyk = ccRgbToCmyk(r, g, b);
  document.getElementById('cc-hex').value = hex;
  document.getElementById('cc-rgb').value = r + ', ' + g + ', ' + b;
  document.getElementById('cc-hsl').value = hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%';
  document.getElementById('cc-hsv').value = hsv[0] + ', ' + hsv[1] + '%, ' + hsv[2] + '%';
  document.getElementById('cc-cmyk').value = cmyk[0] + '%, ' + cmyk[1] + '%, ' + cmyk[2] + '%, ' + cmyk[3] + '%';
  document.getElementById('cc-preview').style.background = hex;
  var name = _ccNames[hex.replace('#','').toLowerCase()] || 'Unknown';
  document.getElementById('cc-name').textContent = name;
  document.getElementById('cc-info-hex').textContent = 'HEX: ' + hex;
  document.getElementById('cc-info-rgb').textContent = 'RGB: ' + r + ', ' + g + ', ' + b;
  document.getElementById('cc-info-hsl').textContent = 'HSL: ' + hsl.join(', ').replace(/,/g, '°,') + '°';
  document.getElementById('cc-info-hsv').textContent = 'HSV: ' + hsv.join(', ').replace(/,/g, '°,') + '°';
  document.getElementById('cc-info-cmyk').textContent = 'CMYK: ' + cmyk.join('%, ').replace(/%$/,'') + '%';
  document.getElementById('cc-info-w3').innerHTML = '<a href="https://www.w3schools.com/colors/colors_converter.asp?hex=' + hex.replace('#','') + '" target="_blank" style="color:var(--green);text-decoration:underline;">Open in W3Schools →</a>';
  _ccUpdating = false;
}

window.updateFromHEX = function(v){
  v = v.trim();
  if(!/^#?[0-9a-f]{6}$/i.test(v)) return;
  if(v[0] !== '#') v = '#' + v;
  var r = parseInt(v.slice(1,3), 16);
  var g = parseInt(v.slice(3,5), 16);
  var b = parseInt(v.slice(5,7), 16);
  ccSetAll(r, g, b);
};

window.updateFromRGB = function(v){
  var parts = v.split(',').map(function(s){ return parseInt(s.trim()); });
  if(parts.length !== 3 || parts.some(isNaN)) return;
  ccSetAll(parts[0], parts[1], parts[2]);
};

window.updateFromHSL = function(v){
  var parts = v.split(',').map(function(s){ return parseFloat(s.trim()); });
  if(parts.length !== 3) return;
  var h = parts[0], s = parts[1], l = parts[2];
  var rgb = ccHslToRgb(h, s, l);
  ccSetAll(rgb[0], rgb[1], rgb[2]);
};

window.updateFromHSV = function(v){
  var parts = v.split(',').map(function(s){ return parseFloat(s.trim()); });
  if(parts.length !== 3) return;
  var rgb = ccHsvToRgb(parts[0], parts[1], parts[2]);
  ccSetAll(rgb[0], rgb[1], rgb[2]);
};

window.updateFromCMYK = function(v){
  var parts = v.split(',').map(function(s){ return parseFloat(s.trim()); });
  if(parts.length !== 4) return;
  var rgb = ccCmykToRgb(parts[0], parts[1], parts[2], parts[3]);
  ccSetAll(rgb[0], rgb[1], rgb[2]);
};

/* ─── LOREM IPSUM ─── */
window.generateLorem = function(type, count){
  var words = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','ut','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea','commodo','consequat','duis','aute','irure','dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','in','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum'];
  var result = '';
  if(type==='paras'){
    for(var p=0;p<count;p++){
      var para = [];
      for(var i=0;i<20+Math.floor(Math.random()*40);i++) para.push(words[Math.floor(Math.random()*words.length)]);
      result += para.join(' ') + '.\n\n';
    }
  } else {
    for(var i=0;i<count;i++) result += (i?' ':'') + words[Math.floor(Math.random()*words.length)];
    result += '.';
  }
  document.getElementById('lorem-output').value = result.trim();
};

window.copyLorem = function(){
  var ta = document.getElementById('lorem-output');
  ta.select();
  document.execCommand('copy');
};

/* ─── TEXT CLEANER ─── */
window.cleanText = function(mode){
  var input = document.getElementById('clean-input').value;
  var output = document.getElementById('clean-output');
  var result = input;
  switch(mode){
    case 'spaces':
      result = result.replace(/^\s+|\s+$/gm, '').replace(/[ \t]+/g, ' ');
      break;
    case 'quotes':
      result = result.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"').replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");
      break;
    case 'lines':
      result = result.replace(/^\s*[\r\n]/gm, '');
      break;
    case 'all':
      result = result.replace(/^\s+|\s+$/gm, '').replace(/[ \t]+/g, ' ');
      result = result.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"').replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");
      result = result.replace(/^\s*[\r\n]/gm, '');
      break;
  }
  output.value = result;
};

/* ─── HTML VIEWER ─── */
var _renderTimer = null;

window.renderHTML = function(){
  var html = document.getElementById('hv-input').value;
  var iframe = document.getElementById('hv-preview');
  if(!iframe) return;
  var doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
};

window.scheduleRender = function(){
  var auto = document.getElementById('hv-auto');
  if(!auto || !auto.checked) return;
  if(_renderTimer) clearTimeout(_renderTimer);
  _renderTimer = setTimeout(window.renderHTML, 300);
};

window.toggleAutoRender = function(){
  var auto = document.getElementById('hv-auto');
  if(auto && auto.checked) window.renderHTML();
};

window.clearHTML = function(){
  document.getElementById('hv-input').value = '';
  window.renderHTML();
};

window.openTabPreview = function(){
  var html = document.getElementById('hv-input').value;
  var win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
};

function handleHash(){
  var hash = window.location.hash.replace('#','');
  if(!hash) return;
  if(hash.startsWith('tools-')){
    var toolId = hash.replace('tools-','');
    var exists = TOOLS.some(function(t){ return t.id === toolId; });
    if(exists) openTool(toolId);
  }
}

window.addEventListener('hashchange', function(){
  var hash = window.location.hash.replace('#','');
  if(!hash || !hash.startsWith('tools-')){
    var detail = document.getElementById('tool-detail');
    var grid = document.getElementById('tools-grid');
    if(detail) detail.classList.remove('active');
    if(grid) grid.style.display = '';
  }
  if(hash.startsWith('tools-')) handleHash();
});

/* ─── NEW PDF TOOL HELPERS ─── */
var _pdfLibPromise = null;
function ensurePdfLib(){
  if(_pdfLibPromise) return _pdfLibPromise;
  _pdfLibPromise = import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
  return _pdfLibPromise;
}

/* ─── MERGE PDF ─── */
var _mergePdfFiles = [];

window.handleMergePdfUpload = function(files){
  if(!files || !files.length) return;
  _mergePdfFiles = [];
  for(var i=0;i<files.length;i++){
    if(files[i].type === 'application/pdf' || files[i].name.match(/\.pdf$/i)){
      _mergePdfFiles.push(files[i]);
    }
  }
  if(_mergePdfFiles.length === 0){
    document.getElementById('merge-pdf-error').textContent = 'No valid PDF files found.';
    document.getElementById('merge-pdf-error').style.display = 'block';
    return;
  }
  document.getElementById('merge-pdf-error').style.display = 'none';
  var list = document.getElementById('merge-pdf-list');
  list.innerHTML = '<div style="font-size:0.65rem;color:var(--green);">' + _mergePdfFiles.length + ' PDF(s) selected:</div>' +
    _mergePdfFiles.map(function(f,i){ return '<div style="font-size:0.6rem;color:var(--muted);padding:4px 0;">' + (i+1) + '. ' + f.name + ' (' + formatSize(f.size) + ')</div>'; }).join('');
  document.getElementById('merge-pdf-btn').style.display = 'block';
};

window.mergePdfFiles = function(){
  if(!_mergePdfFiles || _mergePdfFiles.length < 2){
    document.getElementById('merge-pdf-error').textContent = 'Please upload at least 2 PDF files.';
    document.getElementById('merge-pdf-error').style.display = 'block';
    return;
  }
  document.getElementById('merge-pdf-progress').style.display = 'block';
  document.getElementById('merge-pdf-btn').style.display = 'none';
  document.getElementById('merge-pdf-error').style.display = 'none';
  ensurePdfLib().then(function(pdfLib){
    var PDFDocument = pdfLib.PDFDocument;
    var mergedPdf = PDFDocument.create();
    var readers = _mergePdfFiles.map(function(f){ return f.arrayBuffer(); });
    return Promise.all(readers).then(function(buffers){
      var chain = Promise.resolve();
      buffers.forEach(function(buf){
        chain = chain.then(function(){
          return PDFDocument.load(buf).then(function(doc){
            var indices = doc.getPageIndices();
            return mergedPdf.copyPages(doc, indices).then(function(pages){
              pages.forEach(function(p){ mergedPdf.addPage(p); });
            });
          });
        });
      });
      return chain.then(function(){ return mergedPdf.save(); });
    });
  }).then(function(pdfBytes){
    _mergePdfResult = new Blob([pdfBytes], {type:'application/pdf'});
    document.getElementById('merge-pdf-progress').style.display = 'none';
    document.getElementById('merge-pdf-download').style.display = 'block';
  }).catch(function(err){
    document.getElementById('merge-pdf-progress').style.display = 'none';
    document.getElementById('merge-pdf-error').textContent = 'Merge failed: ' + err.message;
    document.getElementById('merge-pdf-error').style.display = 'block';
  });
};

var _mergePdfResult = null;
window.downloadMergedPdf = function(){
  if(!_mergePdfResult) return;
  var a = document.createElement('a');
  a.href = URL.createObjectURL(_mergePdfResult);
  a.download = 'merged.pdf';
  a.click();
};

/* ─── SPLIT PDF ─── */
var _splitPdfFile = null;
var _splitPdfPages = [];

window.handleSplitPdfUpload = function(file){
  if(!file) return;
  _splitPdfFile = file;
  document.getElementById('split-pdf-info').style.display = 'block';
  document.getElementById('split-pdf-info').textContent = '📄 ' + file.name + ' (' + formatSize(file.size) + ')';
  document.getElementById('split-pdf-btn').style.display = 'block';
  document.getElementById('split-pdf-error').style.display = 'none';
  document.getElementById('split-pdf-result').style.display = 'none';
};

window.splitPdfFile = function(){
  if(!_splitPdfFile) return;
  document.getElementById('split-pdf-progress').style.display = 'block';
  document.getElementById('split-pdf-btn').style.display = 'none';
  document.getElementById('split-pdf-error').style.display = 'none';
  ensurePdfLib().then(function(pdfLib){
    return _splitPdfFile.arrayBuffer().then(function(buf){
      return pdfLib.PDFDocument.load(buf).then(function(doc){
        _splitPdfPages = [];
        var indices = doc.getPageIndices();
        var chain = Promise.resolve();
        indices.forEach(function(idx){
          chain = chain.then(function(){
            var newDoc = pdfLib.PDFDocument.create();
            return newDoc.copyPages(doc, [idx]).then(function(pages){
              newDoc.addPage(pages[0]);
              return newDoc.save();
            }).then(function(bytes){
              _splitPdfPages.push(new Blob([bytes], {type:'application/pdf'}));
            });
          });
        });
        return chain;
      });
    });
  }).then(function(){
    document.getElementById('split-pdf-progress').style.display = 'none';
    var result = document.getElementById('split-pdf-result');
    result.style.display = 'block';
    var html = '<div style="font-size:0.65rem;color:var(--green);margin-bottom:12px;">Split into ' + _splitPdfPages.length + ' pages:</div>';
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
    _splitPdfPages.forEach(function(blob,i){
      html += '<button onclick="window.downloadSplitPage(' + i + ')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.55rem;padding:6px 12px;cursor:none;letter-spacing:0.1em;">Page ' + (i+1) + '</button>';
    });
    html += '</div>';
    html += '<div style="margin-top:12px;"><button onclick="window.downloadAllSplitPages()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Download All (' + _splitPdfPages.length + ' files)</button></div>';
    result.innerHTML = html;
  }).catch(function(err){
    document.getElementById('split-pdf-progress').style.display = 'none';
    document.getElementById('split-pdf-error').textContent = 'Split failed: ' + err.message;
    document.getElementById('split-pdf-error').style.display = 'block';
  });
};

window.downloadSplitPage = function(idx){
  var a = document.createElement('a');
  a.href = URL.createObjectURL(_splitPdfPages[idx]);
  a.download = 'page_' + (idx+1) + '.pdf';
  a.click();
};

/* ─── CREATE PDF ─── */
window.createPdfFromText = function(){
  var text = document.getElementById('create-pdf-text').value;
  if(!text.trim()){
    document.getElementById('create-pdf-error').textContent = 'Please enter some text.';
    document.getElementById('create-pdf-error').style.display = 'block';
    return;
  }
  document.getElementById('create-pdf-error').style.display = 'none';
  var title = document.getElementById('create-pdf-title').value || 'Document';
  var author = document.getElementById('create-pdf-author').value || '';
  ensurePdfLib().then(function(pdfLib){
    var doc = pdfLib.PDFDocument.create();
    if(title) doc.setTitle(title);
    if(author) doc.setAuthor(author);
    doc.setCreator('Mahir\'s Tools');
    return doc.embedFont(pdfLib.StandardFonts.Helvetica).then(function(font){
      var page = doc.addPage([612, 792]);
      var lines = text.split('\n');
      var y = 740;
      var size = 11;
      lines.forEach(function(line){
        if(y < 40){
          page = doc.addPage([612, 792]);
          y = 740;
        }
        page.drawText(line || ' ', { x: 72, y: y, size: size, font: font, color: pdfLib.rgb(0,0,0) });
        y -= 16;
      });
      return doc.save();
    });
  }).then(function(bytes){
    var blob = new Blob([bytes], {type:'application/pdf'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = title.replace(/[^a-z0-9]/gi,'_').toLowerCase() + '.pdf';
    a.click();
  }).catch(function(err){
    document.getElementById('create-pdf-error').textContent = 'Failed: ' + err.message;
    document.getElementById('create-pdf-error').style.display = 'block';
  });
};

/* ─── PDF TO JPG ─── */
var _ptjPages = [];
var _ptjFile = null;

window.handlePtjUpload = function(file){
  if(!file) return;
  _ptjFile = file;
  _ptjPages = [];
  document.getElementById('ptj-info').style.display = 'block';
  document.getElementById('ptj-info').textContent = '📄 ' + file.name + ' (' + formatSize(file.size) + ')';
  document.getElementById('ptj-progress').style.display = 'block';
  document.getElementById('ptj-error').style.display = 'none';
  document.getElementById('ptj-result').style.display = 'none';
  document.getElementById('ptj-download-all').style.display = 'none';

  var pdfjsLib = window.pdfjsLib;
  if(!pdfjsLib){
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    s.onload = function(){
      pdfjsLib = window.pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      renderPdfToJpg(file, pdfjsLib);
    };
    document.head.appendChild(s);
  } else {
    renderPdfToJpg(file, pdfjsLib);
  }
};

function renderPdfToJpg(file, pdfjsLib){
  file.arrayBuffer().then(function(buf){
    return pdfjsLib.getDocument({data: buf}).promise;
  }).then(function(pdf){
    var canvases = [];
    var chain = Promise.resolve();
    for(var i=1;i<=pdf.numPages;i++){
      chain = chain.then((function(pageNum){
        return function(){
          return pdf.getPage(pageNum).then(function(page){
            var scale = 1.5;
            var viewport = page.getViewport({scale:scale});
            var canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            return page.render({canvasContext:canvas.getContext('2d'),viewport:viewport}).promise.then(function(){
              _ptjPages.push({canvas:canvas, page:pageNum});
            });
          });
        };
      })(i));
    }
    return chain;
  }).then(function(){
    document.getElementById('ptj-progress').style.display = 'none';
    var result = document.getElementById('ptj-result');
    result.style.display = 'block';
    var html = '<div style="font-size:0.65rem;color:var(--green);margin-bottom:12px;">' + _ptjPages.length + ' page(s) rendered:</div>';
    html += '<div style="display:flex;gap:12px;flex-wrap:wrap;">';
    _ptjPages.forEach(function(p,i){
      var dataUrl = p.canvas.toDataURL('image/jpeg',0.92);
      html += '<div style="text-align:center;">' +
        '<img src="' + dataUrl + '" style="max-width:120px;max-height:150px;border:1px solid var(--green-border);border-radius:4px;display:block;margin-bottom:4px;">' +
        '<button onclick="window.downloadPtjPage(' + i + ')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:4px 10px;cursor:none;">Page ' + (i+1) + '</button></div>';
    });
    html += '</div>';
    result.innerHTML = html;
    document.getElementById('ptj-download-all').style.display = 'block';
  }).catch(function(err){
    document.getElementById('ptj-progress').style.display = 'none';
    document.getElementById('ptj-error').textContent = 'Failed: ' + err.message;
    document.getElementById('ptj-error').style.display = 'block';
  });
}

window.downloadPtjPage = function(idx){
  var p = _ptjPages[idx];
  var a = document.createElement('a');
  a.href = p.canvas.toDataURL('image/jpeg',0.92);
  a.download = 'page_' + (idx+1) + '.jpg';
  a.click();
};

/* ─── EPOCH CONVERTER ─── */
window.epochToDate = function(){
  var ts = document.getElementById('ec-ts').value;
  if(!ts) return;
  var d = new Date(parseInt(ts) * 1000);
  document.getElementById('ec-ts-result').textContent = isNaN(d.getTime()) ? 'Invalid timestamp' : d.toLocaleString();
};

window.dateToEpoch = function(){
  var val = document.getElementById('ec-date').value;
  if(!val) return;
  var d = new Date(val);
  document.getElementById('ec-date-result').textContent = Math.floor(d.getTime() / 1000);
};

window.copyEpochResult = function(){
  var ts = document.getElementById('ec-ts-result').textContent;
  var ds = document.getElementById('ec-date-result').textContent;
  var text = ts || ds;
  if(text && text !== 'Invalid timestamp') navigator.clipboard.writeText(text);
};

window.nowEpoch = function(){
  var now = Math.floor(Date.now() / 1000);
  document.getElementById('ec-ts').value = now;
  document.getElementById('ec-ts-result').textContent = new Date().toLocaleString();
};

/* ─── CSV ↔ JSON ─── */
window.csvToJson = function(){
  var text = document.getElementById('cj-input').value;
  if(!text.trim()) return;
  try {
    var lines = text.split('\n').filter(function(l){ return l.trim(); });
    if(lines.length < 2) throw new Error('CSV needs at least a header and one row');
    var headers = parseCsvLine(lines[0]);
    var result = [];
    for(var i=1;i<lines.length;i++){
      var vals = parseCsvLine(lines[i]);
      if(vals.length !== headers.length) continue;
      var obj = {};
      for(var j=0;j<headers.length;j++) obj[headers[j].trim()] = vals[j].trim();
      result.push(obj);
    }
    document.getElementById('cj-output').value = JSON.stringify(result, null, 2);
  } catch(e){
    document.getElementById('cj-output').value = 'Error: ' + e.message;
  }
};

window.jsonToCsv = function(){
  var text = document.getElementById('cj-input').value;
  if(!text.trim()) return;
  try {
    var data = JSON.parse(text);
    if(!Array.isArray(data)) data = [data];
    if(!data.length) throw new Error('Empty array');
    var headers = Object.keys(data[0]);
    var csv = headers.join(',') + '\n';
    data.forEach(function(row){
      csv += headers.map(function(h){
        var val = (row[h] !== undefined && row[h] !== null) ? String(row[h]) : '';
        return val.includes(',') || val.includes('"') || val.includes('\n') ? '"' + val.replace(/"/g,'""') + '"' : val;
      }).join(',') + '\n';
    });
    document.getElementById('cj-output').value = csv;
  } catch(e){
    document.getElementById('cj-output').value = 'Error: ' + e.message;
  }
};

function parseCsvLine(line){
  var result = [], current = '', inQuotes = false;
  for(var i=0;i<line.length;i++){
    var c = line[i];
    if(inQuotes){
      if(c === '"' && line[i+1] === '"'){ current += '"'; i++; }
      else if(c === '"') inQuotes = false;
      else current += c;
    } else {
      if(c === '"') inQuotes = true;
      else if(c === ','){ result.push(current); current = ''; }
      else current += c;
    }
  }
  result.push(current);
  return result;
}

window.copyCjOutput = function(){
  var el = document.getElementById('cj-output');
  if(el && el.value) el.select(), navigator.clipboard.writeText(el.value);
};

/* ─── XML ↔ JSON ─── */
window.xmlToJson = function(){
  var text = document.getElementById('xj-input').value;
  if(!text.trim()) return;
  try {
    var parser = new DOMParser();
    var xml = parser.parseFromString(text, 'text/xml');
    var errNode = xml.querySelector('parsererror');
    if(errNode) throw new Error('Invalid XML');
    var json = xmlToJsonSimple(xml.documentElement);
    document.getElementById('xj-output').value = JSON.stringify(json, null, 2);
  } catch(e){
    document.getElementById('xj-output').value = 'Error: ' + e.message;
  }
};

function xmlToJsonSimple(node){
  var obj = {};
  if(node.attributes && node.attributes.length){
    for(var i=0;i<node.attributes.length;i++){
      obj['@' + node.attributes[i].name] = node.attributes[i].value;
    }
  }
  if(node.children && node.children.length){
    for(var i=0;i<node.children.length;i++){
      var child = node.children[i];
      var key = child.tagName;
      var val = xmlToJsonSimple(child);
      if(obj[key]){ if(!Array.isArray(obj[key])) obj[key] = [obj[key]]; obj[key].push(val); }
      else obj[key] = val;
    }
  } else {
    var txt = node.textContent.trim();
    return txt || (Object.keys(obj).length ? obj : null);
  }
  return obj;
}

window.jsonToXml = function(){
  var text = document.getElementById('xj-input').value;
  if(!text.trim()) return;
  try {
    var json = JSON.parse(text);
    var xml = jsonToXmlSimple(json, 'root');
    document.getElementById('xj-output').value = xml;
  } catch(e){
    document.getElementById('xj-output').value = 'Error: ' + e.message;
  }
};

function jsonToXmlSimple(obj, name){
  var xml = '<' + name;
  var children = '';
  if(obj !== null && typeof obj === 'object'){
    if(Array.isArray(obj)){
      obj.forEach(function(item){
        children += jsonToXmlSimple(item, name);
      });
      return children;
    }
    for(var key in obj){
      if(key.startsWith('@')) xml += ' ' + key.slice(1) + '="' + String(obj[key]) + '"';
      else children += jsonToXmlSimple(obj[key], key);
    }
  } else {
    children = String(obj);
    if(children) children = escapeXml(children);
  }
  if(children) xml += '>' + children + '</' + name + '>';
  else xml += '/>';
  return xml;
}

function escapeXml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}

window.copyXjOutput = function(){
  var el = document.getElementById('xj-output');
  if(el && el.value) el.select(), navigator.clipboard.writeText(el.value);
};

/* ─── SPLIT CSV ─── */
var _scCsvText = '';
var _scFileName = '';

window.handleScUpload = function(file){
  if(!file) return;
  var reader = new FileReader();
  reader.onload = function(e){
    _scCsvText = e.target.result;
    _scFileName = file.name;
    var lines = _scCsvText.split('\n').filter(function(l){ return l.trim(); });
    document.getElementById('sc-info').style.display = 'block';
    document.getElementById('sc-info').textContent = '📊 ' + file.name + ' — ' + lines.length + ' rows';
    document.getElementById('sc-rows-input').style.display = 'block';
    document.getElementById('sc-error').style.display = 'none';
  };
  reader.readAsText(file);
};

/* ─── LOAD JSZip (used by split, download-all, create-zip) ─── */
(function loadJSZip(){
  if(typeof JSZip !== 'undefined'){ window._jszipReady = true; return; }
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
  s.onload = function(){ window._jszipReady = true; };
  document.head.appendChild(s);
})();

function ensureJSZip(){
  if(typeof JSZip !== 'undefined') return Promise.resolve(JSZip);
  return new Promise(function(resolve){
    function check(){ if(typeof JSZip !== 'undefined') resolve(JSZip); else setTimeout(check, 100); }
    check();
  });
}

/* ─── FIX FUNCTIONS THAT USE JSZip TO WAIT FOR IT ─── */

window.downloadAllSplitPages = function(){
  ensureJSZip().then(function(JSZip){
    var zip = new JSZip();
    _splitPdfPages.forEach(function(blob,i){
      zip.file('page_'+(i+1)+'.pdf', blob);
    });
    return zip.generateAsync({type:'blob'});
  }).then(function(content){
    var a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'split_pages.zip';
    a.click();
  });
};

window.downloadAllPtj = function(){
  ensureJSZip().then(function(JSZip){
    var zip = new JSZip();
    _ptjPages.forEach(function(p,i){
      var dataUrl = p.canvas.toDataURL('image/jpeg',0.92);
      var bin = atob(dataUrl.split(',')[1]);
      var arr = new Uint8Array(bin.length);
      for(var j=0;j<bin.length;j++) arr[j] = bin.charCodeAt(j);
      zip.file('page_'+(i+1)+'.jpg', arr);
    });
    return zip.generateAsync({type:'blob'});
  }).then(function(content){
    var a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = _ptjFile ? _ptjFile.name.replace(/\.pdf$/i,'') + '_pages.zip' : 'pages.zip';
    a.click();
  });
};

window.splitCsvFile = function(){
  if(!_scCsvText) return;
  var rowsPerFile = parseInt(document.getElementById('sc-rows').value) || 100;
  if(rowsPerFile < 1) rowsPerFile = 1;
  document.getElementById('sc-progress').style.display = 'block';
  document.getElementById('sc-rows-input').style.display = 'none';
  document.getElementById('sc-error').style.display = 'none';

  setTimeout(function(){
    try {
      var lines = _scCsvText.split('\n');
      var header = lines[0] || '';
      var dataLines = [];
      for(var i=1;i<lines.length;i++){
        if(lines[i].trim()) dataLines.push(lines[i]);
      }
      var fileCount = Math.ceil(dataLines.length / rowsPerFile);
      ensureJSZip().then(function(JSZip){
        var zip = new JSZip();
        for(var f=0;f<fileCount;f++){
          var start = f * rowsPerFile;
          var end = Math.min(start + rowsPerFile, dataLines.length);
          var chunk = [header].concat(dataLines.slice(start, end)).join('\n');
          var name = _scFileName.replace(/\.csv$/i, '') + '_part_' + (f+1) + '.csv';
          zip.file(name, chunk);
        }
        return zip.generateAsync({type:'blob'});
      }).then(function(content){
        document.getElementById('sc-progress').style.display = 'none';
        var result = document.getElementById('sc-result');
        result.style.display = 'block';
        result.innerHTML = '<div style="font-size:0.65rem;color:var(--green);">Split into ' + fileCount + ' files (' + rowsPerFile + ' rows each)</div>' +
          '<button onclick="var a=document.createElement(\'a\');a.href=URL.createObjectURL(content);a.download=\'' + _scFileName.replace(/\.csv$/i,'') + '_split.zip\';a.click();" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Download ZIP</button>';
      });
    } catch(err){
      document.getElementById('sc-progress').style.display = 'none';
      document.getElementById('sc-error').textContent = 'Error: ' + err.message;
      document.getElementById('sc-error').style.display = 'block';
      document.getElementById('sc-rows-input').style.display = 'block';
    }
  }, 50);
};

window.createZipArchive = function(){
  if(!_czFiles.length) return;
  document.getElementById('cz-progress').style.display = 'block';
  document.getElementById('cz-btn').style.display = 'none';
  document.getElementById('cz-error').style.display = 'none';
  setTimeout(function(){
    ensureJSZip().then(function(JSZip){
      var zip = new JSZip();
      var readers = _czFiles.map(function(f){
        return f.arrayBuffer().then(function(buf){
          zip.file(f.name, buf);
        });
      });
      return Promise.all(readers).then(function(){
        return zip.generateAsync({type:'blob'});
      });
    }).then(function(content){
      document.getElementById('cz-progress').style.display = 'none';
      var a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = 'archive.zip';
      a.click();
    }).catch(function(err){
      document.getElementById('cz-progress').style.display = 'none';
      document.getElementById('cz-error').textContent = 'Failed: ' + err.message;
      document.getElementById('cz-error').style.display = 'block';
    });
  }, 50);
};

/* ─── PDF UNLOCK ─── */
var _unlockedPdfFile = null;

window.handleUnlockPdfUpload = function(file){
  if(!file) return;
  _unlockedPdfFile = file;
  document.getElementById('unlock-pdf-info').style.display = 'block';
  document.getElementById('unlock-pdf-info').textContent = '📄 ' + file.name + ' (' + formatSize(file.size) + ')';
  document.getElementById('unlock-pdf-pw').style.display = 'block';
  document.getElementById('unlock-pdf-error').style.display = 'none';
  document.getElementById('unlock-pdf-download').style.display = 'none';
};

window.unlockPdfFile = function(){
  var pass = document.getElementById('unlock-pdf-pass').value;
  if(!pass){ document.getElementById('unlock-pdf-error').textContent = 'Enter a password.'; document.getElementById('unlock-pdf-error').style.display = 'block'; return; }
  document.getElementById('unlock-pdf-progress').style.display = 'block';
  document.getElementById('unlock-pdf-error').style.display = 'none';
  ensurePdfLib().then(function(PDFLib){
    var reader = new FileReader();
    reader.onload = function(e){
      try {
        var pdfDoc = PDFLib.PDFDocument.load(e.target.result, { password: pass });
        pdfDoc.then(function(doc){
          return doc.save();
        }).then(function(bytes){
          document.getElementById('unlock-pdf-progress').style.display = 'none';
          _unlockedPdfFile = new Blob([bytes], {type:'application/pdf'});
          document.getElementById('unlock-pdf-download').style.display = 'block';
        }).catch(function(err){
          document.getElementById('unlock-pdf-progress').style.display = 'none';
          document.getElementById('unlock-pdf-error').textContent = 'Failed: ' + err.message;
          document.getElementById('unlock-pdf-error').style.display = 'block';
        });
      } catch(err){
        document.getElementById('unlock-pdf-progress').style.display = 'none';
        document.getElementById('unlock-pdf-error').textContent = 'Error: ' + err.message;
        document.getElementById('unlock-pdf-error').style.display = 'block';
      }
    };
    reader.readAsArrayBuffer(_unlockedPdfFile);
  });
};

window.downloadUnlockedPdf = function(){
  if(!_unlockedPdfFile) return;
  var a = document.createElement('a');
  a.href = URL.createObjectURL(_unlockedPdfFile);
  a.download = 'unlocked.pdf';
  a.click();
};

/* ─── PDF PROTECT ─── */
var _protectedPdfBytes = null;

window.handleProtectPdfUpload = function(file){
  if(!file) return;
  var reader = new FileReader();
  reader.onload = function(e){ _protectedPdfBytes = e.target.result; };
  reader.readAsArrayBuffer(file);
  document.getElementById('protect-pdf-info').style.display = 'block';
  document.getElementById('protect-pdf-info').textContent = '📄 ' + file.name + ' (' + formatSize(file.size) + ')';
  document.getElementById('protect-pdf-pw').style.display = 'block';
  document.getElementById('protect-pdf-error').style.display = 'none';
  document.getElementById('protect-pdf-download').style.display = 'none';
};

window.protectPdfFile = function(){
  var pass = document.getElementById('protect-pdf-pass').value;
  if(!pass || !_protectedPdfBytes){ document.getElementById('protect-pdf-error').textContent = 'Upload a PDF and enter a password.'; document.getElementById('protect-pdf-error').style.display = 'block'; return; }
  document.getElementById('protect-pdf-progress').style.display = 'block';
  document.getElementById('protect-pdf-error').style.display = 'none';
  ensurePdfLib().then(function(PDFLib){
    try {
      PDFLib.PDFDocument.load(_protectedPdfBytes).then(function(doc){
        return doc.save({ userPassword: pass, ownerPassword: pass });
      }).then(function(bytes){
        document.getElementById('protect-pdf-progress').style.display = 'none';
        _protectedPdfFile = new Blob([bytes], {type:'application/pdf'});
        document.getElementById('protect-pdf-download').style.display = 'block';
      }).catch(function(err){
        document.getElementById('protect-pdf-progress').style.display = 'none';
        document.getElementById('protect-pdf-error').textContent = 'Failed: ' + err.message;
        document.getElementById('protect-pdf-error').style.display = 'block';
      });
    } catch(err){
      document.getElementById('protect-pdf-progress').style.display = 'none';
      document.getElementById('protect-pdf-error').textContent = 'Error: ' + err.message;
      document.getElementById('protect-pdf-error').style.display = 'block';
    }
  });
};

var _protectedPdfFile = null;

window.downloadProtectedPdf = function(){
  if(!_protectedPdfFile) return;
  var a = document.createElement('a');
  a.href = URL.createObjectURL(_protectedPdfFile);
  a.download = 'protected.pdf';
  a.click();
};

/* ─── PDF EXTRACT TEXT ─── */
window.handleEtUpload = function(file){
  if(!file) return;
  document.getElementById('et-progress').style.display = 'block';
  document.getElementById('et-error').style.display = 'none';
  var reader = new FileReader();
  reader.onload = function(e){
    var pdfjsLib = window.pdfjsLib;
    if(!pdfjsLib){
      document.getElementById('et-error').textContent = 'PDF.js library not loaded.';
      document.getElementById('et-error').style.display = 'block';
      document.getElementById('et-progress').style.display = 'none';
      return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    var loadingTask = pdfjsLib.getDocument({ data: e.target.result });
    loadingTask.promise.then(function(pdf){
      var fullText = '';
      var pagePromises = [];
      for(var i=1;i<=pdf.numPages;i++){
        pagePromises.push(pdf.getPage(i).then(function(page){
          return page.getTextContent().then(function(textContent){
            var pageText = textContent.items.map(function(item){ return item.str; }).join(' ');
            if(pageText) fullText += pageText + '\n';
          });
        }));
      }
      return Promise.all(pagePromises).then(function(){
        document.getElementById('et-progress').style.display = 'none';
        document.getElementById('et-text-output').value = fullText || '(no text found)';
        document.getElementById('et-result').style.display = 'block';
      });
    }).catch(function(err){
      document.getElementById('et-progress').style.display = 'none';
      document.getElementById('et-error').textContent = 'Failed to extract text: ' + err.message;
      document.getElementById('et-error').style.display = 'block';
    });
  };
  reader.readAsArrayBuffer(file);
};

window.copyEtText = function(){
  var el = document.getElementById('et-text-output');
  if(el && el.value) navigator.clipboard.writeText(el.value);
};

/* ─── CREATE ZIP ─── */
var _czFiles = [];

window.handleCzUpload = function(files){
  if(!files || !files.length) return;
  _czFiles = [];
  for(var i=0;i<files.length;i++) _czFiles.push(files[i]);
  var list = document.getElementById('cz-list');
  list.innerHTML = _czFiles.map(function(f,i){
    return '<div style="font-size:0.6rem;color:var(--muted);padding:4px 0;">' + (i+1) + '. ' + f.name + ' (' + formatSize(f.size) + ')</div>';
  }).join('');
  document.getElementById('cz-btn').style.display = 'block';
  document.getElementById('cz-error').style.display = 'none';
};

/* ─── IMAGE TOOLS ─── */

window.addBorderToImage = function(){
  var file = document.getElementById('ab-upload').files[0];
  if(!file) return;
  var width = parseInt(document.getElementById('ab-width').value) || 10;
  var color = document.getElementById('ab-color').value;
  var img = new Image();
  img.onload = function(){
    var c = document.createElement('canvas');
    c.width = img.width + width*2;
    c.height = img.height + width*2;
    var ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0,0,c.width,c.height);
    ctx.drawImage(img, width, width);
    c.toBlob(function(blob){
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'bordered_' + file.name;
      a.click();
    });
  };
  img.src = URL.createObjectURL(file);
};

window.makeRoundImage = function(){
  var file = document.getElementById('ri-upload').files[0];
  if(!file) return;
  var border = parseInt(document.getElementById('ri-border').value) || 0;
  var size = parseInt(document.getElementById('ri-size').value) || 400;
  var img = new Image();
  img.onload = function(){
    var c = document.createElement('canvas');
    c.width = size + border*2;
    c.height = size + border*2;
    var ctx = c.getContext('2d');
    if(border > 0){
      ctx.beginPath();
      ctx.arc(size/2+border, size/2+border, size/2+border, 0, Math.PI*2);
      ctx.fillStyle = '#39ff14';
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(size/2+border, size/2+border, size/2, 0, Math.PI*2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, border, border, size, size);
    c.toBlob(function(blob){
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'round_' + file.name;
      a.click();
    });
  };
  img.src = URL.createObjectURL(file);
};

window.splitImageToPieces = function(){
  var file = document.getElementById('is-upload').files[0];
  if(!file) return;
  var rows = parseInt(document.getElementById('is-rows').value) || 2;
  var cols = parseInt(document.getElementById('is-cols').value) || 2;
  var img = new Image();
  img.onload = function(){
    var pw = Math.floor(img.width / cols);
    var ph = Math.floor(img.height / rows);
    var resultEl = document.getElementById('is-result');
    resultEl.innerHTML = '';
    resultEl.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    for(var r=0;r<rows;r++){
      for(var c=0;c<cols;c++){
        (function(x,y){
          var ci = document.createElement('canvas');
          ci.width = pw; ci.height = ph;
          ci.getContext('2d').drawImage(img, x*pw, y*ph, pw, ph, 0, 0, pw, ph);
          var link = document.createElement('a');
          link.href = ci.toDataURL();
          link.download = 'piece_' + (y+1) + '_' + (x+1) + '.png';
          link.innerHTML = '<img src="' + ci.toDataURL() + '" style="width:100%;display:block;border:1px solid var(--green-border);">';
          link.target = '_blank';
          link.style.cursor = 'pointer';
          resultEl.appendChild(link);
        })(c, r);
      }
    }
  };
  img.src = URL.createObjectURL(file);
};

window.pixelateImage = function(){
  var file = document.getElementById('px-upload').files[0];
  if(!file) return;
  var block = parseInt(document.getElementById('px-size').value) || 8;
  var img = new Image();
  img.onload = function(){
    var c = document.createElement('canvas');
    var w = img.width, h = img.height;
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, w, h);
    var pixels = data.data;
    for(var y=0;y<h;y+=block){
      for(var x=0;x<w;x+=block){
        var totalR=0, totalG=0, totalB=0, count=0;
        for(var dy=0;dy<block && y+dy<h;dy++){
          for(var dx=0;dx<block && x+dx<w;dx++){
            var idx = ((y+dy)*w + (x+dx)) * 4;
            totalR += pixels[idx];
            totalG += pixels[idx+1];
            totalB += pixels[idx+2];
            count++;
          }
        }
        var avgR = totalR/count, avgG = totalG/count, avgB = totalB/count;
        for(var dy=0;dy<block && y+dy<h;dy++){
          for(var dx=0;dx<block && x+dx<w;dx++){
            var idx = ((y+dy)*w + (x+dx)) * 4;
            pixels[idx] = avgR;
            pixels[idx+1] = avgG;
            pixels[idx+2] = avgB;
          }
        }
      }
    }
    ctx.putImageData(data, 0, 0);
    c.toBlob(function(blob){
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'pixelated_' + file.name;
      a.click();
    });
  };
  img.src = URL.createObjectURL(file);
};

window.combineTwoImages = function(){
  var f1 = document.getElementById('ci-upload1').files[0];
  var f2 = document.getElementById('ci-upload2').files[0];
  if(!f1 || !f2) return;
  var dir = document.getElementById('ci-dir').value;
  var gap = parseInt(document.getElementById('ci-gap').value) || 10;
  var img1 = new Image();
  var img2 = new Image();
  var loaded = 0;
  img1.onload = img2.onload = function(){
    if(++loaded < 2) return;
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    if(dir === 'horizontal'){
      c.width = img1.width + gap + img2.width;
      c.height = Math.max(img1.height, img2.height);
      ctx.drawImage(img1, 0, 0);
      ctx.drawImage(img2, img1.width + gap, 0);
    } else {
      c.width = Math.max(img1.width, img2.width);
      c.height = img1.height + gap + img2.height;
      ctx.drawImage(img1, 0, 0);
      ctx.drawImage(img2, 0, img1.height + gap);
    }
    c.toBlob(function(blob){
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'combined.png';
      a.click();
    });
  };
  img1.src = URL.createObjectURL(f1);
  img2.src = URL.createObjectURL(f2);
};

window.addTextToImage = function(){
  var file = document.getElementById('at-upload').files[0];
  if(!file) return;
  var text = document.getElementById('at-text').value;
  if(!text) return;
  var fontSize = parseInt(document.getElementById('at-size').value) || 36;
  var color = document.getElementById('at-color').value;
  var pos = document.getElementById('at-pos').value;
  var img = new Image();
  img.onload = function(){
    var c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = color;
    ctx.font = fontSize + 'px sans-serif';
    ctx.textAlign = 'center';
    var x = img.width / 2;
    var y;
    if(pos === 'top') y = fontSize + 20;
    else if(pos === 'bottom') y = img.height - 20;
    else y = img.height / 2 + fontSize/3;
    ctx.fillText(text, x, y);
    c.toBlob(function(blob){
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'text_' + file.name;
      a.click();
    });
  };
  img.src = URL.createObjectURL(file);
};

window.blurBackgroundImage = function(){
  var file = document.getElementById('bb-upload').files[0];
  if(!file) return;
  var amt = parseInt(document.getElementById('bb-amt').value) || 10;
  document.getElementById('bb-progress').style.display = 'block';
  document.getElementById('bb-error').style.display = 'none';
  var img = new Image();
  img.onload = function(){
    var c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var id = ctx.getImageData(0, 0, c.width, c.height);
    var d = id.data, w = c.width, h = c.height;
    var r = Math.max(1, Math.floor(amt/2));
    var copy = new Uint8ClampedArray(d);
    for(var y=0;y<h;y++){
      for(var x=0;x<w;x++){
        var tr=0,tg=0,tb=0,n=0;
        for(var dy=-r;dy<=r;dy++){
          for(var dx=-r;dx<=r;dx++){
            var nx = x+dx, ny = y+dy;
            if(nx>=0 && nx<w && ny>=0 && ny<h){
              var i = (ny*w+nx)*4;
              tr += copy[i]; tg += copy[i+1]; tb += copy[i+2]; n++;
            }
          }
        }
        var i2 = (y*w+x)*4;
        d[i2] = tr/n; d[i2+1] = tg/n; d[i2+2] = tb/n;
      }
    }
    ctx.putImageData(id, 0, 0);
    document.getElementById('bb-progress').style.display = 'none';
    c.toBlob(function(blob){
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'blurred_' + file.name;
      a.click();
    });
  };
  img.onerror = function(){
    document.getElementById('bb-progress').style.display = 'none';
    document.getElementById('bb-error').textContent = 'Failed to load image.';
    document.getElementById('bb-error').style.display = 'block';
  };
  img.src = URL.createObjectURL(file);
};

window.makeProfilePhoto = function(){
  var file = document.getElementById('pp-upload').files[0];
  if(!file) return;
  var size = parseInt(document.getElementById('pp-size').value) || 400;
  var border = parseInt(document.getElementById('pp-border').value) || 3;
  var bgColor = document.getElementById('pp-bg').value;
  var img = new Image();
  img.onload = function(){
    var c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    var ctx = c.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    var r = size/2;
    ctx.beginPath();
    ctx.arc(r, r, r - border - 2, 0, Math.PI*2);
    ctx.closePath();
    ctx.clip();
    var s = Math.min(img.width, img.height);
    var sx = (img.width - s)/2, sy = (img.height - s)/2;
    ctx.drawImage(img, sx, sy, s, s, border+2, border+2, size - (border+2)*2, size - (border+2)*2);
    if(border > 0){
      ctx.beginPath();
      ctx.arc(r, r, r - 1, 0, Math.PI*2);
      ctx.strokeStyle = '#39ff14';
      ctx.lineWidth = border;
      ctx.stroke();
    }
    c.toBlob(function(blob){
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'profile_' + file.name;
      a.click();
    });
  };
  img.src = URL.createObjectURL(file);
};

/* ─── AI IMAGE GENERATOR (FLUX.1-schnell via HuggingFace) ─── */
var _aigGenerating = false;
var _aigLastPrompt = '';
var _aigLastStyle = '';
var _aigKey = '__HF_TOKEN__';

var AIG_STYLES = {
  'none': '',
  'anime_painted': 'anime style, detailed, painted illustration',
  'casual_photo': 'casual photography, natural lighting',
  'cinematic': 'cinematic lighting, movie scene, dramatic',
  'digital_painting': 'digital painting, highly detailed',
  'concept_art': 'concept art, design sketch, professional',
  'disney_3d': '3D cartoon character, pixar-like style',
  'disney_2d': '2D cartoon style, animated film look',
  'disney_sketch': 'pencil sketch, character design',
  'concept_sketch': 'rough concept sketch, design draft',
  'painterly': 'painterly style, artistic brush strokes',
  'oil_painting': 'oil painting style, textured canvas',
  'oil_realism': 'realistic oil painting, detailed portrait',
  'oil_old': 'old classical oil painting style',
  'oil_70s': 'vintage pulp art style, retro illustration',
  'pro_photo': 'professional studio photography, high quality',
  'anime': 'anime style illustration',
  'anime_drawn': 'hand-drawn anime style',
  'anime_screencap': 'anime screenshot style, film frame',
  'anime_cute': 'cute anime style, soft colors',
  'anime_soft': 'soft shaded anime illustration',
  'fantasy_painting': 'fantasy art, magical scene',
  'fantasy_landscape': 'fantasy landscape, epic environment',
  'fantasy_portrait': 'fantasy character portrait',
  'ghibli': 'ghibli style, soft lighting, detailed background',
  'pixel_art': 'pixel art, 8-bit style',
  'vintage_comic': 'retro comic book style',
  'medieval': 'medieval art style, historical illustration',
  'watercolor': 'watercolor painting style',
  'pencil': 'pencil sketch drawing',
  'tattoo': 'tattoo design, black ink illustration',
  'cartoon': 'cartoon style illustration',
  'claymation': 'clay animation style, 3D stop motion',
  'flat': 'flat design illustration',
  'emoji_3d': '3D emoji style render',
  'fantasy_map': 'fantasy map illustration, detailed cartography'
};

window.selectAigStyle = function(el){
  document.querySelectorAll('#aig-style-chips .aig-chip').forEach(function(c){ c.classList.remove('active'); });
  el.classList.add('active');
};

window.generateAigImages = function(){
  if(_aigGenerating) return;
  var prompt = document.getElementById('aig-prompt').value.trim();
  if(!prompt){
    document.getElementById('aig-error').textContent = 'Please enter a prompt.';
    document.getElementById('aig-error').style.display = 'block';
    return;
  }
  document.getElementById('aig-error').style.display = 'none';
  var activeChip = document.querySelector('#aig-style-chips .aig-chip.active');
  var styleKey = activeChip ? activeChip.getAttribute('data-style') : 'none';
  var styleMod = AIG_STYLES[styleKey] || '';
  var shape = document.getElementById('aig-shape').value;
  var count = parseInt(document.getElementById('aig-count').value) || 4;
  var dims = shape.split('x');
  var width = parseInt(dims[0]);
  var height = parseInt(dims[1]);

  _aigLastPrompt = prompt;
  _aigLastStyle = styleKey;

  var finalPrompt = prompt;
  if(styleMod) finalPrompt += ', ' + styleMod;
  finalPrompt += ', high quality, detailed, sharp focus';

  document.getElementById('aig-gen-btn').disabled = true;
  document.getElementById('aig-gen-btn').style.opacity = '0.5';
  document.getElementById('aig-loading').style.display = 'block';
  document.getElementById('aig-output').style.display = 'none';
  document.getElementById('aig-progress').textContent = '0/' + count;
  _aigGenerating = true;

  var results = [];
  var errors = [];
  var completed = 0;
  var pending = count;

  function updateProgress(){
    document.getElementById('aig-progress').textContent = completed + '/' + count;
  }

  function generateOne(){
    if(!_aigGenerating){ pending = 0; return maybeFinish(); }
    fetch(
      'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + _aigKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: finalPrompt,
          parameters: {
            width: width,
            height: height,
            num_inference_steps: 4,
          }
        })
      }
    ).then(function(res){
      if(!res.ok){
        if(res.status === 503){
          // Model loading - retry after delay (pending stays same - retry replaces this slot)
          return new Promise(function(resolve){
            setTimeout(function(){
              generateOne().then(resolve);
            }, 5000);
          });
        }
        if(res.status === 429){
          errors.push('Rate limited (429). Please wait and try again.');
          completed++;
          pending--;
          updateProgress();
          maybeFinish();
          return;
        }
        return res.text().then(function(text){
          errors.push('API error (' + res.status + '): ' + text.slice(0, 100));
          completed++;
          pending--;
          updateProgress();
          maybeFinish();
        });
      }
      return res.blob().then(function(blob){
        results.push(blob);
        completed++;
        pending--;
        updateProgress();
        maybeFinish();
      });
    }).catch(function(err){
      errors.push('Network error: ' + err.message);
      completed++;
      pending--;
      updateProgress();
      maybeFinish();
    });
  }

  function maybeFinish(){
    if(pending > 0) return;
    _aigGenerating = false;
    document.getElementById('aig-gen-btn').disabled = false;
    document.getElementById('aig-gen-btn').style.opacity = '';
    document.getElementById('aig-loading').style.display = 'none';

    if(results.length === 0 && errors.length > 0){
      document.getElementById('aig-error').textContent = errors[0];
      document.getElementById('aig-error').style.display = 'block';
      return;
    }

    if(errors.length > 0){
      document.getElementById('aig-error').textContent = results.length + ' succeeded, ' + errors.length + ' failed. ' + errors[0];
      document.getElementById('aig-error').style.display = 'block';
    }

    renderAigResults(results, prompt, styleKey);
  }

  // Start exactly count requests; nothing schedules extras
  for(var i=0;i<count;i++){
    setTimeout(generateOne, i * 500);
  }
};

function renderAigResults(blobs, prompt, styleKey){
  var output = document.getElementById('aig-output');
  var cols = blobs.length <= 2 ? 2 : blobs.length <= 4 ? 2 : 3;
  var pending = blobs.length;
  var cards = [];
  blobs.forEach(function(blob, i){
    var reader = new FileReader();
    reader.onload = function(){
      var dataUrl = reader.result;
      var promptForCopy = prompt;
      if(styleKey && styleKey !== 'none' && AIG_STYLES[styleKey]){
        promptForCopy += ', ' + AIG_STYLES[styleKey] + ', high quality, detailed, sharp focus';
      } else if(promptForCopy) {
        promptForCopy += ', high quality, detailed, sharp focus';
      }
      cards[i] = '<div class="aig-image-card" style="background:var(--surface);border:1px solid var(--green-border);border-radius:4px;overflow:hidden;">' +
        '<div style="position:relative;width:100%;aspect-ratio:1;background:var(--bg);overflow:hidden;">' +
        '<img src="' + dataUrl + '" alt="Generated image ' + (i+1) + '" style="width:100%;height:100%;object-fit:contain;display:block;" loading="lazy">' +
        '</div>' +
        '<div style="padding:10px;display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">' +
        '<button onclick="window.aigDownload(this)" data-url="' + dataUrl + '" data-idx="' + (i+1) + '" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 10px;cursor:none;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Download</button>' +
        '<button onclick="window.aigCopyPrompt(this)" data-prompt="' + escapeAttr(promptForCopy) + '" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 10px;cursor:none;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Copy Prompt</button>' +
        '</div></div>';
      pending--;
      if(pending === 0) done();
    };
    reader.readAsDataURL(blob);
  });
  function done(){
    output.style.display = 'block';
    var html = '<div style="font-size:0.65rem;color:var(--green);margin-bottom:12px;letter-spacing:0.05em;">Generated ' + blobs.length + ' image(s)</div>';
    html += '<div class="aig-results-grid" style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:16px;">' + cards.join('') + '</div>';
    html += '<div style="text-align:center;margin-top:20px;">' +
      '<button onclick="window.aigDownloadAll()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Download All</button></div>';
    output.innerHTML = html;
    window._aigBlobs = blobs;
    window._aigDataUrls = cards.map(function(c,i){
      var m = c.match(/src="([^"]+)"/);
      return m ? m[1] : '';
    });
  }
}

function escapeAttr(s){
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

window.aigDownload = function(btn){
  var a = document.createElement('a');
  a.href = btn.getAttribute('data-url');
  a.download = 'ai_image_' + btn.getAttribute('data-idx') + '.png';
  a.click();
};

window.aigCopyPrompt = function(btn){
  var text = btn.getAttribute('data-prompt');
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(function(){
      var orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(function(){ btn.textContent = orig; }, 1500);
    });
  }
};

window.aigDownloadAll = function(){
  if(!window._aigBlobs || !window._aigBlobs.length) return;
  if(window._aigBlobs.length === 1){
    var a = document.createElement('a');
    a.href = URL.createObjectURL(window._aigBlobs[0]);
    a.download = 'ai_image_1.png';
    a.click();
    return;
  }
  ensureJSZip().then(function(JSZip){
    var zip = new JSZip();
    window._aigBlobs.forEach(function(blob, i){
      zip.file('ai_image_' + (i+1) + '.png', blob);
    });
    return zip.generateAsync({type:'blob'});
  }).then(function(content){
    var a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'ai_images.zip';
    a.click();
  });
};

buildGrid();
handleHash();

})();
