import React from 'react';
import ReactDOM from 'react-dom';
import {ModalProvider} from "./providers/modalProvider";
import App from "./App";
import {AuthProvider} from "./providers/authProvider";
import {RightPanelProvider} from "./providers/rightPanelProvider";
import {SearchChatsProvider} from "./providers/searchChats";
import Test from "./pages/Test";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<RightPanelProvider>
				<SearchChatsProvider>
					<ModalProvider>
						{/*<App/>*/}
						<Test/>
					</ModalProvider>
				</SearchChatsProvider>
			</RightPanelProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
