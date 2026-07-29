const fs = require('fs');
let content = fs.readFileSync('h:/Antigravity/Novel/dm_bestiary.html', 'utf8');

content = content.replace(/alchemical and mechanical grafts/g, 'alchemical and clockwork prosthetics');
content = content.replace(/bio-electric shunts/g, 'aether-conductive nerve grafts');
content = content.replace(/Harpoon-Cannon/g, 'Harpoon-Ballista');
content = content.replace(/bio-mechanics/g, 'flesh-crafted biology');

fs.writeFileSync('h:/Antigravity/Novel/dm_bestiary.html', content);
console.log('Updated dm_bestiary.html');
