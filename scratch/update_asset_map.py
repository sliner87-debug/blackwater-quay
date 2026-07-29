import re

with open('h:/Antigravity/Novel/shipyard.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_map = '''const autoAssetMap = {
    // Hulls
    'skiff': 'images/auto_hull_skiff.jpg',
    'corpseraft': 'images/auto_hull_corpse.jpg',
    'catamaran': 'images/auto_hull_catamaran.jpg',
    'gunboat': 'images/auto_hull_gunboat.jpg',
    'pinnace': 'images/auto_hull_pinnace.jpg',
    'abolethskiff': 'images/auto_hull_aboleth.jpg',
    'xoriatjunk': 'images/auto_hull_xoriat.jpg',
    'submersible': 'images/auto_hull_sub.jpg',
    'trenchcrawler': 'images/auto_hull_sub.jpg',
    'clipper': 'images/auto_hull_clipper.jpg',
    'galleon': 'images/auto_hull_galleon.jpg',
    'sahuaginraider': 'images/auto_hull_sahuagin.jpg',
    'aetherfrigate': 'images/auto_hull_frigate.jpg',
    'leviathan': 'images/auto_hull_flagship.jpg', // Alias for now
    'necropolis': 'images/auto_hull_corpse.jpg', // Alias
    'dreadnought': 'images/vtt_hull_dreadnought.jpg', // Keep VTT for now if no custom gen
    'nautiloid': 'images/auto_hull_nautiloid.jpg',
    'flagship': 'images/auto_hull_flagship.jpg',
    'behemoth': 'images/auto_hull_behemoth.jpg',

    // Cores
    'elemental': 'images/auto_core_elemental.jpg',
    'necrotic': 'images/auto_core_necrotic.jpg',
    'psionic': 'images/auto_core_psionic.jpg',
    'chronal': 'images/auto_core_chronal.jpg',
    'radiant': 'images/auto_core_radiant.jpg',
    'shadowvortex': 'images/auto_core_shadow.jpg',
    'feyspark': 'images/auto_core_fey.jpg',
    'boundfiend': 'images/auto_core_fiend.jpg',
    'clockwork': 'images/auto_core_clockwork.jpg',

    // Propulsion
    'sails': 'images/auto_prop_sails.jpg',
    'thrusters': 'images/auto_prop_thrusters.jpg',
    'void': 'images/auto_prop_void.jpg',
    'oarbanks': 'images/auto_prop_oars.jpg',
    'waterjets': 'images/auto_prop_jets.jpg',
    'teleport': 'images/auto_prop_teleport.jpg',
    'tentacles': 'images/auto_prop_tentacles.jpg',

    // Armor
    'plated': 'images/auto_armor_plated.jpg',
    'ablative': 'images/auto_armor_ablative.jpg',
    'reflective': 'images/auto_armor_reflective.jpg',
    'spiked': 'images/auto_armor_spiked.jpg',
    'energyshield': 'images/auto_armor_energy.jpg',
    'chameleon': 'images/auto_armor_chameleon.jpg',
    'slime': 'images/auto_armor_slime.jpg',

    // Figurehead
    'dragon': 'images/auto_fig_dragon.jpg',
    'banshee': 'images/auto_fig_banshee.jpg',
    'beholder': 'images/auto_fig_beholder.jpg',
    'medusa': 'images/auto_fig_medusa.jpg',
    'kraken': 'images/auto_fig_kraken.jpg',
    'siren': 'images/auto_fig_siren.jpg',
    'gargoyle': 'images/auto_fig_gargoyle.jpg',

    // Weapons
    'ballista': 'images/auto_weap_ballista.jpg',
    'trebuchet': 'images/auto_weap_trebuchet.jpg',
    'disruptor': 'images/auto_weap_disruptor.jpg',
    'spellcannon': 'images/auto_weap_spellcannon.jpg',
    'lightning': 'images/auto_weap_lightning.jpg',
    'gatling': 'images/auto_weap_gatling.jpg',
    'voidrift': 'images/auto_weap_voidrift.jpg',
    'necrotic': 'images/auto_weap_necrotic.jpg',
    'harpoon': 'images/auto_weap_harpoon.jpg',
    'acidspitter': 'images/auto_weap_acid.jpg',
    'sonic': 'images/auto_weap_sonic.jpg',
    'mindflayer': 'images/auto_weap_mindflayer.jpg',
    'magmamortar': 'images/auto_weap_magma.jpg',
    'cryocaster': 'images/auto_weap_cryo.jpg',
    'ghostfire': 'images/auto_weap_ghostfire.jpg',
    'swarmpod': 'images/auto_weap_swarm.jpg',
    'minelayer': 'images/auto_weap_mine.jpg'
};'''

js = re.sub(r'const autoAssetMap = \{.*?\};', new_map, js, flags=re.DOTALL)

with open('h:/Antigravity/Novel/shipyard.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Asset Map Updated")
