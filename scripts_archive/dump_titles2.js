const fs = require('fs');
const content = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');
const match = content.match(/const novelChapters = (\[[\s\S]*?\]);\s*\/\//);
if (match) {
    const jsonStr = match[1];
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\raw_chapters.json', jsonStr);
    const chapters = eval(jsonStr);
    let output = "";
    chapters.forEach((c, i) => {
        output += `Index ${i}: ID=${c.id}, Title="${c.title}"\n`;
    });
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\chapter_list.txt', output);
    console.log("Successfully extracted full array, length:", chapters.length);
} else {
    console.log("Regex failed");
}
