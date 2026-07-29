import re

html_content = '''            <!-- LEFT: CONFIGURATION FORM -->
            <div class="builder-panel">
                
                <div class="accordion-item">
                    <button class="accordion-btn active">1. Hull Chassis & Material</button>
                    <div class="accordion-panel" style="max-height: 2000px;">
                        <div class="config-group">
                            <h4>Base Chassis</h4>
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="chassis" value="skiff" checked>
                                    <span class="card-content">
                                        <strong>Sluice-Skiff</strong>
                                        <span>Small, nimble, lightly armored.</span>
                                        <span class="cost-tag">Cost: 2,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="chassis" value="galleon">
                                    <span class="card-content">
                                        <strong>Ironclad Galleon</strong>
                                        <span>Standard underworld hauler.</span>
                                        <span class="cost-tag">Cost: 10,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="chassis" value="dreadnought">
                                    <span class="card-content">
                                        <strong>Subterranean Dreadnought</strong>
                                        <span>Massive, slow, heavily armed.</span>
                                        <span class="cost-tag">Cost: 25,000 gp</span>
                                    </span>
                                </label>
                            </div>

                            <h4 style="margin-top: 20px;">Hull Material</h4>
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="material" value="standard" checked>
                                    <span class="card-content">
                                        <strong>Standard Oak</strong>
                                        <span>Basic subterranean lumber.</span>
                                        <span class="cost-tag">Cost: 0 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="material" value="darkwood">
                                    <span class="card-content">
                                        <strong>Shadow-Stitched Darkwood</strong>
                                        <span>Extremely light. +10 Speed.</span>
                                        <span class="cost-tag">Cost: 5,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="material" value="deepiron">
                                    <span class="card-content">
                                        <strong>Forged Deep-Iron</strong>
                                        <span>Heavy, dense. +50 HP.</span>
                                        <span class="cost-tag">Cost: 8,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="material" value="fleshwarped">
                                    <span class="card-content">
                                        <strong>Biomantic Flesh-Carapace</strong>
                                        <span>Living tissue. +100 HP.</span>
                                        <span class="cost-tag">Cost: 12,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-btn">2. Propulsion System</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="propulsion" value="sails" checked>
                                    <span class="card-content">
                                        <strong>Standard Rigging</strong>
                                        <span>Basic canvas sails and oars.</span>
                                        <span class="cost-tag">Cost: 0 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="propulsion" value="shadowsilk">
                                    <span class="card-content">
                                        <strong>Shadow-Silk Sails</strong>
                                        <span>Whisper-quiet. Advantage Stealth.</span>
                                        <span class="cost-tag">Cost: 3,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="propulsion" value="aether">
                                    <span class="card-content">
                                        <strong>Aether-Rotors</strong>
                                        <span>Hover tech. Ignores terrain.</span>
                                        <span class="cost-tag">Cost: 8,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="propulsion" value="submersible">
                                    <span class="card-content">
                                        <strong>Submersible Ballasts</strong>
                                        <span>Allows diving beneath the water.</span>
                                        <span class="cost-tag">Cost: 15,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-btn">3. Armor Plating</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="armor" value="none" checked>
                                    <span class="card-content">
                                        <strong>No Plating</strong>
                                        <span>Base defense only.</span>
                                        <span class="cost-tag">Cost: 0 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="armor" value="iron">
                                    <span class="card-content">
                                        <strong>Salvaged Iron</strong>
                                        <span>+1 AC. Simple plating.</span>
                                        <span class="cost-tag">Cost: 500 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="armor" value="nullsteel">
                                    <span class="card-content">
                                        <strong>Null-Steel Plating</strong>
                                        <span>+2 AC. Magic Dampening.</span>
                                        <span class="cost-tag">Cost: 3,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="armor" value="biomantic">
                                    <span class="card-content">
                                        <strong>Regenerative Tissue</strong>
                                        <span>+1 AC. Regen 10 HP/turn.</span>
                                        <span class="cost-tag">Cost: 4,500 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-btn">4. Primary Armament</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="weapon" value="ballista" checked>
                                    <span class="card-content">
                                        <strong>Heavy Ballista</strong>
                                        <span>Range 120/480. 3d10 Piercing.</span>
                                        <span class="cost-tag">Cost: 1,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="weapon" value="harpoon">
                                    <span class="card-content">
                                        <strong>Whaler\\'s Harpoon Gun</strong>
                                        <span>Grapples enemies on hit.</span>
                                        <span class="cost-tag">Cost: 1,500 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="weapon" value="siphon">
                                    <span class="card-content">
                                        <strong>Alchemical Siphons</strong>
                                        <span>60ft Cone. 6d6 Acid/Fire.</span>
                                        <span class="cost-tag">Cost: 2,500 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="weapon" value="depthcharge">
                                    <span class="card-content">
                                        <strong>Abyssal Depth Charges</strong>
                                        <span>Drops huge explosive payloads.</span>
                                        <span class="cost-tag">Cost: 3,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="weapon" value="disruptor">
                                    <span class="card-content">
                                        <strong>Githyanki Disruptor</strong>
                                        <span>Range 300. 4d10 Psychic.</span>
                                        <span class="cost-tag">Cost: 5,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="weapon" value="spellcannon">
                                    <span class="card-content">
                                        <strong>Arcane Spell-Cannon</strong>
                                        <span>Fire spell slots for damage.</span>
                                        <span class="cost-tag">Cost: 8,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-btn">5. Compartments & Upgrades</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="checkbox-grid">
                                <label class="checkbox-card">
                                    <input type="checkbox" name="upgrade" value="smuggler">
                                    <span class="card-content">
                                        <strong>Smuggler\\'s Hold</strong>
                                        <span>Blocks magical detection.</span>
                                        <span class="cost-tag">Cost: 2,000 gp</span>
                                    </span>
                                </label>
                                <label class="checkbox-card">
                                    <input type="checkbox" name="upgrade" value="vats">
                                    <span class="card-content">
                                        <strong>Thessalan Vats</strong>
                                        <span>Crew regenerates 1d6 HP/turn.</span>
                                        <span class="cost-tag">Cost: 2,500 gp</span>
                                    </span>
                                </label>
                                <label class="checkbox-card">
                                    <input type="checkbox" name="upgrade" value="brig">
                                    <span class="card-content">
                                        <strong>Null-Brig</strong>
                                        <span>Anti-magic detention cell.</span>
                                        <span class="cost-tag">Cost: 4,000 gp</span>
                                    </span>
                                </label>
                                <label class="checkbox-card">
                                    <input type="checkbox" name="upgrade" value="chronal">
                                    <span class="card-content">
                                        <strong>Chronal Engine</strong>
                                        <span>Grants additional action 1/day.</span>
                                        <span class="cost-tag">Cost: 4,000 gp</span>
                                    </span>
                                </label>
                                <label class="checkbox-card">
                                    <input type="checkbox" name="upgrade" value="biolab">
                                    <span class="card-content">
                                        <strong>Biomancer\\'s Lab</strong>
                                        <span>Advantage crafting grafts.</span>
                                        <span class="cost-tag">Cost: 5,000 gp</span>
                                    </span>
                                </label>
                                <label class="checkbox-card">
                                    <input type="checkbox" name="upgrade" value="triweave">
                                    <span class="card-content">
                                        <strong>Tri-Weave Cloaking</strong>
                                        <span>Turn invisible 1/day.</span>
                                        <span class="cost-tag">Cost: 6,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="action-row">
                    <div class="total-cost">Total Cost: <span id="total-cost-display">0</span> gp</div>
                    <button id="btn-build" class="btn-build">Build Ship</button>
                </div>
            </div>'''

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the content between <!-- LEFT: CONFIGURATION FORM --> and <!-- RIGHT: DYNAMIC STAT BLOCK -->
pattern = re.compile(r'<!-- LEFT: CONFIGURATION FORM -->.*?(?=<!-- RIGHT: DYNAMIC STAT BLOCK -->)', re.DOTALL)
new_text = pattern.sub(html_content + '\n\n            <!-- RIGHT: DYNAMIC STAT BLOCK -->', text)

with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("HTML Updated.")
