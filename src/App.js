import "./styles/output.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {AuthContext} from "./providers/authProvider";

const App = () => {
	const {state} = React.useContext(AuthContext);
	const {isLoggedIn} = state;
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/">
						{isLoggedIn ? <p>sex</p> : <Home/>}
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