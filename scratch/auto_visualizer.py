import re

with open('h:/Antigravity/Novel/shipyard.html', 'r', encoding='utf-8') as f:
    html = f.read()

visualizer_html = '''<div class="export-panel">
                <div id="auto-visualizer" style="position: relative; width: 400px; height: 400px; margin: 0 auto 20px auto; background-color: #000000; border: 2px solid #38bdf8; border-radius: 8px; box-shadow: 0 0 15px rgba(56,189,248,0.2);">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #475569; font-style: italic; z-index: 0; text-align: center;">Vessel Assembly...<br><span style="font-size: 0.8em">Select a Hull Chassis</span></div>
                    <img id="vis-layer-hull" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 1; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s;">
                    <img id="vis-layer-core" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 2; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s;">
                    <img id="vis-layer-armor" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 3; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s;">
                    <img id="vis-layer-propulsion" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 4; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s;">
                    <img id="vis-layer-weapon1" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 5; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s;">
                    <img id="vis-layer-weapon2" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 6; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s;">
                    <img id="vis-layer-weapon3" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 7; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s;">
                    <img id="vis-layer-figurehead" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 8; mix-blend-mode: screen; opacity: 0; transition: opacity 0.3s;">
                </div>
'''
html = html.replace('<div class="export-panel">', visualizer_html)

with open('h:/Antigravity/Novel/shipyard.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("HTML updated")
