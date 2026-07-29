import glob

files = glob.glob('h:/Antigravity/Novel/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        if "DM's Codex" not in content:
            print(f"MISSING DM Codex in {f}")
