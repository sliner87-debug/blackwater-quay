const fs = require("fs");
const path = require("path");

function getCrc32(buffer) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buffer.length; i++) {
        crc ^= buffer[i];
        for (let j = 0; j < 8; j++) {
            crc = (crc & 1) ? (crc >>> 1) ^ 0xEDB88320 : (crc >>> 1);
        }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
}

function createTextChunk(keyword, text) {
    const data = Buffer.concat([Buffer.from(keyword, "utf8"), Buffer.from([0]), Buffer.from(text, "utf8")]);
    const lengthBuf = Buffer.alloc(4);
    lengthBuf.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from("tEXt", "ascii");
    const crcData = Buffer.concat([typeBuf, data]);
    const crcVal = getCrc32(crcData);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([lengthBuf, crcData, crcBuf]);
}

const defaultTemplate = fs.readFileSync("h:\\Antigravity\\Novel\\default_Seraphina.png");

const inputFile = "C:\\Users\\sline\\.gemini\\antigravity\\brain\\ffe33a21-3cba-4d80-832e-d82c24f9cc45\\scratch\\SillyTavern_Characters_Import_v2.json";
const outDir = "h:\\Antigravity\\Novel\\Character_PNGs_v2";
const imagesDir = "h:\\Antigravity\\Novel\\Character_Portraits";

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf-8"));
const allImages = fs.readdirSync(imagesDir);

data.forEach(char => {
    let templatePng = defaultTemplate;
    
    // Find canon image
    const charNameLower = (char.name || "").toLowerCase();
    const canonImages = allImages.filter(f => f.toLowerCase().startsWith(charNameLower + "_canon_") && f.endsWith(".png"));
    if (canonImages.length > 0) {
        const bestImage = canonImages[0];
        
        console.log(`Using canon image ${bestImage} for ${char.name}`);
        templatePng = fs.readFileSync(path.join(imagesDir, bestImage));
    } else {
        console.log(`No canon image found for ${char.name}, using default.`);
    }

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
    
    const base64Data = Buffer.from(JSON.stringify(charData), "utf8").toString("base64");
    const textChunk = createTextChunk("chara", base64Data);
    
    const IEND = Buffer.from([0,0,0,0, 0x49,0x45,0x4E,0x44, 0xAE,0x42,0x60,0x82]);
    const hexParts = templatePng.toString("hex").split(IEND.toString("hex"));
    
    // Inject just before IEND
    const pngData = Buffer.from(hexParts[0] + textChunk.toString("hex") + IEND.toString("hex"), "hex");
    
    const safeName = (char.name || "Unknown").replace(/[^a-z0-9]/gi, "_");
    fs.writeFileSync(path.join(outDir, `${safeName}.png`), pngData);
});
console.log("Done");

