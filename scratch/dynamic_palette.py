import re

with open('h:/Antigravity/Novel/shipyard.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will add the VTT Catalog and rendering logic just before the // Canvas Setup section
vtt_catalog = '''// VTT Catalog Data
const vttCatalog = [
    // Pre-existing Legacy Items
    { id: "skiff", name: "Skiff Hull", type: "hull", theme: "all", src: "images/vtt_hull_skiff.jpg" },
    { id: "dreadnought", name: "Dreadnought Hull", type: "hull", theme: "all", src: "images/vtt_hull_dreadnought.jpg" },
    { id: "nullsteel", name: "Null-Steel Plate", type: "armor", theme: "all", src: "images/vtt_armor_nullsteel.jpg" },
    { id: "ballista", name: "Ballista", type: "weapon", theme: "all", src: "images/vtt_weapon_ballista.jpg" },
    { id: "disruptor", name: "Disruptor", type: "weapon", theme: "all", src: "images/vtt_weapon_disruptor.jpg" },
];

function renderVTTPalette(filterTheme = 'all') {
    const container = document.getElementById('vtt-dynamic-palette');
    if (!container) return;
    
    // Group by type
    const grouped = {
        'hull': [],
        'weapon': [],
        'armor': [],
        'utility': []
    };
    
    vttCatalog.forEach(item => {
        if (filterTheme === 'all' || item.theme === 'all' || item.theme === filterTheme) {
            if(grouped[item.type]) grouped[item.type].push(item);
        }
    });
    
    let html = '';
    const typeNames = { hull: 'Hulls', weapon: 'Armaments', armor: 'Armor Plates', utility: 'Utilities' };
    
    for (let type in grouped) {
        if (grouped[type].length > 0) {
            html += <div class="config-group"><h4>\</h4><div class="parts-grid">;
            grouped[type].forEach(item => {
                html += <img src="\" class="draggable-part" data-type="\" data-src="\" alt="\" title="\">;
            });
            html += </div></div>;
        }
    }
    
    container.innerHTML = html;
    
    // Re-bind click events for new palette
    document.querySelectorAll('.draggable-part').forEach(img => {
        img.addEventListener('click', (e) => {
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected');
                activeImageObj = null;
                activeDataType = null;
                return;
            }
            document.querySelectorAll('.draggable-part').forEach(i => i.classList.remove('selected'));
            e.target.classList.add('selected');
            activeImageObj = new Image();
            activeImageObj.src = e.target.getAttribute('data-src');
            activeDataType = e.target.getAttribute('data-type');
            activeRotation = 0; 
            selectedItem = null;
            redrawCanvas();
        });
    });
}

// Bind Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderVTTPalette(e.target.getAttribute('data-filter'));
    });
});

'''

# Remove the old Handle Palette Selection block because it's now inside renderVTTPalette
js = re.sub(r'// Handle Palette Selection.*?// Handle Canvas Interactions', '// Handle Canvas Interactions', js, flags=re.DOTALL)

# Insert the new code before Canvas Setup
js = js.replace('// Canvas Setup', vtt_catalog + '\n// Canvas Setup')
# Call renderVTTPalette() right after Canvas Setup
js = js.replace('const placedItems = [];', 'const placedItems = [];\nrenderVTTPalette();')

with open('h:/Antigravity/Novel/shipyard.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated JS with dynamic palette rendering")
