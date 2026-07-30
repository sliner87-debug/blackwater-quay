// encounter_builder.js
// Interactive D&D 5e Statblock Generator for Blackwater Quay

const monsterDb = {
    docks: [
        {
            name: "Scour-Harrow (Crimson Corsair)",
            type: "Medium humanoid, any alignment",
            ac: "16 (Studded Leather, Shield)",
            hp: "32", hpDice: "5d8+10",
            speed: "30 ft.",
            stats: "STR 14 (+2) | DEX 16 (+3) | CON 14 (+2) | INT 10 (+0) | WIS 11 (+0) | CHA 12 (+1)",
            skills: "Athletics +4, Intimidation +3",
            senses: "passive Perception 10",
            languages: "Common, Thieves' Cant",
            cr: "2 (450 XP)",
            traits: [
                { name: "Pack Tactics", desc: "The corsair has advantage on an attack roll against a creature if at least one of the corsair's allies is within 5 feet of the creature and the ally isn't incapacitated." },
                { name: "Void-Touched", desc: "Resistant to psychic damage." }
            ],
            actions: [
                { name: "Multiattack", desc: "The corsair makes two melee attacks." },
                { name: "Scimitar", desc: "<i>Melee Weapon Attack:</i> <button class='dice-btn' onclick='rollDice(20, 5, 6, 3)'>+5 to hit</button>, reach 5 ft., one target. <i>Hit:</i> 1d6 + 3 slashing damage." },
                { name: "Flintlock Pistol", desc: "<i>Ranged Weapon Attack:</i> <button class='dice-btn' onclick='rollDice(20, 5, 10, 3)'>+5 to hit</button>, range 30/90 ft., one target. <i>Hit:</i> 1d10 + 3 piercing damage." }
            ]
        },
        {
            name: "Clockwork Crab Swarm",
            type: "Medium swarm of Tiny constructs, unaligned",
            ac: "14 (Natural Armor)",
            hp: "27", hpDice: "6d8",
            speed: "20 ft., swim 20 ft.",
            stats: "STR 10 (+0) | DEX 14 (+2) | CON 10 (+0) | INT 1 (-5) | WIS 7 (-2) | CHA 1 (-5)",
            skills: "Stealth +4",
            senses: "blindsight 30 ft. (blind beyond this radius), passive Perception 8",
            languages: "-",
            cr: "1 (200 XP)",
            traits: [
                { name: "Swarm", desc: "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny crab. The swarm can't regain hit points or gain temporary hit points." },
                { name: "Aether Leak", desc: "When the swarm is reduced to 0 hit points, it explodes in a burst of aether. Each creature within 5 feet must make a DC 12 Dexterity saving throw, taking 2d6 force damage on a failed save." }
            ],
            actions: [
                { name: "Pinchers", desc: "<i>Melee Weapon Attack:</i> <button class='dice-btn' onclick='rollDice(20, 4, 4, 0)'>+4 to hit</button>, reach 0 ft., one target in the swarm's space. <i>Hit:</i> 2d4 piercing damage, or 1d4 piercing damage if the swarm has half of its hit points or fewer." }
            ]
        }
    ],
    ocean: [
        {
            name: "Aboleth Outcast (Deepmind Spawn)",
            type: "Large aberration, lawful evil",
            ac: "17 (Natural Armor)",
            hp: "135", hpDice: "18d10+36",
            speed: "10 ft., swim 40 ft.",
            stats: "STR 21 (+5) | DEX 9 (-1) | CON 15 (+2) | INT 18 (+4) | WIS 15 (+2) | CHA 18 (+4)",
            skills: "History +12, Perception +10",
            senses: "darkvision 120 ft., passive Perception 20",
            languages: "Deep Speech, telepathy 120 ft.",
            cr: "10 (5,900 XP)",
            traits: [
                { name: "Amphibious", desc: "The aboleth can breathe air and water." },
                { name: "Mucous Cloud", desc: "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or hits it with a melee attack while within 5 feet of it must succeed on a DC 14 Constitution save or become diseased for 1d4 hours. The diseased creature can breathe only underwater." }
            ],
            actions: [
                { name: "Multiattack", desc: "The aboleth makes three tentacle attacks." },
                { name: "Tentacle", desc: "<i>Melee Weapon Attack:</i> <button class='dice-btn' onclick='rollDice(20, 9, 6, 5)'>+9 to hit</button>, reach 10 ft., one target. <i>Hit:</i> 2d6 + 5 bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Con save or become diseased." },
                { name: "Tail", desc: "<i>Melee Weapon Attack:</i> <button class='dice-btn' onclick='rollDice(20, 9, 6, 5)'>+9 to hit</button>, reach 10 ft., one target. <i>Hit:</i> 3d6 + 5 bludgeoning damage." }
            ]
        }
    ]
};

// Handle Dice Rolls
window.rollDice = function(d20, hitMod, dDamage, dmgMod) {
    const attackRoll = Math.floor(Math.random() * d20) + 1;
    const damageRoll = Math.floor(Math.random() * dDamage) + 1;
    const attackTotal = attackRoll + hitMod;
    const dmgTotal = damageRoll + dmgMod;
    
    let result = `Attack: ${attackRoll} + ${hitMod} = <strong>${attackTotal}</strong><br>Damage: ${damageRoll} + ${dmgMod} = <strong>${dmgTotal}</strong>`;
    
    if (attackRoll === 20) {
        const critDamage = damageRoll + Math.floor(Math.random() * dDamage) + 1;
        result = `<strong style="color:#ef4444;">CRITICAL HIT!</strong><br>Attack: 20<br>Damage: <strong>${critDamage + dmgMod}</strong>`;
    }
    if (attackRoll === 1) {
        result = `<strong style="color:#ef4444;">CRITICAL MISS!</strong>`;
    }
    
    // Create a temporary toast notification for the roll
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = '#0f172a';
    toast.style.border = '2px solid #d4af37';
    toast.style.color = '#fff';
    toast.style.padding = '15px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '10000';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.5)';
    toast.innerHTML = result;
    document.body.appendChild(toast);
    
    // Play sound
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=dice-roll.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play prevented:', e));
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function buildStatblockHTML(m) {
    let html = `<div class="statblock" style="background: #fdf6e3; color: #000; padding: 20px; border: 4px solid #d4af37; border-radius: 8px; font-family: 'Georgia', serif; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">`;
    html += `<h2 style="color: #8b0000; margin: 0; font-family: 'Cinzel', serif;">${m.name}</h2>`;
    html += `<p style="font-style: italic; margin: 0 0 10px 0; color: #555;">${m.type}</p>`;
    html += `<hr style="border-top: 2px solid #8b0000; margin: 5px 0;">`;
    html += `<p style="margin: 5px 0;"><strong>Armor Class</strong> ${m.ac}</p>`;
    html += `<p style="margin: 5px 0;"><strong>Hit Points</strong> ${m.hp} (${m.hpDice})</p>`;
    html += `<p style="margin: 5px 0;"><strong>Speed</strong> ${m.speed}</p>`;
    html += `<hr style="border-top: 2px solid #8b0000; margin: 5px 0;">`;
    html += `<p style="margin: 10px 0; font-weight: bold; text-align: center; color: #8b0000;">${m.stats}</p>`;
    html += `<hr style="border-top: 2px solid #8b0000; margin: 5px 0;">`;
    if(m.skills) html += `<p style="margin: 5px 0;"><strong>Skills</strong> ${m.skills}</p>`;
    html += `<p style="margin: 5px 0;"><strong>Senses</strong> ${m.senses}</p>`;
    html += `<p style="margin: 5px 0;"><strong>Languages</strong> ${m.languages}</p>`;
    html += `<p style="margin: 5px 0;"><strong>Challenge</strong> ${m.cr}</p>`;
    html += `<hr style="border-top: 2px solid #8b0000; margin: 5px 0;">`;
    
    if (m.traits) {
        m.traits.forEach(t => {
            html += `<p style="margin: 5px 0;"><strong><em>${t.name}.</em></strong> ${t.desc}</p>`;
        });
    }
    
    if (m.actions && m.actions.length > 0) {
        html += `<h3 style="color: #8b0000; border-bottom: 1px solid #8b0000; margin-top: 15px; margin-bottom: 10px;">Actions</h3>`;
        m.actions.forEach(a => {
            html += `<p style="margin: 5px 0;"><strong><em>${a.name}.</em></strong> ${a.desc}</p>`;
        });
    }
    
    html += `</div>`;
    return html;
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-generate-encounter');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        const location = document.getElementById('encounter-location').value;
        const difficulty = document.getElementById('encounter-difficulty').value;
        const output = document.getElementById('encounter-output');
        
        // Use docks as fallback if location not fully populated yet
        let pool = monsterDb[location] || monsterDb['docks'];
        
        let numMonsters = 1;
        if(difficulty === 'easy') numMonsters = 1;
        if(difficulty === 'medium') numMonsters = 2;
        if(difficulty === 'hard') numMonsters = 3;
        
        let html = '';
        for(let i=0; i<numMonsters; i++) {
            let m = pool[Math.floor(Math.random() * pool.length)];
            html += buildStatblockHTML(m);
        }
        
        output.innerHTML = html;
        
        // Save to LocalStorage
        localStorage.setItem('bq_saved_encounter', html);
    });
    
    // Restore on load
    const savedEncounter = localStorage.getItem('bq_saved_encounter');
    if (savedEncounter) {
        const output = document.getElementById('encounter-output');
        if (output) output.innerHTML = savedEncounter;
    }
});

// Copy to Markdown logic remains similar, but parses the new HTML structure
document.addEventListener('DOMContentLoaded', () => {
    const btnCopy = document.getElementById('btn-copy-encounter');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const output = document.getElementById('encounter-output');
            if (!output) return;
            
            let markdown = "### Generated Encounter Statblocks\n\n";
            // A simple strip-tags approach with basic formatting
            let text = output.innerText;
            // Clean up empty lines
            text = text.replace(/\n\s*\n/g, '\n\n');
            markdown += text;
            
            navigator.clipboard.writeText(markdown).then(() => {
                btnCopy.textContent = "Copied!";
                setTimeout(() => btnCopy.textContent = "Copy Markdown", 2000);
            }).catch(err => {
                console.error("Failed to copy", err);
            });
        });
    }
});
