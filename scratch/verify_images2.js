const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

const htmlPath = 'h:/Antigravity/Novel/shipyard.html';
const jsPath = 'h:/Antigravity/Novel/shipyard.js';
const imgDir = 'h:/Antigravity/Novel/images/';

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

// We need to inject the script carefully.
const scriptEl = document.createElement("script");
// bypass DOMContentLoaded listener
scriptEl.textContent = js.replace('document.addEventListener("DOMContentLoaded"', 'setTimeout');
document.body.appendChild(scriptEl);

setTimeout(() => {
    try {
        console.log("--- Verification Starting ---");
        
        const mappings = [
            { selectId: 'select-chassis', layerId: 'vis-layer-hull' },
            { selectId: 'select-core', layerId: 'vis-layer-core' },
            { selectId: 'select-armor', layerId: 'vis-layer-armor' },
            { selectId: 'select-propulsion', layerId: 'vis-layer-propulsion' },
            { selectId: 'select-figurehead', layerId: 'vis-layer-figurehead' },
            { selectId: 'select-weapon', layerId: 'vis-layer-weapon1' },
            { selectId: 'select-weapon2', layerId: 'vis-layer-weapon2' },
            { selectId: 'select-weapon3', layerId: 'vis-layer-weapon3' }
        ];
        
        let missingCount = 0;
        let totalCount = 0;
        
        mappings.forEach(m => {
            const selectEl = document.getElementById(m.selectId);
            const imgEl = document.getElementById(m.layerId);
            
            if (!selectEl) {
                console.log('Could not find select:', m.selectId);
                return;
            }
            
            const options = Array.from(selectEl.options);
            options.forEach(opt => {
                const val = opt.value;
                if (val === 'none' || val === 'standard' || val === 'custom') return; // no image expected
                
                totalCount++;
                
                // simulate selection
                selectEl.value = val;
                selectEl.dispatchEvent(new window.Event('change'));
                
                const src = imgEl.src;
                if (!src) {
                    console.log(`[MISSING MAPPING] ${m.selectId} -> ${val} has no image mapped!`);
                    missingCount++;
                } else {
                    // Extract just the filename part from file:///...
                    const filename = src.split('images/')[1];
                    if (!filename) {
                         console.log(`[INVALID SRC] ${m.selectId} -> ${val} gave src: ${src}`);
                         missingCount++;
                         return;
                    }
                    
                    const diskPath = path.join(imgDir, filename);
                    if (!fs.existsSync(diskPath)) {
                        console.log(`[FILE NOT FOUND] ${m.selectId} -> ${val} mapped to ${filename}, but it doesn't exist on disk!`);
                        missingCount++;
                    }
                }
            });
        });
        
        console.log(`\nVerification Complete. ${totalCount} options checked.`);
        if (missingCount === 0) {
            console.log("SUCCESS: All options have valid image mappings that exist on disk!");
        } else {
            console.log(`FAILURE: ${missingCount} options failed verification.`);
        }
    } catch(e) {
        console.error("Test Error:", e);
    }
}, 1000);
