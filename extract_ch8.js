const fs = require('fs');
const htmlContent = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');
const regex = /\{\s*"id":\s*"(.*?)",\s*"type":\s*"(.*?)",\s*"number":\s*"(.*?)",\s*"title":\s*"(.*?)",\s*"part":\s*"(.*?)",\s*"partTitle":\s*"(.*?)",\s*"content":\s*(\[[\s\S]*?\])\s*\}/g;

let match;
while ((match = regex.exec(htmlContent)) !== null) {
    const title = match[4];
    if (title.includes("The Saboteur's Thoughts")) {
        let contentArr;
        try {
            contentArr = eval(`(${match[7]})`);
        } catch(e) { continue; }
        
        let text = contentArr.join('\n\n');
        fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\ch8_current.md', text);
        console.log(`Extracted Chapter 8 by Title`);
        break;
    }
}
