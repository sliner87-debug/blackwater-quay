import re

js_path = "h:/Antigravity/Novel/shipyard.js"
with open(js_path, "r", encoding="utf-8") as f:
    content = f.read()

descriptions = {
    'skiff': 'A fast, lightweight surface vessel designed to navigate narrow sewer canals.',
    'gunboat': 'A heavily armed patrol craft built for hit-and-run tactics.',
    'pinnace': 'A mid-sized merchant vessel featuring hidden compartments for smuggling.',
    'submersible': 'A pressurized iron hull capable of traversing the pitch-black ocean floor.',
    'clipper': 'A massive, sleek galleon powered by aether-currents for unmatched speed.',
    'galleon': 'A traditional, heavily armored warship suited for broadside combat.',
    'barge': 'A slow, massive transport vessel often used by necromancers to haul corpses.',
    'leviathan': 'A fortified dreadnought explicitly designed to hunt massive sea monsters.',
    'dreadnought': 'A colossal subterranean warship capable of dominating entire cavern seas.',
    'flagship': 'The pinnacle of naval engineering, serving as a mobile fortress and command center.',
    'custom': 'Design your own custom hull from scratch.'
}

# Clear any existing desc: "..." from the chassis block to avoid duplicates
def replacer(match):
    block = match.group(0)
    # Remove existing desc fields
    block = re.sub(r'desc: "[^"]+",\s*', '', block)
    
    # Inject new desc fields
    lines = block.split('\n')
    new_lines = []
    for line in lines:
        for key, desc in descriptions.items():
            if re.search(fr'^\s*{key}:\s*{{', line):
                line = re.sub(r'(name:\s*"[^"]+",)', fr'\1 desc: "{desc}",', line)
                break
        new_lines.append(line)
    return '\n'.join(new_lines)

content = re.sub(r'chassis: \{.*?\n    \},', replacer, content, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Chassis fixed.")
