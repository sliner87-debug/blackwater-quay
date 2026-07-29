import re

html_path = "h:/Antigravity/Novel/shipyard.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# For each select id="select-xxx", inject <div id="desc-xxx" class="item-desc"></div> after the </select>
# Need to be careful because some selects are followed by label directly, or closing div.
# We will use regex to find </select> and insert the div. But we need to know the id.

def replacer(match):
    full_select_block = match.group(0)
    # Extract id
    id_match = re.search(r'id="select-([^"]+)"', full_select_block)
    if id_match:
        cat_id = id_match.group(1)
        # return the block plus the new div
        return f'{full_select_block}\n                    <div id="desc-{cat_id}" class="item-desc"></div>'
    return full_select_block

new_content = re.sub(r'<select.*?</select>', replacer, content, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_content)
print("Updated HTML")
