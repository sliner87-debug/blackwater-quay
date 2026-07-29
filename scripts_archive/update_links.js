const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const targetUrl = 'https://sliner87-debug.github.io/Vanguard-Corsair-Generator/';

walkDir('h:/Antigravity/Novel/', function(filePath) {
    if (filePath.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Regex to replace href="crew_generator.html" or href="../crew_generator.html"
        if (content.match(/href="\.\.\/crew_generator\.html"/)) {
            content = content.replace(/href="\.\.\/crew_generator\.html"/g, 'href="' + targetUrl + '"');
            modified = true;
        }
        if (content.match(/href="crew_generator\.html"/)) {
            content = content.replace(/href="crew_generator\.html"/g, 'href="' + targetUrl + '"');
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content);
            console.log('Updated ' + filePath);
        }
    }
});
