import re

with open('h:/Antigravity/Novel/shipyard.js', 'r', encoding='utf-8') as f:
    js = f.read()

# REWRITE updateTotalCost
new_utc = '''function updateTotalCost() {
    let total = 0;
    let usedHpt = 0;

    const chassisId = document.getElementById('select-chassis').value;
    const materialId = document.getElementById('select-material').value;
    const coreId = document.getElementById('select-core').value;
    const propId = document.getElementById('select-propulsion').value;
    const armorId = document.getElementById('select-armor').value;
    const figId = document.getElementById('select-figurehead').value;
    const cmId = document.getElementById('select-countermeasure').value;
    const auxId = document.getElementById('select-auxiliary').value;
    const crewId = document.getElementById('select-crew').value;
    const weaponId = document.getElementById('select-weapon').value;

    let c = catalog.chassis[chassisId];
    if(chassisId === "custom") {
        c = { cost: 0, maxHPt: parseInt(document.getElementById("custom-hpt")?.value) || 5 };
    }
    
    total += c.cost;
    total += catalog.materials[materialId].cost;
    if(catalog.cores[coreId]) total += catalog.cores[coreId].cost;
    if(catalog.propulsion[propId]) total += catalog.propulsion[propId].cost;
    if(catalog.armor[armorId]) total += catalog.armor[armorId].cost;
    if(catalog.figureheads[figId]) total += catalog.figureheads[figId].cost;
    if(catalog.countermeasures[cmId]) total += catalog.countermeasures[cmId].cost;
    if(catalog.auxiliary[auxId]) total += catalog.auxiliary[auxId].cost;
    if(catalog.crew[crewId]) total += catalog.crew[crewId].cost;
    
    let w = catalog.weapons[weaponId];
    total += w.cost;
    usedHpt += (w.hpt || 0);

    const upgrades = document.querySelectorAll('.cb-upgrade:checked');
    upgrades.forEach(u => {
        let up = catalog.upgrades[u.value];
        total += up.cost;
        usedHpt += (up.hpt || 1);
    });

    const tDisplay = document.getElementById("total-cost-display");
    if(tDisplay) tDisplay.textContent = total.toLocaleString();
    
    const hptDisplay = document.getElementById("hpt-display");
    if (hptDisplay) {
        hptDisplay.textContent = usedHpt + " / " + c.maxHPt;
        if (usedHpt > c.maxHPt) {
            hptDisplay.style.color = "#ef4444";
        } else {
            hptDisplay.style.color = "#10b981";
        }
    }
}'''
js = re.sub(r'function updateTotalCost\(\) \{.*?\n\}', new_utc, js, flags=re.DOTALL)

# REWRITE buildStatBlock fetches
old_build_fetch = '''    let chassis = catalog.chassis[chassisId];
    const material = catalog.materials[materialId];'''
new_build_fetch = '''    const chassisId = document.getElementById('select-chassis').value;
    const materialId = document.getElementById('select-material').value;
    let chassis = catalog.chassis[chassisId];
    const material = catalog.materials[materialId];'''
# we must replace where it fetches from queries in buildStatBlock. Wait, in buildStatBlock it actually did not fetch them before, it assumed they were fetched? 
# Wait, let's just do a blanket replacement in buildStatBlock.

# Let's completely rewrite buildStatBlock
new_bsb = '''function buildStatBlock() {
    document.getElementById("placeholder-panel").style.display = "none";
    document.getElementById("statblock-container").classList.remove("hidden");

    const chassisId = document.getElementById('select-chassis').value;
    const materialId = document.getElementById('select-material').value;
    let chassis = catalog.chassis[chassisId];
    const material = catalog.materials[materialId];

    if (chassisId === "custom") {
        chassis = {
            name: document.getElementById("custom-name").value || "Custom Vessel",
            type: document.getElementById("custom-type").value || "Custom Vehicle (Water)",
            hp: parseInt(document.getElementById("custom-hp").value) || 100,
            dt: parseInt(document.getElementById("custom-dt").value) || 0,
            speedBase: parseInt(document.getElementById("custom-speed").value) || 30,
            sizeBaseAc: parseInt(document.getElementById("custom-ac").value) || 10,
            str: parseInt(document.getElementById("custom-str").value) || 10,
            dex: parseInt(document.getElementById("custom-dex").value) || 10,
            con: parseInt(document.getElementById("custom-con").value) || 10,
            crewMin: document.getElementById("custom-crew-min").value || "1",
            crewMax: document.getElementById("custom-crew-max").value || "5",
            cargo: document.getElementById("custom-cargo").value || "10 tons",
            maxHPt: parseInt(document.getElementById("custom-hpt").value) || 5
        };
    }

    document.getElementById("sb-name").textContent = (chassisId === "custom" ? chassis.name : "Custom " + chassis.name);
    document.getElementById("sb-type").textContent = chassis.type;

    let finalAc = chassis.sizeBaseAc + material.acBonus;
    if(catalog.armor[document.getElementById('select-armor').value]) finalAc += catalog.armor[document.getElementById('select-armor').value].acBonus;
    
    document.getElementById("sb-ac").textContent = finalAc;
    document.getElementById("sb-ac-desc").textContent = ();
    
    document.getElementById("sb-speed").textContent = (chassis.speedBase + material.speedMod) + " ft.";
    document.getElementById("sb-crew").textContent = chassis.crewMin + "-" + chassis.crewMax;
    document.getElementById("sb-cargo").textContent = chassis.cargo;
    
    let maxHp = chassis.hp + material.hpMod;
    document.getElementById("sb-hp").innerHTML = <input type="number" id="live-hp-input" value="" style="width:60px; background:transparent; color:#e2e8f0; border:1px solid #475569; font-weight:bold;"> / ;
    
    document.getElementById("sb-hp-desc").textContent = (Damage Threshold );

    let getMod = (score) => {
        let mod = Math.floor((score - 10) / 2);
        return mod >= 0 ? + : ${mod};
    };

    document.getElementById("sb-str").textContent = ${chassis.str} ();
    document.getElementById("sb-dex").textContent = ${chassis.dex} ();
    document.getElementById("sb-con").textContent = ${chassis.con} ();

    let usedHpt = 0;
    let weaponObj = catalog.weapons[document.getElementById('select-weapon').value];
    usedHpt += (weaponObj.hpt || 0);
    document.querySelectorAll('.cb-upgrade:checked').forEach(u => { usedHpt += (catalog.upgrades[u.value].hpt || 1); });
    
    const overloadDiv = document.getElementById("sb-overload-warning");
    if(usedHpt > chassis.maxHPt) overloadDiv.style.display = "block";
    else overloadDiv.style.display = "none";

    const traitsContainer = document.getElementById("sb-traits-container");
    traitsContainer.innerHTML = "";
    
    let allTraits = [];
    allTraits = allTraits.concat(material.traits);
    allTraits = allTraits.concat(catalog.cores[document.getElementById('select-core').value].traits);
    allTraits = allTraits.concat(catalog.propulsion[document.getElementById('select-propulsion').value].traits);
    allTraits = allTraits.concat(catalog.armor[document.getElementById('select-armor').value].traits);
    allTraits = allTraits.concat(catalog.figureheads[document.getElementById('select-figurehead').value].traits);
    allTraits = allTraits.concat(catalog.countermeasures[document.getElementById('select-countermeasure').value].traits);
    allTraits = allTraits.concat(catalog.auxiliary[document.getElementById('select-auxiliary').value].traits);
    allTraits = allTraits.concat(catalog.crew[document.getElementById('select-crew').value].traits);
    
    document.querySelectorAll('.cb-upgrade:checked').forEach(u => {
        allTraits = allTraits.concat(catalog.upgrades[u.value].traits);
    });

    allTraits.forEach(t => {
        let div = document.createElement("div");
        div.innerHTML = <strong>.</strong> ;
        traitsContainer.appendChild(div);
    });

    const stationsContainer = document.getElementById("sb-stations-container");
    if(stationsContainer) {
        stationsContainer.innerHTML = "";
        let helmDiv = document.createElement("div");
        helmDiv.innerHTML = "<strong>Helm (Requires 1 Crew).</strong> The pilot can use an action to move the ship up to its speed.";
        stationsContainer.appendChild(helmDiv);
        let engDiv = document.createElement("div");
        engDiv.innerHTML = "<strong>Engineering (Requires 1 Crew).</strong> The engineer can use an action to repair 2d10 hit points or grant +10 ft speed until end of next turn.";
        stationsContainer.appendChild(engDiv);
        let gunDiv = document.createElement("div");
        gunDiv.innerHTML = <strong>Gunnery:  (Requires 1 Crew).</strong> The gunner can use an action to fire the primary weapon.;
        stationsContainer.appendChild(gunDiv);
    }

    const actionsContainer = document.getElementById("sb-actions-container");
    actionsContainer.innerHTML = "";
    let wDiv = document.createElement("div");
    wDiv.innerHTML = <strong>.</strong> ;
    actionsContainer.appendChild(wDiv);
}'''
js = re.sub(r'function buildStatBlock\(\) \{.*?\n\}', new_bsb, js, flags=re.DOTALL)

# REWRITE EXPORT / IMPORT
new_ex = '''
function exportToJSON() {
    let formData = {
        chassis: document.getElementById('select-chassis').value,
        material: document.getElementById('select-material').value,
        core: document.getElementById('select-core').value,
        propulsion: document.getElementById('select-propulsion').value,
        armor: document.getElementById('select-armor').value,
        figurehead: document.getElementById('select-figurehead').value,
        weapon: document.getElementById('select-weapon').value,
        countermeasure: document.getElementById('select-countermeasure').value,
        auxiliary: document.getElementById('select-auxiliary').value,
        crew: document.getElementById('select-crew').value
    };
    
    const checks = document.querySelectorAll('.cb-upgrade:checked');
    formData.upgrades = Array.from(checks).map(c => c.value);
    
    if(formData.chassis === "custom") {
        formData.custom = {
            name: document.getElementById("custom-name").value,
            type: document.getElementById("custom-type").value,
            hp: document.getElementById("custom-hp").value,
            dt: document.getElementById("custom-dt").value,
            speed: document.getElementById("custom-speed").value,
            ac: document.getElementById("custom-ac").value,
            str: document.getElementById("custom-str").value,
            dex: document.getElementById("custom-dex").value,
            con: document.getElementById("custom-con").value,
            crewMin: document.getElementById("custom-crew-min").value,
            crewMax: document.getElementById("custom-crew-max").value,
            cargo: document.getElementById("custom-cargo").value,
            hpt: document.getElementById("custom-hpt").value
        };
    }
    
    const blob = new Blob([JSON.stringify(formData, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "sovereign-shipyard-blueprint.json";
    a.click();
    URL.revokeObjectURL(url);
}

function importFromJSON(event) {
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            document.querySelectorAll('.cb-upgrade').forEach(c => c.checked = false);
            
            if(data.chassis) document.getElementById('select-chassis').value = data.chassis;
            if(data.material) document.getElementById('select-material').value = data.material;
            if(data.core) document.getElementById('select-core').value = data.core;
            if(data.propulsion) document.getElementById('select-propulsion').value = data.propulsion;
            if(data.armor) document.getElementById('select-armor').value = data.armor;
            if(data.figurehead) document.getElementById('select-figurehead').value = data.figurehead;
            if(data.weapon) document.getElementById('select-weapon').value = data.weapon;
            if(data.countermeasure) document.getElementById('select-countermeasure').value = data.countermeasure;
            if(data.auxiliary) document.getElementById('select-auxiliary').value = data.auxiliary;
            if(data.crew) document.getElementById('select-crew').value = data.crew;
            
            if(data.upgrades) {
                data.upgrades.forEach(v => {
                    let el = document.querySelector(.cb-upgrade[value=""]);
                    if(el) el.checked = true;
                });
            } 
            
            if(data.custom) {
                document.getElementById("custom-name").value = data.custom.name;
                document.getElementById("custom-type").value = data.custom.type;
                document.getElementById("custom-hp").value = data.custom.hp;
                document.getElementById("custom-dt").value = data.custom.dt;
                document.getElementById("custom-speed").value = data.custom.speed;
                document.getElementById("custom-ac").value = data.custom.ac;
                document.getElementById("custom-str").value = data.custom.str;
                document.getElementById("custom-dex").value = data.custom.dex;
                document.getElementById("custom-con").value = data.custom.con;
                document.getElementById("custom-crew-min").value = data.custom.crewMin;
                document.getElementById("custom-crew-max").value = data.custom.crewMax;
                document.getElementById("custom-cargo").value = data.custom.cargo;
                document.getElementById("custom-hpt").value = data.custom.hpt || 5;
            }
            
            if(data.chassis === "custom") {
                document.getElementById('custom-blueprint-fields').style.display = 'block';
            } else {
                document.getElementById('custom-blueprint-fields').style.display = 'none';
            }
            
            updateTotalCost();
            buildStatBlock();
        } catch(err) {
            alert("Invalid JSON file.");
        }
    };
    reader.readAsText(file);
}'''
js = re.sub(r'function exportToJSON\(\) \{.*?\n\}', new_ex, js, flags=re.DOTALL)
js = re.sub(r'function importFromJSON\(event\) \{.*?\n\}', '', js, flags=re.DOTALL)

# Add event listeners back in for custom toggle
listeners_js = '''
document.addEventListener('DOMContentLoaded', () => {
    // Dropdown toggle logic
    document.getElementById('select-chassis').addEventListener('change', (e) => {
        if(e.target.value === "custom") {
            document.getElementById('custom-blueprint-fields').style.display = 'block';
        } else {
            document.getElementById('custom-blueprint-fields').style.display = 'none';
        }
        updateTotalCost();
    });
    
    document.getElementById('btn-build').addEventListener('click', buildStatBlock);
    
    // Wire up all selects and checkboxes to update cost on change
    document.querySelectorAll('.builder-panel select').forEach(s => s.addEventListener('change', updateTotalCost));
    document.querySelectorAll('.cb-upgrade').forEach(c => c.addEventListener('change', updateTotalCost));
});
'''
js += listeners_js

with open('h:/Antigravity/Novel/shipyard.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("JS Updated Part 5")
