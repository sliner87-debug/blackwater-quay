const fs = require('fs');
let content = fs.readFileSync('h:/Antigravity/Novel/dm_screen.html', 'utf8');

const replacements = [
    { text: 'A close-up studio shot of a massive, ancient silver greatsword', img: '../images/vtt_relic_tri_weave_1785352874782.jpg' },
    { text: 'A jagged, eight-inch obsidian fang hanging from a heavy', img: '../images/vtt_relic_null_fang_1785352970448.jpg' },
    { text: 'A beautiful, complex pocket watch resting in a gloved hand', img: '../images/vtt_relic_chronometer_1785352978634.jpg' },
    { text: 'A heavy, intimidating medical syringe used for extracting', img: '../images/vtt_relic_syringe_1785352988272.jpg' },
    { text: 'A massive, terrifying two-handed scythe standing upright', img: '../images/vtt_relic_scythe_1785352997804.jpg' },
    { text: 'A bloated, horrific mind-flayer variant covered in slime', img: '../images/vtt_npc_chirg_1785353006615.jpg' },
    { text: 'A sleek, terrifying feline predator with dark blue fur', img: '../images/vtt_npc_thessalan_beast_1785353014350.jpg' },
    { text: 'A massive, ancient bronze dragon hovering', img: '../images/vtt_npc_oraxis_dragon_1785353023135.jpg' },
    { text: 'A tall, imposing human monk wearing simple', img: '../images/vtt_npc_oraxis_monk_1785353041217.jpg' },
    { text: 'A brutal, heavily muscled Orc pirate first mate', img: '../images/vtt_npc_dreadjaw_1785353050217.jpg' },
    { text: 'A sleek, wolf-like humanoid with webbed digits', img: '../images/vtt_npc_sea_wolf_1785353060102.jpg' },
    { text: 'A pale, beautiful fey-drow female wizard with white hair', img: '../images/vtt_npc_serris_1785353069750.jpg' },
    { text: 'A massive, armor-plated aquatic troll', img: '../images/vtt_npc_slake_1785353078979.jpg' },
    { text: 'A massive, terrifying undead skeletal stag', img: '../images/vtt_npc_reedsinger_1785353088618.jpg' },
    { text: 'A massive, terrifying rhinoceros mutated', img: '../images/vtt_npc_dire_rhino_1785353097181.jpg' },
    { text: 'A massive, hulking demonic brute whose skull is split open', img: '../images/vtt_npc_cerebrilith_1785353106499.jpg' },
    { text: 'A horrifying, shambling golem made entirely of rusty blades', img: '../images/vtt_npc_scour_harrow_1785353124893.jpg' },
    { text: 'Two mechanical constructs in a dark fantasy workshop', img: '../images/vtt_npc_constructs_1785353133435.jpg' },
    { text: 'A floating, spherical astrolabe constructed of overlapping', img: '../images/vtt_npc_aurelion_1785353141275.jpg' },
    { text: 'A massive, translucent, ghostly manta ray swimming through the air', img: '../images/vtt_npc_manta_1785353148956.jpg' },
    { text: 'A vast, subterranean flooded shantytown built inside a massive', img: '../images/vtt_env_sluices_1785353156692.jpg' },
    { text: 'A horrifying, subterranean biomantic laboratory', img: '../images/vtt_env_foundry_1785353164681.jpg' },
    { text: 'A terrifying, massive grimdark galleon sailing', img: '../images/vtt_env_needle_1785353172957.jpg' },
    { text: 'An ancient, cyclopean cavern deep underground', img: '../images/vtt_env_annex_1785353181913.jpg' }
];

let injectedCount = 0;
for (const item of replacements) {
    const pStart = '<p><strong>Prompt:</strong> ' + item.text;
    if (content.includes(pStart)) {
        // Find the end of the <p> tag
        const regex = new RegExp('(<p><strong>Prompt:</strong> ' + item.text + '.*?</p>)', 's');
        content = content.replace(regex, `$1\n<img src="${item.img.replace('../', '')}" alt="VTT Token" style="width: 100%; max-width: 400px; margin-top: 15px; border: 2px solid #444; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.5);">`);
        injectedCount++;
    } else {
        console.log("NOT FOUND: " + item.text);
    }
}
fs.writeFileSync('h:/Antigravity/Novel/dm_screen.html', content);
console.log("Injected " + injectedCount + " images.");
