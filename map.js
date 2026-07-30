// map.js
// Interactive Leaflet Map for Blackwater Quay

document.addEventListener('DOMContentLoaded', function() {
    // Check if map element exists
    const mapElement = document.getElementById('leaflet-map');
    if (!mapElement) return;

    // Initialize map with a custom CRS (Coordinate Reference System) for flat images
    const map = L.map('leaflet-map', {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 2,
        zoomControl: true
    });

    // Dimensions of the base map image
    // Using plate03_district_blackwater_quay.png as a placeholder base map
    const w = 1200;
    const h = 800;

    // Calculate the edges of the image, in coordinate space
    const bounds = [[0, 0], [h, w]];

    // Add the image overlay
    L.imageOverlay('images/plate03_district_blackwater_quay.png', bounds).addTo(map);

    // Tell leaflet that the map is exactly as big as the image
    map.fitBounds(bounds);
    map.setView([h/2, w/2], 0);

    // Custom Icon for Markers
    const customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Define Points of Interest (POIs)
    const pois = [
        {
            coords: [h * 0.75, w * 0.25], // Rough location in top left (y, x)
            title: "Sablehook Vaults",
            desc: "The heavily warded subterranean headquarters of the Sablehook Syndicate. Shielded from planar detection by the Tri-Weave Shroud.",
            faction: "Sablehook Syndicate",
            danger: "Moderate",
            image: "images/plate11_sablehook_secure_vaults.png"
        },
        {
            coords: [h * 0.85, w * 0.60],
            title: "The Northern Sluices",
            desc: "A sprawling network of stone conduits and acid channels. Controlled heavily by the Choir of the Below.",
            faction: "Choir of the Below",
            danger: "Lethal",
            image: "images/plate06_district_dockside_underways.png"
        },
        {
            coords: [h * 0.40, w * 0.50],
            title: "Belowmarket Deep",
            desc: "The subterranean black market where Rakshasa brokers and rogue Githyanki trade illicit planar goods.",
            faction: "Neutral / Contested",
            danger: "High",
            image: "images/plate05_district_registry_market.png"
        },
        {
            coords: [h * 0.50, w * 0.85],
            title: "The Bleeding Needle",
            desc: "Dr. Kael's corsair flagship, docked in the underground harbor. A marvel of displaced architecture.",
            faction: "Dr. Kael / Independent",
            danger: "Variable",
            image: "images/plate04_district_gull_gasket.png"
        },
        {
            coords: [h * 0.15, w * 0.40],
            title: "The Deepmind Annex",
            desc: "The deepest accessible point. A non-Euclidean gateway controlled by the Elder Node.",
            faction: "The Elder Node",
            danger: "Extreme",
            image: "images/plate01_regional_western_approach.png"
        }
    ];

    // Add markers to the map
    pois.forEach(poi => {
        const marker = L.marker(poi.coords, { icon: customIcon }).addTo(map);
        
        // Build popup HTML
        const popupContent = `
            <div class="map-popup" style="font-family: 'Inter', sans-serif; width: 300px;">
                <img src="${poi.image}" alt="${poi.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px; border: 1px solid #94a3b8; margin-bottom: 10px;">
                <h4 style="margin: 0 0 5px 0; color: #0f172a; font-family: 'Cinzel', serif; font-size: 1.2rem;">${poi.title}</h4>
                <p style="margin: 0 0 10px 0; color: #334155; font-size: 0.9rem; line-height: 1.4;">${poi.desc}</p>
                <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; border-left: 3px solid #d4af37; margin-bottom: 10px;">
                    <p style="margin: 0 0 3px 0; font-size: 0.85rem; color: #475569;"><strong>Faction:</strong> ${poi.faction}</p>
                    <p style="margin: 0; font-size: 0.85rem; color: #ef4444;"><strong>Danger:</strong> ${poi.danger}</p>
                </div>
                <div style="display: flex; gap: 8px; font-size: 0.85rem;">
                    <a href="dm_bestiary.html" style="background: #ef4444; color: white; padding: 5px 10px; border-radius: 3px; text-decoration: none; font-weight: bold; flex: 1; text-align: center; border: 1px solid #b91c1c;">⚔️ Encounter</a>
                    <a href="loot_generator.html" style="background: #d4af37; color: white; padding: 5px 10px; border-radius: 3px; text-decoration: none; font-weight: bold; flex: 1; text-align: center; border: 1px solid #bfa031;">💰 Loot</a>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent, { maxWidth: 320 });
    });
});
