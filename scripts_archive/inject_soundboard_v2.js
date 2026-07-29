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
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0 0 30px rgba(0,0,0,0.8), inset 0 0 15px rgba(212,175,55,0.05);
        z-index: 10000;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: #e2e8f0;
        font-family: 'Inter', sans-serif;
        transform: translateY(calc(100% - 45px));
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
        margin-bottom: 15px;
        border-bottom: 1px solid rgba(212, 175, 55, 0.3);
        padding-bottom: 8px;
        text-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
    }
    .sb-track {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        padding: 6px;
        background: rgba(30, 41, 59, 0.7);
        border-radius: 6px;
        border: 1px solid #475569;
        transition: border-color 0.2s;
    }
    .sb-track:hover {
        border-color: #d4af37;
    }
    .sb-btn {
        background: #334155;
        color: #e2e8f0;
        border: none;
        border-radius: 4px;
        padding: 5px 12px;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: bold;
    }
    .sb-btn:hover {
        background: #475569;
    }
    .sb-btn.playing {
        background: #047857;
        color: #fff;
        box-shadow: 0 0 10px #047857;
    }
    
    .sb-volume {
        margin-top: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9em;
        color: #94a3b8;
    }
    .sb-volume input[type=range] {
        flex-grow: 1;
        accent-color: #d4af37;
    }
</style>

<div id="dm-soundboard">
    <div class="sb-header" onclick="document.getElementById('dm-soundboard').classList.toggle('expanded')">
        <span>&#9835; DM Ambiance Soundboard</span>
        <span style="font-size: 0.8em;">&#9650; Toggle</span>
    </div>
    
    <div class="sb-track">
        <span style="font-size: 0.9em;">Deep Water</span>
        <button class="sb-btn toggle-track" data-track="audio-water">Play</button>
        <audio id="audio-water" src="https://actions.google.com/sounds/v1/water/waves_crashing.ogg" loop></audio>
    </div>
    <div class="sb-track">
        <span style="font-size: 0.9em;">Void Whispers</span>
        <button class="sb-btn toggle-track" data-track="audio-void">Play</button>
        <audio id="audio-void" src="https://actions.google.com/sounds/v1/horror/monster_breath_loop.ogg" loop></audio>
    </div>
    <div class="sb-track">
        <span style="font-size: 0.9em;">Tavern Brawl</span>
        <button class="sb-btn toggle-track" data-track="audio-tavern">Play</button>
        <audio id="audio-tavern" src="https://actions.google.com/sounds/v1/crowds/restaurant_chatter.ogg" loop></audio>
    </div>
    <div class="sb-track">
        <span style="font-size: 0.9em;">Clockwork Engine</span>
        <button class="sb-btn toggle-track" data-track="audio-clockwork">Play</button>
        <audio id="audio-clockwork" src="https://actions.google.com/sounds/v1/foley/mechanical_clock_ticking.ogg" loop></audio>
    </div>
    
    <div class="sb-volume">
        <span>Master Vol</span>
        <input type="range" id="sb-master-vol" min="0" max="1" step="0.05" value="0.5">
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll('.toggle-track');
        const masterVol = document.getElementById('sb-master-vol');
        const audios = document.querySelectorAll('#dm-soundboard audio');
        
        // Init volume
        audios.forEach(a => a.volume = masterVol.value);
        
        masterVol.addEventListener('input', (e) => {
            audios.forEach(a => a.volume = e.target.value);
        });

        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const trackId = this.dataset.track;
                const audioEl = document.getElementById(trackId);
                
                if (this.classList.contains('playing')) {
                    this.classList.remove('playing');
                    this.innerText = 'Play';
                    audioEl.pause();
                } else {
                    this.classList.add('playing');
                    this.innerText = 'Stop';
                    audioEl.play();
                }
            });
        });
    });
</script>
<!-- /DM SOUNDBOARD WIDGET -->
`;

dmFiles.forEach(file => {
    let content = fs.readFileSync('h:/Antigravity/Novel/' + file, 'utf8');
    
    // Remove old soundboard if it exists
    const startIndex = content.indexOf('<!-- DM SOUNDBOARD WIDGET -->');
    const endIndex = content.indexOf('<!-- /DM SOUNDBOARD WIDGET -->');
    if(startIndex !== -1 && endIndex !== -1) {
        content = content.substring(0, startIndex) + content.substring(endIndex + 30);
    }
    
    // Inject new soundboard
    content = content.replace('</body>', soundboardHTML + '\n</body>');
    fs.writeFileSync('h:/Antigravity/Novel/' + file, content);
    console.log('Injected V1.2 Soundboard into ' + file);
});
