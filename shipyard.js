// Sovereign Shipyards Logic

// Component Database & Pricing
const catalog = {
    chassis: {
        skiff: { name: "Sluice-Skiff", cost: 2000, type: "Huge Vehicle (Water)", hp: 100, dt: 5, speed: "80 ft.", str: 16, dex: 18, con: 14 },
        galleon: { name: "Ironclad Galleon", cost: 10000, type: "Gargantuan Vehicle (Water)", hp: 300, dt: 15, speed: "40 ft.", str: 20, dex: 10, con: 18 },
        dreadnought: { name: "Subterranean Dreadnought", cost: 25000, type: "Gargantuan Vehicle (Water)", hp: 500, dt: 25, speed: "25 ft.", str: 24, dex: 6, con: 20 }
    },
    armor: {
        iron: { name: "Salvaged Iron", cost: 500, acBonus: 0, traits: [] },
        nullsteel: { name: "Null-Steel Plating", cost: 3000, acBonus: 2, traits: [
            { name: "Magic Dampening", desc: "The ship has advantage on saving throws against spells and magical effects." }
        ]},
        biomantic: { name: "Biomantic Carapace", cost: 4500, acBonus: 1, traits: [
            { name: "Fleshwarped Regeneration", desc: "The ship regains 10 hit points at the start of its turn if it has at least 1 hit point. It is vulnerable to fire damage." }
        ]}
    },
    weapons: {
        ballista: { name: "Heavy Ballista", cost: 1000, action: { name: "Heavy Ballista", desc: "Ranged Weapon Attack: +6 to hit, range 120/480 ft., one target. Hit: 16 (3d10) piercing damage." }},
        siphon: { name: "Alchemical Siphons", cost: 2500, action: { name: "Alchemical Siphon (Recharge 5-6)", desc: "The ship sprays boiling alchemical sludge in a 60-foot cone. Each creature and object in that area must make a DC 15 Dexterity saving throw, taking 21 (6d6) fire and acid damage on a failed save, or half as much damage on a successful one." }},
        disruptor: { name: "Githyanki Disruptor", cost: 5000, action: { name: "Psychic Disruptor Cannon", desc: "Ranged Spell Attack: +8 to hit, range 300 ft., one target. Hit: 22 (4d10) psychic damage. If the target is a vehicle, its speed is reduced by half until the end of its next turn." }}
    },
    upgrades: {
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
    return `${score} (${mod >= 0 ? '+' : ''}${mod})`;
}

// Update total cost continuously
function updateTotalCost() {
    let total = 0;
    
    const chassis = document.querySelector('input[name="chassis"]:checked').value;
    const armor = document.querySelector('input[name="armor"]:checked').value;
    const weapon = document.querySelector('input[name="weapon"]:checked').value;
    const upgrades = document.querySelectorAll('input[name="upgrade"]:checked');

    total += catalog.chassis[chassis].cost;
    total += catalog.armor[armor].cost;
    total += catalog.weapons[weapon].cost;
    upgrades.forEach(u => total += catalog.upgrades[u.value].cost);

    document.getElementById('total-cost-display').textContent = total.toLocaleString();
}

// Listeners
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', updateTotalCost);
});

// Build Stat Block
document.getElementById('btn-build').addEventListener('click', () => {
    // Hide placeholder, show stat block
    document.getElementById('placeholder-panel').classList.add('hidden');
    document.getElementById('statblock-container').classList.remove('hidden');

    // Get selections
    const chassisId = document.querySelector('input[name="chassis"]:checked').value;
    const armorId = document.querySelector('input[name="armor"]:checked').value;
    const weaponId = document.querySelector('input[name="weapon"]:checked').value;
    const upgradeIds = Array.from(document.querySelectorAll('input[name="upgrade"]:checked')).map(cb => cb.value);

    const chassis = catalog.chassis[chassisId];
    const armor = catalog.armor[armorId];
    const weapon = catalog.weapons[weaponId];

    // Populate Header
    document.getElementById('sb-name').textContent = `Custom ${chassis.name}`;
    document.getElementById('sb-type').textContent = chassis.type;

    // Populate Base Stats
    // Base AC based on size + armor
    let baseAc = chassisId === 'skiff' ? 14 : (chassisId === 'galleon' ? 15 : 16);
    document.getElementById('sb-ac').textContent = baseAc + armor.acBonus;
    document.getElementById('sb-ac-desc').textContent = `(${armor.name})`;
    document.getElementById('sb-hp').textContent = chassis.hp;
    document.getElementById('sb-hp-desc').textContent = `(Damage Threshold ${chassis.dt})`;
    document.getElementById('sb-speed').textContent = chassis.speed;

    // Populate Attributes
    document.getElementById('sb-str').textContent = getModString(chassis.str);
    document.getElementById('sb-dex').textContent = getModString(chassis.dex);
    document.getElementById('sb-con').textContent = getModString(chassis.con);

    // Populate Traits
    const traitsContainer = document.getElementById('sb-traits-container');
    traitsContainer.innerHTML = ''; // clear

    let allTraits = [...armor.traits];
    upgradeIds.forEach(id => {
        allTraits = allTraits.concat(catalog.upgrades[id].traits);
    });

    if (allTraits.length === 0) {
        traitsContainer.innerHTML = '<div class="trait"><em>No special traits.</em></div>';
    } else {
        allTraits.forEach(trait => {
            traitsContainer.innerHTML += `<div class="trait"><strong>${trait.name}.</strong> ${trait.desc}</div>`;
        });
    }

    // Populate Actions
    const actionsContainer = document.getElementById('sb-actions-container');
    actionsContainer.innerHTML = `<div class="trait"><strong>${weapon.action.name}.</strong> ${weapon.action.desc}</div>`;
});

// Init
updateTotalCost();
