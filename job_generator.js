// job_generator.js
// Procedural Contract & Bounty Generator for Blackwater Quay (Tiered Edition)

const jobData = {
    factions: [
        { id: "thessalan", name: "Thessalan Consortium" },
        { id: "sablehook", name: "Sablehook Covenant" },
        { id: "covenant", name: "Covenant of the Cleansing Flame" },
        { id: "gilded", name: "The Gilded Exchange" },
        { id: "abyssal", name: "The Abyssal Court" },
        { id: "independent", name: "Independent / Private Citizen" }
    ],
    bounty: {
        titles: ["Wanted Dead: ", "Extraction: ", "Elimination: ", "Bounty: "],
        targets: {
            1: ["A local street thug gang leader", "A feral dog pack in the slums", "A petty thief who stole a noble's purse", "A rogue automaton worker"],
            2: ["A rogue biomancer", "A disgraced Thessalan noble", "A Void-touched mutineer", "A feral Aether-hound", "A corrupt Harbor-Master", "A Covenant assassin who missed their mark"],
            3: ["A Void-touched leviathan cult leader", "An ancient lich hiding in the undercity", "A renegade Arch-Biomancer of Thessala", "An Abyssal Lord manifesting in the harbor"]
        },
        complications: {
            1: ["The target is hiding in a crowded tavern.", "The target has a few loyal street urchins guarding them.", "The target's location is prone to sudden high tides.", "The target owes money to the Sablehook Covenant, who might interfere."],
            2: ["The target is currently being protected by heavily armed Sablehook corsairs.", "The target is hiding in a district slowly sinking into the Abyssal Tide.", "The target carries a volatile chronal core that will explode if they are killed violently.", "Another bounty hunter group is already closing in on the target."],
            3: ["The target is surrounded by an army of mutated aberrations.", "The target can bend time and space locally, making combat extremely disorienting.", "Killing the target will incur the wrath of an entire faction.", "The target resides in a pocket dimension accessible only during the blood moon."]
        },
        rewards: {
            1: ["100 gp and a common healing potion", "150 gp and free drinks at a local tavern", "200 gp", "100 gp and a basic silver weapon"],
            2: ["500 gp and a minor magical trinket", "1,000 gp and +1 Renown with the Client", "A rare ship upgrade and 200 gp", "A vial of pure Aether-blood and 750 gp"],
            3: ["5,000 gp and a Legendary magical weapon", "A fully upgraded Galleon and +3 Renown", "10,000 gp and a seat on the ruling council", "An artifact of immense power and 2,000 gp"]
        }
    },
    smuggling: {
        titles: ["Hot Cargo: ", "Silent Run: ", "Contraband: ", "Blockade Runner: "],
        targets: {
            1: ["A crate of untaxed dwarven ale", "Stolen navigational charts", "A bundle of rare herbs for a local apothecary", "A runaway servant of a minor noble"],
            2: ["A crate of unstable chronal cores", "A high-profile political defector", "A stolen Thessalan biomantic prototype", "Three barrels of refined dream-lotus", "A caged, highly aggressive displacer beast"],
            3: ["An ancient Abyssal artifact radiating dark energy", "The true heir to the Thessalan throne", "A weapon of mass destruction powered by souls", "A captive celestial being"]
        },
        complications: {
            1: ["Local dock guards are running random inspections today.", "The cargo smells terrible and attracts vermin.", "The drop-off contact is paranoid and easily spooked.", "A rival gang wants to steal the cargo for a quick payout."],
            2: ["The cargo must be kept submerged in salt water at all times or it degrades.", "The Drop-off point is heavily patrolled by Covenant inquisitors.", "The cargo occasionally emits a psychic scream that attracts Abyssal creatures.", "The recipient plans to betray you upon delivery instead of paying."],
            3: ["The cargo actively warps reality around the ship, causing hull breaches.", "An armada of Covenant ships is blockading the entire city.", "The cargo is sentient and actively trying to possess the crew.", "The Drop-off point is inside an active volcano or similarly hostile environment."]
        },
        rewards: {
            1: ["200 gp", "150 gp and a small cut of the contraband", "250 gp", "100 gp and minor faction favor"],
            2: ["1,500 gp (if delivered pristine)", "A cut of the profits (approx. 2,000 gp)", "A forged writ of safe passage and 500 gp", "A rare magical weapon and +1 Renown with the Client"],
            3: ["10,000 gp and a private island estate", "A Mythic-tier ship component and +3 Renown", "A blank check for one major favor from the Client's leader", "15,000 gp"]
        }
    },
    heist: {
        titles: ["Infiltration: ", "Acquisition: ", "Theft: ", "Black Operation: "],
        targets: {
            1: ["A small lockbox from a merchant's office", "A ledger from a local smuggling ring", "A piece of minor jewelry from a minor noble", "A shipment of raw iron before it reaches the foundry"],
            2: ["The ledger of a corrupt Gilded Exchange broker", "A heavily guarded Thessalan vault containing a specific relic", "The blueprints to a new class of Dreadnought", "A prisoner held in the Covenant's deepest dungeon"],
            3: ["The Crown Jewels of a sovereign nation", "The heart of a living leviathan, currently inside the leviathan", "The master ledger of the entire Gilded Exchange", "A trapped god from a heavily warded sanctum"]
        },
        complications: {
            1: ["The office has a basic alarm spell.", "A guard dog patrols the area.", "The lockbox is heavier than expected.", "The merchant returns earlier than planned."],
            2: ["The location is warded with anti-magic fields.", "The guards are not human; they are unsleeping clockwork constructs.", "The vault can only be opened by a specific biological signature.", "The target object is cursed and slowly drains the life of whoever touches it."],
            3: ["The vault is in another plane of existence.", "The target is guarded by an Ancient Dragon or equivalent entity.", "The heist must be completed in exactly 5 minutes or the building self-destructs.", "The object is intrinsically tied to the city's power grid; stealing it causes a blackout."]
        },
        rewards: {
            1: ["Whatever is in the box (approx 200 gp)", "300 gp", "250 gp and a minor magic ring", "150 gp and free repairs for your ship"],
            2: ["Whatever else you can steal, plus 3,000 gp", "A fully equipped Gunboat and a pardon for past crimes", "A legendary artifact and 1,000 gp", "2,500 gp and +2 Renown with the Client"],
            3: ["15,000 gp", "The title of a small city or barony", "A legendary artifact of world-altering power", "20,000 gp and +3 Renown with the Client"]
        }
    },
    investigation: {
        titles: ["Missing Persons: ", "Investigation: ", "Mystery: ", "Reconnaissance: "],
        targets: {
            1: ["A missing deckhand from a local tavern", "The source of a foul smell in the lower wards", "Who is skimming profits from a local market stall", "A string of minor vandalisms"],
            2: ["A patrol of guards that vanished in the Dockside Underways", "The source of a strange, necrotic plague in the poor districts", "The identity of a serial killer targeting biomancers", "The truth behind a 'ghost ship' that recently drifted into port"],
            3: ["The location of a lost mythological city", "The true motives of an Ancient Abyssal God", "A conspiracy involving the leaders of all major factions", "The origin of a world-ending magical anomaly"]
        },
        complications: {
            1: ["The deckhand just eloped and doesn't want to return.", "The trail leads to a small street gang.", "The local watch is unhelpful and lazy.", "The 'smell' is actually a minor, territorial ooze."],
            2: ["The local authorities actively hinder the investigation to cover it up.", "The clues lead directly to a high-ranking member of a dangerous faction.", "The investigator begins experiencing horrifying, prophetic nightmares.", "The 'victims' are actually part of a cult and do not want to be found."],
            3: ["The investigation attracts the attention of a demigod who wants the secret kept.", "Reality itself begins to warp around the clues.", "The truth drives lesser minds to madness.", "The conspirators have eyes everywhere and will send elite assassins daily."]
        },
        rewards: {
            1: ["150 gp", "200 gp and a potion of comprehension", "100 gp and a local contact", "A minor favor from the local watch"],
            2: ["800 gp and a favor from a powerful noble", "1,200 gp and a magical scrying item", "Information on a hidden treasure hoard and 400 gp", "1,000 gp and +1 Renown with the Client"],
            3: ["5,000 gp and a legendary lorebook", "A direct audience with the gods", "15,000 gp and a Mythic artifact", "Ultimate knowledge and +3 Renown with all factions"]
        }
    }
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateJobs(type, factionId, targetTier = 'random', count = 3) {
    let jobs = [];
    
    for (let i = 0; i < count; i++) {
        // Determine type
        let jobType = type;
        if (type === 'random') {
            const types = ['bounty', 'smuggling', 'heist', 'investigation'];
            jobType = getRandom(types);
        }
        
        // Determine faction
        let factionName = "";
        if (factionId === 'random') {
            factionName = getRandom(jobData.factions).name;
        } else {
            const f = jobData.factions.find(f => f.id === factionId);
            factionName = f ? f.name : "Unknown Client";
        }
        
        // Determine Tier
        let tier = targetTier;
        if (targetTier === 'random') {
            tier = getRandom(['1', '2', '3']);
        }
        
        // Build job based on type and tier
        const data = jobData[jobType];
        
        const rawObjective = getRandom(data.targets[tier]);
        const title = getRandom(data.titles) + rawObjective.split(' ').slice(1).join(' '); // A bit of string manipulation
        
        jobs.push({
            title: title.charAt(0).toUpperCase() + title.slice(1),
            client: factionName,
            type: jobType,
            tier: tier,
            objective: rawObjective,
            complication: getRandom(data.complications[tier]),
            reward: getRandom(data.rewards[tier])
        });
    }
    
    return jobs;
}

function renderJobs(jobs) {
    if (!jobs || jobs.length === 0) return "<p style='color:#94a3b8'>No contracts available.</p>";
    
    let html = "";
    jobs.forEach(job => {
        let tierColor = "#3b82f6"; // Tier 1 blue
        let tierLabel = "Tier 1 (Levels 1-4)";
        if(job.tier == '2') { tierColor = "#eab308"; tierLabel = "Tier 2 (Levels 5-10)"; }
        if(job.tier == '3') { tierColor = "#ef4444"; tierLabel = "Tier 3 (Levels 11+)"; }
        
        html += `
        <div class="job-card" style="border-left: 4px solid ${tierColor};">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-client">
                        <span style="color: ${tierColor}; font-weight: bold; margin-right: 10px;">[${tierLabel}]</span> 
                        Client: ${job.client} | Type: ${job.type.toUpperCase()}
                    </div>
                </div>
            </div>
            <div class="job-body">
                <div>
                    <div class="job-section">
                        <h4>The Objective</h4>
                        <p>${job.objective}</p>
                    </div>
                    <div class="job-section">
                        <h4>The Twist / Complication</h4>
                        <p>${job.complication}</p>
                    </div>
                </div>
                <div class="job-reward">
                    <h4>Reward</h4>
                    <p>${job.reward}</p>
                </div>
            </div>
        </div>
        `;
    });
    
    return html;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnGenerate = document.getElementById('btn-generate-job');
    const typeSelect = document.getElementById('job-type');
    const factionSelect = document.getElementById('job-faction');
    const tierSelect = document.getElementById('job-tier');
    const output = document.getElementById('job-output');
    
    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            const tierVal = tierSelect ? tierSelect.value : 'random';
            const jobs = generateJobs(typeSelect.value, factionSelect.value, tierVal, 3);
            output.innerHTML = renderJobs(jobs);
        });
        
        // Generate initial jobs
        const initialJobs = generateJobs('random', 'random', 'random', 3);
        output.innerHTML = renderJobs(initialJobs);
    }
});

// --- CAMPAIGN MANAGER INTEGRATION ---
document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('btn-save-binder');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (!window.BQCampaign) {
                alert("Campaign Manager not loaded.");
                return;
            }
            
            const client = document.getElementById('job-faction').value;
            const type = document.getElementById('job-type').value;
            
            if (document.querySelectorAll('.job-card').length === 0) {
                alert("No contracts generated to save.");
                return;
            }
            
            const contractTitle = prompt("Enter a title for this Contract Bundle:", client + " " + type + " Contracts");
            if (!contractTitle) return;
            
            const htmlContent = document.getElementById('job-output').innerHTML;
            
            window.BQCampaign.saveAsset('contracts', {
                title: contractTitle,
                client: client,
                type: type,
                data: { html: htmlContent }
            });
            
            alert("Contracts saved to Campaign Binder!");
        });
    }
});
