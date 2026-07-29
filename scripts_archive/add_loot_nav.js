const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === '.git' || file === 'scripts_archive' || file === 'node_modules') continue;
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.html')) {
            updateNav(fullPath);
        }
    }
}

function updateNav(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const isInSubdir = filePath.includes('Campaign_Module');
    const prefix = isInSubdir ? '../' : '';

    const searchStr = `<a href="${prefix}crew_generator.html" style="color: #22d3ee; font-weight: bold;">Crew Generator</a>`;
    const replaceStr = searchStr + `\n                        <a href="${prefix}loot_generator.html" style="color: #f59e0b; font-weight: bold;">Loot Generator</a>`;

    if (content.includes(searchStr)) {
        if (!content.includes('loot_generator.html')) {
            content = content.replace(searchStr, replaceStr);
            fs.writeFileSync(filePath, content);
            console.log("Updated navigation in " + filePath);
        }
    } else {
        console.log("Could not find anchor in " + filePath);
    }
}

processDir('h:/Antigravity/Novel');
