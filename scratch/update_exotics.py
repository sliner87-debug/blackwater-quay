import re
import json

# Manually parse the upgrade traits from shipyard.js since it's a JS object
with open('h:/Antigravity/Novel/shipyard.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Extract upgrades dictionary text roughly
upgrades_text = js.split('upgrades: {')[1].split('} // End of catalog')[0]

# Rather than full parsing, let's just write the HTML blocks manually based on the script knowledge
html_blocks = {
    'smuggler': "<strong>Lead-Lined Compartment:</strong> Items inside the hold cannot be detected by divination magic such as Detect Magic or Locate Object.",
    'biolab': "<strong>Mobile Laboratory:</strong> Provides advantage on checks made to craft alchemical items or flesh-grafts while underway.",
    'brig': "<strong>Dampening Cells:</strong> Creatures locked inside the brig cannot cast spells with verbal or somatic components, and magic items they carry become mundane.",
    'chronal': "<strong>Chronal Override (1/Day):</strong> The captain can push the engine into overdrive. The ship can immediately take one additional action on its turn.",
    'vats': "<strong>Biomantic Support System:</strong> Living crew members aboard the ship regain 1d6 hit points at the start of each of their turns.",
    'triweave': "<strong>Sovereign Shroud (1/Day):</strong> The ship and everything aboard it becomes invisible to normal sight and magical scrying for 1 hour, or until the ship makes an attack.",
    'falsekeel': "<strong>Hidden Compartment:</strong> An external false keel that can detach and drop to the ocean floor in an emergency, preserving illicit cargo.",
    'vampirichull': "<strong>Blood-Wake:</strong> Whenever the ship deals damage to a living creature, the ship regains HP equal to half the damage dealt.",
    'aethertether': "<strong>Aether-Tether:</strong> The ship can tether itself to another vessel or object within 100 feet, preventing it from moving further away.",
    'dimensionalanchor': "<strong>Dimensional Anchor:</strong> While active, no creatures can teleport onto or off of the ship, and the ship itself cannot be teleported.",
    'symbiotichelm': "<strong>Symbiotic Helm:</strong> The helmsman can use their own Intelligence or Wisdom modifier in place of the ship's Dexterity modifier for maneuvering.",
    'alchemicaldistillery': "<strong>Alchemical Distillery:</strong> The ship produces 1d4 random common/uncommon potions every 24 hours of voyage."
}

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the checkbox-grid
grid_pattern = re.compile(r'(<div class="checkbox-grid".*?>)(.*?)(</div>\s*<div id="desc-upgrades")', re.DOTALL)
match = grid_pattern.search(html)

if match:
    prefix = match.group(1).replace('gap: 5px;', 'gap: 15px;') # increase gap for readability
    inner = match.group(2)
    suffix = match.group(3)
    
    # replace each label to include the description div
    for key, desc in html_blocks.items():
        pattern = r'(<label><input type="checkbox" class="cb-upgrade" value="' + key + r'">.*?)</label>'
        replacement = r'\1\n                        <div style="font-size: 0.85em; color: #94a3b8; margin-top: 4px; margin-left: 20px; font-weight: normal;">' + desc + r'</div>\n                    </label>'
        inner = re.sub(pattern, replacement, inner)
    
    new_html = html[:match.start()] + prefix + inner + suffix + html[match.end():]
    
    # Remove the desc-upgrades div display logic entirely or just hide it
    
    with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("HTML Exotics Updated")
else:
    print("Could not find checkbox-grid")
