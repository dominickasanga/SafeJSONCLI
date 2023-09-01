const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function encrypt(inputFile, outputFile, encryptionKey) {
  try {
    const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    const dataToEncrypt = JSON.stringify(jsonData);

    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);

    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    // Ensure the directory for the output file exists
    const outputDir = path.dirname(outputFile);
    ensureDirectoryExists(outputDir);

    fs.writeFileSync(outputFile, encryptedData, 'utf8');

    console.log(`JSON data encrypted and saved to ${outputFile}`);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error; // Re-throw the error to indicate failure
  }
}

function decrypt(inputFile, outputFile, decryptionKey) {
  try {
    const encryptedData = fs.readFileSync(inputFile, 'utf8');

    const decipher = crypto.createDecipheriv('aes-256-cbc', decryptionKey);

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    // Ensure the directory for the output file exists
    const outputDir = path.dirname(outputFile);
    ensureDirectoryExists(outputDir);

    fs.writeFileSync(outputFile, decryptedData, 'utf8');

    console.log(`JSON data decrypted and saved to ${outputFile}`);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error; // Re-throw the error to indicate failure
  }
}

function getDecryptedContents(inputFile, decryptionKey) {
  try {
    const encryptedData = fs.readFileSync(inputFile, 'utf8');

    const decipher = crypto.createDecipheriv('aes-256-cbc', decryptionKey);

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    return decryptedData;
  } catch (error) {
    console.error('Failed to retrieve decrypted contents:', error);
    throw error; // Re-throw the error to indicate failure
  }
}

module.exports = { encrypt, decrypt, getDecryptedContents };
