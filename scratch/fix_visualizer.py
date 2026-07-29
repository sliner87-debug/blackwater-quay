import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I will completely replace the auto-visualizer div.
new_visualizer = '''<div id="auto-visualizer" style="position: relative; width: 400px; height: 400px; margin: 0 auto 20px auto; background-color: #000000; border: 2px solid #38bdf8; border-radius: 8px; box-shadow: 0 0 15px rgba(56,189,248,0.2); overflow: hidden;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #475569; font-style: italic; z-index: 0; text-align: center;">Vessel Assembly...<br><span style="font-size: 0.8em">Select a Hull Chassis</span></div>
                    
                    <!-- Hull: Base layer, takes up most of the space -->
                    <img id="vis-layer-hull" src="" style="position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; object-fit: contain; z-index: 1; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; pointer-events: none;">
                    
                    <!-- Propulsion: Placed at the stern (bottom) -->
                    <img id="vis-layer-propulsion" src="" style="position: absolute; bottom: 0%; left: 25%; width: 50%; height: 35%; object-fit: contain; z-index: 2; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; pointer-events: none;">
                    
                    <!-- Core: Placed in the aft-center -->
                    <img id="vis-layer-core" src="" style="position: absolute; bottom: 15%; left: 35%; width: 30%; height: 30%; object-fit: contain; z-index: 3; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; pointer-events: none;">
                    
                    <!-- Weapon 1: Primary weapon, front-center -->
                    <img id="vis-layer-weapon1" src="" style="position: absolute; top: 20%; left: 35%; width: 30%; height: 30%; object-fit: contain; z-index: 5; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; pointer-events: none;">
                    
                    <!-- Weapon 2: Secondary weapon, port side (left) -->
                    <img id="vis-layer-weapon2" src="" style="position: absolute; top: 40%; left: 15%; width: 25%; height: 25%; object-fit: contain; z-index: 6; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; pointer-events: none;">
                    
                    <!-- Weapon 3: Tertiary weapon, starboard side (right) -->
                    <img id="vis-layer-weapon3" src="" style="position: absolute; top: 40%; right: 15%; width: 25%; height: 25%; object-fit: contain; z-index: 7; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; pointer-events: none;">
                    
                    <!-- Figurehead: Prow (top center) -->
                    <img id="vis-layer-figurehead" src="" style="position: absolute; top: -2%; left: 35%; width: 30%; height: 30%; object-fit: contain; z-index: 8; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; pointer-events: none;">
                    
                    <!-- Armor: Energy shields or plating covering the whole ship -->
                    <img id="vis-layer-armor" src="" style="position: absolute; top: 5%; left: 5%; width: 90%; height: 90%; object-fit: contain; z-index: 9; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s; pointer-events: none;">
                </div>'''

# Use regex to replace the existing auto-visualizer
html = re.sub(r'<div id="auto-visualizer".*?</div>\s*</div>', new_visualizer + '\n                <div id="statblock-container" class="statblock hidden">', html, flags=re.DOTALL)
# Wait, my regex might be greedy and eat the statblock-container or more. 
# Let's do a safer replacement by finding the div explicitly.
