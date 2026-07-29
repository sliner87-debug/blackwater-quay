const lootDB = {
    void: [
        "A brass compass whose needle always points toward the nearest corpse.",
        "A small vial of black liquid that whispers in deep speech when shaken.",
        "A petrified eyeball that occasionally blinks when no one is looking directly at it.",
        "A jagged piece of obsidian that feels uncomfortably warm and smells of ozone.",
        "A journal with pages that rewrite themselves to describe the reader's impending death.",
        "A perfectly smooth sphere of dark glass; staring into it induces mild vertigo and flashes of tentacles.",
        "A severed, mummified finger with six joints.",
        "A tuning fork that emits a frequency only heard by aberrations and the insane.",
        "A scrap of parchment mapping a constellation that shouldn't exist in this hemisphere.",
        "A pocket watch whose hands spin rapidly backward whenever blood is spilled nearby."
    ],
    magetech: [
        "A cracked crystal core that faintly hums and shocks anyone who touches it.",
        "A mechanical crab the size of a coin that endlessly tries to pinch invisible mites.",
        "A rusted aether-valve from a submersible engine, leaking a glowing blue grease.",
        "A monocle with multiple rotating lenses, one of which sees heat signatures.",
        "A heavy iron key with an intricate, impossible fractal pattern on its teeth.",
        "A depleted arcane battery wrapped in singed copper wire.",
        "A set of precision clockwork calipers stained with dried blood.",
        "A tuning crystal from a psionic resonator; it chimes softly when you think about it.",
        "A pair of heavy leather gloves with brass knuckles that faintly smell of burnt hair.",
        "A small, brass music box that plays a haunting, mathematically perfect fugue."
    ],
    nautical: [
        "A scrimshaw whalebone carved with a depiction of a Kraken drowning a city.",
        "A tarnished silver coin from a drowned empire, always damp to the touch.",
        "A rusted boarding hook with a length of rotting, salt-crusted rope.",
        "A spyglass with a cracked lens that makes distant ships look like ghost vessels.",
        "A flask of grog so strong it can strip paint off a hull.",
        "A leather pouch containing jagged shark teeth and a few pearls.",
        "A barnacle-encrusted sextant that refuses to calibrate correctly.",
        "A captain's logbook, soaked and ruined, except for a single legible entry: 'They are below us.'",
        "A piece of jagged driftwood that bleeds saltwater when squeezed.",
        "A heavy iron belaying pin stained with ancient, dried gore."
    ]
};

document.getElementById('btn-generate').addEventListener('click', () => {
    const display = document.getElementById('loot-display');
    const type = document.getElementById('loot-type').value;
    
    // Fade out
    display.style.opacity = '0';
    
    setTimeout(() => {
        let pool = [];
        if (type === 'any') {
            pool = [...lootDB.void, ...lootDB.magetech, ...lootDB.nautical];
        } else {
            pool = lootDB[type];
        }
        
        const randomIndex = Math.floor(Math.random() * pool.length);
        const item = pool[randomIndex];
        
        display.innerHTML = item;
        
        // Fade in
        display.style.opacity = '1';
    }, 300); // Wait for fade out
});
