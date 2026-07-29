// Sovereign Shipyards Logic

// Component Database & Pricing
const catalog = {
    chassis: {
        skiff: { name: "Sluice-Skiff", type: "Gargantuan Vehicle (Water)", cost: 2000, maxHPt: 2, hp: 100, dt: 0, speedBase: 35, sizeBaseAc: 11, str: 14, dex: 14, con: 12, crewMin: 1, crewMax: 3, cargo: "1 ton", desc: "A nimble, flat-bottomed skiff designed for weaving through the narrow, shallow sluiceways of the Quay." },
        corpseraft: { name: "Corpse-Raft", type: "Gargantuan Vehicle (Water)", cost: 1000, maxHPt: 1, hp: 60, dt: 0, speedBase: 25, sizeBaseAc: 9, str: 12, dex: 10, con: 10, crewMin: 1, crewMax: 2, cargo: "500 lbs", desc: "A macabre raft fashioned from stitched-together husks and driftwood. Cheap, slow, but easily replaced." },
        catamaran: { name: "Smuggler's Catamaran", type: "Gargantuan Vehicle (Water)", cost: 3500, maxHPt: 3, hp: 120, dt: 5, speedBase: 45, sizeBaseAc: 13, str: 14, dex: 18, con: 12, crewMin: 2, crewMax: 5, cargo: "2 tons", desc: "Twin-hulled and incredibly fast, favored by those needing to outrun the sovereign patrols." },
        gunboat: { name: "Assault Gunboat", type: "Gargantuan Vehicle (Water)", cost: 6000, maxHPt: 4, hp: 200, dt: 10, speedBase: 40, sizeBaseAc: 12, str: 18, dex: 12, con: 16, crewMin: 3, crewMax: 8, cargo: "5 tons", desc: "A heavily armored patrol vessel used by the enclave guard to enforce blockades." },
        pinnace: { name: "Smuggler's Pinnace", type: "Gargantuan Vehicle (Water)", cost: 8000, maxHPt: 5, hp: 250, dt: 10, speedBase: 50, sizeBaseAc: 14, str: 16, dex: 16, con: 14, crewMin: 4, crewMax: 10, cargo: "8 tons", desc: "A sleek, low-profile cutter built for speed, blockade running, and silent running in the dead of night." },
        abolethskiff: { name: "Aboleth Skiff", type: "Gargantuan Vehicle (Water/Submersed)", cost: 9000, maxHPt: 4, hp: 220, dt: 10, speedBase: 30, sizeBaseAc: 12, str: 18, dex: 14, con: 18, crewMin: 2, crewMax: 6, cargo: "3 tons", desc: "Fashioned from aberrant flesh and chitin, this vessel can travel along the surface or dive beneath the waves." },
        xoriatjunk: { name: "Xoriat War-Junk", type: "Gargantuan Vehicle (Water)", cost: 10000, maxHPt: 5, hp: 280, dt: 15, speedBase: 35, sizeBaseAc: 11, str: 16, dex: 10, con: 16, crewMin: 5, crewMax: 15, cargo: "10 tons", desc: "A vessel whose geometry makes no sense. Sails catch winds that aren't there, and holds contain more space than physically possible." },
        submersible: { name: "Deep-Sea Submersible", type: "Gargantuan Vehicle (Water)", cost: 12000, maxHPt: 3, hp: 150, dt: 15, speedBase: 25, sizeBaseAc: 12, str: 14, dex: 10, con: 18, crewMin: 2, crewMax: 5, cargo: "2 tons", desc: "A fully enclosed vessel designed to plumb the abyssal trenches of the Blackwater." },
        trenchcrawler: { name: "Deep-Trench Crawler", type: "Gargantuan Vehicle (Water)", cost: 14000, maxHPt: 4, hp: 200, dt: 18, speedBase: 20, sizeBaseAc: 14, str: 20, dex: 8, con: 20, crewMin: 3, crewMax: 6, cargo: "4 tons", desc: "Equipped with mechanical legs, this heavy submersible can scuttle along the ocean floor unaffected by currents." },
        clipper: { name: "Aether-Clipper", type: "Colossal Vehicle (Water)", cost: 15000, maxHPt: 5, hp: 300, dt: 15, speedBase: 60, sizeBaseAc: 13, str: 16, dex: 16, con: 14, crewMin: 5, crewMax: 15, cargo: "20 tons", desc: "The fastest ship on the Quay. Utilizes bound elementals and aetheric sails to achieve breakneck speeds." },
        galleon: { name: "Ironclad Galleon", type: "Colossal Vehicle (Water)", cost: 10000, maxHPt: 6, hp: 400, dt: 15, speedBase: 30, sizeBaseAc: 10, str: 20, dex: 10, con: 18, crewMin: 10, crewMax: 20, cargo: "30 tons", desc: "A massive, broad-beamed warship favored by established mercantile syndicates for hauling large bounties." },
        sahuaginraider: { name: "Sahuagin Raider", type: "Colossal Vehicle (Water)", cost: 11000, maxHPt: 5, hp: 350, dt: 15, speedBase: 40, sizeBaseAc: 11, str: 18, dex: 14, con: 16, crewMin: 8, crewMax: 18, cargo: "15 tons", desc: "Fashioned from massive shark-bones and kelp, this vessel is built for aggressive boarding and amphibious assaults." },
        aetherfrigate: { name: "Aether-Frigate", type: "Colossal Vehicle (Water)", cost: 16000, maxHPt: 7, hp: 450, dt: 15, speedBase: 45, sizeBaseAc: 12, str: 20, dex: 14, con: 18, crewMin: 12, crewMax: 25, cargo: "40 tons", desc: "A sophisticated naval vessel balancing heavy firepower, magical shielding, and solid speed." },
        leviathan: { name: "Leviathan Hunter", type: "Colossal Vehicle (Water)", cost: 18000, maxHPt: 8, hp: 500, dt: 20, speedBase: 25, sizeBaseAc: 11, str: 22, dex: 8, con: 20, crewMin: 15, crewMax: 30, cargo: "50 tons", desc: "A massive, heavily armored dreadnought outfitted specifically for hunting the great beasts of the depths." },
        necropolis: { name: "Necropolis Ark", type: "Colossal Vehicle (Water)", cost: 22000, maxHPt: 9, hp: 600, dt: 20, speedBase: 20, sizeBaseAc: 9, str: 22, dex: 8, con: 22, crewMin: 10, crewMax: 40, cargo: "80 tons", desc: "A floating mausoleum capable of transporting entire armies of the undead." },
        dreadnought: { name: "Subterranean Dreadnought", type: "Colossal Vehicle (Water)", cost: 25000, maxHPt: 10, hp: 650, dt: 20, speedBase: 20, sizeBaseAc: 9, str: 24, dex: 8, con: 24, crewMin: 20, crewMax: 50, cargo: "100 tons", desc: "The apex of naval engineering. A floating fortress capable of leveling coastal settlements." },
        nautiloid: { name: "Illithid Nautiloid", type: "Colossal Vehicle (Water/Air)", cost: 45000, maxHPt: 8, hp: 550, dt: 15, speedBase: 50, sizeBaseAc: 14, str: 18, dex: 18, con: 18, crewMin: 5, crewMax: 15, cargo: "30 tons", desc: "An alien vessel that traverses the aether. It defies conventional gravity and physics." },
        flagship: { name: "Sovereign Flagship", type: "Colossal Vehicle (Water)", cost: 100000, maxHPt: 15, hp: 1000, dt: 25, speedBase: 35, sizeBaseAc: 12, str: 30, dex: 10, con: 30, crewMin: 50, crewMax: 200, cargo: "500 tons", desc: "A floating city in its own right. The personal flagship of a Sovereign ruler." },
        behemoth: { name: "Behemoth-Class Juggernaut", type: "Colossal Vehicle (Water)", cost: 150000, maxHPt: 20, hp: 1500, dt: 30, speedBase: 15, sizeBaseAc: 10, str: 30, dex: 6, con: 30, crewMin: 100, crewMax: 500, cargo: "1000 tons", desc: "An unparalleled siege vessel, the size of a small island, bristling with enough weaponry to level an empire." },
        custom: { name: "Custom Vessel", type: "Vehicle", cost: 0, maxHPt: 5, hp: 100, dt: 0, speedBase: 30, sizeBaseAc: 10, str: 10, dex: 10, con: 10, crewMin: 1, crewMax: 5, cargo: "10 tons", desc: "A bespoke blueprint." }
    },
    materials: {
        standard: { name: "Standard Oak", cost: 0, hpMod: 0, dtMod: 0, speedMod: 0, acBonus: 0 },
        darkwood: { name: "Darkwood", cost: 3000, hpMod: -20, dtMod: 0, speedMod: 10, acBonus: 1 },
        iron: { name: "Deep-Iron", cost: 5000, hpMod: 50, dtMod: 5, speedMod: -5, acBonus: 2 },
        aetherglass: { name: "Aetherglass", cost: 8000, hpMod: 100, dtMod: 10, speedMod: 0, acBonus: 3 },
        ghostwood: { name: "Ghostwood", cost: 6000, hpMod: -10, dtMod: 0, speedMod: 5, acBonus: 1, traits: [{name: "Ethereal Shift", desc: "The ship can pass through non-magical barriers and obstacles."}] },
        boneplating: { name: "Bone-Plating", cost: 4000, hpMod: 20, dtMod: 2, speedMod: -5, acBonus: 1, traits: [{name: "Necrotic Resonance", desc: "The ship resists necrotic damage and is ignored by mindless undead."}] },
        coralgrowth: { name: "Coral-Growth", cost: 5500, hpMod: 40, dtMod: 2, speedMod: 0, acBonus: 1, traits: [{name: "Living Hull", desc: "The ship regains 10 HP every hour it spends submerged in saltwater."}] },
        nullsteel: { name: "Null-Steel", cost: 10000, hpMod: 80, dtMod: 5, speedMod: -5, acBonus: 2, traits: [{name: "Magic Resistance", desc: "The ship has advantage on saving throws against spells and magical effects."}] }
    },
    cores: {
        none: { name: "Standard Furnace", cost: 0 },
        elemental: { name: "Bound Fire Elemental", cost: 5000, traits: [{ name: "Elemental Engine", desc: "Increase speed by 10 ft. Fire damage to the engine room heals the ship instead." }] },
        necrotic: { name: "Necrotic Soul-Engine", cost: 7000, traits: [{ name: "Soul-Burner", desc: "As a bonus action, sacrifice a living prisoner to instantly repair 3d10 HP." }] },
        psionic: { name: "Psionic Resonator", cost: 8000, traits: [{ name: "Mind-Link", desc: "The captain can telepathically pilot the ship and communicate with all crew aboard." }] },
        chronal: { name: "Chronal Core", cost: 12000, traits: [{ name: "Time-Slip", desc: "Once per day, the ship can rewind time by 1 round, undoing all damage and movement." }] },
        radiant: { name: "Radiant Core", cost: 9000, traits: [{ name: "Divine Aura", desc: "The ship sheds bright light in a 60 ft radius. Undead boarding the ship take 1d10 radiant damage per round." }] },
        shadowvortex: { name: "Shadow-Vortex", cost: 8500, traits: [{ name: "Penumbra", desc: "The ship is always considered lightly obscured, giving attackers disadvantage." }] },
        feyspark: { name: "Fey-Spark", cost: 6000, traits: [{ name: "Unpredictable Surge", desc: "At the start of its turn, roll a d4. On a 4, the ship's speed is doubled for the turn." }] },
        boundfiend: { name: "Bound-Fiend Engine", cost: 10000, traits: [{ name: "Hellfire Exhaust", desc: "Vessels passing directly behind this ship take 3d6 fire damage from infernal exhaust." }] },
        clockwork: { name: "Clockwork Heart", cost: 7500, traits: [{ name: "Perfect Rhythm", desc: "The ship never suffers from difficult terrain penalties related to water currents or weather." }] }
    },
    propulsion: {
        standard: { name: "Standard Rigging", cost: 0 },
        sails: { name: "Aether-Sails", cost: 2500, traits: [{ name: "Aether Catch", desc: "The ship can travel at full speed even against the wind, catching magical currents instead." }] },
        thrusters: { name: "Alchemical Thrusters", cost: 4000, traits: [{ name: "Afterburner", desc: "Once per short rest, the ship can Dash as a bonus action, leaving a cloud of toxic smoke behind it." }] },
        void: { name: "Void-Wake Generator", cost: 8000, traits: [{ name: "Void-Slip", desc: "The ship leaves no wake, making it impossible to track by mundane means through the water." }] },
        oarbanks: { name: "Oar-Banks", cost: 1000, traits: [{ name: "Manual Power", desc: "The ship can continue moving even in a dead magic zone or complete wind stillness, assuming crew is alive/active." }] },
        waterjets: { name: "Water-Jet Siphons", cost: 3500, traits: [{ name: "Jet Burst", desc: "The ship can move horizontally up to 30ft without provoking opportunity attacks once per combat." }] },
        teleport: { name: "Teleportation Matrix", cost: 15000, traits: [{ name: "Blink Drive (3/Day)", desc: "As an action, the ship teleports up to 500 feet to an unoccupied space of water." }] },
        tentacles: { name: "Tentacle Appendages", cost: 6000, traits: [{ name: "Crawling Depths", desc: "The ship can climb sheer underwater cliffs and grapple other ships (Advantage on boarding)." }] }
    },
    armor: {
        none: { name: "No Armor", cost: 0 },
        plated: { name: "Mithral Plating", cost: 5000, acBonus: 2, traits: [{ name: "Lightweight", desc: "The ship gains +2 AC without suffering the speed penalty usually associated with plating." }] },
        ablative: { name: "Ablative Carapace", cost: 4000, acBonus: 1, traits: [{ name: "Shatter-Plates", desc: "The first time the ship takes 50 or more damage in a single hit, the damage is halved, but the armor's AC bonus is lost until repaired." }] },
        reflective: { name: "Arcane Reflective Hull", cost: 8000, acBonus: 3, traits: [{ name: "Spell Reflection", desc: "If the ship is targeted by a line spell or a spell that requires a ranged attack roll, roll a d6. On a 6, the spell is reflected back at the caster." }] },
        spiked: { name: "Spiked Carapace", cost: 4500, acBonus: 1, traits: [{ name: "Thorns", desc: "Any ship that rams this vessel takes 4d10 piercing damage. Boarding parties take 1d6 damage when crossing." }] },
        energyshield: { name: "Energy-Shield Matrix", cost: 9000, acBonus: 0, traits: [{ name: "Recharging Ward", desc: "The ship gains 50 temporary hit points. These refresh fully at dawn." }] },
        chameleon: { name: "Chameleon Hull", cost: 6500, acBonus: 1, traits: [{ name: "Optical Camouflage", desc: "The ship has advantage on Stealth checks to hide in fog, darkness, or against coastlines." }] },
        slime: { name: "Slime-Coated", cost: 3500, acBonus: 1, traits: [{ name: "Slick", desc: "The ship is immune to grappling from other ships and giant sea creatures." }] }
    },
    figureheads: {
        none: { name: "None", cost: 0 },
        dragon: { name: "Dragon's Breath", cost: 3000, action: { name: "Dragon's Breath (1/Day)", desc: "Exhales a 60ft cone of fire. DC 15 Dex save for 6d6 fire damage." } },
        banshee: { name: "Wailing Banshee", cost: 4500, action: { name: "Banshee's Wail (1/Day)", desc: "All enemy crew within 120ft must make a DC 14 Wis save or be frightened for 1 minute." } },
        beholder: { name: "Beholder's Eye", cost: 6000, action: { name: "Antimagic Cone", desc: "Projects a 150-foot cone of antimagic. Spells and magical effects are suppressed within the area." } },
        medusa: { name: "Medusa Visage", cost: 5000, action: { name: "Petrifying Gaze (1/Day)", desc: "Enemy crew looking at the ship must make a DC 14 Con save or be restrained, turning to stone on a subsequent failure." } },
        kraken: { name: "Kraken Tentacles", cost: 4000, action: { name: "Grasping Wood", desc: "The figurehead animating to grapple a ship within 30 ft. The target's speed becomes 0." } },
        siren: { name: "Siren's Call", cost: 3500, action: { name: "Alluring Song (1/Day)", desc: "Enemy helmsman must make a DC 15 Wis save or be forced to steer their ship toward this vessel." } },
        gargoyle: { name: "Gargoyle Ward", cost: 4000, action: { name: "Stone Guardian", desc: "When the ship takes damage, the figurehead can shatter to grant the ship resistance to that damage instance." } }
    },
    weapons: {
        none: { name: "None", cost: 0, hpt: 0 },
        ballista: { name: "Heavy Ballista", cost: 2000, hpt: 2, action: { name: "Heavy Ballista", desc: "Ranged Weapon Attack: +6 to hit, range 120/480 ft., one target. Hit: 16 (3d10) piercing damage." }},
        trebuchet: { name: "Fletched Trebuchet", cost: 4000, hpt: 4, action: { name: "Trebuchet", desc: "Ranged Weapon Attack: +5 to hit, range 300/1,200 ft. (can't hit targets within 60 ft.). Hit: 44 (8d10) bludgeoning damage." }},
        disruptor: { name: "Githyanki Disruptor", cost: 5000, hpt: 2, action: { name: "Psychic Disruptor", desc: "Ranged Spell Attack: +8 to hit, range 300 ft., one target. Hit: 22 (4d10) psychic damage. Target vehicle's speed is halved." }},
        spellcannon: { name: "Arcane Spell-Cannon", cost: 8000, hpt: 3, action: { name: "Channel Arcana", desc: "Gunner expends a spell slot. Ranged Spell Attack: +8 to hit, 150 ft. Hit: 1d10 force damage per level of the spell slot expended." }},
        lightning: { name: "Lightning Emitter", cost: 6000, hpt: 3, action: { name: "Lightning Arc (Recharge 5-6)", desc: "Fires a 100ft line of lightning. DC 16 Dex save for 28 (8d6) lightning damage. Double damage to Deep-Iron ships." }},
        gatling: { name: "Eldritch Gatling", cost: 7500, hpt: 2, action: { name: "Eldritch Burst", desc: "Fires 1d4+1 homing magic missiles. Each deals 1d4+1 force damage. No attack roll required." }},
        voidrift: { name: "Void-Rift Projector", cost: 12000, hpt: 5, action: { name: "Singularity (1/Day)", desc: "Creates a 30ft radius singularity 120ft away. Ships inside must make a DC 18 STR save or be pulled 30ft to the center and take 55 (10d10) force damage." }},
        necrotic: { name: "Necrotic Torpedo", cost: 9000, hpt: 4, action: { name: "Soul-Seeker", desc: "Fires a slow moving torpedo that homes in on the nearest living crew. Deals 8d10 necrotic damage on impact." }},
        harpoon: { name: "Harpoon Cannon", cost: 3000, hpt: 2, action: { name: "Tethering Harpoon", desc: "Ranged Weapon Attack: +6 to hit, range 120 ft. Hit: 11 (2d10) piercing damage, and the target ship is grappled." }},
        acidspitter: { name: "Acid-Spitter", cost: 4500, hpt: 3, action: { name: "Corrosive Glob", desc: "Ranged Weapon Attack: +5 to hit, range 150 ft. Hit: 18 (4d8) acid damage, and 9 (2d8) acid damage at the start of its next turn." }},
        sonic: { name: "Sonic Resonator", cost: 6500, hpt: 3, action: { name: "Shatter-Wave", desc: "Fires a 60 ft cone of sound. DC 15 Con save for 6d6 thunder damage. Deals double damage to glass or ice structures." }},
        mindflayer: { name: "Mind-Flayer Beam", cost: 10000, hpt: 4, action: { name: "Psionic Blast", desc: "Fires a 90 ft line. Enemy crew must make a DC 16 Int save or be stunned until the end of their next turn." }},
        magmamortar: { name: "Magma Mortar", cost: 8500, hpt: 5, action: { name: "Volcanic Strike", desc: "Targets a 20ft radius up to 300 ft away. DC 15 Dex save for 8d6 fire damage. Sets flammable objects on fire." }},
        cryocaster: { name: "Cryo-Caster", cost: 7000, hpt: 3, action: { name: "Flash-Freeze", desc: "Ranged Spell Attack: +7 to hit, 120 ft. Hit: 22 (4d10) cold damage. If the target is in water, it becomes encased in ice (Speed 0) until destroyed (AC 12, 30 HP)." }},
        ghostfire: { name: "Ghost-Fire Projector", cost: 9500, hpt: 3, action: { name: "Spectral Flames", desc: "Ranged Spell Attack: +7 to hit, 150 ft. Hit: 27 (6d8) necrotic damage. This attack ignores the ship's AC and targets the crew directly." }},
        swarmpod: { name: "Clockwork Swarm-Pod", cost: 5500, hpt: 2, action: { name: "Deploy Swarm", desc: "Fires a canister up to 120 ft that deploys a Swarm of Mechanical Spiders onto the enemy deck." }},
        minelayer: { name: "Gravitic Mine-Layer", cost: 8000, hpt: 4, action: { name: "Drop Mine", desc: "Drops an invisible mine behind the ship. The next ship to pass within 20 ft triggers it: DC 16 Dex save for 10d6 force damage." }}
    },
    countermeasures: {
        none: { name: "None", cost: 0 },
        smokescreen: { name: "Alchemical Smokescreen", cost: 1500, action: { name: "Deploy Smoke", desc: "Fills a 60ft radius with thick smoke. Heavily obscures the area for 1 minute." } },
        flare: { name: "Aether-Flare", cost: 2000, action: { name: "Launch Flare", desc: "Fires a bright flare that dispels magical darkness and grants advantage on perception checks in the area." } },
        shield: { name: "Kinetic Deflector Shield", cost: 5000, action: { name: "Deflect (Reaction)", desc: "When the ship is hit by a ranged attack, use a reaction to add +5 to the ship's AC against that attack." } },
        chaff: { name: "Chaff Dispenser", cost: 2500, action: { name: "Metallic Chaff (Reaction)", desc: "When targeted by Magic Missile or a homing attack, use a reaction to automatically negate the attack." } },
        aetherpulse: { name: "Aether-Pulse", cost: 4500, action: { name: "EMP Blast (1/Day)", desc: "Emits a 120ft pulse. Magical propulsion and energy shields on enemy ships fail for 1d4 rounds." } },
        decoy: { name: "Decoy Beacon", cost: 3000, action: { name: "Deploy Decoy", desc: "Drops a floating beacon that mimics the ship's magical signature, redirecting homing attacks and unintelligent sea monsters." } },
        mirrorimage: { name: "Mirror-Image Generator", cost: 6000, action: { name: "Illusory Fleet (1/Day)", desc: "Creates 3 illusory duplicates of the ship. Attackers must roll a d20 to determine if they hit the real ship." } }
    },
    auxiliary: {
        none: { name: "None", cost: 0 },
        lifeboat: { name: "Armored Lifeboat", cost: 1000, traits: [{ name: "Escape Vessel", desc: "Holds 6 medium creatures. Has AC 15 and 50 HP. Used for emergency evacuation." }] },
        boarding: { name: "Boarding Torpedo", cost: 2500, traits: [{ name: "Breaching Pod", desc: "Fired at an enemy ship. Pierces the hull and deposits up to 4 boarding crew directly inside the enemy vessel." }] },
        diving: { name: "Diving Bell", cost: 2000, traits: [{ name: "Deep Exploration", desc: "Can be lowered up to 1,000 feet deep. Provides breathable air for 4 creatures for 8 hours." }] },
        scoutdrone: { name: "Scout Drone", cost: 3000, traits: [{ name: "Aetheric Eye", desc: "A mechanical owl that can fly up to 1 mile away, transmitting visual data back to the helm." }] },
        torpedosled: { name: "Torpedo-Sled", cost: 3500, traits: [{ name: "Kamikaze Craft", desc: "A fast, one-man sled loaded with explosives. Deals 10d10 fire damage if rammed into a target." }] },
        repairskiff: { name: "Repair-Skiff", cost: 2800, traits: [{ name: "Mobile Patching", desc: "A tiny skiff with welding tools. Grants advantage on checks to repair the ship during combat." }] },
        assaultpod: { name: "Assault-Pod", cost: 4000, traits: [{ name: "Deck-Clearer", desc: "Fires an explosive pod onto the enemy deck. Deals 4d6 fire damage in a 20ft radius, then deploys 2 construct boarders." }] }
    },
    crew: {
        standard: { name: "Standard Hired Crew", cost: 0, traits: [{ name: "Mundane Mariners", desc: "Standard stats for sailors. Require food, water, and sleep. Morale can break under heavy fire." }] },
        skeletal: { name: "Skeletal Laborers", cost: 1000, traits: [{ name: "Tireless Undead", desc: "Immune to poison and exhaustion. They don't eat or sleep, but perform complex tasks with disadvantage." }] },
        sablehook: { name: "Sablehook Smugglers", cost: 3000, traits: [{ name: "Veteran Rogues", desc: "Advantage on stealth checks for the ship, and highly proficient in boarding actions." }] },
        thessalan: { name: "Thessalan Mutants", cost: 4000, traits: [{ name: "Flesh-Crafted", desc: "Can breathe underwater. They regenerate 1 HP per minute and have natural armor." }] },
        construct: { name: "Construct Automatons", cost: 5000, traits: [{ name: "Perfect Discipline", desc: "Immune to psychic damage, charm, and fear. They follow orders perfectly but lack creative problem solving." }] },
        merfolk: { name: "Merfolk Mercenaries", cost: 3500, traits: [{ name: "Masters of the Deep", desc: "Grants the ship advantage on checks to navigate treacherous underwater terrain or avoid sea monsters." }] },
        cultist: { name: "Cultist Fanatics", cost: 2000, traits: [{ name: "Zealous Fervor", desc: "Immune to fear. When the ship is reduced to 0 HP, they deliberately detonate the core (10d10 force damage in 60ft)." }] },
        ghost: { name: "Ghost-Crew", cost: 6000, traits: [{ name: "Ethereal Hands", desc: "Unaffected by physical hazards like fire or acid on deck. Cannot be killed by normal weapons." }] }
    },
    upgrades: {
        smuggler: { name: "Smuggler's Hold", cost: 2000, hpt: 1, traits: [
            { name: "Lead-Lined Compartment", desc: "Items inside the hold cannot be detected by divination magic such as Detect Magic or Locate Object." }
        ]},
        biolab: { name: "Biomancer's Lab", cost: 5000, hpt: 1, traits: [
            { name: "Mobile Laboratory", desc: "Provides advantage on checks made to craft alchemical items or flesh-grafts while underway." }
        ]},
        brig: { name: "Null-Brig", cost: 4000, hpt: 1, traits: [
            { name: "Dampening Cells", desc: "Creatures locked inside the brig cannot cast spells with verbal or somatic components, and magic items they carry become mundane." }
        ]},
        chronal: { name: "Chronal Engine", cost: 4000, hpt: 1, traits: [
            { name: "Chronal Override (1/Day)", desc: "The captain can push the engine into overdrive. The ship can immediately take one additional action on its turn." }
        ]},
        vats: { name: "Thessalan Vats", cost: 2500, hpt: 1, traits: [
            { name: "Biomantic Support System", desc: "Living crew members aboard the ship regain 1d6 hit points at the start of each of their turns." }
        ]},
        triweave: { name: "Tri-Weave Cloaking", cost: 6000, hpt: 2, traits: [
            { name: "Sovereign Shroud (1/Day)", desc: "The ship and everything aboard it becomes invisible to normal sight and magical scrying for 1 hour, or until the ship makes an attack." }
        ]},
        falsekeel: { name: "False Keel", cost: 3500, hpt: 1, traits: [
            { name: "Hidden Compartment", desc: "An external false keel that can detach and drop to the ocean floor in an emergency, preserving illicit cargo." }
        ]},
        vampirichull: { name: "Vampiric Hull", cost: 7000, hpt: 2, traits: [
            { name: "Blood-Wake", desc: "Whenever the ship deals damage to a living creature (e.g. ramming a sea monster), the ship regains HP equal to half the damage dealt." }
        ]},
        aethertether: { name: "Aether-Tether", cost: 4500, hpt: 1, traits: [
            { name: "Energy Tow", desc: "Projects a beam of force that can tow a willing vessel, or grapple an unwilling vessel within 120 ft (opposed strength check)." }
        ]},
        dimensionalanchor: { name: "Dimensional Anchor", cost: 8000, hpt: 2, traits: [
            { name: "Lockdown", desc: "While active, no creature or vessel can teleport into or out of a 300-foot radius around the ship." }
        ]},
        symbiotichelm: { name: "Symbiotic Helm", cost: 5500, hpt: 1, traits: [
            { name: "Neural Link", desc: "The helmsman connects physically to the ship. They use their INT or CHA for ship checks, but take psychic damage equal to any hull damage." }
        ]},
        alchemicaldistillery: { name: "Alchemical Distillery", cost: 3000, hpt: 1, traits: [
            { name: "Daily Brewing", desc: "The ship generates 1d4 random common/uncommon potions or alchemical bombs every dawn." }
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
    let usedHpt = 0;

    const chassisId = document.getElementById('select-chassis').value;
    const materialId = document.getElementById('select-material').value;
    const coreId = document.getElementById('select-core').value;
    const propId = document.getElementById('select-propulsion').value;
    const armorId = document.getElementById('select-armor').value;
    const figId = document.getElementById('select-figurehead').value;
    const cmId = document.getElementById('select-countermeasure').value;
    const auxId = document.getElementById('select-auxiliary').value;
    const crewId = document.getElementById('select-crew').value;
    const weaponId = document.getElementById('select-weapon').value;
    const weaponId2 = document.getElementById('select-weapon2').value;
    const weaponId3 = document.getElementById('select-weapon3').value;

    let c = catalog.chassis[chassisId];
    if(chassisId === "custom") {
        c = { cost: 0, maxHPt: parseInt(document.getElementById("custom-hpt")?.value) || 5 };
    }
    
    total += c.cost;
    total += catalog.materials[materialId].cost;
    if(catalog.cores[coreId]) total += catalog.cores[coreId].cost;
    if(catalog.propulsion[propId]) total += catalog.propulsion[propId].cost;
    if(catalog.armor[armorId]) total += catalog.armor[armorId].cost;
    if(catalog.figureheads[figId]) total += catalog.figureheads[figId].cost;
    if(catalog.countermeasures[cmId]) total += catalog.countermeasures[cmId].cost;
    if(catalog.auxiliary[auxId]) total += catalog.auxiliary[auxId].cost;
    if(catalog.crew[crewId]) total += catalog.crew[crewId].cost;
    
    let w = catalog.weapons[weaponId];
    total += w.cost;
    usedHpt += (w.hpt || 0);

    const upgrades = document.querySelectorAll('.cb-upgrade:checked');
    upgrades.forEach(u => {
        let up = catalog.upgrades[u.value];
        total += up.cost;
        usedHpt += (up.hpt || 1);
    });

    const tDisplay = document.getElementById("total-cost-display");
    if(tDisplay) tDisplay.textContent = total.toLocaleString();
    
    const hptDisplay = document.getElementById("hpt-display");
    if (hptDisplay) {
        hptDisplay.textContent = usedHpt + " / " + c.maxHPt;
        if (usedHpt > c.maxHPt) {
            hptDisplay.style.color = "#ef4444";
        } else {
            hptDisplay.style.color = "#10b981";
        }
    }
}

// Build Stat Block
document.getElementById("btn-build").addEventListener("click", () => {
    document.getElementById("placeholder-panel").classList.add("hidden");
    document.getElementById("statblock-container").classList.remove("hidden");

    const chassisId = document.getElementById("select-chassis").value;
    const materialId = document.getElementById("select-material").value;
    const coreId = document.getElementById("select-core").value;
    const propulsionId = document.getElementById("select-propulsion").value;
    const armorId = document.getElementById("select-armor").value;
    const weaponId = document.getElementById("select-weapon").value;
    const weaponId2 = document.getElementById("select-weapon2").value;
    const weaponId3 = document.getElementById("select-weapon3").value;
    const figureheadId = document.getElementById("select-figurehead").value;
    const countermeasureId = document.getElementById("select-countermeasure").value;
    const crewId = document.getElementById("select-crew").value;
    const auxiliaryId = document.getElementById("select-auxiliary").value;
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
            cargo: document.getElementById("custom-cargo").value || "10 tons",
            maxHPt: parseInt(document.getElementById("custom-hpt").value) || 5
        };
    }
    const core = catalog.cores[coreId];
    const prop = catalog.propulsion[propulsionId];
    const armor = catalog.armor[armorId];
    const weapon = catalog.weapons[weaponId];
    const weapon2 = catalog.weapons[weaponId2];
    const weapon3 = catalog.weapons[weaponId3];
    const figurehead = catalog.figureheads[figureheadId];
    const countermeasure = catalog.countermeasures[countermeasureId];
    const crew = catalog.crew[crewId];
    const auxiliary = catalog.auxiliary[auxiliaryId];

    document.getElementById("sb-name").textContent = "Custom " + material.name + " " + chassis.name;
    document.getElementById("sb-type").textContent = chassis.type;

    let baseAc = chassis.sizeBaseAc || 10;
    document.getElementById("sb-ac").textContent = baseAc + (armor.acBonus || 0);
    document.getElementById("sb-ac-desc").textContent = "(" + armor.name + ")";
    
    document.getElementById("sb-hp").textContent = (chassis.hp || 100) + (material.hpMod || 0);
    document.getElementById("sb-hp-desc").textContent = "(Damage Threshold " + ((chassis.dt || 0) + (material.dtMod || 0)) + ")";
    
    document.getElementById("sb-speed").textContent = ((chassis.speedBase || 30) + (material.speedMod || 0)) + " ft.";
    document.getElementById("sb-crew").textContent = chassis.crewMin + "-" + chassis.crewMax;
    document.getElementById("sb-cargo").textContent = chassis.cargo;
    
    // Interactive HP
    let maxHp = chassis.hp + material.hpMod;
    document.getElementById("sb-hp").innerHTML = `<input type="number" id="live-hp-input" value="${maxHp}" style="width:60px; background:transparent; color:#e2e8f0; border:1px solid #475569; font-weight:bold;"> / ${maxHp}`;
    
    // Check HPT Overload
    let usedHpt = 0;
    usedHpt += (weapon ? (weapon.hpt || 0) : 0);
    usedHpt += (weapon2 ? (weapon2.hpt || 0) : 0);
    usedHpt += (weapon3 ? (weapon3.hpt || 0) : 0);
    document.querySelectorAll('input[name="upgrade"]:checked').forEach(u => { usedHpt += (catalog.upgrades[u.value].hpt || 1); });
    
    const overloadDiv = document.getElementById("sb-overload-warning");
    if(usedHpt > chassis.maxHPt) {
        overloadDiv.style.display = "block";
    } else {
        overloadDiv.style.display = "none";
    }


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
        if (catalog.upgrades[id].traits) {
            allTraits = allTraits.concat(catalog.upgrades[id].traits);
        }
    });

    allTraits = allTraits.filter(t => t !== undefined);

    if (allTraits.length === 0) {
        traitsContainer.innerHTML = "<div class=\'trait\'><em>No special traits.</em></div>";
    } else {
        allTraits.forEach(trait => {
            traitsContainer.innerHTML += "<div class=\'trait\'><strong>" + trait.name + ".</strong> " + trait.desc + "</div>";
        });
    }

        // Inject Crew Stations
    const stationsContainer = document.getElementById("sb-stations-container");
    if(stationsContainer) {
        stationsContainer.innerHTML = "";
        
        let helmDiv = document.createElement("div");
        helmDiv.innerHTML = "<strong>Helm (Requires 1 Crew).</strong> The pilot can use an action to move the ship up to its speed.";
        stationsContainer.appendChild(helmDiv);
        
        let engDiv = document.createElement("div");
        engDiv.innerHTML = "<strong>Engineering (Requires 1 Crew).</strong> The engineer can use an action to repair 2d10 hit points or grant +10 ft speed until end of next turn.";
        stationsContainer.appendChild(engDiv);
        
        let gunDiv = document.createElement("div");
        gunDiv.innerHTML = "<strong>Gunnery:  (Requires 1 Crew).</strong> The gunner can use an action to fire the primary weapon.";
        stationsContainer.appendChild(gunDiv);
    }

    const actionsContainer = document.getElementById("sb-actions-container");
    actionsContainer.innerHTML = "";
    const weaponList = [weapon, weapon2, weapon3];
    weaponList.forEach(w => {
        if (w && w.action) {
            actionsContainer.innerHTML += "<div class=\'trait\'><strong>" + w.action.name + ".</strong> " + w.action.desc + "</div>";
        }
    });
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

// VTT Catalog Data
const vttCatalog = [
    // Arcane Theme
    { id: "arcane-hull", name: "Arcane Frigate", type: "hull", theme: "arcane", src: "images/vtt_hull_arcane.jpg" },
    { id: "arcane-weap", name: "Spell-Cannon", type: "weapon", theme: "arcane", src: "images/vtt_weap_arcane.jpg" },
    { id: "arcane-util", name: "Aether Engine", type: "utility", theme: "arcane", src: "images/vtt_util_arcane.jpg" },
    
    // Gothic Theme
    { id: "gothic-hull", name: "Necropolis Ark", type: "hull", theme: "gothic", src: "images/vtt_hull_gothic.jpg" },
    { id: "gothic-weap", name: "Bone Harpoon", type: "weapon", theme: "gothic", src: "images/vtt_weap_gothic.jpg" },
    { id: "gothic-util", name: "Necrotic Reactor", type: "utility", theme: "gothic", src: "images/vtt_util_gothic.jpg" },
    
    // Clockwork Theme
    { id: "clock-hull", name: "Ironclad Juggernaut", type: "hull", theme: "clockwork", src: "images/vtt_hull_clockwork.jpg" },
    { id: "clock-weap", name: "Gatling Mortar", type: "weapon", theme: "clockwork", src: "images/vtt_weap_clockwork.jpg" },
    { id: "clock-util", name: "Brass Gear", type: "utility", theme: "clockwork", src: "images/vtt_util_clockwork.jpg" },
    
    // Organic Theme
    { id: "org-hull", name: "Biotech Crawler", type: "hull", theme: "organic", src: "images/vtt_hull_organic.jpg" },
    { id: "org-weap", name: "Acid Spitter", type: "weapon", theme: "organic", src: "images/vtt_weap_organic.jpg" },
    { id: "org-util", name: "Chitin Plate", type: "utility", theme: "organic", src: "images/vtt_util_organic.jpg" },

    // Legacy General Items
    { id: "skiff", name: "Skiff Hull", type: "hull", theme: "all", src: "images/vtt_hull_skiff.jpg" },
    { id: "dreadnought", name: "Dreadnought Hull", type: "hull", theme: "all", src: "images/vtt_hull_dreadnought.jpg" },
    { id: "nullsteel", name: "Null-Steel Plate", type: "armor", theme: "all", src: "images/vtt_armor_nullsteel.jpg" },
    { id: "ballista", name: "Ballista", type: "weapon", theme: "all", src: "images/vtt_weapon_ballista.jpg" },
    { id: "disruptor", name: "Disruptor", type: "weapon", theme: "all", src: "images/vtt_weapon_disruptor.jpg" },
];

function renderVTTPalette(filterTheme = 'all') {
    const container = document.getElementById('vtt-dynamic-palette');
    if (!container) return;
    
    // Group by type
    const grouped = {
        'hull': [],
        'weapon': [],
        'armor': [],
        'utility': []
    };
    
    vttCatalog.forEach(item => {
        if (filterTheme === 'all' || item.theme === 'all' || item.theme === filterTheme) {
            if(grouped[item.type]) grouped[item.type].push(item);
        }
    });
    
    let html = '';
    const typeNames = { hull: 'Hulls', weapon: 'Armaments', armor: 'Armor Plates', utility: 'Utilities' };
    
    for (let type in grouped) {
        if (grouped[type].length > 0) {
            html += `<div class="config-group"><h4>${typeNames[type]}</h4><div class="parts-grid">`;
            grouped[type].forEach(item => {
                html += `<img src="${item.src}" class="draggable-part" data-type="${item.type}" data-src="${item.src}" alt="${item.name}" title="${item.name}">`;
            });
            html += `</div></div>`;
        }
    }
    
    container.innerHTML = html;
    
    // Re-bind click events for new palette
    document.querySelectorAll('.draggable-part').forEach(img => {
        img.addEventListener('click', (e) => {
            if (e.target.classList.contains('selected')) {
                e.target.classList.remove('selected');
                activeImageObj = null;
                activeDataType = null;
                return;
            }
            document.querySelectorAll('.draggable-part').forEach(i => i.classList.remove('selected'));
            e.target.classList.add('selected');
            activeImageObj = new Image();
            activeImageObj.src = e.target.getAttribute('data-src');
            activeDataType = e.target.getAttribute('data-type');
            activeRotation = 0; 
            selectedItem = null;
            redrawCanvas();
        });
    });
}

// Bind Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderVTTPalette(e.target.getAttribute('data-filter'));
    });
});


// Canvas Setup
const canvas = document.getElementById('vtt-canvas');
const ctx = canvas.getContext('2d');
let activeImageObj = null;
let activeDataType = null; // 'hull', 'weapon', 'armor'
let activeRotation = 0; // in radians
const placedItems = [];
renderVTTPalette();

// Interaction State
let selectedItem = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Handle Canvas Interactions (Click, Drag, Select)
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // If we have an active item from palette, PLACE IT
    if (activeImageObj) {
        placedItems.push({
            img: activeImageObj,
            type: activeDataType,
            x: x,
            y: y,
            rotation: activeRotation,
            scale: 1.0,
            layer: activeDataType === 'hull' ? 0 : 1 // Hulls at bottom
        });
        
        // Deselect palette so we don't accidentally stamp multiple (optional, but good for UX)
        // Or keep it selected for multiple weapons. Let's keep it selected.
        redrawCanvas();
        return;
    }
    
    // Otherwise, try to SELECT an existing item
    // Search backwards to select top-most item first
    selectedItem = null;
    for (let i = placedItems.length - 1; i >= 0; i--) {
        const item = placedItems[i];
        const w = item.img.width * item.scale;
        const h = item.img.height * item.scale;
        // Basic bounding box check (doesn't account perfectly for rotation, but close enough for VTT tokens)
        if (x >= item.x - w/2 && x <= item.x + w/2 && y >= item.y - h/2 && y <= item.y + h/2) {
            selectedItem = item;
            isDragging = true;
            dragOffsetX = x - item.x;
            dragOffsetY = y - item.y;
            break;
        }
    }
    redrawCanvas();
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && selectedItem) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        selectedItem.x = x - dragOffsetX;
        selectedItem.y = y - dragOffsetY;
        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

// Handle Keyboard Controls
window.addEventListener('keydown', (e) => {
    if (vttModeDiv.style.display !== 'grid') return;
    
    // Rotation for palette active item OR selected canvas item
    if (e.key === 'r' || e.key === 'R') {
        if (selectedItem) {
            selectedItem.rotation += Math.PI / 2;
            redrawCanvas();
        } else if (activeImageObj) {
            activeRotation += Math.PI / 2;
        }
    }
    
    // Scaling and Deletion for selected item
    if (selectedItem) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedItem.scale += 0.1;
            redrawCanvas();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedItem.scale = Math.max(0.2, selectedItem.scale - 0.1);
            redrawCanvas();
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();
            const index = placedItems.indexOf(selectedItem);
            if (index > -1) {
                placedItems.splice(index, 1);
                selectedItem = null;
                redrawCanvas();
            }
        }
    }
});

// Draw Grid function
function drawGrid() {
    if(!ctx) return;
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.5)';
    ctx.lineWidth = 1;
    for(let i=0; i<=800; i+=40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 800); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(800, i); ctx.stroke();
    }
}

// Redraw everything
function redrawCanvas() {
    if(!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background color
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();

    // Sort by layer so hulls are drawn first
    const sortedItems = [...placedItems].sort((a, b) => a.layer - b.layer);

    sortedItems.forEach(item => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        
        const w = item.img.width * item.scale;
        const h = item.img.height * item.scale;
        
        // Highlight if selected
        if (item === selectedItem) {
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            ctx.strokeRect(-w/2, -h/2, w, h);
        }
        
        ctx.drawImage(item.img, -w/2, -h/2, w, h);
        ctx.restore();
    });
}

// Initial draw
redrawCanvas();

// Clear Button
document.getElementById('clear-canvas-btn').addEventListener('click', () => {
    placedItems.length = 0;
    selectedItem = null;
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

// ==========================================
// AUTO-VISUALIZER LOGIC
// ==========================================
const autoAssetMap = {
    // Hulls
    'skiff': 'images/auto_hull_skiff.jpg',
    'corpseraft': 'images/auto_hull_corpse.jpg',
    'catamaran': 'images/auto_hull_catamaran.jpg',
    'gunboat': 'images/auto_hull_gunboat.jpg',
    'pinnace': 'images/auto_hull_pinnace.jpg',
    'abolethskiff': 'images/auto_hull_aboleth.jpg',
    'xoriatjunk': 'images/auto_hull_xoriat.jpg',
    'submersible': 'images/auto_hull_sub.jpg',
    'trenchcrawler': 'images/auto_hull_sub.jpg',
    'clipper': 'images/auto_hull_clipper.jpg',
    'galleon': 'images/auto_hull_galleon.jpg',
    'sahuaginraider': 'images/auto_hull_sahuagin.jpg',
    'aetherfrigate': 'images/auto_hull_frigate.jpg',
    'leviathan': 'images/auto_hull_flagship.jpg', // Alias for now
    'necropolis': 'images/auto_hull_corpse.jpg', // Alias
    'dreadnought': 'images/vtt_hull_dreadnought.jpg', // Keep VTT for now if no custom gen
    'nautiloid': 'images/auto_hull_nautiloid.jpg',
    'flagship': 'images/auto_hull_flagship.jpg',
    'behemoth': 'images/auto_hull_behemoth.jpg',

    // Cores
    'elemental': 'images/auto_core_elemental.jpg',
    'necrotic': 'images/auto_core_necrotic.jpg',
    'psionic': 'images/auto_core_psionic.jpg',
    'chronal': 'images/auto_core_chronal.jpg',
    'radiant': 'images/auto_core_radiant.jpg',
    'shadowvortex': 'images/auto_core_shadow.jpg',
    'feyspark': 'images/auto_core_fey.jpg',
    'boundfiend': 'images/auto_core_fiend.jpg',
    'clockwork': 'images/auto_core_clockwork.jpg',

    // Propulsion
    'sails': 'images/auto_prop_sails.jpg',
    'thrusters': 'images/auto_prop_thrusters.jpg',
    'void': 'images/auto_prop_void.jpg',
    'oarbanks': 'images/auto_prop_oars.jpg',
    'waterjets': 'images/auto_prop_jets.jpg',
    'teleport': 'images/auto_prop_teleport.jpg',
    'tentacles': 'images/auto_prop_tentacles.jpg',

    // Armor
    'plated': 'images/auto_armor_plated.jpg',
    'ablative': 'images/auto_armor_ablative.jpg',
    'reflective': 'images/auto_armor_reflective.jpg',
    'spiked': 'images/auto_armor_spiked.jpg',
    'energyshield': 'images/auto_armor_energy.jpg',
    'chameleon': 'images/auto_armor_chameleon.jpg',
    'slime': 'images/auto_armor_slime.jpg',

    // Figurehead
    'dragon': 'images/auto_fig_dragon.jpg',
    'banshee': 'images/auto_fig_banshee.jpg',
    'beholder': 'images/auto_fig_beholder.jpg',
    'medusa': 'images/auto_fig_medusa.jpg',
    'kraken': 'images/auto_fig_kraken.jpg',
    'siren': 'images/auto_fig_siren.jpg',
    'gargoyle': 'images/auto_fig_gargoyle.jpg',

    // Weapons
    'ballista': 'images/auto_weap_ballista.jpg',
    'trebuchet': 'images/auto_weap_trebuchet.jpg',
    'disruptor': 'images/auto_weap_disruptor.jpg',
    'spellcannon': 'images/auto_weap_spellcannon.jpg',
    'lightning': 'images/auto_weap_lightning.jpg',
    'gatling': 'images/auto_weap_gatling.jpg',
    'voidrift': 'images/auto_weap_voidrift.jpg',
    'necrotic': 'images/auto_weap_necrotic.jpg',
    'harpoon': 'images/auto_weap_harpoon.jpg',
    'acidspitter': 'images/auto_weap_acid.jpg',
    'sonic': 'images/auto_weap_sonic.jpg',
    'mindflayer': 'images/auto_weap_mindflayer.jpg',
    'magmamortar': 'images/auto_weap_magma.jpg',
    'cryocaster': 'images/auto_weap_cryo.jpg',
    'ghostfire': 'images/auto_weap_ghostfire.jpg',
    'swarmpod': 'images/auto_weap_swarm.jpg',
    'minelayer': 'images/auto_weap_mine.jpg'
};

function updateVisualizerLayer(layerId, value) {
    const imgEl = document.getElementById(layerId);
    if (!imgEl) return;
    
    if (value && value !== 'none' && value !== 'standard' && autoAssetMap[value]) {
        imgEl.src = autoAssetMap[value];
        imgEl.style.opacity = 1;
    } else {
        imgEl.style.opacity = 0;
    }
}

// Bind to dropdowns
const layerMappings = [
    { selectId: 'select-chassis', layerId: 'vis-layer-hull' },
    { selectId: 'select-core', layerId: 'vis-layer-core' },
    { selectId: 'select-armor', layerId: 'vis-layer-armor' },
    { selectId: 'select-propulsion', layerId: 'vis-layer-propulsion' },
    { selectId: 'select-figurehead', layerId: 'vis-layer-figurehead' },
    { selectId: 'select-weapon', layerId: 'vis-layer-weapon1' },
    { selectId: 'select-weapon2', layerId: 'vis-layer-weapon2' },
    { selectId: 'select-weapon3', layerId: 'vis-layer-weapon3' }
];

layerMappings.forEach(mapping => {
    const selectEl = document.getElementById(mapping.selectId);
    if (selectEl) {
        selectEl.addEventListener('change', (e) => {
            updateVisualizerLayer(mapping.layerId, e.target.value);
        });
        // Initial load
        updateVisualizerLayer(mapping.layerId, selectEl.value);
    }
});
