const fs = require('fs');

const uiHTML = 
<div style="background: rgba(15, 23, 42, 0.95); border: 1px solid #475569; border-radius: 8px; padding: 20px; margin: 30px 0; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
    <h3 style="color: #38bdf8; margin-top: 0;">Live Faction Tracker</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        
        <!-- Thessalan -->
        <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px;">
            <strong style="color: #d4af37;">The Thessalan Consortium</strong><br>
            <input type="range" id="slider-thessalan" min="-50" max="50" value="0" style="width: 100%; margin: 10px 0;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                <span>Score: <span id="score-thessalan">0</span></span>
                <strong id="tier-thessalan">Unknown (Neutral)</strong>
            </div>
            <div id="perk-thessalan" style="font-size: 0.8em; color: #94a3b8; font-style: italic;"></div>
        </div>

        <!-- Covenant -->
        <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px;">
            <strong style="color: #d4af37;">Covenant & Crown</strong><br>
            <input type="range" id="slider-covenant" min="-50" max="50" value="0" style="width: 100%; margin: 10px 0;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                <span>Score: <span id="score-covenant">0</span></span>
                <strong id="tier-covenant">Unknown (Neutral)</strong>
            </div>
            <div id="perk-covenant" style="font-size: 0.8em; color: #94a3b8; font-style: italic;"></div>
        </div>

        <!-- Crimson -->
        <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px;">
            <strong style="color: #d4af37;">The Crimson Fleet</strong><br>
            <input type="range" id="slider-crimson" min="-50" max="50" value="0" style="width: 100%; margin: 10px 0;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                <span>Score: <span id="score-crimson">0</span></span>
                <strong id="tier-crimson">Unknown (Neutral)</strong>
            </div>
            <div id="perk-crimson" style="font-size: 0.8em; color: #94a3b8; font-style: italic;"></div>
        </div>

        <!-- Ironborn -->
        <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px;">
            <strong style="color: #d4af37;">The Ironborn Syndicate</strong><br>
            <input type="range" id="slider-ironborn" min="-50" max="50" value="0" style="width: 100%; margin: 10px 0;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                <span>Score: <span id="score-ironborn">0</span></span>
                <strong id="tier-ironborn">Unknown (Neutral)</strong>
            </div>
            <div id="perk-ironborn" style="font-size: 0.8em; color: #94a3b8; font-style: italic;"></div>
        </div>
        
    </div>
</div>
;

let html = fs.readFileSync('h:/Antigravity/Novel/dm_faction_renown.html', 'utf8');

// Insert UI
const searchString = "Note that earning Renown with one faction will almost always cost you Renown with their ideological enemies.</p>";
if (html.includes(searchString) && !html.includes('id="slider-thessalan"')) {
    html = html.replace(searchString, searchString + '\n' + uiHTML);
}

// Insert script tag
if (!html.includes('faction_tracker.js')) {
    html = html.replace('</body>', '    <script src="faction_tracker.js"></script>\n</body>');
}

fs.writeFileSync('h:/Antigravity/Novel/dm_faction_renown.html', html, 'utf8');
console.log("Injected UI and script tag into dm_faction_renown.html");
