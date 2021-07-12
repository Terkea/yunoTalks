import "./styles/output.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/">
						<Home/>
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