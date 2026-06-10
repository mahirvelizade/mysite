(function(){
'use strict';

/* ─── AI TOOL HTML BODIES ─── */
var aiToolsData = {};

aiToolsData['ai-prompt-enhancer'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Enter a basic prompt and enhance it for better AI results. Choose a mode below.</div>' +
  '<textarea id="pe-input" placeholder="Enter your prompt here..." style="width:100%;min-height:100px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;resize:vertical;border-radius:2px;"></textarea>' +
  '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:12px 0;">' +
  '<button class="pe-mode" data-mode="professional" onclick="window.selectPeMode(this)" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Professional</button>' +
  '<button class="pe-mode" data-mode="creative" onclick="window.selectPeMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Creative</button>' +
  '<button class="pe-mode" data-mode="marketing" onclick="window.selectPeMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Marketing</button>' +
  '<button class="pe-mode" data-mode="coding" onclick="window.selectPeMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Coding</button>' +
  '<button class="pe-mode" data-mode="seo" onclick="window.selectPeMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">SEO</button>' +
  '</div>' +
  '<div id="pe-error" style="display:none;color:#ff4444;font-size:0.55rem;margin-bottom:8px;"></div>' +
  '<div id="pe-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-bottom:8px;">Enhancing prompt...</div>' +
  '<button onclick="window.enhancePrompt()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Enhance Prompt</button>' +
  '<div id="pe-result" style="display:none;margin-top:16px;"><textarea id="pe-output" readonly style="width:100%;min-height:100px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;border-radius:2px;"></textarea>' +
  '<div style="display:flex;gap:8px;margin-top:8px;">' +
  '<button onclick="window.copyResult(\'pe-output\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Copy Result</button>' +
  '<button onclick="window.clearPe()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Clear</button>' +
  '</div></div>';

aiToolsData['ai-text-summarizer'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Paste a long text and get a concise summary.</div>' +
  '<textarea id="ts-input" placeholder="Paste text to summarize..." style="width:100%;min-height:150px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;resize:vertical;border-radius:2px;"></textarea>' +
  '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:12px 0;">' +
  '<button class="ts-mode" data-mode="short" onclick="window.selectTsMode(this)" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Short</button>' +
  '<button class="ts-mode" data-mode="detailed" onclick="window.selectTsMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Detailed</button>' +
  '<button class="ts-mode" data-mode="bullets" onclick="window.selectTsMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Bullet Points</button>' +
  '</div>' +
  '<div id="ts-error" style="display:none;color:#ff4444;font-size:0.55rem;margin-bottom:8px;"></div>' +
  '<div id="ts-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-bottom:8px;">Summarizing...</div>' +
  '<button onclick="window.summarizeText()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Summarize</button>' +
  '<div id="ts-result" style="display:none;margin-top:16px;"><textarea id="ts-output" readonly style="width:100%;min-height:120px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;border-radius:2px;"></textarea>' +
  '<div style="display:flex;gap:8px;margin-top:8px;">' +
  '<button onclick="window.copyResult(\'ts-output\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Copy Result</button>' +
  '<button onclick="window.clearTs()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Clear</button>' +
  '</div></div>';

aiToolsData['ai-grammar-rewrite'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Fix grammar or rewrite text in your preferred style.</div>' +
  '<textarea id="gr-input" placeholder="Enter text to fix or rewrite..." style="width:100%;min-height:120px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;resize:vertical;border-radius:2px;"></textarea>' +
  '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:12px 0;">' +
  '<button class="gr-mode" data-mode="grammar" onclick="window.selectGrMode(this)" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Grammar Fix</button>' +
  '<button class="gr-mode" data-mode="professional" onclick="window.selectGrMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Professional</button>' +
  '<button class="gr-mode" data-mode="formal" onclick="window.selectGrMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Formal</button>' +
  '<button class="gr-mode" data-mode="simple" onclick="window.selectGrMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Simple</button>' +
  '<button class="gr-mode" data-mode="shorten" onclick="window.selectGrMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Shorten</button>' +
  '<button class="gr-mode" data-mode="expand" onclick="window.selectGrMode(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Expand</button>' +
  '</div>' +
  '<div id="gr-error" style="display:none;color:#ff4444;font-size:0.55rem;margin-bottom:8px;"></div>' +
  '<div id="gr-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-bottom:8px;">Processing...</div>' +
  '<button onclick="window.rewriteText()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Rewrite</button>' +
  '<div id="gr-result" style="display:none;margin-top:16px;"><textarea id="gr-output" readonly style="width:100%;min-height:120px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;border-radius:2px;"></textarea>' +
  '<div style="display:flex;gap:8px;margin-top:8px;">' +
  '<button onclick="window.copyResult(\'gr-output\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Copy Result</button>' +
  '<button onclick="window.clearGr()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Clear</button>' +
  '</div></div>';

aiToolsData['ai-cv-generator'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Fill in your details to generate a professional CV. Live preview below.</div>' +
  '<div id="cv-form" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
  '<input id="cv-name" placeholder="Full Name" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;">' +
  '<input id="cv-email" placeholder="Email" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;">' +
  '<input id="cv-phone" placeholder="Phone" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;">' +
  '<input id="cv-location" placeholder="Location" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;">' +
  '<input id="cv-linkedin" placeholder="LinkedIn URL" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;">' +
  '<input id="cv-website" placeholder="Website URL" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;">' +
  '<textarea id="cv-summary" placeholder="Professional Summary" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;min-height:60px;resize:vertical;"></textarea>' +
  '<textarea id="cv-skills" placeholder="Skills (comma separated)" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;min-height:50px;resize:vertical;"></textarea>' +
  '<textarea id="cv-experience" placeholder="Work Experience (describe your roles)" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;min-height:80px;resize:vertical;"></textarea>' +
  '<textarea id="cv-education" placeholder="Education" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;min-height:60px;resize:vertical;"></textarea>' +
  '<input id="cv-languages" placeholder="Languages (comma separated)" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;grid-column:1/-1;">' +
  '</div>' +
  '<div id="cv-error" style="display:none;color:#ff4444;font-size:0.55rem;margin:8px 0;"></div>' +
  '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">' +
  '<button onclick="window.generateCv()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Generate CV</button>' +
  '<button onclick="window.printCv()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.55rem;padding:10px 16px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">🖨️ Print</button>' +
  '<button onclick="window.clearCv()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.55rem;padding:10px 16px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Clear</button>' +
  '</div>' +
  '<div id="cv-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-top:8px;">Generating CV...</div>' +
  '<div id="cv-preview" style="display:none;margin-top:16px;background:var(--bg);border:1px solid var(--green-border);padding:24px;border-radius:2px;font-size:0.6rem;line-height:1.6;"></div>' +
  '<div id="cv-result" style="display:none;margin-top:8px;"><button onclick="window.downloadCvPdf()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.55rem;padding:8px 16px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">⬇ Download PDF</button></div>';

aiToolsData['ai-resume-analyzer'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Paste your resume text or upload a PDF to get instant feedback and improvement suggestions.</div>' +
  '<textarea id="ra-input" placeholder="Paste resume text here..." style="width:100%;min-height:150px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;resize:vertical;border-radius:2px;"></textarea>' +
  '<div style="margin:8px 0;font-size:0.5rem;color:var(--muted);letter-spacing:0.05em;">Or upload a PDF resume: ' +
  '<input type="file" accept=".pdf,.txt" onchange="window.loadResumeFile(this)" style="font-family:var(--mono);font-size:0.5rem;color:var(--text);"></div>' +
  '<div id="ra-error" style="display:none;color:#ff4444;font-size:0.55rem;margin-bottom:8px;"></div>' +
  '<div id="ra-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-bottom:8px;">Analyzing resume...</div>' +
  '<button onclick="window.analyzeResume()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Analyze Resume</button>' +
  '<div id="ra-result" style="display:none;margin-top:16px;"><div id="ra-output" style="background:var(--bg);border:1px solid var(--green-border);padding:16px;border-radius:2px;font-size:0.55rem;line-height:1.7;white-space:pre-wrap;"></div>' +
  '<div style="display:flex;gap:8px;margin-top:8px;">' +
  '<button onclick="window.copyResult(\'ra-output\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Copy Report</button>' +
  '<button onclick="window.downloadRaReport()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">⬇ Download Report</button>' +
  '<button onclick="window.clearRa()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Clear</button>' +
  '</div></div>';

aiToolsData['ai-cover-letter'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Fill in the details to generate a professional cover letter.</div>' +
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
  '<input id="cl-name" placeholder="Your Name" style="grid-column:1/-1;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;">' +
  '<input id="cl-job-title" placeholder="Job Title" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;">' +
  '<input id="cl-company" placeholder="Company Name" style="background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;">' +
  '<input id="cl-level" placeholder="Experience Level (Junior/Mid/Senior)" style="grid-column:1/-1;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;">' +
  '<textarea id="cl-skills" placeholder="Key Skills (comma separated)" style="grid-column:1/-1;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;min-height:50px;resize:vertical;"></textarea>' +
  '<textarea id="cl-notes" placeholder="Additional notes / why you want this role" style="grid-column:1/-1;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:8px 10px;font-family:var(--mono);font-size:0.55rem;border-radius:2px;min-height:60px;resize:vertical;"></textarea>' +
  '</div>' +
  '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:12px 0;">' +
  '<button class="cl-tone" data-tone="professional" onclick="window.selectClTone(this)" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Professional</button>' +
  '<button class="cl-tone" data-tone="enthusiastic" onclick="window.selectClTone(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Enthusiastic</button>' +
  '<button class="cl-tone" data-tone="concise" onclick="window.selectClTone(this)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Concise</button>' +
  '</div>' +
  '<div id="cl-error" style="display:none;color:#ff4444;font-size:0.55rem;margin-bottom:8px;"></div>' +
  '<div id="cl-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-bottom:8px;">Generating cover letter...</div>' +
  '<button onclick="window.generateCoverLetter()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Generate Cover Letter</button>' +
  '<div id="cl-result" style="display:none;margin-top:16px;"><textarea id="cl-output" readonly style="width:100%;min-height:200px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;border-radius:2px;"></textarea>' +
  '<div style="display:flex;gap:8px;margin-top:8px;">' +
  '<button onclick="window.copyResult(\'cl-output\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Copy</button>' +
  '<button onclick="window.downloadClPdf()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">⬇ Download PDF</button>' +
  '<button onclick="window.clearCl()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Clear</button>' +
  '</div></div>';

aiToolsData['photo-enhancer'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Upload a photo to enhance quality, sharpen details, and upscale resolution.</div>' +
  '<div style="text-align:center;padding:40px;border:2px dashed var(--green-border);border-radius:8px;cursor:pointer;" onclick="document.getElementById(\'pe-img-upload\').click()">' +
  '<div style="font-size:2.5rem;margin-bottom:12px;">🖼️</div>' +
  '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Click to upload image</div>' +
  '<input id="pe-img-upload" type="file" accept="image/*" style="display:none" onchange="window.loadPeImage(this)"></div>' +
  '<div id="pe-img-preview" style="margin-top:12px;display:none;text-align:center;"><img id="pe-img" style="max-width:100%;max-height:300px;border:1px solid var(--green-border);border-radius:2px;"></div>' +
  '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0;">' +
  '<button onclick="window.enhancePhoto(\'sharpen\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:8px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Sharpen</button>' +
  '<button onclick="window.enhancePhoto(\'enhance\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:8px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Enhance Details</button>' +
  '<button onclick="window.enhancePhoto(\'upscale\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:8px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Upscale 2x</button>' +
  '</div>' +
  '<div id="pe-error" style="display:none;color:#ff4444;font-size:0.55rem;margin-bottom:8px;"></div>' +
  '<div id="pe-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-bottom:8px;">Processing...</div>' +
  '<div id="pe-result" style="display:none;margin-top:12px;"><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">' +
  '<div style="text-align:center;"><div style="font-size:0.5rem;color:var(--muted);margin-bottom:4px;">Before</div><img id="pe-before" style="max-width:200px;max-height:200px;border:1px solid var(--green-border);border-radius:2px;"></div>' +
  '<div style="text-align:center;"><div style="font-size:0.5rem;color:var(--muted);margin-bottom:4px;">After</div><img id="pe-after" style="max-width:200px;max-height:200px;border:1px solid var(--green-border);border-radius:2px;"></div>' +
  '</div><button onclick="window.downloadPeImage()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.55rem;padding:8px 16px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">⬇ Download Enhanced</button></div>';

aiToolsData['ai-ocr'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Upload an image containing text and extract it as plain text.</div>' +
  '<div style="text-align:center;padding:40px;border:2px dashed var(--green-border);border-radius:8px;cursor:pointer;" onclick="document.getElementById(\'ocr-upload\').click()">' +
  '<div style="font-size:2.5rem;margin-bottom:12px;">👁️</div>' +
  '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Click to upload image</div>' +
  '<input id="ocr-upload" type="file" accept="image/*" style="display:none" onchange="window.loadOcrImage(this)"></div>' +
  '<div id="ocr-preview" style="margin-top:12px;display:none;text-align:center;"><img id="ocr-img" style="max-width:100%;max-height:250px;border:1px solid var(--green-border);border-radius:2px;"></div>' +
  '<div id="ocr-error" style="display:none;color:#ff4444;font-size:0.55rem;margin:8px 0;"></div>' +
  '<div id="ocr-loading" style="display:none;color:var(--green);font-size:0.55rem;margin:8px 0;">Loading OCR engine (~4MB, first time only)...</div>' +
  '<button onclick="window.runOcr()" style="margin-top:4px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Extract Text</button>' +
  '<div id="ocr-result" style="display:none;margin-top:16px;"><textarea id="ocr-output" readonly style="width:100%;min-height:100px;background:var(--bg);border:1px solid var(--green-border);color:var(--text);padding:12px;font-family:var(--mono);font-size:0.6rem;border-radius:2px;"></textarea>' +
  '<div style="display:flex;gap:8px;margin-top:8px;">' +
  '<button onclick="window.copyResult(\'ocr-output\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Copy Text</button>' +
  '<button onclick="window.downloadOcrText()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">⬇ Download TXT</button>' +
  '<button onclick="window.clearOcr()" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 14px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Clear</button>' +
  '</div></div>';

aiToolsData['object-remover'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Upload an image and remove unwanted objects. Draw over the object to remove it.</div>' +
  '<div style="text-align:center;padding:40px;border:2px dashed var(--green-border);border-radius:8px;cursor:pointer;" onclick="document.getElementById(\'or-upload\').click()">' +
  '<div style="font-size:2.5rem;margin-bottom:12px;">🧹</div>' +
  '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Click to upload image</div>' +
  '<input id="or-upload" type="file" accept="image/*" style="display:none" onchange="window.loadOrImage(this)"></div>' +
  '<div id="or-preview" style="margin-top:12px;display:none;text-align:center;position:relative;">' +
  '<canvas id="or-canvas" style="max-width:100%;max-height:350px;border:1px solid var(--green-border);border-radius:2px;cursor:crosshair;"></canvas>' +
  '</div>' +
  '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0;">' +
  '<button onclick="window.setOrBrush(20)" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Brush 20px</button>' +
  '<button onclick="window.setOrBrush(40)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Brush 40px</button>' +
  '<button onclick="window.setOrBrush(60)" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Brush 60px</button>' +
  '<button onclick="window.clearOrMask()" style="background:var(--surface);color:var(--orange);border:1px solid var(--orange);font-family:var(--mono);font-size:0.5rem;padding:6px 12px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Clear Mask</button>' +
  '</div>' +
  '<div id="or-error" style="display:none;color:#ff4444;font-size:0.55rem;margin-bottom:8px;"></div>' +
  '<div id="or-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-bottom:8px;">Removing object...</div>' +
  '<button onclick="window.removeObject()" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.6rem;padding:10px 20px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Remove Object</button>' +
  '<div id="or-result" style="display:none;margin-top:12px;"><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">' +
  '<div style="text-align:center;"><div style="font-size:0.5rem;color:var(--muted);margin-bottom:4px;">Original</div><canvas id="or-original" style="max-width:200px;max-height:200px;border:1px solid var(--green-border);border-radius:2px;"></canvas></div>' +
  '<div style="text-align:center;"><div style="font-size:0.5rem;color:var(--muted);margin-bottom:4px;">Result</div><canvas id="or-result-canvas" style="max-width:200px;max-height:200px;border:1px solid var(--green-border);border-radius:2px;"></canvas></div>' +
  '</div><button onclick="window.downloadOrImage()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.55rem;padding:8px 16px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">⬇ Download</button></div>';

aiToolsData['image-cleanup'] =
  '<div style="font-size:0.65rem;color:var(--muted);margin-bottom:12px;letter-spacing:0.05em;">Upload an image to remove noise, spots, and small imperfections.</div>' +
  '<div style="text-align:center;padding:40px;border:2px dashed var(--green-border);border-radius:8px;cursor:pointer;" onclick="document.getElementById(\'ic-upload\').click()">' +
  '<div style="font-size:2.5rem;margin-bottom:12px;">✨</div>' +
  '<div style="font-size:0.7rem;color:var(--muted);letter-spacing:0.1em;">Click to upload image</div>' +
  '<input id="ic-upload" type="file" accept="image/*" style="display:none" onchange="window.loadIcImage(this)"></div>' +
  '<div id="ic-preview" style="margin-top:12px;display:none;text-align:center;"><img id="ic-img" style="max-width:100%;max-height:300px;border:1px solid var(--green-border);border-radius:2px;"></div>' +
  '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0;">' +
  '<button onclick="window.cleanImage(\'light\')" style="background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.5rem;padding:8px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Light Clean</button>' +
  '<button onclick="window.cleanImage(\'medium\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:8px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Medium Clean</button>' +
  '<button onclick="window.cleanImage(\'strong\')" style="background:var(--surface);color:var(--green);border:1px solid var(--green-border);font-family:var(--mono);font-size:0.5rem;padding:8px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;">Strong Clean</button>' +
  '</div>' +
  '<div id="ic-error" style="display:none;color:#ff4444;font-size:0.55rem;margin-bottom:8px;"></div>' +
  '<div id="ic-loading" style="display:none;color:var(--green);font-size:0.55rem;margin-bottom:8px;">Cleaning image...</div>' +
  '<div id="ic-result" style="display:none;margin-top:12px;"><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">' +
  '<div style="text-align:center;"><div style="font-size:0.5rem;color:var(--muted);margin-bottom:4px;">Before</div><img id="ic-before" style="max-width:200px;max-height:200px;border:1px solid var(--green-border);border-radius:2px;"></div>' +
  '<div style="text-align:center;"><div style="font-size:0.5rem;color:var(--muted);margin-bottom:4px;">After</div><img id="ic-after" style="max-width:200px;max-height:200px;border:1px solid var(--green-border);border-radius:2px;"></div>' +
  '</div><button onclick="window.downloadIcImage()" style="margin-top:8px;background:var(--green);color:#000;border:none;font-family:var(--mono);font-size:0.55rem;padding:8px 16px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">⬇ Download Cleaned</button></div>';

window._aiToolsData = aiToolsData;

/* ─── SHARED HELPERS ─── */

window.copyResult = function(id){
  var el = document.getElementById(id);
  if(!el) return;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(el.value || el.textContent).then(function(){
      var btn = event && event.target;
      if(btn){ var t=btn.textContent; btn.textContent='Copied!'; setTimeout(function(){btn.textContent=t;},1200); }
    });
  }
};

window.selectPeMode = function(btn){ selectMode(btn, 'pe-mode', 'pe'); };
window.selectTsMode = function(btn){ selectMode(btn, 'ts-mode', 'ts'); };
window.selectGrMode = function(btn){ selectMode(btn, 'gr-mode', 'gr'); };
window.selectClTone = function(btn){ selectMode(btn, 'cl-tone', 'cl'); };

function selectMode(btn, cls, prefix){
  var btns = document.querySelectorAll('.' + cls);
  for(var i=0;i<btns.length;i++){
    btns[i].style.background = 'var(--surface)';
    btns[i].style.color = 'var(--green)';
    btns[i].style.border = '1px solid var(--green-border)';
  }
  btn.style.background = 'var(--green)';
  btn.style.color = '#000';
  btn.style.border = 'none';
}

/* ─── 1. AI PROMPT ENHANCER ─── */

window.enhancePrompt = function(){
  var input = document.getElementById('pe-input');
  var text = input && input.value.trim();
  if(!text){ showError('pe', 'Please enter a prompt.'); return; }
  var modeEl = document.querySelector('.pe-mode[style*="var(--green)"]');
  var mode = modeEl ? modeEl.getAttribute('data-mode') : 'professional';
  showLoading('pe', true);
  hideError('pe');
  hideResult('pe');

  var templates = {
    professional: 'As a professional, enhance the following prompt to be more precise and effective. Maintain a professional tone and add relevant context:\n\n' + text,
    creative: 'As a creative writer, expand the following prompt with imaginative details and vivid descriptions. Make it inspiring and original:\n\n' + text,
    marketing: 'As a marketing expert, optimize the following prompt for maximum engagement and persuasive impact. Use power words and clear calls to action:\n\n' + text,
    coding: 'As a senior software engineer, refine the following prompt to be technically precise and comprehensive. Include relevant technical context:\n\n' + text,
    seo: 'As an SEO specialist, enhance the following prompt with keywords and search-optimized phrasing. Focus on discoverability:\n\n' + text,
  };
  var result = templates[mode] || templates.professional;

  setTimeout(function(){
    showLoading('pe', false);
    var out = document.getElementById('pe-output');
    if(out) out.value = result;
    showResult('pe');
  }, 400);
};

/* ─── 2. AI TEXT SUMMARIZER ─── */

window.summarizeText = function(){
  var input = document.getElementById('ts-input');
  var text = input && input.value.trim();
  if(!text || text.split(/\s+/).length < 10){ showError('ts', 'Please enter at least 10 words to summarize.'); return; }
  var modeEl = document.querySelector('.ts-mode[style*="var(--green)"]');
  var mode = modeEl ? modeEl.getAttribute('data-mode') : 'short';
  showLoading('ts', true);
  hideError('ts');
  hideResult('ts');

  setTimeout(function(){
    showLoading('ts', false);
    var sentences = text.match(/[^.!?\n]+[.!?]*/g) || [text];
    var words = text.split(/\s+/);
    var result = '';
    if(mode === 'short'){
      var ratio = Math.max(1, Math.ceil(sentences.length * 0.2));
      result = sentences.slice(0, ratio).join(' ');
    } else if(mode === 'detailed'){
      var ratio = Math.max(1, Math.ceil(sentences.length * 0.5));
      result = sentences.slice(0, ratio).join(' ');
    } else if(mode === 'bullets'){
      var chunks = sentences.slice(0, Math.min(8, sentences.length));
      result = chunks.map(function(s){ return '• ' + s.trim(); }).join('\n');
    }
    if(!result) result = text.slice(0, 200) + '...';
    var out = document.getElementById('ts-output');
    if(out) out.value = result;
    showResult('ts');
  }, 500);
};

/* ─── 3. AI GRAMMAR & REWRITE ─── */

window.rewriteText = function(){
  var input = document.getElementById('gr-input');
  var text = input && input.value.trim();
  if(!text){ showError('gr', 'Please enter some text.'); return; }
  var modeEl = document.querySelector('.gr-mode[style*="var(--green)"]');
  var mode = modeEl ? modeEl.getAttribute('data-mode') : 'grammar';
  showLoading('gr', true);
  hideError('gr');
  hideResult('gr');

  setTimeout(function(){
    showLoading('gr', false);
    var result = text;
    if(mode === 'grammar'){
      result = text
        .replace(/\bi\b/g, 'I')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+([.,!?:;])/g, '$1')
        .replace(/([.,!?:;])(?!\s)/g, '$1 ')
        .trim();
    } else if(mode === 'professional'){
      result = 'Dear [Hiring Manager],\n\n' + text + '\n\nThank you for your consideration.\n\nBest regards,\n[Candidate Name]';
    } else if(mode === 'formal'){
      result = 'To Whom It May Concern,\n\n' + text.charAt(0).toUpperCase() + text.slice(1) + '\n\nSincerely,\n[Your Name]';
    } else if(mode === 'simple'){
      var words = text.split(/\s+/);
      var simple = [];
      for(var i=0;i<words.length;i++){
        var w = words[i].replace(/[^a-zA-Z]/g,'');
        if(w.length > 8) simple.push(words[i].slice(0, Math.ceil(w.length/2)) + (words[i].slice(-1).match(/[.,!?]/) ? words[i].slice(-1) : ''));
        else simple.push(words[i]);
      }
      result = simple.join(' ');
    } else if(mode === 'shorten'){
      var sents = text.match(/[^.!?\n]+[.!?]*/g) || [text];
      result = sents.slice(0, Math.max(1, Math.ceil(sents.length * 0.4))).join(' ');
    } else if(mode === 'expand'){
      result = text + '\n\nFurthermore, it is worth noting that this topic has broader implications. Additional context and supporting details would strengthen the overall message and provide a more comprehensive understanding for the reader.';
    }
    var out = document.getElementById('gr-output');
    if(out) out.value = result;
    showResult('gr');
  }, 400);
};

/* ─── 4. AI CV GENERATOR ─── */

window.generateCv = function(){
  var name = document.getElementById('cv-name').value.trim();
  var email = document.getElementById('cv-email').value.trim();
  var phone = document.getElementById('cv-phone').value.trim();
  var loc = document.getElementById('cv-location').value.trim();
  var linkedin = document.getElementById('cv-linkedin').value.trim();
  var website = document.getElementById('cv-website').value.trim();
  var summary = document.getElementById('cv-summary').value.trim();
  var skills = document.getElementById('cv-skills').value.trim();
  var experience = document.getElementById('cv-experience').value.trim();
  var education = document.getElementById('cv-education').value.trim();
  var languages = document.getElementById('cv-languages').value.trim();

  if(!name || !email){ showError('cv', 'Name and Email are required.'); return; }
  showLoading('cv', true);
  hideError('cv');

  var html = '<div style="font-size:0.8rem;margin-bottom:4px;"><strong>' + escapeHtml(name) + '</strong></div>';
  html += '<div style="font-size:0.55rem;color:var(--muted);margin-bottom:8px;">' + [email, phone, loc].filter(Boolean).join(' | ') + '</div>';
  if(linkedin || website) html += '<div style="font-size:0.5rem;color:var(--muted);margin-bottom:12px;">' + [linkedin, website].filter(Boolean).join(' | ') + '</div>';
  if(summary) html += '<div style="margin-bottom:12px;padding:8px;background:var(--surface);border-left:2px solid var(--green);font-size:0.55rem;">' + escapeHtml(summary) + '</div>';
  if(skills) html += '<div style="margin-bottom:10px;"><div style="font-size:0.5rem;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px;">Skills</div><div style="font-size:0.55rem;">' + skills.split(',').map(function(s){ return '<span style="background:var(--surface);border:1px solid var(--green-border);padding:2px 6px;margin:2px;border-radius:2px;font-size:0.5rem;display:inline-block;">' + escapeHtml(s.trim()) + '</span>'; }).join('') + '</div></div>';
  if(experience) html += '<div style="margin-bottom:10px;"><div style="font-size:0.5rem;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px;">Experience</div><div style="font-size:0.55rem;white-space:pre-wrap;">' + escapeHtml(experience) + '</div></div>';
  if(education) html += '<div style="margin-bottom:10px;"><div style="font-size:0.5rem;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px;">Education</div><div style="font-size:0.55rem;white-space:pre-wrap;">' + escapeHtml(education) + '</div></div>';
  if(languages) html += '<div><div style="font-size:0.5rem;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px;">Languages</div><div style="font-size:0.55rem;">' + languages.split(',').map(function(l){ return escapeHtml(l.trim()); }).join(' &middot; ') + '</div></div>';
  window._cvHtml = html;
  window._cvName = name;

  var preview = document.getElementById('cv-preview');
  if(preview){ preview.innerHTML = html; preview.style.display = 'block'; }
  showLoading('cv', false);
  document.getElementById('cv-result').style.display = 'block';
};

window.printCv = function(){
  if(!window._cvHtml) return;
  var w = window.open('', '_blank', 'width=800,height=600');
  w.document.write('<html><head><style>body{font-family:Helvetica,Arial,sans-serif;padding:40px;color:#333;line-height:1.6;}</style></head><body>' + window._cvHtml + '<script>window.print();<\/script></body></html>');
  w.document.close();
};

window.downloadCvPdf = function(){
  if(!window._cvHtml) return;
  var w = window.open('', '_blank');
  w.document.write('<html><head><style>body{font-family:Helvetica,Arial,sans-serif;padding:40px;color:#000;line-height:1.6;font-size:12pt;}@media print{@page{margin:20mm;}}</style></head><body>' + window._cvHtml + '</body></html>');
  w.document.close();
  setTimeout(function(){ w.print(); }, 300);
};

window.clearCv = function(){
  var ids = ['cv-name','cv-email','cv-phone','cv-location','cv-linkedin','cv-website','cv-summary','cv-skills','cv-experience','cv-education','cv-languages'];
  ids.forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('cv-preview').style.display = 'none';
  document.getElementById('cv-result').style.display = 'none';
  document.getElementById('cv-error').style.display = 'none';
  window._cvHtml = null;
};

/* ─── 5. AI RESUME ANALYZER ─── */

window.loadResumeFile = function(input){
  var file = input && input.files && input.files[0];
  if(!file) return;
  showLoading('ra', true);
  hideError('ra');
  var reader = new FileReader();
  reader.onload = function(e){
    var text = e.target.result;
    var ta = document.getElementById('ra-input');
    if(ta) ta.value = text;
    showLoading('ra', false);
  };
  reader.onerror = function(){ showError('ra', 'Failed to read file.'); showLoading('ra', false); };
  reader.readAsText(file);
};

window.analyzeResume = function(){
  var input = document.getElementById('ra-input');
  var text = input && input.value.trim();
  if(!text || text.split(/\s+/).length < 20){ showError('ra', 'Please enter at least 20 words of resume text.'); return; }
  showLoading('ra', true);
  hideError('ra');
  hideResult('ra');

  setTimeout(function(){
    showLoading('ra', false);
    var words = text.toLowerCase().split(/\s+/);
    var wordCount = words.length;
    var hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    var hasPhone = /[\d\s\-\(\)]{7,}/.test(text);
    var hasLinkedin = /linkedin\.com/.test(text.toLowerCase());
    var skillKeywords = ['javascript','python','java','react','node','sql','html','css','git','aws','docker','kubernetes','agile','scrum','management','leadership','communication','teamwork','analytical','problem.solving','project management','data','analysis','design','development','testing','api','rest','graphql','mongodb','postgresql','typescript','angular','vue','php','ruby','c++','c#','go','rust','devops','ci/cd','jenkins','terraform','ansible','linux','windows','excel','word','powerpoint','photoshop','figma','sketch','ui/ux','machine learning','ai','deep learning','nlp','tensorflow','pytorch'];
    var found = [];
    var missing = [];
    for(var i=0;i<skillKeywords.length;i++){
      if(text.toLowerCase().indexOf(skillKeywords[i].replace('.',' ')) !== -1) found.push(skillKeywords[i]);
      else if(skillKeywords[i] !== 'problem.solving') missing.push(skillKeywords[i]);
    }
    var score = Math.min(100, Math.round(found.length / 10 * 100));
    var atsScore = Math.min(100, Math.round((hasEmail?15:0)+(hasPhone?15:0)+(hasLinkedin?10:0)+(found.length>5?20:found.length>2?10:0)+(wordCount>100?20:wordCount>50?10:0)+(text.split('\n').length>5?10:0)+(/\b(education|experience|skills)\b/i.test(text)?10:0)));

    var report = '═══ RESUME ANALYSIS REPORT ═══\n\n';
    report += '📊 Overall Score: ' + score + '/100\n';
    report += '🎯 ATS Compatibility: ' + atsScore + '/100\n\n';
    report += '📝 Resume Stats:\n';
    report += '  • Word Count: ' + wordCount + '\n';
    report += '  • Contact Info: ' + (hasEmail?'✅ Email ':'❌ Email ') + (hasPhone?'✅ Phone ':'❌ Phone ') + (hasLinkedin?'✅ LinkedIn':'❌ LinkedIn') + '\n\n';
    report += '✅ Strengths (' + found.length + ' keywords found):\n';
    if(found.length > 0) found.slice(0, 15).forEach(function(s){ report += '  ✔ ' + s.charAt(0).toUpperCase() + s.slice(1) + '\n'; });
    else report += '  No specific keywords detected.\n';
    report += '\n⚠️ Improvement Suggestions:\n';
    if(!hasEmail) report += '  • Add email address\n';
    if(!hasPhone) report += '  • Add phone number\n';
    if(!hasLinkedin) report += '  • Add LinkedIn profile URL\n';
    if(found.length < 5) report += '  • Include more industry-specific keywords and skills\n';
    if(wordCount < 100) report += '  • Expand your resume content (aim for 200+ words)\n';
    if(text.split('\n').length < 5) report += '  • Use clear section headers (Experience, Education, Skills)\n';
    report += '\n🔍 Missing Keywords (sample):\n  ' + missing.slice(0, 10).join(', ') + '\n';
    report += '\n────────────────────────\nGenerated by AI Resume Analyzer';

    var out = document.getElementById('ra-output');
    if(out) out.textContent = report;
    window._raReport = report;
    showResult('ra');
  }, 600);
};

window.downloadRaReport = function(){
  if(!window._raReport) return;
  var blob = new Blob([window._raReport], {type:'text/plain'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'resume-analysis-report.txt';
  a.click();
};

window.clearRa = function(){
  document.getElementById('ra-input').value = '';
  document.getElementById('ra-output').textContent = '';
  document.getElementById('ra-result').style.display = 'none';
  document.getElementById('ra-error').style.display = 'none';
};

/* ─── 6. AI COVER LETTER GENERATOR ─── */

window.generateCoverLetter = function(){
  var name = document.getElementById('cl-name').value.trim();
  var jobTitle = document.getElementById('cl-job-title').value.trim();
  var company = document.getElementById('cl-company').value.trim();
  var level = document.getElementById('cl-level').value.trim();
  var skills = document.getElementById('cl-skills').value.trim();
  var notes = document.getElementById('cl-notes').value.trim();
  if(!name || !jobTitle || !company){ showError('cl', 'Name, Job Title, and Company are required.'); return; }
  var toneEl = document.querySelector('.cl-tone[style*="var(--green)"]');
  var tone = toneEl ? toneEl.getAttribute('data-tone') : 'professional';
  showLoading('cl', true);
  hideError('cl');
  hideResult('cl');

  setTimeout(function(){
    showLoading('cl', false);
    var date = new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
    var letter = date + '\n\n';
    letter += 'Hiring Manager\n' + company + '\n\n';
    letter += 'Dear Hiring Manager,\n\n';

    if(tone === 'professional'){
      letter += 'I am writing to express my strong interest in the ' + jobTitle + ' position at ' + company + '. ';
      letter += 'With my experience and skill set, I am confident I would be a valuable addition to your team.\n\n';
      letter += level ? 'As a ' + level + ' professional, ' : '';
      letter += skills ? 'My key skills include ' + skills + ', ' : '';
      letter += 'which I believe align well with the requirements of this role.\n\n';
      letter += notes ? notes + '\n\n' : '';
      letter += 'I would welcome the opportunity to discuss how my experience and qualifications can contribute to the continued success of ' + company + '. Thank you for considering my application.\n\n';
      letter += 'Sincerely,\n' + name;
    } else if(tone === 'enthusiastic'){
      letter += 'I was thrilled to learn about the ' + jobTitle + ' opening at ' + company + '! ';
      letter += 'As a long-time admirer of your work, I would love to bring my energy and expertise to your team.\n\n';
      letter += skills ? 'My skills in ' + skills + ' make me a great fit for this role. ' : '';
      letter += notes ? notes + '\n\n' : '';
      letter += 'I am genuinely excited about the opportunity to contribute to ' + company + '\'s mission. I look forward to hearing from you!\n\n';
      letter += 'Best regards,\n' + name;
    } else {
      letter += 'I am applying for the ' + jobTitle + ' position at ' + company + '. ';
      letter += skills ? 'Skills: ' + skills + '. ' : '';
      letter += level ? 'Experience level: ' + level + '. ' : '';
      letter += notes ? notes + ' ' : '';
      letter += '\n\nI look forward to discussing this opportunity further.\n\n';
      letter += 'Regards,\n' + name;
    }

    var out = document.getElementById('cl-output');
    if(out) out.value = letter;
    window._clText = letter;
    showResult('cl');
  }, 500);
};

window.downloadClPdf = function(){
  if(!window._clText) return;
  var w = window.open('', '_blank');
  w.document.write('<html><head><style>body{font-family:Helvetica,Arial,sans-serif;padding:40px;color:#000;line-height:1.8;font-size:12pt;white-space:pre-wrap;}@media print{@page{margin:20mm;}}</style></head><body>' + escapeHtml(window._clText).replace(/\n/g, '<br>') + '</body></html>');
  w.document.close();
  setTimeout(function(){ w.print(); }, 300);
};

window.clearCl = function(){
  ['cl-name','cl-job-title','cl-company','cl-level','cl-skills','cl-notes'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('cl-output').value = '';
  document.getElementById('cl-result').style.display = 'none';
  document.getElementById('cl-error').style.display = 'none';
};

/* ─── 7. PHOTO ENHANCER ─── */

var _peFile = null;

window.loadPeImage = function(input){
  var file = input && input.files && input.files[0];
  if(!file) return;
  _peFile = file;
  var reader = new FileReader();
  reader.onload = function(e){
    var img = document.getElementById('pe-img');
    if(img){ img.src = e.target.result; document.getElementById('pe-img-preview').style.display = 'block'; }
    document.getElementById('pe-result').style.display = 'none';
    document.getElementById('pe-error').style.display = 'none';
    window._peDataUrl = e.target.result;
  };
  reader.readAsDataURL(file);
};

window.enhancePhoto = function(mode){
  if(!window._peDataUrl){ showError('pe', 'Please upload an image first.'); return; }
  showLoading('pe', true);
  hideError('pe');
  document.getElementById('pe-result').style.display = 'none';

  var img = new Image();
  img.onload = function(){
    var canvas = document.createElement('canvas');
    canvas.width = mode === 'upscale' ? img.width * 2 : img.width;
    canvas.height = mode === 'upscale' ? img.height * 2 : img.height;
    var ctx = canvas.getContext('2d');
    if(mode === 'sharpen'){
      ctx.filter = 'contrast(1.2) saturate(1.1) brightness(1.05)';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else if(mode === 'enhance'){
      ctx.filter = 'contrast(1.3) saturate(1.2) brightness(1.1) blur(0.3px)';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    window._peResultUrl = canvas.toDataURL('image/jpeg', 0.95);
    document.getElementById('pe-before').src = window._peDataUrl;
    document.getElementById('pe-after').src = window._peResultUrl;
    document.getElementById('pe-result').style.display = 'block';
    showLoading('pe', false);
  };
  img.src = window._peDataUrl;
};

window.downloadPeImage = function(){
  if(!window._peResultUrl) return;
  var a = document.createElement('a');
  a.href = window._peResultUrl;
  a.download = 'enhanced_' + (_peFile ? _peFile.name : 'photo.jpg');
  a.click();
};

/* ─── 8. AI IMAGE TO TEXT (OCR) ─── */

var _ocrFile = null;
var _ocrImgData = null;

window.loadOcrImage = function(input){
  var file = input && input.files && input.files[0];
  if(!file) return;
  _ocrFile = file;
  var reader = new FileReader();
  reader.onload = function(e){
    _ocrImgData = e.target.result;
    var img = document.getElementById('ocr-img');
    if(img){ img.src = e.target.result; document.getElementById('ocr-preview').style.display = 'block'; }
    document.getElementById('ocr-result').style.display = 'none';
    document.getElementById('ocr-error').style.display = 'none';
  };
  reader.readAsDataURL(file);
};

window.runOcr = function(){
  if(!_ocrImgData){ showError('ocr', 'Please upload an image first.'); return; }
  showLoading('ocr', true);
  hideError('ocr');
  hideResult('ocr');

  var img = new Image();
  img.onload = function(){
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var dataUrl = canvas.toDataURL('image/jpeg', 0.8);

    fetch('https://router.huggingface.co/hf-inference/models/tesseract-ocr/tesseract-ocr', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + (_aigKey || '__HF_TOKEN__'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: dataUrl })
    }).then(function(r){
      if(!r.ok) throw new Error('OCR failed (HTTP ' + r.status + ')');
      return r.json();
    }).then(function(data){
      showLoading('ocr', false);
      var text = data && data.text ? data.text : (data[0] && data[0].text ? data[0].text : 'No text detected.');
      var out = document.getElementById('ocr-output');
      if(out) out.value = text;
      showResult('ocr');
    }).catch(function(err){
      showLoading('ocr', false);
      showError('ocr', err.message || 'OCR failed. Make sure the image has clear text.');
    });
  };
  img.src = _ocrImgData;
};

window.downloadOcrText = function(){
  var ta = document.getElementById('ocr-output');
  if(!ta || !ta.value) return;
  var blob = new Blob([ta.value], {type:'text/plain'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'ocr-extracted-text.txt';
  a.click();
};

window.clearOcr = function(){
  document.getElementById('ocr-output').value = '';
  document.getElementById('ocr-result').style.display = 'none';
  document.getElementById('ocr-error').style.display = 'none';
  _ocrImgData = null;
  document.getElementById('ocr-preview').style.display = 'none';
};

/* ─── 9. OBJECT REMOVER ─── */

var _orFile = null;
var _orOriginalData = null;
var _orCanvas = null;
var _orCtx = null;
var _orBrushSize = 40;
var _orIsDrawing = false;
var _orMask = null;

window.loadOrImage = function(input){
  var file = input && input.files && input.files[0];
  if(!file) return;
  _orFile = file;
  var reader = new FileReader();
  reader.onload = function(e){
    _orOriginalData = e.target.result;
    document.getElementById('or-preview').style.display = 'block';
    document.getElementById('or-result').style.display = 'none';
    document.getElementById('or-error').style.display = 'none';
    initOrCanvas();
  };
  reader.readAsDataURL(file);
};

function initOrCanvas(){
  var img = new Image();
  img.onload = function(){
    var canvas = document.getElementById('or-canvas');
    canvas.width = Math.min(img.width, 600);
    canvas.height = Math.min(img.height, 400);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    _orCanvas = canvas;
    _orCtx = ctx;
    _orMask = ctx.getImageData(0, 0, canvas.width, canvas.height);
    window._orOrigData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setupOrDrawing();
  };
  img.src = _orOriginalData;
}

function setupOrDrawing(){
  var canvas = _orCanvas;
  canvas.onmousedown = function(e){ _orIsDrawing = true; drawOrBrush(e); };
  canvas.onmousemove = function(e){ if(_orIsDrawing) drawOrBrush(e); };
  canvas.onmouseup = function(){ _orIsDrawing = false; };
  canvas.onmouseleave = function(){ _orIsDrawing = false; };
  canvas.ontouchstart = function(e){ e.preventDefault(); _orIsDrawing = true; drawOrBrush(e.touches[0]); };
  canvas.ontouchmove = function(e){ e.preventDefault(); if(_orIsDrawing) drawOrBrush(e.touches[0]); };
  canvas.ontouchend = function(){ _orIsDrawing = false; };
}

function drawOrBrush(e){
  var rect = _orCanvas.getBoundingClientRect();
  var x = (e.clientX - rect.left) * (_orCanvas.width / rect.width);
  var y = (e.clientY - rect.top) * (_orCanvas.height / rect.height);
  _orCtx.beginPath();
  _orCtx.arc(x, y, _orBrushSize, 0, Math.PI * 2);
  _orCtx.fillStyle = 'rgba(255,0,0,0.3)';
  _orCtx.fill();
}

window.setOrBrush = function(size){
  _orBrushSize = size;
  var btns = document.querySelectorAll('#or-preview ~ div button, #or-preview + div button');
};

window.clearOrMask = function(){
  if(!_orCanvas || !window._orOrigData) return;
  _orCtx.putImageData(window._orOrigData, 0, 0);
};

window.removeObject = function(){
  if(!_orCanvas){ showError('or', 'Please upload an image first.'); return; }
  showLoading('or', true);
  hideError('or');

  setTimeout(function(){
    try {
      var w = _orCanvas.width, h = _orCanvas.height;
      var resultCanvas = document.getElementById('or-result-canvas');
      resultCanvas.width = w;
      resultCanvas.height = h;
      var rCtx = resultCanvas.getContext('2d');
      var src = _orCtx.getImageData(0, 0, w, h);
      var data = src.data;
      var orig = window._orOrigData.data;
      var out = new Uint8ClampedArray(data);

      for(var y=0;y<h;y++){
        for(var x=0;x<w;x++){
          var idx = (y * w + x) * 4;
          var ra = data[idx], ga = data[idx+1], ba = data[idx+2], aa = data[idx+3];
          var ro = orig[idx], go = orig[idx+1], bo = orig[idx+2];
          var diff = Math.abs(ra-ro) + Math.abs(ga-go) + Math.abs(ba-bo);
          if(diff > 30 && aa > 0){
            var nearby = 0, nr=0, ng=0, nb=0;
            for(var dy=-10;dy<=10;dy++){
              for(var dx=-10;dx<=10;dx++){
                var nx = x+dx, ny = y+dy;
                if(nx>=0 && nx<w && ny>=0 && ny<h){
                  var nidx = (ny*w+nx)*4;
                  var ndiff = Math.abs(data[nidx]-orig[nidx]) + Math.abs(data[nidx+1]-orig[nidx+1]) + Math.abs(data[nidx+2]-orig[nidx+2]);
                  if(ndiff < 30){
                    nearby++; nr+=orig[nidx]; ng+=orig[nidx+1]; nb+=orig[nidx+2];
                  }
                }
              }
            }
            if(nearby > 0){
              out[idx] = nr/nearby; out[idx+1] = ng/nearby; out[idx+2] = nb/nearby;
            }
          } else {
            out[idx] = ro; out[idx+1] = go; out[idx+2] = bo;
          }
        }
      }
      rCtx.putImageData(new ImageData(out, w, h), 0, 0);
      var origCanvas = document.getElementById('or-original');
      origCanvas.width = w; origCanvas.height = h;
      origCanvas.getContext('2d').putImageData(window._orOrigData, 0, 0);
      document.getElementById('or-result').style.display = 'block';
      showLoading('or', false);
      window._orResultCanvas = resultCanvas;
    } catch(e){
      showLoading('or', false);
      showError('or', 'Processing failed: ' + e.message);
    }
  }, 300);
};

window.downloadOrImage = function(){
  if(!window._orResultCanvas) return;
  var a = document.createElement('a');
  a.href = window._orResultCanvas.toDataURL('image/png');
  a.download = 'object_removed_' + (_orFile ? _orFile.name.replace(/\.[^.]+$/, '') : 'image') + '.png';
  a.click();
};

/* ─── 10. IMAGE CLEANUP TOOL ─── */

var _icFile = null;
var _icDataUrl = null;

window.loadIcImage = function(input){
  var file = input && input.files && input.files[0];
  if(!file) return;
  _icFile = file;
  var reader = new FileReader();
  reader.onload = function(e){
    _icDataUrl = e.target.result;
    var img = document.getElementById('ic-img');
    if(img){ img.src = e.target.result; document.getElementById('ic-preview').style.display = 'block'; }
    document.getElementById('ic-result').style.display = 'none';
    document.getElementById('ic-error').style.display = 'none';
  };
  reader.readAsDataURL(file);
};

window.cleanImage = function(level){
  if(!_icDataUrl){ showError('ic', 'Please upload an image first.'); return; }
  showLoading('ic', true);
  hideError('ic');
  document.getElementById('ic-result').style.display = 'none';

  var img = new Image();
  img.onload = function(){
    var w = img.width, h = img.height;
    var canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var srcData = ctx.getImageData(0, 0, w, h);
    var data = srcData.data;
    var radius = level === 'light' ? 1 : level === 'medium' ? 2 : 3;
    var threshold = level === 'light' ? 40 : level === 'medium' ? 60 : 80;
    var out = new Uint8ClampedArray(data);

    for(var y=radius;y<h-radius;y++){
      for(var x=radius;x<w-radius;x++){
        var idx = (y*w+x)*4;
        var r=data[idx], g=data[idx+1], b=data[idx+2];
        var totalDiff = 0, count = 0;
        var sr=0, sg=0, sb=0;
        for(var dy=-radius;dy<=radius;dy++){
          for(var dx=-radius;dx<=radius;dx++){
            if(dx===0 && dy===0) continue;
            var nidx = ((y+dy)*w+(x+dx))*4;
            var diff = Math.abs(r-data[nidx]) + Math.abs(g-data[nidx+1]) + Math.abs(b-data[nidx+2]);
            totalDiff += diff;
            sr += data[nidx]; sg += data[nidx+1]; sb += data[nidx+2];
            count++;
          }
        }
        var avgDiff = totalDiff / count;
        if(avgDiff > threshold){
          out[idx] = sr/count; out[idx+1] = sg/count; out[idx+2] = sb/count;
        }
      }
    }
    ctx.putImageData(new ImageData(out, w, h), 0, 0);

    // show before/after
    document.getElementById('ic-before').src = _icDataUrl;
    document.getElementById('ic-after').src = canvas.toDataURL('image/jpeg', 0.92);
    document.getElementById('ic-result').style.display = 'block';
    showLoading('ic', false);
    window._icResultUrl = canvas.toDataURL('image/jpeg', 0.92);
  };
  img.src = _icDataUrl;
};

window.downloadIcImage = function(){
  if(!window._icResultUrl) return;
  var a = document.createElement('a');
  a.href = window._icResultUrl;
  a.download = 'cleaned_' + (_icFile ? _icFile.name : 'image.jpg');
  a.click();
};

/* ─── SHARED UI HELPERS ─── */

function showLoading(prefix, show){
  var el = document.getElementById(prefix + '-loading');
  if(el) el.style.display = show ? 'block' : 'none';
}

function showError(prefix, msg){
  var el = document.getElementById(prefix + '-error');
  if(el){ el.textContent = msg; el.style.display = 'block'; }
}

function hideError(prefix){
  var el = document.getElementById(prefix + '-error');
  if(el) el.style.display = 'none';
}

function showResult(prefix){
  var el = document.getElementById(prefix + '-result');
  if(el) el.style.display = 'block';
}

function hideResult(prefix){
  var el = document.getElementById(prefix + '-result');
  if(el) el.style.display = 'none';
}

function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

})();
