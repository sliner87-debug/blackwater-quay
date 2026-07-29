import re

# We will read shipyard.html and replace the select blocks and checkbox blocks with expanded versions
with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    html = f.read()

chassis_options = '''                        <option value="skiff" selected>Sluice-Skiff (2,000 gp | HPt: 2)</option>
                        <option value="corpseraft">Corpse-Raft (1,000 gp | HPt: 1)</option>
                        <option value="catamaran">Smuggler's Catamaran (3,500 gp | HPt: 3)</option>
                        <option value="gunboat">Assault Gunboat (6,000 gp | HPt: 4)</option>
                        <option value="pinnace">Smuggler's Pinnace (8,000 gp | HPt: 5)</option>
                        <option value="abolethskiff">Aboleth Skiff (9,000 gp | HPt: 4)</option>
                        <option value="xoriatjunk">Xoriat War-Junk (10,000 gp | HPt: 5)</option>
                        <option value="submersible">Deep-Sea Submersible (12,000 gp | HPt: 3)</option>
                        <option value="trenchcrawler">Deep-Trench Crawler (14,000 gp | HPt: 4)</option>
                        <option value="clipper">Aether-Clipper (15,000 gp | HPt: 5)</option>
                        <option value="galleon">Ironclad Galleon (10,000 gp | HPt: 6)</option>
                        <option value="sahuaginraider">Sahuagin Raider (11,000 gp | HPt: 5)</option>
                        <option value="aetherfrigate">Aether-Frigate (16,000 gp | HPt: 7)</option>
                        <option value="leviathan">Leviathan Hunter (18,000 gp | HPt: 8)</option>
                        <option value="necropolis">Necropolis Ark (22,000 gp | HPt: 9)</option>
                        <option value="dreadnought">Subterranean Dreadnought (25,000 gp | HPt: 10)</option>
                        <option value="nautiloid">Illithid Nautiloid (45,000 gp | HPt: 8)</option>
                        <option value="flagship">Sovereign Flagship (100,000 gp | HPt: 15)</option>
                        <option value="behemoth">Behemoth-Class Juggernaut (150,000 gp | HPt: 20)</option>
                        <option value="custom">-- Custom Blueprint --</option>'''

html = re.sub(r'(<select id="select-chassis">).*?(</select>)', r'\1\n' + chassis_options + r'\n\2', html, flags=re.DOTALL)


material_options = '''                        <option value="standard" selected>Standard Oak (0 gp)</option>
                        <option value="darkwood">Darkwood (3,000 gp)</option>
                        <option value="iron">Deep-Iron (5,000 gp)</option>
                        <option value="aetherglass">Aetherglass (8,000 gp)</option>
                        <option value="ghostwood">Ghostwood (6,000 gp)</option>
                        <option value="boneplating">Bone-Plating (4,000 gp)</option>
                        <option value="coralgrowth">Coral-Growth (5,500 gp)</option>
                        <option value="nullsteel">Null-Steel (10,000 gp)</option>'''
html = re.sub(r'(<select id="select-material">).*?(</select>)', r'\1\n' + material_options + r'\n\2', html, flags=re.DOTALL)


core_options = '''                        <option value="none" selected>Standard Furnace (0 gp)</option>
                        <option value="elemental">Bound Fire Elemental (5,000 gp)</option>
                        <option value="necrotic">Necrotic Soul-Engine (7,000 gp)</option>
                        <option value="psionic">Psionic Resonator (8,000 gp)</option>
                        <option value="chronal">Chronal Core (12,000 gp)</option>
                        <option value="radiant">Radiant Core (9,000 gp)</option>
                        <option value="shadowvortex">Shadow-Vortex (8,500 gp)</option>
                        <option value="feyspark">Fey-Spark (6,000 gp)</option>
                        <option value="boundfiend">Bound-Fiend Engine (10,000 gp)</option>
                        <option value="clockwork">Clockwork Heart (7,500 gp)</option>'''
html = re.sub(r'(<select id="select-core">).*?(</select>)', r'\1\n' + core_options + r'\n\2', html, flags=re.DOTALL)


prop_options = '''                        <option value="standard" selected>Standard Rigging (0 gp)</option>
                        <option value="sails">Aether-Sails (2,500 gp)</option>
                        <option value="thrusters">Alchemical Thrusters (4,000 gp)</option>
                        <option value="void">Void-Wake Generator (8,000 gp)</option>
                        <option value="oarbanks">Oar-Banks (1,000 gp)</option>
                        <option value="waterjets">Water-Jet Siphons (3,500 gp)</option>
                        <option value="teleport">Teleportation Matrix (15,000 gp)</option>
                        <option value="tentacles">Tentacle Appendages (6,000 gp)</option>'''
html = re.sub(r'(<select id="select-propulsion">).*?(</select>)', r'\1\n' + prop_options + r'\n\2', html, flags=re.DOTALL)


armor_options = '''                        <option value="none" selected>No Armor (0 gp)</option>
                        <option value="plated">Mithral Plating (5,000 gp)</option>
                        <option value="ablative">Ablative Carapace (4,000 gp)</option>
                        <option value="reflective">Arcane Reflective Hull (8,000 gp)</option>
                        <option value="spiked">Spiked Carapace (4,500 gp)</option>
                        <option value="energyshield">Energy-Shield Matrix (9,000 gp)</option>
                        <option value="chameleon">Chameleon Hull (6,500 gp)</option>
                        <option value="slime">Slime-Coated (3,500 gp)</option>'''
html = re.sub(r'(<select id="select-armor">).*?(</select>)', r'\1\n' + armor_options + r'\n\2', html, flags=re.DOTALL)


fig_options = '''                        <option value="none" selected>None (0 gp)</option>
                        <option value="dragon">Dragon\'s Breath (3,000 gp)</option>
                        <option value="banshee">Wailing Banshee (4,500 gp)</option>
                        <option value="beholder">Beholder\'s Eye (6,000 gp)</option>
                        <option value="medusa">Medusa Visage (5,000 gp)</option>
                        <option value="kraken">Kraken Tentacles (4,000 gp)</option>
                        <option value="siren">Siren\'s Call (3,500 gp)</option>
                        <option value="gargoyle">Gargoyle Ward (4,000 gp)</option>'''
html = re.sub(r'(<select id="select-figurehead">).*?(</select>)', r'\1\n' + fig_options + r'\n\2', html, flags=re.DOTALL)

weapon_options = '''                        <option value="none" selected>None (0 gp)</option>
                        <option value="ballista">Heavy Ballista (2,000 gp | HPt: 2)</option>
                        <option value="trebuchet">Fletched Trebuchet (4,000 gp | HPt: 4)</option>
                        <option value="disruptor">Githyanki Disruptor (5,000 gp | HPt: 2)</option>
                        <option value="spellcannon">Arcane Spell-Cannon (8,000 gp | HPt: 3)</option>
                        <option value="lightning">Lightning Emitter (6,000 gp | HPt: 3)</option>
                        <option value="gatling">Eldritch Gatling (7,500 gp | HPt: 2)</option>
                        <option value="voidrift">Void-Rift Projector (12,000 gp | HPt: 5)</option>
                        <option value="necrotic">Necrotic Torpedo (9,000 gp | HPt: 4)</option>
                        <option value="harpoon">Harpoon Cannon (3,000 gp | HPt: 2)</option>
                        <option value="acidspitter">Acid-Spitter (4,500 gp | HPt: 3)</option>
                        <option value="sonic">Sonic Resonator (6,500 gp | HPt: 3)</option>
                        <option value="mindflayer">Mind-Flayer Beam (10,000 gp | HPt: 4)</option>
                        <option value="magmamortar">Magma Mortar (8,500 gp | HPt: 5)</option>
                        <option value="cryocaster">Cryo-Caster (7,000 gp | HPt: 3)</option>
                        <option value="ghostfire">Ghost-Fire Projector (9,500 gp | HPt: 3)</option>
                        <option value="swarmpod">Clockwork Swarm-Pod (5,500 gp | HPt: 2)</option>
                        <option value="minelayer">Gravitic Mine-Layer (8,000 gp | HPt: 4)</option>'''
html = re.sub(r'(<select id="select-weapon">).*?(</select>)', r'\1\n' + weapon_options + r'\n\2', html, flags=re.DOTALL)


cm_options = '''                        <option value="none" selected>None (0 gp)</option>
                        <option value="smokescreen">Alchemical Smokescreen (1,500 gp)</option>
                        <option value="flare">Aether-Flare (2,000 gp)</option>
                        <option value="shield">Kinetic Deflector Shield (5,000 gp)</option>
                        <option value="chaff">Chaff Dispenser (2,500 gp)</option>
                        <option value="aetherpulse">Aether-Pulse (4,500 gp)</option>
                        <option value="decoy">Decoy Beacon (3,000 gp)</option>
                        <option value="mirrorimage">Mirror-Image Generator (6,000 gp)</option>'''
html = re.sub(r'(<select id="select-countermeasure">).*?(</select>)', r'\1\n' + cm_options + r'\n\2', html, flags=re.DOTALL)


aux_options = '''                        <option value="none" selected>None (0 gp)</option>
                        <option value="lifeboat">Armored Lifeboat (1,000 gp)</option>
                        <option value="boarding">Boarding Torpedo (2,500 gp)</option>
                        <option value="diving">Diving Bell (2,000 gp)</option>
                        <option value="scoutdrone">Scout Drone (3,000 gp)</option>
                        <option value="torpedosled">Torpedo-Sled (3,500 gp)</option>
                        <option value="repairskiff">Repair-Skiff (2,800 gp)</option>
                        <option value="assaultpod">Assault-Pod (4,000 gp)</option>'''
html = re.sub(r'(<select id="select-auxiliary">).*?(</select>)', r'\1\n' + aux_options + r'\n\2', html, flags=re.DOTALL)

crew_options = '''                        <option value="standard" selected>Standard Hired Crew (0 gp)</option>
                        <option value="skeletal">Skeletal Laborers (1,000 gp)</option>
                        <option value="sablehook">Sablehook Smugglers (3,000 gp)</option>
                        <option value="thessalan">Thessalan Mutants (4,000 gp)</option>
                        <option value="construct">Construct Automatons (5,000 gp)</option>
                        <option value="merfolk">Merfolk Mercenaries (3,500 gp)</option>
                        <option value="cultist">Cultist Fanatics (2,000 gp)</option>
                        <option value="ghost">Ghost-Crew (6,000 gp)</option>'''
html = re.sub(r'(<select id="select-crew">).*?(</select>)', r'\1\n' + crew_options + r'\n\2', html, flags=re.DOTALL)


exotic_options = '''                    <h4 style="margin-bottom: 10px;">Exotic Upgrades (Multiple allowed)</h4>
                    <div class="checkbox-grid" style="display: grid; grid-template-columns: 1fr; gap: 5px;">
                        <label><input type="checkbox" class="cb-upgrade" value="smuggler"> Smuggler's Hold (2,000 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="biolab"> Biomancer's Lab (5,000 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="brig"> Null-Brig (4,000 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="chronal"> Chronal Engine (4,000 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="vats"> Thessalan Vats (2,500 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="triweave"> Tri-Weave Cloaking (6,000 gp | HPt: 2)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="falsekeel"> False Keel (3,500 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="vampirichull"> Vampiric Hull (7,000 gp | HPt: 2)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="aethertether"> Aether-Tether (4,500 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="dimensionalanchor"> Dimensional Anchor (8,000 gp | HPt: 2)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="symbiotichelm"> Symbiotic Helm (5,500 gp | HPt: 1)</label>
                        <label><input type="checkbox" class="cb-upgrade" value="alchemicaldistillery"> Alchemical Distillery (3,000 gp | HPt: 1)</label>
                    </div>
                    <div id="desc-upgrades" class="item-desc" style="display: none; margin-top: 15px;"></div>'''
html = re.sub(r'<h4 style="margin-bottom: 10px;">Exotic Upgrades.*?</div>\s*</div>', exotic_options + '\n                </div>', html, flags=re.DOTALL)


with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated HTML")
