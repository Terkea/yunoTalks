import React from 'react'
import Branding from "../components/Branding";
import SearchBar from "../components/SearchBar";
import ActionsPanel from "../components/ActionsPanel";
import ChatsPanel from "../components/ChatsPanel";
import {RightPanelContext} from "../providers/rightPanelProvider";
import Loading from "../components/panels/Loading";


const Chat = () => {
	const RightPanel = React.lazy(() => import("../components/RightPanel"))
	const {state} = React.useContext(RightPanelContext)
	return (
		<>
			<div>
				<div className="h-screen w-full flex text-gray-200 bg-chatBG overflow-hidden antialiased">
					<div className="flex-1 flex flex-col">
						<div className="flex-grow flex flex-row min-h-0">
							<div
								className="flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm
								md:w-2/5 transition-all duration-300 ease-in-out">
								<Branding/>
								<ActionsPanel/>
								<SearchBar/>
								<ChatsPanel/>
							</div>
							<React.Suspense fallback={<Loading/>}>
								<RightPanel panel={state.content}/>
							</React.Suspense>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Chat