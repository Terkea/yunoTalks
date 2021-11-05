import {render, screen, cleanup, mockClear} from "@testing-library/react"
import App from "../App"
import React from "react";
import {AuthContext} from "../providers/authProvider";
import {RightPanelContext} from "../providers/rightPanelProvider";
import {ModalContext} from "../providers/modalProvider";
import {SearchChatsContext} from "../providers/searchChatsProvider";

afterEach(cleanup)

test('initial render with no session or private key, ' +
	'it should render the Home component,' +
	'looking for the register and login links', async () => {
	render(<App/>)
	expect(screen.getByRole("link", {name: /register/i})).toBeInTheDocument()
	expect(screen.getByRole("link", {name: /login/i})).toBeInTheDocument()
})


describe('localstorage + state', () => {
	// mock the localstorage
	const localStorageMock = {
		getItem: jest.fn(),
		setItem: jest.fn(),
		clear: jest.fn()
	};
	global.localStorage = localStorageMock;
	// disable the error since we expect it
	global.console.error = jest.fn().mockImplementation(() => {
	})


	test('initial render with valid structure for localstorage and no state,' +
		'it should render the home page', async () => {
		localStorage.setItem('user', JSON.stringify({state: {account: '123'}}))
		expect(() => render(<App/>)).toThrow(/Cannot read property 'account' of undefined/i);
	})

	test('initial render with valid structure for localstorage and state,' +
		'it should render the chat page', async () => {
		localStorage.setItem('user', JSON.stringify({state: {account: '123'}}))

		// mock auth context
		const state = {account: '123', profile: {nickname: "testing"}};

		const emptyValues = {state: "", dispatch: ""}
		// set up the context

		render(
			<AuthContext.Provider value={{state: state, dispatch: ""}}>
				<RightPanelContext.Provider value={emptyValues}>
					<ModalContext.Provider value={emptyValues}>
						<SearchChatsContext.Provider value={{state: {keyword: ""}, dispatch: ""}}>
							{<React.Suspense fallback={'test loading'}>
								<App/>
							</React.Suspense>}
						</SearchChatsContext.Provider>
					</ModalContext.Provider>
				</RightPanelContext.Provider>
			</AuthContext.Provider>
		)

		// check if the nickname of our mock account renders in the chat page
		expect(await screen.findByText(state.profile.nickname)).toBeInTheDocument()

	})
})
