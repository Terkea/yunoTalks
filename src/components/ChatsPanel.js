import ChatPreview from "./ChatPreview";

const ChatsPanel = () => {
	return (
		<div className="contacts p-2 flex-1 overflow-y-scroll">
			{/* INDIVIDUAL CHAT */}
			<ChatPreview/>
		</div>
	)
}

export default ChatsPanel