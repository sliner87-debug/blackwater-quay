const fs = require('fs');
const path = require('path');

const dir = 'h:\\Antigravity\\Novel';
const searchTerms = ['Mikhailis', 'Vael-Kaelor', 'Kael'];

function search(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.agents') {
                search(fullPath);
            }
        } else if (file.endsWith('.md') || file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.txt')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                searchTerms.forEach(term => {
                    let index = 0;
                    let count = 0;
                    while ((index = content.toLowerCase().indexOf(term.toLowerCase(), index)) !== -1) {
                        count++;
                        index += term.length;
                    }
                    if (count > 0) {
                        console.log(`Found ${count} occurrences of "${term}" in ${file}`);
                    }
                });
            } catch (e) {
                console.error(`Error reading ${file}:`, e.message);
            }
        }
    }
}

search(dir);
