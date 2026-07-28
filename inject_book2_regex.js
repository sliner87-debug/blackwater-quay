const fs = require('fs');

function injectRegex(filePath, titleKey, contentToAppend) {
    let html = fs.readFileSync(filePath, 'utf-8');
    
    // Find the chapter title
    let titleIdx = html.indexOf(`"title": "${titleKey}"`);
    if (titleIdx === -1) {
        console.log(`Could not find title: ${titleKey}`);
        return;
    }
    
    // Find the 'content' array after this title
    let contentIdx = html.indexOf('"content": [', titleIdx);
    if (contentIdx === -1) return;
    
    // Find the end of this content array
    let contentEndIdx = html.indexOf(']', contentIdx);
    
    // Build the string to insert
    let insertStr = ",\n" + contentToAppend.map(s => `            ${JSON.stringify(s)}`).join(",\n");
    
    html = html.substring(0, contentEndIdx) + insertStr + "\n        " + html.substring(contentEndIdx);
    fs.writeFileSync(filePath, html);
    console.log(`Successfully injected into ${titleKey}`);
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

book2Updates.forEach(u => injectRegex('h:\\Antigravity\\Novel\\book2_outer_carry.html', u.titleKey, u.contentToAppend));

