with open('h:/Antigravity/Novel/shipyard.js', 'a', encoding='utf-8') as f:
    f.write('''

// ==========================================
// CSS THEME LOGIC
// ==========================================
function applyThemeFilter(layerId, themeName) {
    const imgEl = document.getElementById(layerId);
    if (!imgEl) return;
    
    let filterStr = '';
    switch(themeName) {
        case 'arcane':
            filterStr = 'hue-rotate(220deg) saturate(1.5) brightness(1.2)';
            break;
        case 'gothic':
            filterStr = 'grayscale(1) sepia(1) hue-rotate(320deg) saturate(3) brightness(0.7) contrast(1.5)';
            break;
        case 'clockwork':
            filterStr = 'sepia(1) hue-rotate(15deg) saturate(2) brightness(0.9)';
            break;
        case 'organic':
            filterStr = 'hue-rotate(90deg) saturate(2) brightness(0.8) contrast(1.2)';
            break;
        case 'none':
        default:
            filterStr = 'none';
            break;
    }
    
    imgEl.style.filter = filterStr;
}

document.querySelectorAll('.theme-select').forEach(select => {
    select.addEventListener('change', (e) => {
        const layerId = e.target.getAttribute('data-layer');
        const theme = e.target.value;
        applyThemeFilter(layerId, theme);
    });
});
''')

print("JS Themes Added")
