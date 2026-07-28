const fs = require('fs');

function extractArray(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const match = htmlContent.match(/const novelChapters\s*=\s*(\[[\s\S]*?\]);\s*(?:\/\/|let currentView|<\/script>)/);
    if (match) {
        try {
            return eval(match[1]);
        } catch (e) {
            console.error("Eval error in", filePath, ":", e.message);
        }
    } else {
        console.error("Regex match failed for", filePath);
    }
    return [];
}

const book1 = extractArray('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html');
const book2 = extractArray('h:\\Antigravity\\Novel\\book2_outer_carry.html');
const book3 = extractArray('h:\\Antigravity\\Novel\\book3_third_quiet.html');

console.log("Book 1 chapters:", book1.length);
console.log("Book 2 chapters:", book2.length);
console.log("Book 3 chapters:", book3.length);

const flat1 = book1.flat();
const flat2 = book2.flat();
const flat3 = book3.flat();

const masterArray = [...flat1, ...flat2, ...flat3];

let chapNum = 1;
masterArray.forEach(c => {
    if (c.type === 'chapter') {
        c.number = chapNum++;
        c.id = `chapter-${c.number}`;
    }
});

console.log("Total master chapters:", masterArray.length);

let templateHtml = fs.readFileSync('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html', 'utf-8');
const templateMatch = templateHtml.match(/const novelChapters\s*=\s*\[[\s\S]*?\];\s*(?:\/\/|let currentView|<\/script>)/);

if (templateMatch) {
    const newArrayStr = JSON.stringify(masterArray, null, 8).replace(/\]$/, '\t]');
    templateHtml = templateHtml.replace(/const novelChapters\s*=\s*\[[\s\S]*?\];/, `const novelChapters = ${newArrayStr};`);
    
    templateHtml = templateHtml.replace(/<title>.*?<\/title>/, '<title>The Blackwater Quay Trilogy (Master Edition)</title>');
    templateHtml = templateHtml.replace(/<h1>.*?<\/h1>/, '<h1>The Blackwater Quay Trilogy (Master Edition)</h1>');
    
    fs.writeFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', templateHtml);
    console.log(`Successfully generated master_novel_complete.html!`);
} else {
    console.error("Could not find template insertion point.");
}
