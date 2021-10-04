import ChatHeader from "./ChatHeader";
import Message from "./Message";
import TypePanel from "./TypePanel";

const FullChat = () => {
	return (
		<>
			<ChatHeader/>
			{/* CHAT MESSAGES */}
			<div className="chat-body p-4 flex-1 overflow-y-scroll">
				<Message/>
			</div>

			{/* TYPE */}
			<TypePanel/>
		</>
	)
}

export default FullChat