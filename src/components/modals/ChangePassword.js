import {LockClosedIcon, UserIcon} from "@heroicons/react/solid";
import React from "react";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {updatePassword} from "../../providers/authProvider";


const ChangePassword = () => {
	const [message, setMessage] = React.useState("")
	const [error, setError] = React.useState("")

	// form validation rules
	const validationSchema = Yup.object().shape({
		oldPassword: Yup.string().required('New Password is required'),
		newPassword: Yup.string()
			.required('New Password is required')
			.min(6, 'Password must be at least 8 characters'),
		confirmPassword: Yup.string()
			.required('Confirm Password is required')
			.oneOf([Yup.ref('newPassword')], 'Passwords must match')

	});

	const formOptions = {resolver: yupResolver(validationSchema)};
	const {register, handleSubmit, reset, formState} = useForm(formOptions);
	const {errors} = formState;

	const onSubmit = data => {
		updatePassword(data.newPassword)
		// console.log(data.newPassword)
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-2">
					<div className="relative flex w-full flex-wrap items-stretch mb-3">
					<span
						className="z-10 h-full leading-snug font-normal absolute text-center
						text-blueGray-300 absolute bg-transparent rounded text-base items-center
						justify-center w-8 pl-3 py-3">
						<LockClosedIcon className="text-primary"/>
					</span>
						<input
							{...register("oldPassword")}
							name="oldPassword" type="password"
							placeholder="Old password"
							className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10`}/>
						<p className='text-red-500 mt-2'>{errors.oldPassword?.message}</p>
					</div>
					<div className="relative flex w-full flex-wrap items-stretch mb-3">
					<span
						className="z-10 h-full leading-snug font-normal absolute text-center
						text-blueGray-300 absolute bg-transparent rounded text-base items-center
						justify-center w-8 pl-3 py-3">
						<LockClosedIcon className="text-primary"/>
					</span>
						<input
							{...register("newPassword")}
							name="newPassword" type="password"
							placeholder="New password"
							className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10`}/>
						<p className='text-red-500 mt-2'>{errors.newPassword?.message}</p>
					</div>
					<div className="relative flex w-full flex-wrap items-stretch mb-3">
					<span
						className="z-10 h-full leading-snug font-normal absolute text-center
						text-blueGray-300 absolute bg-transparent rounded text-base items-center
						justify-center w-8 pl-3 py-3">
						<LockClosedIcon className="text-primary"/>
					</span>
						<input
							{...register("confirmPassword")}
							name="confirmPassword" type="password"
							placeholder="Confirm new password"
							className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10`}/>
						<p className='text-red-500 mt-2'>{errors.confirmPassword?.message}</p>
						<p className='text-red-500 mt-2'>{error}</p>
					</div>
				</div>

				<div className="w-full">
					<button type="submit"
					        className="w-full bg-action text-gray-100 text-center font-medium rounded-md
								border border-transparent items-center justify-center py-3 mt-1
								hover:bg-actionH cursor-pointer">
						SUBMIT
					</button>
				</div>
			</form>

		</>
	)
}

export default ChangePassword