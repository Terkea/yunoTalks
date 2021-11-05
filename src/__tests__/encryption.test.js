import {
	generateInitialisationVector,
	generateKeys,
	computeKeys,
	hexToUint8Array,
	uncompressPrivateKey, encrypt, decrypt
} from "../utils/e2ee";

test(('generate key'), () => {
	const keys = generateKeys()
	expect(keys)
})

test(('generate initialisation vector'), () => {
	const IV = generateInitialisationVector()
	expect(IV)
})

test(('hex key to binary'), () => {
	const testKey = "9f77653028ed5a821ffb3f2bb4551896a3b521d8cb97e98c01e2b4774600e819"
	expect(hexToUint8Array(testKey))
})

test(('uncompress private key'), () => {
	const testKey = "9f77653028ed5a821ffb3f2bb4551896a3b521d8cb97e98c01e2b4774600e819"
	expect(uncompressPrivateKey(testKey))
})

test(('uncompress invalid key'), () => {
	const testKey = "test key"
	expect(() => uncompressPrivateKey(testKey)).toThrow(/Private key is not valid for specified curve./i)
})

test(('compute shared key'), () => {
	const alice = generateKeys()
	const bob = generateKeys()

	expect(computeKeys(alice.ecdh, bob.buffer)).toStrictEqual(computeKeys(bob.ecdh, alice.buffer))
})

test(('compute shared key from hex'), () => {
	const alice = generateKeys()
	const bob = generateKeys()

	const alicePrivateKey = alice.ecdh.getPrivateKey().toString('hex')
	const alicePublicKey = alice.buffer.toString('hex')
	const bobPrivateKey = bob.ecdh.getPrivateKey().toString('hex')
	const bobPublicKey = bob.buffer.toString('hex')

	expect(computeKeys(uncompressPrivateKey(alicePrivateKey), hexToUint8Array(bobPublicKey)))
		.toStrictEqual(computeKeys(uncompressPrivateKey(bobPrivateKey), hexToUint8Array(alicePublicKey)))
})

test(('compute shared key using an invalid public key'), async () => {
	const alice = generateKeys()
	const alicePrivateKey = alice.ecdh.getPrivateKey().toString('hex')

	expect(() => computeKeys(uncompressPrivateKey(alicePrivateKey), 'test key'))
		.toThrow(/Public key is not valid for specified curve/i)
})

test(('compute shared key using an invalid public key'), async () => {
	const alice = generateKeys()
	const alicePublicKey = alice.buffer.toString('hex')

	expect(() => computeKeys('test key', hexToUint8Array(alicePublicKey)))
		.toThrow(/ecdh.computeSecret is not a function/i)
})

test(('encrypt message'), () => {
	const IV = hexToUint8Array(generateInitialisationVector())
	const alice = generateKeys()
	const bob = generateKeys()

	const alicePrivateKey = alice.ecdh.getPrivateKey().toString('hex')
	const alicePublicKey = alice.buffer.toString('hex')
	const bobPrivateKey = bob.ecdh.getPrivateKey().toString('hex')
	const bobPublicKey = bob.buffer.toString('hex')
	const aliceSharedKey = computeKeys(uncompressPrivateKey(alicePrivateKey), hexToUint8Array(bobPublicKey))
	const bobSharedKey = computeKeys(uncompressPrivateKey(bobPrivateKey), hexToUint8Array(alicePublicKey))

	const message = 'this is a secret!'

	expect(encrypt(message, aliceSharedKey, IV)).toBe(encrypt(message, bobSharedKey, IV))
})

test(('decrypt message with the right key'), () => {
	const IV = hexToUint8Array(generateInitialisationVector())
	const alice = generateKeys()
	const bob = generateKeys()

	const alicePrivateKey = alice.ecdh.getPrivateKey().toString('hex')
	const alicePublicKey = alice.buffer.toString('hex')
	const bobPrivateKey = bob.ecdh.getPrivateKey().toString('hex')
	const bobPublicKey = bob.buffer.toString('hex')
	const aliceSharedKey = computeKeys(uncompressPrivateKey(alicePrivateKey), hexToUint8Array(bobPublicKey))
	const bobSharedKey = computeKeys(uncompressPrivateKey(bobPrivateKey), hexToUint8Array(alicePublicKey))

	const message = 'this is a secret!'
	const aliceMessage = encrypt(message, aliceSharedKey, IV)
	const bobMessage = encrypt(message, bobSharedKey, IV)

	expect(decrypt(bobMessage, aliceSharedKey, IV)).toBe(decrypt(aliceMessage, bobSharedKey, IV))
})