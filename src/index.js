import React from 'react';
import ReactDOM from 'react-dom';
import {ModalProvider} from "./providers/modalProvider";
import App from "./App";
import {AuthProvider} from "./providers/authProvider";
import {RightPanelProvider} from "./providers/rightPanelProvider";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<RightPanelProvider>
				<ModalProvider>
					<App/>
				</ModalProvider>
			</RightPanelProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
