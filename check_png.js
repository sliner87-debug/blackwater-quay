const fs = require('fs');

function checkPng(file) {
    console.log(`Checking ${file}`);
    const buf = fs.readFileSync(file);
    const magic = buf.subarray(0, 8);
    console.log('Magic:', magic.toString('hex'));
    if (magic.toString('hex') !== '89504e470d0a1a0a') {
        console.log('INVALID MAGIC');
        return;
    }
    
    let offset = 8;
    while (offset < buf.length) {
        if (offset + 8 > buf.length) {
            console.log('Unexpected EOF before chunk header');
            break;
        }
        const len = buf.readUInt32BE(offset);
        const type = buf.toString('ascii', offset + 4, offset + 8);
        console.log(`Chunk ${type}, len=${len}, offset=${offset}`);
        offset += len + 12;
    }
    if (offset !== buf.length) {
        console.log(`EOF mismatch! offset=${offset}, length=${buf.length}`);
    } else {
        console.log('Valid chunk structure.');
    }
}

checkPng('h:\\\\Antigravity\\\\Novel\\\\Character_PNGs_v2\\\\Banki.png');
checkPng('h:\\\\Antigravity\\\\Novel\\\\Character_PNGs_v2\\\\Beri.png');
