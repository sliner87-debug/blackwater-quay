const fs = require('fs');

function extractArray(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const startIndex = htmlContent.indexOf('const novelChapters = ');
    if (startIndex === -1) {
        throw new Error("novelChapters not found");
    }
    const arrayStart = htmlContent.indexOf('[', startIndex);
    
    // Find the closing bracket of the array by matching brackets or looking for the semicolon
    let bracketCount = 0;
    let inString = false;
    let escape = false;
    let arrayEnd = -1;
    
    for (let i = arrayStart; i < htmlContent.length; i++) {
        const char = htmlContent[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (char === '\\') {
            escape = true;
            continue;
        }
        if (char === '"' || char === "'") {
            if (!inString) {
                inString = char;
            } else if (inString === char) {
                inString = false;
            }
        }
        
        if (!inString) {
            if (char === '[') bracketCount++;
            if (char === ']') bracketCount--;
            
            if (bracketCount === 0) {
                arrayEnd = i + 1;
                break;
            }
        }
    }
    
    if (arrayEnd === -1) {
        throw new Error("Could not find end of array");
    }
    
    const arrayStr = htmlContent.substring(arrayStart, arrayEnd);
    return JSON.parse(arrayStr.replace(/'/g, '"')); // Attempt to parse, though eval might be better if it has loose JSON
}

try {
    const htmlContent = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');
    const startIndex = htmlContent.indexOf('const novelChapters = ');
    const arrayStart = htmlContent.indexOf('[', startIndex);
    
    let bracketCount = 0;
    let inString = false;
    let escape = false;
    let arrayEnd = -1;
    
    for (let i = arrayStart; i < htmlContent.length; i++) {
        const char = htmlContent[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (char === '\\') {
            escape = true;
            continue;
        }
        if (char === '"') {
            inString = !inString;
        }
        
        if (!inString) {
            if (char === '[') bracketCount++;
            if (char === ']') bracketCount--;
            
            if (bracketCount === 0) {
                arrayEnd = i + 1;
                break;
            }
        }
    }
    
    const arrayStr = htmlContent.substring(arrayStart, arrayEnd);
    // Write out the raw JSON string to a file
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\raw_chapters.json', arrayStr);
    console.log("Successfully extracted arrayStr to raw_chapters.json");
    
} catch(e) {
    console.error("Error:", e);
}
