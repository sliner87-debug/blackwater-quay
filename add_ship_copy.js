const fs = require('fs');
let html = fs.readFileSync('h:/Antigravity/Novel/shipyard.html', 'utf8');

const targetStr = '<button id="btn-build" class="btn-build">Build Ship Stat Block</button>';
const replaceStr = '<div style="display: flex; gap: 10px;"><button id="btn-build" class="btn-build" style="flex: 1;">Build Ship Stat Block</button><button id="btn-copy-ship" class="btn-build" style="background: #334155; flex: 1;">Copy as JSON</button></div>';

if (html.includes(targetStr) && !html.includes('id="btn-copy-ship"')) {
    html = html.replace(targetStr, replaceStr);
    fs.writeFileSync('h:/Antigravity/Novel/shipyard.html', html, 'utf8');
    console.log("Added copy button to shipyard");
} else {
    console.log("Already added or not found");
}
