import re

with open('h:/Antigravity/Novel/shipyard.js', 'r') as f:
    js = f.read()

# 1. ADD maxHPt TO CHASSIS
chassis_str = '''    chassis: {
        skiff: { name: "Sluice-Skiff", cost: 2000, type: "Huge Vehicle (Water)", hp: 100, dt: 5, speedBase: 80, str: 16, dex: 18, con: 14, sizeBaseAc: 14, crewMin: 1, crewMax: 2, cargo: "1 ton", maxHPt: 2 },
        gunboat: { name: "Assault Gunboat", cost: 6000, type: "Huge Vehicle (Water)", hp: 150, dt: 10, speedBase: 70, str: 18, dex: 16, con: 16, sizeBaseAc: 14, crewMin: 4, crewMax: 8, cargo: "5 tons", maxHPt: 4 },
        pinnace: { name: "Smuggler\\'s Pinnace", cost: 8000, type: "Gargantuan Vehicle (Water)", hp: 250, dt: 10, speedBase: 60, str: 16, dex: 16, con: 16, sizeBaseAc: 15, crewMin: 5, crewMax: 15, cargo: "50 tons", maxHPt: 5 },
        submersible: { name: "Deep-Sea Submersible", cost: 12000, type: "Huge Vehicle (Water)", hp: 200, dt: 15, speedBase: 30, str: 18, dex: 12, con: 18, sizeBaseAc: 16, crewMin: 4, crewMax: 6, cargo: "5 tons", maxHPt: 3 },
        clipper: { name: "Aether-Clipper", cost: 15000, type: "Gargantuan Vehicle (Water)", hp: 250, dt: 10, speedBase: 90, str: 16, dex: 18, con: 14, sizeBaseAc: 15, crewMin: 10, crewMax: 20, cargo: "30 tons", maxHPt: 5 },
        galleon: { name: "Ironclad Galleon", cost: 10000, type: "Gargantuan Vehicle (Water)", hp: 300, dt: 15, speedBase: 40, str: 20, dex: 10, con: 18, sizeBaseAc: 15, crewMin: 20, crewMax: 40, cargo: "100 tons", maxHPt: 6 },
        barge: { name: "Necromancer\\'s Barge", cost: 5000, type: "Gargantuan Vehicle (Water)", hp: 350, dt: 10, speedBase: 25, str: 18, dex: 8, con: 20, sizeBaseAc: 14, crewMin: 2, crewMax: 5, cargo: "200 tons (Corpses)", maxHPt: 4 },
        leviathan: { name: "Leviathan Hunter", cost: 18000, type: "Gargantuan Vehicle (Water)", hp: 400, dt: 20, speedBase: 35, str: 22, dex: 10, con: 20, sizeBaseAc: 16, crewMin: 30, crewMax: 50, cargo: "80 tons", maxHPt: 8 },
        dreadnought: { name: "Subterranean Dreadnought", cost: 25000, type: "Gargantuan Vehicle (Water)", hp: 500, dt: 25, speedBase: 25, str: 24, dex: 6, con: 20, sizeBaseAc: 16, crewMin: 80, crewMax: 120, cargo: "500 tons", maxHPt: 10 },
        flagship: { name: "Sovereign Flagship", cost: 100000, type: "Colossal Vehicle (Water)", hp: 800, dt: 30, speedBase: 20, str: 26, dex: 4, con: 22, sizeBaseAc: 18, crewMin: 200, crewMax: 300, cargo: "2000 tons", maxHPt: 15 },
        custom: { name: "Custom Blueprint", cost: 0, type: "Custom Vehicle", hp: 100, dt: 0, speedBase: 30, str: 10, dex: 10, con: 10, sizeBaseAc: 10, crewMin: 1, crewMax: 1, cargo: "0 tons", maxHPt: 5 }
    },'''
js = re.sub(r'    chassis: \{.*?\},\n    materials:', chassis_str + '\n    materials:', js, flags=re.DOTALL)

# Update Custom Build logic to grab maxHPt
new_custom_fetch = '''        chassis = {
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
        };'''
js = re.sub(r'        chassis = \{.*?\};', new_custom_fetch, js, flags=re.DOTALL)

# Add hpt to Weapons
js = js.replace('cost: 1000, action: { name: "Heavy Ballista"', 'cost: 1000, hpt: 1, action: { name: "Heavy Ballista"')
js = js.replace('cost: 1500, action: { name: "Mangonel"', 'cost: 1500, hpt: 2, action: { name: "Mangonel"')
js = js.replace('cost: 3000, action: { name: "Broadside Cannon"', 'cost: 3000, hpt: 3, action: { name: "Broadside Cannon"')
js = js.replace('cost: 2500, action: { name: "Fire Siphon (Recharge 5-6)"', 'cost: 2500, hpt: 2, action: { name: "Fire Siphon (Recharge 5-6)"')
js = js.replace('cost: 1500, action: { name: "Harpoon Shot"', 'cost: 1500, hpt: 1, action: { name: "Harpoon Shot"')
js = js.replace('cost: 4000, action: { name: "Trebuchet"', 'cost: 4000, hpt: 4, action: { name: "Trebuchet"')
js = js.replace('cost: 5000, action: { name: "Psychic Disruptor"', 'cost: 5000, hpt: 2, action: { name: "Psychic Disruptor"')
js = js.replace('cost: 8000, action: { name: "Channel Arcana"', 'cost: 8000, hpt: 3, action: { name: "Channel Arcana"')
js = js.replace('cost: 6000, action: { name: "Lightning Arc', 'cost: 6000, hpt: 3, action: { name: "Lightning Arc')
js = js.replace('cost: 7500, action: { name: "Eldritch Burst"', 'cost: 7500, hpt: 2, action: { name: "Eldritch Burst"')
js = js.replace('cost: 12000, action: { name: "Singularity', 'cost: 12000, hpt: 5, action: { name: "Singularity')
js = js.replace('cost: 9000, action: { name: "Soul-Seeker"', 'cost: 9000, hpt: 4, action: { name: "Soul-Seeker"')

# Add hpt to upgrades (1 each)
js = js.replace('cost: 2000, traits:', 'cost: 2000, hpt: 1, traits:')
js = js.replace('cost: 5000, traits:', 'cost: 5000, hpt: 1, traits:')
js = js.replace('cost: 4000, traits:', 'cost: 4000, hpt: 1, traits:')
js = js.replace('cost: 2500, traits:', 'cost: 2500, hpt: 1, traits:')
js = js.replace('cost: 6000, traits:', 'cost: 6000, hpt: 2, traits:')
js = js.replace('cost: 1500, traits:', 'cost: 1500, hpt: 1, traits:')

# Modify Total Cost logic to also sum HPT
new_total_cost_logic = '''function updateTotalCost() {
    let total = 0;
    let usedHpt = 0;

    const chassisId = document.querySelector('input[name="chassis"]:checked').value;
    const materialId = document.querySelector('input[name="armor"]:checked').value; // We mapped Hull Material to 'armor' originally in part 1
    const coreId = document.querySelector('input[name="core"]')?.checked ? document.querySelector('input[name="core"]:checked').value : "standard";
    const propId = document.querySelector('input[name="propulsion"]')?.checked ? document.querySelector('input[name="propulsion"]:checked').value : "sails";
    const weaponId = document.querySelector('input[name="weapon"]:checked').value;
    
    // Check if these exist in the DOM, default if not
    let armorId = document.querySelector('input[name="armorplate"]:checked')?.value || "none";
    let figId = document.querySelector('input[name="figurehead"]:checked')?.value || "none";
    let cmId = document.querySelector('input[name="countermeasure"]:checked')?.value || "none";
    let auxId = document.querySelector('input[name="auxiliary"]:checked')?.value || "none";
    let crewId = document.querySelector('input[name="crew"]:checked')?.value || "standard";

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

    const upgrades = document.querySelectorAll('input[name="upgrade"]:checked');
    upgrades.forEach(u => {
        let up = catalog.upgrades[u.value];
        total += up.cost;
        usedHpt += (up.hpt || 1);
    });

    document.getElementById("total-cost-display").textContent = total.toLocaleString();
    
    // Update HPT display
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
# Need to cleanly replace updateTotalCost
js = re.sub(r'function updateTotalCost\(\) \{.*?\n\}', new_total_cost_logic, js, flags=re.DOTALL)


# Update buildStatBlock to handle HPt warnings, interactive HP, and Crew Stations
build_sb_start = '''    document.getElementById("sb-speed").textContent = (chassis.speedBase + material.speedMod) + " ft.";
    document.getElementById("sb-crew").textContent = chassis.crewMin + "-" + chassis.crewMax;
    document.getElementById("sb-cargo").textContent = chassis.cargo;'''

build_sb_repl = '''    document.getElementById("sb-speed").textContent = (chassis.speedBase + material.speedMod) + " ft.";
    document.getElementById("sb-crew").textContent = chassis.crewMin + "-" + chassis.crewMax;
    document.getElementById("sb-cargo").textContent = chassis.cargo;
    
    // Interactive HP
    let maxHp = chassis.hp + material.hpMod;
    document.getElementById("sb-hp").innerHTML = <input type="number" id="live-hp-input" value="" style="width:60px; background:transparent; color:#e2e8f0; border:1px solid #475569; font-weight:bold;"> / ;
    
    // Check HPT Overload
    let usedHpt = 0;
    let weapon = catalog.weapons[document.querySelector('input[name="weapon"]:checked').value];
    usedHpt += (weapon.hpt || 0);
    document.querySelectorAll('input[name="upgrade"]:checked').forEach(u => { usedHpt += (catalog.upgrades[u.value].hpt || 1); });
    
    const overloadDiv = document.getElementById("sb-overload-warning");
    if(usedHpt > chassis.maxHPt) {
        overloadDiv.style.display = "block";
    } else {
        overloadDiv.style.display = "none";
    }
'''
js = js.replace(build_sb_start, build_sb_repl)

# Crew Stations injection in buildStatBlock
crew_station_logic = '''    // Inject Crew Stations
    let weaponObj = catalog.weapons[document.querySelector('input[name="weapon"]:checked').value];
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
'''
# We will inject this right before actions container clearing
js = js.replace('const actionsContainer = document.getElementById("sb-actions-container");', crew_station_logic + '\n    const actionsContainer = document.getElementById("sb-actions-container");')


# Export and Import logic
export_import_js = '''
// Export JSON
function exportToJSON() {
    let formData = {};
    const radios = document.querySelectorAll('.builder-panel input[type="radio"]:checked');
    radios.forEach(r => formData[r.name] = r.value);
    
    const checks = document.querySelectorAll('.builder-panel input[type="checkbox"]:checked');
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

// Import JSON
function importFromJSON(event) {
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // reset all first
            document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
            
            for(const [key, value] of Object.entries(data)) {
                if(key === "upgrades") {
                    value.forEach(v => {
                        let el = document.querySelector(input[name="upgrade"][value=""]);
                        if(el) el.checked = true;
                    });
                } else if(key === "custom") {
                    document.getElementById("custom-name").value = value.name;
                    document.getElementById("custom-type").value = value.type;
                    document.getElementById("custom-hp").value = value.hp;
                    document.getElementById("custom-dt").value = value.dt;
                    document.getElementById("custom-speed").value = value.speed;
                    document.getElementById("custom-ac").value = value.ac;
                    document.getElementById("custom-str").value = value.str;
                    document.getElementById("custom-dex").value = value.dex;
                    document.getElementById("custom-con").value = value.con;
                    document.getElementById("custom-crew-min").value = value.crewMin;
                    document.getElementById("custom-crew-max").value = value.crewMax;
                    document.getElementById("custom-cargo").value = value.cargo;
                    document.getElementById("custom-hpt").value = value.hpt || 5;
                } else {
                    let el = document.querySelector(input[name=""][value=""]);
                    if(el) el.checked = true;
                }
            }
            
            // toggle custom fields display
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
}

// Global HP live tracking
document.addEventListener('click', (e) => {
    if(e.target.id === 'btn-hp-plus') {
        let input = document.getElementById("live-hp-input");
        if(input) input.value = parseInt(input.value) + 1;
    }
    if(e.target.id === 'btn-hp-minus') {
        let input = document.getElementById("live-hp-input");
        if(input) input.value = parseInt(input.value) - 1;
    }
});

// Attach export/import listeners on window load
window.addEventListener('DOMContentLoaded', () => {
    let btnExport = document.getElementById('btn-export');
    if(btnExport) btnExport.addEventListener('click', exportToJSON);
    
    let inputImport = document.getElementById('input-import');
    if(inputImport) inputImport.addEventListener('change', importFromJSON);
});
'''
js += export_import_js

with open('h:/Antigravity/Novel/shipyard.js', 'w') as f:
    f.write(js)

print("JS Updated Part 4")
