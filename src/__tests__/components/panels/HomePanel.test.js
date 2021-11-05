import {render} from "@testing-library/react";
import HomePanel from "../../../components/panels/HomePanel";
import {AuthContext} from "../../../providers/authProvider";
import {RightPanelContext} from "../../../providers/rightPanelProvider";
import {ModalContext} from "../../../providers/modalProvider";
import {SearchChatsContext} from "../../../providers/searchChatsProvider";
import React from "react";

test(('initial render'), () => {
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
							<HomePanel/>
						</React.Suspense>}
					</SearchChatsContext.Provider>
				</ModalContext.Provider>
			</RightPanelContext.Provider>
		</AuthContext.Provider>
	)
})