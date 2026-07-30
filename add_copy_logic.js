const fs = require('fs');

let js = fs.readFileSync('h:/Antigravity/Novel/loot_generator.js', 'utf8');

if (!js.includes('document.getElementById(\'btn-copy\')')) {
    js += 
// Copy to Clipboard Logic
document.addEventListener('DOMContentLoaded', () => {
    const btnCopy = document.getElementById('btn-copy');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const display = document.getElementById('loot-display');
            if (display) {
                // We want to copy the raw text, but formatting it slightly
                const text = display.innerText;
                navigator.clipboard.writeText(text).then(() => {
                    btnCopy.textContent = "Copied!";
                    setTimeout(() => btnCopy.textContent = "Copy to Clipboard", 2000);
                }).catch(err => {
                    console.error("Failed to copy", err);
                });
            }
        });
    }
});
;
    fs.writeFileSync('h:/Antigravity/Novel/loot_generator.js', js, 'utf8');
}
