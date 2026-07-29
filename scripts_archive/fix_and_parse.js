const fs = require('fs');

function cleanAndParse(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const startIndex = content.indexOf('const novelChapters = [');
    let arrayEnd = content.indexOf('// Active view state');
    if (arrayEnd === -1) arrayEnd = content.indexOf('let currentView');
    
    let arrayStr = content.substring(startIndex + 'const novelChapters = '.length, arrayEnd);
    arrayStr = `[${arrayStr.trim().replace(/;$/, '').trim()}`;
    
    // The subagents injected flashbacks but messed up the brackets.
    // Let's globally fix common malformed JSON injected by string concatenation.
    
    // Error 1: ] } \n [ \n { "id": "chapter-26" 
    arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*,\s*\[\s*\{/g, '] }, {');
    arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*\[/g, '] }, {');
    
    // Error 2: ]  } \n [
    arrayStr = arrayStr.replace(/\]\s*\}\s*\[\s*\{/g, '] }, {');
    arrayStr = arrayStr.replace(/\]\s*\n*\s*\}\s*\n*\s*\[/g, '] },');
    
    // Just blindly replace any sequence of closing brackets and opening brackets between objects
    arrayStr = arrayStr.replace(/\}\s*\]\s*\}\s*\[/g, '} }, {');
    
    // Let's use a regex to find all instances where an object closes and another starts incorrectly.
    // A chapter object ends with `] }`. The next starts with `{ "id"`. 
    // If there is anything between them other than a comma, replace it with a comma.
    arrayStr = arrayStr.replace(/\]\s*\}\s*[^,]\s*\{/g, '] }, {');
    arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*\[\s*\{/g, '] }, {');

    // specifically target line 1577 error: `]  }` followed by EOF or something
    arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*$/g, '] } ]');
    arrayStr = arrayStr.replace(/\]\s*\}\s*$/g, '] } ]');
    
    try {
        let parsed = eval(arrayStr);
        // Ensure it's a flat array of chapter objects
        let flat = [];
        for (const item of parsed) {
            if (Array.isArray(item)) flat.push(...item);
            else flat.push(item);
        }
        return flat;
    } catch(e) {
        fs.writeFileSync(filePath + '.failed.js', arrayStr);
        throw new Error(`Failed to parse ${filePath}: ${e.message}`);
    }
}

try {
    const book1 = cleanAndParse('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html');
    const book2 = cleanAndParse('h:\\Antigravity\\Novel\\book2_outer_carry.html');
    const book3 = cleanAndParse('h:\\Antigravity\\Novel\\book3_third_quiet.html');
    
    console.log(`Parsed successfully. Book 1: ${book1.length}, Book 2: ${book2.length}, Book 3: ${book3.length}`);
} catch (e) {
    console.error(e.message);
}
