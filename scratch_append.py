
import sys

content = """

---

## 11. REEDSINGER (Hollow Stag) — CR 5
*A massive skeletal stag whose ribcage is filled with hollow, flute-like bone growths. When the wind blows through it, or when it exhales, it plays a haunting, psychic melody that lures prey into the deep swamps.*

*   **Size/Type:** Large Undead (Fey-Touched)
*   **Hit Dice:** 7d12 (45 hp)
*   **Initiative:** +2
*   **Speed:** 50 ft.
*   **Armor Class:** 17 (-1 size, +2 Dex, +6 natural), touch 11, flat-footed 15
*   **Base Attack/Grapple:** +3/+11
*   **Attacks:** Gore +7 melee (2d6+6) and 2 Hooves +2 melee (1d4+2)
*   **Special Attacks:** 
    *   *Captivating Song (Su):* A 60-ft spread. Will DC 15 negates. Those who fail are captivated and walk toward the stag.
*   **Special Qualities:** Undead traits, Damage Reduction 5/Bludgeoning.
*   **Saves:** Fort +2, Ref +4, Will +6
*   **Abilities:** Str 18, Dex 14, Con -, Int 2, Wis 12, Cha 16
*   **Feats:** Run, Dodge, Mobility.

---

## 12. DIRE DISPLACER RHINO (Consortium Siege-Beast) — CR 12
*A terrifying fusion of rhinoceros bulk and displacer-beast bio-mechanics. Grown in the Fleshwarped Foundry, it sports four razor-sharp tentacles and a massive adamantine horn.*

*   **Size/Type:** Huge Aberration
*   **Hit Dice:** 15d8+105 (172 hp)
*   **Initiative:** +0
*   **Speed:** 40 ft.
*   **Armor Class:** 25 (-2 size, +17 natural), touch 8, flat-footed 25
*   **Base Attack/Grapple:** +11/+29
*   **Attacks:** Gore +19 melee (2d8+15) and 4 Tentacles +14 melee (1d8+5)
*   **Special Attacks:** 
    *   *Trample (Ex):* 2d8+15, Reflex DC 27 half.
    *   *Adamantine Horn (Ex):* Its gore attack ignores hardness less than 20 and bypasses DR as adamantine.
*   **Special Qualities:** Displacement (50% miss chance), Scent, DR 10/Magic.
*   **Saves:** Fort +12, Ref +5, Will +10
*   **Abilities:** Str 30, Dex 10, Con 24, Int 2, Wis 12, Cha 6
*   **Feats:** Improved Bull Rush, Power Attack, Awesome Blow.

---

## 13. CEREBRILITH (Psionic Demon) — CR 10
*A massive demonic brute whose exposed, pulsating brain crackles with psionic energy. A mercenary of the Void.*

*   **Size/Type:** Large Outsider (Chaotic, Demon, Evil, Extraplanar, Psionic)
*   **Hit Dice:** 9d8+63 (103 hp)
*   **Initiative:** +1
*   **Speed:** 30 ft.
*   **Armor Class:** 25 (-1 size, +1 Dex, +15 natural), touch 10, flat-footed 24
*   **Base Attack/Grapple:** +9/+19
*   **Attacks:** Bite +14 melee (1d8+6) and 2 Claws +12 melee (1d6+3)
*   **Special Attacks:** 
    *   *Psi-Like Abilities:* ML 9th. At will—*brain lock, detect psionics, ego whip, id insinuation, mind trap*. 3/day—*psionic dominate*. 1/day—*mind thrust*.
*   **Special Qualities:** Damage reduction 10/good, darkvision 60 ft., immunity to electricity and poison, resistance to acid 10, cold 10, and fire 10, spell resistance 20, telepathy 100 ft.
*   **Saves:** Fort +13, Ref +7, Will +8
*   **Abilities:** Str 22, Dex 13, Con 25, Int 15, Wis 14, Cha 14

---

## 14. SCOUR-HARROW — CR 8
*A horrifying amalgam of rusty blades, iron chains, and necrotic sludge, animated by tortured souls.*

*   **Size/Type:** Large Construct
*   **Hit Dice:** 10d10+30 (85 hp)
*   **Initiative:** -1
*   **Speed:** 20 ft.
*   **Armor Class:** 20 (-1 size, -1 Dex, +12 natural), touch 8, flat-footed 20
*   **Base Attack/Grapple:** +7/+17
*   **Attacks:** 2 Blade-Slams +12 melee (2d6+6/19-20 plus bleed)
*   **Special Attacks:** 
    *   *Whirlwind of Ruin (Ex):* 1/day, it can spin violently, dealing 4d6+6 damage to all creatures within 10 ft (Reflex DC 15 half).
    *   *Bleed (Ex):* Attacks cause a bleeding wound taking 1d4 damage each round.
*   **Special Qualities:** Construct traits, DR 5/Adamantine.
*   **Saves:** Fort +3, Ref +2, Will +3
*   **Abilities:** Str 23, Dex 8, Con -, Int -, Wis 11, Cha 1

---

## 15. LARKLET & CINDER (Artificer Constructs) — CR 4 (each)
*Larklet is a clockwork songbird made of polished brass that scouts and relays audio. Cinder is a heavily-armored mechanical badger that digs through fortifications.*

*   **Size/Type:** Tiny / Small Construct (Mechanical)
*   **Hit Dice:** 4d10 (22 hp) / 6d10+10 (43 hp)
*   **Attacks:** Larklet: Razor Wings +7 melee (1d4) / Cinder: Drill-Bite +8 melee (1d8+4)
*   **Special Qualities:** 
    *   *Larklet:* Fly 60 ft (perfect). *Sonic Screech* (15-ft cone, 2d6 sonic, DC 12 Fort or deafened).
    *   *Cinder:* Burrow 20 ft. *Adamantine Drill* (Ignores hardness < 15).

---

## 16. AURELION (Warding Construct) — CR 9
*A floating, spherical astrolabe constructed of overlapping golden rings, pulsating with abjuration magic.*

*   **Size/Type:** Medium Construct
*   **Hit Dice:** 11d10+20 (80 hp)
*   **Speed:** Fly 40 ft (perfect)
*   **Armor Class:** 24 (+4 Dex, +10 natural), touch 14, flat-footed 20
*   **Special Attacks:** 
    *   *Force Pulse (Su):* 30-ft radius burst, 6d6 force damage and pushed 10 ft back (Reflex DC 17 half/no push).
*   **Special Qualities:** Construct traits, Fast Healing 5, SR 20, permanent *Globe of Invulnerability (Lesser)*.

---

## 17. MANTA (Planar Membrane Beast) — CR 11
*A translucent, ray-like creature that swims through the air and between dimensional layers, feeding on psychic echoes.*

*   **Size/Type:** Huge Magical Beast (Extraplanar)
*   **Hit Dice:** 13d10+52 (123 hp)
*   **Speed:** Fly 60 ft (good)
*   **Armor Class:** 22 (-2 size, +6 Dex, +8 natural), touch 14, flat-footed 16
*   **Attacks:** Tail Sting +18 melee (2d6+7 plus poison) and 2 Wings +13 melee (1d8+3)
*   **Special Attacks:** 
    *   *Psychic Poison (Ex):* Fort DC 20; 1d4 Int damage / 1d4 Int damage.
    *   *Ethereal Jaunt (Su):* At will as a free action.
*   **Special Qualities:** Blindsight 60 ft.
"""

with open(r"h:\Antigravity\Novel\Campaign_Module\monsters.md", "a", encoding="utf-8") as f:
    f.write(content)
print("Monsters appended successfully.")

