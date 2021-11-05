import {render, screen, cleanup, fireEvent, waitFor} from "@testing-library/react"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from "react";
import {act} from 'react-dom/test-utils'
import {MemoryRouter} from "react-router-dom";
import {AuthContext} from "../../providers/authProvider";
import {RightPanelContext} from "../../providers/rightPanelProvider";
import {ModalContext} from "../../providers/modalProvider";
import {SearchChatsContext} from "../../providers/searchChatsProvider";
import Login from "../../pages/Login";
import Chat from "../../pages/Chat";

afterEach(cleanup)

test('render component', () => {
	render(
		<ModalContext.Provider value={{state: "", dispatch: jest.fn()}}>
			<Router>
				<Login/>
			</Router>
		</ModalContext.Provider>
	)
	expect(screen.getByText(/forgotten password?/i)).toBeInTheDocument()
	expect(screen.getByRole("button", {name: /sign up/i})).toBeInTheDocument()
})

test('click the login button with no data', async () => {
	render(
		<ModalContext.Provider value={{state: "", dispatch: jest.fn()}}>
			<Router>
				<Login/>
			</Router>
		</ModalContext.Provider>
	)
	await act(async () => {
		fireEvent.change(await screen.findByPlaceholderText('Email address'), {target: {value: ''}})
		fireEvent.change(await screen.findByPlaceholderText('Password'), {target: {value: ''}})
		fireEvent.submit(screen.getByRole("button", {name: /sign up/i}))
	})

	expect(screen.getByText('Email field required')).toBeInTheDocument()
	expect(screen.getByText('Password field required')).toBeInTheDocument()
})

test('click the login button with invalid data', async () => {
	render(
		<ModalContext.Provider value={{state: "", dispatch: jest.fn()}}>
			<Router>
				<Login/>
			</Router>
		</ModalContext.Provider>
	)
	await act(async () => {
		fireEvent.change(await screen.findByPlaceholderText('Email address'), {target: {value: 'tt@testing.com'}})
		fireEvent.change(await screen.findByPlaceholderText('Password'), {target: {value: '123'}})
		fireEvent.submit(await screen.getByRole("button", {name: /sign up/i}))
	})

	await waitFor(() =>
		expect(screen.getByText('Error: There is no user record corresponding to this identifier.' +
			' The user may have been deleted.')))
})

test('click the login button with valid data', async () => {
	global.console.error = jest.fn().mockImplementation(() => {})
	// mock auth context
	const state = {account: '123', profile: {nickname: "testingAccount"}};
	render(
		<AuthContext.Provider value={{state: state, dispatch: jest.fn()}}>
			<SearchChatsContext.Provider value={{state: {keyword: ""}, dispatch: ""}}>
				<RightPanelContext.Provider value={{state: "", dispatch: jest.fn()}}>
					<ModalContext.Provider value={{state: "", dispatch: jest.fn()}}>
						<MemoryRouter initialEntries={['/login']}>
							<Switch>
								<Route exact path="/">
									<Chat/>
								</Route>
								<Route exact path="/login">
									<Login/>
								</Route>
							</Switch>
						</MemoryRouter>
					</ModalContext.Provider>
				</RightPanelContext.Provider>
			</SearchChatsContext.Provider>
		</AuthContext.Provider>
	)

	await act(async () => {
		await fireEvent.change(await screen.findByPlaceholderText('Email address'), {target: {value: 'test@testing.com'}})
		await fireEvent.change(await screen.findByPlaceholderText('Password'), {target: {value: '123456789'}})
		await fireEvent.submit(await screen.getByRole("button", {name: /sign up/i}))
	})

	await waitFor(() => expect(screen.getByText('testingAccount')).toBeInTheDocument())
})

test('click the forgotten password button', async () => {
	const value = {state: "", dispatch: jest.fn()}
	render(
		<ModalContext.Provider value={value}>
			<Router>
				<Login/>
			</Router>
		</ModalContext.Provider>
	)

	await act(async () => {
		fireEvent.click(await screen.getByText(/forgotten password?/i))
	})

	await waitFor(() => expect(value.dispatch).toBeCalledTimes(1))
})