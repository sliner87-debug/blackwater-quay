const fs = require('fs');

let clean = JSON.parse(fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\clean_chapters.json', 'utf-8'));

function countWords(chapters) {
    let count = 0;
    chapters.forEach(c => {
        if (c.content && Array.isArray(c.content)) {
            c.content.forEach(p => {
                count += p.trim().split(/\s+/).length;
            });
        }
    });
    return count;
}

const origWords = countWords(clean);
console.log(`clean_chapters.json words: ${origWords}`);

// Find how many words the deleted chapters had
let deletedCount = 0;
const ch34 = clean.find(c => c.title.includes("Auction Night"));
if (ch34) {
    console.log("Chapter 34 (Duplicate Auction) words:", countWords([ch34]));
    deletedCount += countWords([ch34]);
}

const cradleIdx = clean.findIndex(c => c.title.includes("The Cradle Doctrine"));
if (cradleIdx !== -1) {
    const ch51 = clean[cradleIdx];
    const ch52 = clean[cradleIdx + 1];
    console.log("Chapter 51 (Cradle Doctrine) words:", countWords([ch51]));
    console.log("Chapter 52 words:", countWords([ch52]));
    deletedCount += countWords([ch51, ch52]);
}

console.log(`Total deleted words: ${deletedCount}`);
