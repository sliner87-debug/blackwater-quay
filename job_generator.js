// job_generator.js
// Procedural Contract & Bounty Generator for Blackwater Quay

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
        targets: ["A rogue biomancer", "A disgraced Thessalan noble", "A Void-touched mutineer", "A feral Aether-hound", "A corrupt Harbor-Master", "A Covenant assassin who missed their mark"],
        complications: ["The target is currently being protected by heavily armed Sablehook corsairs.", "The target is hiding in a district slowly sinking into the Abyssal Tide.", "The target carries a volatile chronal core that will explode if they are killed violently.", "Another bounty hunter group is already closing in on the target."],
        rewards: ["500 gp and a minor magical trinket", "1,000 gp and +1 Renown with the Client", "A rare ship upgrade and 200 gp", "A vial of pure Aether-blood and 750 gp"]
    },
    smuggling: {
        titles: ["Hot Cargo: ", "Silent Run: ", "Contraband: ", "Blockade Runner: "],
        targets: ["A crate of unstable chronal cores", "A high-profile political defector", "A stolen Thessalan biomantic prototype", "Three barrels of refined dream-lotus", "A caged, highly aggressive displacer beast"],
        complications: ["The cargo must be kept submerged in salt water at all times or it degrades.", "The Drop-off point is heavily patrolled by Covenant inquisitors.", "The cargo occasionally emits a psychic scream that attracts Abyssal creatures.", "The recipient plans to betray you upon delivery instead of paying."],
        rewards: ["1,500 gp (if delivered pristine)", "A cut of the profits (approx. 2,000 gp)", "A forged writ of safe passage and 500 gp", "A rare magical weapon and +1 Renown with the Client"]
    },
    heist: {
        titles: ["Infiltration: ", "Acquisition: ", "Theft: ", "Black Operation: "],
        targets: ["The ledger of a corrupt Gilded Exchange broker", "A heavily guarded Thessalan vault containing a specific relic", "The blueprints to a new class of Dreadnought", "A prisoner held in the Covenant's deepest dungeon"],
        complications: ["The location is warded with anti-magic fields.", "The guards are not human; they are unsleeping clockwork constructs.", "The vault can only be opened by a specific biological signature.", "The target object is cursed and slowly drains the life of whoever touches it."],
        rewards: ["Whatever else you can steal, plus 3,000 gp", "A fully equipped Gunboat and a pardon for past crimes", "A legendary artifact and 1,000 gp", "2,500 gp and +2 Renown with the Client"]
    },
    investigation: {
        titles: ["Missing Persons: ", "Investigation: ", "Mystery: ", "Reconnaissance: "],
        targets: ["A patrol of guards that vanished in the Dockside Underways", "The source of a strange, necrotic plague in the poor districts", "The identity of a serial killer targeting biomancers", "The truth behind a 'ghost ship' that recently drifted into port"],
        complications: ["The local authorities actively hinder the investigation to cover it up.", "The clues lead directly to a high-ranking member of a dangerous faction.", "The investigator begins experiencing horrifying, prophetic nightmares.", "The 'victims' are actually part of a cult and do not want to be found."],
        rewards: ["800 gp and a favor from a powerful noble", "1,200 gp and a magical scrying item", "Information on a hidden treasure hoard and 400 gp", "1,000 gp and +1 Renown with the Client"]
    }
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateJobs(type, factionId, count = 3) {
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
        
        // Build job based on type
        const data = jobData[jobType];
        
        const title = getRandom(data.titles) + getRandom(data.targets).split(' ').slice(1).join(' '); // A bit of string manipulation to make it sound cool
        
        jobs.push({
            title: title.charAt(0).toUpperCase() + title.slice(1),
            client: factionName,
            type: jobType,
            objective: getRandom(data.targets),
            complication: getRandom(data.complications),
            reward: getRandom(data.rewards)
        });
    }
    
    return jobs;
}

function renderJobs(jobs) {
    if (!jobs || jobs.length === 0) return "<p style='color:#94a3b8'>No contracts available.</p>";
    
    let html = "";
    jobs.forEach(job => {
        html += `
        <div class="job-card">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-client">Client: ${job.client} | Type: ${job.type.toUpperCase()}</div>
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
    const output = document.getElementById('job-output');
    
    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            const jobs = generateJobs(typeSelect.value, factionSelect.value, 3);
            output.innerHTML = renderJobs(jobs);
        });
        
        // Generate initial jobs
        const initialJobs = generateJobs('random', 'random', 3);
        output.innerHTML = renderJobs(initialJobs);
    }
});
