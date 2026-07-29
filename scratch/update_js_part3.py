import re

with open('h:/Antigravity/Novel/shipyard.js', 'r') as f:
    js = f.read()

# REWRITE CHASSIS
chassis_str = '''    chassis: {
        skiff: { name: "Sluice-Skiff", cost: 2000, type: "Huge Vehicle (Water)", hp: 100, dt: 5, speedBase: 80, str: 16, dex: 18, con: 14, sizeBaseAc: 14, crewMin: 1, crewMax: 2, cargo: "1 ton" },
        gunboat: { name: "Assault Gunboat", cost: 6000, type: "Huge Vehicle (Water)", hp: 150, dt: 10, speedBase: 70, str: 18, dex: 16, con: 16, sizeBaseAc: 14, crewMin: 4, crewMax: 8, cargo: "5 tons" },
        pinnace: { name: "Smuggler\\'s Pinnace", cost: 8000, type: "Gargantuan Vehicle (Water)", hp: 250, dt: 10, speedBase: 60, str: 16, dex: 16, con: 16, sizeBaseAc: 15, crewMin: 5, crewMax: 15, cargo: "50 tons" },
        submersible: { name: "Deep-Sea Submersible", cost: 12000, type: "Huge Vehicle (Water)", hp: 200, dt: 15, speedBase: 30, str: 18, dex: 12, con: 18, sizeBaseAc: 16, crewMin: 4, crewMax: 6, cargo: "5 tons" },
        clipper: { name: "Aether-Clipper", cost: 15000, type: "Gargantuan Vehicle (Water)", hp: 250, dt: 10, speedBase: 90, str: 16, dex: 18, con: 14, sizeBaseAc: 15, crewMin: 10, crewMax: 20, cargo: "30 tons" },
        galleon: { name: "Ironclad Galleon", cost: 10000, type: "Gargantuan Vehicle (Water)", hp: 300, dt: 15, speedBase: 40, str: 20, dex: 10, con: 18, sizeBaseAc: 15, crewMin: 20, crewMax: 40, cargo: "100 tons" },
        barge: { name: "Necromancer\\'s Barge", cost: 5000, type: "Gargantuan Vehicle (Water)", hp: 350, dt: 10, speedBase: 25, str: 18, dex: 8, con: 20, sizeBaseAc: 14, crewMin: 2, crewMax: 5, cargo: "200 tons (Corpses)" },
        leviathan: { name: "Leviathan Hunter", cost: 18000, type: "Gargantuan Vehicle (Water)", hp: 400, dt: 20, speedBase: 35, str: 22, dex: 10, con: 20, sizeBaseAc: 16, crewMin: 30, crewMax: 50, cargo: "80 tons" },
        dreadnought: { name: "Subterranean Dreadnought", cost: 25000, type: "Gargantuan Vehicle (Water)", hp: 500, dt: 25, speedBase: 25, str: 24, dex: 6, con: 20, sizeBaseAc: 16, crewMin: 80, crewMax: 120, cargo: "500 tons" },
        flagship: { name: "Sovereign Flagship", cost: 100000, type: "Colossal Vehicle (Water)", hp: 800, dt: 30, speedBase: 20, str: 26, dex: 4, con: 22, sizeBaseAc: 18, crewMin: 200, crewMax: 300, cargo: "2000 tons" },
        custom: { name: "Custom Blueprint", cost: 0, type: "Custom Vehicle", hp: 100, dt: 0, speedBase: 30, str: 10, dex: 10, con: 10, sizeBaseAc: 10, crewMin: 1, crewMax: 1, cargo: "0 tons" }
    },'''
js = re.sub(r'    chassis: \{.*?\},\n    materials:', chassis_str + '\n    materials:', js, flags=re.DOTALL)

# REWRITE WEAPONS
weapons_str = '''    weapons: {
        ballista: { name: "Heavy Ballista", cost: 1000, action: { name: "Heavy Ballista", desc: "Ranged Weapon Attack: +6 to hit, range 120/480 ft., one target. Hit: 16 (3d10) piercing damage." }},
        mangonel: { name: "Siege Mangonel", cost: 1500, action: { name: "Mangonel", desc: "Ranged Weapon Attack: +5 to hit, range 200/800 ft. (can\\'t hit targets within 60 ft.), one target. Hit: 27 (5d10) bludgeoning damage." }},
        cannon: { name: "Broadside Cannon", cost: 3000, action: { name: "Broadside Cannon", desc: "Ranged Weapon Attack: +6 to hit, range 600/2,400 ft., one target. Hit: 44 (8d10) bludgeoning damage." }},
        greekfire: { name: "Greek Fire Siphon", cost: 2500, action: { name: "Fire Siphon (Recharge 5-6)", desc: "Sprays fire in a 60-foot cone. Each creature and object must make a DC 15 Dexterity saving throw, taking 21 (6d6) fire damage on a failed save." }},
        harpoon: { name: "Whaler\\'s Harpoon Gun", cost: 1500, action: { name: "Harpoon Shot", desc: "Ranged Weapon Attack: +6 to hit, range 100/300 ft., one target. Hit: 11 (2d10) piercing damage, and the target is grappled (escape DC 14)." }},
        trebuchet: { name: "Fletched Trebuchet", cost: 4000, action: { name: "Trebuchet", desc: "Ranged Weapon Attack: +5 to hit, range 300/1,200 ft. (can\\'t hit targets within 60 ft.). Hit: 44 (8d10) bludgeoning damage." }},
        disruptor: { name: "Githyanki Disruptor", cost: 5000, action: { name: "Psychic Disruptor", desc: "Ranged Spell Attack: +8 to hit, range 300 ft., one target. Hit: 22 (4d10) psychic damage. Target vehicle\\'s speed is halved." }},
        spellcannon: { name: "Arcane Spell-Cannon", cost: 8000, action: { name: "Channel Arcana", desc: "Gunner expends a spell slot. Ranged Spell Attack: +8 to hit, 150 ft. Hit: 1d10 force damage per level of the spell slot expended." }},
        lightning: { name: "Lightning Emitter", cost: 6000, action: { name: "Lightning Arc (Recharge 5-6)", desc: "Fires a 100ft line of lightning. DC 16 Dex save for 28 (8d6) lightning damage. Double damage to Deep-Iron ships." }},
        gatling: { name: "Eldritch Gatling", cost: 7500, action: { name: "Eldritch Burst", desc: "Fires 1d4+1 homing magic missiles. Each deals 1d4+1 force damage. No attack roll required." }},
        voidrift: { name: "Void-Rift Projector", cost: 12000, action: { name: "Singularity (1/Day)", desc: "Creates a 30ft radius singularity 120ft away. Ships inside must make a DC 18 STR save or be pulled 30ft to the center and take 55 (10d10) force damage." }},
        necrotic: { name: "Necrotic Torpedo", cost: 9000, action: { name: "Soul-Seeker", desc: "Fires a slow moving torpedo that homes in on the nearest living crew. Deals 8d10 necrotic damage on impact." }}
    },'''
js = re.sub(r'    weapons: \{.*?\},\n    upgrades:', weapons_str + '\n    upgrades:', js, flags=re.DOTALL)

# UPDATE STAT BLOCK BUILDER TO HANDLE CUSTOM OR PRESET
old_build_fetch = '''const chassis = catalog.chassis[chassisId];
    const material = catalog.materials[materialId];'''

new_build_fetch = '''let chassis = catalog.chassis[chassisId];
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
    }'''
js = js.replace(old_build_fetch, new_build_fetch)

# INJECT CREW AND CARGO UI UPDATES INTO STAT BLOCK
js = js.replace('document.getElementById("sb-speed").textContent = (chassis.speedBase + material.speedMod) + " ft.";', 
                'document.getElementById("sb-speed").textContent = (chassis.speedBase + material.speedMod) + " ft.";\n    document.getElementById("sb-crew").textContent = chassis.crewMin + "-" + chassis.crewMax;\n    document.getElementById("sb-cargo").textContent = chassis.cargo;')

with open('h:/Antigravity/Novel/shipyard.js', 'w') as f:
    f.write(js)

print("JS Updated Part 3")
