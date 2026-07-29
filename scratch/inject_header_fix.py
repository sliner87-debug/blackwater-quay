import os
import glob
import re

base_dir = "h:/Antigravity/Novel"

# Define the HTML files to target
target_files = [
    "index.html",
    "shipyard.html",
    "master_novel_complete.html",
    "blackwater_quay_codex.html",
    "Campaign_Module/The_Bleeding_Needle_Vessel_Manual.html",
    "Campaign_Module/The_Deepmind_Tear_Master_Module.html",
    "Campaign_Module/The_Onyx_Wake_Vessel_Manual.html",
    "Campaign_Module/Act_IV_Descent_into_the_Deepmind_Annex.html"
]

header_template = """    <!-- SITE HEADER & NAVIGATION -->
    <header class="site-header" style="position: relative; z-index: 10000; font-family: 'Inter', sans-serif;">
        <nav class="nav-container">
            <a href="{prefix}index.html" class="logo-link">
                <span class="logo-text">SABLEHOOK COVENANT</span>
            </a>
            <ul class="nav-menu">
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">The Setting &#9662;</a>
                    <div class="dropdown-content">
                        <a href="{prefix}index.html#antihero">Dark Hero</a>
                        <a href="{prefix}index.html#timeline">Chronal Timeline</a>
                        <a href="{prefix}index.html#map">Interactive Map</a>
                        <a href="{prefix}index.html#districts">Districts</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">The Novel &#9662;</a>
                    <div class="dropdown-content">
                        <a href="{prefix}master_novel_complete.html">The Blackwater Trilogy</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">Campaign Modules &#9662;</a>
                    <div class="dropdown-content">
                        <a href="{prefix}Campaign_Module/Act_IV_Descent_into_the_Deepmind_Annex.html">Act IV: The Deepmind Annex</a>
                        <a href="{prefix}Campaign_Module/The_Deepmind_Tear_Master_Module.html">The Deepmind Tear (Master)</a>
                        <a href="{prefix}Campaign_Module/The_Bleeding_Needle_Vessel_Manual.html">The Bleeding Needle</a>
                        <a href="{prefix}Campaign_Module/The_Onyx_Wake_Vessel_Manual.html">The Onyx Wake</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a href="#" class="dropbtn">TTRPG Tools &#9662;</a>
                    <div class="dropdown-content">
                        <a href="{prefix}index.html#characters">Characters</a>
                        <a href="{prefix}index.html#factions">Faction Standing</a>
                        <a href="{prefix}blackwater_quay_codex.html">Blackwater Quay Codex</a>
                        <a href="{prefix}shipyard.html" style="color: #38bdf8; font-weight: bold;">Sovereign Shipbuilder</a>
                    </div>
                </li>
            </ul>
        </nav>
    </header>"""

for rel_path in target_files:
    full_path = os.path.join(base_dir, rel_path)
    if not os.path.exists(full_path):
        continue
        
    prefix = "../" if "Campaign_Module/" in rel_path else ""
    
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Inject CSS if not present
    css_link = f'<link rel="stylesheet" href="{prefix}webpage.css">'
    # Remove literal \n and raw string issue from previous run just in case
    content = content.replace("<body>\\n    <!-- SITE HEADER", "<body>\\n    <!-- SITE HEADER")
        
    # Inject or Replace Header
    header_html = header_template.format(prefix=prefix)
    
    if '<header class="site-header"' in content:
        # Replace existing header
        content = re.sub(r'<header class="site-header".*?</header>', header_html, content, flags=re.DOTALL)
    else:
        # Inject after <body>
        content = re.sub(r'<body.*?>', lambda m: m.group(0) + "\n" + header_html + "\n", content, count=1, flags=re.DOTALL)
        
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Done")
