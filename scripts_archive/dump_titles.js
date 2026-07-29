const fs = require('fs');
const chapters = JSON.parse(fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\raw_chapters.json', 'utf-8'));
let output = "";
chapters.forEach((c, i) => {
    output += `Index ${i}: ID=${c.id}, Title="${c.title}"\n`;
});
fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\chapter_list.txt', output);
