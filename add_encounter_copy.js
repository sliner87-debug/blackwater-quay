const fs = require('fs');
let html = fs.readFileSync('h:/Antigravity/Novel/dm_bestiary.html', 'utf8');

const targetStr = '<button id="btn-generate-encounter" style="background: #ef4444; color: #fff; border: none; padding: 12px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase;">Roll Initiative</button>';
const replaceStr = '<button id="btn-generate-encounter" style="background: #ef4444; color: #fff; border: none; padding: 12px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase;">Roll Initiative</button><button id="btn-copy-encounter" style="background: #334155; color: #fff; border: none; padding: 12px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase;">Copy Markdown</button>';

if (html.includes(targetStr) && !html.includes('id="btn-copy-encounter"')) {
    html = html.replace(targetStr, replaceStr);
    fs.writeFileSync('h:/Antigravity/Novel/dm_bestiary.html', html, 'utf8');
    console.log("Added copy button to encounter builder");
} else {
    console.log("Already added or not found");
}
