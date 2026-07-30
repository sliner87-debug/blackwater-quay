// graft_visualizer.js
// Logic for the Biomancer's Operating Table

const graftData = {
    core: {
        none: { name: "Organic Heart", hp: 0, ac: 0, desc: "" },
        steam: { name: "Steam-Powered Boiler", hp: 15, ac: 1, desc: "<strong>Steam Engine:</strong> You no longer need to breathe. You have advantage on Constitution saving throws against exhaustion." },
        bio: { name: "Mutated Alchemical Gland", hp: 10, ac: 0, desc: "<strong>Acid Blood:</strong> When you take slashing or piercing damage, creatures within 5 ft take 1d6 acid damage." },
        void: { name: "Void-Crystal Engine", hp: 5, ac: 2, desc: "<strong>Shadow Siphon:</strong> When you drop a creature to 0 HP, you regain 2d6 temporary hit points." }
    },
    eye: {
        none: { name: "Organic Eyes", hp: 0, ac: 0, desc: "" },
        runic: { name: "Golden Runic Eye", hp: 0, ac: 0, desc: "<strong>Arcane Sight:</strong> You can cast Detect Magic at will, without expending a spell slot." },
        chronal: { name: "Chronal Monocle", hp: 0, ac: 0, desc: "<strong>Time Dilation:</strong> You gain a +2 bonus to Initiative rolls." },
        void: { name: "Abyssal Shadow Orb", hp: 0, ac: 0, desc: "<strong>Void Gaze:</strong> You gain Darkvision out to 120 ft and can see through magical darkness." }
    },
    arm: {
        none: { name: "Organic Arm", hp: 0, ac: 0, desc: "" },
        clockwork: { name: "Brass Clockwork Limb", hp: 5, ac: 1, desc: "<strong>Crushing Grip:</strong> Your unarmed strikes deal 1d6 bludgeoning damage. You have advantage on Athletics checks to grapple." },
        necrotic: { name: "Necrotic Fleshwarped Claw", hp: 0, ac: 0, desc: "<strong>Rotting Touch:</strong> Unarmed strikes deal 1d4 slashing + 1d4 necrotic damage. Targets hit cannot regain HP until start of your next turn." },
        aether: { name: "Aether-Infused Gauntlet", hp: 0, ac: 1, desc: "<strong>Arcane Deflection:</strong> You can use your reaction to add +2 to your AC against one melee attack that would hit you." }
    }
};

const imageMap = {
    core: {
        steam: "images/graft_core_steam.jpg",
        bio: "images/graft_core_bio.jpg",
        void: "images/graft_core_void.jpg"
    },
    eye: {
        runic: "images/graft_eye_runic.jpg",
        chronal: "images/graft_eye_chronal.jpg",
        void: "images/graft_eye_void.jpg"
    },
    arm: {
        clockwork: "images/graft_arm_clockwork.jpg",
        necrotic: "images/graft_arm_necrotic.jpg",
        aether: "images/graft_arm_aether.jpg"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const selCore = document.getElementById('sel-core');
    const selEye = document.getElementById('sel-eye');
    const selLArm = document.getElementById('sel-l-arm');
    const selRArm = document.getElementById('sel-r-arm');
    const charNameInput = document.getElementById('char-name');
    
    // Layers
    const layerCore = document.getElementById('layer-core');
    const layerEye = document.getElementById('layer-eye');
    const layerLArm = document.getElementById('layer-l-arm');
    const layerRArm = document.getElementById('layer-r-arm');
    
    // Stats
    const statName = document.getElementById('stat-name');
    const statAc = document.getElementById('stat-ac');
    const statHp = document.getElementById('stat-hp');
    const statAbilities = document.getElementById('stat-abilities');

    function updateVisuals() {
        const cVal = selCore.value;
        const eVal = selEye.value;
        const lVal = selLArm.value;
        const rVal = selRArm.value;
        
        // Update images
        if (cVal === 'none') { layerCore.classList.add('hidden'); }
        else { layerCore.src = imageMap.core[cVal]; layerCore.classList.remove('hidden'); }
        
        if (eVal === 'none') { layerEye.classList.add('hidden'); }
        else { layerEye.src = imageMap.eye[eVal]; layerEye.classList.remove('hidden'); }
        
        if (lVal === 'none') { layerLArm.classList.add('hidden'); }
        else { layerLArm.src = imageMap.arm[lVal]; layerLArm.classList.remove('hidden'); }
        
        if (rVal === 'none') { layerRArm.classList.add('hidden'); }
        else { layerRArm.src = imageMap.arm[rVal]; layerRArm.classList.remove('hidden'); }
        
        // Update Stats
        statName.innerText = charNameInput.value || "Unknown Subject";
        
        let baseHp = 30;
        let baseAc = 12;
        let htmlAbilities = "";
        
        // Calculate Core
        if (cVal !== 'none') {
            baseHp += graftData.core[cVal].hp;
            baseAc += graftData.core[cVal].ac;
            htmlAbilities += `<p>${graftData.core[cVal].desc}</p>`;
        }
        
        // Calculate Eye
        if (eVal !== 'none') {
            htmlAbilities += `<p>${graftData.eye[eVal].desc}</p>`;
        }
        
        // Calculate Left Arm
        if (lVal !== 'none') {
            baseHp += graftData.arm[lVal].hp;
            baseAc += graftData.arm[lVal].ac;
            htmlAbilities += `<p>[Left Arm] ${graftData.arm[lVal].desc}</p>`;
        }
        
        // Calculate Right Arm
        if (rVal !== 'none') {
            baseHp += graftData.arm[rVal].hp;
            baseAc += graftData.arm[rVal].ac;
            htmlAbilities += `<p>[Right Arm] ${graftData.arm[rVal].desc}</p>`;
        }
        
        if (htmlAbilities === "") {
            htmlAbilities = "<em>No active grafts installed. Subject is fully organic.</em>";
        }
        
        statAc.innerText = `${baseAc} (Augmented)`;
        statHp.innerText = `${baseHp}`;
        statAbilities.innerHTML = htmlAbilities;
    }

    // Attach listeners
    selCore.addEventListener('change', updateVisuals);
    selEye.addEventListener('change', updateVisuals);
    selLArm.addEventListener('change', updateVisuals);
    selRArm.addEventListener('change', updateVisuals);
    charNameInput.addEventListener('input', updateVisuals);

    // Initial render
    updateVisuals();

    // PDF Export
    document.getElementById('btn-print').addEventListener('click', () => {
        const element = document.getElementById('generated-stats');
        const opt = {
            margin:       0.5,
            filename:     `${charNameInput.value.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_statblock.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    });

    // VTT Export (Foundry Actor JSON format)
    document.getElementById('btn-vtt').addEventListener('click', () => {
        const actorData = {
            "name": charNameInput.value,
            "type": "npc",
            "system": {
                "attributes": {
                    "ac": { "value": parseInt(statAc.innerText) },
                    "hp": { "value": parseInt(statHp.innerText), "max": parseInt(statHp.innerText) }
                },
                "details": {
                    "biography": { "value": statAbilities.innerHTML }
                }
            }
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(actorData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${charNameInput.value.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_vtt.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });
});
