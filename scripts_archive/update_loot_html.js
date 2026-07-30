const fs = require('fs');

let html = fs.readFileSync('h:/Antigravity/Novel/loot_generator.html', 'utf8');

const typeDropdown = `<select id="loot-type" class="loot-type-select">
                <option value="any">Any Trinket</option>
                <option value="void">Aberrant / Void-Touched</option>
                <option value="magetech">Magetech / Clockwork</option>
                <option value="nautical">Grimdark Nautical</option>
            </select>`;

const rarityDropdown = `
            <select id="loot-rarity" class="loot-type-select" style="margin-left: 10px;">
                <option value="any">Any Rarity</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="void-touched">Void-Touched</option>
            </select>`;

if (!html.includes('id="loot-rarity"')) {
    html = html.replace(typeDropdown, typeDropdown + rarityDropdown);
}

const oldCss = `.scrambling {
            color: #d4af37 !important;
            font-family: monospace;
            opacity: 0.7;
            text-shadow: 0 0 5px #d4af37;
        }`;

const newCss = `.scrambling {
            color: #d4af37 !important;
            font-family: monospace;
            opacity: 0.7;
            text-shadow: 0 0 5px #d4af37;
        }
        
        .loot-divider {
            border: 0;
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5), transparent);
            margin: 15px 0;
        }
        
        .loot-mechanic {
            font-size: 0.85em;
            font-style: italic;
            color: #94a3b8;
            line-height: 1.4;
            padding: 5px 10px;
            background: rgba(15, 23, 42, 0.5);
            border-radius: 4px;
            border-left: 2px solid #d4af37;
        }`;

if (!html.includes('.loot-mechanic {')) {
    html = html.replace(oldCss, newCss);
}

fs.writeFileSync('h:/Antigravity/Novel/loot_generator.html', html);
console.log('Updated loot_generator.html');
