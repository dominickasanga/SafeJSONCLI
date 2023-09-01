#!/usr/bin/env node

const commander = require('commander');
const { encrypt, decrypt } = require('.'); // Replace with your actual encryption/decryption functions

commander
  .version('1.0.0')
  .description('A command-line tool for encrypting and decrypting JSON data');

commander
  .command('encrypt <inputFile> <outputFile> <encryptionKey>')
  .description('Encrypt a JSON file')
  .action((inputFile, outputFile, encryptionKey) => {
    encrypt(inputFile, outputFile, encryptionKey);
  });

commander
  .command('decrypt <inputFile> <outputFile> <decryptionKey>')
  .description('Decrypt a JSON file')
  .action((inputFile, outputFile, decryptionKey) => {
    decrypt(inputFile, outputFile, decryptionKey);
  });

commander.parse(process.argv);
