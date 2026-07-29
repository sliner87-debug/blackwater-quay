const fs = require('fs');
const path = require('path');

const srcDir = 'H:\\Antigravity\\Novel';
const outPath = 'H:\\Antigravity\\Novel\\Sablehook_Master_Novel.md';

let totalWords = 0;
let masterContent = '';

for (let i = 1; i <= 22; i++) {
    const filename = `Chapter${String(i).padStart(2, '0')}-New.md`;
    const filePath = path.join(srcDir, filename);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        masterContent += `\n\n# Chapter ${i}\n\n` + content;
        
        // Simple word count approximation
        const words = content.trim().split(/\s+/).length;
        totalWords += words;
        console.log(`${filename}: ${words} words`);
    } else {
        console.log(`Warning: ${filename} not found.`);
    }
}

fs.writeFileSync(outPath, masterContent, 'utf8');
console.log(`\nCompilation complete! Saved to ${outPath}`);
console.log(`Ultimate Word Count (Chapters 1-22): ${totalWords}`);
