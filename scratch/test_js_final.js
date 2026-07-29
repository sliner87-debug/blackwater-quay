const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('h:/Antigravity/Novel/shipyard.html', 'utf8');
const js = fs.readFileSync('h:/Antigravity/Novel/shipyard.js', 'utf8');

const safeJs = js.replace('ctx.clearRect', 'if(ctx) ctx.clearRect').replace('ctx.fillStyle', 'if(ctx) ctx.fillStyle').replace('ctx.fillRect', 'if(ctx) ctx.fillRect').replace('drawGrid();', '').replace('placedItems.forEach', 'if(ctx) placedItems.forEach');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

const scriptEl = document.createElement("script");
scriptEl.textContent = safeJs;
document.body.appendChild(scriptEl);

const event = document.createEvent('Event');
event.initEvent('DOMContentLoaded', true, true);
window.document.dispatchEvent(event);

setTimeout(() => {
    const chassisSelect = document.getElementById('select-chassis');
    chassisSelect.value = 'nautiloid';
    const changeEvent = document.createEvent('Event');
    changeEvent.initEvent('change', true, true);
    chassisSelect.dispatchEvent(changeEvent);
    
    const upgradeCheck = document.querySelector('.cb-upgrade[value="vampirichull"]');
    upgradeCheck.checked = true;
    upgradeCheck.dispatchEvent(changeEvent);

    console.log("CHASSIS DESC:", document.getElementById('desc-chassis').innerHTML);
    console.log("UPGRADE DESC:", document.getElementById('desc-upgrades').innerHTML);
}, 500);
