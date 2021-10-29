import React from 'react'
import ChatPreview from "./ChatPreview";
import {AuthContext, searchUserId} from "../providers/authProvider";
import Loading from "./panels/Loading";


const ChatsPanel = () => {
	const {state} = React.useContext(AuthContext)
	const [profiles, setProfiles] = React.useState([]);


	React.useEffect(() => {
		if (state.profile?.friends) {
			state.profile.friends.map(async i => {
				setProfiles([...profiles, await searchUserId(i)])
			})
		}
		// eslint-disable-next-line
	}, [state.profile?.friends])

	return (
		<>
			{state.profile.friends ?
				<div className="contacts p-2 flex-1 overflow-y-scroll">
					{profiles.map((i) => {
						return <ChatPreview
							key={i.nickname}
							avatar={i.avatar}
							name={i.nickname}
							timestamp={Math.round(new Date().getTime() / 1000)} isNewMessage={false}/>
					})}


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
				:
				<Loading/>}
		</>


	)
}

export default ChatsPanel


