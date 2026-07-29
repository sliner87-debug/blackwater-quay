const fs = require('fs');
const path = require('path');

const logsDir = 'D:\\One Drive\\OneDrive\\Desktop\\Sorted_Game_Logs';
const outPath = 'C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\ch14_18_lore.md';

const files = [
    '16570331_153008_Blackwater Quay Session 4.8.md',
    '16570401_194625_Blackwater Quay 4.9.md',
    '16570406_191501_Blackwater Quay 5.0.md',
    '16570408_005235_Blackwater Quay Session 5.1.md',
    '16570415_225001_Blackwater Quay Session 5.2.md',
    '16570421_185147_Blackwater Quay Session 5.3.md',
    '16570424_125623_Blackwater Quay Session 5.4.md',
    '16570426_003053_Blackwater Quay Session 5.5.md'
];

let content = '# Lore for Chapters 14-18 (Phase 6)\n\n';

for (const file of files) {
    const fullPath = path.join(logsDir, file);
    content += `\n\n## Source: ${file}\n\n`;
    content += fs.readFileSync(fullPath, 'utf8');
}

fs.writeFileSync(outPath, content, 'utf8');
console.log('Extraction complete. Saved to ' + outPath);
