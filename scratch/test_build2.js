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
    document.getElementById('select-chassis').value = 'nautiloid';
    document.getElementById('select-weapon').value = 'mindflayer';
    document.querySelector('.cb-upgrade[value="vampirichull"]').checked = true;
    
    document.getElementById('btn-build').click();
    
    const actions = document.getElementById('sb-actions-container').innerHTML;
    console.log("ACTIONS RENDERED:", actions.includes('Psionic Blast'));
}, 500);
