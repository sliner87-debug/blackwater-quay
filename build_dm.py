import markdown
import os

# Files to process and their anchor IDs
md_files = [
    ('Campaign_Module/magic_items.md', 'magic-items'),
    ('Campaign_Module/monsters.md', 'bestiary'),
    ('Campaign_Module/player_options.md', 'player-options'),
    ('Campaign_Module/faction_renown_tracks.md', 'faction-renown'),
    ('Campaign_Module/vtt_image_prompts.md', 'vtt-prompts'),
    ('Campaign_Module/lore_deep_dives.md', 'lore-deep-dives')
]

html_content = ""
for file, section_id in md_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            text = f.read()
            html = markdown.markdown(text, extensions=['tables', 'toc'])
            html_content += f"<div id='{section_id}' class='content-section' style='margin-bottom: 50px;'>{html}</div><hr style='border-color: #333; margin: 40px 0;'>"

# HTML Template (borrowed from shipyard.html)
template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dungeon Master Screen - Blackwater Quay</title>
    <link rel="stylesheet" href="webpage.css">
    <link rel="stylesheet" href="shipyard.css">
    <style>
        .dm-container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #e0e0e0;
            font-family: 'Inter', sans-serif;
            background-color: rgba(10, 10, 15, 0.9);
            border: 1px solid #333;
            border-radius: 8px;
            margin-top: 40px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
        }}
        .content-section h1, .content-section h2, .content-section h3 {{
            color: #d4af37; /* Gold accent */
            border-bottom: 1px solid #444;
            padding-bottom: 10px;
            margin-top: 30px;
        }}
        .content-section table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }}
        .content-section th, .content-section td {{
            border: 1px solid #444;
            padding: 10px;
            text-align: left;
        }}
        .content-section th {{
            background-color: #222;
            color: #d4af37;
        }}
        .content-section blockquote {{
            border-left: 4px solid #d4af37;
            padding-left: 15px;
            color: #aaa;
            font-style: italic;
            background: #1a1a24;
            padding: 10px 15px;
        }}
        .content-section code {{
            background: #222;
            padding: 2px 5px;
            border-radius: 3px;
            color: #ff9d00;
        }}
    </style>
</head>
<body class="shipyard-body">

    <header class="site-header" style="position: relative; z-index: 10000; font-family: 'Inter', sans-serif;">
        <nav class="nav-container">
            <a href="index.html" class="logo-link">
                <span class="logo-text">SABLEHOOK COVENANT</span>
            </a>
            <ul class="nav-menu">
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">The Setting &#9662;</a>
                    <div class="dropdown-content">
                        <a href="index.html#antihero">Dark Hero</a>
                        <a href="index.html#timeline">Chronal Timeline</a>
                        <a href="index.html#map">Interactive Map</a>
                        <a href="index.html#districts">Districts</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">The Novel &#9662;</a>
                    <div class="dropdown-content">
                        <a href="master_novel_complete.html">The Blackwater Trilogy</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">Campaign Modules &#9662;</a>
                    <div class="dropdown-content">
                        <a href="Campaign_Module/Act_IV_Descent_into_the_Deepmind_Annex.html">Act IV: The Deepmind Annex</a>
                        <a href="Campaign_Module/The_Deepmind_Tear_Master_Module.html">The Deepmind Tear (Master)</a>
                        <a href="Campaign_Module/The_Bleeding_Needle_Vessel_Manual.html">The Bleeding Needle</a>
                        <a href="Campaign_Module/The_Onyx_Wake_Vessel_Manual.html">The Onyx Wake</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">TTRPG Tools &#9662;</a>
                    <div class="dropdown-content">
                        <a href="index.html#characters">Characters</a>
                        <a href="index.html#factions">Faction Standing</a>
                        <a href="blackwater_quay_codex.html">Blackwater Quay Codex</a>
                        <a href="shipyard.html" style="color: #38bdf8; font-weight: bold;">Sovereign Shipbuilder</a>
                        <a href="fleet_generator.html" style="color: #a855f7; font-weight: bold;">Fleet Generator</a>
                        <a href="crew_generator.html" style="color: #22d3ee; font-weight: bold;">Crew Generator</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn" style="color: #d4af37; font-weight: bold;">DM's Codex &#9662;</a>
                    <div class="dropdown-content">
                        <a href="dm_screen.html">The Complete Codex</a>
                        <a href="dm_screen.html#magic-items">Magic Items</a>
                        <a href="dm_screen.html#bestiary">Bestiary & NPCs</a>
                        <a href="dm_screen.html#player-options">Player Mechanics</a>
                        <a href="dm_screen.html#faction-renown">Faction Renown</a>
                        <a href="dm_screen.html#vtt-prompts">VTT Prompts</a>
                        <a href="dm_screen.html#lore-deep-dives">Lore Deep Dives</a>
                    </div>
                </li>
            </ul>
        </nav>
    </header>

    <div class="dm-container">
        <h1 style="text-align: center; color: #fff; font-size: 2.5em; margin-bottom: 50px;">The Dungeon Master's Codex</h1>
        {html_content}
    </div>

</body>
</html>
"""

with open('dm_screen.html', 'w', encoding='utf-8') as f:
    f.write(template)

print("dm_screen.html generated successfully!")
