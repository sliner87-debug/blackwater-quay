import re

js_path = "h:/Antigravity/Novel/shipyard.js"
with open(js_path, "r", encoding="utf-8") as f:
    content = f.read()

script_to_add = """
const selectCategoryMap = {
    'select-chassis': 'chassis',
    'select-material': 'materials',
    'select-core': 'cores',
    'select-propulsion': 'propulsion',
    'select-armor': 'armor',
    'select-figurehead': 'figureheads',
    'select-weapon': 'weapons',
    'select-countermeasure': 'countermeasures',
    'select-auxiliary': 'auxiliary',
    'select-crew': 'crew'
};

function updateDescriptions() {
    for (let [selectId, catalogKey] of Object.entries(selectCategoryMap)) {
        let select = document.getElementById(selectId);
        let descDiv = document.getElementById(selectId.replace('select-', 'desc-'));
        if (select && descDiv && catalog[catalogKey]) {
            let itemKey = select.value;
            let item = catalog[catalogKey][itemKey];
            
            let descHtml = "";
            
            if (item) {
                if (catalogKey === 'chassis' && itemKey !== 'custom') {
                    descHtml = <strong>Stats:</strong> Crew \-\, Cargo \;
                } else if (itemKey === 'custom') {
                    descHtml = <em>Configure custom blueprint below.</em>;
                } else {
                    let hasTraits = false;
                    if (item.traits && item.traits.length > 0) {
                        descHtml = <strong>\:</strong> \;
                        hasTraits = true;
                    }
                    if (item.action) {
                        descHtml = <strong>\:</strong> \;
                        hasTraits = true;
                    }
                    if (!hasTraits && item.name !== "None" && item.name !== "No Armor" && item.name !== "Standard Rigging" && item.name !== "Standard Oak" && item.name !== "Standard Furnace" && item.name !== "Standard Hired Crew") {
                         let statDesc = [];
                         if(item.acBonus) statDesc.push(+\ AC);
                         if(item.hpMod) statDesc.push(+\ HP);
                         if(item.speedMod) statDesc.push(\\ ft. Speed);
                         if(item.dtMod) statDesc.push(+\ Damage Threshold);
                         if(statDesc.length > 0) {
                             descHtml = <strong>Modifiers:</strong> \;
                         }
                    }
                }
            }
            descDiv.innerHTML = descHtml;
        }
    }
}
"""

# Insert script before document.addEventListener('DOMContentLoaded', ...)
content = content.replace("document.addEventListener('DOMContentLoaded', () => {", script_to_add + "\ndocument.addEventListener('DOMContentLoaded', () => {")

# Then add updateDescriptions() to the change event listeners
# The existing line is: document.querySelectorAll('.builder-panel select').forEach(s => s.addEventListener('change', updateTotalCost));
replacement_listener = "document.querySelectorAll('.builder-panel select').forEach(s => s.addEventListener('change', (e) => { updateTotalCost(); updateDescriptions(); }));"
content = content.replace("document.querySelectorAll('.builder-panel select').forEach(s => s.addEventListener('change', updateTotalCost));", replacement_listener)

# And call updateDescriptions() initially
replacement_dom = replacement_listener + "\n    updateDescriptions();\n"
content = content.replace(replacement_listener, replacement_dom)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected JS!")
