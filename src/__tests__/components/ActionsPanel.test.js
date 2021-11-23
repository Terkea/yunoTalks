import Chat from "../../pages/Chat";
import {render, waitFor, screen} from "@testing-library/react"
import {RightPanelContext} from "../../providers/rightPanelProvider";
import {AuthContext} from "../../providers/authProvider";
import {ModalContext} from "../../providers/modalProvider";
import React from 'react'
import {SearchChatsContext} from "../../providers/searchChatsProvider";
import ActionsPanel from "../../components/ActionsPanel";

test(('render component'), () => {
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
							<ActionsPanel/>
						</React.Suspense>}
					</SearchChatsContext.Provider>
				</ModalContext.Provider>
			</RightPanelContext.Provider>
		</AuthContext.Provider>
	)

})