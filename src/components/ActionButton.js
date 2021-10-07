const ActionButton = ({icon, text, onClick}) => {
	return (
		<div className="text-sm ml-3 mr-3">
			<button
				onClick={onClick}
				className="flex flex-shrink-0 focus:outline-none block bg-chatAction text-gray-600
				hover:bg-primary rounded-full w-12 h-12 p-3"
			>
				{icon}
			</button>
		</div>
	)
}

export default ActionButton;