const fs = require('fs');

const files = [
    'C:\\Users\\sline\\.gemini\\antigravity\\brain\\b8e74429-6e3f-4640-8fe6-3398cb50b820\\scratch\\audit_report_01.md',
    'C:\\Users\\sline\\.gemini\\antigravity\\brain\\aaf5ed5f-ff05-4d3f-88e2-14c5a6c40751\\scratch\\audit_part2.md',
    'C:\\Users\\sline\\.gemini\\antigravity\\brain\\b1b5859c-3b27-4de2-9d5e-2a843768f016\\scratch\\audit_part3.md',
    'C:\\Users\\sline\\.gemini\\antigravity\\brain\\9be34b26-3a3e-40b5-9792-8692f3f07e7a\\scratch\\audit_part4.md'
];

let out = '# Prose Upgrade Manifest\n\n';
for (const f of files) {
    if (fs.existsSync(f)) {
        out += fs.readFileSync(f, 'utf8') + '\n\n---\n\n';
    } else {
        console.log("Missing:", f);
    }
}

fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\Prose_Upgrade_Manifest.md', out, 'utf8');
console.log("Done");
