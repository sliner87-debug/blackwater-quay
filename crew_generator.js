// crew_generator.js

const crewData = {
    names: {
        first: ["Vane", "Silas", "Thorne", "Elara", "Kaelen", "Rook", "Jax", "Nyx", "Garrick", "Sera", "Finn", "Mordecai", "Barek", "Lyra", "Zane", "Orion", "Caspian", "Talia"],
        last: ["Blackwood", "Ironweigh", "Salt", "the Flayed", "Stormrider", "Voss", "Graves", "Pyke", "the Unsinkable", "Blood-Tide", "Cross", "Grimm", "Bone", "Steel"]
    },
    races: [
        "Human", "Half-Elf", "Tiefling", "Water Genasi", "Dwarven", "Half-Orc", 
        "Shadar-Kai", "Triton", "Fleshwarped (Unknown Base)", "Simic Hybrid"
    ],
    roles: [
        { title: "First Mate", stats: "AC 15, HP 45, Multiattack (Cutlass x2)" },
        { title: "Quartermaster", stats: "AC 14, HP 35, Advantage on Insight" },
        { title: "Ship's Surgeon", stats: "AC 12, HP 25, Medicine +6, Healer's Kit" },
        { title: "Master Gunner", stats: "AC 16, HP 50, Blunderbuss (2d8 piercing)" },
        { title: "Boatswain", stats: "AC 14, HP 40, Whip (reach 10 ft., trip)" },
        { title: "Navigator", stats: "AC 13, HP 30, Survival +6, Knows Shape Water" },
        { title: "Rigger", stats: "AC 15, HP 25, Climbing Speed 30 ft." },
        { title: "Powder Monkey", stats: "AC 13, HP 15, Nimble Escape (Bonus Action Disengage)" },
        { title: "Arcane Canoneer", stats: "AC 14, HP 35, Knows Fire Bolt and Shatter" },
        { title: "Void-Seer", stats: "AC 12, HP 25, Truesight 30 ft., Whispers of Madness" }
    ],
    quirks: [
        "Addicted to refined marrow-dust.",
        "Missing an eye; replaced with a glowing arcane gemstone.",
        "Refuses to touch dry land; always wears salt-soaked boots.",
        "Speaks in a raspy whisper due to a botched neck-graft.",
        "Constantly flipping a tarnished silver coin.",
        "Has a mechanical brass arm that whirs loudly when stressed.",
        "Claims to hear the Leviathans singing in the deep.",
        "Terrified of open flames after surviving a drift-fire explosion.",
        "Has barnacles growing on their left cheek.",
        "Carries a vial of black, oily water from the Xoriat tear.",
        "Covered in erratic, pulsing blue tattoos (Aether-burns).",
        "Refuses to sleep below deck.",
        "Has a pet mechanical seagull.",
        "Will only drink rum mixed with gunpowder."
    ]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateCrewMember() {
    const firstName = getRandom(crewData.names.first);
    const lastName = getRandom(crewData.names.last);
    const race = getRandom(crewData.races);
    const roleObj = getRandom(crewData.roles);
    const quirk = getRandom(crewData.quirks);
    
    return {
        name: `${firstName} ${lastName}`,
        race: race,
        role: roleObj.title,
        stats: roleObj.stats,
        quirk: quirk
    };
}

function renderCrewMember(crew) {
    const card = document.createElement('div');
    card.className = 'crew-card';
    card.innerHTML = `
        <h3>${crew.name}</h3>
        <p><strong>Race:</strong> ${crew.race}</p>
        <p><strong>Role:</strong> ${crew.role}</p>
        <p><strong>Stats:</strong> ${crew.stats}</p>
        <p><strong>Quirk:</strong> <em>${crew.quirk}</em></p>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('btn-generate-crew');
    const clearBtn = document.getElementById('btn-clear-crew');
    const container = document.getElementById('crew-container');
    const countInput = document.getElementById('crew-count');

    if(generateBtn) {
        generateBtn.addEventListener('click', () => {
            const count = parseInt(countInput.value) || 1;
            for(let i=0; i<count; i++) {
                const crew = generateCrewMember();
                container.prepend(renderCrewMember(crew));
            }
        });
    }

    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            container.innerHTML = '';
        });
    }
});
