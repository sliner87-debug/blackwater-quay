const fs = require('fs');

function extractAndReplaceChapters(filePath, updates) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    
    const startIndex = htmlContent.indexOf('const novelChapt');
    if (startIndex === -1) {
        console.error("Could not find novelChapters.");
        return false;
    }
    
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

const book1Updates = [
    {
        titleKey: 'The Brinewood',
        contentToAppend: [
            "As the Sovereign Thread took hold, the psychic exertion tore open a sealed vault in his mind. The forest faded, replaced by the blinding, sterile lumen-glare of the Thessalan holding wing.",
            "He wasn't the Sovereign; he was a tiny, naked pixie strapped to a cold crystal vivisection table. He felt the horrific, wet crunch of Voss's scalpel breaching his skull without anesthetic.",
            "The biomancers were carving his brain matter, forcibly grafting the psionic channels to his nervous system. The cold metal scraped against his frontal lobe, a sensation of absolute, helpless agony.",
            "And through that fresh psychic wound, the chaotic, gibbering madness of Xoriat poured in—a billion screaming, alien voices threatening to shred his identity into wet confetti.",
            "Banki gasped, his vision swimming with blood and void. He had to violently compartmentalize the trauma, slamming the heavy iron doors of his Lawful Evil doctrine shut against the screaming void.",
            "He crushed the memory down with absolute, tyrannical order, forcing the chaos back so he could maintain the Thread. He was the architect now. He would not scream."
        ]
    },
    {
        titleKey: 'The Brain and the Binding',
        contentToAppend: [
            "The fighter's mind thrashed, a desperate, screaming resistance that triggered a violent sensory overlap. Suddenly, the copper stink of blood and the dropping air pressure threw Banki back onto the Thessalan extraction tables.",
            "He wasn't the one pulling; he was the one being pulled apart. He felt the agonizing, deep-tissue plunge of thick psionic needles driving into his own temporal lobes, siphoning his essence while masked biomancers took detached, meticulous notes on clipboards.",
            "The violation was absolute, an obscene rape of his soul. The psychic bridge reversed for a terrifying second, and Xoriat's void surged up his arms, whispering that he was still strapped to the table, that he had never escaped.",
            "Banki snarled, a wet, guttural sound. He violently wrenched his consciousness away from the madness, weaponizing his own trauma. He reasserted his cold, absolute dominance over his shattered mind, forcing the Ashen Ledger's rigid laws over the chaos.",
            "He ripped the talent free, leaving the prisoner a vacant husk, proving to the void that he was the torturer now."
        ]
    }
];

extractAndReplaceChapters('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html', book1Updates);
