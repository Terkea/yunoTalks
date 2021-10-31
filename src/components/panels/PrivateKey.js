import React from 'react'
import spinner from "../../img/3873221.svg";
import UploadPrivateKey from "../UploadPrivateKey";


const PrivateKey = () => {
	return (
		<div className="flex flex-col h-full w-full justify-center items-center">
			<p className="text-center text-3xl md:text-5xl p-10 ml-5 font-bold md:block group-hover:block pl-6">Oops...</p>
			<img src={spinner} alt="chat" className="md:w-1/3 w-48"/>
			<p className="text-center mr-50 text-xl md:text-2xl md:ml-5 font-bold md:block group-hover:block pl-6">
				It appears that your private key is either missing or invalid
			</p>
			<p className="text-center mr-50 p-10 text-md md:text-md md:ml-5 font-bold md:block group-hover:block pl-6">
				It will be impossible to decrypt your conversations <br/> if you do not submit your private key
			</p>
			<UploadPrivateKey text={"Click here to upload"}/>
		</div>
	)
}

export default PrivateKey