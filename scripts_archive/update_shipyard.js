const fs = require('fs');

let js = fs.readFileSync('h:/Antigravity/Novel/shipyard.js', 'utf8');

// Chassis
js = js.replace(/Assault Gunboat/g, 'Arcane Bombard');
js = js.replace(/Deep-Sea Submersible/g, 'Aetheric Bathysphere');
js = js.replace(/Deep-Trench Crawler/g, 'Clockwork Trench-Crawler');
js = js.replace(/Subterranean Dreadnought/g, 'Runeforged Juggernaut');

// Materials
js = js.replace(/Null-Steel/g, 'Void-Iron');

// Propulsion
js = js.replace(/Alchemical Thrusters/g, 'Alchemical Vents');
js = js.replace(/Teleportation Matrix/g, 'Aetheric Blink-Drive');

// Armor
js = js.replace(/Ablative Carapace/g, 'Shatter-Scale Plating');
js = js.replace(/Energy-Shield Matrix/g, 'Aegis Rune-Ward');

// Weapons
js = js.replace(/Githyanki Disruptor/g, 'Psionic Resonance Beam');
js = js.replace(/Eldritch Gatling/g, 'Aetheric Volley-Gun');
js = js.replace(/Necrotic Torpedo/g, 'Soul-Seeking Depth Charge');
js = js.replace(/Cryo-Caster/g, 'Glacial Projector');
js = js.replace(/Gravitic Mine-Layer/g, 'Gravity-Well Rune Dropper');

// Countermeasures
js = js.replace(/Kinetic Deflector Shield/g, 'Kinetic Ward Projector');
js = js.replace(/Chaff Dispenser/g, 'Illusion-Prism Flakes');
js = js.replace(/Aether-Pulse/g, 'Null-Magic Pulse');
js = js.replace(/EMP Blast/g, 'Null-Magic Blast');

// Auxiliary
js = js.replace(/Boarding Torpedo/g, 'Ironclad Breaching Bell');
js = js.replace(/Torpedo-Sled/g, 'Aether-Wake Glider');
js = js.replace(/Assault-Pod/g, 'Aether-Drop Capsule');

fs.writeFileSync('h:/Antigravity/Novel/shipyard.js', js);


let html = fs.readFileSync('h:/Antigravity/Novel/shipyard.html', 'utf8');
html = html.replace(/Assault Gunboat/g, 'Arcane Bombard');
html = html.replace(/Deep-Sea Submersible/g, 'Aetheric Bathysphere');
html = html.replace(/Deep-Trench Crawler/g, 'Clockwork Trench-Crawler');
html = html.replace(/Subterranean Dreadnought/g, 'Runeforged Juggernaut');
html = html.replace(/Null-Steel/g, 'Void-Iron');
html = html.replace(/Alchemical Thrusters/g, 'Alchemical Vents');
html = html.replace(/Teleportation Matrix/g, 'Aetheric Blink-Drive');
html = html.replace(/Ablative Carapace/g, 'Shatter-Scale Plating');
html = html.replace(/Energy-Shield Matrix/g, 'Aegis Rune-Ward');
html = html.replace(/Githyanki Disruptor/g, 'Psionic Resonance Beam');
html = html.replace(/Eldritch Gatling/g, 'Aetheric Volley-Gun');
html = html.replace(/Necrotic Torpedo/g, 'Soul-Seeking Depth Charge');
html = html.replace(/Cryo-Caster/g, 'Glacial Projector');
html = html.replace(/Gravitic Mine-Layer/g, 'Gravity-Well Rune Dropper');
html = html.replace(/Kinetic Deflector Shield/g, 'Kinetic Ward Projector');
html = html.replace(/Chaff Dispenser/g, 'Illusion-Prism Flakes');
html = html.replace(/Aether-Pulse/g, 'Null-Magic Pulse');
html = html.replace(/Boarding Torpedo/g, 'Ironclad Breaching Bell');
html = html.replace(/Torpedo-Sled/g, 'Aether-Wake Glider');
html = html.replace(/Assault-Pod/g, 'Aether-Drop Capsule');
fs.writeFileSync('h:/Antigravity/Novel/shipyard.html', html);

console.log('Updated shipyard.js and shipyard.html');
