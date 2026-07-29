const fs = require('fs');

function getChapters(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const startIndex = htmlContent.indexOf('const novelChapters = ');
    if (startIndex === -1) throw new Error("novelChapters not found in " + filePath);
    
    let arrayStart = htmlContent.indexOf('[', startIndex);
    let arrayEnd = htmlContent.lastIndexOf('];');
    if (arrayEnd === -1) arrayEnd = htmlContent.lastIndexOf(']') + 1;
    else arrayEnd += 1;
    
    // Fallback search for the end of the array
    if (arrayEnd < arrayStart) {
        arrayEnd = htmlContent.indexOf('// Active view state');
    }
    
    let arrayStr = htmlContent.substring(arrayStart, arrayEnd).trim();
    if (arrayStr.endsWith(';')) arrayStr = arrayStr.slice(0, -1);
    
    // Clean up any double brackets that the subagents might have injected
    arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*,\s*\[\s*\{/g, '] }, {');
    arrayStr = arrayStr.replace(/\]\s*\}\s*\]\s*\}\s*\[/g, '] }, {');
    arrayStr = arrayStr.replace(/\]\s*\n\s*\}\s*\n\s*\]\s*\n\s*\}\s*,\s*\n\s*\[/g, '] },');
    
    // There might be syntax errors like `]  }, \n [ \n { "id": "chapter-26"` 
    arrayStr = arrayStr.replace(/\}\s*\]\s*\}\s*,\s*\[\s*\{/g, '} ] }, {'); // Fix nested arrays if they exist incorrectly
    
    try {
        return eval(arrayStr);
    } catch(e) {
        console.error("Syntax error evaluating " + filePath + ": " + e.message);
        return [];
    }
}

try {
    const book1 = getChapters('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html');
    const book2 = getChapters('h:\\Antigravity\\Novel\\book2_outer_carry.html');
    const book3 = getChapters('h:\\Antigravity\\Novel\\book3_third_quiet.html');
    
    console.log(`Book 1 chapters: ${book1.length}`);
    console.log(`Book 2 chapters: ${book2.length}`);
    console.log(`Book 3 chapters: ${book3.length}`);
    
    const allChapters = [...book1, ...book2, ...book3];
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\all_chapters.json', JSON.stringify(allChapters, null, 2));
    console.log("Successfully extracted all 3 books to all_chapters.json, total length:", allChapters.length);
} catch(e) {
    console.error("Error:", e);
}
