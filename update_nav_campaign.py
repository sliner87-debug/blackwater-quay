import os
import glob
import re

html_files = glob.glob('h:/Antigravity/Novel/Campaign_Module/*.html')

target_regex = re.compile(r'<li class="nav-item dropdown">\s*<a href="#" class="dropbtn">TTRPG Tools &#9662;</a>\s*<div class="dropdown-content">.*?</div>\s*</li>', re.DOTALL)

replacement = '''<li class="nav-item dropdown">
                    <a href="#" class="dropbtn">TTRPG Tools &#9662;</a>
                    <div class="dropdown-content">
                        <a href="../index.html#characters">Characters</a>
                        <a href="../index.html#factions">Faction Standing</a>
                        <a href="../blackwater_quay_codex.html">Blackwater Quay Codex</a>
                        <a href="../shipyard.html" style="color: #38bdf8; font-weight: bold;">Sovereign Shipbuilder</a>
                        <a href="../fleet_generator.html" style="color: #a855f7; font-weight: bold;">Fleet Generator</a>
                        <a href="../crew_generator.html" style="color: #22d3ee; font-weight: bold;">Crew Generator</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn" style="color: #d4af37; font-weight: bold;">DM's Codex &#9662;</a>
                    <div class="dropdown-content">
                        <a href="../dm_screen.html">The Complete Codex</a>
                        <a href="../dm_screen.html#magic-items">Magic Items</a>
                        <a href="../dm_screen.html#bestiary">Bestiary & NPCs</a>
                        <a href="../dm_screen.html#player-options">Player Mechanics</a>
                        <a href="../dm_screen.html#faction-renown">Faction Renown</a>
                        <a href="../dm_screen.html#vtt-prompts">VTT Prompts</a>
                        <a href="../dm_screen.html#lore-deep-dives">Lore Deep Dives</a>
                    </div>
                </li>'''

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if "DM's Codex" in content:
            continue
            
        new_content, count = target_regex.subn(replacement, content)
        
        if count > 0:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {os.path.basename(file)}")
    except Exception as e:
        print(f"Failed {os.path.basename(file)}: {e}")
