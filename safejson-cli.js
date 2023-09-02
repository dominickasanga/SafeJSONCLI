#!/usr/bin/env node

const commander = require('commander');
const fs = require('fs').promises; // For file I/O
const { encrypt, decrypt } = require('./'); // Replace with the actual path to your encryption/decryption functions

commander
  .version('1.0.0')
  .description('A command-line tool for encrypting and decrypting JSON data');

commander
  .command('encrypt <inputFile> <outputFile> <saltOutputFile> <encryptionKey>')
  .description('Encrypt a JSON file')
  .action(async (inputFile, outputFile, saltOutputFile, encryptionKey) => {
    try {
      const inputJSON = await fs.readFile(inputFile, 'utf8');

      // Check if inputJSON is valid JSON
      let parsedInputJSON;
      try {
        parsedInputJSON = JSON.parse(inputJSON);
      } catch (jsonError) {
        throw new Error('Invalid JSON data in inputFile');
      }

      const encryptedData = await encrypt(JSON.stringify(parsedInputJSON), encryptionKey);
      await fs.writeFile(saltOutputFile, encryptedData.salt, 'utf8');
      await fs.writeFile(outputFile, encryptedData.encrypted, 'utf8');
      console.log('Encryption complete.');
    } catch (error) {
      console.error('Encryption error:', error.message);
    }
  });

commander
  .command('decrypt <inputFile> <outputFile> <salt> <decryptionKey>')
  .description('Decrypt a JSON file')
  .action(async (inputFile, outputFile, salt, decryptionKey) => {
    try {
      const encryptedData = await fs.readFile(inputFile, 'utf8');

      try {
      } catch (jsonError) {
        throw new Error('Invalid JSON data in inputFile');
      }

      const decryptedData = await decrypt(encryptedData, salt, decryptionKey);
      await fs.writeFile(outputFile, decryptedData, 'utf8');
      console.log('Decryption complete.');
    } catch (error) {
      console.error('Decryption error:', error.message);
    }
  });

commander.parse(process.argv);
