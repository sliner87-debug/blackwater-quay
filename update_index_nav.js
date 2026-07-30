const fs = require('fs');

let html = fs.readFileSync('h:/Antigravity/Novel/index.html', 'utf8');

const targetLink = '<a href="fleet_generator.html" style="color: #a855f7; font-weight: bold;">Fleet Generator</a>';
const newLink = '\n                        <a href="ambient_mixer.html" style="color: #10b981; font-weight: bold;">Ambient Mixer</a>';

if (html.includes(targetLink) && !html.includes('ambient_mixer.html')) {
    html = html.replace(targetLink, targetLink + newLink);
    fs.writeFileSync('h:/Antigravity/Novel/index.html', html, 'utf8');
    console.log("Added Ambient Mixer to index.html dropdown");
} else {
    console.log("Target link not found or already added.");
}
