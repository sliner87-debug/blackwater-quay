const fs = require('fs');

const inFile = 'h:\\Antigravity\\Novel\\blackwater_quay_codex.html';
const outFile = 'h:\\Antigravity\\Novel\\book2_outer_carry.html';

let html = fs.readFileSync(inFile, 'utf8');

const startMarker = 'const novelChapters = ';
const startIndex = html.indexOf(startMarker);
if (startIndex === -1) {
    console.error("Could not find const novelChapters = ");
    process.exit(1);
}

const arrayStart = startIndex + startMarker.length;
let arrayEnd = -1;
let bracketCount = 0;

for (let i = arrayStart; i < html.length; i++) {
    if (html[i] === '[') bracketCount++;
    else if (html[i] === ']') {
        bracketCount--;
        if (bracketCount === 0) {
            arrayEnd = i + 1;
            break;
        }
    }
}

if (arrayEnd === -1) {
    console.error("Could not find end of array");
    process.exit(1);
}

const arrayString = html.substring(arrayStart, arrayEnd);
let chapters;
try {
    chapters = eval('(' + arrayString + ')');
} catch(e) {
    console.error("Error parsing array:", e);
    process.exit(1);
}

const filteredChapters = chapters.filter(ch => {
    let num = ch.chapter ?? ch.chapterNumber ?? ch.number ?? ch.id;
    if (num === undefined && ch.title) {
        const match = ch.title.match(/Chapter (\d+)/i);
        if (match) num = parseInt(match[1], 10);
    }
    return num >= 26 && num <= 50;
});

const newArrayString = JSON.stringify(filteredChapters, null, 4);

let newHtml = html.replace(/<title>.*?<\/title>/i, '<title>Book 2: The Outer Carry & The White Forge</title>');
newHtml = newHtml.substring(0, arrayStart) + newArrayString + newHtml.substring(arrayEnd);

fs.writeFileSync(outFile, newHtml, 'utf8');
console.log(`Created ${outFile} with ${filteredChapters.length} chapters.`);
