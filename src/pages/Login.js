import loginSVG from '../img/login.svg'
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import {UserIcon, LockClosedIcon} from '@heroicons/react/solid'
import Modal from "../components/Modal";
import React from "react";
import {ModalContext} from "../providers/modalProvider";
import {login as loginAccount} from "../providers/authProvider";
import {useHistory} from "react-router-dom";


const schema = yup.object().shape({
	email: yup.string().email('Invalid email format').required('Email field required'),
	password: yup.string().required('Password field required'),
});

const Login = () => {
	const history = useHistory();
	const [error, setError] = React.useState("")
	const {register, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = (data) => {
		loginAccount(data.email, data.password)
			.then(() => {
				history.push('/')
			})
			.catch(e => {
				setError(e.toString())
			})

	};

	const {dispatch} = React.useContext(ModalContext);

	return (
		<div className="flex h-screen">
			{/* LEFT SIDE */}
			<div className="lg:w-1/2 w-0 content-center bg-gray-50 flex items-center justify-center">
				<img src={loginSVG} className="max-w-xxl" alt="test"/>
			</div>

			{/* RIGHT SIDE */}
			<div className="lg:w-1/2 w-full flex bg-primary ">
				<div className="m-auto lg:pl-20 lg:pr-20">
					{/* TEXT */}
					<div className="text-4xl lg:text-6xl text-gray-100 font-extrabold">
						Welcome Back
					</div>
					<div className="text-2xl lg:text-3xl text-gray-100">
						Sign up to your account
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
									       ${clsx('', errors.email?.message && 'ring ring-red-500')}`}/>
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
									<input {...register('password')} type="password" placeholder="Password"
									       className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative
									       bg-white bg-white rounded text-sm border-0 shadow outline-none
									       focus:outline-none focus:ring w-full pl-10
									       ${clsx('', errors.password?.message && 'ring ring-red-500')}`}/>
									<p className='text-red-500 mt-1'>{errors.email?.message}</p>
								</div>
							</div>

							{/* VALIDATION ERRORS */}
							<div className="mb-4">
								<p className='text-red-500 mt-1'>{error}</p>
							</div>

							<Modal/>
							<div className="text-gray-100 text-right text-base cursor-pointer"
							     onClick={() => dispatch({
								     type: 'SET_CONTENT', payload: {
									     content: 'it works!',
									     title: 'Testing'
								     }
							     })}>
								Forgotten password?
							</div>

							<div className="w-full">
								<input type='submit' className="w-full bg-action text-gray-100 text-center font-medium rounded-md mb-3
								border border-transparent items-center justify-center px-8 py-3 mt-7
								hover:bg-actionH cursor-pointer" value='SIGN UP'/>
							</div>
						</form>

					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;