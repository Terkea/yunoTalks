const TypePanel = () => {
	return (
		<>
			<div className="chat-footer flex-none">
				<div className="flex flex-row items-center p-4">
					<div className="relative flex-grow">
						<label>
							<input
								className="rounded-full py-2 pl-3 pr-10 w-full border border-chatAction focus:border-primary bg-chatAction focus:bg-primary focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
								type="text"
								defaultValue
								placeholder="Aa"
							/>
						</label>
					</div>
					<button
						type="button"
						className="flex flex-shrink-0 focus:outline-none mx-2 block text-newMessage hover:text-newMessage w-6 h-6"
					>
						<svg
							viewBox="0 0 20 20"
							className="w-full h-full fill-current"
						>
							<path
								d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z"/>
						</svg>
					</button>
				</div>
			</div>
		</>
	)
}

export default TypePanel