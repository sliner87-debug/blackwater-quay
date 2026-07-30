const lootDB = {
    void: [
        { text: "A brass compass whose needle always points toward the nearest corpse.", rarity: "uncommon", mechanic: "While holding the compass, you can cast Locate Object targeting only 'a dead body'. Once used, the compass cannot be used this way again until the next dawn." },
        { text: "A small vial of black liquid that whispers in deep speech when shaken.", rarity: "rare", mechanic: "As an action, you can throw this vial up to 30 feet. It explodes in a 15-foot radius. Creatures in the area must succeed on a DC 14 Wisdom saving throw or be affected by the Confusion spell for 1 minute." },
        { text: "A petrified eyeball that occasionally blinks when no one is looking directly at it.", rarity: "void-touched", mechanic: "Requires Attunement. You have advantage on initiative rolls and cannot be surprised. You also gain truesight out to 30 feet." },
        { text: "A jagged piece of obsidian that feels uncomfortably warm and smells of ozone.", rarity: "common", mechanic: "As an action, you can squeeze the stone to deal 1 point of fire damage to yourself, generating a spark sufficient to light a campfire or torch in wind/rain." },
        { text: "A journal with pages that rewrite themselves to describe the reader's impending death.", rarity: "void-touched", mechanic: "Requires Attunement. Once per day, you can consult the journal (1 minute). You cast Augury and Divination simultaneously, without components. Afterwards, roll a d20. On a 1, you take 4d10 psychic damage." },
        { text: "A perfectly smooth sphere of dark glass; staring into it induces mild vertigo and flashes of tentacles.", rarity: "rare", mechanic: "As an action, you can gaze into the sphere to cast Scrying (DC 15). If the target saves successfully, you take 3d6 psychic damage and the sphere turns opaque for 24 hours." },
        { text: "A severed, mummified finger with six joints.", rarity: "uncommon", mechanic: "When you cast a spell that requires a somatic component, you can snap one joint of the finger to cast the spell silently (as if using Subtle Spell). The finger crumbles to dust after 6 uses." },
        { text: "A tuning fork that emits a frequency only heard by aberrations and the insane.", rarity: "rare", mechanic: "When struck as an action, all aberrations within 60 feet must make a DC 15 Constitution save or be stunned until the end of their next turn. Can be used 3 times per dawn." },
        { text: "A scrap of parchment mapping a constellation that shouldn't exist in this hemisphere.", rarity: "uncommon", mechanic: "While holding the parchment under the night sky, you can cast Guidance on yourself, gaining the benefit immediately. You can do this at will, but only at night." },
        { text: "A pocket watch whose hands spin rapidly backward whenever blood is spilled nearby.", rarity: "void-touched", mechanic: "Requires Attunement. As a reaction when you or an ally within 30 feet is reduced to 0 hit points, you can rewind time. The target is instead restored to half their hit point maximum. The watch shatters after use." },
        { text: "A blackened silver mirror that reflects the room, but you aren't in it.", rarity: "void-touched", mechanic: "Requires Attunement. While holding the mirror, you are constantly under the effects of Nondetection. Once per day, you can step into the mirror, entering the Ethereal Plane for up to 10 minutes." },
        { text: "A fist-sized geode that beats rhythmically like a heart.", rarity: "rare", mechanic: "Requires Attunement. You can cast False Life on yourself as a 2nd-level spell at will. However, whenever you roll a natural 1 on any attack or save, the geode drains 1d4 of your hit points." },
        { text: "A sealed envelope that bleeds black ink when opened, containing a blank sheet of paper.", rarity: "uncommon", mechanic: "You can write a message of up to 25 words on the paper using your own blood (taking 1 piercing damage). The envelope then magically teleports to a creature you name." },
        { text: "A length of chain made of an unknown, oily black metal that is lighter than it should be.", rarity: "common", mechanic: "This 10-foot chain has a climbing speed of 10 ft. You can command it as a bonus action to wrap around an anchor point or untie itself." },
        { text: "A flute carved from a humerus bone; playing it makes the air taste of copper.", rarity: "rare", mechanic: "As an action, you can play a haunting tune. Target one corpse within 30 feet; it answers 3 questions as per Speak with Dead. The corpse then bursts into ash. Can be used once per day." }
    ],
    magetech: [
        { text: "A cracked crystal core that faintly hums and shocks anyone who touches it.", rarity: "common", mechanic: "Deals 1 lightning damage when picked up. As an action, you can crush it, casting Thunderwave (DC 12). The crystal is destroyed." },
        { text: "A clockwork crab the size of a coin that endlessly tries to pinch invisible mites.", rarity: "uncommon", mechanic: "As an action, you can wind the crab and place it in a lock. It grants advantage on your next check to pick that lock using Thieves' Tools." },
        { text: "A rusted aether-valve from a submersible engine, leaking a glowing blue grease.", rarity: "common", mechanic: "Contains enough grease to coat one weapon. The next time that weapon hits, it deals an extra 1d4 force damage." },
        { text: "A monocle with multiple rotating lenses, one of which sees heat signatures.", rarity: "rare", mechanic: "Requires Attunement. While worn, you can see invisible creatures and objects that give off heat out to a range of 30 feet." },
        { text: "A heavy iron key with an intricate, impossible fractal pattern on its teeth.", rarity: "uncommon", mechanic: "Can be used to cast Knock once. Upon casting, the key melts into a puddle of lead." },
        { text: "A depleted arcane battery wrapped in singed copper wire.", rarity: "common", mechanic: "Can be used as a material component to cast any spell of 1st level that requires a costly component, consuming the battery." },
        { text: "A set of precision clockwork calipers stained with dried blood.", rarity: "uncommon", mechanic: "If used as a medical tool, they grant a +2 bonus to any Wisdom (Medicine) checks made to stabilize a dying creature." },
        { text: "A tuning crystal from a psionic resonator; it chimes softly when you think about it.", rarity: "rare", mechanic: "Requires Attunement. Grants telepathy with one willing creature out to 120 feet. You can change the target by holding the crystal for 1 minute." },
        { text: "A pair of heavy leather gloves with brass knuckles that faintly smell of burnt hair.", rarity: "common", mechanic: "Unarmed strikes made with these gloves deal 1d4 bludgeoning damage and don't provoke opportunity attacks." },
        { text: "A small, brass music box that plays a haunting, mathematically perfect fugue.", rarity: "uncommon", mechanic: "When opened as an action, all creatures within 30 feet (including you) must make a DC 13 Charisma save or be incapacitated as they listen to the tune. Closes automatically at the end of your next turn." },
        { text: "A metallic scarab beetle that attempts to burrow into any exposed skin.", rarity: "rare", mechanic: "Requires Attunement (the beetle burrows into your arm). You gain resistance to poison damage and have advantage on saving throws against disease." },
        { text: "A pair of goggles that highlights recently used spell paths in the air.", rarity: "void-touched", mechanic: "Requires Attunement. You have advantage on saving throws against spells. As a reaction when a spell is cast within 60 feet, you can identify the spell perfectly." },
        { text: "A glass alchemical ampoule filled with a glowing, viscous green fluid that hums.", rarity: "rare", mechanic: "When ingested as a bonus action, you regain 4d4+4 hit points, and your movement speed increases by 10 ft for 1 hour." },
        { text: "A heavy, ticking brass pocket-watch that occasionally skips exactly three seconds.", rarity: "uncommon", mechanic: "Once per day, as a reaction when you are hit by an attack, you can cast Shield by rewinding your personal timeline slightly." },
        { text: "An intricately carved obsidian clockwork escapement that feels cold and damp.", rarity: "common", mechanic: "Can be slotted into any mechanical trap. The trap has its DC lowered by 5 for 1 minute." }
    ],
    nautical: [
        { text: "A scrimshaw whalebone carved with a depiction of a Kraken drowning a city.", rarity: "uncommon", mechanic: "As an action, you can break the bone to cast Control Water (Flood only). Once broken, the magic is spent." },
        { text: "A tarnished silver coin from a drowned empire, always damp to the touch.", rarity: "common", mechanic: "If you flip this coin, it will always land on the face depicting the sea, and a faint smell of brine fills the air. Can be used as a spellcasting focus for aquatic magic." },
        { text: "A rusted boarding hook with a length of rotting, salt-crusted rope.", rarity: "common", mechanic: "Treat as a mundane grappling hook, but the rope never snaps unless subjected to magical fire or acid." },
        { text: "A spyglass with a cracked lens that makes distant ships look like ghost vessels.", rarity: "rare", mechanic: "Requires Attunement. While looking through the spyglass, you can see into the Ethereal Plane out to 1 mile, but only over bodies of water." },
        { text: "A flask of grog so strong it can strip paint off a hull.", rarity: "common", mechanic: "When ingested, you gain 1d4 temporary hit points but have disadvantage on your next Dexterity check or saving throw within 1 hour." },
        { text: "A leather pouch containing jagged shark teeth and a few pearls.", rarity: "uncommon", mechanic: "If you throw the teeth into a body of water (action), they summon a Swarm of Quippers that acts on your initiative and obeys your verbal commands for 1 minute." },
        { text: "A barnacle-encrusted sextant that refuses to calibrate correctly.", rarity: "uncommon", mechanic: "While navigating on the open sea, this sextant always points toward the nearest shipwreck instead of true north." },
        { text: "A captain's logbook, soaked and ruined, except for a single legible entry: 'They are below us.'", rarity: "rare", mechanic: "If you read the entry aloud, you cast Detect Thoughts, but it only detects the surface thoughts of aberrations within 60 feet. Can be used 3 times per day." },
        { text: "A piece of jagged driftwood that bleeds saltwater when squeezed.", rarity: "void-touched", mechanic: "Requires Attunement. You gain a swimming speed equal to your walking speed, and you can breathe underwater indefinitely." },
        { text: "A heavy iron belaying pin stained with ancient, dried gore.", rarity: "common", mechanic: "Treat as a magical club. It deals an extra 1 bludgeoning damage against humanoids." },
        { text: "A rusted diving helmet with a cracked faceplate; faintly, you can hear breathing inside.", rarity: "void-touched", mechanic: "Requires Attunement. You have resistance to cold damage and ignore the penalties of deep underwater environments. Once per day, you can cast Water Walk." },
        { text: "A harpoon tip made of an unknown, iridescent bone.", rarity: "rare", mechanic: "When affixed to a shaft, this acts as a +1 Javelin. When you hit a creature with it, you can use a bonus action to teleport to an unoccupied space within 5 feet of the target." },
        { text: "A fist-sized piece of hardened amber containing a perfectly preserved, tiny anglerfish.", rarity: "uncommon", mechanic: "As a bonus action, you can cause the amber to shed bright light in a 20-foot radius and dim light for an additional 20 feet. Lasts until dismissed." },
        { text: "A map of the local coast drawn on cured human skin.", rarity: "rare", mechanic: "When you trace a path on the map with your finger, you cast Find the Path, but it only works for navigating treacherous coastal waters." },
        { text: "A heavy lead sounding-weight stamped with the crest of a long-dead admiral.", rarity: "common", mechanic: "When dropped in water, it sinks at a rate of 100 feet per round and never tangles its line." }
    ]
};

document.getElementById('btn-generate').addEventListener('click', () => {
    const display = document.getElementById('loot-display');
    const type = document.getElementById('loot-type').value;
    const rarity = document.getElementById('loot-rarity').value;
    const btn = document.getElementById('btn-generate');
    
    // Disable button during animation
    btn.disabled = true;
    display.className = 'loot-display scrambling';
    
    // Filter by Type
    let typePool = [];
    if (type === 'any') {
        typePool = [...lootDB.void, ...lootDB.magetech, ...lootDB.nautical];
    } else {
        typePool = lootDB[type];
    }
    
    // Filter by Rarity
    let finalPool = typePool;
    if (rarity !== 'any') {
        finalPool = typePool.filter(item => item.rarity === rarity);
    }
    
    // Fallback if combination is empty
    if (finalPool.length === 0) {
        finalPool = [{ text: "You rummage around but find only lint and a copper piece.", rarity: "common", mechanic: "None." }];
    }
    
    const randomIndex = Math.floor(Math.random() * finalPool.length);
    const item = finalPool[randomIndex];
    
    // Scramble effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let iterations = 0;
    const maxIterations = 20;
    
    const scrambleInterval = setInterval(() => {
        let scrambled = "";
        for(let i = 0; i < 60; i++) {
            scrambled += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        display.innerHTML = scrambled;
        iterations++;
        
        if(iterations >= maxIterations) {
            clearInterval(scrambleInterval);
            const finalHtml = `<div class="rarity-tag ${item.rarity}">${item.rarity.toUpperCase()}</div><br>${item.text}<hr class="loot-divider"><div class="loot-mechanic"><strong>Mechanic:</strong> ${item.mechanic}</div>`;
            display.innerHTML = finalHtml;
            display.className = `loot-display rarity-${item.rarity}`;
            btn.disabled = false;
            
            // Save to LocalStorage
            localStorage.setItem('bq_saved_loot_html', finalHtml);
            localStorage.setItem('bq_saved_loot_class', display.className);
        }
    }, 50);
});

// Restore on load
document.addEventListener('DOMContentLoaded', () => {
    const savedHtml = localStorage.getItem('bq_saved_loot_html');
    const savedClass = localStorage.getItem('bq_saved_loot_class');
    if (savedHtml && savedClass) {
        const display = document.getElementById('loot-display');
        if (display) {
            display.innerHTML = savedHtml;
            display.className = savedClass;
        }
    }
});

// Copy to Clipboard Logic
document.addEventListener('DOMContentLoaded', () => {
    const btnCopy = document.getElementById('btn-copy');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const display = document.getElementById('loot-display');
            if (display) {
                // We want to copy the raw text, but formatting it slightly
                const text = display.innerText;
                navigator.clipboard.writeText(text).then(() => {
                    btnCopy.textContent = "Copied!";
                    setTimeout(() => btnCopy.textContent = "Copy to Clipboard", 2000);
                }).catch(err => {
                    console.error("Failed to copy", err);
                });
            }
        });
    }
});
