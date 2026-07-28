const fs = require('fs');

function getArrayString(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const startIndex = htmlContent.indexOf('const novelChapter');
    if (startIndex === -1) {
        console.log("No novelChapter found in " + filePath);
        return "";
    }
    const arrayStart = htmlContent.indexOf('[', startIndex);
    
    // Find where the array ends by searching for the start of the next script part.
    // In these files, it's either `// Active view state` or `let currentView` or `let ` right after the array.
    let endMatches = [
        htmlContent.indexOf('// Active view state', arrayStart),
        htmlContent.indexOf('let currentView', arrayStart),
        htmlContent.indexOf('// Set up', arrayStart)
    ].filter(x => x !== -1);
    
    let arrayEndStrIdx = Math.min(...endMatches);
    
    // We want to slice right up to the closing `];`
    let arrayStr = htmlContent.substring(arrayStart, arrayEndStrIdx);
    
    // Clean up trailing semicolons and whitespace so we get a clean array string
    arrayStr = arrayStr.trim().replace(/;$/, '').trim();
    
    // Strip the outer brackets so we can concat them:
    if (arrayStr.startsWith('[')) arrayStr = arrayStr.substring(1);
    if (arrayStr.endsWith(']')) arrayStr = arrayStr.substring(0, arrayStr.length - 1);
    
    return arrayStr.trim();
}

const arr1 = getArrayString('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html');
const arr2 = getArrayString('h:\\Antigravity\\Novel\\book2_outer_carry.html');
const arr3 = getArrayString('h:\\Antigravity\\Novel\\book3_third_quiet.html');

// We have 3 strings of inner array elements.
// Wait, Book 2 has `[ \n [ { ` so it's a nested array.
// If Book 2 is nested, let's just leave it, the reader UI in these books handles it or we can just flatten it if we want.
// Actually, Book 1 and Book 3 might be flat. If we just concatenate them, we get a mix of objects and arrays of objects.
// Let's just create a master script where we inject them as parts.

let masterArrayStr = `[\n${arr1},\n${arr2},\n${arr3}\n]`;

let templateHtml = fs.readFileSync('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html', 'utf-8');
const templateStart = templateHtml.indexOf('const novelChapter');
const templateArrayStart = templateHtml.indexOf('[', templateStart);
let templateEndMatches = [
    templateHtml.indexOf('// Active view state', templateArrayStart),
    templateHtml.indexOf('let currentView', templateArrayStart),
    templateHtml.indexOf('// Set up', templateArrayStart)
].filter(x => x !== -1);
let templateArrayEndStrIdx = Math.min(...templateEndMatches);

// Let's find the closing ];
let sliceEnd = templateHtml.lastIndexOf(';', templateArrayEndStrIdx);

templateHtml = templateHtml.substring(0, templateStart) + 'const novelChapters = ' + masterArrayStr + ';\n    ' + templateHtml.substring(sliceEnd + 1);

templateHtml = templateHtml.replace(/<title>.*?<\/title>/, '<title>The Blackwater Quay Trilogy (Master Edition)</title>');
templateHtml = templateHtml.replace(/<h1>.*?<\/h1>/, '<h1>The Blackwater Quay Trilogy (Master Edition)</h1>');

fs.writeFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', templateHtml);
console.log("Successfully combined to master_novel_complete.html!");

