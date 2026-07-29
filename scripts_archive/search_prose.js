const fs = require('fs');
const path = require('path');

const dirs = [
    'E:\\My Drive\\Organized_Campaign_Archive\\Novelization_Drafts',
    'E:\\My Drive\\Organized_Campaign_Archive\\Weavers_Grimoire_Project',
    'E:\\My Drive\\novel ready'
];

const keywords = [
    'Breakfast Court', 'Signature That Bled', 'Tri-Weave', 
    'Screaming Skull', 'Iven Pell', 'Direction Four', 'BLACK LABS', 
    'Asmodeus', 'Elder Node', 'Cerebrilith', 'Primary Engine', 'White Wax'
];

function searchDir(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(searchDir(fullPath));
        } else if (file.endsWith('.txt') || file.endsWith('.md') || file.endsWith('.rtf')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                let found = [];
                for (const kw of keywords) {
                    if (content.toLowerCase().includes(kw.toLowerCase())) {
                        found.push(kw);
                    }
                }
                if (found.length > 0) {
                    results.push({ path: fullPath, keywords: found });
                }
            } catch (e) {}
        }
    }
    return results;
}

let allResults = [];
for (const dir of dirs) {
    allResults = allResults.concat(searchDir(dir));
}

console.log(JSON.stringify(allResults, null, 2));
