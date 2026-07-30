const fs = require('fs');
const path = require('path');

const dir = 'h:/Antigravity/Novel/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('master_novel'));

for (let file of files) {
    const fullPath = path.join(dir, file);
    let html = fs.readFileSync(fullPath, 'utf8');
    
    // Add the script tag if not present
    if (!html.includes('<script src="search.js"></script>')) {
        // Find closing body tag
        html = html.replace('</body>', '    <script src="search.js"></script>\n</body>');
        fs.writeFileSync(fullPath, html, 'utf8');
        console.log("Added search.js to " + file);
    } else {
        console.log("search.js already in " + file);
    }
}
