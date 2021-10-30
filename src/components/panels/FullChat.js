import PanelHeader from "../PanelHeader";
import Message from "../Message";
import TypePanel from "../TypePanel";
import React from "react";
import {searchConversation} from "../../utils/message";
import {firestore} from "../../config/firebase";
import {AuthContext} from "../../providers/authProvider";
import Loading from "./Loading";
import {uid} from "uid";


const FullChat = ({name, avatar}) => {
	const {state} = React.useContext(AuthContext)
	const [conversation, setConversation] = React.useState([])


	React.useEffect(() => {
		const fetchConversation = async () => {
			let conversationId = await searchConversation({from: state.profile.nickname, to: name})
			conversationId = conversationId[0]

			firestore.collection('conversation').doc(conversationId)
				.onSnapshot((doc) => {
					setConversation(doc.data())
				});
		}
		fetchConversation()
		return fetchConversation()
	}, [state.profile.nickname, name])


	if (conversation.conversation) {
		return (
			<>
				<PanelHeader name={name} avatar={avatar}/>
				{/* CHAT MESSAGES */}
				<div className="chat-body p-8 flex-1 overflow-y-scroll">

					{conversation.conversation.map(i => {
						return <Message text={i.message}
						                isFromMe={i.from === state.profile.nickname}
						                timestamp={new Date(i.timestamp)}
						                key={uid()}
						/>
					})}

					{/*<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime() / 1000)}/>*/}
					{/*<Message text="Ciao bella" isFromMe={false}*/}
					{/*         timestamp={Math.round(new Date().getTime() / 1000)}/>*/}
					{/*<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime() / 1000)}/>*/}
					{/*<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime() / 1000)}/>*/}
					{/*<Message text="Ciao bella" isFromMe={false}*/}
					{/*         timestamp={Math.round(new Date().getTime() / 1000)}/>*/}
					{/*<Message text="Ciao bella" isFromMe={false}*/}
					{/*         timestamp={Math.round(new Date().getTime() / 1000)}/>*/}


				</div>

				{/* TYPE */}
				<TypePanel to={name}/>
			</>)
	} else {
		return <Loading/>
	}

}

export default FullChat