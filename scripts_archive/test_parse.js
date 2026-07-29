const fs = require('fs');

const inFile = 'h:\\Antigravity\\Novel\\blackwater_quay_codex.html';
let html = fs.readFileSync(inFile, 'utf8');

const startMarker = 'const novelChapters = ';
const startIndex = html.indexOf(startMarker);

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

const arrayString = html.substring(arrayStart, arrayEnd);
let chapters = eval('(' + arrayString + ')');

console.log("Total chapters:", chapters.length);
console.log("Keys of first chapter:", Object.keys(chapters[0]));
if (chapters.length > 0) {
    console.log("First chapter number property:", chapters[0].number || chapters[0].chapter || chapters[0].id);
}
