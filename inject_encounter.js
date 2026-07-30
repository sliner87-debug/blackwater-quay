const fs = require('fs');
let html = fs.readFileSync('h:/Antigravity/Novel/dm_bestiary.html', 'utf8');

const uiHTML = `
<div style="background: rgba(15, 23, 42, 0.95); border: 1px solid #475569; border-radius: 8px; padding: 20px; margin: 30px 0; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
    <h3 style="color: #ef4444; margin-top: 0;">Encounter Generator & Combat Tracker</h3>
    <div style="display: flex; gap: 20px; margin-bottom: 20px; align-items: flex-end;">
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #94a3b8; font-size: 0.9em; text-transform: uppercase;">Location</label>
            <select id="encounter-location" style="padding: 10px; background: #1e293b; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px;">
                <option value="docks">The Docks / Sluices</option>
                <option value="ocean">Open Ocean</option>
                <option value="deep">Deep Sea / Trenches</option>
            </select>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #94a3b8; font-size: 0.9em; text-transform: uppercase;">Difficulty</label>
            <select id="encounter-difficulty" style="padding: 10px; background: #1e293b; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px;">
                <option value="easy">Easy (2-3 Monsters)</option>
                <option value="medium">Medium (3-5 Monsters)</option>
                <option value="hard">Hard (5-8 Monsters)</option>
            </select>
        </div>
        <button id="btn-generate-encounter" style="background: #ef4444; color: #fff; border: none; padding: 12px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase;">Roll Initiative</button>
    </div>
    
    <div id="encounter-output" style="min-height: 100px; border-top: 1px dashed #475569; padding-top: 20px;">
        <!-- Combat Tracker renders here -->
    </div>
</div>
`;

const searchString = "<h2 id=\"ttrpg-stat-blocks-dd-35-pathfinder-1e\">TTRPG Stat Blocks (D&amp;D 3.5 / Pathfinder 1E)</h2>";

if (html.includes(searchString) && !html.includes('id="btn-generate-encounter"')) {
    html = html.replace(searchString, searchString + '\n' + uiHTML);
}

if (!html.includes('encounter_builder.js')) {
    html = html.replace('</body>', '    <script src="encounter_builder.js"></script>\n</body>');
}

fs.writeFileSync('h:/Antigravity/Novel/dm_bestiary.html', html, 'utf8');
console.log("Injected Encounter UI into dm_bestiary.html");
