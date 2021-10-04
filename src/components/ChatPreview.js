const ChatPreview = () => {
	return (
		<>
			<div
				className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
				<div className="w-16 h-16 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src="https://randomuser.me/api/portraits/women/61.jpg"
						alt=""
					/>
				</div>
				<div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
					<p>Angelina Jolie</p>
					<div className="flex items-center text-sm text-gray-600">
						<div className="min-w-0">
							<p className="truncate">
								Ok, see you at the subway in a bit.
							</p>
						</div>
						<p className="ml-2 whitespace-no-wrap">Just now</p>
					</div>
				</div>
			</div>

			{/* OTHER VARIATIONS*/}
			{/* UNREAD MESSAGE */}
			<div
				className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
				<div className="w-16 h-16 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src="https://randomuser.me/api/portraits/men/97.jpg"
						alt=""
					/>
					<div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
						<div className="bg-green-500 rounded-full w-3 h-3"/>
					</div>
				</div>
				<div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
					<p className="font-bold">Tony Stark</p>
					<div className="flex items-center text-sm font-bold">
						<div className="min-w-0">
							<p className="truncate">Hey, Are you there?</p>
						</div>
						<p className="ml-2 whitespace-no-wrap">10min</p>
					</div>
				</div>
				<div
					className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"/>
			</div>


			<div
				className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
				<div className="w-16 h-16 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src="https://randomuser.me/api/portraits/men/41.jpg"
						alt="User2"
					/>
				</div>
				<div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
					<p>Dwayne Johnson</p>
					<div className="flex items-center text-sm text-gray-600">
						<div className="min-w-0">
							<p className="truncate">
								How can i forget about that man!.
							</p>
						</div>
						<p className="ml-2 whitespace-no-wrap">12 Nov</p>
					</div>
				</div>
				<div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
					<img
						className="rounded-full w-full h-full object-cover"
						alt="user2"
						src="https://randomuser.me/api/portraits/men/41.jpg"
					/>
				</div>
			</div>


			<div
				className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
				<div className="w-16 h-16 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src="https://randomuser.me/api/portraits/men/70.jpg"
						alt="User2"
					/>
				</div>
				<div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
					<p>Johnny Depp</p>
					<div className="flex items-center text-sm text-gray-600">
						<div className="min-w-0">
							<p className="truncate">
								Alright! let's catchup tomorrow!.
							</p>
						</div>
						<p className="ml-2 whitespace-no-wrap">4 Nov</p>
					</div>
				</div>
			</div>


			<div
				className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
				<div className="w-16 h-16 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src="https://randomuser.me/api/portraits/men/20.jpg"
						alt="User2"
					/>
					<div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
						<div className="bg-green-500 rounded-full w-3 h-3"/>
					</div>
				</div>
				<div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
					<p>Leonardo Dicaprio</p>
					<div className="flex items-center text-sm text-gray-600">
						<div className="min-w-0">
							<p className="truncate">
								How can you leave Rose dude. I hate you!
							</p>
						</div>
						<p className="ml-2 whitespace-no-wrap">26 Oct</p>
					</div>
				</div>
			</div>


			<div
				className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
				<div className="w-16 h-16 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src="https://randomuser.me/api/portraits/men/32.jpg"
						alt="User2"
					/>
				</div>
				<div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
					<p>Tom Cruise</p>
					<div className="flex items-center text-sm text-gray-600">
						<div className="min-w-0">
							<p className="truncate">
								Happy birthday to you my friend!
							</p>
						</div>
						<p className="ml-2 whitespace-no-wrap">2 Oct</p>
					</div>
				</div>
				<div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
					<img
						className="rounded-full w-full h-full object-cover"
						alt="user2"
						src="https://randomuser.me/api/portraits/men/32.jpg"
					/>
				</div>
			</div>
		</>
	)
}

export default ChatPreview;