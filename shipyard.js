
// Calculate stat modifier string
function getModString(score) {
    const mod = Math.floor((score - 10) / 2);
    return score + " (" + (mod >= 0 ? "+" : "") + mod + ")";
}

// Update total cost continuously
function updateTotalCost() {
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
    const weaponId2 = document.getElementById('select-weapon2').value;
    const weaponId3 = document.getElementById('select-weapon3').value;

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
}

// Build Stat Block
document.getElementById("btn-build").addEventListener("click", () => {
    document.getElementById("placeholder-panel").classList.add("hidden");
    document.getElementById("statblock-container").classList.remove("hidden");

    const chassisId = document.getElementById("select-chassis").value;
    const materialId = document.getElementById("select-material").value;
    const coreId = document.getElementById("select-core").value;
    const propulsionId = document.getElementById("select-propulsion").value;
    const armorId = document.getElementById("select-armor").value;
    const weaponId = document.getElementById("select-weapon").value;
    const weaponId2 = document.getElementById("select-weapon2").value;
    const weaponId3 = document.getElementById("select-weapon3").value;
    const figureheadId = document.getElementById("select-figurehead").value;
    const countermeasureId = document.getElementById("select-countermeasure").value;
    const crewId = document.getElementById("select-crew").value;
    const auxiliaryId = document.getElementById("select-auxiliary").value;
    const upgradeIds = Array.from(document.querySelectorAll("input[name=\'upgrade\']:checked")).map(cb => cb.value);

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
    const core = catalog.cores[coreId];
    const prop = catalog.propulsion[propulsionId];
    const armor = catalog.armor[armorId];
    const weapon = catalog.weapons[weaponId];
    const weapon2 = catalog.weapons[weaponId2];
    const weapon3 = catalog.weapons[weaponId3];
    const figurehead = catalog.figureheads[figureheadId];
    const countermeasure = catalog.countermeasures[countermeasureId];
    const crew = catalog.crew[crewId];
    const auxiliary = catalog.auxiliary[auxiliaryId];

    document.getElementById("sb-name").textContent = "Custom " + material.name + " " + chassis.name;
    document.getElementById("sb-type").textContent = chassis.type;

    let baseAc = chassis.sizeBaseAc || 10;
    document.getElementById("sb-ac").textContent = baseAc + (armor.acBonus || 0);
    document.getElementById("sb-ac-desc").textContent = "(" + armor.name + ")";
    
    document.getElementById("sb-hp").textContent = (chassis.hp || 100) + (material.hpMod || 0);
    document.getElementById("sb-hp-desc").textContent = "(Damage Threshold " + ((chassis.dt || 0) + (material.dtMod || 0)) + ")";
    
    document.getElementById("sb-speed").textContent = ((chassis.speedBase || 30) + (material.speedMod || 0)) + " ft.";
    document.getElementById("sb-crew").textContent = chassis.crewMin + "-" + chassis.crewMax;
    document.getElementById("sb-cargo").textContent = chassis.cargo;
    
    // Interactive HP
    let maxHp = chassis.hp + material.hpMod;
    document.getElementById("sb-hp").innerHTML = `<input type="number" id="live-hp-input" value="${maxHp}" style="width:60px; background:transparent; color:#e2e8f0; border:1px solid #475569; font-weight:bold;"> / ${maxHp}`;
    
    // Check HPT Overload
    let usedHpt = 0;
    usedHpt += (weapon ? (weapon.hpt || 0) : 0);
    usedHpt += (weapon2 ? (weapon2.hpt || 0) : 0);
    usedHpt += (weapon3 ? (weapon3.hpt || 0) : 0);
    document.querySelectorAll('input[name="upgrade"]:checked').forEach(u => { usedHpt += (catalog.upgrades[u.value].hpt || 1); });
    
    const overloadDiv = document.getElementById("sb-overload-warning");
    if(usedHpt > chassis.maxHPt) {
        overloadDiv.style.display = "block";
    } else {
        overloadDiv.style.display = "none";
    }


    document.getElementById("sb-str").textContent = getModString(chassis.str);
    document.getElementById("sb-dex").textContent = getModString(chassis.dex);
    document.getElementById("sb-con").textContent = getModString(chassis.con);

    const traitsContainer = document.getElementById("sb-traits-container");
    traitsContainer.innerHTML = "";

    let allTraits = [];
    allTraits = allTraits.concat(material.traits);
    allTraits = allTraits.concat(core.traits);
    allTraits = allTraits.concat(prop.traits);
    allTraits = allTraits.concat(armor.traits);
    allTraits = allTraits.concat(figurehead.traits);
    allTraits = allTraits.concat(countermeasure.traits);
    allTraits = allTraits.concat(crew.traits);
    allTraits = allTraits.concat(auxiliary.traits);
    upgradeIds.forEach(id => {
        if (catalog.upgrades[id].traits) {
            allTraits = allTraits.concat(catalog.upgrades[id].traits);
        }
    });

    allTraits = allTraits.filter(t => t !== undefined);

    if (allTraits.length === 0) {
        traitsContainer.innerHTML = "<div class=\'trait\'><em>No special traits.</em></div>";
    } else {
        allTraits.forEach(trait => {
            traitsContainer.innerHTML += "<div class=\'trait\'><strong>" + trait.name + ".</strong> " + trait.desc + "</div>";
        });
    }

        // Inject Crew Stations
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
        gunDiv.innerHTML = "<strong>Gunnery:  (Requires 1 Crew).</strong> The gunner can use an action to fire the primary weapon.";
        stationsContainer.appendChild(gunDiv);
    }

    const actionsContainer = document.getElementById("sb-actions-container");
    actionsContainer.innerHTML = "";
    const weaponList = [weapon, weapon2, weapon3];
    weaponList.forEach(w => {
        if (w && w.action) {
            actionsContainer.innerHTML += "<div class=\'trait\'><strong>" + w.action.name + ".</strong> " + w.action.desc + "</div>";
        }
    });
    
    // Create a JSON object representing the ship
    const shipJSON = {
        name: "Custom " + material.name + " " + chassis.name,
        type: chassis.type,
        ac: baseAc + (armor.acBonus || 0),
        hp: maxHp,
        speed: ((chassis.speedBase || 30) + (material.speedMod || 0)) + " ft.",
        core: core.name,
        propulsion: prop.name,
        weapons: weaponList.filter(w => w !== undefined).map(w => w.name)
    };
    
    // Save to LocalStorage
    localStorage.setItem('bq_saved_ship', document.getElementById('statblock-container').innerHTML);
    localStorage.setItem('bq_saved_ship_json', JSON.stringify(shipJSON, null, 2));
});

document.addEventListener('DOMContentLoaded', () => {
    const savedShip = localStorage.getItem('bq_saved_ship');
    if (savedShip) {
        document.getElementById('statblock-container').innerHTML = savedShip;
    }
    
    const btnCopy = document.getElementById('btn-copy-ship');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const json = localStorage.getItem('bq_saved_ship_json');
            if (json) {
                navigator.clipboard.writeText(json).then(() => {
                    btnCopy.textContent = "Copied!";
                    setTimeout(() => btnCopy.textContent = "Copy as JSON", 2000);
                });
            }
        });
    }
});

// Accordion UI Logic
document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// Listeners
document.body.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT") {
        updateTotalCost();
    }
});

// --- VTT VISUAL BUILDER LOGIC ---
const modeStatBtn = document.getElementById('mode-stat');
const modeVttBtn = document.getElementById('mode-vtt');
const statModeDiv = document.getElementById('stat-builder-mode');
const vttModeDiv = document.getElementById('vtt-builder-mode');

modeStatBtn.addEventListener('click', () => {
    modeStatBtn.classList.add('active');
    modeVttBtn.classList.remove('active');
    statModeDiv.style.display = 'grid';
    vttModeDiv.style.display = 'none';
});

modeVttBtn.addEventListener('click', () => {
    modeVttBtn.classList.add('active');
    modeStatBtn.classList.remove('active');
    vttModeDiv.style.display = 'grid';
    statModeDiv.style.display = 'none';
});

// VTT Catalog Data
const vttCatalog = [
    // Arcane Theme
    { id: "arcane-hull", name: "Arcane Frigate", type: "hull", theme: "arcane", src: "images/vtt_hull_arcane.jpg" },
    { id: "arcane-weap", name: "Spell-Cannon", type: "weapon", theme: "arcane", src: "images/vtt_weap_arcane.jpg" },
    { id: "arcane-util", name: "Aether Engine", type: "utility", theme: "arcane", src: "images/vtt_util_arcane.jpg" },
    
    // Gothic Theme
    { id: "gothic-hull", name: "Necropolis Ark", type: "hull", theme: "gothic", src: "images/vtt_hull_gothic.jpg" },
    { id: "gothic-weap", name: "Bone Harpoon", type: "weapon", theme: "gothic", src: "images/vtt_weap_gothic.jpg" },
    { id: "gothic-util", name: "Necrotic Reactor", type: "utility", theme: "gothic", src: "images/vtt_util_gothic.jpg" },
    
    // Clockwork Theme
    { id: "clock-hull", name: "Ironclad Juggernaut", type: "hull", theme: "clockwork", src: "images/vtt_hull_clockwork.jpg" },
    { id: "clock-weap", name: "Gatling Mortar", type: "weapon", theme: "clockwork", src: "images/vtt_weap_clockwork.jpg" },
    { id: "clock-util", name: "Brass Gear", type: "utility", theme: "clockwork", src: "images/vtt_util_clockwork.jpg" },
    
    // Organic Theme
    { id: "org-hull", name: "Biotech Crawler", type: "hull", theme: "organic", src: "images/vtt_hull_organic.jpg" },
    { id: "org-weap", name: "Acid Spitter", type: "weapon", theme: "organic", src: "images/vtt_weap_organic.jpg" },
    { id: "org-util", name: "Chitin Plate", type: "utility", theme: "organic", src: "images/vtt_util_organic.jpg" },

    // Legacy General Items
    { id: "skiff", name: "Skiff Hull", type: "hull", theme: "all", src: "images/vtt_hull_skiff.jpg" },
    { id: "dreadnought", name: "Dreadnought Hull", type: "hull", theme: "all", src: "images/vtt_hull_dreadnought.jpg" },
    { id: "nullsteel", name: "Void-Iron Plate", type: "armor", theme: "all", src: "images/vtt_armor_nullsteel.jpg" },
    { id: "ballista", name: "Ballista", type: "weapon", theme: "all", src: "images/vtt_weapon_ballista.jpg" },
    { id: "disruptor", name: "Disruptor", type: "weapon", theme: "all", src: "images/vtt_weapon_disruptor.jpg" },
];

function renderVTTPalette(filterTheme = 'all') {
    const container = document.getElementById('vtt-dynamic-palette');
    if (!container) return;
    
    // Group by type
    const grouped = {
        'hull': [],
        'weapon': [],
        'armor': [],
        'utility': []
    };
    
    vttCatalog.forEach(item => {
        if (filterTheme === 'all' || item.theme === 'all' || item.theme === filterTheme) {
            if(grouped[item.type]) grouped[item.type].push(item);
        }
    });
    
    let html = '';
    const typeNames = { hull: 'Hulls', weapon: 'Armaments', armor: 'Armor Plates', utility: 'Utilities' };
    
    for (let type in grouped) {
        if (grouped[type].length > 0) {
            html += `<div class="config-group"><h4>${typeNames[type]}</h4><div class="parts-grid">`;
            grouped[type].forEach(item => {
                html += `<img src="${item.src}" class="draggable-part" data-type="${item.type}" data-src="${item.src}" alt="${item.name}" title="${item.name}">`;
            });
            html += `</div></div>`;
        }
    }
    
    container.innerHTML = html;
    
    // Re-bind click events for new palette
    document.querySelectorAll('.draggable-part').forEach(img => {
        img.addEventListener('click', (e) => {
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected');
                activeImageObj = null;
                activeDataType = null;
                return;
            }
            document.querySelectorAll('.draggable-part').forEach(i => i.classList.remove('selected'));
            e.target.classList.add('selected');
            activeImageObj = new Image();
            activeImageObj.src = e.target.getAttribute('data-src');
            activeDataType = e.target.getAttribute('data-type');
            activeRotation = 0; 
            selectedItem = null;
            redrawCanvas();
        });
    });
}

// Bind Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderVTTPalette(e.target.getAttribute('data-filter'));
    });
});


// Canvas Setup
const canvas = document.getElementById('vtt-canvas');
const ctx = canvas.getContext('2d');
let activeImageObj = null;
let activeDataType = null; // 'hull', 'weapon', 'armor'
let activeRotation = 0; // in radians
const placedItems = [];
renderVTTPalette();

// Interaction State
let selectedItem = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Handle Canvas Interactions (Click, Drag, Select)
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // If we have an active item from palette, PLACE IT
    if (activeImageObj) {
        placedItems.push({
            img: activeImageObj,
            type: activeDataType,
            x: x,
            y: y,
            rotation: activeRotation,
            scale: 1.0,
            layer: activeDataType === 'hull' ? 0 : 1 // Hulls at bottom
        });
        
        // Deselect palette so we don't accidentally stamp multiple (optional, but good for UX)
        // Or keep it selected for multiple weapons. Let's keep it selected.
        redrawCanvas();
        return;
    }
    
    // Otherwise, try to SELECT an existing item
    // Search backwards to select top-most item first
    selectedItem = null;
    for (let i = placedItems.length - 1; i >= 0; i--) {
        const item = placedItems[i];
        const w = item.img.width * item.scale;
        const h = item.img.height * item.scale;
        // Basic bounding box check (doesn't account perfectly for rotation, but close enough for VTT tokens)
        if (x >= item.x - w/2 && x <= item.x + w/2 && y >= item.y - h/2 && y <= item.y + h/2) {
            selectedItem = item;
            isDragging = true;
            dragOffsetX = x - item.x;
            dragOffsetY = y - item.y;
            break;
        }
    }
    redrawCanvas();
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && selectedItem) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        selectedItem.x = x - dragOffsetX;
        selectedItem.y = y - dragOffsetY;
        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

// Handle Keyboard Controls
window.addEventListener('keydown', (e) => {
    if (vttModeDiv.style.display !== 'grid') return;
    
    // Rotation for palette active item OR selected canvas item
    if (e.key === 'r' || e.key === 'R') {
        if (selectedItem) {
            selectedItem.rotation += Math.PI / 2;
            redrawCanvas();
        } else if (activeImageObj) {
            activeRotation += Math.PI / 2;
        }
    }
    
    // Scaling and Deletion for selected item
    if (selectedItem) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedItem.scale += 0.1;
            redrawCanvas();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedItem.scale = Math.max(0.2, selectedItem.scale - 0.1);
            redrawCanvas();
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();
            const index = placedItems.indexOf(selectedItem);
            if (index > -1) {
                placedItems.splice(index, 1);
                selectedItem = null;
                redrawCanvas();
            }
        }
    }
});

// Draw Grid function
function drawGrid() {
    if(!ctx) return;
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.5)';
    ctx.lineWidth = 1;
    for(let i=0; i<=800; i+=40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 800); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(800, i); ctx.stroke();
    }
}

// Redraw everything
function redrawCanvas() {
    if(!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background color
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();

    // Sort by layer so hulls are drawn first
    const sortedItems = [...placedItems].sort((a, b) => a.layer - b.layer);

    sortedItems.forEach(item => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        
        const w = item.img.width * item.scale;
        const h = item.img.height * item.scale;
        
        // Highlight if selected
        if (item === selectedItem) {
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.strokeRect(-w/2, -h/2, w, h);
        }
        
        ctx.drawImage(item.img, -w/2, -h/2, w, h);
        ctx.restore();
    });
}

// Initial draw
redrawCanvas();

// Clear Button
document.getElementById('clear-canvas-btn').addEventListener('click', () => {
    placedItems.length = 0;
    selectedItem = null;
    redrawCanvas();
});

// Download Button
document.getElementById('download-vtt-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'custom_vtt_ship.png';
    link.href = dataURL;
    link.click();
});

// ==========================================
// AUTO-VISUALIZER LOGIC
// ==========================================
const autoAssetMap = {
    // Hulls
    'skiff': 'images/auto_hull_skiff.jpg',
    'corpseraft': 'images/auto_hull_corpse.jpg',
    'catamaran': 'images/auto_hull_catamaran.jpg',
    'gunboat': 'images/auto_hull_gunboat.jpg',
    'pinnace': 'images/auto_hull_pinnace.jpg',
    'abolethskiff': 'images/auto_hull_aboleth.jpg',
    'xoriatjunk': 'images/auto_hull_xoriat.jpg',
    'submersible': 'images/auto_hull_sub.jpg',
    'trenchcrawler': 'images/auto_hull_sub.jpg',
    'clipper': 'images/auto_hull_clipper.jpg',
    'galleon': 'images/auto_hull_galleon.jpg',
    'sahuaginraider': 'images/auto_hull_sahuagin.jpg',
    'aetherfrigate': 'images/auto_hull_frigate.jpg',
    'leviathan': 'images/auto_hull_flagship.jpg', // Alias for now
    'necropolis': 'images/auto_hull_corpse.jpg', // Alias
    'dreadnought': 'images/vtt_hull_dreadnought.jpg', // Keep VTT for now if no custom gen
    'nautiloid': 'images/auto_hull_nautiloid.jpg',
    'flagship': 'images/auto_hull_flagship.jpg',
    'behemoth': 'images/auto_hull_behemoth.jpg',

    // Cores
    'elemental': 'images/auto_core_elemental.jpg',
    'necrotic': 'images/auto_core_necrotic.jpg',
    'psionic': 'images/auto_core_psionic.jpg',
    'chronal': 'images/auto_core_chronal.jpg',
    'radiant': 'images/auto_core_radiant.jpg',
    'shadowvortex': 'images/auto_core_shadow.jpg',
    'feyspark': 'images/auto_core_fey.jpg',
    'boundfiend': 'images/auto_core_fiend.jpg',
    'clockwork': 'images/auto_core_clockwork.jpg',

    // Propulsion
    'sails': 'images/auto_prop_sails.jpg',
    'thrusters': 'images/auto_prop_thrusters.jpg',
    'void': 'images/auto_prop_void.jpg',
    'oarbanks': 'images/auto_prop_oars.jpg',
    'waterjets': 'images/auto_prop_jets.jpg',
    'teleport': 'images/auto_prop_teleport.jpg',
    'tentacles': 'images/auto_prop_tentacles.jpg',

    // Armor
    'plated': 'images/auto_armor_plated.jpg',
    'ablative': 'images/auto_armor_ablative.jpg',
    'reflective': 'images/auto_armor_reflective.jpg',
    'spiked': 'images/auto_armor_spiked.jpg',
    'energyshield': 'images/auto_armor_energy.jpg',
    'chameleon': 'images/auto_armor_chameleon.jpg',
    'slime': 'images/auto_armor_slime.jpg',

    // Figurehead
    'dragon': 'images/auto_fig_dragon.jpg',
    'banshee': 'images/auto_fig_banshee.jpg',
    'beholder': 'images/auto_fig_beholder.jpg',
    'medusa': 'images/auto_fig_medusa.jpg',
    'kraken': 'images/auto_fig_kraken.jpg',
    'siren': 'images/auto_fig_siren.jpg',
    'gargoyle': 'images/auto_fig_gargoyle.jpg',

    // Weapons
    'ballista': 'images/auto_weap_ballista.jpg',
    'trebuchet': 'images/auto_weap_trebuchet.jpg',
    'disruptor': 'images/auto_weap_disruptor.jpg',
    'spellcannon': 'images/auto_weap_spellcannon.jpg',
    'lightning': 'images/auto_weap_lightning.jpg',
    'gatling': 'images/auto_weap_gatling.jpg',
    'voidrift': 'images/auto_weap_voidrift.jpg',
    'necrotic': 'images/auto_weap_necrotic.jpg',
    'harpoon': 'images/auto_weap_harpoon.jpg',
    'acidspitter': 'images/auto_weap_acid.jpg',
    'sonic': 'images/auto_weap_sonic.jpg',
    'mindflayer': 'images/auto_weap_mindflayer.jpg',
    'magmamortar': 'images/auto_weap_magma.jpg',
    'cryocaster': 'images/auto_weap_cryo.jpg',
    'ghostfire': 'images/auto_weap_ghostfire.jpg',
    'swarmpod': 'images/auto_weap_swarm.jpg',
    'minelayer': 'images/auto_weap_mine.jpg'
};

function updateVisualizerLayer(layerId, value) {
    const imgEl = document.getElementById(layerId);
    if (!imgEl) return;
    
    if (value && value !== 'none' && value !== 'standard' && autoAssetMap[value]) {
        imgEl.src = autoAssetMap[value];
        imgEl.style.opacity = 1;
    } else {
        imgEl.style.opacity = 0;
    }
}

// Bind to dropdowns
const layerMappings = [
    { selectId: 'select-chassis', layerId: 'vis-layer-hull' },
    { selectId: 'select-core', layerId: 'vis-layer-core' },
    { selectId: 'select-armor', layerId: 'vis-layer-armor' },
    { selectId: 'select-propulsion', layerId: 'vis-layer-propulsion' },
    { selectId: 'select-figurehead', layerId: 'vis-layer-figurehead' },
    { selectId: 'select-weapon', layerId: 'vis-layer-weapon1' },
    { selectId: 'select-weapon2', layerId: 'vis-layer-weapon2' },
    { selectId: 'select-weapon3', layerId: 'vis-layer-weapon3' }
];

layerMappings.forEach(mapping => {
    const selectEl = document.getElementById(mapping.selectId);
    if (selectEl) {
        selectEl.addEventListener('change', (e) => {
            updateVisualizerLayer(mapping.layerId, e.target.value);
        });
        // Initial load
        updateVisualizerLayer(mapping.layerId, selectEl.value);
    }
});


// ==========================================
// CSS THEME LOGIC
// ==========================================
function applyThemeFilter(layerId, themeName) {
    const imgEl = document.getElementById(layerId);
    if (!imgEl) return;
    
    let filterStr = '';
    switch(themeName) {
        case 'arcane':
            filterStr = 'hue-rotate(220deg) saturate(1.5) brightness(1.2)';
            break;
        case 'gothic':
            filterStr = 'grayscale(1) sepia(1) hue-rotate(320deg) saturate(3) brightness(0.7) contrast(1.5)';
            break;
        case 'clockwork':
            filterStr = 'sepia(1) hue-rotate(15deg) saturate(2) brightness(0.9)';
            break;
        case 'organic':
            filterStr = 'hue-rotate(90deg) saturate(2) brightness(0.8) contrast(1.2)';
            break;
        case 'none':
        default:
            filterStr = 'none';
            break;
    }
    
    imgEl.style.filter = filterStr;
}

document.querySelectorAll('.theme-select').forEach(select => {
    select.addEventListener('change', (e) => {
        const layerId = e.target.getAttribute('data-layer');
        const theme = e.target.value;
        applyThemeFilter(layerId, theme);
    });
});
// --- EXPORT, IMPORT, AND PRINT LOGIC ---

document.getElementById('btn-export').addEventListener('click', () => {
    const state = {
        version: "1.2",
        timestamp: new Date().toISOString(),
        name: document.getElementById('custom-name').value,
        chassis: document.getElementById('select-chassis').value,
        material: document.getElementById('select-material').value,
        core: document.getElementById('select-core').value,
        propulsion: document.getElementById('select-propulsion').value,
        armor: document.getElementById('select-armor').value,
        weapon: document.getElementById('select-weapon').value,
        weapon2: document.getElementById('select-weapon2').value,
        weapon3: document.getElementById('select-weapon3').value,
        figurehead: document.getElementById('select-figurehead').value,
        countermeasure: document.getElementById('select-countermeasure').value,
        crew: document.getElementById('select-crew').value,
        auxiliary: document.getElementById('select-auxiliary').value,
        customHpt: document.getElementById('custom-hpt')?.value || ''
    };
    
    // Also grab themes
    const themes = {};
    document.querySelectorAll('.theme-select').forEach(el => {
        themes[el.getAttribute('data-layer')] = el.value;
    });
    state.themes = themes;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", (state.name || "ship") + "_statblock.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});

document.getElementById('input-import').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const state = JSON.parse(e.target.result);
            if(state.name) document.getElementById('custom-name').value = state.name;
            if(state.chassis) document.getElementById('select-chassis').value = state.chassis;
            if(state.material) document.getElementById('select-material').value = state.material;
            if(state.core) document.getElementById('select-core').value = state.core;
            if(state.propulsion) document.getElementById('select-propulsion').value = state.propulsion;
            if(state.armor) document.getElementById('select-armor').value = state.armor;
            if(state.weapon) document.getElementById('select-weapon').value = state.weapon;
            if(state.weapon2) document.getElementById('select-weapon2').value = state.weapon2;
            if(state.weapon3) document.getElementById('select-weapon3').value = state.weapon3;
            if(state.figurehead) document.getElementById('select-figurehead').value = state.figurehead;
            if(state.countermeasure) document.getElementById('select-countermeasure').value = state.countermeasure;
            if(state.crew) document.getElementById('select-crew').value = state.crew;
            if(state.auxiliary) document.getElementById('select-auxiliary').value = state.auxiliary;
            if(state.customHpt && document.getElementById('custom-hpt')) document.getElementById('custom-hpt').value = state.customHpt;

            if (state.themes) {
                document.querySelectorAll('.theme-select').forEach(el => {
                    const layer = el.getAttribute('data-layer');
                    if (state.themes[layer]) {
                        el.value = state.themes[layer];
                    }
                });
            }

            // Trigger updates
            updateCostAndHpt();
            updateVisualizer();
            document.getElementById('btn-build').click();
            alert('Ship loaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Error loading ship file.');
        }
    };
    reader.readAsText(file);
});

document.getElementById('btn-print').addEventListener('click', () => {
    // Only print if the stat block is visible
    if(document.getElementById("statblock-container").classList.contains("hidden")) {
        alert("Please 'Build Ship Stat Block' first before printing.");
        return;
    }
    window.print();
});

// --- CAMPAIGN MANAGER INTEGRATION ---
document.addEventListener('DOMContentLoaded', () => {
    // URL Parameter Loading
    const urlParams = new URLSearchParams(window.location.search);
    const loadId = urlParams.get('load');
    
    if (loadId && window.BQCampaign) {
        const asset = window.BQCampaign.getAsset('ships', loadId);
        if (asset && asset.data) {
            const state = asset.data;
            if(state.name) document.getElementById('custom-name').value = state.name;
            if(state.chassis) document.getElementById('select-chassis').value = state.chassis;
            if(state.material) document.getElementById('select-material').value = state.material;
            if(state.core) document.getElementById('select-core').value = state.core;
            if(state.propulsion) document.getElementById('select-propulsion').value = state.propulsion;
            if(state.armor) document.getElementById('select-armor').value = state.armor;
            if(state.weapon) document.getElementById('select-weapon').value = state.weapon;
            if(state.weapon2) document.getElementById('select-weapon2').value = state.weapon2;
            if(state.weapon3) document.getElementById('select-weapon3').value = state.weapon3;
            if(state.figurehead) document.getElementById('select-figurehead').value = state.figurehead;
            if(state.countermeasure) document.getElementById('select-countermeasure').value = state.countermeasure;
            if(state.crew) document.getElementById('select-crew').value = state.crew;
            if(state.auxiliary) document.getElementById('select-auxiliary').value = state.auxiliary;
            
            if (state.themes) {
                document.querySelectorAll('.theme-select').forEach(el => {
                    const layer = el.getAttribute('data-layer');
                    if (state.themes[layer]) {
                        el.value = state.themes[layer];
                    }
                });
            }
            
            // Build it
            setTimeout(() => {
                if (typeof updateCostAndHpt === 'function') updateCostAndHpt();
                if (typeof updateVisualizer === 'function') updateVisualizer();
                const btnBuild = document.getElementById('btn-build');
                if(btnBuild) btnBuild.click();
            }, 500);
        }
    }
    
    // Save to Binder Button
    const saveBtn = document.getElementById('btn-save-binder');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (!window.BQCampaign) {
                alert("Campaign Manager not loaded.");
                return;
            }
            
            // Get current ship data
            const themes = {};
            document.querySelectorAll('.theme-select').forEach(el => {
                themes[el.getAttribute('data-layer')] = el.value;
            });
            
            const state = {
                name: document.getElementById('custom-name').value || "Unnamed Vessel",
                chassis: document.getElementById('select-chassis').value,
                material: document.getElementById('select-material').value,
                core: document.getElementById('select-core').value,
                propulsion: document.getElementById('select-propulsion').value,
                armor: document.getElementById('select-armor').value,
                weapon: document.getElementById('select-weapon').value,
                weapon2: document.getElementById('select-weapon2').value,
                weapon3: document.getElementById('select-weapon3').value,
                figurehead: document.getElementById('select-figurehead').value,
                countermeasure: document.getElementById('select-countermeasure').value,
                crew: document.getElementById('select-crew').value,
                auxiliary: document.getElementById('select-auxiliary').value,
                themes: themes
            };
            
            const cr = document.getElementById('sb-cr') ? document.getElementById('sb-cr').innerText : '?';
            
            window.BQCampaign.saveAsset('ships', {
                name: state.name,
                type: state.chassis,
                cr: cr,
                data: state
            });
            
            alert("Ship saved to Campaign Binder!");
        });
    }
});
