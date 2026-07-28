const fs = require('fs');

try {
    let content = fs.readFileSync('h:\\Antigravity\\Novel\\master_novel_complete.html', 'utf-8');

    // Attempt to extract the JSON string directly by using a clean split
    // Since we know the previous script injected `]  }, \n [` 
    // we can just replace that string globally.
    content = content.replace(/\]\s*\}\s*\]\s*\}\s*,\s*\[\s*\{/g, '] }, {');
    content = content.replace(/\]\s*\}\s*\]\s*\}\s*,\s*\{/g, '] }, {');
    content = content.replace(/\]\s*\}\s*\]\s*\}\s*\[/g, '] }, {');
    content = content.replace(/\]\s*\}\s*\]\s*\}\s*\]/g, '] } ]');
    content = content.replace(/\]\s*\}\s*\[\s*\{/g, '] }, {');
    content = content.replace(/\]\s*\}\s*\]\s*\}\s*\]\s*\}\s*,\s*\[\s*\{/g, '] }, {');

    // The script earlier said: ]  }, \n [ \n { "id": "chapter-26"
    content = content.replace(/\]\s*\}\s*\]\s*\}\s*\[/g, '] },');
    content = content.replace(/\]\s*\}\s*\]\s*\s*\},/g, '] },');
    content = content.replace(/\]\s*\n\s*\}\s*\n\s*\]\s*\n\s*\}\s*,\s*\n\s*\[/g, '] },');
    content = content.replace(/\]\s*\n\s*\}\s*\n\s*\]\s*\n\s*\}/g, '] }');

    // I will write a small script that isolates the array, fixes common syntax errors via a lax parser, or just evaluates it.
    // Instead of regex replaces that might fail, let's use a simpler approach.
} catch(e) {
    console.error(e);
}
