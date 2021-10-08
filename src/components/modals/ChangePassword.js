import {UserIcon} from "@heroicons/react/solid";

const ChangePassword = () => {
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
					<input  name="password" type="password"
					       placeholder="Old password"
					       className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10`}/>
					{/*<p className='text-green-500 mt-2'>{message}</p>*/}
				</div>
				<div className="relative flex w-full flex-wrap items-stretch mb-3">
					<span
						className="z-10 h-full leading-snug font-normal absolute text-center
						text-blueGray-300 absolute bg-transparent rounded text-base items-center
						justify-center w-8 pl-3 py-3">
						<UserIcon className="text-primary"/>
					</span>
					<input  name="password" type="password"
					        placeholder="New password"
					        className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10`}/>
					{/*<p className='text-green-500 mt-2'>{message}</p>*/}
				</div>
				<div className="relative flex w-full flex-wrap items-stretch mb-3">
					<span
						className="z-10 h-full leading-snug font-normal absolute text-center
						text-blueGray-300 absolute bg-transparent rounded text-base items-center
						justify-center w-8 pl-3 py-3">
						<UserIcon className="text-primary"/>
					</span>
					<input  name="password" type="password"
					        placeholder="Confirm new password"
					        className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10`}/>
					{/*<p className='text-green-500 mt-2'>{message}</p>*/}
				</div>
			</div>

			<div className="w-full">
				<button  className="w-full bg-action text-gray-100 text-center font-medium rounded-md
								border border-transparent items-center justify-center py-3 mt-1
								hover:bg-actionH cursor-pointer">
					SUBMIT
				</button>
			</div>
		</>
	)
}

export default ChangePassword