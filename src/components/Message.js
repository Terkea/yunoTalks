import Moment from "react-moment";

const Message = ({timestamp, isFromMe, text}) => {
	return (
		<>
			{isFromMe ?
				<div className="flex flex-row justify-end mt-2">
					<div className="messages text-sm text-white grid grid-flow-row gap-2">
						<div className="flex items-center flex-row-reverse group">
							<p className="px-6 py-3 rounded-t-full rounded-l-full bg-newMessage max-w-xs lg:max-w-md">
								{text}
							</p>
							<p className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2
						text-gray-500 p-2">
								<Moment unix date={timestamp} format="D MMM YYYY HH:mm"/>
							</p>
						</div>
					</div>
				</div>
				:
				<div className="flex flex-row justify-start mt-2">
					<div className="w-11 h-11 relative flex flex-shrink-0 mr-4">
						<img
							className="shadow-md rounded-full w-full h-full object-cover"
							src="https://randomuser.me/api/portraits/women/33.jpg"
							alt=""
						/>
					</div>
					<div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
						<div className="flex items-center group">
							<p className="px-6 py-3 rounded-t-full rounded-r-full bg-chatAction max-w-xs lg:max-w-md text-gray-200">
								{text}
							</p>
							<p className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2
						text-gray-500 p-2">
								<Moment unix date={timestamp} format="HH:mm" durationFromNow/>
							</p>
						</div>
					</div>
				</div>
			}


		</>
	)
}

export default Message