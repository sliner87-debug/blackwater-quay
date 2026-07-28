const fs = require('fs');
const inputFile = 'h:/Antigravity/Novel/blackwater_quay_codex.html';
const html = fs.readFileSync(inputFile, 'utf-8');
const startIndex = html.indexOf('novelChapters = [');
if (startIndex !== -1) {
    const arrayStartIndex = html.indexOf('[', startIndex);
    let openBrackets = 0;
    let arrayEndIndex = -1;
    for (let i = arrayStartIndex; i < html.length; i++) {
        if (html[i] === '[') openBrackets++;
        if (html[i] === ']') openBrackets--;
        if (openBrackets === 0) {
            arrayEndIndex = i;
            break;
        }
    }
    const arrayStr = html.substring(arrayStartIndex, arrayEndIndex + 1);
    const chaptersArray = new Function(`return ${arrayStr};`)();
    console.log(JSON.stringify(chaptersArray.slice(0, 3), null, 2));
    
    const chapter26 = chaptersArray.find(c => JSON.stringify(c).includes('26'));
    if (chapter26) console.log("Sample chapter 26:", JSON.stringify(chapter26, null, 2));
} else {
    console.log("Not found");
}
