// fleet_generator.js
// Procedural Fleet Engine for Blackwater Quay
const fleetData = {
    factions: [
        { id: "thessalan", name: "Thessalan Consortium", hulls: ["Ironclad Dreadnought", "Brass-Plated Frigate", "Clockwork Skiff"], colors: ["Brass", "Black", "Crimson"] },
        { id: "covenant", name: "The Covenant of the Cleansing Flame", hulls: ["Sun-Barque", "Purifier Galleon", "Radiant Pinnace"], colors: ["White", "Gold", "Silver"] },
        { id: "crimson", name: "The Crimson Corsairs", hulls: ["Bone-Plated Cutter", "Slaver's Carrack", "Blood-Wake Gunboat"], colors: ["Red", "Bone", "Rust"] },
        { id: "void", name: "Void-Touched Horrors", hulls: ["Flesh-Tethered Hulk", "Abyssal Leviathan", "Screaming Nautilus"], colors: ["Void-Black", "Deep Purple", "Sickly Green"] }
    ],
    adjectives: ["Relentless", "Damned", "Silent", "Iron", "Vengeful", "Howling", "Shattered", "Burning", "Sunken"],
    nouns: ["Wake", "Tide", "Revenant", "Harpoon", "Kraken", "Scourge", "Vanguard", "Prophet", "Wraith"],
    captainTraits: ["Ruthless tactician", "Void-mad zealot", "Brilliant artillerist", "Mutated abomination", "Cunning trickster", "Fanatical inquisitor"],
    quirks: [
        "The ship's hull bleeds a thick black ichor.",
        "The crew fights in complete, unnatural silence.",
        "The cannons fire shrieking aether-shells.",
        "The ship leaves a trail of frozen water in its wake.",
        "The rigging is made of woven tendons."
    ]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateFleet(factionId, size) {
    let faction = fleetData.factions.find(f => f.id === factionId);
    if (!faction) faction = getRandom(fleetData.factions);

    let fleet = [];
    const count = size === "small" ? 3 : size === "medium" ? 5 : 8;

    for (let i = 0; i < count; i++) {
        let isFlagship = i === 0;
        let shipName = `The ${getRandom(fleetData.adjectives)} ${getRandom(fleetData.nouns)}`;
        let hull = getRandom(faction.hulls);
        if (isFlagship && faction.id === "void") hull = "Behemoth Flesh-Ship (Flagship)";
        else if (isFlagship) hull = `Heavy ${hull} (Flagship)`;
        
        fleet.push({
            name: shipName,
            faction: faction.name,
            hull: hull,
            hp: isFlagship ? 250 : Math.floor(Math.random() * 50) + 80,
            ac: isFlagship ? 18 : 15,
            captain: isFlagship ? getRandom(fleetData.captainTraits) : "Standard Officer",
            quirk: getRandom(fleetData.quirks),
            isFlagship: isFlagship
        });
    }
    return fleet;
}

function renderFleet(fleet) {
    let html = '';
    fleet.forEach((ship, index) => {
        let borderColor = ship.isFlagship ? "#d4af37" : "#475569";
        html += `
            <div class="ship-card" data-index="${index}" style="border: 1px solid ${borderColor}; padding: 15px; margin-bottom: 10px; border-radius: 5px; background: rgba(15, 23, 42, 0.8);">
                <h3 style="margin-top: 0; color: ${ship.isFlagship ? '#d4af37' : '#38bdf8'};">${ship.name}</h3>
                <p><strong>Hull Type:</strong> ${ship.hull} | <strong>Faction:</strong> ${ship.faction}</p>
                <p><strong>Combat Stats:</strong> AC ${ship.ac} | HP <input type="number" class="hp-tracker" data-index="${index}" value="${ship.hp}" style="width: 60px; background: #0f172a; color: white; border: 1px solid #475569;"></p>
                ${ship.isFlagship ? `<p><strong>Captain:</strong> ${ship.captain}</p>` : ''}
                <p style="font-size: 0.9em; font-style: italic; color: #94a3b8;">"${ship.quirk}"</p>
                <button class="btn-delete-ship" data-index="${index}" style="margin-top: 10px; background-color: #ef4444; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Sink Ship</button>
            </div>
        `;
    });
    return html;
}

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('fleet-output');
    const factionSelect = document.getElementById('fleet-faction');
    const sizeSelect = document.getElementById('fleet-threat');
    const btnGenerate = document.getElementById('btn-generate-fleet');
    const btnClear = document.getElementById('btn-clear-fleet');
    
    let currentFleet = [];

    // Load from LocalStorage
    const savedFleet = localStorage.getItem('sablehook_fleet');
    if (savedFleet) {
        currentFleet = JSON.parse(savedFleet);
        display.innerHTML = renderFleet(currentFleet);
        attachEventListeners();
    }

    function saveFleet() {
        localStorage.setItem('sablehook_fleet', JSON.stringify(currentFleet));
    }

    function attachEventListeners() {
        // HP Tracker changes
        const hpTrackers = document.querySelectorAll('.hp-tracker');
        hpTrackers.forEach(input => {
            input.addEventListener('change', (e) => {
                const idx = e.target.getAttribute('data-index');
                currentFleet[idx].hp = parseInt(e.target.value);
                saveFleet();
            });
        });

        // Delete Ship
        const deleteBtns = document.querySelectorAll('.btn-delete-ship');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                currentFleet.splice(idx, 1);
                display.innerHTML = renderFleet(currentFleet);
                saveFleet();
                attachEventListeners();
            });
        });
    }

    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            currentFleet = generateFleet(factionSelect.value, sizeSelect.value);
            display.innerHTML = renderFleet(currentFleet);
            saveFleet();
            attachEventListeners();
        });
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if(confirm("Are you sure you want to clear the active armada?")) {
                currentFleet = [];
                localStorage.removeItem('sablehook_fleet');
                display.innerHTML = '';
            }
        });
    }
});
