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
            danger: "Moderate"
        },
        {
            coords: [h * 0.85, w * 0.60],
            title: "The Northern Sluices",
            desc: "A sprawling network of stone conduits and acid channels. Controlled heavily by the Choir of the Below.",
            faction: "Choir of the Below",
            danger: "Lethal"
        },
        {
            coords: [h * 0.40, w * 0.50],
            title: "Belowmarket Deep",
            desc: "The subterranean black market where Rakshasa brokers and rogue Githyanki trade illicit planar goods.",
            faction: "Neutral / Contested",
            danger: "High"
        },
        {
            coords: [h * 0.50, w * 0.85],
            title: "The Bleeding Needle",
            desc: "Dr. Kael's corsair flagship, docked in the underground harbor. A marvel of displaced architecture.",
            faction: "Dr. Kael / Independent",
            danger: "Variable"
        },
        {
            coords: [h * 0.15, w * 0.40],
            title: "The Deepmind Annex",
            desc: "The deepest accessible point. A non-Euclidean gateway controlled by the Elder Node.",
            faction: "The Elder Node",
            danger: "Extreme"
        }
    ];

    // Add markers to the map
    pois.forEach(poi => {
        const marker = L.marker(poi.coords, { icon: customIcon }).addTo(map);
        
        // Build popup HTML
        const popupContent = `
            <div class="map-popup" style="font-family: 'Inter', sans-serif;">
                <h4 style="margin: 0 0 5px 0; color: #000; font-family: 'Cinzel', serif;">${poi.title}</h4>
                <p style="margin: 0 0 10px 0; color: #333; font-size: 0.9rem;">${poi.desc}</p>
                <div style="background: #f1f5f9; padding: 5px; border-radius: 4px; border-left: 3px solid #d4af37;">
                    <p style="margin: 0; font-size: 0.8rem; color: #475569;"><strong>Faction:</strong> ${poi.faction}</p>
                    <p style="margin: 0; font-size: 0.8rem; color: #ef4444;"><strong>Danger:</strong> ${poi.danger}</p>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });
});
