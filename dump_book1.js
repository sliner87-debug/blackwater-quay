const fs = require('fs');

const content = fs.readFileSync('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html', 'utf-8');
const startIndex = content.indexOf('const novelChapters = [');
let arrayEnd = content.indexOf('// Active view state');
if (arrayEnd === -1) arrayEnd = content.indexOf('let currentView');

let arrayStr = content.substring(startIndex + 'const novelChapters = '.length, arrayEnd);
arrayStr = `[${arrayStr.trim().replace(/;$/, '').trim()}`;

fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\book1_failed.js', arrayStr);
console.log("Wrote book1_failed.js");
