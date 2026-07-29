import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I want to inject a theme select next to the main selects.
# The main selects are inside <div class="config-group">...</div>
# They look like: <select id="select-chassis"> ... </select>

theme_html = '''
        <select class="theme-select" data-layer="{layer}" style="padding: 10px; background: #1e293b; color: #f8fafc; border: 1px solid #334155; border-radius: 4px; margin-left: 5px;">
            <option value="none">Base Theme</option>
            <option value="arcane">Aether/Arcane (Blue)</option>
            <option value="gothic">Gothic (Red/Dark)</option>
            <option value="clockwork">Clockwork (Brass)</option>
            <option value="organic">Organic (Green)</option>
        </select>
'''

def replace_select(match):
    full_str = match.group(0)
    select_id = match.group(1)
    
    layer_map = {
        'select-chassis': 'vis-layer-hull',
        'select-core': 'vis-layer-core',
        'select-armor': 'vis-layer-armor',
        'select-propulsion': 'vis-layer-propulsion',
        'select-figurehead': 'vis-layer-figurehead',
        'select-weapon': 'vis-layer-weapon1',
        'select-weapon2': 'vis-layer-weapon2',
        'select-weapon3': 'vis-layer-weapon3'
    }
    
    if select_id in layer_map:
        # wrap the select and the new theme select in a flex div
        # Actually, let's just append the theme select after the original select
        layer = layer_map[select_id]
        theme_dropdown = theme_html.format(layer=layer)
        
        # We need to make sure they display inline nicely. 
        # The existing <select> is usually block or 100% width.
        # Let's wrap them in a flex container.
        
        # Wait, the regex captures the whole <select ...> ... </select> block.
        # Let's wrap it!
        return f'<div style="display: flex;">\n<div style="flex: 2;">\n{full_str}\n</div>\n<div style="flex: 1;">\n{theme_dropdown}\n</div>\n</div>'
    return full_str

# Match the select tags for the target categories
pattern = re.compile(r'<select\s+id="(select-(?:chassis|core|armor|propulsion|figurehead|weapon2?3?))".*?>.*?</select>', re.DOTALL)

new_html = pattern.sub(replace_select, html)

with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("HTML Themes Added")
