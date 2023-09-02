# SafeJSON CLI

SafeJSON CLI is a command-line tool for securely encrypting and decrypting JSON data files using strong encryption.

## Key Features

- Encrypt JSON files with AES-256 encryption.
- Decrypt previously encrypted JSON files.
- Simple command-line interface for ease of use.

## Installation


```shell
- git clone https://github.com/dominickasanga/SafeJSONCLI.git
- cd safejson-cli
- npm install
```

## License

This project is licensed under the MIT License.

## Usage

### for cli:

To encrypt a JSON file:

```shell
./safejson-cli.js encrypt input.json encrypted.json your-secret-key
```
To decrypt a JSON file:

```shell
./safejson-cli.js decrypt encrypted.json decrypted.json salt--key-for-encryptedJson your-secret-key
```

### how to use it in your node app:

```shell
npm i safejsoncli
```

```shell
const safejson = require('safejsoncli');

// to encrypt json file
// Example usage:
const inputData = 'Hello, World!';
const password = 'MySecretPassword';

encrypt(inputData, password)
    .then(({ encrypted, salt }) => {
        console.log('Encrypted Data:', encrypted);
        console.log('Salt:', salt);
    })
    .catch((error) => {
        console.error('Encryption Error:', error);
    });
```
```shell
const safejson = require('safejsoncli');

// to decrypt json file
// Example usage:
const encryptedData = '...' // Replace with your encrypted data
const salt = '...'
const password = 'MySecretPassword';

decrypt(encryptedData, salt, password)
    .then((decryptedData) => {
        console.log('Decrypted Data:', decryptedData);
    })
    .catch((error) => {
        console.error('Decryption Error:', error);
    });
```

## Contributing 

We welcome contributions! Please read our contribution guidelines for details.

## Author/Contact

Maintained by Dominic Kasanga

Contact: dominickasanga@gmail.com




