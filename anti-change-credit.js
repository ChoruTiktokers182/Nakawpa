const crypto = require('crypto');
const fs = require('fs');

const LICENSE_PATH = './license';


const ORIGINAL_LICENSE_CONTENT = `
This Logger in ./utils/log
Copyright Choru TikTokers
Code by Choru Choru TikTokers

`;


const ORIGINAL_CHECKSUM = computeChecksum(ORIGINAL_LICENSE_CONTENT);

function computeChecksum(data) {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}


function verifyAndRestoreLicense() {
    let currentContent;

    try {
        currentContent = fs.readFileSync(LICENSE_PATH, 'utf8');
    } catch (err) {
        fs.writeFileSync(LICENSE_PATH, ORIGINAL_LICENSE_CONTENT, 'utf8');
        
        return;
    }

    const currentChecksum = computeChecksum(currentContent);
    if (currentChecksum !== ORIGINAL_CHECKSUM) {
        fs.writeFileSync(LICENSE_PATH, ORIGINAL_LICENSE_CONTENT, 'utf8');
    }
}


verifyAndRestoreLicense();

setInterval(verifyAndRestoreLicense, 5000);
