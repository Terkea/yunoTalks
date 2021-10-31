import svg from "../../img/3544901.svg";
import UploadPrivateKey from "../UploadPrivateKey";
import {generateQR} from "../../utils/qr";
import React from 'react'
// generateQR('test').then(r => console.log(r))


const DownloadPrivateKey = () => {
	const [key, setKey] = React.useState('')

	const revealKey = () => {
		generateQR(localStorage.getItem('key')).then((url) => setKey(url))
	}

	return (
		<div className="flex flex-col h-full w-full justify-center items-center">
			<img src={svg} alt="chat" className="md:w-1/3 w-48"/>
			<p className="text-center mr-50 text-xl md:text-2xl md:ml-5 font-bold md:block group-hover:block pl-6">
				{localStorage.getItem('key') ? 'Be cautious about where you store the key!' : 'Your key is missing!'}
			</p>
			<p className="text-center mr-50 p-5 text-md md:text-md md:ml-5 font-bold md:block group-hover:block pl-6">
				It will be impossible to decrypt your conversations <br/> if you do not submit your private key
			</p>
			<img src={key} className="mb-5"/>
			{localStorage.getItem('key') ?
				<div
					onClick={revealKey}
					className="bg-chatAction text-gray-100 text-center font-medium rounded-md
								border border-transparent items-center justify-center px-8 py-3
								hover:bg-actionH cursor-pointer">Reveal Private Key
				</div> : null
			}

		</div>
	)
}

export default DownloadPrivateKey;