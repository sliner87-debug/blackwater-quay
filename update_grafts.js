const fs = require('fs');

const file = 'h:/Antigravity/Novel/dm_player_options.html';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('<h3 id="2-biomantic-fleshwarped-grafts">2. BIOMANTIC FLESHWARPED GRAFTS</h3>');
const endIndex = content.indexOf('<hr />\n<h3 id="3-specialized-smuggling-gear">3. SPECIALIZED SMUGGLING GEAR</h3>', startIndex);

let actualEndIndex = endIndex;
if (actualEndIndex === -1) {
    actualEndIndex = content.indexOf('<h3 id="3-specialized-smuggling-gear">3. SPECIALIZED SMUGGLING GEAR</h3>', startIndex);
    const hrIndex = content.lastIndexOf('<hr />', actualEndIndex);
    if (hrIndex !== -1 && hrIndex > startIndex) {
        actualEndIndex = hrIndex;
    }
}

if (startIndex === -1 || actualEndIndex === -1) {
    console.error("Could not find start or end index.", startIndex, actualEndIndex);
    process.exit(1);
}

const before = content.substring(0, startIndex);
const after = content.substring(actualEndIndex);

const graftsHTML = `
<h3 id="2-biomantic-fleshwarped-grafts">2. BIOMANTIC FLESHWARPED GRAFTS</h3>
<p>Suture operates a hidden clinic in Sablehook, splicing grafts onto syndicate agents. Applying a graft is a brutal, invasive process that involves sawing through bone and magically fusing foreign nervous systems to the host.</p>
<h4 id="surgical-rules-complications">Surgical Rules &amp; Complications</h4>
<ul>
<li><strong>Graft Limit:</strong> A character can safely bear a maximum number of grafts equal to their Constitution modifier (minimum 1). </li>
<li><strong>The Surgery:</strong> Applying a graft requires a Heal check (DC equals 15 + graft level), 1,000 gp in alchemical supplies, and 24 hours of uninterrupted recovery time in a sterile (or heavily disinfected) environment.</li>
<li><strong>Surgical Rejection:</strong> If the Heal check fails, the graft fails to take hold. The patient takes 2d6 Constitution damage and the graft is destroyed. If the Heal check fails by 5 or more, the patient suffers a <em>Surgical Rejection</em>—they take 4d6 Constitution damage and suffer a permanent -2 penalty to Dexterity due to nerve damage (can only be cured by <em>Restoration</em> or <em>Heal</em>).</li>
<li><strong>Removal:</strong> Grafts are semi-permanent; removing one requires a reverse surgical operation (Heal DC 25) that deals 2d6 Constitution damage and requires 1 week of bed rest.</li>
</ul>
<pre><code>+---------------------------------------------------------------------------------+
|                              GRAFT SLOTS &amp; OPTIONS                              |
+---------------------------------------------------------------------------------+
|  [HEAD]   --&gt; Illithid Tentacles / Vocal Mesh / Phrenic-Node / Bone-Horn        |
|               Pixillithid Antennae / Obsidian Mandible / Scrag Jaws             |
|  [EYES]   --&gt; Shatterglass Corneas / Aqueous Gaze / Void-Touched Sclera         |
|               Temporal-Dilation / Dolgaunt Cilia / Leviathan-Gaze               |
|  [ARMS]   --&gt; Eldritch Claws / Spliced Manipulators / Grafted Bone-Blades       |
|               Dolgaunt Tentacles / Myomeric Winches / Chain-Limb / Pincers      |
|  [LEGS]   --&gt; Webbed Digits / Spring-Steel Sinews / Satyr Hooves                |
|               Gravity-Slurry Pads / Blink-Hound Joints / Leviathan Struts       |
|  [TORSO]  --&gt; Troll-Blood / Displacer Fur / Dire Displacer Tentacles            |
|               Adamantine Ribcage / Scrag-Nerve Sheathing / Reedsinger Flute     |
|  [SPINE]  --&gt; Choker Spine / Planar Anchor / Spinal Surge / Soul-Spine          |
|               Bone-Shard Spikes / Aether Marrow                                 |
|  [SKIN]   --&gt; Lead-Silver Runes / Phase-Stutter Skin / Acidic Pores             |
|               Fungal Bark / Tri-Weave Tattoos / Ironwood Scales                 |
|  [ORGANS] --&gt; Siphon Stomach / Anti-Compliance Gland / Void-Lungs               |
|               Catalyst Liver / Precognitive Adrenal / Mutagen-Bile Sack         |
+---------------------------------------------------------------------------------+</code></pre>

<h4 id="a-head-slot-grafts">A. HEAD SLOT GRAFTS</h4>
<h5 id="illithid-feeding-tentacles">Illithid Feeding Tentacles</h5>
<ul>
<li><strong>Cost:</strong> 5,000 gp.</li>
<li><strong>Description:</strong> Two thick, purple tentacles are grafted beneath the jawline.</li>
<li><strong>Effect:</strong> You gain a secondary natural attack with your tentacles (1d4 bludgeoning). If you hit a Medium or smaller creature, you can attempt to start a grapple as a free action without provoking attacks of opportunity.</li>
</ul>
<h5 id="high-cantors-vocal-mesh">High Cantor's Vocal Mesh</h5>
<ul>
<li><strong>Cost:</strong> 6,500 gp.</li>
<li><strong>Description:</strong> Your larynx is replaced with a fey-metal mesh infused with necrotic cantor marrow.</li>
<li><strong>Effect:</strong> Once per day (standard action), release a concussive scream in a 15-ft. cone. All creatures take 4d6 sonic damage and are <em>deafened</em> for 1d4 rounds (Fort DC 16 half/negates).</li>
</ul>
<h5 id="phrenic-node-command-lattice">Phrenic-Node Command Lattice</h5>
<ul>
<li><strong>Cost:</strong> 8,000 gp.</li>
<li><strong>Description:</strong> A brain graft consisting of synthetic psychic tissue that hard-wires the host into the Sovereign Network.</li>
<li><strong>Effect:</strong> You gain telepathy out to 100 ft. with anyone else bearing this graft, and SR 25 specifically against Mind-Affecting spells and illusions.</li>
</ul>
<h5 id="obsidian-fey-iron-mandible">Obsidian Fey-Iron Mandible</h5>
<ul>
<li><strong>Cost:</strong> 7,000 gp.</li>
<li><strong>Description:</strong> Your lower jaw is removed and replaced with a massive fey-metal and cold-iron mandible quenched in dark soul-ichor.</li>
<li><strong>Effect:</strong> You gain a bite attack (1d8 piercing/slashing). This attack bypasses Damage Reduction as if it were a Cold Iron, Magic, and Evil weapon.</li>
</ul>
<h5 id="pixillithid-antennae">Pixillithid Antennae</h5>
<ul>
<li><strong>Cost:</strong> 3,000 gp.</li>
<li><strong>Description:</strong> Gossamer, moth-like antennae spliced from an aberrant pixillithid are grafted to your forehead.</li>
<li><strong>Effect:</strong> You gain <em>Detect Thoughts</em> as a spell-like ability 1/day, and can communicate basic emotions telepathically to any fey or aberration within 30 ft.</li>
</ul>
<h5 id="deep-trench-scrag-jaws">Deep-Trench Scrag Jaws</h5>
<ul>
<li><strong>Cost:</strong> 4,500 gp.</li>
<li><strong>Description:</strong> Your mouth is widened, lined with multiple rows of translucent needle-teeth, and fitted with hidden gills.</li>
<li><strong>Effect:</strong> You gain a bite attack (1d6) and can breathe underwater indefinitely.</li>
</ul>
<h5 id="bone-horn-plating">Widow-Tusk Bone-Horn Plating</h5>
<ul>
<li><strong>Cost:</strong> 9,000 gp.</li>
<li><strong>Description:</strong> Siege-beast horn plating laced with extracted rust-monster adamantine is grafted to your skull.</li>
<li><strong>Effect:</strong> You gain a gore attack (1d8) that deals x3 damage on a critical hit and ignores object hardness less than 20.</li>
</ul>

<hr />
<h4 id="b-eyes-slot-grafts">B. EYES SLOT GRAFTS</h4>
<h5 id="shatterglass-corneas">Shatterglass Corneas</h5>
<ul>
<li><strong>Cost:</strong> 3,500 gp.</li>
<li><strong>Description:</strong> Your eyes are replaced with crystalline lenses that refract light in shifting, prismatic colors.</li>
<li><strong>Effect:</strong> You gain low-light vision and are completely immune to gaze attacks and blinding effects.</li>
</ul>
<h5 id="aqueous-gaze">Aqueous Gaze</h5>
<ul>
<li><strong>Cost:</strong> 4,000 gp.</li>
<li><strong>Description:</strong> Spliced eyes harvested from aquatic sea-wolves, reflecting light with a silver mirror-sheen.</li>
<li><strong>Effect:</strong> You gain darkvision 60 ft. You can see clearly through water, mist, or silt up to 60 ft., ignoring concealment penalties.</li>
</ul>
<h5 id="void-touched-sclera">Void-Touched Sclera</h5>
<ul>
<li><strong>Cost:</strong> 6,000 gp.</li>
<li><strong>Description:</strong> Your eyes become pitch black, weeping a faint tar-like substance when exposed to bright light.</li>
<li><strong>Effect:</strong> You gain Void-Sight, allowing you to see perfectly in both magical and non-magical darkness up to 60 ft. You gain Negative Energy Affinity (healed by negative energy, harmed by positive).</li>
</ul>
<h5 id="temporal-dilation-pupils">Temporal-Dilation Pupils</h5>
<ul>
<li><strong>Cost:</strong> 8,500 gp.</li>
<li><strong>Description:</strong> Your irises tick and click like microscopic clockwork gears.</li>
<li><strong>Effect:</strong> You gain a +2 bonus to Initiative. Once per day, as an immediate action, you may re-roll a failed Reflex saving throw.</li>
</ul>
<h5 id="dolgaunt-cilia">Dolgaunt Blind-Sight Nodes</h5>
<ul>
<li><strong>Cost:</strong> 10,000 gp.</li>
<li><strong>Description:</strong> Your eyes are surgically removed and sealed. In their place, writhing, sensory cilia grow across your upper face.</li>
<li><strong>Effect:</strong> You are permanently blind, but you gain Blindsight out to 30 feet and are completely immune to visual illusions and gaze attacks.</li>
</ul>
<h5 id="leviathan-gaze-implants">Leviathan-Gaze Implants</h5>
<ul>
<li><strong>Cost:</strong> 5,500 gp.</li>
<li><strong>Description:</strong> Your eyes glow with the bioluminescent lure-light of a deep-trench apex predator.</li>
<li><strong>Effect:</strong> You can cast <em>Hypnotic Pattern</em> once per day as a spell-like ability (DC 14 + Cha modifier).</li>
</ul>

<hr />
<h4 id="c-arms-slot-grafts">C. ARMS SLOT GRAFTS</h4>
<h5 id="eldritch-claws">Eldritch Claws</h5>
<ul>
<li><strong>Cost:</strong> 2,000 gp.</li>
<li><strong>Description:</strong> Rusted darkwood and bone claws grafted onto fingertips.</li>
<li><strong>Effect:</strong> You gain two primary claw attacks dealing 1d6 slashing damage. These attacks bypass DR as magic weapons.</li>
</ul>
<h5 id="spliced-manipulators">Spliced Manipulators</h5>
<ul>
<li><strong>Cost:</strong> 3,500 gp.</li>
<li><strong>Description:</strong> A pair of small, chitinous crab-like limbs are grafted just beneath your primary shoulders.</li>
<li><strong>Effect:</strong> You gain a +4 bonus on Sleight of Hand, Climb, and Disable Device checks, and can retrieve minor items as a free action.</li>
</ul>
<h5 id="grafted-bone-blades">Kestrel's Grafted Bone-Blades</h5>
<ul>
<li><strong>Cost:</strong> 7,500 gp.</li>
<li><strong>Description:</strong> Raised, scar-thickened tracks run down your forearms, concealing deployable calcified bone-talons.</li>
<li><strong>Effect:</strong> You can deploy or retract these blades as a swift action. They function as +1 shortswords that cannot be disarmed and grant a +4 bonus on checks made to conceal them.</li>
</ul>
<h5 id="dolgaunt-tentacles">Dolgaunt Strength-Drain Tentacles</h5>
<ul>
<li><strong>Cost:</strong> 9,000 gp.</li>
<li><strong>Description:</strong> Your forearms are replaced entirely by muscular, whip-like tentacles covered in micro-barbs.</li>
<li><strong>Effect:</strong> You gain two tentacle attacks (1d4 damage, 10 ft reach). On a critical hit, the target takes 1 point of temporary Strength damage.</li>
</ul>
<h5 id="myomeric-bio-winches">Myomeric Bio-Winches</h5>
<ul>
<li><strong>Cost:</strong> 6,500 gp.</li>
<li><strong>Description:</strong> Your arms are thickened with purple, synthetic muscular cables that whine under extreme tension.</li>
<li><strong>Effect:</strong> You gain a +4 equipment bonus to your Strength score strictly for the purposes of carrying capacity, Grapple checks, and breaking objects.</li>
</ul>
<h5 id="scour-harrow-chain-limb">Scour-Harrow Chain-Limb</h5>
<ul>
<li><strong>Cost:</strong> 4,000 gp.</li>
<li><strong>Description:</strong> One of your arms is amputated and replaced with a rusted iron chain tipped with necrotic blades, animated by tortured soul-ichor.</li>
<li><strong>Effect:</strong> That arm is treated as a spiked chain that you are automatically proficient with. It deals 1d8 slashing/piercing damage and has reach. You take a -4 penalty on fine manual dexterity tasks.</li>
</ul>
<h5 id="chitinous-crab-pincers">Chitinous Crab-Pincers</h5>
<ul>
<li><strong>Cost:</strong> 3,000 gp.</li>
<li><strong>Description:</strong> One hand is replaced by a massive, armor-plated crustacean claw.</li>
<li><strong>Effect:</strong> You gain a claw attack (1d8 bludgeoning) and a +4 bonus on grapple checks, but cannot wield weapons or shields in that hand.</li>
</ul>

<hr />
<h4 id="d-legs-slot-grafts">D. LEGS SLOT GRAFTS</h4>
<h5 id="webbed-digits">Webbed Digits</h5>
<ul>
<li><strong>Cost:</strong> 1,500 gp.</li>
<li><strong>Description:</strong> Fey skin is stretched and grafted between your toes.</li>
<li><strong>Effect:</strong> You gain a swim speed of 30 ft (or +10 ft to your existing swim speed) and a +8 racial bonus on Swim checks.</li>
</ul>
<h5 id="spring-steel-sinews">Spring-Steel Sinews</h5>
<ul>
<li><strong>Cost:</strong> 4,000 gp.</li>
<li><strong>Description:</strong> Spliced troll sinew and coiled fey-metal wiring replace your calf muscles.</li>
<li><strong>Effect:</strong> Your base land speed increases by +10 ft, you gain a +8 bonus on Acrobatics checks made to jump, and you always count as having a running start.</li>
</ul>
<h5 id="satyr-hooves">Satyr-Minotaur Hooves</h5>
<ul>
<li><strong>Cost:</strong> 3,500 gp.</li>
<li><strong>Description:</strong> Your legs from the knee down are replaced with muscular, shaggy minotaur legs terminating in heavy cloven hooves.</li>
<li><strong>Effect:</strong> You gain a stomp natural attack (1d6 bludgeoning) and a +2 natural armor bonus to AC.</li>
</ul>
<h5 id="gravity-slurry-pads">Gravity-Slurry Anchor Pads</h5>
<ul>
<li><strong>Cost:</strong> 5,500 gp.</li>
<li><strong>Description:</strong> Your feet are injected with heavy, alchemical gravity-slurry, making them incredibly dense.</li>
<li><strong>Effect:</strong> You gain a +8 bonus to your CMD against trip, bull rush, and drag maneuvers. However, your base land speed is reduced by 5 ft.</li>
</ul>
<h5 id="blink-hound-joints">Blink-Hound Phase-Joints</h5>
<ul>
<li><strong>Cost:</strong> 9,500 gp.</li>
<li><strong>Description:</strong> Glowing blue teleportation nodes from aberrant blink-hounds are fused into your knee caps.</li>
<li><strong>Effect:</strong> Once per day, you can teleport up to 15 ft as a swift action.</li>
</ul>
<h5 id="leviathan-struts">Leviathan-Bone Struts</h5>
<ul>
<li><strong>Cost:</strong> 2,000 gp.</li>
<li><strong>Description:</strong> Your femurs are reinforced with fossilized, indestructible leviathan bone struts.</li>
<li><strong>Effect:</strong> You ignore the first 30 feet of falling damage, and land on your feet automatically if you fall less than 60 feet.</li>
</ul>

<hr />
<h4 id="e-torso-slot-grafts">E. TORSO SLOT GRAFTS</h4>
<h5 id="troll-blood-infusion">Troll-Blood Infusion</h5>
<ul>
<li><strong>Cost:</strong> 12,000 gp.</li>
<li><strong>Description:</strong> Your lymphatic system is rewired to a hyper-regenerative deep-trench scrag blood gland.</li>
<li><strong>Effect:</strong> You gain Fast Healing 2. You require twice as much food and water, and you suffer a -2 penalty on saving throws against fire and acid effects.</li>
</ul>
<h5 id="displacer-hide">Displacer Hide Sheathing</h5>
<ul>
<li><strong>Cost:</strong> 15,000 gp.</li>
<li><strong>Description:</strong> Six-legged fey-feline fur and hide is grafted directly onto your torso and back.</li>
<li><strong>Effect:</strong> You gain a permanent 20% miss chance against all ranged physical attacks.</li>
</ul>
<h5 id="dire-displacer-tentacles">Dire Displacer Tentacles (Apex Graft)</h5>
<ul>
<li><strong>Cost:</strong> 25,000 gp.</li>
<li><strong>Description:</strong> Two massive, heavy-furred blue tentacles are bolted into your shoulder blades via blackwater ironwood anchors and copper conduits.</li>
<li><strong>Effect:</strong> You gain two primary tentacle attacks (1d8 bludgeoning/piercing) with a 15-foot reach. You threaten a 15-foot radius and can make attacks of opportunity with them.</li>
</ul>
<h5 id="adamantine-ribcage">Adamantine Ribcage Plating</h5>
<ul>
<li><strong>Cost:</strong> 18,000 gp.</li>
<li><strong>Description:</strong> Your ribcage is surgically wrapped in interlocking adamantine plates that pulse with bio-electric energy.</li>
<li><strong>Effect:</strong> You gain Damage Reduction 2/adamantine, and have a 25% chance to negate critical hits and sneak attacks (as the <em>Light Fortification</em> armor property).</li>
</ul>
<h5 id="scrag-nerve-sheathing">Scrag-Nerve Sheathing</h5>
<ul>
<li><strong>Cost:</strong> 22,000 gp.</li>
<li><strong>Description:</strong> Your entire central nervous system is wrapped in regenerative scrag marrow, constantly repairing synaptic damage in real-time.</li>
<li><strong>Effect:</strong> You gain complete immunity to the Stunned and Paralyzed conditions.</li>
</ul>
<h5 id="reedsinger-flute">Reedsinger Ribcage Flute</h5>
<ul>
<li><strong>Cost:</strong> 6,500 gp.</li>
<li><strong>Description:</strong> Your ribs are hollowed out into a biological pipe-organ. When you breathe deeply, the wind plays a haunting, psychic fey dirge through your chest.</li>
<li><strong>Effect:</strong> You can cast <em>Fascinate</em> (as the Bardic Performance) 3 times per day, using your character level as your effective bard level.</li>
</ul>

<hr />
<h4 id="f-spine-slot-grafts">F. SPINE SLOT GRAFTS</h4>
<h5 id="choker-spine">Choker Spine</h5>
<ul>
<li><strong>Cost:</strong> 8,000 gp.</li>
<li><strong>Description:</strong> The cartilaginous spine of a choker is spliced alongside your own vertebrae.</li>
<li><strong>Effect:</strong> Once per day, you can activate the graft as a free action to gain the effects of <em>Haste</em> for 3 rounds.</li>
</ul>
<h5 id="planar-anchor-node">Planar Anchor Node</h5>
<ul>
<li><strong>Cost:</strong> 14,000 gp.</li>
<li><strong>Description:</strong> A heavy lead-silver bracket is bolted directly into your thoracic vertebrae.</li>
<li><strong>Effect:</strong> You are completely immune to hostile teleportation effects, and gain a +8 bonus on saving throws against telekinetic shoves, planar gravity shifts, and magical winds.</li>
</ul>
<h5 id="spinal-surge">Spinal Surge (Illithid Graft)</h5>
<ul>
<li><strong>Cost:</strong> 16,000 gp.</li>
<li><strong>Description:</strong> Illithid-kin brain nodes are spliced down the length of your spinal cord, expanding your neural network beyond your skull.</li>
<li><strong>Effect:</strong> You gain Mindsight out to 30 ft (you automatically detect any creature with an Intelligence score of 1 or higher within range, regardless of stealth or invisibility).</li>
</ul>
<h5 id="tri-weave-soul-spine">Tri-Weave Soul-Spine</h5>
<ul>
<li><strong>Cost:</strong> 30,000 gp.</li>
<li><strong>Description:</strong> An excruciating surgery wherein Arcane, Divine, and Psionic metaphysical threads are physically braided with mithril wire and fused into your spinal column.</li>
<li><strong>Effect:</strong> You gain Spell Resistance equal to 10 + your character level.</li>
</ul>
<h5 id="bone-shard-spikes">Bone-Shard Spikes</h5>
<ul>
<li><strong>Cost:</strong> 3,000 gp.</li>
<li><strong>Description:</strong> Jagged calcified bone spurs protrude violently from your back.</li>
<li><strong>Effect:</strong> Any creature that grapples you, or that you grapple, takes 1d6 piercing damage at the start of your turn.</li>
</ul>
<h5 id="aether-marrow">Aether-Conductive Marrow</h5>
<ul>
<li><strong>Cost:</strong> 5,000 gp.</li>
<li><strong>Description:</strong> Your bone marrow is replaced with glowing, highly volatile liquid aether.</li>
<li><strong>Effect:</strong> Your maximum hit points increase by an amount equal to your Hit Dice. However, whenever you take Acid, Cold, Electricity, or Fire damage, you take +1 damage per damage die rolled.</li>
</ul>

<hr />
<h4 id="g-skin-slot-grafts">G. SKIN SLOT GRAFTS</h4>
<h5 id="lead-silver-runes">Lead-Silver Runes</h5>
<ul>
<li><strong>Cost:</strong> 9,000 gp.</li>
<li><strong>Description:</strong> Silver wire and lead foil are etched permanently into your skin in complex, geometric wards.</li>
<li><strong>Effect:</strong> You gain Spell Resistance 15 specifically against Divination and Telepathy effects, and cannot be detected by <em>Scrying</em>.</li>
</ul>
<h5 id="phase-stutter-skin">Phase-Stutter Skin</h5>
<ul>
<li><strong>Cost:</strong> 18,000 gp.</li>
<li><strong>Description:</strong> Your skin is grafted with displacer glands, causing your physical form to blur and stutter out of sync with reality.</li>
<li><strong>Effect:</strong> You gain a permanent 20% miss chance against all attacks (functions as <em>Blur</em>).</li>
</ul>
<h5 id="acidic-pores">Acidic Mutagen Pores</h5>
<ul>
<li><strong>Cost:</strong> 4,500 gp.</li>
<li><strong>Description:</strong> Suture has riddled your dermis with micro-conduits that constantly weep Thessalan acidic mutagen.</li>
<li><strong>Effect:</strong> Your unarmed strikes and natural attacks deal an additional 1d4 acid damage. Any creature that swallows you whole takes 3d6 acid damage per round.</li>
</ul>
<h5 id="fungal-bark">Gnarled Fungal Bark</h5>
<ul>
<li><strong>Cost:</strong> 5,000 gp.</li>
<li><strong>Description:</strong> Your skin is replaced with thick plates of ironwood bark and subterranean moss.</li>
<li><strong>Effect:</strong> You gain a +3 natural armor bonus to AC, but gain Vulnerability to Fire damage.</li>
</ul>
<h5 id="tri-weave-tattoos">Tri-Weave Shroud Tattoos</h5>
<ul>
<li><strong>Cost:</strong> 7,000 gp.</li>
<li><strong>Description:</strong> The overarching Tri-Weave Shroud of Blackwater Quay is miniaturized and tattooed across your entire body in glowing purple ink.</li>
<li><strong>Effect:</strong> You are completely immune to alignment-revealing magic, and your thoughts cannot be read even if you willingly allow it.</li>
</ul>
<h5 id="ironwood-scales">Blackwater Ironwood Scales</h5>
<ul>
<li><strong>Cost:</strong> 8,500 gp.</li>
<li><strong>Description:</strong> Light-devouring black ironwood splinters are grown directly out of your epidermis, creating a suit of living scale mail.</li>
<li><strong>Effect:</strong> You gain a +4 armor bonus to AC. This does not count as wearing armor, has no armor check penalty, and allows a maximum Dexterity bonus of +5.</li>
</ul>

<hr />
<h4 id="h-organs-slot-grafts">H. INTERNAL ORGANS SLOT GRAFTS</h4>
<h5 id="siphon-stomach">Siphon-Syringe Stomach</h5>
<ul>
<li><strong>Cost:</strong> 2,500 gp.</li>
<li><strong>Description:</strong> Your stomach is replaced with a biological alchemical crucible.</li>
<li><strong>Effect:</strong> You are completely immune to ingested poisons and diseases. You can safely consume raw, rotting, or toxic organic matter for sustenance without penalty.</li>
</ul>
<h5 id="anti-compliance-gland">Anti-Compliance Gland</h5>
<ul>
<li><strong>Cost:</strong> 12,000 gp.</li>
<li><strong>Description:</strong> Synthesized from the Elder Node's telepathic victims, this gland floods your brain with psychic-suppressant mutagens when threatened.</li>
<li><strong>Effect:</strong> You gain complete immunity to all Charm and Compulsion effects.</li>
</ul>
<h5 id="void-lungs">Deepmind Void-Lungs</h5>
<ul>
<li><strong>Cost:</strong> 6,000 gp.</li>
<li><strong>Description:</strong> Your lungs are heavily modified to process extreme environments, filtering toxins through a thick layer of alchemical sludge.</li>
<li><strong>Effect:</strong> You can breathe in vacuums, underwater, or in areas of toxic gas. You are immune to inhaled poisons.</li>
</ul>
<h5 id="catalyst-liver">Alchemical Catalyst Liver</h5>
<ul>
<li><strong>Cost:</strong> 9,500 gp.</li>
<li><strong>Description:</strong> Your liver is enlarged and laced with alchemical catalyst salts.</li>
<li><strong>Effect:</strong> Whenever you consume a potion or elixir, its duration is doubled (as if affected by the Extend Spell feat).</li>
</ul>
<h5 id="precognitive-adrenal">Precognitive Adrenal Gland</h5>
<ul>
<li><strong>Cost:</strong> 14,000 gp.</li>
<li><strong>Description:</strong> Borrowed from Shadar-Kai shock-troopers, this gland forcibly accelerates your perception of time when danger is near.</li>
<li><strong>Effect:</strong> You gain a +2 bonus to Initiative and retain your Dexterity bonus to AC even when caught flat-footed.</li>
</ul>
<h5 id="mutagen-bile-sack">Thessalan Mutagen-Bile Sack</h5>
<ul>
<li><strong>Cost:</strong> 7,000 gp.</li>
<li><strong>Description:</strong> A swollen sack of highly pressurized acid is stitched to your esophagus.</li>
<li><strong>Effect:</strong> Three times per day, as a standard action, you can spit a glob of acidic bile at a target within 30 feet as a ranged touch attack. On a hit, it deals 3d6 acid damage and the target must succeed on a DC 14 Fortitude save or be sickened for 1d4 rounds.</li>
</ul>
`;

fs.writeFileSync(file, before + graftsHTML + "\n" + after, 'utf8');
console.log('Successfully updated dm_player_options.html with 42 grafts.');
