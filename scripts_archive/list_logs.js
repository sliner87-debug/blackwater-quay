const fs = require('fs');

const logsDir = 'D:\\One Drive\\OneDrive\\Desktop\\Sorted_Game_Logs';
const files = fs.readdirSync(logsDir).sort();

let found = false;
for (const file of files) {
    if (file === '16570426_003053_Blackwater Quay Session 5.5.md') {
        found = true;
        continue;
    }
    if (found) {
        console.log(file);
    }
}
