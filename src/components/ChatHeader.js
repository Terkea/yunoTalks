import UserAvatar from '../img/anonymous_user.png'

const ChatHeader = ({avatar, name}) => {
	return (
		<div
			className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
			<div className="flex">
				<div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src={avatar? avatar: UserAvatar}
						alt={name}
					/>
				</div>
				<div className="text-xl pt-2">
					<p className="font-bold">{name}</p>
				</div>
			</div>
			<div className="flex">
				<button
					className="flex flex-shrink-0 mx-2 block text-newMessage rounded-full
                        hover:text-red-600 w-6 h-6">
					<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current" viewBox="0 0 20 20"
					     fill="currentColor">
						<path fillRule="evenodd"
						      d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
						      clipRule="evenodd"/>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default ChatHeader;