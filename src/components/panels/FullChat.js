import PanelHeader from "../PanelHeader";
import Message from "../Message";
import TypePanel from "../TypePanel";

const FullChat = () => {
	return (
		<>
			<PanelHeader name="Cutie patotie" avatar="https://randomuser.me/api/portraits/women/33.jpg"/>
			{/* CHAT MESSAGES */}
			<div className="chat-body p-8 flex-1 overflow-y-scroll">
				<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime()/1000)}/>
				<Message text="Ciao bella" isFromMe={false} timestamp={Math.round(new Date().getTime()/1000)}/>
				<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime()/1000)}/>
				<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime()/1000)}/>
				<Message text="Ciao bella" isFromMe={false} timestamp={Math.round(new Date().getTime()/1000)}/>
				<Message text="Ciao bella" isFromMe={false} timestamp={Math.round(new Date().getTime()/1000)}/>
			</div>

			{/* TYPE */}
			<TypePanel/>
		</>
	)
}

export default FullChat