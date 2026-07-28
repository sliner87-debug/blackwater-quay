// Sovereign Shipyards Logic

// Component Database & Pricing
const catalog = {
    chassis: {
        skiff: { name: "Sluice-Skiff", cost: 2000, type: "Huge Vehicle (Water)", hp: 100, dt: 5, speedBase: 80, str: 16, dex: 18, con: 14, sizeBaseAc: 14 },
        galleon: { name: "Ironclad Galleon", cost: 10000, type: "Gargantuan Vehicle (Water)", hp: 300, dt: 15, speedBase: 40, str: 20, dex: 10, con: 18, sizeBaseAc: 15 },
        dreadnought: { name: "Subterranean Dreadnought", cost: 25000, type: "Gargantuan Vehicle (Water)", hp: 500, dt: 25, speedBase: 25, str: 24, dex: 6, con: 20, sizeBaseAc: 16 }
    },
    materials: {
        standard: { name: "Standard Oak", cost: 0, speedMod: 0, hpMod: 0, dtMod: 0, traits: [] },
        darkwood: { name: "Shadow-Stitched Darkwood", cost: 5000, speedMod: 10, hpMod: 0, dtMod: 0, traits: [{ name: "Darkwood Hull", desc: "The ship is extremely light but vulnerable to fire damage." }] },
        deepiron: { name: "Forged Deep-Iron", cost: 8000, speedMod: -10, hpMod: 50, dtMod: 5, traits: [{ name: "Ironclad Mass", desc: "The ship sinks if it is destroyed, rather than breaking apart on the surface." }] },
        fleshwarped: { name: "Biomantic Flesh-Carapace", cost: 12000, speedMod: 0, hpMod: 100, dtMod: 0, traits: [{ name: "Living Vessel", desc: "The ship can be healed by magical healing as if it were a creature." }] }
    },
    propulsion: {
        sails: { name: "Standard Rigging", cost: 0, traits: [] },
        shadowsilk: { name: "Shadow-Silk Sails", cost: 3000, traits: [{ name: "Whisper-Quiet", desc: "The ship has advantage on Dexterity (Stealth) checks made in dim light or darkness." }] },
        aether: { name: "Aether-Rotors", cost: 8000, traits: [{ name: "Hover Jets", desc: "The ship ignores difficult terrain caused by water conditions and can hover over gaps up to 30 feet wide." }] },
        submersible: { name: "Submersible Ballasts", cost: 15000, traits: [{ name: "Dive Module", desc: "The ship gains a swimming speed equal to its sailing speed and can remain submerged safely." }] }
    },
    armor: {
        none: { name: "No Armor", cost: 0, acBonus: 0, traits: [] },
        iron: { name: "Salvaged Iron Plating", cost: 500, acBonus: 1, traits: [] },
        nullsteel: { name: "Null-Steel Plating", cost: 3000, acBonus: 2, traits: [
            { name: "Magic Dampening", desc: "The ship has advantage on saving throws against spells and magical effects." }
        ]},
        biomantic: { name: "Regenerative Tissue", cost: 4500, acBonus: 1, traits: [
            { name: "Fleshwarped Regeneration", desc: "The ship regains 10 hit points at the start of its turn if it has at least 1 hit point." }
        ]}
    },
    weapons: {
        ballista: { name: "Heavy Ballista", cost: 1000, action: { name: "Heavy Ballista", desc: "Ranged Weapon Attack: +6 to hit, range 120/480 ft., one target. Hit: 16 (3d10) piercing damage." }},
        siphon: { name: "Alchemical Siphons", cost: 2500, action: { name: "Alchemical Siphon (Recharge 5-6)", desc: "The ship sprays boiling alchemical sludge in a 60-foot cone. Each creature and object in that area must make a DC 15 Dexterity saving throw, taking 21 (6d6) fire and acid damage on a failed save, or half as much damage on a successful one." }},
        disruptor: { name: "Githyanki Disruptor", cost: 5000, action: { name: "Psychic Disruptor Cannon", desc: "Ranged Spell Attack: +8 to hit, range 300 ft., one target. Hit: 22 (4d10) psychic damage. If the target is a vehicle, its speed is reduced by half until the end of its next turn." }},
        harpoon: { name: "Whaler\'s Harpoon Gun", cost: 1500, action: { name: "Harpoon Shot", desc: "Ranged Weapon Attack: +6 to hit, range 100/300 ft., one target. Hit: 11 (2d10) piercing damage, and the target is grappled (escape DC 14). Until the grapple ends, the target cannot move farther away from the ship." }},
        spellcannon: { name: "Arcane Spell-Cannon", cost: 8000, action: { name: "Channel Arcana", desc: "The gunner can expend a spell slot of 1st level or higher to fire a blast of pure magic. Ranged Spell Attack: +8 to hit, range 150 ft., one target. Hit: 1d10 force damage per level of the spell slot expended." }},
        depthcharge: { name: "Abyssal Depth Charges", cost: 3000, action: { name: "Drop Depth Charge (Recharge 4-6)", desc: "The ship drops an explosive payload. At the end of the ship\'s turn, it detonates in a 30-foot radius sphere. All creatures and vehicles in that area must make a DC 15 Constitution saving throw, taking 35 (10d6) thunder damage on a failed save." }}
    },
    upgrades: {
        smuggler: { name: "Smuggler\'s Hold", cost: 2000, traits: [
            { name: "Lead-Lined Compartment", desc: "Items inside the hold cannot be detected by divination magic such as Detect Magic or Locate Object." }
        ]},
        biolab: { name: "Biomancer\'s Lab", cost: 5000, traits: [
            { name: "Mobile Laboratory", desc: "Provides advantage on checks made to craft alchemical items or flesh-grafts while underway." }
        ]},
        brig: { name: "Null-Brig", cost: 4000, traits: [
            { name: "Dampening Cells", desc: "Creatures locked inside the brig cannot cast spells with verbal or somatic components, and magic items they carry become mundane." }
        ]},
        chronal: { name: "Chronal Engine", cost: 4000, traits: [
            { name: "Chronal Override (1/Day)", desc: "The captain can push the engine into overdrive. The ship can immediately take one additional action on its turn." }
        ]},
        vats: { name: "Thessalan Vats", cost: 2500, traits: [
            { name: "Biomantic Support System", desc: "Living crew members aboard the ship regain 1d6 hit points at the start of each of their turns." }
        ]},
        triweave: { name: "Tri-Weave Cloaking", cost: 6000, traits: [
            { name: "Sovereign Shroud (1/Day)", desc: "The ship and everything aboard it becomes invisible to normal sight and magical scrying (like the Nondetection spell) for 1 hour, or until the ship makes an attack." }
        ]}
    }
};

// Calculate stat modifier string
function getModString(score) {
    const mod = Math.floor((score - 10) / 2);
    return score + " (" + (mod >= 0 ? "+" : "") + mod + ")";
}

// Update total cost continuously
function updateTotalCost() {
    let total = 0;
    
    // Using try-catch because UI might not be fully loaded or sections might be collapsed
    try {
        const chassis = document.querySelector("input[name=\'chassis\']:checked").value;
        const material = document.querySelector("input[name=\'material\']:checked").value;
        const propulsion = document.querySelector("input[name=\'propulsion\']:checked").value;
        const armor = document.querySelector("input[name=\'armor\']:checked").value;
        const weapon = document.querySelector("input[name=\'weapon\']:checked").value;
        const upgrades = document.querySelectorAll("input[name=\'upgrade\']:checked");

        total += catalog.chassis[chassis].cost;
        total += catalog.materials[material].cost;
        total += catalog.propulsion[propulsion].cost;
        total += catalog.armor[armor].cost;
        total += catalog.weapons[weapon].cost;
        upgrades.forEach(u => total += catalog.upgrades[u.value].cost);

        document.getElementById("total-cost-display").textContent = total.toLocaleString();
    } catch(e) {}
}

// Build Stat Block
document.getElementById("btn-build").addEventListener("click", () => {
    document.getElementById("placeholder-panel").classList.add("hidden");
    document.getElementById("statblock-container").classList.remove("hidden");

    const chassisId = document.querySelector("input[name=\'chassis\']:checked").value;
    const materialId = document.querySelector("input[name=\'material\']:checked").value;
    const propulsionId = document.querySelector("input[name=\'propulsion\']:checked").value;
    const armorId = document.querySelector("input[name=\'armor\']:checked").value;
    const weaponId = document.querySelector("input[name=\'weapon\']:checked").value;
    const upgradeIds = Array.from(document.querySelectorAll("input[name=\'upgrade\']:checked")).map(cb => cb.value);

    const chassis = catalog.chassis[chassisId];
    const material = catalog.materials[materialId];
    const prop = catalog.propulsion[propulsionId];
    const armor = catalog.armor[armorId];
    const weapon = catalog.weapons[weaponId];

    document.getElementById("sb-name").textContent = "Custom " + material.name + " " + chassis.name;
    document.getElementById("sb-type").textContent = chassis.type;

    let baseAc = chassis.sizeBaseAc;
    document.getElementById("sb-ac").textContent = baseAc + armor.acBonus;
    document.getElementById("sb-ac-desc").textContent = "(" + armor.name + ")";
    
    document.getElementById("sb-hp").textContent = chassis.hp + material.hpMod;
    document.getElementById("sb-hp-desc").textContent = "(Damage Threshold " + (chassis.dt + material.dtMod) + ")";
    
    document.getElementById("sb-speed").textContent = (chassis.speedBase + material.speedMod) + " ft.";

    document.getElementById("sb-str").textContent = getModString(chassis.str);
    document.getElementById("sb-dex").textContent = getModString(chassis.dex);
    document.getElementById("sb-con").textContent = getModString(chassis.con);

    const traitsContainer = document.getElementById("sb-traits-container");
    traitsContainer.innerHTML = "";

    let allTraits = [];
    allTraits = allTraits.concat(material.traits);
    allTraits = allTraits.concat(prop.traits);
    allTraits = allTraits.concat(armor.traits);
    upgradeIds.forEach(id => {
        allTraits = allTraits.concat(catalog.upgrades[id].traits);
    });

    if (allTraits.length === 0) {
        traitsContainer.innerHTML = "<div class=\'trait\'><em>No special traits.</em></div>";
    } else {
        allTraits.forEach(trait => {
            traitsContainer.innerHTML += "<div class=\'trait\'><strong>" + trait.name + ".</strong> " + trait.desc + "</div>";
        });
    }

    const actionsContainer = document.getElementById("sb-actions-container");
    actionsContainer.innerHTML = "<div class=\'trait\'><strong>" + weapon.action.name + ".</strong> " + weapon.action.desc + "</div>";
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

// Canvas Setup
const canvas = document.getElementById('vtt-canvas');
const ctx = canvas.getContext('2d');
let activeImageObj = null;
let activeRotation = 0; // in radians
const placedItems = [];

// Handle Palette Selection
document.querySelectorAll('.draggable-part').forEach(img => {
    img.addEventListener('click', (e) => {
        // Clear previous selection
        document.querySelectorAll('.draggable-part').forEach(i => i.classList.remove('selected'));
        // Select new
        e.target.classList.add('selected');
        
        // Load image obj
        activeImageObj = new Image();
        activeImageObj.src = e.target.getAttribute('data-src');
        activeRotation = 0; // reset rotation
    });
});

// Handle Keyboard Rotation
window.addEventListener('keydown', (e) => {
    if ((e.key === 'r' || e.key === 'R') && vttModeDiv.style.display === 'grid') {
        activeRotation += Math.PI / 2; // Rotate 90 degrees
    }
});

// Handle Canvas Click (Place Object)
canvas.addEventListener('click', (e) => {
    if (!activeImageObj) return;
    
    // Get mouse pos relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    placedItems.push({
        img: activeImageObj,
        x: x,
        y: y,
        rotation: activeRotation
    });
    
    redrawCanvas();
});

// Draw Grid function (optional but helpful for VTT)
function drawGrid() {
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.5)';
    ctx.lineWidth = 1;
    for(let i=0; i<=800; i+=40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 800); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(800, i); ctx.stroke();
    }
}

// Redraw everything
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background color
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();

    placedItems.forEach(item => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        // Draw centered
        const w = item.img.width;
        const h = item.img.height;
        ctx.drawImage(item.img, -w/2, -h/2, w, h);
        ctx.restore();
    });
}

// Initial draw
redrawCanvas();

// Clear Button
document.getElementById('clear-canvas-btn').addEventListener('click', () => {
    placedItems.length = 0;
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
