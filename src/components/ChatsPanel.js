import React from 'react'
import ChatPreview from "./ChatPreview";


const ChatsPanel = () => {
	return (
		<div className="contacts p-2 flex-1 overflow-y-scroll">
			{/* INDIVIDUAL CHAT */}
			<ChatPreview
				avatar="https://randomuser.me/api/portraits/women/33.jpg"
				name="Scarlett Johansson"
				timestamp={Math.round(new Date().getTime() / 1000)} isNewMessage={false}/>


			<ChatPreview
				avatar="https://randomuser.me/api/portraits/men/97.jpg"
				name="Tony Stark"
				timestamp={1633582823} isNewMessage={true}/>
		</div>
	)
}

export default ChatsPanel