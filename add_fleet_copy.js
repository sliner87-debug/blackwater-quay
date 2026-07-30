const fs = require('fs');
let html = fs.readFileSync('h:/Antigravity/Novel/fleet_generator.html', 'utf8');

const targetStr = '<button id="btn-generate-fleet" class="btn-generate">Deploy Fleet</button>';
const replaceStr = '<div style="display: flex; gap: 10px;"><button id="btn-generate-fleet" class="btn-generate" style="flex: 1;">Deploy Fleet</button><button id="btn-copy-fleet" class="btn-generate" style="background: #334155; flex: 1;">Copy as JSON</button></div>';

if (html.includes(targetStr) && !html.includes('id="btn-copy-fleet"')) {
    html = html.replace(targetStr, replaceStr);
    fs.writeFileSync('h:/Antigravity/Novel/fleet_generator.html', html, 'utf8');
    console.log("Added copy button to fleet generator");
} else {
    console.log("Already added or not found");
}
