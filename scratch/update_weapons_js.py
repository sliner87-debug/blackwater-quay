import re

with open('h:/Antigravity/Novel/shipyard.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update updateTotalCost
js = js.replace("const weaponId = document.getElementById('select-weapon').value;",
                "const weaponId = document.getElementById('select-weapon').value;\n    const weaponId2 = document.getElementById('select-weapon2').value;\n    const weaponId3 = document.getElementById('select-weapon3').value;")

js = js.replace("if(catalog.weapons[weaponId]) total += catalog.weapons[weaponId].cost;",
                "if(catalog.weapons[weaponId]) total += catalog.weapons[weaponId].cost;\n    if(catalog.weapons[weaponId2]) total += catalog.weapons[weaponId2].cost;\n    if(catalog.weapons[weaponId3]) total += catalog.weapons[weaponId3].cost;")

# Update buildStatBlock
js = js.replace('const weaponId = document.getElementById("select-weapon").value;',
                'const weaponId = document.getElementById("select-weapon").value;\n    const weaponId2 = document.getElementById("select-weapon2").value;\n    const weaponId3 = document.getElementById("select-weapon3").value;')

js = js.replace('const weapon = catalog.weapons[weaponId];',
                'const weapon = catalog.weapons[weaponId];\n    const weapon2 = catalog.weapons[weaponId2];\n    const weapon3 = catalog.weapons[weaponId3];')

hpt_calc = '''    usedHpt += (weapon ? (weapon.hpt || 0) : 0);
    usedHpt += (weapon2 ? (weapon2.hpt || 0) : 0);
    usedHpt += (weapon3 ? (weapon3.hpt || 0) : 0);'''
js = re.sub(r'    usedHpt \+= \(weapon \? \(weapon\.hpt \|\| 0\) : 0\);', hpt_calc, js)

action_calc = '''    const weaponList = [weapon, weapon2, weapon3];
    weaponList.forEach(w => {
        if (w && w.action) {
            actionsContainer.innerHTML += "<div class=\'trait\'><strong>" + w.action.name + ".</strong> " + w.action.desc + "</div>";
        }
    });'''
js = re.sub(r'    if \(weapon && weapon\.action\) \{\n\s*actionsContainer\.innerHTML \+= "<div class=\'trait\'><strong>" \+ weapon\.action\.name \+ "\.</strong> " \+ weapon\.action\.desc \+ "</div>";\n\s*\}', action_calc, js, flags=re.DOTALL)


with open('h:/Antigravity/Novel/shipyard.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated JS for weapon2 and weapon3")
