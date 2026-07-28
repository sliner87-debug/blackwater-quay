const fs = require('fs');

const inFile = 'h:\\Antigravity\\Novel\\blackwater_quay_codex.html';
const outFile = 'h:\\Antigravity\\Novel\\blackwater_quay_omnibus.md';

let html = fs.readFileSync(inFile, 'utf8');

const startMarker = 'const novelChapters = [';
const startIndex = html.indexOf(startMarker);
if (startIndex === -1) {
    console.error("Could not find const novelChapters = [");
    process.exit(1);
}

let openBrackets = 0;
let arrayStartIdx = html.indexOf('[', startIndex);
let arrayEndIdx = -1;

for (let i = arrayStartIdx; i < html.length; i++) {
    if (html[i] === '[') openBrackets++;
    else if (html[i] === ']') openBrackets--;
    
    if (openBrackets === 0) {
        arrayEndIdx = i + 1;
        break;
    }
}

const arrayString = html.substring(arrayStartIdx, arrayEndIdx);

let chapters = [];
try {
    chapters = eval('(' + arrayString + ')');
} catch (e) {
    console.error('Error parsing array', e);
    process.exit(1);
}

let combinedMarkdown = "# Blackwater Quay — The Complete Omnibus\n\n";
let totalWordCount = 0;

chapters.forEach(ch => {
    let title = ch.title || `Chapter ${ch.chapterNumber || ch.chapter || ''}`;
    combinedMarkdown += `## ${title}\n\n`;
    
    if (ch.content && Array.isArray(ch.content)) {
        ch.content.forEach(paragraph => {
            // Strip any stray HTML tags
            let cleanText = paragraph.replace(/<[^>]+>/g, '').trim();
            if (cleanText) {
                combinedMarkdown += `${cleanText}\n\n`;
                // Count words
                let words = cleanText.split(/\s+/).filter(w => w.length > 0);
                totalWordCount += words.length;
            }
        });
    }
});

fs.writeFileSync(outFile, combinedMarkdown, 'utf8');
console.log(`Total Word Count: ${totalWordCount}`);
console.log(`Combined novel saved to ${outFile}`);
