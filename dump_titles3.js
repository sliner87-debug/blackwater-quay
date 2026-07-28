const fs = require('fs');
const content = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');

const startStr = 'const novelChapters = [';
const startIndex = content.indexOf(startStr);

if (startIndex === -1) throw new Error("Could not find start");

// We know the end of the script tag is near the end of the array.
// Look for the end of the array just before `// Active view state` or `let currentView`
let endIndex = content.indexOf('// Active view state');
if (endIndex === -1) endIndex = content.indexOf('let currentView');

let arrayStr = content.substring(startIndex + 'const novelChapters = '.length, endIndex);
arrayStr = arrayStr.trim().replace(/;$/, '').trim();

try {
    const chapters = eval(arrayStr);
    let output = "";
    chapters.forEach((c, i) => {
        output += `Index ${i}: ID=${c.id}, Title="${c.title}"\n`;
    });
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\chapter_list.txt', output);
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\raw_chapters.json', JSON.stringify(chapters, null, 2));
    console.log("Successfully extracted full array, length:", chapters.length);
} catch(e) {
    console.error("Eval Error:", e);
    // Print the end of the string to see what went wrong
    console.log("End of string:", arrayStr.substring(arrayStr.length - 50));
}
