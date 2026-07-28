const fs = require('fs');

try {
    const htmlContent = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');
    const regex = /\{\s*"id":\s*"(.*?)",\s*"type":\s*"(.*?)",\s*"number":\s*"(.*?)",\s*"title":\s*"(.*?)",\s*"part":\s*"(.*?)",\s*"partTitle":\s*"(.*?)",\s*"content":\s*(\[[\s\S]*?\])\s*\}/g;
    
    let markdown = `# Blackwater Quay: Chapter Summaries\n\n`;
    let chapterCount = 0;
    let match;
    let currentPart = "";
    
    while ((match = regex.exec(htmlContent)) !== null) {
        const id = match[1];
        const type = match[2];
        const number = match[3];
        const title = match[4];
        const part = match[5];
        const partTitle = match[6];
        const contentStr = match[7];
        
        chapterCount++;
        
        if (part && part !== currentPart) {
            currentPart = part;
            markdown += `\n## ${part}: ${partTitle || ''}\n\n`;
        }
        
        let contentArr;
        try {
            contentArr = eval(`(${contentStr})`);
        } catch(e) {
            continue;
        }
        
        // Extract a "summary" by grabbing the first 3 meaningful sentences.
        let summaryText = "";
        let sentences = [];
        for (let i = 0; i < contentArr.length; i++) {
            if (typeof contentArr[i] === 'string') {
                // Split paragraph into sentences roughly
                let splits = contentArr[i].match(/[^.!?]+[.!?]+/g) || [contentArr[i]];
                for (let s of splits) {
                    if (s.trim().length > 10) {
                        sentences.push(s.trim());
                    }
                    if (sentences.length >= 3) break;
                }
            }
            if (sentences.length >= 3) break;
        }
        
        summaryText = sentences.join(" ");
        
        // Format the output
        if (type === 'prelude' || type === 'prologue' || type === 'epilogue') {
            markdown += `### ${title}\n*${summaryText}*\n\n`;
        } else {
            markdown += `### Chapter ${number}: ${title}\n*${summaryText}*\n\n`;
        }
    }

    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\chapter_summaries.md', markdown);
    console.log(`Generated summaries for ${chapterCount} chapters.`);
} catch(e) {
    console.error("Error:", e);
}
