import {generateKeys, computeKeys, encrypt, decrypt, uncompressPrivateKey} from '../utils/e2ee'


// console.log(computeKeys(Veronica.ecdh, Marian.buffer))
// console.log(computeKeys(Marian.ecdh, Veronica.buffer))


const Test = () => {
	return (
		<>
			{Array.from({length: 1}, (_, i) => <Component key={i}/>)}
		</>
	)
}

export default Test;


const Component = () => {
	const Veronica = generateKeys()
	const Marian = generateKeys()
	const initialPrivateKey = generateKeys().ecdh.getPrivateKey()
	const initialPublicKey = generateKeys().ecdh.getPublicKey()

	// console.log(initialPublicKey)
	// console.log(initialPrivateKey)

	let test = generateKeys().ecdh
	console.log(test.getPrivateKey())
	console.log(test.getPrivateKey('hex'), 'hex')
	console.log(uncompressPrivateKey(test.getPrivateKey('hex')), 'ECDH')
	console.log(uncompressPrivateKey(test.getPrivateKey('hex')).getPrivateKey(), 'uncompressed')

	console.log('~~~~~~~~~~~')
	console.log(computeKeys(uncompressPrivateKey(test.getPrivateKey('hex')), test.getPublicKey()), 'sharedKey')
	console.log(computeKeys(uncompressPrivateKey(test.getPrivateKey('hex')), Uint8Array.from(Buffer.from(test.getPublicKey()))), 'sharedKey')

	// console.log(initialPrivateKey, ' initial')
	// console.log(initialPrivateKey.toString('hex'), ' hex')
	// // https://stackoverflow.com/a/55263004/8193864
	// console.log(Uint8Array.from(Buffer.from(initialPrivateKey.toString('hex'), 'hex')))


	// console.log(initialPublicKey, 'initial')
	// console.log(initialPublicKey.toString('hex'))
	// console.log(Uint8Array.from(Buffer.from(initialPublicKey.toString('hex'), 'hex')))

	const phrase = "ciao bella";
	return (
		<>
			<p>
				ENCRYPTED:
				{encrypt(phrase, computeKeys(Veronica.ecdh, Marian.buffer))}
			</p>
			<p>
				DECRYPTED:
				{decrypt(encrypt(phrase, computeKeys(Veronica.ecdh, Marian.buffer)), computeKeys(Marian.ecdh, Veronica.buffer))}
			</p>
		</>
	)
}

