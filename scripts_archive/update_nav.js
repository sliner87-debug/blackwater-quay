const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === '.git' || file === 'scripts_archive' || file === 'node_modules') continue;
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.html')) {
            updateNav(fullPath);
        }
    }
}

function updateNav(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Determine the prefix based on whether the file is in the root or a subdirectory
    const isInSubdir = filePath.includes('Campaign_Module');
    const prefix = isInSubdir ? '../' : '';

    const newNavBlock = `
        <a href="${prefix}dm_screen.html">The Complete Codex</a>
        <a href="${prefix}dm_magic_items.html">Magic Items</a>
        <a href="${prefix}dm_bestiary.html">Bestiary & NPCs</a>
        <a href="${prefix}dm_player_options.html">Player Mechanics</a>
        <a href="${prefix}dm_faction_renown.html">Faction Renown</a>
        <a href="${prefix}dm_lore_deep_dives.html">Lore Deep Dives</a>
    `;

    // A robust regex to find the contents of the Dungeon Master Codex dropdown-content div
    const regex = /(<a href="[^"]*?" class="dropbtn" style="color: #d4af37; font-weight: bold;">Dungeon Master Codex &#9662;<\/a>\s*<div class="dropdown-content">)[\s\S]*?(<\/div>)/;
    
    if (regex.test(content)) {
        content = content.replace(regex, `$1${newNavBlock}$2`);
        fs.writeFileSync(filePath, content);
        console.log("Updated navigation in " + filePath);
    }
}

processDir('h:/Antigravity/Novel');
