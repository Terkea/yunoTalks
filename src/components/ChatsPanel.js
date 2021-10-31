import React from 'react'
import ChatPreview from "./ChatPreview";
import {AuthContext, searchUserId} from "../providers/authProvider";
import Loading from "./panels/Loading";
import {SearchChatsContext} from "../providers/searchChats";
import UserAvatar from '../img/anonymous_user.png'


const ChatsPanel = () => {
	const {state} = React.useContext(AuthContext)
	const searchContext = React.useContext(SearchChatsContext)
	const [profiles, setProfiles] = React.useState([]);


	React.useEffect(() => {
		// check if the profile was loaded
		if (state.profile?.friends) {
			// interate through the friend list
			state.profile.friends.map(async i => {
				// in case theres a keyword set use it to filter the results
				if (searchContext.state.keyword && searchContext.state.keyword.length > 0) {
					setProfiles(profiles.filter(j => j.nickname.includes(searchContext.state.keyword)))
				} else {
					const profile = await searchUserId(i);
					if (profiles.length > 0) {
						// if the profile is already in the list dont add it once again
						// eslint-disable-next-line array-callback-return
						profiles.map(j => {
							if (j.nickname !== profile.nickname) {
								setProfiles([...profiles, profile])
							}
						})
						//	if the profiles are not set populate the state
					} else {
						setProfiles([...profiles, profile])
					}
				}
			})
		}
		// eslint-disable-next-line
	}, [state.profile?.friends, searchContext.state.keyword])

	return (
		<>
			{/*todo: grab the last message, update the chatpreview component, display some message if the user has no friends*/}
			{state.profile.friends ?
				<div className="contacts p-2 flex-1 overflow-y-scroll">
					{profiles.map((i) => {
						return <ChatPreview
							key={i.nickname}
							avatar={i.avatar || UserAvatar}
							name={i.nickname}
							timestamp={Math.round(new Date().getTime() / 1000)} isNewMessage={false}/>
					})}


					{/* INDIVIDUAL CHAT */}
					{/*<ChatPreview*/}
					{/*	avatar="https://randomuser.me/api/portraits/women/33.jpg"*/}
					{/*	name="Scarlett Johansson"*/}
					{/*	timestamp={Math.round(new Date().getTime() / 1000)} isNewMessage={false}/>*/}


					{/*<ChatPreview*/}
					{/*	avatar="https://randomuser.me/api/portraits/men/97.jpg"*/}
					{/*	name="Tony Stark"*/}
					{/*	timestamp={1633582823} isNewMessage={true}/>*/}
				</div>
				:
				<Loading/>}
		</>


	)
}

export default ChatsPanel


