const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('shipyard.html', 'utf8');
const js = fs.readFileSync('shipyard.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

// Execute shipyard.js in the context
const scriptEl = document.createElement("script");
scriptEl.textContent = js;
document.body.appendChild(scriptEl);

// Trigger DOMContentLoaded
const event = document.createEvent('Event');
event.initEvent('DOMContentLoaded', true, true);
window.document.dispatchEvent(event);

setTimeout(() => {
    const chassisSelect = document.getElementById('select-chassis');
    chassisSelect.value = 'clipper';
    const changeEvent = document.createEvent('Event');
    changeEvent.initEvent('change', true, true);
    chassisSelect.dispatchEvent(changeEvent);
    
    console.log("DESC CHASSIS:", document.getElementById('desc-chassis').innerHTML);
    
    // Also test weapon selection
    const weaponSelect = document.getElementById('select-weapon');
    weaponSelect.value = 'disruptor';
    weaponSelect.dispatchEvent(changeEvent);
    console.log("DESC WEAPON:", document.getElementById('desc-weapon').innerHTML);
}, 500);
