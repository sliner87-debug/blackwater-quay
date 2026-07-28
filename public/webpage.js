/* Blackwater Quay & Sablehook Portal JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    initDistricts();
    initBankiMorph();
    initFactionTrackers();
    initDiceRoller();
    initTimelineAccordion();
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
        rewardPanel.style.borderColor = factionKey === 'sablehook' ? 'var(--accent-cyan)' :
                                       factionKey === 'tarkanan' ? 'var(--accent-red)' :
                                       factionKey === 'dust' ? 'var(--accent-gold)' : 'var(--accent-red)';
        
        // Text animation
        rewardPanel.style.opacity = 0.5;
        setTimeout(() => {
            factionNameEl.innerText = data.name;
            standingEl.innerText = activeLevel.standing;
            perkNameEl.innerText = activeLevel.title;
            perkDescEl.innerText = activeLevel.desc;
            effectEl.innerHTML = `<strong>Rule Mod:</strong> ${activeLevel.effect}`;
            
            // Set indicator style in effect box
            effectEl.style.borderLeftColor = factionKey === 'sablehook' ? 'var(--accent-cyan)' :
                                            factionKey === 'tarkanan' ? 'var(--accent-red)' :
                                            factionKey === 'dust' ? 'var(--accent-gold)' : 'var(--accent-red)';
                                            
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
            
            const effectData = intrusionRows[roll];
            
            // Display description
            resultTitle.innerText = `Result ${roll}: ${effectData.title}`;
            resultText.innerText = effectData.effect;
            
            // Find row range and highlight in table
            let targetRowId = '';
            if (roll >= 1 && roll <= 5) targetRowId = 'row-quiet';
            else if (roll >= 6 && roll <= 9) targetRowId = 'row-whisper';
            else if (roll >= 10 && roll <= 12) targetRowId = 'row-gravity';
            else if (roll >= 13 && roll <= 15) targetRowId = 'row-compliance';
            else if (roll >= 16 && roll <= 18) targetRowId = 'row-flare';
            else if (roll >= 19 && roll <= 20) targetRowId = 'row-beacon';
            
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
