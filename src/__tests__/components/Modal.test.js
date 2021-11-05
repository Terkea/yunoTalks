import Chat from "../../pages/Chat";
import {render} from "@testing-library/react"
import {RightPanelContext} from "../../providers/rightPanelProvider";
import {AuthContext} from "../../providers/authProvider";
import {ModalContext} from "../../providers/modalProvider";
import React from 'react'
import {SearchChatsContext} from "../../providers/searchChatsProvider";
import Modal from "../../components/Modal";

test(('render component'), () => {
	localStorage.setItem('user', JSON.stringify({state: {account: '123'}}))

	// mock auth context
	const state = {account: '123', profile: {nickname: "testing"}};

	const emptyValues = {state: "", dispatch: ""}
	// set up the context

	render(
		<ModalContext.Provider value={emptyValues}>
			<Modal/>
		</ModalContext.Provider>
	)

})