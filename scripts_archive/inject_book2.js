const fs = require('fs');

function extractAndReplaceChapters(filePath, updates) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    
    const startIndex = htmlContent.indexOf('const novelChapters');
    if (startIndex === -1) return false;
    
    const arrayStart = htmlContent.indexOf('[', startIndex);
    if (arrayStart === -1) return false;
    
    let bracketCount = 0;
    let arrayEnd = -1;
    
    for (let i = arrayStart; i < htmlContent.length; i++) {
        if (htmlContent[i] === '[') bracketCount++;
        if (htmlContent[i] === ']') bracketCount--;
        
        if (bracketCount === 0) {
            arrayEnd = i + 1;
            break;
        }
    }
    
    if (arrayEnd !== -1) {
        const jsonStr = htmlContent.substring(arrayStart, arrayEnd);
        try {
            let chapters = JSON.parse(jsonStr);
            
            updates.forEach(u => {
                let foundChapter = chapters.find(c => c.title && c.title.includes(u.titleKey));
                if (foundChapter) {
                    foundChapter.content.push(...u.contentToAppend);
                    console.log(`Successfully updated ${u.titleKey} in ${filePath}`);
                } else {
                    console.log(`Could not find ${u.titleKey} in ${filePath}`);
                }
            });
            
            const newArrayStr = JSON.stringify(chapters, null, 8).replace(/\]$/, '\t]');
            const newHtml = htmlContent.substring(0, arrayStart) + newArrayStr + htmlContent.substring(arrayEnd);
            fs.writeFileSync(filePath, newHtml);
            return true;
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
        }
    }
    return false;
}

const book2Updates = [
    {
        titleKey: 'The Red Shelves',
        contentToAppend: [
            "As the beast's glass whiskers shattered his wards and cut his flesh, the sudden, sharp pain ruptured his emotional detachment. The sensation of his own blood running warm triggered a catastrophic somatic flashback to the obscene grafting of his 'PixIllithid' WarForm.",
            "He wasn't just remembering the pain of the Thessalan biomancers; he was remembering the *other* mind. The horrific sentience that had come attached to the illithid head graft. He remembered the brutal, suffocating mental war he had fought inside his own skull against the alien consciousness—a war for his very identity that he had very, very nearly lost.",
            "He remembered the sickening compromise he had to make to win. To assert dominance, he had to permanently sacrifice a vital, innocent piece of his pixie soul to the illithid mind. He had traded away his capacity for genuine, uncalculated empathy just to survive the graft.",
            "The chaotic madness of Xoriat bubbled up through the fresh wound, screaming at him to let go, to let the beast tear him apart. Banki’s hands trembled. He had to violently suppress the horrific memory, forcing himself back into the cold, transactional persona of the Sovereign.",
            "\"I dislike merchandise that surrenders early,\" Banki quipped, his voice perfectly steady. But internally, the Ashen Ledger was the only thing keeping him from detonating into an obscene annihilation."
        ]
    },
    {
        titleKey: 'The Belowmarket',
        contentToAppend: [
            "As Banki stared at the children kept in cages under chemical compliance, his Lawful Evil doctrine was pushed to its absolute breaking point. The observation windows, the restraint lights, the bite-blocks—it was a flawless mirror of the Thessalan Continuum's laboratory.",
            "The psychological trigger was a violent sensory assault. He was hit with the blinding glare of surgical lights and the agonizing, wet sounds of his own anatomy being rearranged while fully conscious.",
            "He felt the cold metal of the vivisection table against his skin, and the horrifying vibration of Thessalan neural-extraction drills penetrating his skull. He was a specimen again. For a terrifying second, the urge to unleash a localized cataclysm of chaos and eradicate the entire market in a display of Xoriat-fueled madness nearly consumed him.",
            "But he could not break. To break was to let the biomancers win. He forced his shattered mind back into the rigid cage of his doctrine. He would not scream. He would not destroy. He would enact a perfectly calibrated, non-lethal suppression wave. He would be the law."
        ]
    }
];

extractAndReplaceChapters('h:\\Antigravity\\Novel\\book2_outer_carry.html', book2Updates);
