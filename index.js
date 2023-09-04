// crypto.createCipheriv() method
// Includes crypto module
const crypto = require('crypto');

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

function encrypt(inputData, password) {
    return new Promise((resolve, reject) => {
        // Defining algorithm
        const algorithm = 'aes-192-cbc';

        // Generating salt
        const salt = generateRandomString(4);

        // Defining key
        const key = crypto.scryptSync(password, salt, 24);

        // Defining iv
        const iv = Buffer.alloc(16, 0);

        // Creating cipher
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        // Declaring encrypted
        let encrypted = '';

        // Reading data
        cipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = cipher.read())) {
                encrypted += chunk.toString('base64');
            }
        });

        // Handling end event
        cipher.on('end', () => {
            resolve({ "encrypted":encrypted, "salt": salt });
        });

        // Handling error event
        cipher.on('error', (error) => {
            reject(error);
        });

        // Writing data
        cipher.write(inputData);
        cipher.end();
    });
}

function decrypt(encrypted, salt, password) {
    return new Promise((resolve, reject) => {
        // Defining algorithm
        const algorithm = 'aes-192-cbc';

        // Defining key
        const key = crypto.scryptSync(password, salt, 24);

        // Defining iv
        const iv = Buffer.alloc(16, 0);

        // Creating decipher
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        // Declaring decrypted
        let decrypted = '';

        // Reading data
        decipher.on('readable', () => {
            let chunk;
            while (null !== (chunk = decipher.read())) {
                decrypted += chunk.toString('utf8');
            }
        });

        // Handling end event
        decipher.on('end', () => {
            resolve(decrypted);
        });

        // Handling error event
        decipher.on('error', (error) => {
            reject(error);
        });

        // Writing and decoding the encrypted data
        try {
            decipher.write(encrypted, 'base64');
            decipher.end();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { encrypt, decrypt };
