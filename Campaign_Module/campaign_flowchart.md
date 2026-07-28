# Blackwater Quay: Campaign Flowchart

To assist Game Masters in navigating the non-linear structure of Blackwater Quay, use the following flowchart and milestone leveling guide.

## Visual Flowchart

```mermaid
graph TD
    Start[Arrival in the Quay] --> Act1
    Act1[Act I: Whispers in the Sluices] -->|Gain Sablehook Trust| Hub[The Sablehook Vaults]
    Act1 -->|Fail Sablehook Check| Alt1[Captured by Templars]
    Alt1 --> Hub
    
    Hub --> Act2[Act II: The Fleshwarped Foundry]
    Hub --> Act3[Act III: Crimson Sails Over the Quay]
    
    Act2 -->|Discover the Resonance| Act4
    Act3 -->|Secure the Shroud| Act4
    
    Act4[Act IV: Descent into the Deepmind Annex] --> Ending1[The Bleeding Dawn - Surface Saved, Quay Burned]
    Act4 --> Ending2[The Sovereign's Reign - Quay Saved, Static Leaks]
    Act4 --> Ending3[The Xoriat Fracture - Total Failure]
```

## Milestone Leveling Guide
The campaign is designed to take characters from Level 5 to Level 10. Rather than tracking experience points (XP), characters level up upon completing significant narrative milestones.

*   **Level 5:** Characters begin the campaign at Level 5.
*   **Level 6:** Achieved upon completing **Act I**, successfully delivering the smuggled goods and earning an audience with Banki.
*   **Level 7:** Achieved after completing the first major faction questline (either dismantling a Thessalan Vat in **Act II** or repelling a Githyanki boarding party in **Act III**).
*   **Level 8:** Achieved after completing the second major faction questline (whichever Act the party did not complete for Level 7).
*   **Level 9:** Achieved upon breaching the Tri-Weave Shroud and entering the Deepmind Annex in **Act IV**.
*   **Level 10:** Achieved if the players survive the final confrontation at the Elder Node. 

## Failure States & Failing Forward
If the players "fail" an objective, the campaign does not end.
*   **Failing Act I:** If the players lose the smuggled goods, they are conscripted by the Templars as expendable scouts (Route `Alt1`), changing their starting faction from Sablehook to Covenant & Crown.
*   **Failing Act II/III:** If the players are defeated in the mid-game acts, they are captured. They must execute a prison break, but the enemy faction gains +2 Syndicate Victory Points, increasing the difficulty of Act IV.
