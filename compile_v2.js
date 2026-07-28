const fs = require('fs');
const path = require('path');

const srcDir = 'H:\\Antigravity\\Novel';
const outPath = path.join(srcDir, 'Sablehook_Master_Novel_v2.md');

let totalWords = 0;
let totalLines = 0;
let masterContent = '# Sablehook — Master Novel (Version 2)\n\n';

let missing = [];

for (let i = 1; i <= 22; i++) {
    const filename = `Chapter${String(i).padStart(2, '0')}-v2.md`;
    const filePath = path.join(srcDir, filename);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        masterContent += `\n\n` + content.trim() + `\n\n`;
        
        const words = content.trim().split(/\s+/).length;
        const lines = content.split('\n').length;
        totalWords += words;
        totalLines += lines;
        console.log(`[V2 Compiled] ${filename}: ${lines} lines, ${words} words`);
    } else {
        missing.push(filename);
        console.log(`[Pending] ${filename} not found yet.`);
    }
}

if (missing.length === 0) {
    fs.writeFileSync(outPath, masterContent, 'utf8');
    console.log(`\n========================================`);
    console.log(`V2 Compilation Complete!`);
    console.log(`Saved master manuscript to: ${outPath}`);
    console.log(`Total Lines: ${totalLines}`);
    console.log(`Total Word Count (Chapters 1-22): ${totalWords}`);
    console.log(`========================================\n`);
} else {
    console.log(`\nCompilation delayed. Waiting on ${missing.length} chapters: ${missing.join(', ')}`);
}
