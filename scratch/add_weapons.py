import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    html = f.read()

weapon_block_regex = r'(<div class="builder-item">\s*<label for="select-weapon">Primary Armament:</label>\s*<select id="select-weapon">.*?</select>\s*<div id="desc-weapon" class="item-desc" style="display: none;"></div>\s*</div>)'

# Extract the existing weapon block
match = re.search(weapon_block_regex, html, re.DOTALL)
if match:
    primary_block = match.group(1)
    
    # Create secondary block
    secondary_block = primary_block.replace('select-weapon', 'select-weapon2').replace('desc-weapon', 'desc-weapon2').replace('Primary Armament', 'Secondary Armament')
    
    # Create tertiary block
    tertiary_block = primary_block.replace('select-weapon', 'select-weapon3').replace('desc-weapon', 'desc-weapon3').replace('Primary Armament', 'Tertiary Armament')
    
    # Replace primary with all three
    new_html = html.replace(primary_block, primary_block + '\n' + secondary_block + '\n' + tertiary_block)
    
    with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Updated shipyard.html with Secondary and Tertiary weapons.")
else:
    print("Could not find weapon block regex match")
