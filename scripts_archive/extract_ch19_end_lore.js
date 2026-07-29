const fs = require('fs');
const path = require('path');

const logsDir = 'D:\\One Drive\\OneDrive\\Desktop\\Sorted_Game_Logs';
const outPath = 'C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\ch19_end_lore.md';

const files = fs.readdirSync(logsDir).sort();
let found = false;
let content = '# Lore for Chapters 19-22 (Phase 7)\n\n';

for (const file of files) {
    if (file === '16570426_003053_Blackwater Quay Session 5.5.md') {
        found = true;
        continue;
    }
    if (found && file.endsWith('.md')) {
        const fullPath = path.join(logsDir, file);
        content += `\n\n## Source: ${file}\n\n`;
        content += fs.readFileSync(fullPath, 'utf8');
    }
}

fs.writeFileSync(outPath, content, 'utf8');
console.log('Extraction complete. Saved to ' + outPath);
