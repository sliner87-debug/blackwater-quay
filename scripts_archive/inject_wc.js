const fs = require('fs');

// 1. Get word counts from the novel file
const htmlContent = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');
const regex = /\{\s*"id":\s*"(.*?)",\s*"type":\s*"(.*?)",\s*"number":\s*"(.*?)",\s*"title":\s*"(.*?)",\s*"part":\s*"(.*?)",\s*"partTitle":\s*"(.*?)",\s*"content":\s*(\[[\s\S]*?\])\s*\}/g;

let wordCounts = {}; // map of title -> word count
let match;
while ((match = regex.exec(htmlContent)) !== null) {
    const title = match[4].trim();
    let wordCount = title.split(/\s+/).length;
    let contentArr;
    try {
        contentArr = eval(`(${match[7]})`);
        if (Array.isArray(contentArr)) {
            contentArr.forEach(paragraph => {
                if (typeof paragraph === 'string') {
                    const words = paragraph.trim().split(/\s+/).filter(w => w.length > 0);
                    wordCount += words.length;
                }
            });
        }
    } catch(e) {}
    wordCounts[title] = wordCount;
}

// 2. Read the summaries file and inject word counts
let summaries = fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\chapter_summaries_detailed.md', 'utf-8');

// The titles in summaries look like: `## Chapter 1: Title` or `## The Shape of a Lie`
// Let's iterate line by line
const lines = summaries.split('\n');
let newLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    newLines.push(line);
    
    // Check if it's a chapter heading
    if (line.startsWith('## ') && !line.includes('PART ')) {
        // It's a chapter. Let's find the matching title.
        // It might be `## Chapter 1: Title`
        let titleMatch = line.match(/^##\s+(?:Chapter\s+\d+:\s+)?(.*)$/);
        if (titleMatch) {
            let extractedTitle = titleMatch[1].trim();
            // Look up the word count
            let count = wordCounts[extractedTitle];
            if (count !== undefined) {
                newLines.push(`**Word Count:** ${count.toLocaleString()}`);
                newLines.push(''); // add a blank line
            } else {
                // Try fuzzy matching or finding substring
                const matchingKey = Object.keys(wordCounts).find(k => k.includes(extractedTitle) || extractedTitle.includes(k));
                if (matchingKey) {
                    newLines.push(`**Word Count:** ${wordCounts[matchingKey].toLocaleString()}`);
                    newLines.push('');
                }
            }
        }
    }
}

fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\chapter_summaries_detailed.md', newLines.join('\n'));
console.log("Injected word counts successfully.");

