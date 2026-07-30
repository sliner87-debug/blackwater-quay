// campaign_manager.js
// Centralized Data Persistence for Blackwater Quay TTRPG Suite

class CampaignManager {
    constructor() {
        this.STORAGE_KEY = 'sablehook_campaign';
        this.init();
    }

    init() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) {
            this.state = {
                ships: [],
                fleets: [],
                encounters: [],
                contracts: []
            };
            this.save();
        } else {
            try {
                this.state = JSON.parse(data);
                // Ensure all arrays exist in case of version mismatch
                if (!Array.isArray(this.state.ships)) this.state.ships = [];
                if (!Array.isArray(this.state.fleets)) this.state.fleets = [];
                if (!Array.isArray(this.state.encounters)) this.state.encounters = [];
                if (!Array.isArray(this.state.contracts)) this.state.contracts = [];
            } catch (e) {
                console.error("Failed to parse campaign data, resetting.", e);
                this.state = { ships: [], fleets: [], encounters: [], contracts: [] };
            }
        }
    }

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    }

    // Generic Asset Methods
    saveAsset(type, asset) {
        if (!this.state[type]) return false;
        
        // Give asset a unique ID if it doesn't have one
        if (!asset.id) {
            asset.id = 'asset_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        }
        
        // Check for updates vs creation
        const index = this.state[type].findIndex(a => a.id === asset.id);
        if (index >= 0) {
            this.state[type][index] = asset;
        } else {
            this.state[type].push(asset);
        }
        
        this.save();
        return asset.id;
    }

    deleteAsset(type, id) {
        if (!this.state[type]) return;
        this.state[type] = this.state[type].filter(a => a.id !== id);
        this.save();
    }

    getAsset(type, id) {
        if (!this.state[type]) return null;
        return this.state[type].find(a => a.id === id);
    }

    getAll(type) {
        return this.state[type] || [];
    }

    // Import / Export
    exportJSON() {
        const dataStr = JSON.stringify(this.state, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'sablehook_campaign_' + new Date().toISOString().slice(0,10) + '.json';
        
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    importJSON(jsonString) {
        try {
            const importedData = JSON.parse(jsonString);
            
            // Basic validation
            if (importedData && typeof importedData === 'object') {
                if (importedData.ships) this.state.ships = importedData.ships;
                if (importedData.fleets) this.state.fleets = importedData.fleets;
                if (importedData.encounters) this.state.encounters = importedData.encounters;
                if (importedData.contracts) this.state.contracts = importedData.contracts;
                
                this.save();
                return true;
            }
            return false;
        } catch (e) {
            console.error("Import failed: Invalid JSON", e);
            return false;
        }
    }
}

// Global instance
window.BQCampaign = new CampaignManager();
