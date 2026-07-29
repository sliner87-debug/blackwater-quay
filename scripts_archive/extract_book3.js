const fs = require('fs');
const path = require('path');

const inputPath = 'h:/Antigravity/Novel/blackwater_quay_codex.html';
const outputPath = 'h:/Antigravity/Novel/book3_third_quiet.html';

let html = fs.readFileSync(inputPath, 'utf-8');

html = html.replace(/<title>.*?<\/title>/is, '<title>Book 3: The Third Quiet & The Anchorhold</title>');

const startStr = 'const novelChapters = [';
const startIdx = html.indexOf(startStr);
if (startIdx === -1) {
    console.error('Could not find novelChapters');
    process.exit(1);
}

let openBrackets = 0;
let arrayStartIdx = html.indexOf('[', startIdx);
let arrayEndIdx = -1;

for (let i = arrayStartIdx; i < html.length; i++) {
    if (html[i] === '[') openBrackets++;
    else if (html[i] === ']') openBrackets--;
    
    if (openBrackets === 0) {
        arrayEndIdx = i + 1;
        break;
    }
}

if (arrayEndIdx === -1) {
    console.error('Could not find end of novelChapters array');
    process.exit(1);
}

const arrayString = html.substring(arrayStartIdx, arrayEndIdx);

let chapters = [];
try {
    chapters = eval('(' + arrayString + ')');
} catch (e) {
    console.error('Error parsing array', e);
    process.exit(1);
}

const filteredChapters = chapters.filter(ch => {
    let num = ch.chapter ?? ch.chapterNumber ?? ch.number ?? ch.id;
    if (num === undefined && ch.title) {
        const match = ch.title.match(/Chapter (\d+)/i);
        if (match) num = parseInt(match[1], 10);
    }
    
    let numStr = String(num).toLowerCase();
    
    if (numStr.includes('epilogue') || numStr.includes('aftermath')) {
        return true;
    }
    
    const numMatch = numStr.match(/\d+/);
    if (numMatch) {
        const parsedNum = parseInt(numMatch[0], 10);
        return parsedNum >= 51 && parsedNum <= 75;
    }
    
    return false;
});

console.log(`Filtered down to ${filteredChapters.length} chapters.`);

const newArrayString = JSON.stringify(filteredChapters, null, 8);

const newHtml = html.substring(0, arrayStartIdx) + newArrayString + html.substring(arrayEndIdx);

fs.writeFileSync(outputPath, newHtml, 'utf-8');
console.log('Successfully created', outputPath);
