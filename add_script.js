const fs = require('fs');
let html = fs.readFileSync('h:/Antigravity/Novel/dm_faction_renown.html', 'utf8');
if (!html.includes('faction_tracker.js')) {
    html = html.replace('</body>', '    <script src="faction_tracker.js"></script>\n</body>');
    fs.writeFileSync('h:/Antigravity/Novel/dm_faction_renown.html', html, 'utf8');
    console.log("Added script tag.");
}
