import React from 'react';
import ReactDOM from 'react-dom';
import {ModalProvider} from "./providers/modalProvider";
import App from "./App";
import {AuthProvider} from "./providers/authProvider";
import {RightPanelProvider} from "./providers/rightPanelProvider";
import {SearchChatsProvider} from "./providers/searchChatsProvider";
import {ConversationsProvider} from './providers/conversationsProvider'

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<ConversationsProvider>
				<RightPanelProvider>
					<SearchChatsProvider>
						<ModalProvider>
							<App/>
						</ModalProvider>
					</SearchChatsProvider>
				</RightPanelProvider>
			</ConversationsProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
