import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add Max HPt to Custom Blueprint Fields
old_custom_fields = '<div><label>Cargo Capacity:</label> <input type="text" id="custom-cargo" value="10 tons" style="width:100%; padding: 5px;"></div>'
new_custom_fields = old_custom_fields + '\n                                    <div><label>Max Hard Points:</label> <input type="number" id="custom-hpt" value="5" style="width:100%; padding: 5px;"></div>'
text = text.replace(old_custom_fields, new_custom_fields)


# 2. Add HPT Tracker, Export, and Import Buttons to Builder Panel
old_action_row = '''                <div class="action-row">
                    <button id="btn-build" class="btn-build">Build Ship Stat Block</button>
                    <div class="total-cost">Total Cost: <span id="total-cost-display">3,500</span> gp</div>
                </div>'''
new_action_row = '''                <div class="action-row" style="flex-wrap: wrap;">
                    <button id="btn-build" class="btn-build">Build Ship Stat Block</button>
                    <div class="total-cost" style="width: 100%; display:flex; justify-content: space-between; margin-top:10px;">
                        <span>Cost: <span id="total-cost-display">3,500</span> gp</span>
                        <span>Hard Points Used: <strong id="hpt-display" style="color:#10b981;">0 / 0</strong></span>
                    </div>
                </div>
                <div style="display:flex; justify-content: space-between; margin-top:15px;">
                    <button id="btn-export" style="background:#1e293b; color:#e2e8f0; border:1px solid #475569; padding:8px; cursor:pointer;">Export JSON</button>
                    <label style="background:#1e293b; color:#e2e8f0; border:1px solid #475569; padding:8px; cursor:pointer;">
                        Import JSON <input type="file" id="input-import" accept=".json" style="display:none;">
                    </label>
                </div>'''
text = text.replace(old_action_row, new_action_row)

# 3. Add Overload Warning, Interactive HP, Crew Stations, and Condition Notes to Stat Block
old_stat_header = '''                    <div class="stat-header">
                        <h2 id="sb-name">Custom Sluice-Skiff</h2>
                        <div id="sb-type">Gargantuan Vehicle (Water)</div>
                    </div>'''
new_stat_header = old_stat_header + '''
                    <div id="sb-overload-warning" style="display:none; background:#ef4444; color:white; font-weight:bold; padding:5px; text-align:center; border-radius:4px; margin-top:10px; border:2px solid #991b1b;">
                        WARNING: VESSEL OVERLOADED - EXCEEDS MAX HARD POINTS
                    </div>'''
text = text.replace(old_stat_header, new_stat_header)

# HP Buttons
old_hp_line = '<strong>Hit Points</strong> <span id="sb-hp">200</span> <span id="sb-hp-desc">(Damage Threshold 10)</span><br>'
new_hp_line = '<strong>Hit Points</strong> <button id="btn-hp-minus" style="padding:0 5px; cursor:pointer; margin-right:5px;">-</button><span id="sb-hp">200</span><button id="btn-hp-plus" style="padding:0 5px; cursor:pointer; margin-left:5px;">+</button> <span id="sb-hp-desc">(Damage Threshold 10)</span><br>'
text = text.replace(old_hp_line, new_hp_line)

# Crew Stations and Condition Notes
old_actions_header = '<h3 class="stat-subheader">Actions</h3>'
new_actions_header = '''                    <h3 class="stat-subheader">Crew Stations</h3>
                    <svg class="stat-divider" height="3" width="100%"><polyline points="0,0 400,1.5 0,3"></polyline></svg>
                    <div id="sb-stations-container" class="stat-section">
                        <!-- Stations injected here -->
                    </div>

                    <h3 class="stat-subheader">Actions</h3>'''
text = text.replace(old_actions_header, new_actions_header)

old_statblock_end = '''                </div>
                
                <div id="placeholder-panel"'''
new_statblock_end = '''                    <h3 class="stat-subheader" style="margin-top:20px; color:#94a3b8;">Condition Notes</h3>
                    <textarea style="width:100%; height:80px; background:transparent; color:#e2e8f0; border:1px solid #475569; padding:5px;" placeholder="Live combat notes (e.g., Sails on fire, Engine disabled)..."></textarea>
                </div>
                
                <div id="placeholder-panel"'''
text = text.replace(old_statblock_end, new_statblock_end)

with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("HTML Updated Part 4")
