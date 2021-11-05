import {render, screen, cleanup, fireEvent} from "@testing-library/react"
import {BrowserRouter as Router} from 'react-router-dom'
import React from "react";
import {act} from 'react-dom/test-utils'
import {AuthContext} from "../../providers/authProvider";
import {RightPanelContext} from "../../providers/rightPanelProvider";
import {ModalContext} from "../../providers/modalProvider";
import {SearchChatsContext} from "../../providers/searchChatsProvider";
import Login from "../../pages/Login";

afterEach(cleanup)

test('render component', () => {
	// render(
	// 	<Router>
	// 		<Login/>
	// 	</Router>
	// )
	// expect(screen.getByRole("link", {name: /register/i})).toBeInTheDocument()
	// expect(screen.getByRole("link", {name: /already registered/i})).toBeInTheDocument()
})