import re

with open('h:/Antigravity/Novel/shipyard.js', 'r', encoding='utf-8') as f:
    js = f.read()

upgrade_logic = '''        }
    }
    
    // Handle Exotic Upgrades separately since they are checkboxes
    let upgradesDescDiv = document.getElementById('desc-upgrades');
    if (upgradesDescDiv) {
        let checkedUpgrades = document.querySelectorAll('.cb-upgrade:checked');
        if (checkedUpgrades.length === 0) {
            upgradesDescDiv.style.display = 'none';
            upgradesDescDiv.innerHTML = '';
        } else {
            let htmlParts = [];
            checkedUpgrades.forEach(cb => {
                let up = catalog.upgrades[cb.value];
                if (up && up.traits && up.traits.length > 0) {
                    htmlParts.push(<li><strong>\</strong> - <em>\:</em> \</li>);
                }
            });
            if (htmlParts.length > 0) {
                upgradesDescDiv.innerHTML = <ul style="margin:0; padding-left:20px;">\</ul>;
                upgradesDescDiv.style.display = 'block';
            } else {
                upgradesDescDiv.style.display = 'none';
            }
        }
    }
}'''

js = re.sub(r'        }\n    }\n}', upgrade_logic, js)

with open('h:/Antigravity/Novel/shipyard.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated JS updateDescriptions")
import re

with open('h:/Antigravity/Novel/shipyard.js', 'r', encoding='utf-8') as f:
    js = f.read()

upgrade_logic = r'''        }
    }
    
    // Handle Exotic Upgrades separately since they are checkboxes
    let upgradesDescDiv = document.getElementById('desc-upgrades');
    if (upgradesDescDiv) {
        let checkedUpgrades = document.querySelectorAll('.cb-upgrade:checked');
        if (checkedUpgrades.length === 0) {
            upgradesDescDiv.style.display = 'none';
            upgradesDescDiv.innerHTML = '';
        } else {
            let htmlParts = [];
            checkedUpgrades.forEach(cb => {
                let up = catalog.upgrades[cb.value];
                if (up && up.traits && up.traits.length > 0) {
                    htmlParts.push(<li><strong></strong> - <em>:</em> </li>);
                }
            });
            if (htmlParts.length > 0) {
                upgradesDescDiv.innerHTML = <ul style="margin:0; padding-left:20px;"></ul>;
                upgradesDescDiv.style.display = 'block';
            } else {
                upgradesDescDiv.style.display = 'none';
            }
        }
    }
}'''

js = re.sub(r'        \}\n    \}\n    \n    // Handle Exotic Upgrades.*?\n\}', upgrade_logic, js, flags=re.DOTALL)

with open('h:/Antigravity/Novel/shipyard.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated JS updateDescriptions")
