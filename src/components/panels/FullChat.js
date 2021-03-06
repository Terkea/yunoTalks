import PanelHeader from "../PanelHeader";
import Message from "../Message";
import TypePanel from "../TypePanel";
import React from "react";
import {searchConversation} from "../../utils/message";
import {firestore} from "../../config/firebase";
import {AuthContext, searchUserId} from "../../providers/authProvider";
import Loading from "./Loading";
import {uid} from "uid";
import {computeKeys, decrypt, hexToUint8Array, uncompressPrivateKey} from "../../utils/e2ee";


const FullChat = ({name, avatar}) => {
	const {state} = React.useContext(AuthContext)
	const [conversation, setConversation] = React.useState([])
	const [IV, setIV] = React.useState("")
	const [sharedKey, setSharedKey] = React.useState("");
	const [hasRightKey, setHasRightKey] = React.useState(null)

	React.useEffect(() => {
		const fetchConversation = async () => {
			let conversationId = await searchConversation({from: state.profile.nickname, to: name})
			// grab the IV convert it and store it in the state
			setIV(hexToUint8Array(conversationId[1].initialisationVector))
			conversationId = conversationId[0]
			firestore.collection('conversation').doc(conversationId)
				.onSnapshot((doc) => {
					setConversation(doc.data())
				});
		}
		fetchConversation();
		return fetchConversation();
	}, [state.profile.nickname, name])


	React.useEffect(() => {
		const getSharedKey = async () => {
			const privateKey = localStorage.getItem('key')
			const userProfile = await searchUserId(name)
			const publicKey = userProfile.publicKey

			// reconstruct the keys and generate the shared secret
			try {
				setSharedKey(computeKeys(uncompressPrivateKey(privateKey), hexToUint8Array(publicKey)))
				setHasRightKey(true)
			} catch (e) {
				setHasRightKey(false)
			}
		}
		getSharedKey();
	}, [name])


	try {
		if (conversation.conversation && (sharedKey || !hasRightKey) !== "") {
			return (
				<>
					<PanelHeader name={name} avatar={avatar}/>
					{/* CHAT MESSAGES */}
					<div className="chat-body p-8 flex-1 overflow-y-scroll">
						{conversation.conversation.map(i => {
							// in case the decryption throws an error
							// due to diverse reasons such as
							// wrong public/private key
							// return the encrypted message
							try {
								return <Message
									text={hasRightKey ? decrypt(i.message, sharedKey, IV) : i.message}
									isFromMe={i.from === state.profile.nickname}
									timestamp={new Date(i.timestamp)}
									key={uid()}
									avatar={avatar}
								/>
							} catch (e) {
								return <Message
									text={hasRightKey ? i.message : i.message}
									isFromMe={i.from === state.profile.nickname}
									timestamp={new Date(i.timestamp)}
									key={uid()}
									avatar={avatar}
								/>
							}
						})}
					</div>

					{/* TYPE */}
					<TypePanel to={name}/>
				</>)
		} else {
			return <Loading/>
		}
	} catch (e) {
		// in case the other party blocked this user
		// the conversation will be deleted resulting in an exception
		// reload to avoid the app from breaking
		window.location.reload(false);
	}

}

export default FullChat