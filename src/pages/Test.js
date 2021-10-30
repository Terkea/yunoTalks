import {generateKeys, computeKeys, encrypt, decrypt, uncompressPrivateKey, hexToUint8Array} from '../utils/e2ee'


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
	const message = 'ciao'

	const Alice = generateKeys()
	const Bob = generateKeys()

	const alicePrivateKey = Alice.ecdh.getPrivateKey().toString('hex')
	const alicePublicKey = Alice.buffer.toString('hex')
	const bobPrivateKey = Bob.ecdh.getPrivateKey().toString('hex')
	const bobPublicKey = Bob.buffer.toString('hex')


	console.log('original')
	console.log(Alice.ecdh)
	console.log(Bob.buffer)
	console.log('reconstruct')
	console.log(uncompressPrivateKey(alicePrivateKey))
	console.log(hexToUint8Array(bobPublicKey))
	const sharedKeyAB = computeKeys(uncompressPrivateKey(alicePrivateKey), hexToUint8Array(bobPublicKey))
	const sharedKeyBA = computeKeys(uncompressPrivateKey(bobPrivateKey), hexToUint8Array(alicePublicKey))
	console.log(alicePublicKey, bobPublicKey, "\n PUBLIC KEYS")
	console.log(bobPrivateKey, alicePrivateKey, "\n PRIVATE KEYS")
	console.log(sharedKeyAB, 'shared key computed used alices private key and bobs public key')
	console.log(sharedKeyBA, 'shared key computed used alices private key and bobs public key')

	console.log(`encrypting ${message}: ${encrypt(message, sharedKeyAB)}`)
	console.log(`decrypting ${encrypt(message, sharedKeyAB)}: ${decrypt(encrypt(message, sharedKeyAB), sharedKeyAB)}`)

	return (
		<>
			<p>neat stuff happening in the console</p>
		</>
	)
}

