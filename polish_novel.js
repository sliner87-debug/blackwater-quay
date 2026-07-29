const fs = require('fs');
let html = fs.readFileSync('h:/Antigravity/Novel/master_novel_complete.html', 'utf8');

// Update CSS for glassmorphism and progress bar
const newCSS = `body.theme-dark {
    --novel-bg: #0f172a;
    --novel-text: #e2e8f0;
    transition: background-color 0.5s ease, color 0.5s ease;
}

body.theme-sepia {
    --novel-bg: #f4ecd8;
    --novel-text: #433422;
    transition: background-color 0.5s ease, color 0.5s ease;
}

body.theme-light {
    --novel-bg: #ffffff;
    --novel-text: #111827;
    transition: background-color 0.5s ease, color 0.5s ease;
}

.novel-content-wrapper {
    background-color: var(--novel-bg) !important;
    color: var(--novel-text) !important;
    font-size: var(--novel-font-size) !important;
    transition: all 0.3s ease;
}

.novel-content-wrapper h1, .novel-content-wrapper h2, .novel-content-wrapper h3 {
    color: var(--novel-text) !important;
}

body.focus-mode .site-header {
    transform: translateY(-100%);
    transition: transform 0.3s ease;
}

body:not(.focus-mode) .site-header {
    transform: translateY(0);
    transition: transform 0.3s ease;
}

#reading-progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
    z-index: 10005;
}
#reading-progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #d4af37, #fef08a);
    box-shadow: 0 0 10px #d4af37;
    transition: width 0.1s ease;
}

#reading-toolbar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    padding: 10px 20px;
    display: flex;
    gap: 15px;
    z-index: 10001;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.05);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
}`;

// We will inject the progress bar HTML right before <div id="reading-toolbar">
const progressHTML = `
<div id="reading-progress-container">
    <div id="reading-progress-bar"></div>
</div>
`;

// And append progress bar script
const progressScript = `
        // Scroll progress
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('reading-progress-bar').style.width = scrolled + "%";
        });
`;

// Replace CSS
html = html.replace(/body\.theme-dark \{[\s\S]*?backdrop-filter: blur\(5px\);/m, newCSS);
if (!html.includes('id="reading-progress-container"')) {
    html = html.replace('<div id="reading-toolbar">', progressHTML + '<div id="reading-toolbar">');
}
if (!html.includes("window.addEventListener('scroll'")) {
    html = html.replace("document.getElementById('btn-focus-toggle').addEventListener('click', function() {", progressScript + "\n        document.getElementById('btn-focus-toggle').addEventListener('click', function() {");
}

fs.writeFileSync('h:/Antigravity/Novel/master_novel_complete.html', html);
console.log('Novel focus mode polished.');
