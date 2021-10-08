import "./styles/output.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import {AuthContext} from './providers/authProvider'


const App = () => {
	const {state} = React.useContext(AuthContext);
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/">
						{localStorage.getItem('user') && state.account ? <Chat/> : <Home/>}
					</Route>
					<Route exact path="/login">
						<Login/>
					</Route>
					<Route exact path="/register">
						<Register/>
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;