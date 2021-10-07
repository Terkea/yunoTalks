const ChatHeader = () => {
	return (
		<div
			className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
			<div className="flex">
				<div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src="https://randomuser.me/api/portraits/women/33.jpg"
						alt=""
					/>
				</div>
				<div className="text-xl pt-2">
					<p className="font-bold">Scarlett Johansson</p>
				</div>
			</div>
		</div>
	)
}

export default ChatHeader;