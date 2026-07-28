const fs = require('fs');
const chapters = JSON.parse(fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\raw_chapters.json', 'utf-8'));

chapters.forEach((c, index) => {
    if ([7, 8, 9, 24, 25, 26, 32, 33, 34, 49, 50, 51, 52, 53, 54, 55].includes(index + 1) || c.title.includes("Chapter 7") || c.title.includes("Chapter 9") || c.title.includes("51") || c.title.includes("Auction")) {
        console.log(`Index ${index}: ID=${c.id}, Title="${c.title}"`);
    }
});
