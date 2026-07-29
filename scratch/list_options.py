import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    html = f.read()

categories = ['select-chassis', 'select-core', 'select-propulsion', 'select-armor', 'select-figurehead', 'select-weapon']

for cat in categories:
    print(f"\n--- {cat} ---")
    cat_match = re.search(f'id="{cat}".*?>(.*?)</select>', html, re.DOTALL)
    if cat_match:
        options = re.findall(r'<option value="(.*?)".*?>(.*?)</option>', cat_match.group(1))
        for val, text in options:
            print(f"{val}: {text}")
