import * as crypto from 'crypto'

// DOCS: https://nodejs.org/api/crypto.html#crypto_crypto_createecdh_curvename

// DOCS: https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options
// openssl list -cipher-algorithms
// will display the available cipher algorithms.
const TYPE = 'secp256k1';

// Secret vs. Non-secret Initialization Vector
// https://stackoverflow.com/a/5797231/8193864
const generateInitialisationVector = () => {
	return crypto.randomBytes(16).toString('hex');
}

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

// convert hex key (public) into uint8array
const hexToUint8Array = hex => {
	return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

// convert the hex key into ECDH
const uncompressPrivateKey = hex => {
	return crypto.createECDH(TYPE).setPrivateKey(hex, 'hex')
}

/**
 *
 * @param val plain data
 * @param key
 * @param IV initialisation vector
 * @returns {string} encrypted data
 */
const encrypt = (val, key, IV) => {
	let cipher = crypto.createCipheriv(ALGO, key, IV);
	let encrypted = cipher.update(val, 'utf8', 'base64');
	encrypted += cipher.final('base64');
	return encrypted;
};

/**
 *
 * @param encrypted encrypted data
 * @param key
 * @param IV initialisation vector
 * @returns {string} plain text
 */
const decrypt = (encrypted, key, IV) => {
	let decipher = crypto.createDecipheriv(ALGO, key, IV);
	let decrypted = decipher.update(encrypted, 'base64', 'utf8');
	return (decrypted + decipher.final('utf8'));
};


export {generateKeys, computeKeys, encrypt, decrypt, uncompressPrivateKey, hexToUint8Array, generateInitialisationVector};
