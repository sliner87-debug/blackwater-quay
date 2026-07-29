/* Blackwater Quay & Sablehook Portal JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    initDistricts();
    initBankiMorph();
    initFactionTrackers();
    initDiceRoller();
    initTimelineAccordion();
    initCharacters();
});

/* --- Districts Tab Logic --- */
const districtData = {
    sluices: {
        name: "Northern Sluices",
        vibe: "Sulfurous sewer fumes, weeping brickwork, alchemical runoff",
        desc: "A sprawling network of stone conduits, iron lock gates, and sludge channels where the city's waste is filtered. Above the channels, the poorest citizens build hanging wooden structures. The Choir of the Below has established distribution vectors here for compliance serums.",
        image: "images/plate03_district_blackwater_quay.png",
        spots: [
            { name: "The Gull & Gasket Vaults", desc: "A repurposed sluice station acting as a low-profile tavern. Heavily warded vaults below hide Sablehook's surface intelligence." },
            { name: "Sluice Gate S-1", desc: "A heavily rusted iron blockade guarded by compliant cult thugs." },
            { name: "The Distribution Vault S-3", desc: "Where Choir priests brew and pack the alchemical Blue-Drop droplets." }
        ]
    },
    belowmarket: {
        name: "Belowmarket Deep",
        vibe: "Roasting meat, heavy ozone, vulcanism, and black market dealmaking",
        desc: "A massive, multi-tiered cavern that serves as the black-market trading center of the Underdark. Anything can be bartered here, from stolen planar artifacts to fleshwarped monsters. Duergar forges ring beside green-sludge canals.",
        image: "images/plate05_district_registry_market.png",
        spots: [
            { name: "The Obsidian Anvil", desc: "Hroth's duergar forge. Built over a volcanic fissure, sheathing smuggling hulls in blackwater ironwood." },
            { name: "The Barnacle Vault", desc: "Mother Gutter's coral cavern, offering deep-sea alignments and fey-metal caltrops." },
            { name: "The Fleshwarped Foundry F-4", desc: "Dr. Vespera Thran's basalt fortress housing the Consortium's vat rooms." }
        ]
    },
    sablehook: {
        name: "Sablehook Territory",
        vibe: "Cold iron, distilled vinegar, clockwork efficiency, and quiet tension",
        desc: "Located deep in the high-security foundations of the city's old vaults. Unlike the chaotic marketplace, this district is run like a military camp with rigid security, warded barriers, and pristine research labs.",
        image: "images/plate07_sablehook_grounds.png",
        spots: [
            { name: "Suture's Biomantic Clinic", desc: "A pristine, tiled medical laboratory where Kael's apprentice, Suture, drafts tissue and applies grafts." },
            { name: "The Shroud Core", desc: "Where Banki sits in deep trance, anchoring the Tri-Weave Shroud over the harbor." },
            { name: "The Ironwood Exchange", desc: "A smuggling warehouse managed by Grish the bugbear, stocking warded lead pouches." }
        ]
    },
    annex: {
        name: "The Deepmind Annex",
        vibe: "Non-Euclidean geometry, floating brine, whispering static",
        desc: "Deep beneath the Quay lies the Annex, a gateway controlled by the Elder Node. Reality unravels here; gravity does not pull, it twists. Sluggish saltwater rises toward the high vaults, hanging in mid-air in massive floating bubbles.",
        image: "images/plate05_district_registry_market.png", // Reusing an existing plate
        spots: [
            { name: "The Gravity Flues", desc: "Vertical shafts where gravity fluctuates randomly due to planar bleeding." },
            { name: "Cathedral of Whispers", desc: "Ancient goblin ruins corrupted by the Void, saturated with telepathic static." },
            { name: "The Rift Core", desc: "The locus of the tear to the Realm of Madness, defended by Elder Node avatars." }
        ]
    }
};

function initDistricts() {
    const tabs = document.querySelectorAll('.district-tab-btn');
    const panel = document.getElementById('district-content');
    
    if (!panel) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const key = tab.getAttribute('data-district');
            const data = districtData[key];
            
            // Trigger fade out and update
            panel.style.opacity = 0;
            
            setTimeout(() => {
                panel.querySelector('.district-img').src = data.image;
                panel.querySelector('.district-img').alt = data.name;
                panel.querySelector('.district-name').innerText = data.name;
                panel.querySelector('.district-vibe').innerText = data.vibe;
                panel.querySelector('.district-desc').innerText = data.desc;
                
                const spotsContainer = panel.querySelector('.district-spots');
                spotsContainer.innerHTML = '';
                
                data.spots.forEach(spot => {
                    const li = document.createElement('li');
                    li.className = "district-spot-item";
                    li.innerHTML = `<strong>${spot.name}</strong> ${spot.desc}`;
                    spotsContainer.appendChild(li);
                });
                
                panel.style.opacity = 1;
            }, 200);
        });
    });
}

/* --- Banki Morph Selector --- */
const bankiForms = {
    human: {
        title: "Human Disguise",
        img: "images/banki_human_form_1781797072911.png",
        quote: "Survival belongs to the thing that can become unrecognizable.",
        bio: "A middle-aged man of average build and grey-green eyes, appearing as an ordinary sellsword. This shape hides his true nature from prying eyes."
    },
    pixie: {
        title: "Fey Pixie Form",
        img: "images/banki_pixie_form_1781797086237.png",
        quote: "Good people are the most dangerous people in the world.",
        bio: "His original form: an ancient fey sprite of the old forest. Spliced by the Consortium, he retains fey agility and high magical potency."
    },
    pixillithid: {
        title: "PixIllithid Hybrid",
        img: "images/banki_pixillithid_form_1781797101181.png",
        quote: "The equation of this Quay has only one solution: compliance or termination.",
        bio: "His true post-splicing biological form. Four purple facial tentacles writhe lazily. Spliced with illithid intellect, he communicates via a closed-loop telepathic system."
    }
};

function initBankiMorph() {
    const buttons = document.querySelectorAll('.form-btn');
    const card = document.querySelector('.char-card.banki');
    
    if (!card) return;
    
    const imgEl = card.querySelector('.char-img');
    const nameEl = card.querySelector('.char-name');
    const quoteEl = card.querySelector('.char-quote');
    const bioEl = card.querySelector('.char-bio');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const formKey = btn.getAttribute('data-form');
            const data = bankiForms[formKey];
            
            // Animate transition
            imgEl.style.opacity = 0.3;
            setTimeout(() => {
                imgEl.src = data.img;
                nameEl.innerText = "Banki (" + data.title + ")";
                quoteEl.innerText = `"${data.quote}"`;
                bioEl.innerText = data.bio;
                imgEl.style.opacity = 1;
            }, 150);
        });
    });
}


const characterRoster = [
    {
        "id": "aldric",
        "name": "Zaniph",
        "role": "Githyanki Deserter",
        "bio": "Aldric Thorne is a Paladin of the Sun-Spear, dedicated to the Dawnfather. Dressed in common wool and leather but carrying the rigid bearing of a ma...",
        "img": "Character_PNGs_v2/Aldric.png",
        "quote": "\"Vlaakith's knights think the silver sword makes them gods. A broken blade cuts just as deep.\""
    },
    {
        "id": "banki",
        "name": "Banki",
        "role": "Sovereign / Syndicate Leader",
        "bio": "Banki is the Sovereign of the Third Quiet, a criminal mastermind and neural savant in Blackwater Quay. He hides behind a remarkably unremarkable fa...",
        "img": "Character_PNGs_v2/Banki.png",
        "quote": "\"Survival belongs to the thing that can become unrecognizable.\""
    },
    {
        "id": "beri",
        "name": "Beri",
        "role": "Scribe / Bureaucrat",
        "bio": "Beri is a scribe serving under the Crown First Record Doctrine. Placed in terrifying situations involving temporal pressure, time-dilation bubbles,...",
        "img": "Character_PNGs_v2/Beri.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "branna",
        "name": "Branna",
        "role": "Underworld Operative",
        "bio": "Branna is a resolute and defiant cook in a stone fortress, standing as a bulwark against the starvation plaguing the city. Her forearms are permane...",
        "img": "Character_PNGs_v2/Branna.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "caelen",
        "name": "Caelen",
        "role": "Ranger / Tracker",
        "bio": "Caelen is an elven ranger who operates in the gritty underworld of the Dockside. Pragmatic and observant, he trusts mud, loose stone, and old habit...",
        "img": "Character_PNGs_v2/Caelen.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "caspel",
        "name": "Caspel",
        "role": "Underworld Operative",
        "bio": "Caspel Rooke is a forty-six-year-old clerk at the Municipal Transfer Registry. Narrow in the shoulders and careful with his cuffs, he has an exhaus...",
        "img": "Character_PNGs_v2/Caspel.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "darric",
        "name": "Darric",
        "role": "Underworld Operative",
        "bio": "Darric is a veteran soldier and tactical expert with a pragmatic, grim authority. He often walks with his hands clasped firmly behind his back, a d...",
        "img": "Character_PNGs_v2/Darric.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "edric",
        "name": "Edric",
        "role": "Underworld Operative",
        "bio": "Edric Mallon is the 43-year-old barkeep of the Gull & Gasket, though the deep trenches in his face make him look closer to sixty. Crushing debt onc...",
        "img": "Character_PNGs_v2/Edric.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "fateshear",
        "name": "Fateshear",
        "role": "Sentient Artifact",
        "bio": "Fateshear is an ancient, sentient greatsword forged from a shard of the astral plane. It communicates telepathic fragments of combat predictions, w...",
        "img": "Character_PNGs_v2/Fateshear.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "glassjaw",
        "name": "Glassjaw",
        "role": "Underworld Operative",
        "bio": "Glassjaw Rellis is a rogue and information broker on the docks. He attempts to project ease with a sly, evasive, practiced rogue's smile, but under...",
        "img": "Character_PNGs_v2/Glassjaw.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "gull",
        "name": "Gull",
        "role": "Underworld Operative",
        "bio": "Edric 'Gull' Mallon is the forty-three-year-old owner of the Gull & Gasket tavern, though crushing debt owns his soul. Deep trenches in his face ma...",
        "img": "Character_PNGs_v2/Gull.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "hark",
        "name": "Hark",
        "role": "Underworld Operative",
        "bio": "Hark is a pragmatic and seasoned tracker and mercenary. He favors heavy drop-snares and tension tripwires in the high peaks, using raw, steaming mo...",
        "img": "Character_PNGs_v2/Hark.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "hesta",
        "name": "Hesta",
        "role": "Underworld Operative",
        "bio": "Hesta Bramblewake is a tough, no-nonsense handler and supervisor of dangerous beasts. She is known to chew tobacco and paint safety marks on the fl...",
        "img": "Character_PNGs_v2/Hesta.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "iven",
        "name": "Iven",
        "role": "Underworld Operative",
        "bio": "Iven is a smooth-talking fence and smuggler who operates in the affluent shadows of the city. He dresses in fine silk that clashes with the grime o...",
        "img": "Character_PNGs_v2/Iven.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "jeren",
        "name": "Jeren",
        "role": "Underworld Operative",
        "bio": "Jeren is a towering, heavily-built man with grim, heavy features. He moves with eerie silence and incredible efficiency. Wielding his unique weapon...",
        "img": "Character_PNGs_v2/Jeren.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "kael",
        "name": "Dr. Mikhailis Vael-Kaelor",
        "role": "Planar Compass / Corsair Captain",
        "bio": "Dr. Mikhailis Vael-Kaelor, known as Kael, is a towering fey monstrosity disguised as a Shadar-kai. He is the Planar Compass and Sovereign Corsair o...",
        "img": "Character_PNGs_v2/Kael.png",
        "quote": "\"A lock is just a door that hasn't met the right timeline. Stand back, let's see how this stone tasted.\""
    },
    {
        "id": "kessa",
        "name": "Kessa",
        "role": "Underworld Operative",
        "bio": "Kessa is a dedicated beast-master recruit who runs the Transition Tank and Isolation Wagons. Her bare hands are heavily scarred from years of worki...",
        "img": "Character_PNGs_v2/Kessa.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "kestrel",
        "name": "Kessler",
        "role": "Tarkanan Commander",
        "bio": "Kestrel is a highly lethal avian predator and tactical scout within Banki's network. She approaches combat as a mathematical equation, viewing magi...",
        "img": "Character_PNGs_v2/Kestrel.png",
        "quote": "\"My mark doesn't ask for permission. It just burns.\""
    },
    {
        "id": "lyris",
        "name": "Lyris",
        "role": "Pact-Mage / Ward Specialist",
        "bio": "Lyris is a meticulous pact-mage and ward-specialist. She analyzes ley-lines, song-stone webs, and arcane frequencies with the precision of a schola...",
        "img": "Character_PNGs_v2/Lyris.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "mara",
        "name": "Mara",
        "role": "Underworld Operative",
        "bio": "Mara is a meticulous, unyielding administrative clerk and merchant-apprentice. She dresses in a simple tunic and always carries a massive, iron-bou...",
        "img": "Character_PNGs_v2/Mara.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "maren",
        "name": "Maren",
        "role": "Bard / Empath",
        "bio": "Maren Goldstring is a bard and musician who uses her lute and song to anchor fractured minds and push back the ugliness of the world. She is deeply...",
        "img": "Character_PNGs_v2/Maren.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "mira",
        "name": "Mira",
        "role": "Void-Touched Scout",
        "bio": "Mira is a void-touched scout and tracker for Sablehook. She operates in the absolute darkness of the Belowmarket Deep, her eyes replaced by glowing...",
        "img": "Character_PNGs_v2/Mira.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "mirell",
        "name": "Mirell",
        "role": "Underworld Operative",
        "bio": "Mirell is a kraken-kin scholar who resides primarily in a deep aquatic tank. She possesses massive, heavily scarred tentacles that shift restlessly...",
        "img": "Character_PNGs_v2/Mirell.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "pimwick",
        "name": "Pimwick",
        "role": "Underworld Operative",
        "bio": "Pimwick Nacklegear is a merchant of curios and sundries in the night market. He is a creature composed entirely of sharp, jutting wrists, a rat-lik...",
        "img": "Character_PNGs_v2/Pimwick.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "rinna",
        "name": "Rinna",
        "role": "Underworld Operative",
        "bio": "Rinna Claystep is a rugged caravan handler who braves the freezing, unnatural depths of the Brinewood and the ancient passages beneath it. Dressed ...",
        "img": "Character_PNGs_v2/Rinna.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "sable",
        "name": "Sable",
        "role": "Assassin / Enforcer",
        "bio": "Sable is Banki's enforcer and the master of the upper city in Blackwater Quay. Moving with the terrifying, economical violence of a shadow pretendi...",
        "img": "Character_PNGs_v2/Sable.png",
        "quote": "\"If you want to live in the Quay, count the seconds between the guard's sweeps.\""
    },
    {
        "id": "seraphine",
        "name": "Seraphine",
        "role": "Cleric / Healer",
        "bio": "Seraphine is a Cleric of the Dawnfather, radiating a gentle but powerful holy light meant to cleanse and restore. She is deeply repulsed by cruelty...",
        "img": "Character_PNGs_v2/Seraphine.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "serris",
        "name": "Serris",
        "role": "Underworld Operative",
        "bio": "Serris is a mid-level registry clerk and an anonymous informant. She is married, unremarkable in appearance, and possessed of absolute bureaucratic...",
        "img": "Character_PNGs_v2/Serris.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "suture",
        "name": "Suture",
        "role": "Biomantic Surgeon",
        "bio": "Suture is Captain Kael's biomantic apprentice and the chief medical officer of The Bleeding Needle. He is a stitched-together amalgam of different ...",
        "img": "Character_PNGs_v2/Suture.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "torren",
        "name": "Torren",
        "role": "Underworld Operative",
        "bio": "Torren Ashpell is a ceramic artisan who runs a dead-drop masking site for the smuggling network. Middle-aged, stooped from cellar ceilings, and per...",
        "img": "Character_PNGs_v2/Torren.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "tovin",
        "name": "Terik / Hruujj",
        "role": "Rakshasa Broker",
        "bio": "Tovin Vale is a seven-year-old boy rescued from the brutal fighting pits of the Belowmarket. He possesses the hyper-vigilance of the hunted, his na...",
        "img": "Character_PNGs_v2/Tovin.png",
        "quote": "\"Coins bear many faces. Fortunately, so do I. Shall we write a new transaction?\""
    },
    {
        "id": "vesper",
        "name": "Vesper",
        "role": "Underworld Operative",
        "bio": "Vesper is a former Crown intelligence operative and highly skilled ranger. He moves with an oily, frictionless grace and hides grafted bone-blades ...",
        "img": "Character_PNGs_v2/Vesper.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "vosk",
        "name": "Vosk",
        "role": "Underworld Operative",
        "bio": "Vosk is a brutal enforcer for the local smuggling rings. His face is heavily scarred from years of pit fighting in the undercity. He wears a heavy ...",
        "img": "Character_PNGs_v2/Vosk.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "voss",
        "name": "Voss",
        "role": "Underworld Operative",
        "bio": "Voss is a port-facing official and surgeon deeply embroiled in the criminal underworld. He is known for panicking downward when threatened, shiftin...",
        "img": "Character_PNGs_v2/Voss.png",
        "quote": "In the Quay, you are either the predator or the product."
    },
    {
        "id": "wren",
        "name": "Wren",
        "role": "Underworld Operative",
        "bio": "Wren is a nimble, sharp-eyed street urchin and pickpocket who navigates the rooftops and alleyways of Blackwater Quay. Clad in patched, oversized c...",
        "img": "Character_PNGs_v2/Wren.png",
        "quote": "In the Quay, you are either the predator or the product."
    }
];

function initCharacters() {
    const grid = document.getElementById('dynamic-characters-grid');
    if (!grid) return;
    
    let html = '';
    characterRoster.forEach(char => {
        html += `
        <div class="char-card ${char.id}">
            <div class="char-img-container">
                <img src="${char.img}" alt="${char.name}" class="char-img" onerror="this.src='images/default_avatar.png'">
            </div>
            <div class="char-details">
                <div class="char-header">
                    <h3 class="char-name">${char.name}</h3>
                    <span class="char-role">${char.role}</span>
                </div>
                <p class="char-quote"><em>${char.quote}</em></p>
                <p class="char-bio">${char.bio}</p>
            </div>
        </div>
        `;
    });
    
    grid.innerHTML = html;
}

/* --- Faction Tracker System --- */
const factionRewards = {
    sablehook: {
        name: "Sablehook Syndicate",
        levels: [
            { threshold: -5, standing: "Marked Target (-5)", title: "Sewer Ambush", desc: "Smugglers actively ambush the party in lock channels. -2 penalty to Charisma checks with underworld entities in Blackwater Quay.", effect: "Hostile forces hunt you down." },
            { threshold: 0, standing: "Neutral (0)", title: "Smuggler Contacts", desc: "Standard black market rates. Rumors can be gathered at the Gull & Gasket vaults.", effect: "No active modifications." },
            { threshold: 2, standing: "Associate (+2)", title: "Clinic & Supply Access", desc: "Unlocks Suture's alchemical shop. Receive a 10% discount on standard potions, remedies, and basic biological grafts.", effect: "10% store discount." },
            { threshold: 5, standing: "Lieutenant (+5)", title: "Tri-Weave Cloaking", desc: "Sablehook provides lead cases that shield magic items from magical/psionic detection. Call smuggling crews to sneak assets through lock systems.", effect: "Immune to surface scanning spells." },
            { threshold: 8, standing: "Sovereign Ally (+8)", title: "Chronal Comm Link", desc: "Banki anchors you into the outer loop of the Vael-Kaelor collective. Communicate telepathically across the city, bypassing magical wards.", effect: "Free unlimited telepathic contact." },
            { threshold: 10, standing: "The Severing Edge (+10)", title: "Captain Kael Strike", desc: "Once per campaign, Captain Mikhailis deploys the Onyx Wake to blast a path through an enemy flotilla or incinerate an entire dockside block to clear your path.", effect: "Summon the Sovereign Corsair." }
        ]
    },
    tarkanan: {
        name: "House Tarkanan",
        levels: [
            { threshold: -5, standing: "Contract Out (-5)", title: "Tarkanan Shadows", desc: "Tarkanan assassins stalk the party. Random surface encounters have a 50% chance to start with a poisoned crossbow ambush (DC 16 Fort or sleep).", effect: "Assassins deployed." },
            { threshold: 0, standing: "Neutral (0)", title: "Mark Bearers", desc: "Vague respect for fellow outcasts. No mechanical benefits.", effect: "No active modifications." },
            { threshold: 2, standing: "Marked Friend (+2)", title: "Safehouse Sanctuary", desc: "Gain access to secure Tarkanan sewer bunkers. Resting here prevents any magical tracking or mundane location detection.", effect: "Rest is 100% untrackable." },
            { threshold: 5, standing: "Mark-Bearer (+5)", title: "Aberrant Coating", desc: "Thora grants access to private smiths. Weapons can be coated in aberrant acid for 1 hour, dealing +1d6 acid damage on successful strikes.", effect: "+1d6 Acid weapon damage (50 gp/vial)." },
            { threshold: 8, standing: "Shadow Agent (+8)", title: "Tarkanan Sniper Support", desc: "Once per combat when operating in Sluices or surface districts, call in a sniper strike. A target takes 5d6 sneak attack damage (DC 18 Reflex half).", effect: "Active sniper support." },
            { threshold: 10, standing: "Dragonmark Lord (+10)", title: "Aberrant Synergy", desc: "Purchase custom magic items that enhance aberrant dragonmarks, allowing you to cast mark spells an extra time per day without paying physical tolls.", effect: "+1 aberrant casting daily." }
        ]
    },
    dust: {
        name: "Lords of Dust",
        levels: [
            { threshold: -5, standing: "Prophecy Curse (-5)", title: "Calculations Shifted", desc: "The fiends manipulate fate against you. Permanent -2 penalty on all saving throws against spells from the Enchantment or Illusion schools.", effect: "-2 penalty to Will saves vs Illusion/Enchant." },
            { threshold: 0, standing: "Neutral (0)", title: "Disguised Contacts", desc: "Disguised agents watch your progress. Information is shared only in trades.", effect: "No active modifications." },
            { threshold: 2, standing: "Mercenary (+2)", title: "Fiendish Insight", desc: "Terik shares historic intelligence, granting a +4 bonus on History or Arcana checks relating to ancient fiends or the Draconic Prophecy.", effect: "+4 bonus to History and Arcana." },
            { threshold: 5, standing: "Contractor (+5)", title: "Rakshasa Disguise Tokens", desc: "Receive 3 Disguise Tokens. Cracking one casts Disguise Self (CL 10) and completely shields alignment from all detection magic for 8 hours.", effect: "Obtain 3 alignment-shielding tokens." },
            { threshold: 8, standing: "Prophecy Weaver (+8)", title: "Ancient Pact Rewrite", desc: "Once per campaign, reroll any failed save or attack roll with a +5 bonus. Bending reality raises the city's Suspicion Level by 2.", effect: "Reality reroll (+2 Suspicion cost)." },
            { threshold: 10, standing: "Ascendant Agent (+10)", title: "Fiendish Weapon Infusion", desc: "Terik infuses one weapon of your choice with unholy planar energy, adding the Unholy or Anarchic weapon property permanently.", effect: "+2d6 Unholy damage on weapon." }
        ]
    },
    
    thessalan: {
        name: "Thessalan Consortium",
        levels: [
            { threshold: -5, standing: "Hunt Target (-5)", title: "Vat-Spawn Ambushes", desc: "Consortium mutants actively hunt you in the sewers.", effect: "Random mutant encounters." },
            { threshold: 0, standing: "Neutral (0)", title: "Monitored Subject", desc: "The Consortium monitors your actions from afar.", effect: "No active modifications." },
            { threshold: 5, standing: "Asset (+5)", title: "Alchemical Supply", desc: "Discounted access to advanced healing and mutagens.", effect: "15% store discount." },
            { threshold: 10, standing: "Board Member (+10)", title: "Biomantic Upgrades", desc: "Access to powerful physical augmentations.", effect: "+2 to one physical stat." }
        ]
    },
    choir: {
        name: "Choir of the Below",
        levels: [
            { threshold: -5, standing: "Heretic (-5)", title: "Psychic Static", desc: "The Choir floods your mind with static in the Sluices.", effect: "-2 penalty to Will saves." },
            { threshold: 0, standing: "Neutral (0)", title: "Ignored Soul", desc: "The Choir finds you unremarkable.", effect: "No active modifications." },
            { threshold: 5, standing: "Acolyte (+5)", title: "Compliance Nullification", desc: "Access to elixirs that grant temporary immunity to psychic intrusions.", effect: "Immunity to minor Elder Node whispers." },
            { threshold: 10, standing: "High Priest (+10)", title: "Telepathic Network", desc: "Ability to tap into the Choir's hive mind for information.", effect: "+10 to Gather Information." }
        ]
    },
    githyanki: {
        name: "Githyanki Fleet",
        levels: [
            { threshold: -5, standing: "Ghaik Sympathizer (-5)", title: "Astral Stalkers", desc: "Githyanki hunting parties actively track your location.", effect: "Hunted by Astral Stalkers." },
            { threshold: 0, standing: "Neutral (0)", title: "Irrelevant", desc: "The Fleet has other priorities.", effect: "No active modifications." },
            { threshold: 5, standing: "Respected Warrior (+5)", title: "Silver Forging", desc: "Access to silvered weapons and armor upgrades.", effect: "Silvered weapons bypass DR." },
            { threshold: 10, standing: "Kith'rak (+10)", title: "Red Dragon Support", desc: "Once per campaign, call in a Red Dragon strike.", effect: "Summon Red Dragon Wyrmling." }
        ]
    },
    suspicion: {
        name: "Templar Suspicion (The Heat)",
        levels: [
            { threshold: 0, standing: "Clear (0)", title: "Unnoticed Operators", desc: "The watch is focusing on standard smuggling. Operations proceed smoothly.", effect: "No active penalties." },
            { threshold: 2, standing: "Alert (2)", title: "Heightened Vigilance", desc: "City watch guards are more attentive. All Disguise and Hide checks in public areas suffer a -2 penalty.", effect: "-2 to stealth & disguise checks." },
            { threshold: 5, standing: "Patrolled (5)", title: "Sewer Enforcers", desc: "Sewer patrols are doubled. Random encounters with Templar inquisitors become common during transport.", effect: "Doubled patrol encounters." },
            { threshold: 8, standing: "Wanted (8)", title: "Blockade Lockdown", desc: "Warrants are active. City gates and harbor locks are sealed to the party. Smuggling checks suffer a -5 penalty.", effect: "Locks closed; -5 smuggling checks." },
            { threshold: 10, standing: "The Purge (10)", title: "Shroud Lockdown", desc: "Templars launch a massive inquisitorial sweep. Sablehook must engage the Tri-Weave Shroud immediately, locking down the compound and blocking all commerce.", effect: "Sablehook compound lockdown." }
        ]
    }
};

function initFactionTrackers() {
    const sliders = document.querySelectorAll('.renown-slider');
    const rewardPanel = document.getElementById('reward-panel');
    
    if (!rewardPanel) return;
    
    const factionNameEl = rewardPanel.querySelector('.reward-faction-name');
    const standingEl = rewardPanel.querySelector('.reward-standing');
    const perkNameEl = rewardPanel.querySelector('.reward-perk-name');
    const perkDescEl = rewardPanel.querySelector('.reward-perk-desc');
    const effectEl = rewardPanel.querySelector('.reward-effect-box');
    
    function updatePanel(factionKey, value) {
        const data = factionRewards[factionKey];
        const badge = document.getElementById(`${factionKey}-badge`);
        
        // Update badge text
        if (badge) {
            badge.innerText = value > 0 ? `+${value}` : value;
        }
        
        // Find closest threshold level without exceeding the value (or minimum if below lowest)
        let activeLevel = data.levels[0];
        for (let i = 0; i < data.levels.length; i++) {
            if (value >= data.levels[i].threshold) {
                activeLevel = data.levels[i];
            }
        }
        
        // Apply neon accent colors depending on faction
        let color = 'var(--accent-red)';
        if (factionKey === 'sablehook') color = 'var(--accent-cyan)';
        else if (factionKey === 'tarkanan') color = 'var(--accent-red)';
        else if (factionKey === 'dust') color = 'var(--accent-gold)';
        else if (factionKey === 'thessalan') color = 'var(--accent-green, #4CAF50)';
        else if (factionKey === 'choir') color = 'var(--accent-purple, #9C27B0)';
        else if (factionKey === 'githyanki') color = 'var(--accent-silver, #C0C0C0)';
        rewardPanel.style.borderColor = color;
        
        // Text animation
        rewardPanel.style.opacity = 0.5;
        setTimeout(() => {
            factionNameEl.innerText = data.name;
            standingEl.innerText = activeLevel.standing;
            perkNameEl.innerText = activeLevel.title;
            perkDescEl.innerText = activeLevel.desc;
            effectEl.innerHTML = `<strong>Rule Mod:</strong> ${activeLevel.effect}`;
            
            // Set indicator style in effect box
            effectEl.style.borderLeftColor = color;
                                            
            rewardPanel.style.opacity = 1;
        }, 100);
    }
    
    sliders.forEach(slider => {
        const faction = slider.getAttribute('data-faction');
        
        // Update on input change
        slider.addEventListener('input', (e) => {
            updatePanel(faction, parseInt(e.target.value));
        });
        
        // Initial setup
        if (faction === 'sablehook') {
            updatePanel(faction, parseInt(slider.value));
        }
    });
}

/* --- D20 daily intrusion roller logic --- */
const intrusionRows = {
    1: { title: "Quiet Timeline", effect: "The Elder Node is quiet, focusing its energies on the rift core. No intrusion occurs." },
    2: { title: "Quiet Timeline", effect: "The Elder Node is quiet, focusing its energies on the rift core. No intrusion occurs." },
    3: { title: "Quiet Timeline", effect: "The Elder Node is quiet, focusing its energies on the rift core. No intrusion occurs." },
    4: { title: "Quiet Timeline", effect: "The Elder Node is quiet, focusing its energies on the rift core. No intrusion occurs." },
    5: { title: "Quiet Timeline", effect: "The Elder Node is quiet, focusing its energies on the rift core. No intrusion occurs." },
    6: { title: "Psychic Whisper", effect: "All characters must succeed on a DC 14 Will save or take a -1 penalty to Initiative and Charisma-based checks for the next 24 hours." },
    7: { title: "Psychic Whisper", effect: "All characters must succeed on a DC 14 Will save or take a -1 penalty to Initiative and Charisma-based checks for the next 24 hours." },
    8: { title: "Psychic Whisper", effect: "All characters must succeed on a DC 14 Will save or take a -1 penalty to Initiative and Charisma-based checks for the next 24 hours." },
    9: { title: "Psychic Whisper", effect: "All characters must succeed on a DC 14 Will save or take a -1 penalty to Initiative and Charisma-based checks for the next 24 hours." },
    10: { title: "Gravity Distortion", effect: "Local gravity fluctuates. For 1d4 hours, characters gain +10 ft. speed bonus, but take a -2 penalty on melee attack rolls as they float." },
    11: { title: "Gravity Distortion", effect: "Local gravity fluctuates. For 1d4 hours, characters gain +10 ft. speed bonus, but take a -2 penalty on melee attack rolls as they float." },
    12: { title: "Gravity Distortion", effect: "Local gravity fluctuates. For 1d4 hours, characters gain +10 ft. speed bonus, but take a -2 penalty on melee attack rolls as they float." },
    13: { title: "Compliance Sweep", effect: "The Choir sends enforcers. Next combat encounter is joined on Round 3 by 1d4 Compliant Sewer Enforcers." },
    14: { title: "Compliance Sweep", effect: "The Choir sends enforcers. Next combat encounter is joined on Round 3 by 1d4 Compliant Sewer Enforcers." },
    15: { title: "Compliance Sweep", effect: "The Choir sends enforcers. Next combat encounter is joined on Round 3 by 1d4 Compliant Sewer Enforcers." },
    16: { title: "Fleshwarped Flare", effect: "Living creatures within 30 ft. of the surge must succeed on a DC 16 Fortitude save or take 1d4 Dex damage as joints fuse." },
    17: { title: "Fleshwarped Flare", effect: "Living creatures within 30 ft. of the surge must succeed on a DC 16 Fortitude save or take 1d4 Dex damage as joints fuse." },
    18: { title: "Fleshwarped Flare", effect: "Living creatures within 30 ft. of the surge must succeed on a DC 16 Fortitude save or take 1d4 Dex damage as joints fuse." },
    19: { title: "Mind Blast Beacon", effect: "The party triggers a psychic alarm. A strike team of 2 Dolgaunts and 1 Thessalan Displacer Beast prototype ambushes them within 1d4 hours." },
    20: { title: "Mind Blast Beacon", effect: "The party triggers a psychic alarm. A strike team of 2 Dolgaunts and 1 Thessalan Displacer Beast prototype ambushes them within 1d4 hours." }
};

function initDiceRoller() {
    const rollBtn = document.getElementById('roll-btn');
    const d20Svg = document.getElementById('d20-svg');
    const resultNum = document.getElementById('dice-number');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');
    const rows = document.querySelectorAll('.intrusion-row');
    
    if (!rollBtn) return;
    
    rollBtn.addEventListener('click', () => {
        // Disable roll button during animation
        rollBtn.disabled = true;
        rollBtn.innerText = "Sensing timelines...";
        
        // Remove previous active rows
        rows.forEach(r => r.classList.remove('active-row'));
        
        // Play dice rolling animation
        d20Svg.classList.add('dice-rolling');
        
        let counter = 0;
        const interval = setInterval(() => {
            resultNum.innerText = Math.floor(Math.random() * 20) + 1;
            counter++;
            if (counter > 10) clearInterval(interval);
        }, 80);
        
        setTimeout(() => {
            d20Svg.classList.remove('dice-rolling');
            
            const roll = Math.floor(Math.random() * 20) + 1;
            resultNum.innerText = roll;
            

            // Procedural generation of intrusion
            let title = "Quiet Timeline";
            let effect = "The Elder Node is quiet, focusing its energies on the rift core. No intrusion occurs.";
            let targetRowId = 'row-quiet';
            
            // Check current standings for modifiers
            const sableSlider = document.querySelector('.renown-slider[data-faction="sablehook"]');
            const tarkSlider = document.querySelector('.renown-slider[data-faction="tarkanan"]');
            let modifiedRoll = roll;
            
            if (sableSlider && parseInt(sableSlider.value) >= 5) modifiedRoll -= 2; // Sablehook cloaking helps
            if (tarkSlider && parseInt(tarkSlider.value) <= -5) modifiedRoll += 2; // Hunted status worsens things
            
            if (modifiedRoll < 1) modifiedRoll = 1;
            if (modifiedRoll > 20) modifiedRoll = 20;

            if (modifiedRoll >= 6 && modifiedRoll <= 9) {
                targetRowId = 'row-whisper';
                title = "Psychic Whisper";
                effect = "Telepathic static echoes. All characters must succeed on a DC 14 Will save or take a -1 penalty to Initiative and Charisma-based checks for the next 24 hours.";
            } else if (modifiedRoll >= 10 && modifiedRoll <= 12) {
                targetRowId = 'row-gravity';
                title = "Gravity Distortion";
                effect = "Local gravity fluctuates. For 1d4 hours, characters gain +10 ft. speed bonus, but take a -2 penalty on melee attack rolls as they float.";
            } else if (modifiedRoll >= 13 && modifiedRoll <= 15) {
                targetRowId = 'row-compliance';
                title = "Compliance Sweep";
                const numEnforcers = Math.floor(Math.random() * 4) + 1;
                effect = `The Choir sends hunters. Next combat encounter is joined on Round 3 by ${numEnforcers} Compliant Sewer Enforcers seeking capture.`;
            } else if (modifiedRoll >= 16 && modifiedRoll <= 18) {
                targetRowId = 'row-flare';
                title = "Fleshwarped Flare";
                const dmg = Math.floor(Math.random() * 4) + 1;
                effect = `A wave of planar energy erupts. Living creatures within 30 ft. of the surge must succeed on a DC 16 Fortitude save or take ${dmg} Dex damage as joints fuse.`;
            } else if (modifiedRoll >= 19) {
                targetRowId = 'row-beacon';
                title = "Mind Blast Beacon";
                effect = "The party triggers a psychic alarm. A strike team consisting of 2 Dolgaunts and 1 Thessalan Displacer Beast prototype ambushes them within 1d4 hours.";
            }
            
            // Display description
            resultTitle.innerText = `Result ${roll} (Modified: ${modifiedRoll}): ${title}`;
            resultText.innerText = effect;

            
            const targetRow = document.getElementById(targetRowId);
            if (targetRow) {
                targetRow.classList.add('active-row');
                
                // Scroll row into view smoothly inside table container
                targetRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            rollBtn.disabled = false;
            rollBtn.innerText = "Roll for Intrusion";
        }, 1000);
    });
}

/* --- Timeline / Acts Accordion Logic --- */
function initTimelineAccordion() {
    const headers = document.querySelectorAll('.timeline-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.timeline-item');
            const isExpanded = item.classList.contains('expanded');
            
            // Optional: collapse other items (accordion effect)
            document.querySelectorAll('.timeline-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            
            if (isExpanded) {
                item.classList.remove('expanded');
            } else {
                item.classList.add('expanded');
            }
        });
    });
}

