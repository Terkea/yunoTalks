import React from 'react'
import ChatPreview from "./ChatPreview";
import {AuthContext, searchUserId} from "../providers/authProvider";
import Loading from "./panels/Loading";
import {SearchChatsContext} from "../providers/searchChatsProvider";
import UserAvatar from '../img/anonymous_user.png'
import {searchLastMessage} from "../utils/message";
import {computeKeys, decrypt, hexToUint8Array, uncompressPrivateKey} from "../utils/e2ee";
import {ConversationsContext} from "../providers/conversationsProvider";


const ChatsPanel = () => {
	const {state} = React.useContext(AuthContext)
	const searchContext = React.useContext(SearchChatsContext)
	const conversationsContext = React.useContext(ConversationsContext)

	if (state.profile.friends) {
		return (
			<div className="contacts p-2 flex-1 overflow-y-scroll">
				{state.profile.friends.length > 0 ?
					conversationsContext.state.conversations.map(i => {
						return <ChatPreview
							key={i.data.initialisationVector}
							avatar={i.avatar || UserAvatar}
							name={i.otherProfile.nickname}
							lastMessage={"test"}
							// timestamp={new Date(i.lastMessage[0].timestamp)}
							timestamp={Date.now()}
							isNewMessage={false}/>
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


