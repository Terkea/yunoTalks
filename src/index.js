import React from 'react';
import ReactDOM from 'react-dom';
import {ModalProvider} from "./providers/modalProvider";
import App from "./App";
import {AuthProvider} from "./providers/authProvider";
import {RightPanelProvider} from "./providers/rightPanelProvider";
import {SearchChatsProvider} from "./providers/searchChats";


ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<RightPanelProvider>
				<SearchChatsProvider>
					<ModalProvider>
						<App/>
					</ModalProvider>
				</SearchChatsProvider>
			</RightPanelProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
