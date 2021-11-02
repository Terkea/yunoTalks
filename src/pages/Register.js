import registerSVG from "../img/register.svg";
import {useForm} from "react-hook-form";
import React from 'react'
import {yupResolver} from '@hookform/resolvers/yup';
import {useHistory} from "react-router-dom";
import * as yup from 'yup';
import clsx from 'clsx';
import {LockClosedIcon, UserIcon} from "@heroicons/react/solid";
import {Link} from 'react-router-dom'
import {register as registerAccount} from "../providers/authProvider";


const schema = yup.object().shape({
	email: yup.string().email('Invalid email format').required('Email field required'),
	username: yup.string().required('Username field required'),
	password: yup.string().required('Password field required').min(8),
	confirmPassword: yup.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password field required')
});


const Register = () => {
	const [error, setError] = React.useState("")
	const history = useHistory();
	const {register, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = (data) => {
		registerAccount(data.email, data.password, data.username + "#" +
			Math.floor(1000 + Math.random() * 9000).toString()).then(() => {
				history.push('/')
			})
			.catch(e => {
				setError(e.toString())
			})

	};

	return (
		<div className="flex h-screen">
			{/* LEFT SIDE */}
			<div className="lg:w-1/2 w-full flex bg-primary pr-10 pl-10">
				<div className="m-auto  lg:pl-20 lg:pr-20">
					{/* TEXT */}
					<div className="text-4xl lg:text-6xl text-gray-100 font-extrabold">
						Create your account
					</div>
					<div className="text-2xl lg:text-3xl text-gray-100">
						Communicate securely with your loved ones.
					</div>

					<div className="mt-10">
						{/* FORM */}
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-2">
								<div className="relative flex w-full flex-wrap items-stretch mb-3">
								<span
									className="z-10 h-full leading-snug font-normal absolute text-center
									text-blueGray-300 absolute bg-transparent rounded text-base items-center
									justify-center w-8 pl-3 py-3">
									<UserIcon className="text-primary"/>
								</span>
									<input {...register('email')} type="email" placeholder="Email address"
									       className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10
									       ${clsx('', errors.email?.message && 'ring ring-red-500')}
			                               ${clsx('', error && 'ring ring-red-500')}`}
									/>
									<p className='text-red-500 mt-1'>{errors.email?.message}</p>
								</div>
							</div>

							<div className="mb-2">
								<div className="relative flex w-full flex-wrap items-stretch mb-3">
								<span
									className="z-10 h-full leading-snug font-normal absolute text-center
									text-blueGray-300 absolute bg-transparent rounded text-base items-center
									justify-center w-8 pl-3 py-3">
									<UserIcon className="text-primary"/>
								</span>
									<input {...register('username')} type="text" placeholder="Username"
									       className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10
									       ${clsx('', errors.username?.message && 'ring ring-red-500')}`}/>
									<p className='text-red-500 mt-1'>{errors.username?.message}</p>
								</div>
							</div>

							<div className="mb-4">
								<div className="relative flex w-full flex-wrap items-stretch mb-3">
								<span
									className="z-10 h-full leading-snug font-normal absolute text-center
									text-blueGray-300 absolute bg-transparent rounded text-base items-center
									justify-center w-8 pl-3 py-3">
									<LockClosedIcon className="text-primary"/>
								</span>
									<input {...register('password')} type="password" placeholder="Password"
									       className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10
									       ${clsx('', errors.password?.message && 'ring ring-red-500')}`}/>
									<p className='text-red-500 mt-1'>{errors.password?.message}</p>
								</div>
							</div>

							<div className="mb-4">
								<div className="relative flex w-full flex-wrap items-stretch mb-3">
								<span
									className="z-10 h-full leading-snug font-normal absolute text-center
									text-blueGray-300 absolute bg-transparent rounded text-base items-center
									justify-center w-8 pl-3 py-3">
									<LockClosedIcon className="text-primary"/>
								</span>
									<input {...register('confirmPassword')} type="password"
									       placeholder="Confirm Password"
									       className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10
									       ${clsx('', errors.confirmPassword?.message && 'ring ring-red-500')}`}/>
									<p className='text-red-500 mt-1'>{errors.confirmPassword?.message}</p>
								</div>
							</div>

							{/* VALIDATION ERRORS */}
							<div className="mb-4">
								<p className='text-red-500 mt-1'>{error}</p>
							</div>

							<div className="w-full flex justify-end">
								<Link to='/login' className="text-gray-100 text-base cursor-pointer">
									Already registered?
								</Link>
							</div>

							<div className="w-full">
								<input type='submit' className="w-full bg-action text-gray-100 text-center font-medium rounded-md mb-3
								border border-transparent items-center justify-center px-8 py-3 mt-7
								hover:bg-actionH cursor-pointer" value='REGISTER'/>
							</div>

						</form>

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