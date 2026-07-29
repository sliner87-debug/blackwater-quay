with open('h:/Antigravity/Novel/shipyard.js', 'a', encoding='utf-8') as f:
    f.write('''
// ==========================================
// AUTO-VISUALIZER LOGIC
// ==========================================
const autoAssetMap = {
    // Hulls
    'corpseraft': 'images/auto_hull_corpse.jpg',
    'submersible': 'images/auto_hull_sub.jpg',
    'trenchcrawler': 'images/auto_hull_sub.jpg',
    'clipper': 'images/auto_hull_clipper.jpg',
    'nautiloid': 'images/auto_hull_nautiloid.jpg',
    'flagship': 'images/auto_hull_flagship.jpg',
    
    // Cores
    'chronal': 'images/auto_core_chronal.jpg',
    'necrotic': 'images/auto_core_necrotic.jpg',
    'elemental': 'images/auto_core_elemental.jpg',
    
    // Armor
    'energyshield': 'images/auto_armor_energy.jpg',
    
    // Figurehead
    'kraken': 'images/auto_fig_kraken.jpg',
    
    // Weapons
    'ballista': 'images/auto_weap_ballista.jpg',
    'voidrift': 'images/auto_weap_voidrift.jpg',
    'mindflayer': 'images/auto_weap_mindflayer.jpg',
    'lightning': 'images/auto_weap_lightning.jpg',
    
    // Fallback general themes (for unmapped options, use a thematic image or nothing)
    // We can map many options to the generic VTT images we already have since they have black backgrounds? 
    // Wait, VTT images have a dark navy background #0f172a, which won't blend perfectly as 'screen' but it's okay for fallbacks
    'skiff': 'images/vtt_hull_skiff.jpg',
    'dreadnought': 'images/vtt_hull_dreadnought.jpg',
    'disruptor': 'images/vtt_weapon_disruptor.jpg'
};

function updateVisualizerLayer(layerId, value) {
    const imgEl = document.getElementById(layerId);
    if (!imgEl) return;
    
    if (value && value !== 'none' && value !== 'standard' && autoAssetMap[value]) {
        imgEl.src = autoAssetMap[value];
        imgEl.style.opacity = 1;
    } else {
        imgEl.style.opacity = 0;
    }
}

// Bind to dropdowns
const layerMappings = [
    { selectId: 'select-chassis', layerId: 'vis-layer-hull' },
    { selectId: 'select-core', layerId: 'vis-layer-core' },
    { selectId: 'select-armor', layerId: 'vis-layer-armor' },
    { selectId: 'select-propulsion', layerId: 'vis-layer-propulsion' },
    { selectId: 'select-figurehead', layerId: 'vis-layer-figurehead' },
    { selectId: 'select-weapon', layerId: 'vis-layer-weapon1' },
    { selectId: 'select-weapon2', layerId: 'vis-layer-weapon2' },
    { selectId: 'select-weapon3', layerId: 'vis-layer-weapon3' }
];

layerMappings.forEach(mapping => {
    const selectEl = document.getElementById(mapping.selectId);
    if (selectEl) {
        selectEl.addEventListener('change', (e) => {
            updateVisualizerLayer(mapping.layerId, e.target.value);
        });
        // Initial load
        updateVisualizerLayer(mapping.layerId, selectEl.value);
    }
});
''')

print("JS updated")
