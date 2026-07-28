const fs = require('fs');

const file = 'h:\\Antigravity\\Novel\\book3_third_quiet.html';
let html = fs.readFileSync(file, 'utf8');

const match = html.match(/const novelChapters = (\[[\s\S]*?\]);/);
if (match) {
    let arr = eval(match[1]);
    
    // Find chapter 56
    let ch56 = arr.find(c => c.title === 'The Sovereign Mantle');
    if (ch56) {
        ch56.content = [
            "The human disguise had always been a courtesy. A way to walk among the cattle without causing a stampede.",
            "But courtesy is inefficient when claiming a city.",
            "In the deepest vault of Sablehook, Banki prepared for the end. The Cerebrilith fluid, the power of the Primary Engine, the allegiance of the resurrected-all of it culminated in the forge.",
            "He stood before the obsidian mirror. The weary sellsword face stared back.",
            "\"Enough,\" he whispered.",
            "The polymorph broke. The flesh peeled back, but beneath it lay no 'true form'. Over a century of horrific experimental surgeries by the Thessalan Continuum and endless transmutations had made his biology entirely fluid.",
            "He did not revert to the tiny, fragile pixie he had been born as. Instead, he drew upon the gathered horrors, weaving them into his malleable flesh. The transformation was agonizing, a symphonic rendering of bone and psionic circuit.",
            "He grew. The air screamed as physics protested.",
            "When the smoke cleared, the Sovereign stood in the vault. He wore a midnight-blue carapace of abyssal flesh, hardened against all mortal weaponry. Clockwork psionic nodes pulsed along his spine, glowing with a cold, tyrannical light. Writhing, elegant facial tentacles cascaded from a jawline of sharpened crystal.",
            "It was a form built for absolute dominance. The culmination of over one hundred and twenty years of trauma forged into an unyielding weapon.",
            "Null-Fang hummed in his grip, no longer just a weapon, but an extension of his nervous system.",
            "He was no longer Banki the survivor. He was Banki the Architect. The Sovereign of the Third Quiet.",
            "He walked up the stairs. The shadows of the house bowed as he passed."
        ];
        
        const newArrayStr = JSON.stringify(arr, null, 8).replace(/\]$/, '\t]');
        html = html.replace(/const novelChapters = \[[\s\S]*?\];/, `const novelChapters = ${newArrayStr};`);
        fs.writeFileSync(file, html);
        console.log("Successfully updated Chapter 56 in book3_third_quiet.html");
    } else {
        console.log("Chapter 56 not found");
    }
} else {
    console.log("novelChapters array not found");
}
