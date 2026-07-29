const fs = require('fs');

const filePath = 'h:/Antigravity/Novel/master_novel_complete.html';
let content = fs.readFileSync(filePath, 'utf8');

const toolbarSnippet = `
<style>
/* Focus Mode Styles */
:root {
    --novel-bg: #0f172a;
    --novel-text: #e2e8f0;
    --novel-font-size: 18px;
}

body.theme-dark {
    --novel-bg: #0f172a;
    --novel-text: #e2e8f0;
}

body.theme-sepia {
    --novel-bg: #f4ecd8;
    --novel-text: #433422;
}

body.theme-light {
    --novel-bg: #ffffff;
    --novel-text: #111827;
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

#reading-toolbar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid #334155;
    border-radius: 30px;
    padding: 10px 20px;
    display: flex;
    gap: 15px;
    z-index: 10001;
    box-shadow: 0 5px 20px rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
}

.toolbar-btn {
    background: transparent;
    border: 1px solid #475569;
    color: #e2e8f0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;
}

.toolbar-btn:hover {
    background: #1e293b;
    color: #38bdf8;
    border-color: #38bdf8;
}

.toolbar-btn.active {
    background: #38bdf8;
    color: #0f172a;
}
</style>

<div id="reading-toolbar">
    <button class="toolbar-btn" id="btn-theme-dark" title="Dark Mode" style="background: #0f172a; color: #fff;">D</button>
    <button class="toolbar-btn" id="btn-theme-sepia" title="Sepia Mode" style="background: #f4ecd8; color: #433422;">S</button>
    <button class="toolbar-btn" id="btn-theme-light" title="Light Mode" style="background: #ffffff; color: #000;">L</button>
    <div style="width: 2px; background: #475569; margin: 0 5px;"></div>
    <button class="toolbar-btn" id="btn-font-dec" title="Decrease Font">A-</button>
    <button class="toolbar-btn" id="btn-font-inc" title="Increase Font">A+</button>
    <div style="width: 2px; background: #475569; margin: 0 5px;"></div>
    <button class="toolbar-btn" id="btn-focus-toggle" title="Toggle Focus Mode" style="width:auto; border-radius:15px; padding: 0 15px;">Focus</button>
</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const container = document.querySelector('.container');
        if(container) {
            container.classList.add('novel-content-wrapper');
        }

        const body = document.body;
        
        document.getElementById('btn-theme-dark').addEventListener('click', () => {
            body.classList.remove('theme-sepia', 'theme-light');
            body.classList.add('theme-dark');
        });
        document.getElementById('btn-theme-sepia').addEventListener('click', () => {
            body.classList.remove('theme-dark', 'theme-light');
            body.classList.add('theme-sepia');
        });
        document.getElementById('btn-theme-light').addEventListener('click', () => {
            body.classList.remove('theme-dark', 'theme-sepia');
            body.classList.add('theme-light');
        });

        let currentFontSize = 18;
        document.getElementById('btn-font-inc').addEventListener('click', () => {
            currentFontSize += 2;
            document.documentElement.style.setProperty('--novel-font-size', currentFontSize + 'px');
        });
        document.getElementById('btn-font-dec').addEventListener('click', () => {
            currentFontSize -= 2;
            document.documentElement.style.setProperty('--novel-font-size', currentFontSize + 'px');
        });

        document.getElementById('btn-focus-toggle').addEventListener('click', function() {
            body.classList.toggle('focus-mode');
            this.classList.toggle('active');
        });
    });
</script>
`;

if (!content.includes('id="reading-toolbar"')) {
    content = content.replace('</script></body>', '</script>\n' + toolbarSnippet + '\n</body>');
    fs.writeFileSync(filePath, content);
    console.log('Injected Focus Mode toolbar successfully!');
} else {
    console.log('Toolbar already exists.');
}
