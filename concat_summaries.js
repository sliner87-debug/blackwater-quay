const fs = require('fs');

const file1 = 'C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\summary_chunk_1.md';
const file2 = 'C:\\Users\\sline\\.gemini\\antigravity\\brain\\5cb281a7-0095-431d-a25a-5cc940fae670\\scratch\\summary_chunk_2.md';
const file3 = 'C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\summary_chunk_3.md';
const file4 = 'C:\\Users\\sline\\.gemini\\antigravity\\brain\\01d4dfd5-f6db-48fd-a636-0f2090720dbd\\scratch\\summary_chunk_4.md';

let output = `# Blackwater Quay: Comprehensive Chapter Summaries\n\n`;

try {
    if (fs.existsSync(file1)) output += fs.readFileSync(file1, 'utf-8') + '\n\n';
    if (fs.existsSync(file2)) output += fs.readFileSync(file2, 'utf-8') + '\n\n';
    if (fs.existsSync(file3)) output += fs.readFileSync(file3, 'utf-8') + '\n\n';
    if (fs.existsSync(file4)) output += fs.readFileSync(file4, 'utf-8') + '\n\n';
    
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\chapter_summaries_detailed.md', output);
    console.log("Master summary artifact generated successfully.");
} catch(e) {
    console.error("Error concatenating:", e);
}
