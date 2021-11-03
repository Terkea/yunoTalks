import {UserIcon} from "@heroicons/react/solid";
import {useForm} from "react-hook-form";
import React from 'react'
import {searchUserId} from "../../providers/authProvider";
import {createNotification, searchNotification} from "../../utils/notification";
import {AuthContext} from '../../providers/authProvider'

const AddFriend = () => {
	const {register, handleSubmit, reset} = useForm();
	const [message, setMessage] = React.useState("")
	const [error, setError] = React.useState("")
	const {state} = React.useContext(AuthContext)

	const onSubmit = async (data) => {
		if (await searchUserId(data.userId)) {
			let notification = {
				type: 'friendRequest',
				to: data.userId,
				from: state.profile.nickname,
				avatar: state.profile.avatar || null,
				seen: false,
				response: null
			}

			if (await searchNotification(notification) !== undefined) {
				setMessage(`A friend request has already been send to ${data.userId}`)
				setError("")

			} else {
				createNotification(notification)
				setMessage(`A friend request has been send to ${data.userId}`)
				setError("")
			}

		} else {
			setError(`There is no ${data.userId} in our records`)
			setMessage("")
		}
		reset('userId')
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
						<UserIcon className="text-primary"/>
					</span>
						<input
							{...register("userId", {required: true})}
							name="userId" type="text"
							placeholder="User id"
							className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative 
									       bg-white bg-white rounded text-sm border-0 shadow outline-none 
									       focus:outline-none focus:ring w-full pl-10`}/>
						<p className='text-green-500 mt-2'>{message}</p>
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

export default AddFriend