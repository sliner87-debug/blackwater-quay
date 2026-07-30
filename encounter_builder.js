// encounter_builder.js
// Interactive D&D 3.5e/Pathfinder Statblock Generator for Blackwater Quay

const monsterDb = [
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
        cr_num: 2,
        theme: "sablehook",
        type_category: "humanoid",
        location: ["docks", "ocean"],
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
        cr_num: 1,
        theme: "independent",
        type_category: "swarm",
        location: ["docks", "deep"],
        traits: [
            { name: "Swarm", desc: "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny crab. The swarm can't regain hit points or gain temporary hit points." },
            { name: "Aether Leak", desc: "When the swarm is reduced to 0 hit points, it explodes in a burst of aether. Each creature within 5 feet must make a DC 12 Dexterity saving throw, taking 2d6 force damage on a failed save." }
        ],
        actions: [
            { name: "Pinchers", desc: "<i>Melee Weapon Attack:</i> <button class='dice-btn' onclick='rollDice(20, 4, 4, 0)'>+4 to hit</button>, reach 0 ft., one target in the swarm's space. <i>Hit:</i> 2d4 piercing damage." }
        ]
    },
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
        cr_num: 10,
        theme: "elder_node",
        type_category: "aberration",
        location: ["ocean", "deep"],
        traits: [
            { name: "Amphibious", desc: "The aboleth can breathe air and water." },
            { name: "Mucous Cloud", desc: "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or hits it with a melee attack while within 5 feet of it must succeed on a DC 14 Constitution save or become diseased for 1d4 hours. The diseased creature can breathe only underwater." }
        ],
        actions: [
            { name: "Multiattack", desc: "The aboleth makes three tentacle attacks." },
            { name: "Tentacle", desc: "<i>Melee Weapon Attack:</i> <button class='dice-btn' onclick='rollDice(20, 9, 6, 5)'>+9 to hit</button>, reach 10 ft., one target. <i>Hit:</i> 2d6 + 5 bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Con save or become diseased." },
            { name: "Tail", desc: "<i>Melee Weapon Attack:</i> <button class='dice-btn' onclick='rollDice(20, 9, 6, 5)'>+9 to hit</button>, reach 10 ft., one target. <i>Hit:</i> 3d6 + 5 bludgeoning damage." }
        ]
    },
    {
      name: "The Chirg-Illithid (Elder Node Avatar)",
      type: "Large Aberration (Psi-Active)",
      ac: "22 (-1 size, +4 Dex, +9 natural), touch 13, flat-footed 18",
      hp: "95",
      hpDice: "10d8+50",
      speed: "30 ft.",
      stats: "STR 20 (+5) | DEX 18 (+4) | CON 20 (+5) | INT 19 (+4) | WIS 15 (+2) | CHA 16 (+3)",
      skills: "Knowledge: Dungeon +15",
      senses: "Telepathy 100 ft., passive Perception 12",
      languages: "Deep Speech, Undercommon",
      cr: "11 (7,200 XP)",
      cr_num: 11,
      theme: "elder_node",
      type_category: "aberration",
      location: ["deep"],
      traits: [
        { name: "Spell Resistance", desc: "SR 22" },
        { name: "Secretion Aura", desc: "Projects a chemical mist that fatigues characters and reduces their willpower, making them vulnerable to psychic control." }
      ],
      actions: [
        { name: "4 Tentacles", desc: "Melee <button class='dice-btn' onclick='rollDice(20, 11, 6, 5)'>+11 to hit</button> (1d6+5 plus attach)" },
        { name: "Mind Blast (Sp)", desc: "60-ft. cone, stun 1d4 rounds, Will DC 20 negates (usable once every 1d4 rounds)." },
        { name: "Extract Brain (Ex)", desc: "If it begins its turn with at least one tentacle attached to a grappled foe, it can extract the brain, instantly killing the target." }
      ]
    },
    {
      name: "The Thessalan Displacer Beast (Consortium Prototype)",
      type: "Large Magical Beast",
      ac: "20 (-1 size, +3 Dex, +8 natural), touch 12, flat-footed 17",
      hp: "85",
      hpDice: "9d10+36",
      speed: "40 ft.",
      stats: "STR 21 (+5) | DEX 17 (+3) | CON 18 (+4) | INT 6 (-2) | WIS 12 (+1) | CHA 8 (-1)",
      skills: "Stealth +8",
      senses: "Darkvision 60 ft., passive Perception 11",
      languages: "-",
      cr: "9 (5,000 XP)",
      cr_num: 9,
      theme: "consortium",
      type_category: "magical beast",
      location: ["docks", "ocean"],
      traits: [
        { name: "Displacement (Su)", desc: "Grants a permanent 50% miss chance against all physical and spell attacks. True seeing bypasses this effect. Suppressed for 1 round if hit with cold iron." },
        { name: "Spell Resistance", desc: "SR 18" }
      ],
      actions: [
        { name: "2 Tentacles and Bite", desc: "Tentacles <button class='dice-btn' onclick='rollDice(20, 13, 8, 5)'>+13 to hit</button> (1d8+5 plus mutagenic acid) and Bite <button class='dice-btn' onclick='rollDice(20, 8, 8, 2)'>+8 to hit</button> (1d8+2)" },
        { name: "Mutagenic Acid (Ex)", desc: "Tentacles deal an extra 1d6 acid damage. Target must succeed on a Fort DC 18 save or be sickened for 1d4 rounds." }
      ]
    },
    {
      name: "Dolgaunt Cell-Guard",
      type: "Medium Aberration",
      ac: "18 (+3 Dex, +5 natural), touch 13, flat-footed 15",
      hp: "39",
      hpDice: "6d8+12",
      speed: "30 ft.",
      stats: "STR 16 (+3) | DEX 16 (+3) | CON 14 (+2) | INT 10 (+0) | WIS 12 (+1) | CHA 8 (-1)",
      skills: "Stealth +6",
      senses: "Blind-sight 60 ft., passive Perception 11",
      languages: "Undercommon",
      cr: "6 (2,300 XP)",
      cr_num: 6,
      theme: "void",
      type_category: "aberration",
      location: ["docks", "deep"],
      traits: [
        { name: "Damage Reduction", desc: "DR 5/Byeshk or Magic." }
      ],
      actions: [
        { name: "2 Tentacles and 2 Slams", desc: "Tentacles <button class='dice-btn' onclick='rollDice(20, 7, 4, 3)'>+7 to hit</button> (1d4+3 plus strength drain) and Slams <button class='dice-btn' onclick='rollDice(20, 2, 3, 1)'>+2 to hit</button> (1d3+1)" },
        { name: "Strength Drain (Su)", desc: "When a tentacle hits, target must succeed on a Fort DC 15 save or lose 1 point of Strength." }
      ]
    },
    {
      name: "Oraxis (Dragon of the Chamber)",
      type: "Huge Dragon",
      ac: "32 (-2 size, +24 natural), touch 8, flat-footed 32",
      hp: "225",
      hpDice: "18d12+108",
      speed: "40 ft., fly 150 ft. (Poor)",
      stats: "STR 31 (+10) | DEX 10 (+0) | CON 23 (+6) | INT 20 (+5) | WIS 21 (+5) | CHA 20 (+5)",
      skills: "History +20",
      senses: "Blindsight 60 ft., passive Perception 15",
      languages: "Draconic, Common, Celestial",
      cr: "16 (15,000 XP)",
      cr_num: 16,
      theme: "chamber",
      type_category: "dragon",
      location: ["ocean", "deep"],
      traits: [
        { name: "Damage Reduction", desc: "DR 10/Magic." },
        { name: "Spell Resistance", desc: "SR 25" },
        { name: "Alternate Form", desc: "Can appear as a blind monk in saffron robes." },
        { name: "Prophecy Shield", desc: "Immune to mind reading in mortal form; attempts deal damage to the scanner." }
      ],
      actions: [
        { name: "Multiattack", desc: "Bite <button class='dice-btn' onclick='rollDice(20, 26, 8, 10)'>+26 to hit</button> (2d8+10), 2 Claws <button class='dice-btn' onclick='rollDice(20, 21, 6, 5)'>+21 to hit</button> (2d6+5), 2 Wings <button class='dice-btn' onclick='rollDice(20, 21, 8, 5)'>+21 to hit</button> (1d8+5)" },
        { name: "Breath Weapon (Su)", desc: "100-ft. line of lightning (12d6 electricity, Reflex DC 25 half) or 50-ft. cone of repulsion gas (Will DC 25 or be repelled 40 ft.)." }
      ]
    },
    {
      name: "Dreadjaw Rellis (Orc First Mate)",
      type: "Medium Humanoid (Orc, Tri-Weave Grafted)",
      ac: "24 (+2 Dex, +7 breastplate +2, +5 natural), touch 12, flat-footed 22",
      hp: "173",
      hpDice: "12d12+72 plus 2d10+12",
      speed: "40 ft.",
      stats: "STR 26 (+8) | DEX 14 (+2) | CON 22 (+6) | INT 10 (+0) | WIS 8 (-1) | CHA 10 (+0)",
      skills: "Intimidate +15",
      senses: "Darkvision 60 ft., passive Perception 9",
      languages: "Common, Orc",
      cr: "14 (11,500 XP)",
      cr_num: 14,
      theme: "sablehook",
      type_category: "humanoid",
      location: ["docks", "ocean"],
      traits: [
        { name: "Greater Rage", desc: "4/day, +6 Str, +6 Con." },
        { name: "Damage Reduction", desc: "DR 3/—" },
        { name: "The Sovereign Network", desc: "Telepathic communication with Kael up to 100 feet away." },
        { name: "Alien Mental Fortress", desc: "Spell Resistance (SR 29) against Mind-Affecting spells." },
        { name: "Scrag-Nerve Sheathing", desc: "Immunity to Stunning and Paralysis." }
      ],
      actions: [
        { name: "+2 Vicious Cold-Iron Greataxe", desc: "Melee <button class='dice-btn' onclick='rollDice(20, 25, 12, 14)'>+25 to hit</button> (1d12+14/x3 plus 2d6 vicious damage) or Bite <button class='dice-btn' onclick='rollDice(20, 22, 8, 8)'>+22 to hit</button> (1d8+8)" },
        { name: "Dread-Shout (Su)", desc: "3/day. 40-ft. cone of sonic energy. 10d6 sonic damage and knocked prone (DC 23 Fort half and no knockdown). Deafened for 1d4 rounds on failure." },
        { name: "The Obsidian Fey-Iron Bite", desc: "Bite bypasses DR as Cold Iron, Magic, and Evil." }
      ]
    },
    {
      name: "Slake (Trench) The Deep-Trench Scrag",
      type: "Large Giant (Aquatic, Trench-Adapted)",
      ac: "22 (-1 Size, +2 Dex, +7 natural, +4 barding), touch 11, flat-footed 20",
      hp: "222",
      hpDice: "6d8+48 plus 5d12+40 plus 4d12+32",
      speed: "30 ft. (20 ft. in heavy barding), Swim 40 ft.",
      stats: "STR 28 (+9) | DEX 14 (+2) | CON 26 (+8) | INT 12 (+1) | WIS 12 (+1) | CHA 7 (-2)",
      skills: "Athletics +18, Stealth +8 (underwater)",
      senses: "Darkvision 90 ft., Low-Light Vision, Scent",
      languages: "Giant, Common",
      cr: "15 (13,000 XP)",
      cr_num: 15,
      theme: "sablehook",
      type_category: "giant",
      location: ["ocean", "deep"],
      traits: [
        { name: "Deathless Frenzy (Ex)", desc: "Immune to death from hit point damage while frenzied." },
        { name: "Morphic Reactive Maelstrom (Ex)", desc: "9 attacks of opportunity per round; overriding standard 3.5e exceptions." },
        { name: "The Inquisitor's Absolute Mortality (Ex)", desc: "Attacks permanently ignore DR and completely suppress regeneration factors for 24 hours. Acts as Greater Dispel Magic on defensive spell layers." },
        { name: "Regeneration 5 (Acid/Fire)", desc: "Regenerates 5 HP per round even on dry land, unless dealt Acid or Fire damage." },
        { name: "Hull Breaker (Ex)", desc: "Melee attacks deal double damage to objects, vehicles, and structures." }
      ],
      actions: [
        { name: "Harpoon-Cannon", desc: "Melee <button class='dice-btn' onclick='rollDice(20, 23, 6, 15)'>+23 to hit</button> (2d6+15 piercing/slashing) or Ranged <button class='dice-btn' onclick='rollDice(20, 17, 6, 2)'>+17 to hit</button> (4d6+2 bludgeoning/piercing, range 100 ft.)" },
        { name: "Sovereign Flesh-Tear (Ex)", desc: "If two claws hit, deals extra 4d6+13 wounding damage (Fort DC 26 or -4 penalty to AC)." }
      ]
    },
    {
      name: "Dire Displacer Rhino (Consortium Siege-Beast)",
      type: "Huge Aberration (Augmented Animal)",
      ac: "25 (-2 size, +17 natural), touch 8, flat-footed 25",
      hp: "172",
      hpDice: "15d8+105",
      speed: "40 ft.",
      stats: "STR 30 (+10) | DEX 10 (+0) | CON 24 (+7) | INT 2 (-4) | WIS 12 (+1) | CHA 6 (-2)",
      skills: "Athletics +15",
      senses: "Scent",
      languages: "-",
      cr: "12 (8,400 XP)",
      cr_num: 12,
      theme: "consortium",
      type_category: "magical beast",
      location: ["docks"],
      traits: [
        { name: "Displacement", desc: "50% miss chance, suppressed for 1 round if hit by a cold iron weapon." },
        { name: "Damage Reduction", desc: "DR 10/Magic." }
      ],
      actions: [
        { name: "Gore and Tentacles", desc: "Gore <button class='dice-btn' onclick='rollDice(20, 19, 8, 15)'>+19 to hit</button> (2d8+15) and 4 Tentacles <button class='dice-btn' onclick='rollDice(20, 14, 8, 5)'>+14 to hit</button> (1d8+5)" },
        { name: "Trample (Ex)", desc: "Move twice speed and run over Large or smaller creatures for 2d8+15 bludgeoning damage (Reflex DC 27 half)." },
        { name: "Adamantine Horn (Ex)", desc: "Gore attack ignores hardness less than 20 and bypasses DR as an adamantine weapon." }
      ]
    },
    {
      name: "Zaniph (Githyanki Deserter)",
      type: "Medium Humanoid (Githyanki)",
      ac: "22 (+2 Dex, +8 full plate, +2 deflection), touch 12, flat-footed 20",
      hp: "85",
      hpDice: "10d10+30",
      speed: "30 ft.",
      stats: "STR 16 (+3) | DEX 15 (+2) | CON 16 (+3) | INT 12 (+1) | WIS 10 (+0) | CHA 8 (-1)",
      skills: "Athletics +10",
      senses: "passive Perception 10",
      languages: "Gith, Common",
      cr: "10 (5,900 XP)",
      cr_num: 10,
      theme: "independent",
      type_category: "humanoid",
      location: ["docks", "ocean"],
      traits: [
        { name: "Githyanki Psionics", desc: "Innate psionic abilities." }
      ],
      actions: [
        { name: "Broken Silver Dagger", desc: "Melee <button class='dice-btn' onclick='rollDice(20, 15, 6, 5)'>+15 to hit</button> (1d6+5/19-20 plus psionic disruption)" },
        { name: "Psionic Disruption", desc": "On hit, target must succeed on a Will DC 18 save or be unable to manifest psionics or cast spells for 1 round." }
      ]
    },
    {
      name: "Terik / Hruujj (Rakshasa Middleman)",
      type: "Medium Outsider (Native)",
      ac: "21 (+2 Dex, +9 natural), touch 12, flat-footed 19",
      hp: "81",
      hpDice: "7d8+21 plus 4d4+12",
      speed: "40 ft.",
      stats: "STR 14 (+2) | DEX 14 (+2) | CON 16 (+3) | INT 15 (+2) | WIS 12 (+1) | CHA 18 (+4)",
      skills: "Deception +12, Insight +8",
      senses: "Darkvision 60 ft.",
      languages: "Common, Infernal, Undercommon",
      cr: "11 (7,200 XP)",
      cr_num: 11,
      theme: "lords_of_dust",
      type_category: "outsider",
      location: ["docks"],
      traits: [
        { name: "Damage Reduction", desc: "DR 15/Good and Piercing." }
      ],
      actions: [
        { name: "Claw and Bite", desc: "Claw <button class='dice-btn' onclick='rollDice(20, 10, 4, 2)'>+10 to hit</button> (1d4+2) and Bite <button class='dice-btn' onclick='rollDice(20, 5, 6, 1)'>+5 to hit</button> (1d6+1)" },
        { name: "Detect Thoughts (Su)", desc: "At will, DC 18." },
        { name: "Spells", desc: "Casts as an 8th-level Sorcerer." }
      ]
    },
    {
      name: "Sable (Sablehook Coordinator)",
      type: "Medium Humanoid (Shadar-Kai)",
      ac: "21 (+5 Dex, +5 leather armor, +1 ring of protection), touch 16, flat-footed 16",
      hp: "63",
      hpDice: "11d6+22",
      speed: "30 ft.",
      stats: "STR 12 (+1) | DEX 20 (+5) | CON 14 (+2) | INT 14 (+2) | WIS 12 (+1) | CHA 8 (-1)",
      skills: "Stealth +16, Acrobatics +15",
      senses: "Darkvision 60 ft.",
      languages: "Common, Elven",
      cr: "11 (7,200 XP)",
      cr_num: 11,
      theme: "sablehook",
      type_category: "humanoid",
      location: ["docks", "ocean"],
      traits: [
        { name: "Sneak Attack", desc: "+6d6 damage on sneak attacks." },
        { name: "Crippling Strike", desc: "Sneak attacks deal 2 points of Strength damage." }
      ],
      actions: [
        { name: "Shortbow", desc: "Ranged <button class='dice-btn' onclick='rollDice(20, 14, 6, 2)'>+14 to hit</button> (1d6+2/x3 plus sleep poison)" },
        { name: "Dagger", desc: "Melee <button class='dice-btn' onclick='rollDice(20, 13, 4, 2)'>+13 to hit</button> (1d4+2/19-20)" }
      ]
    },
    {
      name: "Manta (Planar Membrane Beast)",
      type: "Huge Magical Beast (Extraplanar)",
      ac: "22 (-2 size, +6 Dex, +8 natural), touch 14, flat-footed 16",
      hp: "123",
      hpDice: "13d10+52",
      speed: "Fly 60 ft. (good)",
      stats: "STR 24 (+7) | DEX 22 (+6) | CON 19 (+4) | INT 4 (-3) | WIS 16 (+3) | CHA 11 (+0)",
      skills: "Stealth +12",
      senses: "Blindsight 60 ft.",
      languages: "-",
      cr: "11 (7,200 XP)",
      cr_num: 11,
      theme: "void",
      type_category: "magical beast",
      location: ["ocean", "deep"],
      traits: [
        { name: "Ethereal Jaunt (Su)", desc: "At will as a free action; it can shift to the Ethereal Plane, move, and shift back to the Material Plane in the same turn." }
      ],
      actions: [
        { name: "Tail Sting and Wings", desc: "Tail Sting <button class='dice-btn' onclick='rollDice(20, 18, 6, 7)'>+18 to hit</button> (2d6+7 plus poison) and 2 Wings <button class='dice-btn' onclick='rollDice(20, 13, 8, 3)'>+13 to hit</button> (1d8+3)" },
        { name: "Psychic Poison (Ex)", desc: "Fortitude DC 20; Initial and Secondary damage 1d4 Intelligence." },
        { name: "Smothering Envelope (Ex)", desc: "If both wing attacks hit, starts a grapple as a free action. Squeezes for 2d8+3 bludgeoning damage each round." }
      ]
    },
    {
      name: "Reedsinger (Hollow Stag)",
      type: "Large Undead (Fey-Touched)",
      ac: "17 (-1 size, +2 Dex, +6 natural), touch 11, flat-footed 15",
      hp: "45",
      hpDice: "7d12",
      speed: "50 ft.",
      stats: "STR 18 (+4) | DEX 14 (+2) | CON - | INT 2 (-4) | WIS 12 (+1) | CHA 16 (+3)",
      skills: "Perception +5",
      senses: "Darkvision 60 ft.",
      languages: "-",
      cr: "5 (1,800 XP)",
      cr_num: 5,
      theme: "independent",
      type_category: "undead",
      location: ["docks", "ocean"],
      traits: [
        { name: "Undead Traits", desc: "Immune to mind-affecting effects, poison, sleep, paralysis, stunning, disease, and death effects." },
        { name: "Damage Reduction", desc: "DR 5/Bludgeoning." },
        { name: "Bog-Stride", desc: "Ignores difficult terrain in swamps/mud." }
      ],
      actions: [
        { name: "Gore and Hooves", desc: "Gore <button class='dice-btn' onclick='rollDice(20, 7, 6, 6)'>+7 to hit</button> (2d6+6) and 2 Hooves <button class='dice-btn' onclick='rollDice(20, 2, 4, 2)'>+2 to hit</button> (1d4+2)" },
        { name: "Captivating Song (Su)", desc: "60-ft spread. All living creatures must make a Will DC 15 save or become captivated and walk toward it." }
      ]
    }
];

// Handle Dice Rolls
window.rollDice = function(d20, hitMod, dDamage, dmgMod) {
    const attackRoll = Math.floor(Math.random() * d20) + 1;
    const damageRoll = Math.floor(Math.random() * dDamage) + 1;
    const attackTotal = attackRoll + hitMod;
    const dmgTotal = damageRoll + dmgMod;
    
    let result = \`Attack: \${attackRoll} + \${hitMod} = <strong>\${attackTotal}</strong><br>Damage: \${damageRoll} + \${dmgMod} = <strong>\${dmgTotal}</strong>\`;
    
    if (attackRoll === 20) {
        const critDamage = damageRoll + Math.floor(Math.random() * dDamage) + 1;
        result = \`<strong style="color:#ef4444;">CRITICAL HIT!</strong><br>Attack: 20<br>Damage: <strong>\${critDamage + dmgMod}</strong>\`;
    }
    if (attackRoll === 1) {
        result = \`<strong style="color:#ef4444;">CRITICAL MISS!</strong>\`;
    }
    
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
    
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=dice-roll.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play prevented:', e));
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function buildStatblockHTML(m) {
    let html = \`<div class="statblock" style="background: #fdf6e3; color: #000; padding: 20px; border: 4px solid #d4af37; border-radius: 8px; font-family: 'Georgia', serif; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">\`;
    html += \`<h2 style="color: #8b0000; margin: 0; font-family: 'Cinzel', serif;">\${m.name}</h2>\`;
    html += \`<p style="font-style: italic; margin: 0 0 10px 0; color: #555;">\${m.type}</p>\`;
    html += \`<hr style="border-top: 2px solid #8b0000; margin: 5px 0;">\`;
    html += \`<p style="margin: 5px 0;"><strong>Armor Class</strong> \${m.ac}</p>\`;
    html += \`<p style="margin: 5px 0;"><strong>Hit Points</strong> \${m.hp} (\${m.hpDice})</p>\`;
    html += \`<p style="margin: 5px 0;"><strong>Speed</strong> \${m.speed}</p>\`;
    html += \`<hr style="border-top: 2px solid #8b0000; margin: 5px 0;">\`;
    html += \`<p style="margin: 10px 0; font-weight: bold; text-align: center; color: #8b0000;">\${m.stats}</p>\`;
    html += \`<hr style="border-top: 2px solid #8b0000; margin: 5px 0;">\`;
    if(m.skills) html += \`<p style="margin: 5px 0;"><strong>Skills</strong> \${m.skills}</p>\`;
    html += \`<p style="margin: 5px 0;"><strong>Senses</strong> \${m.senses}</p>\`;
    html += \`<p style="margin: 5px 0;"><strong>Languages</strong> \${m.languages}</p>\`;
    html += \`<p style="margin: 5px 0;"><strong>Challenge</strong> \${m.cr}</p>\`;
    html += \`<hr style="border-top: 2px solid #8b0000; margin: 5px 0;">\`;
    
    if (m.traits) {
        m.traits.forEach(t => {
            html += \`<p style="margin: 5px 0;"><strong><em>\${t.name}.</em></strong> \${t.desc}</p>\`;
        });
    }
    
    if (m.actions && m.actions.length > 0) {
        html += \`<h3 style="color: #8b0000; border-bottom: 1px solid #8b0000; margin-top: 15px; margin-bottom: 10px;">Actions</h3>\`;
        m.actions.forEach(a => {
            html += \`<p style="margin: 5px 0;"><strong><em>\${a.name}.</em></strong> \${a.desc}</p>\`;
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
        const loc = document.getElementById('encounter-location').value;
        const theme = document.getElementById('encounter-theme').value;
        const type = document.getElementById('encounter-type').value;
        const sizeMode = document.getElementById('encounter-size').value; // 'random', 'small', 'single'
        const targetCr = parseInt(document.getElementById('encounter-cr').value, 10);
        
        const output = document.getElementById('encounter-output');
        
        // Filter DB
        let validMonsters = monsterDb.filter(m => {
            if (loc !== 'any' && (!m.location || !m.location.includes(loc))) return false;
            if (theme !== 'any' && m.theme !== theme) return false;
            if (type !== 'any' && m.type_category !== type) return false;
            return true;
        });
        
        if (validMonsters.length === 0) {
            output.innerHTML = '<p style="color:#ef4444;">No enemies match the selected criteria. The Void consumes this roll.</p>';
            return;
        }

        let currentCr = 0;
        let selectedMonsters = [];
        let failsafe = 50; 
        
        if (sizeMode === 'single') {
            // Find the closest CR to the target, without going over if possible.
            let candidates = validMonsters.filter(m => m.cr_num <= targetCr);
            if (candidates.length === 0) {
                // If all are higher than targetCr, take the lowest possible one.
                candidates = [...validMonsters].sort((a,b) => a.cr_num - b.cr_num);
            } else {
                // Sort by highest CR closest to target
                candidates.sort((a,b) => b.cr_num - a.cr_num);
            }
            
            // Collect all candidates sharing the optimal CR
            let optimalCr = candidates[0].cr_num;
            let bestMatches = candidates.filter(m => m.cr_num === optimalCr);
            let chosen = bestMatches[Math.floor(Math.random() * bestMatches.length)];
            
            selectedMonsters.push(chosen);
            currentCr = chosen.cr_num;
            
        } else if (sizeMode === 'small') {
            // 1 to 3 enemies
            let maxEnemies = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
            
            while (currentCr < targetCr && selectedMonsters.length < maxEnemies && failsafe > 0) {
                let remainingCr = targetCr - currentCr;
                
                // If it's the last slot we can fill, try to fill the remaining CR completely
                let candidates = validMonsters.filter(m => m.cr_num <= remainingCr);
                
                if (candidates.length === 0) {
                    let smallest = [...validMonsters].sort((a,b) => a.cr_num - b.cr_num)[0];
                    if (smallest.cr_num > remainingCr && selectedMonsters.length > 0) {
                        break; 
                    }
                    candidates = [smallest];
                }
                
                let chosen = candidates[Math.floor(Math.random() * candidates.length)];
                selectedMonsters.push(chosen);
                currentCr += chosen.cr_num;
                failsafe--;
            }
            
        } else {
            // 'random' (Greedy Knapsack)
            while (currentCr < targetCr && failsafe > 0) {
                let candidates = validMonsters.filter(m => m.cr_num <= (targetCr - currentCr));
                if (candidates.length === 0) {
                    let smallest = [...validMonsters].sort((a,b) => a.cr_num - b.cr_num)[0];
                    if (smallest.cr_num > (targetCr - currentCr) && selectedMonsters.length > 0) {
                        break; // Close enough
                    }
                    candidates = [smallest];
                }
                
                let chosen = candidates[Math.floor(Math.random() * candidates.length)];
                selectedMonsters.push(chosen);
                currentCr += chosen.cr_num;
                failsafe--;
            }
        }
        
        // Render
        let html = `<div style="color: #cbd5e1; margin-bottom: 10px;">Generated Encounter (Total CR: ${currentCr} | Enemies: ${selectedMonsters.length})</div>`;
        selectedMonsters.forEach(m => {
            html += buildStatblockHTML(m);
        });
        
        output.innerHTML = html;
        
        localStorage.setItem('bq_saved_encounter', html);
    });
    
    // Restore on load
    const savedEncounter = localStorage.getItem('bq_saved_encounter');
    if (savedEncounter) {
        const output = document.getElementById('encounter-output');
        if (output) output.innerHTML = savedEncounter;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnCopy = document.getElementById('btn-copy-encounter');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const output = document.getElementById('encounter-output');
            if (!output) return;
            
            let markdown = "### Generated Encounter Statblocks\\n\\n";
            let text = output.innerText;
            text = text.replace(/\\n\\s*\\n/g, '\\n\\n');
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
