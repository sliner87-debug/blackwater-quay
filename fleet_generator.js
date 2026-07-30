// Utility to pick a random key from an object
function getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
}

// Faction-specific themes
const factionThemes = {
    abyssal: {
        materials: ["abyssalwood", "bone", "obsidian"],
        cores: ["necrotic", "shadow", "fiend"],
        propulsion: ["tentacles", "void", "sails"],
        weapons: ["necrotic", "acid", "harpoon", "disruptor"],
        names: ["Siren's Call", "Depth Stalker", "Void Leviathan", "Abyssal Maw", "Drowned King", "Shadow's Reach"]
    },
    exchange: {
        materials: ["brass", "iron", "steel"],
        cores: ["clockwork", "radiant", "elemental"],
        propulsion: ["thrusters", "jets", "sails"],
        weapons: ["gatling", "lightning", "magma", "cryo"],
        names: ["Golden Ledger", "Profit's Margin", "Brass Sovereign", "Clockwork Promise", "Gilded Talon", "Iron Deficit"]
    },
    sablehook: {
        materials: ["wood", "iron", "abyssalwood"],
        cores: ["fey", "elemental", "shadow"],
        propulsion: ["sails", "oars", "thrusters"],
        weapons: ["ballista", "harpoon", "gatling", "mine"],
        names: ["Bloody Wake", "Scoundrel's Luck", "Riptide", "Crimson Corsair", "Black Flag", "Mutiny's Ghost"]
    },
    random: null // Handled dynamically
};

const shipRoles = {
    flagship: { chassisPool: ["flagship", "galleon", "dreadnought", "behemoth"], weaponCount: 3, hpBonus: 200, acBonus: 2 },
    escort: { chassisPool: ["frigate", "clipper", "catamaran", "xoriat"], weaponCount: 2, hpBonus: 50, acBonus: 1 },
    gunboat: { chassisPool: ["gunboat", "pinnace", "skiff", "corpse"], weaponCount: 1, hpBonus: 0, acBonus: 0 }
};

function generateShip(role, faction) {
    const theme = faction === "random" ? null : factionThemes[faction];
    const roleStats = shipRoles[role];
    
    // Select Chassis
    const chassisId = roleStats.chassisPool[Math.floor(Math.random() * roleStats.chassisPool.length)];
    const chassis = catalog.chassis[chassisId];
    
    // Select Material
    let matId = theme ? theme.materials[Math.floor(Math.random() * theme.materials.length)] : getRandomKey(catalog.materials);
    const material = catalog.materials[matId];
    
    // Select Core
    let coreId = theme ? theme.cores[Math.floor(Math.random() * theme.cores.length)] : getRandomKey(catalog.cores);
    const core = catalog.cores[coreId];
    
    // Select Propulsion
    let propId = theme ? theme.propulsion[Math.floor(Math.random() * theme.propulsion.length)] : getRandomKey(catalog.propulsion);
    const propulsion = catalog.propulsion[propId];
    
    // Calculate Base Stats
    let ac = 10 + material.acMod + roleStats.acBonus;
    if(chassisId === "dreadnought") ac += 2;
    if(chassisId === "skiff") ac -= 2;
    
    let hp = chassis.baseHp + material.hpMod + roleStats.hpBonus;
    let speed = propulsion.speed;
    
    // Select Weapons
    let weapons = [];
    for(let i=0; i<roleStats.weaponCount; i++) {
        let weapId = theme ? theme.weapons[Math.floor(Math.random() * theme.weapons.length)] : getRandomKey(catalog.weapons);
        weapons.push(catalog.weapons[weapId]);
    }
    
    // Select Name
    let shipName = "Unknown Vessel";
    if (theme) {
        shipName = theme.names[Math.floor(Math.random() * theme.names.length)] + " " + Math.floor(Math.random() * 99 + 1);
    } else {
        shipName = "Corsair " + Math.floor(Math.random() * 999);
    }
    
    return {
        role: role,
        name: shipName,
        chassisName: chassis.name,
        materialName: material.name,
        coreName: core.name,
        propName: propulsion.name,
        ac: ac,
        hp: hp,
        speed: speed,
        weapons: weapons
    };
}

function renderShipCard(ship) {
    let weaponHTML = '';
    ship.weapons.forEach(w => {
        weaponHTML += `<div class="weapon-item"><strong>${w.name}:</strong> ${w.damage} (${w.range})</div>`;
    });
    
    return `
        <div class="ship-card ${ship.role}">
            <div class="ship-role">${ship.role.toUpperCase()}</div>
            <div class="ship-name">${ship.name}</div>
            <div class="ship-chassis">${ship.materialName} ${ship.chassisName}</div>
            
            <div class="stat-row">
                <span class="stat-label">Armor Class</span>
                <span class="stat-value">${ship.ac}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Hit Points</span>
                <span class="stat-value">${ship.hp}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Speed</span>
                <span class="stat-value">${ship.speed}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Power Core</span>
                <span class="stat-value">${ship.coreName}</span>
            </div>
            
            <div class="weapon-list">
                ${weaponHTML}
            </div>
        </div>
    `;
}

document.getElementById('btn-generate-fleet').addEventListener('click', () => {
    // Play dice roll sound
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=dice-roll.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play prevented:', e));

    const threat = document.getElementById('fleet-threat').value;
    const faction = document.getElementById('fleet-faction').value;
    const output = document.getElementById('fleet-output');
    
    let fleetComposition = [];
    if (threat === 'skirmish') {
        fleetComposition = ['escort', 'gunboat', 'gunboat'];
    } else if (threat === 'raid') {
        fleetComposition = ['flagship', 'escort', 'escort', 'gunboat', 'gunboat', 'gunboat'];
    } else if (threat === 'armada') {
        fleetComposition = ['flagship', 'flagship', 'escort', 'escort', 'escort', 'escort', 'gunboat', 'gunboat', 'gunboat', 'gunboat', 'gunboat', 'gunboat', 'gunboat', 'gunboat'];
    }
    
    let html = '';
    let fleetData = [];
    fleetComposition.forEach(role => {
        const ship = generateShip(role, faction);
        fleetData.push(ship);
        html += renderShipCard(ship);
    });
    
    output.innerHTML = html;
    
    // Save to LocalStorage
    localStorage.setItem('bq_saved_fleet', html);
    localStorage.setItem('bq_saved_fleet_json', JSON.stringify(fleetData, null, 2));
});

// Restore on load
document.addEventListener('DOMContentLoaded', () => {
    const savedFleet = localStorage.getItem('bq_saved_fleet');
    if (savedFleet) {
        document.getElementById('fleet-output').innerHTML = savedFleet;
    }
    
    const btnCopy = document.getElementById('btn-copy-fleet');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const json = localStorage.getItem('bq_saved_fleet_json');
            if (json) {
                navigator.clipboard.writeText(json).then(() => {
                    btnCopy.textContent = "Copied!";
                    setTimeout(() => btnCopy.textContent = "Copy as JSON", 2000);
                });
            }
        });
    }
});
