const fs = require('fs');

function extractArray(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const startIndex = htmlContent.indexOf('const novelChapters');
    if (startIndex === -1) return [];
    
    const arrayStart = htmlContent.indexOf('[', startIndex);
    if (arrayStart === -1) return [];
    
    let bracketCount = 0;
    let arrayEnd = -1;
    
    for (let i = arrayStart; i < htmlContent.length; i++) {
        if (htmlContent[i] === '[') bracketCount++;
        if (htmlContent[i] === ']') bracketCount--;
        
        if (bracketCount === 0) {
            arrayEnd = i + 1;
            break;
        }
    }
    
    if (arrayEnd !== -1) {
        const jsonStr = htmlContent.substring(arrayStart, arrayEnd);
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            console.error("Error parsing JSON in", filePath, ":", e.message);
        }
    }
    return [];
}

const book1 = extractArray('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html');
const book2 = extractArray('h:\\Antigravity\\Novel\\book2_outer_carry.html');
const book3 = extractArray('h:\\Antigravity\\Novel\\book3_third_quiet.html');

// Book 2 is an array of arrays, let's flatten it just in case, or keep it consistent.
// The UI expects an array of chapter objects.
// If it's an array of arrays, flatten it:
const flat1 = book1.flat();
const flat2 = book2.flat();
const flat3 = book3.flat();

// Combine all chapters sequentially
const masterArray = [...flat1, ...flat2, ...flat3];

// Re-number chapters to ensure they are sequential if needed, but maybe leave titles as is.
let chapNum = 1;
masterArray.forEach(c => {
    if (c.type === 'chapter') {
        c.number = chapNum++;
        c.id = `chapter-${c.number}`;
    }
});

// Read Book 1 to use as a template
let templateHtml = fs.readFileSync('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html', 'utf-8');

// Replace the array in the template
const startIndex = templateHtml.indexOf('const novelChapters');
const arrayStart = templateHtml.indexOf('[', startIndex);

let bracketCount = 0;
let arrayEnd = -1;

for (let i = arrayStart; i < templateHtml.length; i++) {
    if (templateHtml[i] === '[') bracketCount++;
    if (templateHtml[i] === ']') bracketCount--;
    
    if (bracketCount === 0) {
        arrayEnd = i + 1;
        break;
    }
}

if (arrayEnd !== -1) {
    const newArrayStr = JSON.stringify(masterArray, null, 8).replace(/\]$/, '\t]');
    templateHtml = templateHtml.substring(0, arrayStart) + newArrayStr + templateHtml.substring(arrayEnd);
    
    // Update the title
    templateHtml = templateHtml.replace(/<title>.*?<\/title>/, '<title>The Blackwater Quay Trilogy (Master Edition)</title>');
    templateHtml = templateHtml.replace(/<h1>.*?<\/h1>/, '<h1>The Blackwater Quay Trilogy (Master Edition)</h1>');
    
    fs.writeFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', templateHtml);
    console.log(`Successfully merged ${masterArray.length} chapters into master_novel_complete.html!`);
} else {
    console.error("Could not replace array in template.");
}
