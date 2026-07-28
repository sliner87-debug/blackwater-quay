const fs = require('fs');
const content = fs.readFileSync('h:\\Antigravity\\Novel\\book3_third_quiet.html', 'utf8');

const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('const ') && (line.includes('Data') || line.includes('Chapter') || line.includes('novel'))) {
        console.log(`${i+1}: ${line.trim()}`);
    }
});
