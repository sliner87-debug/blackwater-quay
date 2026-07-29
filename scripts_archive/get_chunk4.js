const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\chapter_summaries_detailed.md', 'utf-8');

const chunk4Start = content.indexOf('# Chunk 4');
if (chunk4Start !== -1) {
    console.log(content.substring(chunk4Start));
} else {
    // If Subagent 4 didn't include a header, maybe we just search for the last 20 chapters
    console.log("Chunk 4 header not found.");
}
