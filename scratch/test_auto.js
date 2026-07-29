const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('h:/Antigravity/Novel/shipyard.html', 'utf8');
const js = fs.readFileSync('h:/Antigravity/Novel/shipyard.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

const scriptEl = document.createElement("script");
scriptEl.textContent = js.replace('document.addEventListener("DOMContentLoaded"', 'setTimeout');
document.body.appendChild(scriptEl);

setTimeout(() => {
    try {
        const visualizer = document.getElementById('auto-visualizer');
        console.log("Visualizer exists:", !!visualizer);
        
        const selectChassis = document.getElementById('select-chassis');
        selectChassis.value = 'nautiloid';
        selectChassis.dispatchEvent(new window.Event('change'));
        
        const hullImg = document.getElementById('vis-layer-hull');
        console.log("Hull src updated:", hullImg.src.includes('auto_hull_nautiloid'));
        console.log("Hull opacity:", hullImg.style.opacity);
        
        console.log("Test Passed!");
    } catch(e) {
        console.error(e);
    }
}, 500);
