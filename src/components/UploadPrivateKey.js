import React from 'react'
import {readQR} from "../utils/qr";


const UploadPrivateKey = ({text}) => {
	const refInput = React.useRef(null)
	const [message, setMessage] = React.useState('')
	const [error, setError] = React.useState('')

	const uploadKey = async (file) => {
		const key = await readQR(file)
		if(key){
			setMessage("Private key successfully uploaded")
			setError("")
			localStorage.setItem('key', key.data)
		}else{
			setError('Could not decode QR code')
			setMessage("")
		}
	}


	return (
		<>
			<div className="flex justify-center items-center w-full">
				<label
					onClick={() => refInput.current.click()}
					className="bg-chatAction text-gray-100 text-center font-medium rounded-md
								border border-transparent items-center justify-center px-8 py-3
								hover:bg-actionH cursor-pointer"
				>
					{text}
				</label>
			</div>
			<input ref={refInput}
			       onChange={(e) => uploadKey(e.target.files[0])}
			       style={{opacity: 0}}
			       accept="image/png, image/jpeg" type="file" name="privateKey"
			/>
			<p className='text-green-500 mt-2'>{message}</p>
			<p className='text-red-500 mt-2'>{error}</p>
		</>
	)
}

export default UploadPrivateKey