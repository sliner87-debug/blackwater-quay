const fs = require('fs');

const file = 'h:/Antigravity/Novel/dm_bestiary.html';
let content = fs.readFileSync(file, 'utf8');

// The replacement for the encounter generator UI
const oldUI = `<div style="display: flex; gap: 20px; margin-bottom: 20px; align-items: flex-end;">
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #94a3b8; font-size: 0.9em; text-transform: uppercase;">Location</label>
            <select id="encounter-location" style="padding: 10px; background: #1e293b; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px;">
                <option value="docks">The Docks / Sluices</option>
                <option value="ocean">Open Ocean</option>
                <option value="deep">Deep Sea / Trenches</option>
            </select>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #94a3b8; font-size: 0.9em; text-transform: uppercase;">Difficulty</label>
            <select id="encounter-difficulty" style="padding: 10px; background: #1e293b; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px;">
                <option value="easy">Easy (2-3 Monsters)</option>
                <option value="medium">Medium (3-5 Monsters)</option>
                <option value="hard">Hard (5-8 Monsters)</option>
            </select>
        </div>
        <button id="btn-generate-encounter" style="background: #ef4444; color: #fff; border: none; padding: 12px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase;">Roll Initiative</button><button id="btn-copy-encounter" style="background: #334155; color: #fff; border: none; padding: 12px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase;">Copy Markdown</button>
    </div>`;

const newUI = `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; align-items: flex-end; background: #1e293b; padding: 15px; border-radius: 8px; border: 1px solid #475569;">
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; font-weight: bold;">Location</label>
            <select id="encounter-location" style="padding: 8px; background: #0f172a; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px;">
                <option value="any">Any Location</option>
                <option value="docks">The Docks / Sluices</option>
                <option value="ocean">Open Ocean</option>
                <option value="deep">Deep Sea / Trenches</option>
            </select>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; font-weight: bold;">Theme</label>
            <select id="encounter-theme" style="padding: 8px; background: #0f172a; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px;">
                <option value="any">Any Theme</option>
                <option value="sablehook">Sablehook / Syndicate</option>
                <option value="consortium">Thessalan Consortium</option>
                <option value="elder_node">Elder Node / Aberrant</option>
                <option value="chamber">The Chamber (Dragons)</option>
                <option value="void">Void of Madness</option>
                <option value="lords_of_dust">Lords of Dust</option>
                <option value="independent">Independent / Wild</option>
            </select>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; font-weight: bold;">Monster Type</label>
            <select id="encounter-type" style="padding: 8px; background: #0f172a; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px;">
                <option value="any">Any Type</option>
                <option value="aberration">Aberration</option>
                <option value="humanoid">Humanoid</option>
                <option value="magical beast">Magical Beast</option>
                <option value="dragon">Dragon</option>
                <option value="undead">Undead</option>
                <option value="outsider">Outsider</option>
                <option value="construct">Construct</option>
                <option value="swarm">Swarm</option>
                <option value="giant">Giant</option>
            </select>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; font-weight: bold;">Target CR Total</label>
            <input type="number" id="encounter-cr" value="10" min="1" max="50" style="padding: 8px; background: #0f172a; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px; width: 80px;">
        </div>
        <button id="btn-generate-encounter" style="background: #ef4444; color: #fff; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">Roll Initiative</button>
        <button id="btn-copy-encounter" style="background: #334155; color: #fff; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; text-transform: uppercase;">Copy Markdown</button>
    </div>`;

content = content.replace(oldUI, newUI);

const templatesHTML = `
<hr style="border-top: 2px solid #8b0000; margin: 40px 0;">
<h2 id="campaign-thematic-templates" style="color: #d4af37;">Campaign Thematic Templates</h2>
<p style="color: #ccc;">In the underworld of Blackwater Quay, desperate mercenaries, syndicate enforcers, and radical cultists often subject themselves to horrific biomantic surgeries or alchemical augmentations to gain an edge. These templates can be applied to any base creature to reflect the invasive grafts and mutations common in Suture's clinic and beyond.</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
    <div style="background: #1a1a24; padding: 15px; border-left: 4px solid #ef4444; border-radius: 4px;">
        <h3 style="color: #ef4444; margin-top: 0;">1. Fleshwarped (Suture's Masterpiece)</h3>
        <p><em>Subjected to numerous invasive biomantic surgeries, this creature's body is a patchwork of monstrous donor tissue and alchemical suturing, sacrificing its humanity for raw, unnatural resilience.</em></p>
        <ul style="font-size: 0.9em; color: #cbd5e1;">
            <li><strong>Type:</strong> Changes to Aberration (Augmented).</li>
            <li><strong>CR Adjustment:</strong> +1</li>
            <li><strong>Armor Class:</strong> +2 natural armor.</li>
            <li><strong>Attacks:</strong> Gains two primary claw attacks (1d6) or one secondary tentacle attack (1d4).</li>
            <li><strong>Special Qualities:</strong> DR 2/Byeshk (DR 5 if HD >= 10), +4 saves vs polymorph/fleshwarping. Can bear extra grafts equal to Con modifier.</li>
            <li><strong>Ability Scores:</strong> Str +2, Con +4, Cha -4.</li>
        </ul>
    </div>
    <div style="background: #1a1a24; padding: 15px; border-left: 4px solid #8b5cf6; border-radius: 4px;">
        <h3 style="color: #8b5cf6; margin-top: 0;">2. Tri-Weave Soul-Bound</h3>
        <p><em>Arcane, Divine, and Psionic metaphysical threads are physically braided with mithril wire and fused directly into the creature's spinal column, turning them into a living conduit.</em></p>
        <ul style="font-size: 0.9em; color: #cbd5e1;">
            <li><strong>Type:</strong> Gains the (Mystic) subtype.</li>
            <li><strong>CR Adjustment:</strong> +2</li>
            <li><strong>Armor Class:</strong> +2 deflection bonus to AC.</li>
            <li><strong>Special Qualities:</strong> Caster/Manifester Level +1 for variables and SR checks. Gains SR equal to 11 + HD.</li>
            <li><strong>Special Attacks:</strong> <em>Metaphysical Surge (Su):</em> 1/day free action to maximize a single spell/power.</li>
            <li><strong>Ability Scores:</strong> Int +2, Wis +2, Cha +2, Con -2.</li>
        </ul>
    </div>
    <div style="background: #1a1a24; padding: 15px; border-left: 4px solid #10b981; border-radius: 4px;">
        <h3 style="color: #10b981; margin-top: 0;">3. Scrag-Spliced</h3>
        <p><em>Grafted with deep-trench scrag jaws, lymphatic glands, and nerve sheathing, hybridized with aquatic troll biology.</em></p>
        <ul style="font-size: 0.9em; color: #cbd5e1;">
            <li><strong>Type:</strong> Gains the (Aquatic) subtype.</li>
            <li><strong>CR Adjustment:</strong> +1 (or +2 if HD > 10).</li>
            <li><strong>Armor Class:</strong> +3 natural armor.</li>
            <li><strong>Attacks:</strong> Gains primary bite attack (1d6).</li>
            <li><strong>Special Qualities:</strong> Amphibious, Regeneration 2 (Acid/Fire bypasses). Lost limbs regrow in 1d4 days.</li>
            <li><strong>Ability Scores:</strong> Str +4, Con +2, Int -2.</li>
        </ul>
    </div>
    <div style="background: #1a1a24; padding: 15px; border-left: 4px solid #94a3b8; border-radius: 4px;">
        <h3 style="color: #94a3b8; margin-top: 0;">4. Void-Touched (Pixillithid Symbiote)</h3>
        <p><em>Fitted with synthetic psychic tissue or aberrant pixillithid antennae, hard-wiring the brain into an alien network.</em></p>
        <ul style="font-size: 0.9em; color: #cbd5e1;">
            <li><strong>Type:</strong> Changes to Aberration.</li>
            <li><strong>CR Adjustment:</strong> +1</li>
            <li><strong>Armor Class:</strong> +1 insight bonus to AC.</li>
            <li><strong>Special Qualities:</strong> Telepathy 100 ft., SR (15 + HD) against Mind-Affecting spells/illusions.</li>
            <li><strong>Special Attacks:</strong> <em>Psychic Static:</em> 1/day 15-ft cone, Will save or stunned 1d4 rounds.</li>
            <li><strong>Ability Scores:</strong> Int +4, Wis -2, Cha +2.</li>
        </ul>
    </div>
    <div style="background: #1a1a24; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <h3 style="color: #f59e0b; margin-top: 0;">5. Alchemically Shifted</h3>
        <p><em>Stomach replaced with an alchemical crucible and limbs injected with gravity-slurry. Functions like a living laboratory.</em></p>
        <ul style="font-size: 0.9em; color: #cbd5e1;">
            <li><strong>Type:</strong> Gains the (Alchemical) descriptor.</li>
            <li><strong>CR Adjustment:</strong> +1</li>
            <li><strong>Armor Class:</strong> -1 AC penalty, but gains 25% Fortification against crits/sneak attacks.</li>
            <li><strong>Special Qualities:</strong> Immune to ingested poison/drugs. Consuming raw alchemicals grants temp HP. +4 CMD vs trip/bull rush/reposition.</li>
            <li><strong>Attacks:</strong> Natural attacks deal extra 1d4 acid damage.</li>
            <li><strong>Ability Scores:</strong> Str +2, Dex -2, Con +4.</li>
        </ul>
    </div>
    <div style="background: #1a1a24; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
        <h3 style="color: #3b82f6; margin-top: 0;">6. Displacer-Grafted</h3>
        <p><em>Fused with fey-feline hide and dire displacer beast tentacles, causing them to stutter out of phase with reality.</em></p>
        <ul style="font-size: 0.9em; color: #cbd5e1;">
            <li><strong>Type:</strong> Changes to Magical Beast (Augmented).</li>
            <li><strong>CR Adjustment:</strong> +2</li>
            <li><strong>Armor Class:</strong> +2 dodge bonus to AC.</li>
            <li><strong>Attacks:</strong> Two secondary tentacle attacks (1d4, 10 ft reach, bypass DR as magic).</li>
            <li><strong>Special Qualities:</strong> Continuous non-magical Blur (20% miss chance). Gains Evasion.</li>
            <li><strong>Ability Scores:</strong> Dex +4, Con +2.</li>
        </ul>
    </div>
</div>
`;

const insertIndex = content.indexOf('<div id="dm-soundboard">');
if (insertIndex !== -1) {
    content = content.substring(0, insertIndex) + templatesHTML + "\n" + content.substring(insertIndex);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Updated dm_bestiary.html with new generator UI and templates.');
