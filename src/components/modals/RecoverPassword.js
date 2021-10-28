import React from "react";
import {UserIcon} from "@heroicons/react/solid";
import {recoverPassword} from "../../providers/authProvider";


const RecoverPassword = () => {
	const [message, setMessage] = React.useState("")
	const [email, setEmail] = React.useState("")

	const onClick = () => {
		if (email.includes("@") && email.replaceAll(" ", "")
			&& email.replaceAll(" ", "") !== "") {
			recoverPassword(email).then(() => {
				setMessage("Check your email address")
			})
		}
	}

	return (
		<>
			<div className="mb-2">
				<div className="relative flex w-full flex-wrap items-stretch mb-3">
					<span
						className="z-10 h-full leading-snug font-normal absolute text-center
						text-blueGray-300 absolute bg-transparent rounded text-base items-center
						justify-center w-8 pl-3 py-3">
						<UserIcon className="text-primary"/>
					</span>
					<input onChange={e => setEmail(e.target.value)} name="email" type="email"
					       placeholder="Email address"
					       className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10`}/>
					<p className='text-green-500 mt-2'>{message}</p>
				</div>
			</div>

			<div className="w-full">
				<button onClick={onClick} className="w-full bg-action text-gray-100 text-center font-medium rounded-md
								border border-transparent items-center justify-center py-3 mt-1
								hover:bg-actionH cursor-pointer">
					SUBMIT
				</button>
			</div>
		</>
	);
}

export default RecoverPassword;