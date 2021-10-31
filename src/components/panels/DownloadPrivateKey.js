import svg from "../../img/3544901.svg";
import UploadPrivateKey from "../UploadPrivateKey";


const DownloadPrivateKey = () => {
	return (
		<div className="flex flex-col h-full w-full justify-center items-center">
			<img src={svg} alt="chat" className="md:w-1/3 w-48"/>
			<p className="text-center mr-50 text-xl md:text-2xl md:ml-5 font-bold md:block group-hover:block pl-6">
				{localStorage.getItem('key') ? 'Be cautious about where you store the key!' : 'Your key is missing!'}
			</p>
			<p className="text-center mr-50 p-10 text-md md:text-md md:ml-5 font-bold md:block group-hover:block pl-6">
				It will be impossible to decrypt your conversations <br/> if you do not submit your private key
			</p>
			{localStorage.getItem('key') ?
				<div className="bg-chatAction text-gray-100 text-center font-medium rounded-md
								border border-transparent items-center justify-center px-8 py-3
								hover:bg-actionH cursor-pointer">Download
				</div> : null
			}

		</div>
	)
}

export default DownloadPrivateKey;