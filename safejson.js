const fs = require('fs');
const crypto = require('crypto');

function encrypt(inputFile, outputFile, encryptionKey) {
  try {
    const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    const dataToEncrypt = JSON.stringify(jsonData);

    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);

    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    fs.writeFileSync(outputFile, encryptedData, 'utf8');

    console.log(`JSON data encrypted and saved to ${outputFile}`);
  } catch (error) {
    console.error('Encryption failed:', error);
  }
}

function decrypt(inputFile, outputFile, decryptionKey) {
  try {
    const encryptedData = fs.readFileSync(inputFile, 'utf8');

    const decipher = crypto.createDecipher('aes-256-cbc', decryptionKey);

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    fs.writeFileSync(outputFile, decryptedData, 'utf8');

    console.log(`JSON data decrypted and saved to ${outputFile}`);
  } catch (error) {
    console.error('Decryption failed:', error);
  }
}

module.exports = { encrypt, decrypt };
