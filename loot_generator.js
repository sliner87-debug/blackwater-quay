const lootDB = {
    void: [
        { text: "A brass compass whose needle always points toward the nearest corpse.", rarity: "uncommon" },
        { text: "A small vial of black liquid that whispers in deep speech when shaken.", rarity: "rare" },
        { text: "A petrified eyeball that occasionally blinks when no one is looking directly at it.", rarity: "void-touched" },
        { text: "A jagged piece of obsidian that feels uncomfortably warm and smells of ozone.", rarity: "common" },
        { text: "A journal with pages that rewrite themselves to describe the reader's impending death.", rarity: "void-touched" },
        { text: "A perfectly smooth sphere of dark glass; staring into it induces mild vertigo and flashes of tentacles.", rarity: "rare" },
        { text: "A severed, mummified finger with six joints.", rarity: "uncommon" },
        { text: "A tuning fork that emits a frequency only heard by aberrations and the insane.", rarity: "rare" },
        { text: "A scrap of parchment mapping a constellation that shouldn't exist in this hemisphere.", rarity: "uncommon" },
        { text: "A pocket watch whose hands spin rapidly backward whenever blood is spilled nearby.", rarity: "void-touched" },
        { text: "A blackened silver mirror that reflects the room, but you aren't in it.", rarity: "void-touched" },
        { text: "A fist-sized geode that beats rhythmically like a heart.", rarity: "rare" },
        { text: "A sealed envelope that bleeds black ink when opened, containing a blank sheet of paper.", rarity: "uncommon" },
        { text: "A length of chain made of an unknown, oily black metal that is lighter than it should be.", rarity: "common" },
        { text: "A flute carved from a humerus bone; playing it makes the air taste of copper.", rarity: "rare" }
    ],
    magetech: [
        { text: "A cracked crystal core that faintly hums and shocks anyone who touches it.", rarity: "common" },
        { text: "A mechanical crab the size of a coin that endlessly tries to pinch invisible mites.", rarity: "uncommon" },
        { text: "A rusted aether-valve from a submersible engine, leaking a glowing blue grease.", rarity: "common" },
        { text: "A monocle with multiple rotating lenses, one of which sees heat signatures.", rarity: "rare" },
        { text: "A heavy iron key with an intricate, impossible fractal pattern on its teeth.", rarity: "uncommon" },
        { text: "A depleted arcane battery wrapped in singed copper wire.", rarity: "common" },
        { text: "A set of precision clockwork calipers stained with dried blood.", rarity: "uncommon" },
        { text: "A tuning crystal from a psionic resonator; it chimes softly when you think about it.", rarity: "rare" },
        { text: "A pair of heavy leather gloves with brass knuckles that faintly smell of burnt hair.", rarity: "common" },
        { text: "A small, brass music box that plays a haunting, mathematically perfect fugue.", rarity: "uncommon" },
        { text: "A metallic scarab beetle that attempts to burrow into any exposed skin.", rarity: "rare" },
        { text: "A pair of goggles that highlights recently used spell paths in the air.", rarity: "void-touched" },
        { text: "A syringe filled with a glowing, viscous green fluid that hums.", rarity: "rare" },
        { text: "A heavy, ticking brass pocket-watch that occasionally skips exactly three seconds.", rarity: "uncommon" },
        { text: "An intricately carved obsidian gear that feels cold and damp.", rarity: "common" }
    ],
    nautical: [
        { text: "A scrimshaw whalebone carved with a depiction of a Kraken drowning a city.", rarity: "uncommon" },
        { text: "A tarnished silver coin from a drowned empire, always damp to the touch.", rarity: "common" },
        { text: "A rusted boarding hook with a length of rotting, salt-crusted rope.", rarity: "common" },
        { text: "A spyglass with a cracked lens that makes distant ships look like ghost vessels.", rarity: "rare" },
        { text: "A flask of grog so strong it can strip paint off a hull.", rarity: "common" },
        { text: "A leather pouch containing jagged shark teeth and a few pearls.", rarity: "uncommon" },
        { text: "A barnacle-encrusted sextant that refuses to calibrate correctly.", rarity: "uncommon" },
        { text: "A captain's logbook, soaked and ruined, except for a single legible entry: 'They are below us.'", rarity: "rare" },
        { text: "A piece of jagged driftwood that bleeds saltwater when squeezed.", rarity: "void-touched" },
        { text: "A heavy iron belaying pin stained with ancient, dried gore.", rarity: "common" },
        { text: "A rusted diving helmet with a cracked faceplate; faintly, you can hear breathing inside.", rarity: "void-touched" },
        { text: "A harpoon tip made of an unknown, iridescent bone.", rarity: "rare" },
        { text: "A fist-sized piece of hardened amber containing a perfectly preserved, tiny anglerfish.", rarity: "uncommon" },
        { text: "A map of the local coast drawn on cured human skin.", rarity: "rare" },
        { text: "A heavy lead sounding-weight stamped with the crest of a long-dead admiral.", rarity: "common" }
    ]
};

document.getElementById('btn-generate').addEventListener('click', () => {
    const display = document.getElementById('loot-display');
    const type = document.getElementById('loot-type').value;
    const btn = document.getElementById('btn-generate');
    
    // Disable button during animation
    btn.disabled = true;
    display.className = 'loot-display scrambling';
    
    let pool = [];
    if (type === 'any') {
        pool = [...lootDB.void, ...lootDB.magetech, ...lootDB.nautical];
    } else {
        pool = lootDB[type];
    }
    
    const randomIndex = Math.floor(Math.random() * pool.length);
    const item = pool[randomIndex];
    
    // Scramble effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let iterations = 0;
    const maxIterations = 20;
    
    const scrambleInterval = setInterval(() => {
        let scrambled = "";
        for(let i = 0; i < 40; i++) {
            scrambled += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        display.innerHTML = scrambled;
        iterations++;
        
        if(iterations >= maxIterations) {
            clearInterval(scrambleInterval);
            display.innerHTML = \<div class="rarity-tag \">\</div><br>\\;
            display.className = \loot-display rarity-\\;
            btn.disabled = false;
        }
    }, 50);
});
