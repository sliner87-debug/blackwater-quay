const fs = require('fs');

function extractArray(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const startIndex = htmlContent.indexOf('const novelChapter');
    if (startIndex === -1) return [];
    const arrayStart = htmlContent.indexOf('[', startIndex);
    let endMatches = [
        htmlContent.indexOf('// Active view state', arrayStart),
        htmlContent.indexOf('let currentView', arrayStart),
        htmlContent.indexOf('// Set up', arrayStart)
    ].filter(x => x !== -1);
    let arrayEndStrIdx = Math.min(...endMatches);
    let arrayStr = htmlContent.substring(arrayStart, arrayEndStrIdx).trim().replace(/;$/, '').trim();
    return eval(arrayStr);
}

try {
    const chapters = extractArray('h:\\Antigravity\\Novel\\master_novel_complete.html');
    let outputText = "";
    chapters.forEach(c => {
        if (c.title) outputText += `\n\n### ${c.title}\n`;
        if (c.content) {
            c.content.forEach(p => {
                outputText += p + "\n\n";
            });
        }
    });
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\master_novel_text.md', outputText);
    console.log("Successfully extracted text to master_novel_text.md");
} catch(e) {
    console.error("Error:", e);
}
