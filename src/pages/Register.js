import registerSVG from "../img/register.svg";
import {LockClosedIcon, UserIcon} from "@heroicons/react/solid";
import {Link} from 'react-router-dom'


const Register = () => {
	return (
		<div className="flex h-screen">
			{/* LEFT SIDE */}
			<div className="lg:w-1/2 w-full flex bg-primary pr-10 pl-10">
				<div className="m-auto lg:pl-20 lg:pr-20">
					{/* TEXT */}
					<div className="text-4xl lg:text-6xl text-gray-100 font-extrabold">
						Create your account
					</div>
					<div className="text-2xl lg:text-3xl text-gray-100">
						Communicate securely with your loved ones.
					</div>

					<div className="mt-10">
						{/* FORM */}
						<div className="mb-2">
							<div className="relative flex w-full flex-wrap items-stretch mb-3">
								<span
									className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
									<UserIcon className="text-primary"/>
								</span>
								<input type="text" placeholder="Email address"
								       className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
							</div>
						</div>

						<div className="mb-2">
							<div className="relative flex w-full flex-wrap items-stretch mb-3">
								<span
									className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
									<UserIcon className="text-primary"/>
								</span>
								<input type="text" placeholder="Nickname"
								       className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
							</div>
						</div>

						<div className="mb-4">
							<div className="relative flex w-full flex-wrap items-stretch mb-3">
								<span
									className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
									<LockClosedIcon className="text-primary"/>
								</span>
								<input type="password" placeholder="Password"
								       className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
							</div>
						</div>

						<div className="w-full flex justify-end">
							<Link to='/login' className="text-gray-100 text-base cursor-pointer">
								Already registered?
							</Link>
						</div>

						<div className="bg-action text-gray-100 text-center font-medium rounded-md mb-3
						border border-transparent items-center justify-center px-8 py-3 mt-7
						hover:bg-actionH cursor-pointer">
							REGISTER
						</div>

					</div>
				</div>
			</div>


			{/* RIGHT SIDE */}
			<div className="lg:w-1/2 w-0 content-center bg-gray-50 flex items-center justify-center">
				<img src={registerSVG} className="max-w-xxl" alt="test"/>
			</div>
		</div>
	);
}

export default Register;