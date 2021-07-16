import {generateKeys, computeKeys, encrypt, decrypt, } from '../utils/e2ee'


// console.log(computeKeys(Veronica.ecdh, Marian.buffer))
// console.log(computeKeys(Marian.ecdh, Veronica.buffer))


const Test = () => {
	return (
		<>
			{Array.from({length: 10}, (_, i) => <Component key={i}/>)}
		</>
	)
}

export default Test;


const Component = () => {
	const Veronica = generateKeys()
	const Marian = generateKeys()

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

