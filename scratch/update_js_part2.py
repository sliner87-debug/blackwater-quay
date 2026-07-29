import re

with open('h:/Antigravity/Novel/shipyard.js', 'r') as f:
    js = f.read()

# 1. Expand Catalog
new_categories = '''
    cores: {
        standard: { name: "Standard Furnace", cost: 0, traits: [] },
        void: { name: "Bound Void-Elemental", cost: 10000, traits: [{ name: "Volatile Core", desc: "Generates massive power. If the ship takes critical damage, the elemental may break loose and attack the crew." }] },
        necrotic: { name: "Necrotic Engine", cost: 12000, traits: [{ name: "Soul-Fueled", desc: "When the ship destroys another vessel, it gains temporary HP equal to the destroyed ship\\'s max HP." }] },
        blood: { name: "Blood-Fuel Drive", cost: 8000, traits: [{ name: "Biomantic Sprint", desc: "Consumes raw meat/blood to double the ship\\'s speed for 1 minute." }] }
    },
    figureheads: {
        none: { name: "None", cost: 0, traits: [] },
        gorgon: { name: "Gorgon\\'s Visage", cost: 4000, traits: [{ name: "Petrifying Gaze (1/Day)", desc: "Casts a petrifying beam in a 60-foot line off the bow (DC 15 CON)." }] },
        breacher: { name: "Breacher\\'s Ram", cost: 2500, traits: [{ name: "Deep-Iron Spike", desc: "Deals double damage when ramming other ships or huge+ sea monsters." }] },
        aether: { name: "Aether-Seer Array", cost: 6000, traits: [{ name: "Crystal Eye", desc: "Detects invisible creatures, underwater mines, or magical traps up to 1 mile away." }] }
    },
    countermeasures: {
        none: { name: "None", cost: 0, traits: [] },
        smoke: { name: "Alchemical Smoke-Stacks", cost: 2000, traits: [{ name: "Obscurement (3/Day)", desc: "Deploys a thick cloud of toxic gas (60 ft radius) blocking line of sight." }] },
        decoy: { name: "Illusory Decoys", cost: 4500, traits: [{ name: "Phantom Duplicate (1/Day)", desc: "Projects a perfect phantom duplicate of the ship 100 feet away to draw enemy fire." }] },
        reflect: { name: "Spell-Reflection Shielding", cost: 8000, traits: [{ name: "Arcane Mirror (1/Day)", desc: "Bounces a single targeted spell of 5th level or lower back at the caster." }] }
    },
    crew: {
        standard: { name: "Standard Hired Crew", cost: 0, traits: [] },
        skeletal: { name: "Skeletal Laborers", cost: 1000, traits: [{ name: "Undead Crew", desc: "Cheap, tireless, and immune to poison/charm, but terrible at complex tasks (Disadvantage on skill checks)." }] },
        sablehook: { name: "Sablehook Smugglers", cost: 3000, traits: [{ name: "Underworld Contacts", desc: "Grants advantage on Deception and Persuasion checks when dealing with underworld authorities." }] },
        thessalan: { name: "Thessalan Mutants", cost: 4000, traits: [{ name: "Brutish Boarders", desc: "Automatically grapple enemies they engage during ship-to-ship boarding combat." }] }
    },
    auxiliary: {
        none: { name: "None", cost: 0, traits: [] },
        divebells: { name: "Dive-Bells", cost: 5000, traits: [{ name: "Deep-Sea Pods", desc: "Small, heavily armored pods for dropping a 4-man party to the extreme ocean floor safely." }] },
        kites: { name: "Boarding-Kites", cost: 1500, traits: [{ name: "Assault Gliders", desc: "Allows the crew to launch themselves into the rigging of enemy ships up to 150 feet away." }] }
    },
'''

js = js.replace('propulsion: {', new_categories + '    propulsion: {')

# 2. Update updateTotalCost
old_cost = '''const chassis = document.querySelector("input[name=\\'chassis\\']:checked").value;
        const material = document.querySelector("input[name=\\'material\\']:checked").value;
        const propulsion = document.querySelector("input[name=\\'propulsion\\']:checked").value;
        const armor = document.querySelector("input[name=\\'armor\\']:checked").value;
        const weapon = document.querySelector("input[name=\\'weapon\\']:checked").value;'''

new_cost = '''const chassis = document.querySelector("input[name=\\'chassis\\']:checked").value;
        const material = document.querySelector("input[name=\\'material\\']:checked").value;
        const core = document.querySelector("input[name=\\'core\\']:checked").value;
        const propulsion = document.querySelector("input[name=\\'propulsion\\']:checked").value;
        const armor = document.querySelector("input[name=\\'armor\\']:checked").value;
        const weapon = document.querySelector("input[name=\\'weapon\\']:checked").value;
        const figurehead = document.querySelector("input[name=\\'figurehead\\']:checked").value;
        const countermeasure = document.querySelector("input[name=\\'countermeasure\\']:checked").value;
        const crew = document.querySelector("input[name=\\'crew\\']:checked").value;
        const auxiliary = document.querySelector("input[name=\\'auxiliary\\']:checked").value;'''
js = js.replace(old_cost, new_cost)

old_calc = '''total += catalog.chassis[chassis].cost;
        total += catalog.materials[material].cost;
        total += catalog.propulsion[propulsion].cost;
        total += catalog.armor[armor].cost;
        total += catalog.weapons[weapon].cost;'''
        
new_calc = '''total += catalog.chassis[chassis].cost;
        total += catalog.materials[material].cost;
        total += catalog.cores[core].cost;
        total += catalog.propulsion[propulsion].cost;
        total += catalog.armor[armor].cost;
        total += catalog.weapons[weapon].cost;
        total += catalog.figureheads[figurehead].cost;
        total += catalog.countermeasures[countermeasure].cost;
        total += catalog.crew[crew].cost;
        total += catalog.auxiliary[auxiliary].cost;'''
js = js.replace(old_calc, new_calc)

# 3. Update Stat Block Logic
old_build_vars = '''const chassisId = document.querySelector("input[name=\\'chassis\\']:checked").value;
    const materialId = document.querySelector("input[name=\\'material\\']:checked").value;
    const propulsionId = document.querySelector("input[name=\\'propulsion\\']:checked").value;
    const armorId = document.querySelector("input[name=\\'armor\\']:checked").value;
    const weaponId = document.querySelector("input[name=\\'weapon\\']:checked").value;'''

new_build_vars = '''const chassisId = document.querySelector("input[name=\\'chassis\\']:checked").value;
    const materialId = document.querySelector("input[name=\\'material\\']:checked").value;
    const coreId = document.querySelector("input[name=\\'core\\']:checked").value;
    const propulsionId = document.querySelector("input[name=\\'propulsion\\']:checked").value;
    const armorId = document.querySelector("input[name=\\'armor\\']:checked").value;
    const weaponId = document.querySelector("input[name=\\'weapon\\']:checked").value;
    const figureheadId = document.querySelector("input[name=\\'figurehead\\']:checked").value;
    const countermeasureId = document.querySelector("input[name=\\'countermeasure\\']:checked").value;
    const crewId = document.querySelector("input[name=\\'crew\\']:checked").value;
    const auxiliaryId = document.querySelector("input[name=\\'auxiliary\\']:checked").value;'''
js = js.replace(old_build_vars, new_build_vars)

old_build_fetch = '''const chassis = catalog.chassis[chassisId];
    const material = catalog.materials[materialId];
    const prop = catalog.propulsion[propulsionId];
    const armor = catalog.armor[armorId];
    const weapon = catalog.weapons[weaponId];'''

new_build_fetch = '''const chassis = catalog.chassis[chassisId];
    const material = catalog.materials[materialId];
    const core = catalog.cores[coreId];
    const prop = catalog.propulsion[propulsionId];
    const armor = catalog.armor[armorId];
    const weapon = catalog.weapons[weaponId];
    const figurehead = catalog.figureheads[figureheadId];
    const countermeasure = catalog.countermeasures[countermeasureId];
    const crew = catalog.crew[crewId];
    const auxiliary = catalog.auxiliary[auxiliaryId];'''
js = js.replace(old_build_fetch, new_build_fetch)

old_traits = '''let allTraits = [];
    allTraits = allTraits.concat(material.traits);
    allTraits = allTraits.concat(prop.traits);
    allTraits = allTraits.concat(armor.traits);'''

new_traits = '''let allTraits = [];
    allTraits = allTraits.concat(material.traits);
    allTraits = allTraits.concat(core.traits);
    allTraits = allTraits.concat(prop.traits);
    allTraits = allTraits.concat(armor.traits);
    allTraits = allTraits.concat(figurehead.traits);
    allTraits = allTraits.concat(countermeasure.traits);
    allTraits = allTraits.concat(crew.traits);
    allTraits = allTraits.concat(auxiliary.traits);'''
js = js.replace(old_traits, new_traits)

with open('h:/Antigravity/Novel/shipyard.js', 'w') as f:
    f.write(js)

print("JS Updated")
