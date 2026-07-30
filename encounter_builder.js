// Simplified Monster Database based on the Bestiary
const monsterDb = {
    docks: [
        { name: "Scour-Harrow (Crimson Corsair)", cr: 4, ac: 16, hpDice: "5d8+10" },
        { name: "Clockwork Crab Swarm", cr: 3, ac: 14, hpDice: "6d8" },
        { name: "Mutated Dockhand (Void-Touched)", cr: 1, ac: 12, hpDice: "3d8+3" },
        { name: "Siren (Lured Singer)", cr: 5, ac: 15, hpDice: "8d8+8" }
    ],
    ocean: [
        { name: "Sahuagin Reaver", cr: 2, ac: 14, hpDice: "4d8+4" },
        { name: "Aboleth Outcast", cr: 8, ac: 17, hpDice: "12d8+30" },
        { name: "Giant Kraken Tentacle", cr: 6, ac: 15, hpDice: "10d8+10" },
        { name: "Brass Leviathan Drone", cr: 5, ac: 18, hpDice: "6d10+12" }
    ],
    deep: [
        { name: "The Chirg-Illithid", cr: 11, ac: 22, hpDice: "10d8+50" },
        { name: "Elder Node Spore Pod", cr: 7, ac: 12, hpDice: "8d8+24" },
        { name: "Behemoth Shark", cr: 9, ac: 16, hpDice: "15d12+45" }
    ]
};

// Simple dice roller for HP (e.g. "10d8+50")
function rollHp(diceString) {
    if (!diceString.includes('d')) return parseInt(diceString) || 10;
    
    let total = 0;
    let parts = diceString.split('+');
    let dicePart = parts[0].toLowerCase();
    let modifier = parts[1] ? parseInt(parts[1]) : 0;
    
    let diceSplit = dicePart.split('d');
    let numDice = parseInt(diceSplit[0]);
    let sides = parseInt(diceSplit[1]);
    
    for(let i=0; i<numDice; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    
    return total + modifier;
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-generate-encounter');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        const location = document.getElementById('encounter-location').value;
        const difficulty = document.getElementById('encounter-difficulty').value;
        const output = document.getElementById('encounter-output');
        
        let pool = monsterDb[location];
        let numMonsters = 0;
        
        if(difficulty === 'easy') numMonsters = Math.floor(Math.random() * 2) + 2; // 2-3
        if(difficulty === 'medium') numMonsters = Math.floor(Math.random() * 3) + 3; // 3-5
        if(difficulty === 'hard') numMonsters = Math.floor(Math.random() * 4) + 5; // 5-8
        
        let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';
        
        for(let i=0; i<numMonsters; i++) {
            let m = pool[Math.floor(Math.random() * pool.length)];
            let hp = rollHp(m.hpDice);
            
            html += `
            <div style="background: rgba(30, 41, 59, 0.9); border: 1px solid #475569; padding: 10px 15px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong style="color: #e2e8f0; font-size: 1.1em;">${m.name}</strong>
                    <div style="font-size: 0.85em; color: #94a3b8;">CR ${m.cr} | AC ${m.ac}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: #d4af37; font-weight: bold; font-family: monospace; font-size: 1.2em;">${hp} HP</span>
                    <input type="number" placeholder="DMG" style="width: 60px; padding: 5px; background: #0f172a; color: #fff; border: 1px solid #ef4444; border-radius: 3px;">
                </div>
            </div>`;
        }
        
        html += '</div>';
        output.innerHTML = html;
    });
});
