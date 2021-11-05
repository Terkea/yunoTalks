import {render, screen, cleanup, fireEvent} from "@testing-library/react"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from "../../pages/Register";
import React from "react";
import {act} from 'react-dom/test-utils'
import {AuthContext} from "../../providers/authProvider";
import {RightPanelContext} from "../../providers/rightPanelProvider";
import {ModalContext} from "../../providers/modalProvider";
import {SearchChatsContext} from "../../providers/searchChatsProvider";
import Login from "../../pages/Login";

afterEach(cleanup)

test('render component', () => {
	render(
		<Router>
			<Register/>
		</Router>
	)
	expect(screen.getByRole("link", {name: /register/i})).toBeInTheDocument()
	expect(screen.getByRole("link", {name: /already registered/i})).toBeInTheDocument()
})

test('click the register button when the form is empty', async () => {
	render(
		<Router>
			<Register/>
		</Router>
	)

	await act(async () => {
		fireEvent.submit(screen.getByRole("link", {name: /register/i}))
	})

	expect(screen.getByText("Email field required")).toBeInTheDocument()
	expect(screen.getByText("Username field required")).toBeInTheDocument()
	expect(screen.getByText("Password field required")).toBeInTheDocument()
	expect(screen.getByText("Confirm password field required")).toBeInTheDocument()
})

test('click the register button when the passwords differ and the initial password is too short', async () => {
	render(
		<Router>
			<Register/>
		</Router>
	)

	await act(async () => {
		fireEvent.change(await screen.findByPlaceholderText('Password'), {target: {value: '123'}})
		fireEvent.submit(screen.getByRole("link", {name: /register/i}))
	})

	expect(screen.getByText("Passwords must match")).toBeInTheDocument()
	expect(screen.getByText("password must be at least 8 characters")).toBeInTheDocument()
})

test('click already registered, should redirect to login page', async () => {
	render(
		<ModalContext.Provider value={{state: "", dispatch: jest.fn()}}>
			<Router>
				<Switch>
					<Route exact path="/login">
						<Login/>
					</Route>
					<Route exact path="/">
						<Register/>
					</Route>
				</Switch>
			</Router>
		</ModalContext.Provider>
	)

	await act(async () => {
		fireEvent.click(screen.getByRole("link", {name: "Already registered?"}))
	})

	expect(await screen.findByText("Sign up to your account")).toBeInTheDocument()

})


test('register account', async () => {
	// mock auth context
	const state = {account: '123', profile: {nickname: "testing"}};

	const emptyValues = {state: "", dispatch: jest.fn()}
	// set up the context

	render(
		<AuthContext.Provider value={{state: state}}>
			<RightPanelContext.Provider value={emptyValues}>
				<ModalContext.Provider value={emptyValues}>
					<SearchChatsContext.Provider value={{state: {keyword: ""}}}>
						{<React.Suspense fallback={'test loading'}>
							<Router>
								<Register/>
							</Router>
						</React.Suspense>}
					</SearchChatsContext.Provider>
				</ModalContext.Provider>
			</RightPanelContext.Provider>
		</AuthContext.Provider>
	)

	await act(async () => {
		fireEvent.change(await screen.findByPlaceholderText('Email address'), {target: {value: 'testing@gmail.com'}})
		fireEvent.change(await screen.findByPlaceholderText('Username'), {target: {value: 'test machine'}})
		fireEvent.change(await screen.findByPlaceholderText('Password'), {target: {value: '12345678'}})
		fireEvent.change(await screen.findByPlaceholderText('Confirm Password'), {target: {value: '12345678'}})
		fireEvent.submit(screen.getByRole("link", {name: /register/i}))
	})

	// if the registration passed the rightpanel should dispatch the homepanel
	// which in this scenario will be jest.fn()
	// count the number of times that function has been called
	// if its equal to one it means the user was logged in and landed on the homepage
	expect(emptyValues.dispatch).toHaveBeenCalledTimes(1)
})