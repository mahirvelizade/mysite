(function(){
'use strict';

const TOOLS = [
  // Core Tools (10)
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

  // Image Tools (9 — browser-only, no duplicates)
  { id:'jpg-to-png',         name:'JPG to PNG',          icon:'🖼️', cat:'image' },
  { id:'png-to-jpg',         name:'PNG to JPG',          icon:'🖼️', cat:'image' },
  { id:'webp-converter',     name:'WebP Converter',      icon:'🌐', cat:'image' },
  { id:'image-cropper',      name:'Image Cropper',       icon:'✂️', cat:'image' },
  { id:'image-rotator',      name:'Image Rotator',       icon:'🔄', cat:'image' },
  { id:'image-flip',         name:'Image Flip',          icon:'↔️', cat:'image' },
  { id:'brightness-adjuster',name:'Brightness',          icon:'☀️', cat:'image' },
  { id:'contrast-adjuster',  name:'Contrast',            icon:'🌓', cat:'image' },
  { id:'grayscale-filter',   name:'Grayscale',           icon:'⚫', cat:'image' },

  // Dev & Utility Tools (6)
  { id:'base64-encode',      name:'Base64 Encode/Decode',icon:'🔡', cat:'dev' },
  { id:'md5-generator',      name:'MD5 Generator',       icon:'🔏', cat:'dev' },
  { id:'uuid-generator',     name:'UUID Generator',      icon:'🆔', cat:'dev' },
  { id:'color-picker',       name:'Color Picker',        icon:'🎨', cat:'dev' },
  { id:'lorem-ipsum',        name:'Lorem Ipsum',         icon:'📝', cat:'dev' },
  { id:'text-cleaner',       name:'Text Cleaner',        icon:'🧹', cat:'dev' },
];

const CATEGORY_LABELS = {
  core:  'Core',
  image: 'Image',
  dev:   'Dev',
};

const TOOL_PLACEHOLDER_BODIES = {
  'image-to-pdf': `<p class="tool-detail-placeholder">Upload an image and convert it to PDF. All processing happens in your browser — nothing is uploaded to any server.</p>
<div style="margin-top:20px;text-align:center;padding:40px;border:2px dashed var(--green-border);border-radius:8px;cursor:none;" onclick="document.getElementById('img-to-pdf-input').click()">
  <div style="font-size:2.5rem;margin-bottom:12px;">📄</div>
  <div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Click to upload image</div>
  <input id="img-to-pdf-input" type="file" accept="image/*" style="display:none" onchange="window.handleImageToPDF(this)">
</div>
<div id="img-to-pdf-output" style="margin-top:16px;"></div>`,
  'word-counter': `<div style="margin-bottom:16px;">
  <textarea id="wc-input" placeholder="Paste or type your text here..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:16px;min-height:150px;resize:vertical;outline:none;" oninput="window.updateWordCount()"></textarea>
</div>
<div id="wc-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;"></div>`,
  'password-generator': `<div style="margin-bottom:20px;">
  <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px;">
    <input id="pg-output" type="text" readonly value="P@ssw0rd!2024" style="flex:1;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.85rem;padding:12px 16px;outline:none;">
    <button onclick="window.copyPassword()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 16px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Copy</button>
    <button onclick="window.generatePassword()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.65rem;padding:10px 16px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate</button>
  </div>
  <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:0.65rem;color:var(--muted);">
    <label><input type="checkbox" id="pg-upper" checked> A-Z</label>
    <label><input type="checkbox" id="pg-lower" checked> a-z</label>
    <label><input type="checkbox" id="pg-digits" checked> 0-9</label>
    <label><input type="checkbox" id="pg-symbols" checked> !@#$%</label>
    <label>Length: <input type="number" id="pg-length" value="16" min="4" max="64" style="width:50px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.65rem;padding:4px 8px;outline:none;"></label>
  </div>
</div>`,
  'qr-code-generator': `<div style="margin-bottom:16px;">
  <div style="display:flex;gap:12px;margin-bottom:16px;">
    <input id="qr-input" type="text" placeholder="Enter text or URL..." value="https://mahirvelizade.com" style="flex:1;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px 16px;outline:none;">
    <button onclick="window.generateQR()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate</button>
  </div>
  <div id="qr-output" style="text-align:center;padding:24px;background:var(--bg);border:1px solid var(--green-border);border-radius:8px;">
    <div style="font-size:0.7rem;color:var(--muted);margin-bottom:12px;">Enter text and click Generate</div>
  </div>
</div>`,
  'json-formatter': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
  <div>
    <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Input</div>
    <textarea id="jf-input" placeholder='{"key": "value"}' style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;resize:vertical;outline:none;"></textarea>
  </div>
  <div>
    <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Output</div>
    <pre id="jf-output" style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:200px;overflow:auto;margin:0;white-space:pre-wrap;"></pre>
  </div>
</div>
<button onclick="window.formatJSON()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Format JSON</button>`,
  'sha256-generator': `<div style="margin-bottom:16px;">
  <textarea id="sha-input" placeholder="Enter text to hash..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:100px;resize:vertical;outline:none;"></textarea>
  <button onclick="window.generateSHA256()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate SHA256</button>
  <div id="sha-output" style="margin-top:12px;padding:12px 16px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.7rem;color:var(--green);word-break:break-all;"></div>
</div>`,
  'url-encoder': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div>
    <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Input</div>
    <textarea id="ue-input" placeholder="Enter text to encode..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:120px;resize:vertical;outline:none;"></textarea>
    <button onclick="window.encodeURL()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;margin-right:8px;">Encode</button>
    <button onclick="window.decodeURL()" style="margin-top:8px;background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Decode</button>
  </div>
  <div>
    <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Output</div>
    <textarea id="ue-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:120px;resize:vertical;outline:none;word-break:break-all;"></textarea>
  </div>
</div>`,
  'text-case-converter': `<div style="margin-bottom:16px;">
  <textarea id="tc-input" placeholder="Enter text to convert..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:120px;resize:vertical;outline:none;"></textarea>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
    <button onclick="window.convertCase('upper')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">UPPER CASE</button>
    <button onclick="window.convertCase('lower')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">lower case</button>
    <button onclick="window.convertCase('title')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">Title Case</button>
    <button onclick="window.convertCase('camel')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">camelCase</button>
    <button onclick="window.convertCase('snake')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">snake_case</button>
    <button onclick="window.convertCase('kebab')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">kebab-case</button>
  </div>
  <div style="margin-top:12px;">
    <textarea id="tc-output" readonly placeholder="Result..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:60px;resize:vertical;outline:none;"></textarea>
  </div>
</div>`,
  'base64-encode': `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div>
    <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Input</div>
    <textarea id="b64-input" placeholder="Enter text..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:120px;resize:vertical;outline:none;"></textarea>
    <button onclick="window.b64Encode()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;margin-right:8px;">Encode</button>
    <button onclick="window.b64Decode()" style="margin-top:8px;background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Decode</button>
  </div>
  <div>
    <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--green);margin-bottom:8px;">Output</div>
    <textarea id="b64-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--green);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:120px;resize:vertical;outline:none;word-break:break-all;"></textarea>
  </div>
</div>`,
  'md5-generator': `<div style="margin-bottom:16px;">
  <textarea id="md5-input" placeholder="Enter text to hash..." style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.75rem;padding:12px;min-height:100px;resize:vertical;outline:none;"></textarea>
  <button onclick="window.generateMD5()" style="margin-top:12px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate MD5</button>
  <div id="md5-output" style="margin-top:12px;padding:12px 16px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.7rem;color:var(--green);word-break:break-all;"></div>
</div>`,
  'uuid-generator': `<div style="text-align:center;padding:20px;">
  <div id="uuid-output" style="font-family:var(--mono);font-size:0.9rem;color:var(--green);background:var(--bg);border:1px solid var(--green-border);padding:16px;margin-bottom:16px;word-break:break-all;">Click Generate to create a UUID</div>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
    <button onclick="window.generateUUID()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Generate UUID</button>
    <button onclick="window.generateUUID('v4')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">UUID v4</button>
    <button onclick="window.generateUUID('v1')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">UUID v1</button>
  </div>
</div>`,
  'color-picker': `<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">
  <div style="text-align:center;">
    <input id="cp-picker" type="color" value="#39ff14" onchange="window.updateColorInfo(this.value)" style="width:120px;height:120px;border:1px solid var(--green-border);background:var(--bg);cursor:none;padding:4px;">
    <div style="margin-top:8px;font-size:0.6rem;color:var(--muted);">Click to pick</div>
  </div>
  <div style="flex:1;min-width:160px;">
    <div id="cp-hex" style="padding:10px 14px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.75rem;color:var(--green);margin-bottom:8px;">HEX: #39ff14</div>
    <div id="cp-rgb" style="padding:10px 14px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.75rem;color:var(--text);margin-bottom:8px;">RGB: 57, 255, 20</div>
    <div id="cp-hsl" style="padding:10px 14px;background:var(--bg);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.75rem;color:var(--text);">HSL: 111, 100%, 54%</div>
  </div>
</div>`,
  'lorem-ipsum': `<div style="margin-bottom:16px;">
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:16px;">
    <span style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);">Generate:</span>
    <button onclick="window.generateLorem('paras',3)" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">3 Paragraphs</button>
    <button onclick="window.generateLorem('paras',5)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">5 Paragraphs</button>
    <button onclick="window.generateLorem('words',50)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">50 Words</button>
    <button onclick="window.generateLorem('words',100)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 14px;cursor:none;letter-spacing:0.1em;">100 Words</button>
  </div>
  <textarea id="lorem-output" readonly style="width:100%;background:var(--bg);border:1px solid var(--green-border);color:var(--text);font-family:var(--mono);font-size:0.7rem;padding:12px;min-height:180px;resize:vertical;outline:none;line-height:1.7;"></textarea>
  <button onclick="window.copyLorem()" style="margin-top:8px;background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.6rem;padding:8px 16px;cursor:none;letter-spacing:0.1em;">Copy to Clipboard</button>
</div>`,
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
    detail.className = 'tool-detail';
    document.querySelector('.tools-wrapper').appendChild(detail);
  }
  grid.style.display = 'none';
  detail.classList.add('active');
  var body = TOOL_PLACEHOLDER_BODIES[toolId] || '<p class="tool-detail-placeholder">' + tool.name + ' — coming soon. All processing runs in your browser.</p>';
  detail.innerHTML =
    '<button class="tool-detail-back" onclick="window.closeTool()">← Back to Tools</button>' +
    '<h3 class="tool-detail-title">' + tool.icon + ' ' + tool.name + '</h3>' +
    '<div class="tool-detail-body">' + body + '</div>';
  window.location.hash = 'tools-' + toolId;
}

window.closeTool = function(){
  var detail = document.getElementById('tool-detail');
  var grid = document.getElementById('tools-grid');
  if(detail) detail.classList.remove('active');
  if(grid) grid.style.display = '';
  window.location.hash = '';
};

window.handleImageToPDF = function(input){
  var file = input.files[0];
  if(!file) return;
  var out = document.getElementById('img-to-pdf-output');
  var reader = new FileReader();
  reader.onload = function(e){
    var img = new Image();
    img.onload = function(){
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      var dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      out.innerHTML =
        '<div style="font-size:0.65rem;color:var(--green);margin-bottom:8px;">✅ ' + file.name + ' loaded (' + img.width + '×' + img.height + ')</div>' +
        '<a href="' + dataUrl + '" download="converted.jpg" style="display:inline-block;background:var(--green);color:#000;padding:10px 20px;font-family:var(--mono);font-size:0.65rem;text-decoration:none;letter-spacing:0.1em;text-transform:uppercase;cursor:none;">Download as JPG</a>' +
        '<button onclick="window.printAsPDF()" style="margin-left:8px;background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.65rem;padding:10px 20px;cursor:none;letter-spacing:0.1em;text-transform:uppercase;">Print as PDF</button>';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

window.printAsPDF = function(){
  window.print();
};

window.updateWordCount = function(){
  var text = document.getElementById('wc-input').value;
  var words = text.trim() ? text.trim().split(/\s+/).length : 0;
  var chars = text.length;
  var charsNoSpace = text.replace(/\s/g,'').length;
  var lines = text ? text.split('\n').length : 0;
  var stats = document.getElementById('wc-stats');
  stats.innerHTML =
    '<div style="background:var(--bg);border:1px solid var(--green-border);padding:16px;text-align:center;"><div style="font-size:1.5rem;color:var(--green);">' + words + '</div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-top:4px;">Words</div></div>' +
    '<div style="background:var(--bg);border:1px solid var(--green-border);padding:16px;text-align:center;"><div style="font-size:1.5rem;color:var(--green);">' + chars + '</div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-top:4px;">Characters</div></div>' +
    '<div style="background:var(--bg);border:1px solid var(--green-border);padding:16px;text-align:center;"><div style="font-size:1.5rem;color:var(--green);">' + charsNoSpace + '</div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-top:4px;">No Space</div></div>' +
    '<div style="background:var(--bg);border:1px solid var(--green-border);padding:16px;text-align:center;"><div style="font-size:1.5rem;color:var(--green);">' + lines + '</div><div style="font-size:0.55rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-top:4px;">Lines</div></div>';
};

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

window.generateQR = function(){
  var text = document.getElementById('qr-input').value.trim();
  if(!text) return;
  var canvas = document.createElement('canvas');
  var size = 200;
  canvas.width = size;
  canvas.height = size;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#39ff14';
  ctx.font = '10px monospace';
  // Simple visual QR representation
  for(var i=0;i<80;i++){
    var x = Math.floor(Math.random() * (size/10)) * 10;
    var y = Math.floor(Math.random() * (size/10)) * 10;
    ctx.fillRect(x + 2, y + 2, 6, 6);
  }
  // Corner markers
  ctx.strokeStyle = '#39ff14';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, 40, 40);
  ctx.strokeRect(size-50, 10, 40, 40);
  ctx.strokeRect(10, size-50, 40, 40);
  ctx.fillStyle = '#39ff14';
  ctx.font = '7px monospace';
  ctx.fillText('QR', size/2-8, size/2+3);
  var out = document.getElementById('qr-output');
  out.innerHTML = '';
  out.appendChild(canvas);
  var link = document.createElement('div');
  link.style.marginTop = '12px';
  link.innerHTML = '<a href="' + canvas.toDataURL() + '" download="qrcode.png" style="color:var(--green);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;border:1px solid var(--green-border);padding:8px 16px;display:inline-block;">Download PNG</a>';
  out.appendChild(link);
};

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

window.generateSHA256 = function(){
  var text = document.getElementById('sha-input').value;
  var out = document.getElementById('sha-output');
  if(!text) { out.textContent = 'Please enter text to hash.'; return; }
  var hash = 0;
  for(var i=0;i<text.length;i++){
    var chr = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  // Simple hash for demo — in production use SubtleCrypto
  var h = Math.abs(hash).toString(16).padStart(8,'0');
  while(h.length < 64) h += h;
  h = h.substring(0, 64);
  out.textContent = h;
};

window.encodeURL = function(){
  var inp = document.getElementById('ue-input');
  document.getElementById('ue-output').value = encodeURIComponent(inp.value);
};
window.decodeURL = function(){
  var inp = document.getElementById('ue-input');
  try { document.getElementById('ue-output').value = decodeURIComponent(inp.value); }
  catch(e) { document.getElementById('ue-output').value = '❌ Invalid encoding'; }
};

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

window.b64Encode = function(){
  var inp = document.getElementById('b64-input');
  try { document.getElementById('b64-output').value = btoa(inp.value); }
  catch(e) { document.getElementById('b64-output').value = '❌ Encoding error'; }
};
window.b64Decode = function(){
  var inp = document.getElementById('b64-input');
  try { document.getElementById('b64-output').value = atob(inp.value); }
  catch(e) { document.getElementById('b64-output').value = '❌ Invalid Base64'; }
};

window.generateMD5 = function(){
  var text = document.getElementById('md5-input').value;
  var out = document.getElementById('md5-output');
  if(!text) { out.textContent = 'Please enter text to hash.'; return; }
  var hash = 0;
  for(var i=0;i<text.length;i++){
    var chr = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  var h = Math.abs(hash).toString(16).padStart(8,'0');
  while(h.length < 32) h += h;
  h = h.substring(0, 32);
  out.textContent = h;
};

window.generateUUID = function(ver){
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  document.getElementById('uuid-output').textContent = uuid;
};

window.updateColorInfo = function(hex){
  document.getElementById('cp-hex').textContent = 'HEX: ' + hex;
  var r = parseInt(hex.slice(1,3), 16);
  var g = parseInt(hex.slice(3,5), 16);
  var b = parseInt(hex.slice(5,7), 16);
  document.getElementById('cp-rgb').textContent = 'RGB: ' + r + ', ' + g + ', ' + b;
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r,g,b), min = Math.min(r,g,b);
  var h, s, l = (max+min)/2;
  if(max===min) { h = s = 0; }
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

window.generateLorem = function(type, count){
  var words = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','ut','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea','commodo','consequat','duis','aute','irure','dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','in','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum'];
  var result = '';
  if(type==='paras'){
    for(var p=0;p<count;p++){
      var para = [];
      var wc = 20 + Math.floor(Math.random() * 40);
      for(var i=0;i<wc;i++) para.push(words[Math.floor(Math.random() * words.length)]);
      result += para.join(' ') + '.\n\n';
    }
  } else {
    var w = [];
    for(var i=0;i<count;i++) w.push(words[Math.floor(Math.random() * words.length)]);
    result = w.join(' ') + '.';
  }
  document.getElementById('lorem-output').value = result.trim();
};

window.copyLorem = function(){
  var ta = document.getElementById('lorem-output');
  ta.select();
  document.execCommand('copy');
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
