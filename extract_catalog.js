const fs = require('fs');

const shipyardPath = 'h:/Antigravity/Novel/shipyard.js';
const catalogPath = 'h:/Antigravity/Novel/ship_catalog.js';

const content = fs.readFileSync(shipyardPath, 'utf8');
const lines = content.split('\n');

// The catalog is lines 1 to 167 (index 0 to 166)
const catalogLines = lines.slice(0, 167);
const remainingLines = lines.slice(167);

fs.writeFileSync(catalogPath, catalogLines.join('\n'), 'utf8');
fs.writeFileSync(shipyardPath, remainingLines.join('\n'), 'utf8');
console.log('Extracted ship_catalog.js');
