import Moment from "react-moment";
import clsx from "clsx";


const Notification = ({name, timestamp, isSeen, avatar}) => {
	return (
		<>
			<div className={clsx('flex flex-col md:flex-row items-center hover:bg-chatAction p-3 ml-3 mr-3 mt-2 rounded-lg', {
				'bg-chatAction': isSeen,
				'bg-newMessage': !isSeen
			})}>
				<div className="w-14 h-14 relative flex flex-shrink-0">
					<img
						className="shadow-md rounded-full w-full h-full object-cover"
						src={avatar} alt={name}/>
				</div>
				<p className="m-2 p-3 font-bold text-md ml-3">
					{name} send you a new friend request
					<span className="text-sm ml-3 font-thin">
						<Moment unix date={timestamp} format="D MMM"/>
					</span>
				</p>

				<div className="p-2 text-xs rounded-lg hover:bg-primary">Accept</div>
				<div className="p-2 text-xs rounded-lg hover:bg-primary">Decline</div>
			</div>
		</>
	)
}

export default Notification;