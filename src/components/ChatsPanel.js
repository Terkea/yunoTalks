import React from 'react'
import ChatPreview from "./ChatPreview";
import {AuthContext} from "../providers/authProvider";
import Loading from "./panels/Loading";
import {SearchChatsContext} from "../providers/searchChatsProvider";
import UserAvatar from '../img/anonymous_user.png'
import {decrypt, hexToUint8Array} from "../utils/e2ee";
import {ConversationsContext} from "../providers/conversationsProvider";


const ChatsPanel = () => {
	const {state} = React.useContext(AuthContext)
	const searchContext = React.useContext(SearchChatsContext)
	const conversationsContext = React.useContext(ConversationsContext)

	React.useEffect(() => {
		if (searchContext.state.keyword.length > 0) {
			conversationsContext.dispatch({
				type: 'SEARCH_CONVERSATION',
				payload: {
					keyword: searchContext.state.keyword,
					myNickname: state.profile.nickname
				}
			})
		}
		//
	}, [searchContext.state.keyword])

	if (state.profile.friends) {
		return (
			<div className="contacts p-2 flex-1 overflow-y-scroll">
				{state.profile.friends.length > 0 ?
					conversationsContext.state.conversations.map(i => {
						console.log(i.otherProfile, state.profile)
						if (i.data.conversation.length > 0) {
							return <ChatPreview
								key={i.data.initialisationVector}
								avatar={i.otherProfile.avatar || UserAvatar}
								name={i.otherProfile.nickname}
								lastMessage={
									i.sharedKey !== "" ?
										decrypt(
											i.data.conversation[i.data.conversation.length - 1].message,
											i.sharedKey,
											hexToUint8Array(i.data.initialisationVector)
										)
										: i.data.conversation[i.data.conversation.length - 1].message}
								timestamp={i.data.conversation[i.data.conversation.length - 1].timestamp}
								isNewMessage={false}/>
						} else {
							return <ChatPreview
								key={i.data.initialisationVector}
								avatar={i.otherProfile.avatar || UserAvatar}
								name={i.otherProfile.nickname}
								lastMessage={"Say hi to your new friend"}
								timestamp={""}
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


