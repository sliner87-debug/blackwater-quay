import re

new_accordions = '''                <div class="accordion-item">
                    <button class="accordion-btn">2. Magical Core & Power Source</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="core" value="standard" checked>
                                    <span class="card-content">
                                        <strong>Standard Furnace</strong>
                                        <span>Basic mundane engine.</span>
                                        <span class="cost-tag">Cost: 0 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="core" value="void">
                                    <span class="card-content">
                                        <strong>Bound Void-Elemental</strong>
                                        <span>Massive power, volatile.</span>
                                        <span class="cost-tag">Cost: 10,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="core" value="necrotic">
                                    <span class="card-content">
                                        <strong>Necrotic Engine</strong>
                                        <span>Soul-fueled. Grants temp HP.</span>
                                        <span class="cost-tag">Cost: 12,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="core" value="blood">
                                    <span class="card-content">
                                        <strong>Blood-Fuel Drive</strong>
                                        <span>Biomantic sprint capability.</span>
                                        <span class="cost-tag">Cost: 8,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-btn">3. Propulsion System</button>
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
                    <button class="accordion-btn">4. Armor Plating</button>
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
                    <button class="accordion-btn">5. Primary Armament</button>
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
                    <button class="accordion-btn">6. Arcane Figureheads & Prows</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="figurehead" value="none" checked>
                                    <span class="card-content">
                                        <strong>None</strong>
                                        <span>Standard ship bow.</span>
                                        <span class="cost-tag">Cost: 0 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="figurehead" value="breacher">
                                    <span class="card-content">
                                        <strong>Breacher\\'s Ram</strong>
                                        <span>Double ramming damage.</span>
                                        <span class="cost-tag">Cost: 2,500 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="figurehead" value="gorgon">
                                    <span class="card-content">
                                        <strong>Gorgon\\'s Visage</strong>
                                        <span>Petrifying gaze (1/day).</span>
                                        <span class="cost-tag">Cost: 4,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="figurehead" value="aether">
                                    <span class="card-content">
                                        <strong>Aether-Seer Array</strong>
                                        <span>Detects invisible/magic in 1 mile.</span>
                                        <span class="cost-tag">Cost: 6,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-btn">7. Defensive Countermeasures</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="countermeasure" value="none" checked>
                                    <span class="card-content">
                                        <strong>None</strong>
                                        <span>Standard defenses only.</span>
                                        <span class="cost-tag">Cost: 0 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="countermeasure" value="smoke">
                                    <span class="card-content">
                                        <strong>Alchemical Smoke-Stacks</strong>
                                        <span>Obscurement gas (3/day).</span>
                                        <span class="cost-tag">Cost: 2,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="countermeasure" value="decoy">
                                    <span class="card-content">
                                        <strong>Illusory Decoys</strong>
                                        <span>Phantom duplicate (1/day).</span>
                                        <span class="cost-tag">Cost: 4,500 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="countermeasure" value="reflect">
                                    <span class="card-content">
                                        <strong>Spell-Reflection Shielding</strong>
                                        <span>Reflects targeted spells (1/day).</span>
                                        <span class="cost-tag">Cost: 8,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-btn">8. Compartments & Upgrades</button>
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

                <div class="accordion-item">
                    <button class="accordion-btn">9. Auxiliary Craft & Bays</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="auxiliary" value="none" checked>
                                    <span class="card-content">
                                        <strong>None</strong>
                                        <span>No auxiliary bays.</span>
                                        <span class="cost-tag">Cost: 0 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="auxiliary" value="kites">
                                    <span class="card-content">
                                        <strong>Boarding-Kites</strong>
                                        <span>Assault gliders (150ft range).</span>
                                        <span class="cost-tag">Cost: 1,500 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="auxiliary" value="divebells">
                                    <span class="card-content">
                                        <strong>Dive-Bells</strong>
                                        <span>Deep-sea armored pods.</span>
                                        <span class="cost-tag">Cost: 5,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <button class="accordion-btn">10. Crew Complement</button>
                    <div class="accordion-panel">
                        <div class="config-group">
                            <div class="radio-grid">
                                <label class="radio-card">
                                    <input type="radio" name="crew" value="standard" checked>
                                    <span class="card-content">
                                        <strong>Standard Hired Crew</strong>
                                        <span>Basic subterranean sailors.</span>
                                        <span class="cost-tag">Cost: 0 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="crew" value="skeletal">
                                    <span class="card-content">
                                        <strong>Skeletal Laborers</strong>
                                        <span>Tireless undead, clumsy.</span>
                                        <span class="cost-tag">Cost: 1,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="crew" value="sablehook">
                                    <span class="card-content">
                                        <strong>Sablehook Smugglers</strong>
                                        <span>Advantage dealing with underworld.</span>
                                        <span class="cost-tag">Cost: 3,000 gp</span>
                                    </span>
                                </label>
                                <label class="radio-card">
                                    <input type="radio" name="crew" value="thessalan">
                                    <span class="card-content">
                                        <strong>Thessalan Mutants</strong>
                                        <span>Auto-grapple during boarding.</span>
                                        <span class="cost-tag">Cost: 4,000 gp</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
'''

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the inner accordions 2 through 5 with our new 2 through 10
pattern = re.compile(r'<div class="accordion-item">\s*<button class="accordion-btn">2\. Propulsion System(.*?)(?=<div class="action-row">)', re.DOTALL)
new_text = pattern.sub(new_accordions, text)

with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("HTML Updated Part 2")
