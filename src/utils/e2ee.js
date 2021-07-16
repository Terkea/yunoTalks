const crypto = require('crypto');


// DOCS: https://nodejs.org/api/crypto.html#crypto_crypto_createecdh_curvename

const TYPE = 'secp256k1';
// SOURCE: https://gist.github.com/siwalikm/8311cf0a287b98ef67c73c1b03b47154
// DOCS: https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options
// openssl list -cipher-algorithms
// will display the available cipher algorithms.
const IV = crypto.randomBytes(16); // Initialization vector.
//https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_codebook_(CBC)
const ALGO = 'aes-256-cbc'


// PUBLIC KEY - buffer.toString('hex')
// PRIVATE KEY - ecdh.getPrivateKey().toString('hex')
const generateKeys = () => {
	const ecdh = crypto.createECDH(TYPE);
	const buffer = ecdh.generateKeys();
	return {ecdh: ecdh, buffer: buffer};
}

const computeKeys = (ecdh, buffer) => {
	return ecdh.computeSecret(buffer)
}

const encrypt = (val, key) => {
	let cipher = crypto.createCipheriv(ALGO, key, IV);
	let encrypted = cipher.update(val, 'utf8', 'base64');
	encrypted += cipher.final('base64');
	return encrypted;
};

const decrypt = (encrypted, key) => {
	let decipher = crypto.createDecipheriv(ALGO, key, IV);
	let decrypted = decipher.update(encrypted, 'base64', 'utf8');
	return (decrypted + decipher.final('utf8'));
};


export {generateKeys, computeKeys, encrypt, decrypt};