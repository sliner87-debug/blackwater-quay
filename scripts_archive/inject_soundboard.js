const fs = require('fs');

const dmFiles = [
    'dm_screen.html',
    'dm_bestiary.html',
    'dm_faction_renown.html',
    'dm_magic_items.html',
    'dm_player_options.html',
    'dm_lore_deep_dives.html'
];

const soundboardHTML = `
<!-- DM SOUNDBOARD WIDGET -->
<style>
    #dm-soundboard {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        background: rgba(15, 23, 42, 0.95);
        border: 2px solid #334155;
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0 0 20px rgba(0,0,0,0.8);
        z-index: 10000;
        backdrop-filter: blur(5px);
        color: #e2e8f0;
        font-family: 'Inter', sans-serif;
        transform: translateY(calc(100% - 40px));
        transition: transform 0.3s ease;
    }
    #dm-soundboard.expanded {
        transform: translateY(0);
    }
    .sb-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-weight: bold;
        color: #d4af37;
        margin-bottom: 10px;
        border-bottom: 1px solid #334155;
        padding-bottom: 5px;
    }
    .sb-track {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        padding: 5px;
        background: #1e293b;
        border-radius: 4px;
        border: 1px solid #475569;
    }
    .sb-btn {
        background: #334155;
        color: #e2e8f0;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .sb-btn:hover {
        background: #475569;
    }
    .sb-btn.playing {
        background: #047857;
        color: #fff;
    }
</style>

<div id="dm-soundboard">
    <div class="sb-header" onclick="document.getElementById('dm-soundboard').classList.toggle('expanded')">
        <span>&#9835; DM Ambiance Soundboard</span>
        <span>&#9650;</span>
    </div>
    
    <div class="sb-track">
        <span style="font-size: 0.9em;">Deep Water & Creaking Hull</span>
        <button class="sb-btn toggle-track" data-track="hull">Play</button>
    </div>
    <div class="sb-track">
        <span style="font-size: 0.9em;">Void Whispers</span>
        <button class="sb-btn toggle-track" data-track="void">Play</button>
    </div>
    <div class="sb-track">
        <span style="font-size: 0.9em;">Tavern Brawl (Sluices)</span>
        <button class="sb-btn toggle-track" data-track="tavern">Play</button>
    </div>
    <div class="sb-track">
        <span style="font-size: 0.9em;">Clockwork Machinery</span>
        <button class="sb-btn toggle-track" data-track="clockwork">Play</button>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll('.toggle-track');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('playing')) {
                    this.classList.remove('playing');
                    this.innerText = 'Play';
                    console.log('Paused track: ' + this.dataset.track);
                } else {
                    // Turn off others? Let's allow multi-track overlapping!
                    this.classList.add('playing');
                    this.innerText = 'Stop';
                    console.log('Playing track: ' + this.dataset.track);
                }
            });
        });
    });
</script>
<!-- /DM SOUNDBOARD WIDGET -->
`;

dmFiles.forEach(file => {
    let content = fs.readFileSync('h:/Antigravity/Novel/' + file, 'utf8');
    if (!content.includes('id="dm-soundboard"')) {
        content = content.replace('</body>', soundboardHTML + '\n</body>');
        fs.writeFileSync('h:/Antigravity/Novel/' + file, content);
        console.log('Injected Soundboard into ' + file);
    } else {
        console.log('Soundboard already in ' + file);
    }
});
