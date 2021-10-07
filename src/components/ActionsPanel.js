const ActionsPanel = () => {
	return (
		<div className="active-users flex flex-row p-2 w-0 min-w-full">
			<div className="text-sm text-center mr-4">
				<button
					className="flex flex-shrink-0 focus:outline-none block bg-chatAction text-gray-600 rounded-full w-20 h-20"
					type="button"
				>
					<svg
						className="w-full h-full fill-current"
						viewBox="0 0 24 24"
					>
						<path
							d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/>
					</svg>
				</button>
				<p>Your Story</p>
			</div>
			<div className="text-sm text-center mr-4">
				<div className="p-1 border-4 border-blue-600 rounded-full">
					<div className="w-16 h-16 relative flex flex-shrink-0">
						<img
							className="shadow-md rounded-full w-full h-full object-cover"
							src="https://randomuser.me/api/portraits/women/12.jpg"
							alt=""
						/>
					</div>
				</div>
				<p>Anna</p>
			</div>
			<div className="text-sm text-center mr-4">
				<div className="p-1 border-4 border-transparent rounded-full">
					<div className="w-16 h-16 relative flex flex-shrink-0">
						<img
							className="shadow-md rounded-full w-full h-full object-cover"
							src="https://randomuser.me/api/portraits/men/75.jpg"
							alt=""
						/>
						<div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
							<div className="bg-green-500 rounded-full w-3 h-3"/>
						</div>
					</div>
				</div>
				<p>Jeff</p>
			</div>
			<div className="text-sm text-center mr-4">
				<div className="p-1 border-4 border-blue-600 rounded-full">
					<div className="w-16 h-16 relative flex flex-shrink-0">
						<img
							className="shadow-md rounded-full w-full h-full object-cover"
							src="https://randomuser.me/api/portraits/women/42.jpg"
							alt=""
						/>
					</div>
				</div>
				<p>Cathy</p>
			</div>
		</div>
	)
}

export default ActionsPanel