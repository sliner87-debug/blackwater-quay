const fs = require('fs');
let content = fs.readFileSync('h:/Antigravity/Novel/loot_generator.js', 'utf8');

content = content.replace(/syringe/g, 'glass ampoule');
content = content.replace(/mechanical crab/g, 'clockwork crab');

fs.writeFileSync('h:/Antigravity/Novel/loot_generator.js', content);
console.log('Updated loot_generator.js');
