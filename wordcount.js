const fs = require('fs');

try {
    const htmlContent = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');
    
    // We can use regex to extract the JSON array as we did before
    const regex = /\{\s*"id":\s*"(.*?)",\s*"type":\s*"(.*?)",\s*"number":\s*"(.*?)",\s*"title":\s*"(.*?)",\s*"part":\s*"(.*?)",\s*"partTitle":\s*"(.*?)",\s*"content":\s*(\[[\s\S]*?\])\s*\}/g;
    
    let wordCount = 0;
    let chapterCount = 0;
    let match;
    
    while ((match = regex.exec(htmlContent)) !== null) {
        chapterCount++;
        // Add the words in the title
        if (match[4]) {
            wordCount += match[4].trim().split(/\s+/).length;
        }
        
        let contentArr;
        try {
            contentArr = eval(`(${match[7]})`);
            if (Array.isArray(contentArr)) {
                contentArr.forEach(paragraph => {
                    if (typeof paragraph === 'string') {
                        // Count words in paragraph
                        const words = paragraph.trim().split(/\s+/).filter(w => w.length > 0);
                        wordCount += words.length;
                    }
                });
            }
        } catch(e) {
            console.error(`Error parsing content array for ${match[1]}`);
        }
    }

    console.log(`Total Chapters: ${chapterCount}`);
    console.log(`Total Word Count: ${wordCount}`);
} catch(e) {
    console.error("Error:", e);
}
