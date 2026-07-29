const fs = require('fs');
const path = require('path');

const srcDir = 'H:\\Antigravity\\Novel';
const outPath = 'C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\Claude_Rewrite_Prompts.md';

const targets = [
    {
        title: '1. Chapter 1 - The Lantern That Did Not Cast Light (Opus)',
        instruction: 'You are an elite grimdark fantasy editor and ghostwriter. Rewrite the text below to eliminate authorial summary and info-dumping. Start in media res on the sensory experience of the road. Reveal Banki\'s fey nature and craving for structure through his immediate reactions to his environment and physical sensations, rather than block exposition. Strip all filter words (saw, felt, realized) and summarize telling. Maintain strict Deep POV.',
        ch: 1,
        search: 'The face Banki wore served as a door' // Note: This one was already replaced, so the script might not find it if it searches the new file. We will just hardcode the old text for this one if not found.
    },
    {
        title: '2. Chapter 1 - The Captain\'s Shadow (Sonnet)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite the text below to dissolve the block flashback. Intertwine the memory of the cold iron and mind-wipe into the present-action visceral sensation of Banki breaking the guard\'s mind. Keep the memory under three sentences, using visceral fragments rather than a full chronological narrative. Maintain strict Deep POV and zero filter words.',
        ch: 1,
        search: 'The sterile, blinding light of a Thessalan Consortium'
    },
    {
        title: '3. Chapter 2 - The Saboteur\'s Thoughts (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite the following interaction to fix a repetitive structural failure. Combine the two saboteur encounters into a single, high-tension scene. Make the saboteur\'s internal thoughts realistic and fragmented (stress, sensory details of the task) rather than a clean, explanatory monologue. Reveal the Tidegate gang connection through a physical clue or an atmospheric psychic impression rather than a Scooby-Doo confession.',
        ch: 2,
        search: 'third pin from the left, swap with the scored one'
    },
    {
        title: '4. Chapter 3 - Wheels of Commerce (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. The following text is a disconnected montage of Banki acquiring assets. Eliminate the montage. Choose ONE of these acquisitions (the Hollow Stag pact) and expand it into a full scene with actual stakes, friction, and sensory depth. Integrate the cost/logistics into the dialogue naturally rather than jumping between disconnected locations. Maintain strict Deep POV.',
        ch: 3,
        search: 'The transition from the subterranean, arcane pressure of the Yard'
    },
    {
        title: '5. Chapter 4 - The Rank Trials (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this scene to remove the redundant Consortium flashback entirely. Redesign the mind-eating process to be visceral but not cartoonish—focus on the terrifying sensory experience of the victim\'s identity unraveling and Banki absorbing their memories like a drowning man taking oxygen, without physical jaw-unhinging or glowing sludge.',
        ch: 4,
        search: 'The cold, wet stone of the cell vanished'
    },
    {
        title: '6. Chapter 5 - Crown Citizenship (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this scene to remove the tone inconsistency. Remove the "magic biscuits." Have Banki enact his protective "locator" magic through a much more grimdark, thematic vector (e.g., a blood-stamp on a coin, a shadow woven into their cloaks, or a brand on a physical ledger). Keep Sable\'s furious reaction to his overreach, but ensure the mechanism of his magic matches the tone of a dark fantasy underworld.',
        ch: 5,
        search: 'He wove the magic directly into the rising dough'
    },
    {
        title: '7. Chapter 6 - The Caravan Launches (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite the text below to shift the transition into Deep POV. Show the jarring shift in his psychic net through visceral, physical sensations (e.g., the sudden silence feeling like a physical pressure, the absence of human sparks making him feel briefly deaf or blinded). Do not over-explain the psychic net using broad abstractions.',
        ch: 6,
        search: 'The open country hit him instantly.'
    },
    {
        title: '8. Chapter 7 - The Hierarchy of Stone (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this passage to eliminate contradictory, abstract telling. Show the physical micro-expressions of adrenaline in an avian predator (e.g., feathers slicking back, pupils dilating, a predatory twitch) instead of just stating it spikes her nervous system.',
        ch: 7,
        search: 'Her head tilted just a few degrees. The absolute stillness'
    },
    {
        title: '9. Chapter 8 - The Ironhorn Passage (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite the physical agony of the polymorph shift back to human form using visceral, biological terms (tearing tendons, suffocating organ expansion, raw nerve pain) rather than sterile words like "architecture" and "transition". Ground us in the sensory reality of the pain.',
        ch: 8,
        search: 'The flight back to the wagon bench was sluggish'
    },
    {
        title: '10. Chapter 9 - The Widow\'s Favor (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite the text below to remove modern sci-fi / cyberpunk terms that shatter the grimdark immersion. Replace "computational speed" and "cognitive virus" with magical equivalents, focusing on the artifact\'s malice, a curse acting as a psychic parasite, and the speed of Banki\'s ruthless intellect.',
        ch: 9,
        search: 'Banki processed the data with cold, computational speed.'
    },
    {
        title: '11. Chapter 10 - The Rinse Below (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this passage to replace modern sci-fi/cyberpunk terminology ("downloaded", "neural network", "frontal lobes") with visceral, magical descriptions of telepathic violence and psychic consumption fitting a dark fantasy setting. Maintain the brutality of the memory extraction.',
        ch: 10,
        search: 'The telepathic invasion was absolute. Banki bypassed'
    },
    {
        title: '12. Chapter 11 - The Choir Burns (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Replace the sterile administrative and modern architectural terms in this text with dark fantasy equivalents that describe the hidden smuggling route without sounding like a modern corporate facility.',
        ch: 11,
        search: 'The descent to the song-stone chamber led through a trapdoor'
    },
    {
        title: '13. Chapter 12 - Hall Returns and Processing (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Remove the LitRPG/modern terminology. Ground the logistics in visceral, in-world mechanisms (e.g., blood-ledgers, soul-weights, or physical toll on the scribes). Keep the POV anchored tightly to Banki’s or the scribes\' physical exhaustion, rather than reading like a system prompt.',
        ch: 12,
        search: 'The chamber stratifies into distinct layers'
    },
    {
        title: '14. Chapter 13 - Breeding the Displacer Rhinos (Sonnet)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this dry dialogue summary to show the actual dialogue and body language. Let the reader hear Maren\'s probing questions and Banki\'s deflected answers. Focus on the subtext, the micro-expressions, and the danger of the tavern setting rather than summarizing his conversational strategy as a "Doctrine."',
        ch: 13,
        search: 'He applied the Improvement Doctrine'
    },
    {
        title: '15. Chapter 14 - The Belowmarket Slaughter (Sonnet)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this scene to slow down the pacing of the slaughter. Force the protagonist to physically exert himself. Add sensory details of the Under-market (smells, sounds, the desperation of the slavers). Show the telekinetic magic taking a physical or mental toll on the caster rather than being "instantaneous" and flawless.',
        ch: 14,
        search: 'The slaughter was systematic, brutal, and utterly devoid of mercy.'
    },
    {
        title: '16. Chapter 15 - The Covenant Raid (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this passage to remove the bracketed chat-log syntax. Weave the telepathic communication seamlessly into the prose, emphasizing the invasive, mind-to-mind sensation (headaches, whispers, shared adrenaline). Ground the tactical updates in the sensory reality of the characters rather than viewing the city as a "grid" or "projection."',
        ch: 15,
        search: 'Sable: Received. That’s blood.'
    },
    {
        title: '17. Chapter 16 - Summoning the Avatar of Asmodeus (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this scene to reintroduce visceral fear and struggle. Even if the ward holds, the sheer presence of the avatar should exact a terrible toll on Banki\'s sanity and physical body. Make the negotiation feel like a razor\'s edge where one wrong word means eternal damnation, rather than a sterile contract review.',
        ch: 16,
        search: 'The psychological warfare began before the first word'
    },
    {
        title: '18. Chapter 17 - The Bridge Ambush (Sonnet)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite the clash to show the terrifying chaos of the ambush. Give the paladins at least one moment of competent resistance to establish them as a real threat before they are overwhelmed. Remove modern terms like "kinetic transfer" and focus on the grit, blood, and crunch of armor in the rain.',
        ch: 17,
        search: 'The collision was not a battle.'
    },
    {
        title: '19. Chapter 18 - Descent down the Salt-Stair (Sonnet)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite this text to remove filter words and cliches. Show the exhaustion through visceral, active physical feedback (e.g., muscles locking, bone grinding, lungs failing to draw oxygen). Maintain a staccato, breathless rhythm.',
        ch: 18,
        search: 'The legs feel heavy, leaden.'
    },
    {
        title: '20. Chapter 19 - Realizing the Elder Node\'s stealth attack (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Rewrite to embody the shift in mental state through physical sensation and immediate action. Show the "freezing clarity" via the Tri-Weave snapping into a new, ruthless configuration rather than just naming the emotion. Strip out abstract nouns like "tactical desperation."',
        ch: 19,
        search: 'Cold, tactical desperation replaced the initial shock.'
    },
    {
        title: '21. Chapter 20 - Discovering the Primary Engine (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Delete the abstract moralizing and the info-dump summary of the Choir\'s religion. Show the horror of the thirteen victims wired into the machine and let the "offense" manifest as a violent physical/magical reaction from the POV character. Show, don\'t tell.',
        ch: 20,
        search: 'The sheer scale of the deception was absolute'
    },
    {
        title: '22. Chapter 21 - Binding the victims to the Crown Oath (Opus)',
        instruction: 'You are an elite grimdark fantasy editor. Remove the philosophical summary. Express the moral compromise entirely through the visceral, sickening sensation of forcing the Crown Oath into their empty minds. Let the sheer violence of the act carry the thematic weight. Do not lecture the reader about autonomy.',
        ch: 21,
        search: 'The moral weight of the act threatened to crush'
    },
    {
        title: '23. Chapter 22 - Confronting the High Lord (Sonnet)',
        instruction: 'You are an elite grimdark fantasy editor. Remove the dialogue tag "screamed" and the exposition about his "false bravado". Replace them with a visceral action beat that shows his terror (e.g., his hands trembling so hard the parchment tears, or his stolen holy light flickering as his voice cracks).',
        ch: 22,
        search: 'You have breached a holy sanctum'
    }
];

let outMarkdown = '# Claude 4.6 Rewrite Prompts (Full Context Edition)\n*Just copy the entire block quote below each heading and paste it directly into Claude.*\n\n---\n\n';

for (const t of targets) {
    const filename = `Chapter${String(t.ch).padStart(2, '0')}-New.md`;
    const filePath = path.join(srcDir, filename);
    let contextBlock = '';
    
    if (t.ch === 1 && t.search === 'The face Banki wore served as a door') {
        contextBlock = `[In this example there is no text before]\n[The face Banki wore served as a door, existing solely to hide what waited behind it. It presented a pleasant arrangement of features—sharp enough to demand caution from clerks and liars, unremarkable enough to be forgotten by dusk.]\n[Beneath the skin and the assumed humanity lay unyielding will, and beneath the will lay hunger...]`;
    } else if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const paragraphs = content.split(/\\n\\s*\\n/);
        
        let foundIdx = -1;
        for (let i = 0; i < paragraphs.length; i++) {
            if (paragraphs[i].includes(t.search)) {
                foundIdx = i;
                break;
            }
        }
        
        if (foundIdx !== -1) {
            const prev = foundIdx > 0 ? paragraphs[foundIdx - 1].trim() : '[No text before]';
            const curr = paragraphs[foundIdx].trim();
            const next = foundIdx < paragraphs.length - 1 ? paragraphs[foundIdx + 1].trim() : '[No text after]';
            contextBlock = `${prev}\n\n${curr}\n\n${next}`;
        } else {
            contextBlock = `[Could not auto-locate snippet in ${filename}. Search string: "${t.search}"]`;
        }
    } else {
        contextBlock = `[File ${filename} not found.]`;
    }
    
    outMarkdown += `## ${t.title}\n`;
    outMarkdown += `**COPY THE TEXT BELOW THIS LINE:**\n`;
    outMarkdown += `\`\`\`text\n`;
    outMarkdown += `${t.instruction}\n\n`;
    outMarkdown += `--- START TEXT ---\n`;
    outMarkdown += `${contextBlock}\n`;
    outMarkdown += `--- END TEXT ---\n`;
    outMarkdown += `\`\`\`\n\n---\n\n`;
}

fs.writeFileSync(outPath, outMarkdown, 'utf8');
console.log('Successfully generated full-context prompts!');
