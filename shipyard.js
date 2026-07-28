// Sovereign Shipyards Logic

// Component Database & Pricing
const catalog = {
    chassis: {
        skiff: { name: "Sluice-Skiff", cost: 2000, type: "Huge Vehicle (Water)", hp: 100, dt: 5, speedBase: 80, str: 16, dex: 18, con: 14, sizeBaseAc: 14, crewMin: 1, crewMax: 2, cargo: "1 ton" },
        gunboat: { name: "Assault Gunboat", cost: 6000, type: "Huge Vehicle (Water)", hp: 150, dt: 10, speedBase: 70, str: 18, dex: 16, con: 16, sizeBaseAc: 14, crewMin: 4, crewMax: 8, cargo: "5 tons" },
        pinnace: { name: "Smuggler\'s Pinnace", cost: 8000, type: "Gargantuan Vehicle (Water)", hp: 250, dt: 10, speedBase: 60, str: 16, dex: 16, con: 16, sizeBaseAc: 15, crewMin: 5, crewMax: 15, cargo: "50 tons" },
        submersible: { name: "Deep-Sea Submersible", cost: 12000, type: "Huge Vehicle (Water)", hp: 200, dt: 15, speedBase: 30, str: 18, dex: 12, con: 18, sizeBaseAc: 16, crewMin: 4, crewMax: 6, cargo: "5 tons" },
        clipper: { name: "Aether-Clipper", cost: 15000, type: "Gargantuan Vehicle (Water)", hp: 250, dt: 10, speedBase: 90, str: 16, dex: 18, con: 14, sizeBaseAc: 15, crewMin: 10, crewMax: 20, cargo: "30 tons" },
        galleon: { name: "Ironclad Galleon", cost: 10000, type: "Gargantuan Vehicle (Water)", hp: 300, dt: 15, speedBase: 40, str: 20, dex: 10, con: 18, sizeBaseAc: 15, crewMin: 20, crewMax: 40, cargo: "100 tons" },
        barge: { name: "Necromancer\'s Barge", cost: 5000, type: "Gargantuan Vehicle (Water)", hp: 350, dt: 10, speedBase: 25, str: 18, dex: 8, con: 20, sizeBaseAc: 14, crewMin: 2, crewMax: 5, cargo: "200 tons (Corpses)" },
        leviathan: { name: "Leviathan Hunter", cost: 18000, type: "Gargantuan Vehicle (Water)", hp: 400, dt: 20, speedBase: 35, str: 22, dex: 10, con: 20, sizeBaseAc: 16, crewMin: 30, crewMax: 50, cargo: "80 tons" },
        dreadnought: { name: "Subterranean Dreadnought", cost: 25000, type: "Gargantuan Vehicle (Water)", hp: 500, dt: 25, speedBase: 25, str: 24, dex: 6, con: 20, sizeBaseAc: 16, crewMin: 80, crewMax: 120, cargo: "500 tons" },
        flagship: { name: "Sovereign Flagship", cost: 100000, type: "Colossal Vehicle (Water)", hp: 800, dt: 30, speedBase: 20, str: 26, dex: 4, con: 22, sizeBaseAc: 18, crewMin: 200, crewMax: 300, cargo: "2000 tons" },
        custom: { name: "Custom Blueprint", cost: 0, type: "Custom Vehicle", hp: 100, dt: 0, speedBase: 30, str: 10, dex: 10, con: 10, sizeBaseAc: 10, crewMin: 1, crewMax: 1, cargo: "0 tons" }
    },
    materials: {
        standard: { name: "Standard Oak", cost: 0, speedMod: 0, hpMod: 0, dtMod: 0, traits: [] },
        darkwood: { name: "Shadow-Stitched Darkwood", cost: 5000, speedMod: 10, hpMod: 0, dtMod: 0, traits: [{ name: "Darkwood Hull", desc: "The ship is extremely light but vulnerable to fire damage." }] },
        deepiron: { name: "Forged Deep-Iron", cost: 8000, speedMod: -10, hpMod: 50, dtMod: 5, traits: [{ name: "Ironclad Mass", desc: "The ship sinks if it is destroyed, rather than breaking apart on the surface." }] },
        fleshwarped: { name: "Biomantic Flesh-Carapace", cost: 12000, speedMod: 0, hpMod: 100, dtMod: 0, traits: [{ name: "Living Vessel", desc: "The ship can be healed by magical healing as if it were a creature." }] }
    },
    
    cores: {
        standard: { name: "Standard Furnace", cost: 0, traits: [] },
        void: { name: "Bound Void-Elemental", cost: 10000, traits: [{ name: "Volatile Core", desc: "Generates massive power. If the ship takes critical damage, the elemental may break loose and attack the crew." }] },
        necrotic: { name: "Necrotic Engine", cost: 12000, traits: [{ name: "Soul-Fueled", desc: "When the ship destroys another vessel, it gains temporary HP equal to the destroyed ship\'s max HP." }] },
        blood: { name: "Blood-Fuel Drive", cost: 8000, traits: [{ name: "Biomantic Sprint", desc: "Consumes raw meat/blood to double the ship\'s speed for 1 minute." }] }
    },
    figureheads: {
        none: { name: "None", cost: 0, traits: [] },
        gorgon: { name: "Gorgon\'s Visage", cost: 4000, traits: [{ name: "Petrifying Gaze (1/Day)", desc: "Casts a petrifying beam in a 60-foot line off the bow (DC 15 CON)." }] },
        breacher: { name: "Breacher\'s Ram", cost: 2500, traits: [{ name: "Deep-Iron Spike", desc: "Deals double damage when ramming other ships or huge+ sea monsters." }] },
        aether: { name: "Aether-Seer Array", cost: 6000, traits: [{ name: "Crystal Eye", desc: "Detects invisible creatures, underwater mines, or magical traps up to 1 mile away." }] }
    },
    countermeasures: {
        none: { name: "None", cost: 0, traits: [] },
        smoke: { name: "Alchemical Smoke-Stacks", cost: 2000, traits: [{ name: "Obscurement (3/Day)", desc: "Deploys a thick cloud of toxic gas (60 ft radius) blocking line of sight." }] },
        decoy: { name: "Illusory Decoys", cost: 4500, traits: [{ name: "Phantom Duplicate (1/Day)", desc: "Projects a perfect phantom duplicate of the ship 100 feet away to draw enemy fire." }] },
        reflect: { name: "Spell-Reflection Shielding", cost: 8000, traits: [{ name: "Arcane Mirror (1/Day)", desc: "Bounces a single targeted spell of 5th level or lower back at the caster." }] }
    },
    crew: {
        standard: { name: "Standard Hired Crew", cost: 0, traits: [] },
        skeletal: { name: "Skeletal Laborers", cost: 1000, traits: [{ name: "Undead Crew", desc: "Cheap, tireless, and immune to poison/charm, but terrible at complex tasks (Disadvantage on skill checks)." }] },
        sablehook: { name: "Sablehook Smugglers", cost: 3000, traits: [{ name: "Underworld Contacts", desc: "Grants advantage on Deception and Persuasion checks when dealing with underworld authorities." }] },
        thessalan: { name: "Thessalan Mutants", cost: 4000, traits: [{ name: "Brutish Boarders", desc: "Automatically grapple enemies they engage during ship-to-ship boarding combat." }] }
    },
    auxiliary: {
        none: { name: "None", cost: 0, traits: [] },
        divebells: { name: "Dive-Bells", cost: 5000, traits: [{ name: "Deep-Sea Pods", desc: "Small, heavily armored pods for dropping a 4-man party to the extreme ocean floor safely." }] },
        kites: { name: "Boarding-Kites", cost: 1500, traits: [{ name: "Assault Gliders", desc: "Allows the crew to launch themselves into the rigging of enemy ships up to 150 feet away." }] }
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
        mangonel: { name: "Siege Mangonel", cost: 1500, action: { name: "Mangonel", desc: "Ranged Weapon Attack: +5 to hit, range 200/800 ft. (can\'t hit targets within 60 ft.), one target. Hit: 27 (5d10) bludgeoning damage." }},
        cannon: { name: "Broadside Cannon", cost: 3000, action: { name: "Broadside Cannon", desc: "Ranged Weapon Attack: +6 to hit, range 600/2,400 ft., one target. Hit: 44 (8d10) bludgeoning damage." }},
        greekfire: { name: "Greek Fire Siphon", cost: 2500, action: { name: "Fire Siphon (Recharge 5-6)", desc: "Sprays fire in a 60-foot cone. Each creature and object must make a DC 15 Dexterity saving throw, taking 21 (6d6) fire damage on a failed save." }},
        harpoon: { name: "Whaler\'s Harpoon Gun", cost: 1500, action: { name: "Harpoon Shot", desc: "Ranged Weapon Attack: +6 to hit, range 100/300 ft., one target. Hit: 11 (2d10) piercing damage, and the target is grappled (escape DC 14)." }},
        trebuchet: { name: "Fletched Trebuchet", cost: 4000, action: { name: "Trebuchet", desc: "Ranged Weapon Attack: +5 to hit, range 300/1,200 ft. (can\'t hit targets within 60 ft.). Hit: 44 (8d10) bludgeoning damage." }},
        disruptor: { name: "Githyanki Disruptor", cost: 5000, action: { name: "Psychic Disruptor", desc: "Ranged Spell Attack: +8 to hit, range 300 ft., one target. Hit: 22 (4d10) psychic damage. Target vehicle\'s speed is halved." }},
        spellcannon: { name: "Arcane Spell-Cannon", cost: 8000, action: { name: "Channel Arcana", desc: "Gunner expends a spell slot. Ranged Spell Attack: +8 to hit, 150 ft. Hit: 1d10 force damage per level of the spell slot expended." }},
        lightning: { name: "Lightning Emitter", cost: 6000, action: { name: "Lightning Arc (Recharge 5-6)", desc: "Fires a 100ft line of lightning. DC 16 Dex save for 28 (8d6) lightning damage. Double damage to Deep-Iron ships." }},
        gatling: { name: "Eldritch Gatling", cost: 7500, action: { name: "Eldritch Burst", desc: "Fires 1d4+1 homing magic missiles. Each deals 1d4+1 force damage. No attack roll required." }},
        voidrift: { name: "Void-Rift Projector", cost: 12000, action: { name: "Singularity (1/Day)", desc: "Creates a 30ft radius singularity 120ft away. Ships inside must make a DC 18 STR save or be pulled 30ft to the center and take 55 (10d10) force damage." }},
        necrotic: { name: "Necrotic Torpedo", cost: 9000, action: { name: "Soul-Seeker", desc: "Fires a slow moving torpedo that homes in on the nearest living crew. Deals 8d10 necrotic damage on impact." }}
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
        const core = document.querySelector("input[name=\'core\']:checked").value;
        const propulsion = document.querySelector("input[name=\'propulsion\']:checked").value;
        const armor = document.querySelector("input[name=\'armor\']:checked").value;
        const weapon = document.querySelector("input[name=\'weapon\']:checked").value;
        const figurehead = document.querySelector("input[name=\'figurehead\']:checked").value;
        const countermeasure = document.querySelector("input[name=\'countermeasure\']:checked").value;
        const crew = document.querySelector("input[name=\'crew\']:checked").value;
        const auxiliary = document.querySelector("input[name=\'auxiliary\']:checked").value;
        const upgrades = document.querySelectorAll("input[name=\'upgrade\']:checked");

        total += catalog.chassis[chassis].cost;
        total += catalog.materials[material].cost;
        total += catalog.cores[core].cost;
        total += catalog.propulsion[propulsion].cost;
        total += catalog.armor[armor].cost;
        total += catalog.weapons[weapon].cost;
        total += catalog.figureheads[figurehead].cost;
        total += catalog.countermeasures[countermeasure].cost;
        total += catalog.crew[crew].cost;
        total += catalog.auxiliary[auxiliary].cost;
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
    const coreId = document.querySelector("input[name=\'core\']:checked").value;
    const propulsionId = document.querySelector("input[name=\'propulsion\']:checked").value;
    const armorId = document.querySelector("input[name=\'armor\']:checked").value;
    const weaponId = document.querySelector("input[name=\'weapon\']:checked").value;
    const figureheadId = document.querySelector("input[name=\'figurehead\']:checked").value;
    const countermeasureId = document.querySelector("input[name=\'countermeasure\']:checked").value;
    const crewId = document.querySelector("input[name=\'crew\']:checked").value;
    const auxiliaryId = document.querySelector("input[name=\'auxiliary\']:checked").value;
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
            cargo: document.getElementById("custom-cargo").value || "10 tons"
        };
    }
    const core = catalog.cores[coreId];
    const prop = catalog.propulsion[propulsionId];
    const armor = catalog.armor[armorId];
    const weapon = catalog.weapons[weaponId];
    const figurehead = catalog.figureheads[figureheadId];
    const countermeasure = catalog.countermeasures[countermeasureId];
    const crew = catalog.crew[crewId];
    const auxiliary = catalog.auxiliary[auxiliaryId];

    document.getElementById("sb-name").textContent = "Custom " + material.name + " " + chassis.name;
    document.getElementById("sb-type").textContent = chassis.type;

    let baseAc = chassis.sizeBaseAc;
    document.getElementById("sb-ac").textContent = baseAc + armor.acBonus;
    document.getElementById("sb-ac-desc").textContent = "(" + armor.name + ")";
    
    document.getElementById("sb-hp").textContent = chassis.hp + material.hpMod;
    document.getElementById("sb-hp-desc").textContent = "(Damage Threshold " + (chassis.dt + material.dtMod) + ")";
    
    document.getElementById("sb-speed").textContent = (chassis.speedBase + material.speedMod) + " ft.";
    document.getElementById("sb-crew").textContent = chassis.crewMin + "-" + chassis.crewMax;
    document.getElementById("sb-cargo").textContent = chassis.cargo;

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


// Toggle Custom Builder UI
document.getElementById('chassis-grid').addEventListener('change', (e) => {
    const customFields = document.getElementById('custom-blueprint-fields');
    if(e.target.value === 'custom') {
        customFields.style.display = 'block';
    } else if(e.target.name === 'chassis') {
        customFields.style.display = 'none';
    }
});
