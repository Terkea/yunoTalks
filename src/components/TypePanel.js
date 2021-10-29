const TypePanel = ({to}) => {
	return (
		<>
			<div className="chat-footer flex-none">
				<div className="flex flex-row items-center p-4">
					<div className="relative flex-grow">
						<label>
							<input
								className="rounded-full py-2 pl-3 pr-10 w-full border border-chatAction
								focus:border-primary bg-chatAction focus:bg-primary focus:outline-none text-gray-200
								focus:shadow-md transition duration-300 ease-in"
								type="text"
								defaultValue
								placeholder="Aa"
							/>
						</label>
					</div>

					<button
						type="button"
						className="flex flex-shrink-0 mx-2 block text-newMessage rounded-full
						hover:text-actionH w-10 h-10">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
						     className="w-full h-full fill-current"
						     fill="currentColor">
							<path fillRule="evenodd"
							      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586
							      9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
							      clipRule="evenodd"/>
						</svg>
					</button>
				</div>
			</div>
		</>
	)
}

export default TypePanel