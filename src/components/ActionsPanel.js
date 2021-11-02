import React from 'react'
import ActionButton from "./ActionButton";
import {RightPanelContext} from '../providers/rightPanelProvider'
import Settings from "./panels/Settings";
import Notifications from "./panels/Notifications";
import clsx from "clsx";
import {AuthContext, signOut} from "../providers/authProvider";
import {ModalContext} from "../providers/modalProvider";
import Modal from "./Modal";
import AddFriend from "./modals/AddFriend";
import {hasUnseenNotifications} from "../utils/notification";


const ActionsPanel = () => {
	const rp = React.useContext(RightPanelContext)
	const {state, dispatch} = React.useContext(AuthContext)
	const modalContext = React.useContext(ModalContext)
	const [newHasNotification, setHasNewNotification] = React.useState(false)

	const changePanel = (panel) => {
		rp.dispatch({type: 'SET_PANEL_CONTENT', payload: {content: panel}})
	}

	React.useEffect(() => {
		if (state.profile.nickname !== undefined) {
			hasUnseenNotifications({nickname: state.profile.nickname}).then(res => setHasNewNotification(res))
		}
	}, [state])

	return (
		<div className="flex flex-row p-2 w-0 min-w-full">
			<ActionButton
				onClick={() => changePanel(<Settings/>)}
				icon={
					<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current" viewBox="0 0 20 20"
					     fill="currentColor">
						<path fillRule="evenodd"
						      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0
					      01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561
					      2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0
					      012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734
					      2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0
					      01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3
					      3 0 100-6 3 3 0 000 6z"
						      clipRule="evenodd"/>
					</svg>
				} text="Settings"/>

			<Modal/>
			<ActionButton
				onClick={() => modalContext.dispatch({
					type: 'SET_CONTENT', payload: {
						content: <AddFriend/>,
						title: 'Add friend'
					}
				})}
				icon={
					<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current" viewBox="0 0 20 20"
					     fill="currentColor">
						<path
							d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1
							1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
					</svg>
				} text="Add a new friend"/>

			<ActionButton
				onClick={() => changePanel(<Notifications/>)}
				icon={
					<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 20 20"
					     fill={clsx('', {
						     '#4e38a1': newHasNotification,
						     'currentColor': !newHasNotification
					     })}>
						<path
							d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0
						00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
					</svg>
				} text="Notifications"/>

			<ActionButton
				onClick={() => {
					signOut()
					dispatch({type: 'LOGOUT'})
				}

				}
				icon={
					<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current" viewBox="0 0 20 20"
					     fill="currentColor">
						<path fillRule="evenodd"
						      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1
					      1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
						      clipRule="evenodd"/>
					</svg>
				} text="Logout"/>

		</div>
	)
}

export default ActionsPanel