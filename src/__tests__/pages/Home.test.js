import {render} from "@testing-library/react";
import React from "react";
import Home from "../../pages/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


test('render', () => {
	localStorage.setItem('user', JSON.stringify({state: {account: '123'}}))

	// mock auth context
	const state = {account: '123', profile: {nickname: "testing"}};

	const emptyValues = {state: "", dispatch: ""}
	// set up the context

	render(
		<Router>
			<Switch>
				<Route exact path="/">
					<Home/>
				</Route>
			</Switch>
		</Router>
	)
})
