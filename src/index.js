import React from 'react';
import ReactDOM from 'react-dom';
import {ModalProvider} from "./providers/modalProvider";
import App from "./App";
import {AuthProvider} from "./providers/authProvider";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<ModalProvider>
				<App/>
			</ModalProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
