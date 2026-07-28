const fs = require('fs');

function countWordsInHtml(filePath) {
    if (!fs.existsSync(filePath)) return 0;
    const content = fs.readFileSync(filePath, 'utf-8');
    // very naive word count of the content array, assuming it's roughly the text
    const textMatches = content.match(/"([^"\\]*(\\.[^"\\]*)*)"/g);
    let count = 0;
    if (textMatches) {
        textMatches.forEach(m => {
            // strip quotes
            const str = m.substring(1, m.length - 1);
            if (str.length > 20) { // likely a paragraph
                count += str.trim().split(/\s+/).length;
            }
        });
    }
    return count;
}

const b1 = countWordsInHtml('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html');
const b2 = countWordsInHtml('h:\\Antigravity\\Novel\\book2_outer_carry.html');
const b3 = countWordsInHtml('h:\\Antigravity\\Novel\\book3_third_quiet.html');

console.log(`Book 1 estimated words: ${b1}`);
console.log(`Book 2 estimated words: ${b2}`);
console.log(`Book 3 estimated words: ${b3}`);
console.log(`Total original estimated: ${b1 + b2 + b3}`);
