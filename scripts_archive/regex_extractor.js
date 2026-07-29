const fs = require('fs');
const content = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');

const regex = /\{\s*"id":\s*"(.*?)",\s*"type":\s*"(.*?)",\s*"number":\s*"(.*?)",\s*"title":\s*"(.*?)",\s*"part":\s*"(.*?)",\s*"partTitle":\s*"(.*?)",\s*"content":\s*(\[[\s\S]*?\])\s*\}/g;

let chapters = [];
let match;
while ((match = regex.exec(content)) !== null) {
    let contentArr;
    try {
        contentArr = eval(`(${match[7]})`);
    } catch(e) {
        // Fallback for parsing the inner string array
        console.error(`Error parsing content array for ${match[1]}`);
        continue;
    }
    
    chapters.push({
        id: match[1],
        type: match[2],
        number: match[3],
        title: match[4],
        part: match[5],
        partTitle: match[6],
        content: contentArr
    });
}

// Write the cleanly extracted chapters back to disk
fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\clean_chapters.json', JSON.stringify(chapters, null, 2));
console.log("SUCCESS. Cleanly extracted " + chapters.length + " chapters via regex.");
