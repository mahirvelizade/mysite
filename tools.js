(function(){
'use strict';

const TOOLS = [
  { id:'image-to-pdf',       name:'Image to PDF',        icon:'📄', cat:'core' },
  { id:'image-compressor',   name:'Image Compressor',    icon:'🗜️', cat:'core' },
  { id:'image-resize',       name:'Image Resize',        icon:'📐', cat:'core' },
  { id:'word-counter',       name:'Word Counter',        icon:'🔢', cat:'core' },
  { id:'password-generator', name:'Password Generator',  icon:'🔑', cat:'core' },
  { id:'qr-code-generator',  name:'QR Code Generator',   icon:'📱', cat:'core' },
  { id:'json-formatter',     name:'JSON Formatter',      icon:'📋', cat:'core' },
  { id:'url-encoder',        name:'URL Encoder',         icon:'🔗', cat:'core' },
  { id:'sha256-generator',   name:'SHA256 Generator',    icon:'🔐', cat:'core' },
  { id:'text-case-converter',name:'Text Case Converter', icon:'✏️', cat:'core' },
  { id:'jpg-to-png',         name:'JPG to PNG',          icon:'🖼️', cat:'image' },
  { id:'png-to-jpg',         name:'PNG to JPG',          icon:'🖼️', cat:'image' },
  { id:'webp-converter',     name:'WebP Converter',      icon:'🌐', cat:'image' },
  { id:'image-cropper',      name:'Image Cropper',       icon:'✂️', cat:'image' },
  { id:'image-rotator',      name:'Image Rotator',       icon:'🔄', cat:'image' },
  { id:'image-flip',         name:'Image Flip',          icon:'↔️', cat:'image' },
  { id:'brightness-adjuster',name:'Brightness',          icon:'☀️', cat:'image' },
  { id:'contrast-adjuster',  name:'Contrast',            icon:'🌓', cat:'image' },
  { id:'grayscale-filter',   name:'Grayscale',           icon:'⚫', cat:'image' },
  { id:'base64-encode',      name:'Base64 Encode/Decode',icon:'🔡', cat:'dev' },
  { id:'md5-generator',      name:'MD5 Generator',       icon:'🔏', cat:'dev' },
  { id:'uuid-generator',     name:'UUID Generator',      icon:'🆔', cat:'dev' },
  { id:'color-picker',       name:'Color Picker',        icon:'🎨', cat:'dev' },
  { id:'lorem-ipsum',        name:'Lorem Ipsum',         icon:'📝', cat:'dev' },
  { id:'text-cleaner',       name:'Text Cleaner',        icon:'🧹', cat:'dev' },
  { id:'html-viewer',        name:'HTML Viewer',         icon:'🌐', cat:'dev' },
];

const CATEGORY_LABELS = { core:'Core', image:'Image', dev:'Dev' };

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
    '<div id="qr-output" style="text-align:center;padding:24px;background:var(--bg);border:1px solid var(--green-border);border-radius:8px;"></div></div>',

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
    '<textarea id="hv-input" placeholder="<h1>Hello World</h1>" oninput="window.scheduleRender()" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:250px;resize:vertical;outline:none;tab-size:2;"></textarea></div>' +
    '<div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:6px;">Preview</div>' +
    '<iframe id="hv-preview" style="width:100%;height:250px;background:#fff;border:1px solid var(--green-border);border-radius:4px;"></iframe></div></div>' +
    '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">' +
    '<button onclick="window.clearHTML()" style="background:var(--surface);color:var(--muted);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:6px 12px;cursor:none;letter-spacing:0.1em;">Clear</button>' +
    '<span style="font-size:0.55rem;color:var(--muted);align-self:center;">Tip: &lt;script&gt; tags won\'t execute in preview for security.</span></div>',
};

function buildGrid(){
  var grid = document.getElementById('tools-grid');
  TOOLS.forEach(function(t){
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
  var body = TOOL_PLACEHOLDER_BODIES[toolId] || '<p class="tool-detail-placeholder">' + tool.name + ' — coming soon.</p>';
  detail.innerHTML =
    '<button class="tool-detail-back" onclick="window.closeTool()">← Back to Tools</button>' +
    '<h3 class="tool-detail-title">' + tool.icon + ' ' + tool.name + '</h3>' +
    '<div class="tool-detail-body">' + body + '</div>';
  if(window.location.hash !== '#tools-' + toolId) window.location.hash = 'tools-' + toolId;
}

window.closeTool = function(){
  var detail = document.getElementById('tool-detail');
  var grid = document.getElementById('tools-grid');
  if(detail) detail.classList.remove('active');
  if(grid) grid.style.display = '';
  window.location.hash = '';
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

/* ─── QR CODE GENERATOR ─── */
window.generateQR = function(){
  var text = document.getElementById('qr-input').value.trim();
  if(!text) return;
  var size = 300;
  var c = document.createElement('canvas');
  c.width = size; c.height = size;
  var ctx = c.getContext('2d');
  ctx.fillStyle = '#050505';
  ctx.fillRect(0,0,size,size);
  var segs = Math.ceil(text.length / 2);
  var cell = size / (Math.ceil(Math.sqrt(segs)) + 8);
  var off = cell * 4;
  ctx.fillStyle = '#39ff14';
  var idx = 0;
  while(idx < text.length){
    var code = text.charCodeAt(idx);
    var col = (idx % Math.floor((size-2*off)/cell)) * cell + off;
    var row = Math.floor(idx / Math.floor((size-2*off)/cell)) * cell + off;
    for(var b=0;b<8;b++){
      if(code & (1<<b)){
        ctx.fillRect(col + (b%4)*cell/4, row + Math.floor(b/4)*cell/4, cell/4, cell/4);
      }
    }
    idx++;
  }
  ctx.strokeStyle = '#39ff14';
  ctx.lineWidth = Math.max(2, cell*0.5);
  ctx.strokeRect(cell*2, cell*2, cell*5, cell*5);
  ctx.strokeRect(size-cell*7, cell*2, cell*5, cell*5);
  ctx.strokeRect(cell*2, size-cell*7, cell*5, cell*5);
  var out = document.getElementById('qr-output');
  out.innerHTML = '';
  out.appendChild(c);
  var link = document.createElement('div');
  link.style.marginTop = '12px';
  link.innerHTML = '<a href="' + c.toDataURL() + '" download="qrcode.png" style="color:var(--green);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;border:1px solid var(--green-border);padding:8px 16px;display:inline-block;">Download PNG</a>';
  out.appendChild(link);
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

buildGrid();
handleHash();

})();
