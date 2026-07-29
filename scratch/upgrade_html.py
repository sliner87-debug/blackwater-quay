import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add CSS for scrollable palette and filter buttons
css_to_add = '''
        .palette-filters {
            display: flex;
            gap: 5px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }
        .filter-btn {
            background: #1e293b;
            color: #94a3b8;
            border: 1px solid #334155;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85em;
        }
        .filter-btn.active, .filter-btn:hover {
            background: #38bdf8;
            color: #fff;
            border-color: #38bdf8;
        }
        .scrollable-palette {
            max-height: 700px;
            overflow-y: auto;
            padding-right: 10px;
        }
        .scrollable-palette::-webkit-scrollbar {
            width: 6px;
        }
        .scrollable-palette::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 3px;
        }
'''
html = html.replace('</style>', css_to_add + '\n    </style>')

# Replace the builder-panel content for VTT
old_palette_regex = r'(<div class="shipyard-header">\s*<h3>Parts Palette</h3>.*?)(</div>\s*</div>\s*<!-- RIGHT: CANVAS AREA -->)'

new_palette = '''<div class="shipyard-header">
                    <h3>Parts Palette</h3>
                    <p style="font-size: 0.85em; opacity: 0.8; margin-top: 5px;">Select an item and click grid to place. Click placed items to Drag, scale (Up/Down), or Delete.</p>
                </div>
                
                <div class="palette-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="arcane">Aether/Arcane</button>
                    <button class="filter-btn" data-filter="gothic">Gothic/Necromantic</button>
                    <button class="filter-btn" data-filter="clockwork">Clockwork/Industrial</button>
                    <button class="filter-btn" data-filter="organic">Organic/Biotech</button>
                </div>

                <div class="scrollable-palette">
                    <!-- Dynamic Grid Will Be Generated Here via JS -->
                    <div id="vtt-dynamic-palette"></div>
                </div>

                <button id="clear-canvas-btn" class="build-btn" style="background-color: #991b1b; margin-top: 15px;">Clear Grid</button>
            </div>
'''
html = re.sub(r'<div class="shipyard-header">\s*<h3>Parts Palette</h3>.*?<button id="clear-canvas-btn".*?</button>\s*</div>', new_palette, html, flags=re.DOTALL)

with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated HTML with filter UI and scrollable palette")
