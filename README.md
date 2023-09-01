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

To encrypt a JSON file:

```shell
./safejson-cli.js encrypt input.json encrypted.json your-secret-key
```
To decrypt a JSON file:

```shell
./safejson-cli.js decrypt encrypted.json decrypted.json your-secret-key
```

## Contributing

We welcome contributions! Please read our contribution guidelines for details.

## Author/Contact

Maintained by Dominic Kasanga

Contact: dominickasanga@gmail.com




