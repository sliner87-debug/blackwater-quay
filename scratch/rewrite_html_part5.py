import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    text = f.read()

builder_panel_start = text.find('<div class="builder-panel">')
export_panel_start = text.find('<!-- RIGHT: TTRPG STAT BLOCK EXPORT -->')

new_builder_panel = '''<div class="builder-panel">
                <style>
                    .config-group select { width: 100%; padding: 8px; margin-top: 5px; background: #1e293b; color: #e2e8f0; border: 1px solid #475569; border-radius: 4px; font-size: 14px; }
                    .config-group label.dropdown-label { font-weight: bold; color: #38bdf8; display: block; margin-top: 15px; }
                </style>
                <h3 style="margin-bottom: 15px; border-bottom: 1px solid #475569; padding-bottom: 5px;">Vessel Configuration</h3>
                
                <div class="config-group">
                    <label class="dropdown-label">1. Hull Chassis</label>
                    <select id="select-chassis">
                        <option value="skiff" selected>Sluice-Skiff (2,000 gp | HPt: 2)</option>
                        <option value="gunboat">Assault Gunboat (6,000 gp | HPt: 4)</option>
                        <option value="pinnace">Smuggler\\'s Pinnace (8,000 gp | HPt: 5)</option>
                        <option value="submersible">Deep-Sea Submersible (12,000 gp | HPt: 3)</option>
                        <option value="clipper">Aether-Clipper (15,000 gp | HPt: 5)</option>
                        <option value="galleon">Ironclad Galleon (10,000 gp | HPt: 6)</option>
                        <option value="barge">Necromancer\\'s Barge (5,000 gp | HPt: 4)</option>
                        <option value="leviathan">Leviathan Hunter (18,000 gp | HPt: 8)</option>
                        <option value="dreadnought">Subterranean Dreadnought (25,000 gp | HPt: 10)</option>
                        <option value="flagship">Sovereign Flagship (100,000 gp | HPt: 15)</option>
                        <option value="custom">-- Custom Blueprint --</option>
                    </select>
                </div>

                <div id="custom-blueprint-fields" style="display: none; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #38bdf8;">
                    <h4 style="margin: 0 0 10px 0;">Custom Blueprint Settings</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div><label style="font-size:12px;">Ship Name:</label> <input type="text" id="custom-name" value="Custom Vessel" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Ship Type/Size:</label> <input type="text" id="custom-type" value="Gargantuan Vehicle" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Base HP:</label> <input type="number" id="custom-hp" value="100" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Damage Threshold:</label> <input type="number" id="custom-dt" value="0" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Base Speed (ft):</label> <input type="number" id="custom-speed" value="30" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Base AC:</label> <input type="number" id="custom-ac" value="10" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">STR Score:</label> <input type="number" id="custom-str" value="10" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">DEX Score:</label> <input type="number" id="custom-dex" value="10" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">CON Score:</label> <input type="number" id="custom-con" value="10" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Crew Min:</label> <input type="number" id="custom-crew-min" value="1" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Crew Max:</label> <input type="number" id="custom-crew-max" value="5" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Cargo Capacity:</label> <input type="text" id="custom-cargo" value="10 tons" style="width:100%; padding: 5px;"></div>
                        <div><label style="font-size:12px;">Max Hard Points:</label> <input type="number" id="custom-hpt" value="5" style="width:100%; padding: 5px;"></div>
                    </div>
                </div>

                <div class="config-group">
                    <label class="dropdown-label">2. Hull Material</label>
                    <select id="select-material">
                        <option value="standard" selected>Standard Oak (0 gp)</option>
                        <option value="darkwood">Shadow-Stitched Darkwood (5,000 gp)</option>
                        <option value="deepiron">Forged Deep-Iron (8,000 gp)</option>
                        <option value="fleshwarped">Biomantic Flesh-Carapace (12,000 gp)</option>
                    </select>

                    <label class="dropdown-label">3. Magical Core</label>
                    <select id="select-core">
                        <option value="standard" selected>Standard Furnace (0 gp)</option>
                        <option value="void">Bound Void-Elemental (10,000 gp)</option>
                        <option value="necrotic">Necrotic Engine (12,000 gp)</option>
                        <option value="blood">Blood-Fuel Drive (8,000 gp)</option>
                    </select>

                    <label class="dropdown-label">4. Propulsion System</label>
                    <select id="select-propulsion">
                        <option value="sails" selected>Standard Rigging (0 gp)</option>
                        <option value="shadowsilk">Shadow-Silk Sails (3,000 gp)</option>
                        <option value="aether">Aether-Rotors (8,000 gp)</option>
                        <option value="submersible">Submersible Ballasts (15,000 gp)</option>
                    </select>

                    <label class="dropdown-label">5. Armor Plating</label>
                    <select id="select-armor">
                        <option value="none" selected>No Armor (0 gp)</option>
                        <option value="iron">Salvaged Iron Plating (500 gp)</option>
                        <option value="nullsteel">Null-Steel Plating (3,000 gp)</option>
                        <option value="biomantic">Regenerative Tissue (4,500 gp)</option>
                    </select>

                    <label class="dropdown-label">6. Arcane Figurehead</label>
                    <select id="select-figurehead">
                        <option value="none" selected>None (0 gp)</option>
                        <option value="gorgon">Gorgon\\'s Visage (4,000 gp)</option>
                        <option value="breacher">Breacher\\'s Ram (2,500 gp)</option>
                        <option value="aether">Aether-Seer Array (6,000 gp)</option>
                    </select>

                    <label class="dropdown-label">7. Primary Armament</label>
                    <select id="select-weapon">
                        <optgroup label="Low-Tech">
                            <option value="ballista" selected>Heavy Ballista (1,000 gp | HPt: 1)</option>
                            <option value="mangonel">Siege Mangonel (1,500 gp | HPt: 2)</option>
                            <option value="cannon">Broadside Cannon (3,000 gp | HPt: 3)</option>
                            <option value="greekfire">Greek Fire Siphon (2,500 gp | HPt: 2)</option>
                            <option value="harpoon">Whaler\\'s Harpoon Gun (1,500 gp | HPt: 1)</option>
                            <option value="trebuchet">Fletched Trebuchet (4,000 gp | HPt: 4)</option>
                        </optgroup>
                        <optgroup label="Arcane Artillery">
                            <option value="disruptor">Githyanki Disruptor (5,000 gp | HPt: 2)</option>
                            <option value="spellcannon">Arcane Spell-Cannon (8,000 gp | HPt: 3)</option>
                            <option value="lightning">Lightning Emitter (6,000 gp | HPt: 3)</option>
                            <option value="gatling">Eldritch Gatling (7,500 gp | HPt: 2)</option>
                            <option value="voidrift">Void-Rift Projector (12,000 gp | HPt: 5)</option>
                            <option value="necrotic">Necrotic Torpedo (9,000 gp | HPt: 4)</option>
                        </optgroup>
                    </select>

                    <label class="dropdown-label">8. Defensive Countermeasures</label>
                    <select id="select-countermeasure">
                        <option value="none" selected>None (0 gp)</option>
                        <option value="smoke">Alchemical Smoke-Stacks (2,000 gp)</option>
                        <option value="decoy">Illusory Decoys (4,500 gp)</option>
                        <option value="reflect">Spell-Reflection Shielding (8,000 gp)</option>
                    </select>

                    <label class="dropdown-label">9. Auxiliary Craft</label>
                    <select id="select-auxiliary">
                        <option value="none" selected>None (0 gp)</option>
                        <option value="divebells">Dive-Bells (5,000 gp)</option>
                        <option value="kites">Boarding-Kites (1,500 gp)</option>
                    </select>

                    <label class="dropdown-label">10. Crew Complement</label>
                    <select id="select-crew">
                        <option value="standard" selected>Standard Hired Crew (0 gp)</option>
                        <option value="skeletal">Skeletal Laborers (1,000 gp)</option>
                        <option value="sablehook">Sablehook Smugglers (3,000 gp)</option>
                        <option value="thessalan">Thessalan Mutants (4,000 gp)</option>
                    </select>
                </div>

                <div class="config-group" style="margin-top: 20px;">
                    <h4 style="margin-bottom: 10px;">Exotic Upgrades (Multiple allowed)</h4>
                    <div class="checkbox-grid" style="display: grid; grid-template-columns: 1fr; gap: 5px;">
                        <label><input type="checkbox" class="cb-upgrade" value="smuggler"> Smuggler\\'s Hold (2,000 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="biolab"> Biomancer\\'s Lab (5,000 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="brig"> Null-Brig (4,000 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="chronal"> Chronal Engine (4,000 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="vats"> Thessalan Vats (2,500 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="triweave"> Tri-Weave Cloaking (6,000 gp | HPt: 2)</label>
                    </div>
                </div>

                <div class="action-row" style="flex-wrap: wrap; margin-top: 20px;">
                    <button id="btn-build" class="btn-build">Build Ship Stat Block</button>
                    <div class="total-cost" style="width: 100%; display:flex; justify-content: space-between; margin-top:10px;">
                        <span>Cost: <span id="total-cost-display">0</span> gp</span>
                        <span>Hard Points Used: <strong id="hpt-display" style="color:#10b981;">0 / 0</strong></span>
                    </div>
                </div>
                <div style="display:flex; justify-content: space-between; margin-top:15px; margin-bottom: 20px;">
                    <button id="btn-export" style="background:#1e293b; color:#e2e8f0; border:1px solid #475569; padding:8px; cursor:pointer;">Export JSON</button>
                    <label style="background:#1e293b; color:#e2e8f0; border:1px solid #475569; padding:8px; cursor:pointer;">
                        Import JSON <input type="file" id="input-import" accept=".json" style="display:none;">
                    </label>
                </div>
            </div>
            
            '''

text = text[:builder_panel_start] + new_builder_panel + text[export_panel_start:]
with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("HTML Dropdowns Updated")
