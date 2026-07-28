const fs = require('fs');

let chapters = JSON.parse(fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\clean_chapters.json', 'utf-8'));

function findChapterIndexByNumber(numStr) {
    return chapters.findIndex(c => c.number === numStr);
}

// 1. Move Chapter 9 before Chapter 7
const ch9Idx = findChapterIndexByNumber("9");
const ch9 = chapters.splice(ch9Idx, 1)[0];
const ch7Idx = findChapterIndexByNumber("7");
chapters.splice(ch7Idx, 0, ch9);

// 2. Replace Chapter 25 content
const ch25Idx = findChapterIndexByNumber("25");
if (ch25Idx !== -1) {
    const ch25Text = fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\bridge_chapter_25.md', 'utf-8');
    chapters[ch25Idx].content = ch25Text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
}

// 3. Delete duplicate auction (Chapter 34)
const ch34Idx = chapters.findIndex(c => c.title.includes("Auction Night"));
if (ch34Idx !== -1) {
    chapters.splice(ch34Idx, 1);
}

// 4. Create and Insert Chapter 50
const ch50Text = fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\bridge_chapter_50.md', 'utf-8');
const ch50 = {
    id: "chapter-50",
    type: "chapter",
    number: "50",
    title: "The Outer Carry Expansion",
    part: "PART FIVE",
    partTitle: "THE HOUSE TAKES ROOT",
    content: ch50Text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0)
};

// Insert it after Chapter 49
let ch49Idx = findChapterIndexByNumber("49");
if (ch49Idx === -1) ch49Idx = chapters.findIndex(c => c.title.includes("House With Teeth"));
if (ch49Idx !== -1) {
    chapters.splice(ch49Idx + 1, 0, ch50);
}

// 5. Delete Old Chapters 51 and 52 (Hell / Rhinos)
// Let's find them by title "The Cradle Doctrine" and whatever the next one is.
let cradleIdx = chapters.findIndex(c => c.title.includes("The Cradle Doctrine"));
if (cradleIdx !== -1) {
    chapters.splice(cradleIdx, 2); // delete 51 and 52
}

// 6. Insert new Asmodeus Sequence
const asmodeusText = fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\asmodeus_scene.md', 'utf-8');
const asmodeusCh = {
    id: "chapter-asmodeus",
    type: "chapter",
    number: "51",
    title: "The Infernal Concordance",
    part: "PART SIX",
    partTitle: "THE OUTER CARRY",
    content: asmodeusText.split('\n\n').map(p => p.trim()).filter(p => p.length > 0)
};

// Insert it where cradleIdx was
if (cradleIdx !== -1) {
    chapters.splice(cradleIdx, 0, asmodeusCh);
} else {
    // just put it after ch50
    const ch50NewIdx = chapters.findIndex(c => c.id === "chapter-50");
    chapters.splice(ch50NewIdx + 1, 0, asmodeusCh);
}

// Ensure the chapters array is formatted back into the master HTML file
let originalHtml = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');
const startStr = 'const novelChapters = [';
const startIndex = originalHtml.indexOf(startStr);
let arrayEnd = originalHtml.indexOf('// Active view state');
if (arrayEnd === -1) arrayEnd = originalHtml.indexOf('let currentView');

let newHtml = originalHtml.substring(0, startIndex) + 
              'const novelChapters = ' + 
              JSON.stringify(chapters, null, 4) + 
              ';\n\n    ' + 
              originalHtml.substring(arrayEnd);

fs.writeFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', newHtml);
console.log("Successfully rebuilt master_novel_complete.html with " + chapters.length + " perfectly sequenced chapters.");
