const fs = require('fs');
const path = 'h:/Antigravity/Novel/blackwater_quay_codex.html';
let html = fs.readFileSync(path, 'utf8');
if (!html.includes('<script src="codex_wiki.js"></script>')) {
    html = html.replace('</body>', '    <script src="codex_wiki.js"></script>\n</body>');
    fs.writeFileSync(path, html, 'utf8');
    console.log("Added codex_wiki.js");
} else {
    console.log("codex_wiki.js already added");
}
