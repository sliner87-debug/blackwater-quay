const fs = require('fs');

const content = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');
const startStr = 'const novelChapters = ';
const startIndex = content.indexOf(startStr);
const arrayStart = content.indexOf('[', startIndex);

let bracketCount = 0;
let inString = false;
let escape = false;
let arrayEnd = -1;

for (let i = arrayStart; i < content.length; i++) {
    const char = content[i];
    if (escape) {
        escape = false;
        continue;
    }
    if (char === '\\') {
        escape = true;
        continue;
    }
    if (char === '"' || char === "'") {
        if (!inString) inString = char;
        else if (inString === char) inString = false;
    }
    
    if (!inString) {
        if (char === '[') bracketCount++;
        else if (char === ']') bracketCount--;
        
        if (bracketCount === 0) {
            arrayEnd = i + 1;
            break;
        }
    }
}

// If bracket parsing failed because the injected flashbacks broke brackets, fallback to simple index
if (arrayEnd === -1 || arrayEnd < arrayStart) {
    let fallbackEnd = content.indexOf('// Active view state');
    if (fallbackEnd === -1) fallbackEnd = content.indexOf('let currentView');
    arrayEnd = fallbackEnd;
}

let arrayStr = content.substring(arrayStart, arrayEnd).trim();
if (arrayStr.endsWith(';')) arrayStr = arrayStr.slice(0, -1);

// aggressively fix the injected errors
arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*,\s*\[\s*\{/g, '] }, {');
arrayStr = arrayStr.replace(/\]\s*\}\s*\[\s*\{/g, '] }, {');
arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*\[/g, '] }, {');
arrayStr = arrayStr.replace(/\}\s*\]\s*\}\s*\[\s*\{/g, '} }, {');
arrayStr = arrayStr.replace(/\]\s*\n*\s*\}\s*\n*\s*\[/g, '] },');
arrayStr = arrayStr.replace(/\]\s*\}\s*$/g, '] } ]');
arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*$/g, '] } ]');

// More aggressive: remove trailing junk
arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*\]\s*$/, '] } ]');

fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\raw_chapters_fixed.js', arrayStr);

try {
    const chapters = eval(`(${arrayStr})`);
    
    // Flatten any nested arrays
    let flat = [];
    chapters.forEach(c => {
        if (Array.isArray(c)) flat.push(...c);
        else flat.push(c);
    });
    
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\all_chapters.json', JSON.stringify(flat, null, 2));
    console.log("SUCCESS. Extracted " + flat.length + " chapters.");
} catch(e) {
    console.log("EVAL FAILED: " + e.message);
}
