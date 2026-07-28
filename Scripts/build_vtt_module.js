const fs = require('fs');
const path = require('path');

// Configuration
const CAMPAIGN_DIR = path.join(__dirname, '../Campaign_Module');
const OUTPUT_FILE = path.join(__dirname, '../Campaign_Module/foundry_module_export.json');

console.log("Starting Blackwater Quay VTT auto-packager...");

// Helper to read and wrap markdown
function parseMarkdownToJournal(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, '.md');
    
    // Foundry VTT Journal Entry Schema Mock
    return {
        _id: `BQ_${fileName.toUpperCase().substring(0, 10)}`,
        name: fileName.replace(/_/g, ' '),
        pages: [
            {
                name: fileName.replace(/_/g, ' '),
                type: "text",
                text: {
                    content: `<div>${content.replace(/\n/g, '<br>')}</div>`,
                    format: 1 // Markdown format flag
                }
            }
        ]
    };
}

// Target files to package
const targetFiles = [
    'Act_I_Whispers_in_the_Sluices.md',
    'Act_II_Fleshwarped_Foundry.md',
    'Act_III_Crimson_Sails.md',
    'act_iv_deepmind_annex.md',
    'monsters.md',
    'npcs.md',
    'campaign_flowchart.md',
    'random_encounters.md',
    'downtime_mechanics.md',
    'faction_renown_tracks.md',
    'player_handouts.md'
];

let moduleExport = {
    name: "blackwater-quay-campaign",
    title: "Blackwater Quay: The Tri-Weave Shroud",
    description: "A dark fantasy campaign module exported automatically.",
    version: "1.0.0",
    compatibility: {
        minimum: "10",
        verified: "11"
    },
    journal: []
};

// Compile files
let successCount = 0;
targetFiles.forEach(file => {
    const filePath = path.join(CAMPAIGN_DIR, file);
    const journalEntry = parseMarkdownToJournal(filePath);
    if (journalEntry) {
        moduleExport.journal.push(journalEntry);
        console.log(`Packaged: ${file}`);
        successCount++;
    } else {
        console.warn(`File not found: ${file}`);
    }
});

// Write to disk
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(moduleExport, null, 2));

console.log(`\nVTT Packaging Complete!`);
console.log(`Successfully compiled ${successCount} markdown files into a single Foundry VTT compatible JSON export.`);
console.log(`Output saved to: ${OUTPUT_FILE}`);
