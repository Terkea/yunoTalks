import "./styles/output.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {register, AuthContext, login, signOut, getProfile} from "./providers/authProvider";


const App = () => {
	const {state} = React.useContext(AuthContext);

	login('5@c.com', '1234567')
	// signOut()
	// register('1@b.com', '1234567', '123')
	// getProfile('5UWaMJnp1bgCAA49TETu4qYjAFdJ2').then(r => console.log(r))

	return (
		<>
			<button onClick={() => register('5@c.com', '1234567', '123')}>REGISTER</button>
			<Router>
				<Switch>
					<Route exact path="/">
						{localStorage.getItem('user') ? <p>CIAO</p> : <Home/>}
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