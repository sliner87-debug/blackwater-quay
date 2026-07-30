document.addEventListener('DOMContentLoaded', () => {
    const factions = ['thessalan', 'covenant', 'crimson', 'ironborn'];
    
    function updateFaction(faction) {
        const slider = document.getElementById(`slider-${faction}`);
        const scoreDisplay = document.getElementById(`score-${faction}`);
        const tierDisplay = document.getElementById(`tier-${faction}`);
        const perkDisplay = document.getElementById(`perk-${faction}`);
        
        let score = parseInt(slider.value);
        scoreDisplay.textContent = score;
        
        let tier = "";
        let color = "";
        let perk = "";
        
        if (score <= -20) {
            tier = "Hunted (Hostile)";
            color = "#ef4444"; // red
            perk = "Assassins and hit squads are actively searching for the party. Safe rests are impossible in their territory.";
        } else if (score < 0) {
            tier = "Shunned (Unfriendly)";
            color = "#f97316"; // orange
            perk = "Merchants charge 50% more. Guards will harass and detain the party on sight.";
        } else if (score < 5) {
            tier = "Unknown (Neutral)";
            color = "#94a3b8"; // gray
            perk = "No special perks or penalties. The faction ignores you.";
        } else if (score < 15) {
            tier = "Recognized (Friendly)";
            color = "#10b981"; // green
            perk = "Access to basic faction services, safehouses, and a 10% discount at aligned merchants.";
        } else {
            tier = "Exalted (Allied)";
            color = "#3b82f6"; // blue
            perk = "Access to the faction leader, restricted magic items, and a squad of reinforcements upon request.";
        }
        
        tierDisplay.textContent = tier;
        tierDisplay.style.color = color;
        perkDisplay.textContent = perk;
    }
    
    factions.forEach(f => {
        const slider = document.getElementById(`slider-${f}`);
        if(slider) {
            slider.addEventListener('input', () => updateFaction(f));
            updateFaction(f); // Initialize
        }
    });
});
