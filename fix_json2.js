const fs = require('fs');

function fixAndSave(filePath) {
    let content = fs.readFileSync(filePath + '.failed.js', 'utf-8');
    
    // Fix ]  } ] at the end
    content = content.replace(/\}\s*\]\s*\}\s*\]\s*$/g, '} ]');
    
    // Fix ] } ] } ]
    content = content.replace(/\}\s*\]\s*\n*\s*\}\s*\n*\s*\]\s*$/g, '} ]');

    // Fix trailing comma before ]
    content = content.replace(/,\s*\]\s*$/g, ']');

    // Fix { "id": ... without a preceding comma inside an array
    content = content.replace(/\}\s*\{\s*"id"/g, '}, { "id"');
    
    fs.writeFileSync(filePath + '.fixed.js', content);
    
    try {
        let parsed = eval(content);
        let flat = [];
        for (const item of parsed) {
            if (Array.isArray(item)) flat.push(...item);
            else flat.push(item);
        }
        return flat;
    } catch(e) {
        console.error("Still failed " + filePath + ": " + e.message);
        return null;
    }
}

const book1 = fixAndSave('h:\\Antigravity\\Novel\\book1_ash_vein_descent.html');
const book2 = fixAndSave('h:\\Antigravity\\Novel\\book2_outer_carry.html');
const book3 = fixAndSave('h:\\Antigravity\\Novel\\book3_third_quiet.html');

if (book1 && book2 && book3) {
    const all = [...book1, ...book2, ...book3];
    fs.writeFileSync('C:\\Users\\sline\\.gemini\\antigravity\\brain\\bd0be9a8-fcf9-4037-a05c-11b98aa54433\\scratch\\all_chapters.json', JSON.stringify(all, null, 2));
    console.log("SUCCESS! Total chapters: " + all.length);
}
