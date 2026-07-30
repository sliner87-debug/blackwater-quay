// naval_tracker.js
document.addEventListener('DOMContentLoaded', () => {
    let ships = {
        players: [],
        enemies: []
    };

    const savedState = localStorage.getItem('sablehook_naval_tracker');
    if (savedState) {
        ships = JSON.parse(savedState);
    }

    function saveState() {
        localStorage.setItem('sablehook_naval_tracker', JSON.stringify(ships));
    }

    function renderBoard() {
        const pContainer = document.getElementById('player-ships-container');
        const eContainer = document.getElementById('enemy-ships-container');
        
        pContainer.innerHTML = '';
        eContainer.innerHTML = '';

        ships.players.forEach((ship, idx) => {
            pContainer.innerHTML += createShipHTML(ship, idx, 'players');
        });

        ships.enemies.forEach((ship, idx) => {
            eContainer.innerHTML += createShipHTML(ship, idx, 'enemies');
        });

        attachListeners();
    }

    function createShipHTML(ship, idx, side) {
        const isEnemy = side === 'enemies';
        return `
            <div class="ship-entry ${isEnemy ? 'enemy' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <input type="text" class="ship-name-input" data-side="${side}" data-idx="${idx}" value="${ship.name}" style="background: transparent; border: none; color: white; font-weight: bold; font-size: 1.1em; width: 70%;">
                    <button class="delete-ship" data-side="${side}" data-idx="${idx}" style="background: #ef4444; color: white; border: none; border-radius: 3px; cursor: pointer;">X</button>
                </div>
                <div class="stat-row">
                    <label>Hull (HP):</label>
                    <input type="number" class="stat-input" data-stat="hp" data-side="${side}" data-idx="${idx}" value="${ship.hp}">
                </div>
                <div class="stat-row">
                    <label>Morale:</label>
                    <input type="number" class="stat-input" data-stat="morale" data-side="${side}" data-idx="${idx}" value="${ship.morale}">
                </div>
                <div class="stat-row">
                    <label>Broadside Cooldown:</label>
                    <input type="number" class="stat-input" data-stat="cooldown" data-side="${side}" data-idx="${idx}" value="${ship.cooldown}">
                </div>
                <div class="action-row" style="margin-top: 5px;">
                    <button class="cooldown-btn" data-side="${side}" data-idx="${idx}">Fire Broadside (Set CD)</button>
                    <button class="tick-btn" data-side="${side}" data-idx="${idx}">Tick Round (-1 CD)</button>
                </div>
            </div>
        `;
    }

    function attachListeners() {
        document.querySelectorAll('.ship-name-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const side = e.target.getAttribute('data-side');
                const idx = e.target.getAttribute('data-idx');
                ships[side][idx].name = e.target.value;
                saveState();
            });
        });

        document.querySelectorAll('.stat-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const side = e.target.getAttribute('data-side');
                const idx = e.target.getAttribute('data-idx');
                const stat = e.target.getAttribute('data-stat');
                ships[side][idx][stat] = parseInt(e.target.value) || 0;
                saveState();
            });
        });

        document.querySelectorAll('.delete-ship').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const side = e.target.getAttribute('data-side');
                const idx = e.target.getAttribute('data-idx');
                ships[side].splice(idx, 1);
                saveState();
                renderBoard();
            });
        });

        document.querySelectorAll('.cooldown-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const side = e.target.getAttribute('data-side');
                const idx = e.target.getAttribute('data-idx');
                ships[side][idx].cooldown = 3; // default broadside CD
                saveState();
                renderBoard();
            });
        });

        document.querySelectorAll('.tick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const side = e.target.getAttribute('data-side');
                const idx = e.target.getAttribute('data-idx');
                if (ships[side][idx].cooldown > 0) {
                    ships[side][idx].cooldown -= 1;
                    saveState();
                    renderBoard();
                }
            });
        });
    }

    document.getElementById('add-player-ship').addEventListener('click', () => {
        ships.players.push({ name: "Player Ship", hp: 100, morale: 10, cooldown: 0 });
        saveState();
        renderBoard();
    });

    document.getElementById('add-enemy-ship').addEventListener('click', () => {
        ships.enemies.push({ name: "Enemy Vessel", hp: 100, morale: 10, cooldown: 0 });
        saveState();
        renderBoard();
    });

    document.getElementById('clear-tracker').addEventListener('click', () => {
        if(confirm("Clear the entire naval combat board?")) {
            ships = { players: [], enemies: [] };
            saveState();
            renderBoard();
        }
    });

    renderBoard();
});
