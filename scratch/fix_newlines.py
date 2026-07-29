import os
import glob

base_dir = "h:/Antigravity/Novel"

target_files = [
    "index.html",
    "shipyard.html",
    "master_novel_complete.html",
    "blackwater_quay_codex.html",
    "Campaign_Module/The_Bleeding_Needle_Vessel_Manual.html",
    "Campaign_Module/The_Deepmind_Tear_Master_Module.html",
    "Campaign_Module/The_Onyx_Wake_Vessel_Manual.html",
    "Campaign_Module/Act_IV_Descent_into_the_Deepmind_Annex.html"
]

for rel_path in target_files:
    full_path = os.path.join(base_dir, rel_path)
    if not os.path.exists(full_path):
        continue
        
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace literal \n with real newline
    content = content.replace(r"\n", "\n")
    
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed literal backslash-n")
