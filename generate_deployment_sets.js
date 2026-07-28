const fs = require("fs");
const path = require("path");
const extract = require("png-chunks-extract");
const encode = require("png-chunks-encode");

const inputFile = "C:\\Users\\sline\\.gemini\\antigravity\\brain\\ffe33a21-3cba-4d80-832e-d82c24f9cc45\\scratch\\SillyTavern_Characters_Import_v2.json";
const imagesDir = "h:\\Antigravity\\Novel\\Character_Portraits";

const outDirIdeal = "h:\\Antigravity\\Novel\\Deployment_Sets\\Ideal_Set_V2_PNGs";
const outDirBackup = "h:\\Antigravity\\Novel\\Deployment_Sets\\Backup_Set";
const outDirManualJson = "h:\\Antigravity\\Novel\\Deployment_Sets\\Manual_Set\\JSON_Only";
const outDirManualImages = "h:\\Antigravity\\Novel\\Deployment_Sets\\Manual_Set\\Images_Only";

const data = JSON.parse(fs.readFileSync(inputFile, "utf-8"));
const allImages = fs.readdirSync(imagesDir);

data.forEach(char => {
    const charNameLower = (char.name || "").toLowerCase();
    const safeName = (char.name || "Unknown").replace(/[^a-z0-9]/gi, "_");
    
    // Find matching true PNG image
    const canonImages = allImages.filter(f => f.toLowerCase().startsWith(charNameLower + "_canon_") && f.endsWith(".png"));
    if (canonImages.length === 0) {
        console.log(`Missing image for ${char.name}, skipping.`);
        return;
    }
    
    const bestImage = canonImages[0];
    const imagePath = path.join(imagesDir, bestImage);
    const imageBuffer = fs.readFileSync(imagePath);
    
    const charData = {
        name: char.name || "",
        description: char.description || "",
        personality: char.personality || "",
        scenario: char.scenario || "",
        first_mes: char.first_mes || "",
        mes_example: char.mes_example || "",
        creator_notes: "Novel Character",
        system_prompt: "",
        post_history_instructions: "",
        tags: ["Novel"],
        creator: "Antigravity",
        character_version: "1.0",
        alternate_greetings: [],
        extensions: {},
        character_book: null
    };
    
    // ==========================================
    // 1. Ideal Set (V2 PNGs)
    // ==========================================
    try {
        const chunks = extract(imageBuffer);
        
        const base64Data = Buffer.from(JSON.stringify(charData), "utf8").toString("base64");
        const keyword = "chara";
        const textData = Buffer.concat([Buffer.from(keyword, "utf8"), Buffer.from([0]), Buffer.from(base64Data, "utf8")]);
        
        const textChunk = {
            name: "tEXt",
            data: textData
        };
        
        // Find position of IHDR (should be 0)
        let insertIndex = chunks.findIndex(c => c.name === "IHDR");
        if (insertIndex === -1) insertIndex = 0;
        else insertIndex++; // Insert directly after IHDR to ensure it precedes IDAT
        
        chunks.splice(insertIndex, 0, textChunk);
        const finalPngBuffer = encode(chunks);
        fs.writeFileSync(path.join(outDirIdeal, `${safeName}.png`), finalPngBuffer);
    } catch (e) {
        console.error(`Error encoding PNG for ${char.name}:`, e);
    }
    
    // ==========================================
    // 2. Backup Set (JSON + PNG together)
    // ==========================================
    fs.writeFileSync(path.join(outDirBackup, `${safeName}.json`), JSON.stringify(charData, null, 2));
    fs.copyFileSync(imagePath, path.join(outDirBackup, `${safeName}.png`));
    
    // ==========================================
    // 3. Manual Set (Separated)
    // ==========================================
    fs.writeFileSync(path.join(outDirManualJson, `${safeName}.json`), JSON.stringify(charData, null, 2));
    fs.copyFileSync(imagePath, path.join(outDirManualImages, `${safeName}.png`));
});
console.log("Generation complete!");
