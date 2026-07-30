// loot_generator.js
// Procedural Loot Engine for Blackwater Quay

const proceduralData = {
    materials: {
        void: [
            "Obsidian", "Flesh-forged", "Whispering", "Non-Euclidean", "Tentacle-wrapped",
            "Screaming", "Void-glass", "Warped", "Abyssal", "Oily Black", "Living Bone", "Xoriat-Bleeding"
        ],
        magetech: [
            "Brass", "Clockwork", "Aether-infused", "Steam-powered", "Copper-wired",
            "Rusted Iron", "Galvanized", "Ticking", "Pneumatic", "Crystal-core", "Arcane", "Fey-Iron"
        ],
        nautical: [
            "Barnacle-encrusted", "Driftwood", "Salt-stained", "Sunken", "Coral",
            "Whalebone", "Tarnished Silver", "Abyssal-forged", "Drowned", "Pearl-inlaid", "Leviathan-Rib"
        ],
        any: ["Iron", "Steel", "Leather", "Wooden", "Golden", "Shadow", "Mithral"]
    },
    itemTypes: [
        { type: "Weapon", list: ["Longsword", "Dagger", "Harpoon", "Cutlass", "Rapier", "Revolver", "Crossbow", "Boarding Pike", "Flintlock Pistol", "Blunderbuss", "Mace", "Whip", "Boarding Axe", "Canister Shot (1d4 charges)", "Heavy Spanner"] },
        { type: "Armor", list: ["Breastplate", "Shield", "Leather Vest", "Diving Helmet", "Gauntlet", "Trenchcoat", "Boots", "Goggles", "Pauldrons", "Brigandine"] },
        { type: "Trinket", list: ["Pocket-watch", "Compass", "Sextant", "Vial", "Music Box", "Monocle", "Lantern", "Pipe", "Scarab", "Coin", "Key", "Amulet", "Ring", "Flask"] },
        { type: "Trinket of the Damned", list: ["Preserved Eyeball", "Shrunken Head", "Marrow-Dust Vial", "Soul-Coin", "Severed Scrag Claw", "Whispering Conch", "Cursed Medallion", "Vampire's Fang"] },
        { type: "Ship Part", list: ["Rudder Gudgeon", "Ballista Bolt", "Torn Sailcloth", "Sextant Lens", "Brass Cannonball", "Rigging Pulley", "Figurehead Shard", "Aether-Furnace Valve"] }
    ],
    mechanics: {
        void: [
            { suffix: "of the Deepmind", rarity: "void-touched", effect: "Requires Attunement. You have advantage on initiative rolls and cannot be surprised. You gain truesight out to 30 feet." },
            { suffix: "of the Void", rarity: "rare", effect: "When you deal damage with this item, or use it as a focus, you deal an extra 1d6 psychic damage." },
            { suffix: "of Whispers", rarity: "uncommon", effect: "While holding this, you can cast Dissonant Whispers (DC 13) once per day." },
            { suffix: "of Madness", rarity: "void-touched", effect: "Requires Attunement. Once per day, you cast Confusion centered on yourself. You are immune to the effect." },
            { suffix: "of the Tear", rarity: "rare", effect: "As a bonus action, you can teleport up to 15 feet to an unoccupied space you can see." },
            { suffix: "of Flesh", rarity: "uncommon", effect: "The item slowly heals itself if broken, and pulses like a heartbeat. Grants +1 to Death Saving Throws." }
        ],
        magetech: [
            { suffix: "of Sparks", rarity: "common", effect: "Deals 1 lightning damage to anyone who touches it without gloves. Can be used to cast Shocking Grasp (+4 to hit)." },
            { suffix: "of Aether", rarity: "rare", effect: "Requires Attunement. Contains 3 charges. Expend 1 charge to cast Magic Missile as a 2nd-level spell. Regains 1d3 charges at dawn." },
            { suffix: "of Clockwork Precision", rarity: "uncommon", effect: "You can roll a d4 and add it to one attack roll or ability check made with this item per short rest." },
            { suffix: "of Steam", rarity: "common", effect: "As a bonus action, the item emits a 10-foot radius cloud of obscuring steam for 1 minute." },
            { suffix: "of the Machinist", rarity: "rare", effect: "Requires Attunement. You gain proficiency with Tinker's Tools. You can cast Mending at will." },
            { suffix: "of Feedback", rarity: "uncommon", effect: "Whenever you roll a critical hit, the target takes an additional 1d8 thunder damage, and you are pushed back 5 feet." }
        ],
        nautical: [
            { suffix: "of the Depths", rarity: "uncommon", effect: "You gain a swimming speed equal to your walking speed." },
            { suffix: "of the Drowned", rarity: "rare", effect: "Requires Attunement. You can breathe underwater indefinitely, and you ignore penalties for underwater combat." },
            { suffix: "of the Tide", rarity: "common", effect: "The item is always damp. You can use it to cast Shape Water at will." },
            { suffix: "of the Kraken", rarity: "rare", effect: "When you strike a creature, you can attempt to grapple them as a bonus action, using a spectral tentacle." },
            { suffix: "of the Gale", rarity: "uncommon", effect: "You can cast Gust of Wind (DC 13) once per day." },
            { suffix: "of the Navigator", rarity: "common", effect: "You always know which way is North, and you cannot get lost at sea." }
        ]
    }
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateProceduralLoot(typeFilter, rarityFilter) {
    // Determine Theme
    let theme = typeFilter;
    if (theme === 'any') {
        const themes = ['void', 'magetech', 'nautical'];
        theme = getRandom(themes);
    }
    
    // Prefix (Material)
    const materialPool = [...proceduralData.materials[theme], ...proceduralData.materials.any];
    const material = getRandom(materialPool);
    
    // Base Item
    const itemCategory = getRandom(proceduralData.itemTypes);
    const baseItem = getRandom(itemCategory.list);
    
    // Mechanic & Suffix
    let mechPool = proceduralData.mechanics[theme];
    if (rarityFilter !== 'any') {
        const filtered = mechPool.filter(m => m.rarity === rarityFilter);
        if (filtered.length > 0) mechPool = filtered;
    }
    
    const mechanicObj = getRandom(mechPool);
    const itemName = `${material} ${baseItem} ${mechanicObj.suffix}`;
    
    let flavor = "";
    if (itemCategory.type === "Weapon") flavor = "A martial implement designed for bloodshed.";
    if (itemCategory.type === "Armor") flavor = "Protective gear, forged to deflect the harsh realities of the Quay.";
    if (itemCategory.type === "Trinket") flavor = "A curious object that hums with latent power.";
    if (itemCategory.type === "Trinket of the Damned") flavor = "A cursed or horrific remnant, vibrating with dark energy.";
    if (itemCategory.type === "Ship Part") flavor = "A crucial piece of maritime salvage, worth a hefty sum to a shipwright.";
    
    return {
        text: `<strong>${itemName}</strong><br><em>${flavor}</em>`,
        rarity: mechanicObj.rarity,
        mechanic: mechanicObj.effect
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('loot-display');
    const typeObj = document.getElementById('loot-type');
    const rarityObj = document.getElementById('loot-rarity');
    const btnGenerate = document.getElementById('btn-generate');
    const btnHoard = document.getElementById('btn-hoard'); // New button

    function renderLoot(lootData) {
        let rarityColor = "#e2e8f0"; // common/default
        if (lootData.rarity === "uncommon") rarityColor = "#10b981"; // green
        if (lootData.rarity === "rare") rarityColor = "#3b82f6"; // blue
        if (lootData.rarity === "void-touched") rarityColor = "#a855f7"; // purple

        return `
            <div style="margin-bottom: 20px; border-bottom: 1px dashed #334155; padding-bottom: 15px;">
                <p style="color: ${rarityColor};">${lootData.text}</p>
                <p style="font-size: 0.7em; font-family: monospace; color: #94a3b8; font-style: normal; margin-top: 10px;">
                    <strong>[ MECHANIC ]</strong> ${lootData.mechanic}
                </p>
                <span class="rarity-badge rarity-${lootData.rarity}">${lootData.rarity.toUpperCase()}</span>
            </div>
        `;
    }

    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            btnGenerate.disabled = true;
            display.innerHTML = '<span style="color: #64748b;">Rolling the Bones...</span>';
            setTimeout(() => {
                const loot = generateProceduralLoot(typeObj.value, rarityObj.value);
                display.innerHTML = renderLoot(loot);
                btnGenerate.disabled = false;
            }, 600);
        });
    }

    if (btnHoard) {
        btnHoard.addEventListener('click', () => {
            btnHoard.disabled = true;
            display.innerHTML = '<span style="color: #64748b;">Generating Hoard...</span>';
            setTimeout(() => {
                let htmlStr = `<h3 style="color:#d4af37; margin-bottom: 20px;">Loot Hoard</h3>`;
                const amount = Math.floor(Math.random() * 3) + 3; // 3 to 5 items
                for(let i=0; i<amount; i++) {
                    const loot = generateProceduralLoot(typeObj.value, rarityObj.value);
                    htmlStr += renderLoot(loot);
                }
                display.innerHTML = htmlStr;
                btnHoard.disabled = false;
            }, 800);
        });
    }
});
