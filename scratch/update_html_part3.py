import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Expand Accordion 1 (Chassis) and add Custom Blueprint logic
new_accordion1 = '''                <div class="accordion-item">
                    <button class="accordion-btn active">1. Hull Chassis & Material</button>
                    <div class="accordion-panel" style="max-height: 2000px;">
                        <div class="config-group">
                            <h4>Base Chassis</h4>
                            <div class="radio-grid" id="chassis-grid">
                                <label class="radio-card"><input type="radio" name="chassis" value="skiff" checked><span class="card-content"><strong>Sluice-Skiff</strong><span>Nimble scout. Crew: 1-2</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="gunboat"><span class="card-content"><strong>Assault Gunboat</strong><span>Fast attack. Crew: 4-8</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="pinnace"><span class="card-content"><strong>Smuggler\\'s Pinnace</strong><span>Sleek, stealthy. Crew: 5-15</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="submersible"><span class="card-content"><strong>Deep-Sea Submersible</strong><span>Deep diving. Crew: 4-6</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="clipper"><span class="card-content"><strong>Aether-Clipper</strong><span>Extremely fast. Crew: 10-20</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="galleon"><span class="card-content"><strong>Ironclad Galleon</strong><span>Heavy hauler. Crew: 20-40</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="barge"><span class="card-content"><strong>Necromancer\\'s Barge</strong><span>Slow, undead transport.</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="leviathan"><span class="card-content"><strong>Leviathan Hunter</strong><span>Monster trapper. Crew: 30-50</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="dreadnought"><span class="card-content"><strong>Subterranean Dreadnought</strong><span>Massive warship. Crew: 80-120</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="flagship"><span class="card-content"><strong>Sovereign Flagship</strong><span>Floating fortress. Crew: 200+</span></span></label>
                                <label class="radio-card"><input type="radio" name="chassis" value="custom" id="chassis-custom"><span class="card-content" style="border: 2px dashed #38bdf8;"><strong>Custom Blueprint</strong><span>Build your own hull stats.</span></span></label>
                            </div>

                            <div id="custom-blueprint-fields" style="display: none; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #38bdf8;">
                                <h4>Custom Blueprint Settings</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
                                    <div><label>Ship Name:</label> <input type="text" id="custom-name" value="Custom Vessel" style="width:100%; padding: 5px;"></div>
                                    <div><label>Ship Type/Size:</label> <input type="text" id="custom-type" value="Gargantuan Vehicle" style="width:100%; padding: 5px;"></div>
                                    <div><label>Base HP:</label> <input type="number" id="custom-hp" value="100" style="width:100%; padding: 5px;"></div>
                                    <div><label>Damage Threshold:</label> <input type="number" id="custom-dt" value="0" style="width:100%; padding: 5px;"></div>
                                    <div><label>Base Speed (ft):</label> <input type="number" id="custom-speed" value="30" style="width:100%; padding: 5px;"></div>
                                    <div><label>Base AC:</label> <input type="number" id="custom-ac" value="10" style="width:100%; padding: 5px;"></div>
                                    <div><label>STR Score:</label> <input type="number" id="custom-str" value="10" style="width:100%; padding: 5px;"></div>
                                    <div><label>DEX Score:</label> <input type="number" id="custom-dex" value="10" style="width:100%; padding: 5px;"></div>
                                    <div><label>CON Score:</label> <input type="number" id="custom-con" value="10" style="width:100%; padding: 5px;"></div>
                                    <div><label>Crew Min:</label> <input type="number" id="custom-crew-min" value="1" style="width:100%; padding: 5px;"></div>
                                    <div><label>Crew Max:</label> <input type="number" id="custom-crew-max" value="5" style="width:100%; padding: 5px;"></div>
                                    <div><label>Cargo Capacity:</label> <input type="text" id="custom-cargo" value="10 tons" style="width:100%; padding: 5px;"></div>
                                </div>
                            </div>
'''
text = re.sub(r'<div class="accordion-item">\s*<button class="accordion-btn active">1\. Hull Chassis.*?<h4 style="margin-top: 20px;">Hull Material</h4>', new_accordion1 + '\n                            <h4 style="margin-top: 20px;">Hull Material</h4>', text, flags=re.DOTALL)


# 2. Expand Armaments (Accordion 5)
new_accordion5 = '''                <div class="accordion-item">
                    <button class="accordion-btn">5. Primary Armament</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <h4 style="color:#e2e8f0; border-bottom:1px solid #475569; padding-bottom:5px; margin-bottom:15px;">Low-Tech & Black Powder</h4>
                            <div class="radio-grid">
                                <label class="radio-card"><input type="radio" name="weapon" value="ballista" checked><span class="card-content"><strong>Heavy Ballista</strong><span>3d10 Piercing. Range 120/480</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="mangonel"><span class="card-content"><strong>Siege Mangonel</strong><span>5d10 Bludgeoning. Range 200/800</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="cannon"><span class="card-content"><strong>Broadside Cannon</strong><span>8d10 Bludgeoning. Range 600/2,400</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="greekfire"><span class="card-content"><strong>Greek Fire Siphon</strong><span>60ft Cone. 6d6 Fire (Save)</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="harpoon"><span class="card-content"><strong>Whaler\\'s Harpoon</strong><span>Grapples massive targets.</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="trebuchet"><span class="card-content"><strong>Fletched Trebuchet</strong><span>8d10 Bludgeoning. Extreme Range.</span></span></label>
                            </div>
                            
                            <h4 style="color:#c084fc; border-bottom:1px solid #475569; padding-bottom:5px; margin-top:25px; margin-bottom:15px;">Magical & Arcane Artillery</h4>
                            <div class="radio-grid">
                                <label class="radio-card"><input type="radio" name="weapon" value="disruptor"><span class="card-content"><strong>Githyanki Disruptor</strong><span>4d10 Psychic. Halves speed.</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="spellcannon"><span class="card-content"><strong>Arcane Spell-Cannon</strong><span>Channel spell slots for Force damage.</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="lightning"><span class="card-content"><strong>Lightning Emitter</strong><span>100ft Line. 8d6 Lightning (Save).</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="gatling"><span class="card-content"><strong>Eldritch Gatling</strong><span>Fires homing force missiles.</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="voidrift"><span class="card-content"><strong>Void-Rift Projector</strong><span>Creates gravitational singularities.</span></span></label>
                                <label class="radio-card"><input type="radio" name="weapon" value="necrotic"><span class="card-content"><strong>Necrotic Torpedo</strong><span>Homes in on living souls. 8d10.</span></span></label>
                            </div>
                        </div>
                    </div>
                </div>'''
text = re.sub(r'<div class="accordion-item">\s*<button class="accordion-btn">5\. Primary Armament.*?(?=<div class="accordion-item">\s*<button class="accordion-btn">6\.)', new_accordion5 + '\n\n', text, flags=re.DOTALL)

# 3. Add Crew and Cargo to the HTML Stat Block
old_stat_row = '''                    <div class="stat-row">
                        <strong>Armor Class</strong> <span id="sb-ac">15</span> <span id="sb-ac-desc">(Salvaged Iron)</span><br>
                        <strong>Hit Points</strong> <span id="sb-hp">200</span> <span id="sb-hp-desc">(Damage Threshold 10)</span><br>
                        <strong>Speed</strong> <span id="sb-speed">60 ft.</span>
                    </div>'''
new_stat_row = '''                    <div class="stat-row">
                        <strong>Armor Class</strong> <span id="sb-ac">15</span> <span id="sb-ac-desc">(Salvaged Iron)</span><br>
                        <strong>Hit Points</strong> <span id="sb-hp">200</span> <span id="sb-hp-desc">(Damage Threshold 10)</span><br>
                        <strong>Speed</strong> <span id="sb-speed">60 ft.</span><br>
                        <strong>Crew</strong> <span id="sb-crew">1-2</span><br>
                        <strong>Cargo Capacity</strong> <span id="sb-cargo">1 ton</span>
                    </div>'''
text = text.replace(old_stat_row, new_stat_row)

with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(text)

# Also append a little JS listener directly into the file or let the main shipyard.js handle it?
# Let's just append it to shipyard.js
with open('h:/Antigravity/Novel/shipyard.js', 'a') as f:
    f.write('''\n\n// Toggle Custom Builder UI
document.getElementById('chassis-grid').addEventListener('change', (e) => {
    const customFields = document.getElementById('custom-blueprint-fields');
    if(e.target.value === 'custom') {
        customFields.style.display = 'block';
    } else if(e.target.name === 'chassis') {
        customFields.style.display = 'none';
    }
});
''')

print("HTML Updated Part 3")
