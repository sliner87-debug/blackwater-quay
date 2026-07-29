const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function testLive() {
    try {
        console.log("Fetching live site...");
        // Append a cache buster timestamp to ensure we get the latest
        const ts = Date.now();
        const html = await fetch('https://sliner87-debug.github.io/blackwater-quay/shipyard.html?t=' + ts).then(r => r.text());
        const js = await fetch('https://sliner87-debug.github.io/blackwater-quay/shipyard.js?t=' + ts).then(r => r.text());
        
        console.log("JS length:", js.length);
        console.log("Includes new canvas logic?", js.includes('function renderVTTPalette(filterTheme = \'all\')'));

        const dom = new JSDOM(html, { 
            runScripts: "dangerously",
            url: "https://sliner87-debug.github.io/blackwater-quay/shipyard.html" 
        });
        const window = dom.window;
        const document = window.document;

        // Mock canvas context
        const originalGetContext = window.HTMLCanvasElement.prototype.getContext;
        window.HTMLCanvasElement.prototype.getContext = function () {
            return {
                clearRect: () => {},
                fillStyle: '',
                fillRect: () => {},
                strokeStyle: '',
                lineWidth: 1,
                beginPath: () => {},
                moveTo: () => {},
                lineTo: () => {},
                stroke: () => {},
                save: () => {},
                translate: () => {},
                rotate: () => {},
                shadowColor: '',
                shadowBlur: 0,
                strokeRect: () => {},
                drawImage: () => {},
                restore: () => {}
            };
        };

        const safeJs = js.replace('document.addEventListener("DOMContentLoaded"', 'setTimeout').replace('canvas.getContext(\'2d\')', 'canvas ? canvas.getContext("2d") : null');
        
        const scriptEl = document.createElement("script");
        scriptEl.textContent = safeJs;
        document.body.appendChild(scriptEl);

        setTimeout(() => {
            try {
                // Test 1: VTT Palette Rendering
                const palette = document.getElementById('vtt-dynamic-palette');
                console.log("Palette found:", !!palette);
                console.log("Palette children count:", palette.children.length);
                
                // Test 2: Filter Button
                const filterBtns = document.querySelectorAll('.filter-btn');
                if (filterBtns.length > 0) {
                    filterBtns[1].click(); // click Aether/Arcane
                    console.log("After Arcane filter, palette content:", palette.innerHTML.includes('Arcane Frigate'));
                    console.log("After Arcane filter, includes Gothic?", palette.innerHTML.includes('Necropolis Ark'));
                }

                // Test 3: Shipbuilder Form
                document.getElementById('select-chassis').value = 'nautiloid';
                document.getElementById('select-weapon').value = 'mindflayer';
                document.getElementById('select-weapon2').value = 'voidrift';
                
                // Toggle a checkbox
                const cb = document.querySelector('.cb-upgrade[value="vampirichull"]');
                if (cb) {
                    cb.checked = true;
                    // manually dispatch change event
                    const event = document.createEvent('HTMLEvents');
                    event.initEvent('change', false, true);
                    cb.dispatchEvent(event);
                }

                document.getElementById('btn-build').click();
                const statBlock = document.getElementById('statblock-output');
                console.log("StatBlock generated:", statBlock.style.display === 'block');
                const actions = document.getElementById('sb-actions-container').innerHTML;
                console.log("Secondary weapon action rendered:", actions.includes('Singularity'));
                
                console.log("All tests passed!");
            } catch (e) {
                console.error("Test error:", e);
            }
        }, 1000);
        
    } catch (e) {
        console.error(e);
    }
}
testLive();
