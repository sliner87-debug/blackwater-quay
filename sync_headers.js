const fs = require('fs');
const path = require('path');

const dir = 'h:/Antigravity/Novel/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('master_novel'));

const correctHeader = `    <header class="site-header" style="position: relative; z-index: 10000; font-family: 'Inter', sans-serif;">
        <nav class="nav-container">
            <a href="index.html" class="logo-link">
                <span class="logo-text">SABLEHOOK COVENANT</span>
            </a>
            <ul class="nav-menu">
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">TTRPG Tools &#9662;</a>
                    <div class="dropdown-content">
                        <a href="index.html#characters">Characters</a>
                        <a href="index.html#factions">Faction Standing</a>
                        <a href="blackwater_quay_codex.html">Blackwater Quay Codex</a>
                        <a href="shipyard.html" style="color: #38bdf8; font-weight: bold;">Sovereign Shipbuilder</a>
                        <a href="fleet_generator.html" style="color: #a855f7; font-weight: bold;">Fleet Generator</a>
                        <a href="ambient_mixer.html" style="color: #10b981; font-weight: bold;">Ambient Mixer</a>
                        <a href="https://sliner87-debug.github.io/Vanguard-Corsair-Generator/" style="color: #22d3ee; font-weight: bold;">Crew Generator</a>
                        <a href="loot_generator.html" style="color: #f59e0b; font-weight: bold;">Loot Generator</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn" style="color: #d4af37; font-weight: bold;">Dungeon Master Codex &#9662;</a>
                    <div class="dropdown-content">
                        <a href="dm_screen.html">The Complete Codex</a>
                        <a href="dm_magic_items.html">Magic Items</a>
                        <a href="dm_bestiary.html">Bestiary & NPCs</a>
                        <a href="dm_player_options.html">Player Mechanics</a>
                        <a href="dm_faction_renown.html">Faction Renown</a>
                        <a href="dm_lore_deep_dives.html">Lore Deep Dives</a>
                    </div>
                </li>
            </ul>
        </nav>
    </header>`;

for (let file of files) {
    const fullPath = path.join(dir, file);
    let html = fs.readFileSync(fullPath, 'utf8');
    
    const regex = /<header class="site-header"[^>]*>[\s\S]*?<\/header>/;
    
    if (regex.test(html)) {
        html = html.replace(regex, correctHeader);
        fs.writeFileSync(fullPath, html, 'utf8');
        console.log("Updated header in " + file);
    } else {
        console.log("No site-header found in " + file);
    }
}
