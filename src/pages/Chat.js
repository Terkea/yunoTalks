import Branding from "../components/Branding";
import SearchBar from "../components/SearchBar";
import ActionsPanel from "../components/ActionsPanel";
import ChatsPanel from "../components/ChatsPanel";
import RightPanel from "../components/RightPanel";

const Chat = () => {
	return (
		<div>
			{/* Messenger Clone */}
			<div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
				<div className="flex-1 flex flex-col">
					<div className="flex-grow flex flex-row min-h-0">
						<div
							className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
							{/* LOGO MESSENGER + ICON */}
							<Branding/>

							{/* STORY PANEL */}
							<ActionsPanel/>

							{/* SEARCH BAR */}
							<SearchBar/>

							{/* CHATS  */}
							<ChatsPanel/>

						</div>

						{/* RIGHT PANEL */}
						<RightPanel/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat