// search.js
// Handles Global Search and Hover Tooltips for Blackwater Quay

const TOOLTIP_DICTIONARY = {
    "Void-Touched": "A condition inflicted by exposure to Xoriat. Creatures gain resistance to psychic damage but are vulnerable to radiant.",
    "Aether": "The volatile magical fuel used in Shipyard engines, harvested from planar rifts.",
    "Compliance Serum": "An alchemical drug distributed by the Choir of the Below that suppresses free will and induces euphoria.",
    "Sablehook": "The dominant criminal syndicate of Blackwater Quay, specializing in smuggling and planar artifacts.",
    "Deepmind": "An ancient, hyper-intelligent aboleth entity resting at the bottom of the Quay.",
    "Tarkanan": "House Tarkanan is a guild of assassins and thieves bearing aberrant dragonmarks.",
    "Magitech": "A blend of Victorian engineering and arcane spellcasting, producing steam-and-magic powered devices."
};

const SEARCH_INDEX = [
    { title: "Sovereign Shipbuilder", desc: "Build custom airships, nautiloids, and spell-jammers.", link: "shipyard.html" },
    { title: "Fleet Generator", desc: "Instantly deploy rival fleets for combat encounters.", link: "fleet_generator.html" },
    { title: "Loot Generator", desc: "Generate magical Victorian-era loot and artifacts.", link: "loot_generator.html" },
    { title: "Faction Renown Tracker", desc: "Track your standing with the Quay's major syndicates.", link: "dm_faction_renown.html" },
    { title: "Encounter Builder", desc: "Roll random encounters across the various districts.", link: "dm_bestiary.html" },
    { title: "Ambient Mixer", desc: "Control the audio atmosphere of your game session.", link: "ambient_mixer.html" },
    { title: "Blackwater Quay Codex", desc: "Read the deep lore of the underworld.", link: "blackwater_quay_codex.html" },
    { title: "Player Mechanics", desc: "Rules for character creation in the Quay.", link: "dm_player_options.html" }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tooltip Parser
    // We scan specific content areas and replace keywords with our tooltip HTML
    const parseTooltips = () => {
        const contentAreas = document.querySelectorAll('.district-desc, .codex-text, .loot-mechanic, .trait');
        contentAreas.forEach(area => {
            let html = area.innerHTML;
            for (const [keyword, definition] of Object.entries(TOOLTIP_DICTIONARY)) {
                // Use a regex to find the keyword whole word, ignore case, but prevent replacing inside HTML tags
                const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)`, 'gi');
                html = html.replace(regex, `<span class="bq-tooltip">$1<span class="bq-tooltip-text">${definition}</span></span>`);
            }
            area.innerHTML = html;
        });
    };
    parseTooltips();
    
    // We also want to re-parse tooltips if dynamic content is generated (like loot)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // If this is a generator output, re-parse (we do a light debounce or direct check to avoid infinite loops)
                if (mutation.target.id === 'loot-display' || mutation.target.id === 'encounter-output' || mutation.target.id === 'statblock') {
                    // Temporarily disconnect observer to prevent infinite loop
                    observer.disconnect();
                    parseTooltips();
                    startObserver();
                }
            }
        });
    });
    
    const startObserver = () => {
        observer.observe(document.body, { childList: true, subtree: true });
    }
    startObserver();

    // 2. Search Modal Setup
    const modalHTML = `
        <div id="bq-search-modal" class="search-modal">
            <div class="search-modal-content">
                <input type="text" id="bq-search-input" class="search-input" placeholder="Search the Quay (Lore, Tools, Mechanics)...">
                <div id="bq-search-results" class="search-results"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const searchModal = document.getElementById('bq-search-modal');
    const searchInput = document.getElementById('bq-search-input');
    const searchResults = document.getElementById('bq-search-results');
    
    // Search Trigger (Ctrl+K or clicking the Nav button)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchModal.style.display = searchModal.style.display === 'block' ? 'none' : 'block';
            if (searchModal.style.display === 'block') {
                searchInput.focus();
            }
        }
        if (e.key === 'Escape') {
            searchModal.style.display = 'none';
        }
    });
    
    // Close if clicking outside modal
    window.addEventListener("click", function(event) {
        if (event.target == searchModal) {
            searchModal.style.display = "none";
        }
    }
    
    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchResults.innerHTML = '';
        
        if (query.length < 2) return;
        
        const matches = SEARCH_INDEX.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query)
        );
        
        if (matches.length === 0) {
            searchResults.innerHTML = '<p style="color: #94a3b8; text-align: center;">No secrets found matching that query.</p>';
            return;
        }
        
        matches.forEach(match => {
            searchResults.innerHTML += `
                <a href="${match.link}" class="search-result-item">
                    <h4 class="search-result-title">${match.title}</h4>
                    <p class="search-result-desc">${match.desc}</p>
                </a>
            `;
        });
    });
});
