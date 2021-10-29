import PanelHeader from "../PanelHeader";
import Message from "../Message";
import TypePanel from "../TypePanel";


const FullChat = ({name, avatar}) => {
	return (
		<>
			<PanelHeader name={name} avatar={avatar}/>
			{/* CHAT MESSAGES */}
			<div className="chat-body p-8 flex-1 overflow-y-scroll">
				<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime() / 1000)}/>
				<Message text="Ciao bella" isFromMe={false} timestamp={Math.round(new Date().getTime() / 1000)}/>
				<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime() / 1000)}/>
				<Message text="Ciao bella" isFromMe={true} timestamp={Math.round(new Date().getTime() / 1000)}/>
				<Message text="Ciao bella" isFromMe={false} timestamp={Math.round(new Date().getTime() / 1000)}/>
				<Message text="Ciao bella" isFromMe={false} timestamp={Math.round(new Date().getTime() / 1000)}/>
			</div>

			{/* TYPE */}
			<TypePanel to={name}/>
		</>
	)
}

export default FullChat