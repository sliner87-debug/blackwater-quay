const fs = require('fs');

const htmlContent = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');

const regex = /\{\s*"id":\s*"(.*?)",\s*"type":\s*"(.*?)",\s*"number":\s*"(.*?)",\s*"title":\s*"(.*?)",\s*"part":\s*"(.*?)",\s*"partTitle":\s*"(.*?)",\s*"content":\s*(\[[\s\S]*?\])\s*\}/g;

let chapters = [];
let match;
while ((match = regex.exec(htmlContent)) !== null) {
    let contentArr;
    try {
        contentArr = eval(`(${match[7]})`);
    } catch(e) {
        continue;
    }
    
    chapters.push({
        number: match[3],
        title: match[4],
        content: contentArr
    });
}

// Split into 4 chunks
const chunkSize = Math.ceil(chapters.length / 4);
for (let i = 0; i < 4; i++) {
    const chunk = chapters.slice(i * chunkSize, (i + 1) * chunkSize);
    fs.writeFileSync(`C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\chunk_${i+1}.json`, JSON.stringify(chunk, null, 2));
}

console.log(`Split ${chapters.length} chapters into 4 chunks.`);
