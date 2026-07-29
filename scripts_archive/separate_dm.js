const fs = require('fs');

const content = fs.readFileSync('h:/Antigravity/Novel/dm_screen.html', 'utf8');

// The header is everything up to <div class="dm-container"> <h1> The Dungeon Master's Codex
const headerRegex = /^(.*?)<div class="dm-container">\s*<h1[^>]*>The Dungeon Master's Codex<\/h1>\s*/is;
const headerMatch = content.match(headerRegex);
let header = headerMatch ? headerMatch[0] : '';
const footer = "\n    </div>\n</body>\n</html>\n";

// Find all sections by matching <div id='...' class='content-section'...
// The regex needs to handle the fact that sections might end with </div><hr or just </div>
// Better approach: Since we know the IDs, let's just use string split/indexOf or a simpler regex
const ids = ['magic-items', 'bestiary', 'player-options', 'faction-renown', 'vtt-prompts', 'lore-deep-dives'];
const sections = {};

for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const startStr = `<div id='${id}' class='content-section'`;
    let startIndex = content.indexOf(startStr);
    if (startIndex === -1) {
        console.log("NOT FOUND: " + id);
        continue;
    }
    
    let endIndex = -1;
    if (i < ids.length - 1) {
        const nextId = ids[i+1];
        const nextStartStr = `<div id='${nextId}'`;
        endIndex = content.indexOf(nextStartStr, startIndex);
        // Step back past the <hr> if there is one between sections
        const hrStr = "<hr style='border-color: #333; margin: 40px 0;'>";
        const hrIndex = content.lastIndexOf(hrStr, endIndex);
        if (hrIndex > startIndex) {
            endIndex = hrIndex;
        }
    } else {
        // Last section
        const endContainerStr = "</div>\n\n</body>";
        endIndex = content.indexOf(endContainerStr, startIndex);
        if (endIndex === -1) endIndex = content.length;
        
        // Remove the <hr> at the end of the last section if it exists
        const hrStr = "<hr style='border-color: #333; margin: 40px 0;'>";
        const hrIndex = content.lastIndexOf(hrStr, endIndex);
        if (hrIndex > startIndex) {
            endIndex = hrIndex;
        }
    }
    
    sections[id] = content.substring(startIndex, endIndex).trim();
}

// Write the files
for (const [id, html] of Object.entries(sections)) {
    let filename = 'dm_' + id.replace(/-/g, '_') + '.html';
    
    let sectionHtml = html;
    if (id === 'vtt-prompts') {
        sectionHtml = sectionHtml.replace('display: none;', '');
    }

    let pageHtml = header + sectionHtml + footer;
    
    // Update the title
    let title = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${title} - Blackwater Quay</title>`);
    
    // Update the h1 heading for the container if desired, but we can leave it as "The Dungeon Master's Codex" 
    // and let the inner section h1 represent the actual page title.
    
    fs.writeFileSync('h:/Antigravity/Novel/' + filename, pageHtml);
    console.log("Created " + filename);
}
