const fs = require('fs');

let html = fs.readFileSync('h:/Antigravity/Novel/loot_generator.html', 'utf8');

if (!html.includes('id="btn-copy"')) {
    html = html.replace('<button id="btn-generate" class="btn-generate">Generate Loot</button>', '<div style="display: flex; gap: 10px; margin-top: 20px;"><button id="btn-generate" class="btn-generate" style="flex: 1;">Generate Loot</button><button id="btn-copy" class="btn-generate" style="background: #334155; flex: 1;">Copy to Clipboard</button></div>');
    fs.writeFileSync('h:/Antigravity/Novel/loot_generator.html', html, 'utf8');
}
