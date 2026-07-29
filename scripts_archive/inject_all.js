const fs = require('fs');

function injectFlashbacks() {
    const books = [
        'h:\\Antigravity\\Novel\\book1_ash_vein_descent.html',
        'h:\\Antigravity\\Novel\\book2_outer_carry.html',
        'h:\\Antigravity\\Novel\\book3_third_quiet.html'
    ];

    const updates = {
        'book1_ash_vein_descent.html': {
            'The Brinewood': [
                "As the Sovereign Thread took hold, the psychic exertion tore open a sealed vault in his mind. The forest faded, replaced by the blinding, sterile lumen-glare of the Thessalan holding wing.",
                "He wasn't the Sovereign; he was a tiny, naked pixie strapped to a cold crystal vivisection table. He felt the horrific, wet crunch of Voss's scalpel breaching his skull without anesthetic.",
                "The biomancers were carving his brain matter, forcibly grafting the psionic channels to his nervous system. The cold metal scraped against his frontal lobe, a sensation of absolute, helpless agony.",
                "And through that fresh psychic wound, the chaotic, gibbering madness of Xoriat poured in—a billion screaming, alien voices threatening to shred his identity into wet confetti.",
                "Banki gasped, his vision swimming with blood and void. He had to violently compartmentalize the trauma, slamming the heavy iron doors of his Lawful Evil doctrine shut against the screaming void.",
                "He crushed the memory down with absolute, tyrannical order, forcing the chaos back so he could maintain the Thread. He was the architect now. He would not scream."
            ],
            'The Brain and the Binding': [
                "The fighter's mind thrashed, a desperate, screaming resistance that triggered a violent sensory overlap. Suddenly, the copper stink of blood and the dropping air pressure threw Banki back onto the Thessalan extraction tables.",
                "He wasn't the one pulling; he was the one being pulled apart. He felt the agonizing, deep-tissue plunge of thick psionic needles driving into his own temporal lobes, siphoning his essence while masked biomancers took detached, meticulous notes on clipboards.",
                "The violation was absolute, an obscene rape of his soul. The psychic bridge reversed for a terrifying second, and Xoriat's void surged up his arms, whispering that he was still strapped to the table, that he had never escaped.",
                "Banki snarled, a wet, guttural sound. He violently wrenched his consciousness away from the madness, weaponizing his own trauma. He reasserted his cold, absolute dominance over his shattered mind, forcing the Ashen Ledger's rigid laws over the chaos.",
                "He ripped the talent free, leaving the prisoner a vacant husk, proving to the void that he was the torturer now."
            ]
        },
        'book2_outer_carry.html': {
            'The Red Shelves': [
                "As the beast's glass whiskers shattered his wards and cut his flesh, the sudden, sharp pain ruptured his emotional detachment. The sensation of his own blood running warm triggered a catastrophic somatic flashback to the obscene grafting of his 'PixIllithid' WarForm.",
                "He wasn't just remembering the pain of the Thessalan biomancers; he was remembering the *other* mind. The horrific sentience that had come attached to the illithid head graft. He remembered the brutal, suffocating mental war he had fought inside his own skull against the alien consciousness—a war for his very identity that he had very, very nearly lost.",
                "He remembered the sickening compromise he had to make to win. To assert dominance, he had to permanently sacrifice a vital, innocent piece of his pixie soul to the illithid mind. He had traded away his capacity for genuine, uncalculated empathy just to survive the graft.",
                "The chaotic madness of Xoriat bubbled up through the fresh wound, screaming at him to let go, to let the beast tear him apart. Banki’s hands trembled. He had to violently suppress the horrific memory, forcing himself back into the cold, transactional persona of the Sovereign.",
                "\"I dislike merchandise that surrenders early,\" Banki quipped, his voice perfectly steady. But internally, the Ashen Ledger was the only thing keeping him from detonating into an obscene annihilation."
            ],
            'The Belowmarket': [
                "As Banki stared at the children kept in cages under chemical compliance, his Lawful Evil doctrine was pushed to its absolute breaking point. The observation windows, the restraint lights, the bite-blocks—it was a flawless mirror of the Thessalan Continuum's laboratory.",
                "The psychological trigger was a violent sensory assault. He was hit with the blinding glare of surgical lights and the agonizing, wet sounds of his own anatomy being rearranged while fully conscious.",
                "He felt the cold metal of the vivisection table against his skin, and the horrifying, vibration of Thessalan neural-extraction drills penetrating his skull. He was a specimen again. For a terrifying second, the urge to unleash a localized cataclysm of chaos and eradicate the entire market in a display of Xoriat-fueled madness nearly consumed him.",
                "But he could not break. To break was to let the biomancers win. He forced his shattered mind back into the rigid cage of his doctrine. He would not scream. He would not destroy. He would enact a perfectly calibrated, non-lethal suppression wave. He would be the law."
            ]
        },
        'book3_third_quiet.html': {
            'Rooms Beneath Rooms': [
                "As the twin-gem reliquary drank Glasswright's consciousness, Banki was struck by a visceral, debilitating flashback. He was committing the exact same psychic violation that had been done to him.",
                "The cold laboratory air hit his lungs. He felt the surgical tuning forks vibrating against his skull, heard the clinical voices of the Thessalan researchers as his own mind was forcibly expanded and vivisected.",
                "He remembered the sheer terror of remaining 'inconveniently alive' while his essence was siphoned into jars. The chaotic whispers of Xoriat bubbled up through the blood and magic, tricking him into feeling the restraints cutting into his wrists.",
                "Banki's hands began to shake violently. He closed his eyes, brutally enforcing his Lawful Evil doctrine over his own hyperventilating terror. He compartmentalized the PTSD, forcing the madness back into the void. He bound the gems with absolute, cold precision.",
                "He was the Sovereign now. He was the one holding the scalpel."
            ],
            'The Door Marked RECONCILIATION': [
                "The sight of the pale, wet 'responsive unit' stitched together on the restraint rig was the ultimate trigger. The sharp smell of alchemical wash dragged Banki violently back through a century of trauma.",
                "He was back on the table. He felt the agonizing moment his tiny pixie form was split open, the sickening squelch of the illithid tentacles being forcibly grafted to his jawline.",
                "He felt the overwhelming, skull-crushing weight of the Xoriat hive-mind being injected directly into his brain, the madness tearing his innocent identity to shreds.",
                "Null-Fang writhed hungrily in his grip, resonating with his trauma, begging him to let go and unleash the utter, obscene annihilation of Xoriat upon the laboratory.",
                "Banki's breath hitched. He had to violently suppress the rising madness, falling back on his cold, calculated rules of engagement. He snapped his mind shut like an iron vault, grounding himself in his identity as the Commander of Sablehook. He would not become the monster they built."
            ]
        }
    };

    books.forEach(file => {
        let html = fs.readFileSync(file, 'utf8');
        let filename = file.split('\\').pop();
        
        let match = html.match(/const novelChapters\s*=\s*(\[[\s\S]*?\]);/);
        if (match) {
            let arrStr = match[1];
            try {
                let arr = eval(arrStr);
                
                // Determine if it's flat or nested
                let isNested = arr.length > 0 && Array.isArray(arr[0]);
                
                let fileUpdates = updates[filename];
                for (let titleKey in fileUpdates) {
                    let contentToAppend = fileUpdates[titleKey];
                    let foundChapter = null;
                    
                    if (isNested) {
                        for (let part of arr) {
                            foundChapter = part.find(c => c.title.includes(titleKey) || (c.id && c.id.includes(titleKey.toLowerCase().replace(/ /g, '-'))));
                            if (foundChapter) break;
                        }
                    } else {
                        foundChapter = arr.find(c => c.title.includes(titleKey) || (c.id && c.id.includes(titleKey.toLowerCase().replace(/ /g, '-'))));
                    }
                    
                    if (foundChapter) {
                        foundChapter.content.push(...contentToAppend);
                        console.log(`Updated ${titleKey} in ${filename}`);
                    } else {
                        console.log(`Could not find ${titleKey} in ${filename}`);
                    }
                }
                
                const newArrayStr = JSON.stringify(arr, null, 8).replace(/\]$/, '\t]');
                html = html.replace(/const novelChapters\s*=\s*\[[\s\S]*?\];/, `const novelChapters = ${newArrayStr};`);
                fs.writeFileSync(file, html);
                
            } catch (e) {
                console.log(`Error parsing ${filename}:`, e.message);
            }
        } else {
            console.log(`No match in ${filename}`);
        }
    });
}

injectFlashbacks();
