import React from 'react'
import {RightPanelContext} from '../providers/rightPanelProvider'
import clsx from "clsx";
import Moment from 'react-moment';
import FullChat from "./panels/FullChat";
import UserAvatar from '../img/anonymous_user.png'


const ChatPreview = ({name, avatar, timestamp, isNewMessage, id, lastMessage}) => {
	const {dispatch} = React.useContext(RightPanelContext)

	const changePanel = () => {
		dispatch({type: 'SET_PANEL_CONTENT', payload: {content: <FullChat name={name} avatar={avatar || UserAvatar}/>}})
	}

	return (
		<div
			onClick={changePanel}
			className="flex justify-between items-center p-3 hover:bg-chatAction rounded-lg relative">
			<div className="w-16 h-16 relative flex flex-shrink-0">
				<img
					className="shadow-md rounded-full w-full h-full object-cover"
					src={avatar || UserAvatar}
					alt={name}
				/>
			</div>
			<div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
				<p className={clsx('', isNewMessage && 'font-bold')}> {name}</p>
				<div className={clsx('flex items-center text-sm', {
					'font-bold text-white': isNewMessage,
					'text-gray-600': !isNewMessage
				})}>
					<div className="min-w-0">
						<p className="truncate">{lastMessage}</p>
					</div>

					{timestamp ? <p className="ml-2 whitespace-no-wrap">
						<Moment date={timestamp} format="D MMM YYYY HH:mm"/>
					</p> : null}

				</div>
			</div>
			{isNewMessage && <div
				className="bg-newMessage w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"/>
			}
		</div>
	)
}

export default ChatPreview;