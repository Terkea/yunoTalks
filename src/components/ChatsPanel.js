import React from 'react'
import ChatPreview from "./ChatPreview";
import {AuthContext, searchUserId} from "../providers/authProvider";
import Loading from "./panels/Loading";
import {SearchChatsContext} from "../providers/searchChats";
import UserAvatar from '../img/anonymous_user.png'
import {searchLastMessage} from "../utils/message";
import {computeKeys, decrypt, hexToUint8Array, uncompressPrivateKey} from "../utils/e2ee";


const getSharedKey = async (publicKey) => {
	if (localStorage.getItem('key')) {
		const privateKey = localStorage.getItem('key');
		return await computeKeys(uncompressPrivateKey(privateKey), hexToUint8Array(publicKey))
	}
}


const ChatsPanel = () => {
	const {state} = React.useContext(AuthContext)
	const searchContext = React.useContext(SearchChatsContext)
	const [profiles, setProfiles] = React.useState([]);


	// GET THE CONVERSATIONS
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
						profiles.map(async j => {
							if (j.nickname !== profile.nickname) {
								profile.lastMessage = await searchLastMessage({
									from: profile.nickname,
									to: state.profile.nickname
								})
								profile.sharedKey = getSharedKey(profile.publicKey) || null
								setProfiles([...profiles, profile])
							}
						})
						//	if the profiles are not set populate the state
					} else {
						profile.lastMessage = await searchLastMessage({
							from: profile.nickname,
							to: state.profile.nickname
						})
						profile.sharedKey = await getSharedKey(profile.publicKey) || null
						setProfiles([...profiles, profile])
					}
				}
			})
		}
		// eslint-disable-next-line
	}, [state.profile?.friends, searchContext.state.keyword])


	if (state.profile.friends) {
		return (
			<div className="contacts p-2 flex-1 overflow-y-scroll">
				{profiles.length > 0 ? profiles.map((i) => {
						if (i.sharedKey !== null) {
							return <ChatPreview
								key={i.nickname}
								avatar={i.avatar || UserAvatar}
								name={i.nickname}
								lastMessage={decrypt(i.lastMessage[0].message,
									i.sharedKey,
									hexToUint8Array(i.lastMessage[1]))
								}
								timestamp={new Date(i.lastMessage[0].timestamp)}
								isNewMessage={false}/>
						} else {
							return <ChatPreview
								key={i.nickname}
								avatar={i.avatar || UserAvatar}
								name={i.nickname}
								lastMessage={i.lastMessage[0].message}
								timestamp={new Date(i.lastMessage[0].timestamp)}
								isNewMessage={false}/>
						}
					})
					: <p className="ml-4 text-lg">You don't appear to have any friends yet.</p>
				}
			</div>
		)
	} else {
		return (<Loading/>)
	}


}

export default ChatsPanel


