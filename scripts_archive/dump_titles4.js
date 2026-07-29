const fs = require('fs');
const content = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');

const startStr = 'const novelChapters = [';
const startIndex = content.indexOf(startStr);
let endIndex = content.indexOf('// Active view state');
if (endIndex === -1) endIndex = content.indexOf('let currentView');

let arrayStr = content.substring(startIndex + 'const novelChapters = '.length, endIndex);
arrayStr = arrayStr.trim().replace(/;$/, '').trim();

try {
    const chapters = eval(`[${arrayStr}`);
} catch(e) {
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\failed_json.js', `[${arrayStr}`);
    console.log("Wrote to failed_json.js. Syntax check running...");
}
