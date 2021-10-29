import PanelHeader from "../PanelHeader";
import Notification from "../Notification";
import {AuthContext} from "../../providers/authProvider";
import React from 'react'
import {firestore} from "../../config/firebase";
import UserAvatar from '../../img/anonymous_user.png'


const Notifications = () => {
	const {state} = React.useContext(AuthContext)
	const [notifications, setNotifications] = React.useState([])


	React.useEffect(() => {
		firestore.collection("notification")
			.where('to', '==', state.profile.nickname)
			.onSnapshot(querySnapshot => {
				setNotifications(
					querySnapshot.docs.map(doc => ({
						id: doc.id,
						data: doc.data()
					}))
				)
			})
	}, [state.profile.nickname])


	return (
		<>
			<PanelHeader name="Notifications"/>
			{notifications.map(i => {
				return <Notification key={i.id} id={i.id} uid={state.account.uid} isSeen={i.data.seen}
				                     timestamp={new Date(i.data.timestamp)}
				                     from={i.data.from}
				                     to={i.data.to}
				                     avatar={i.data.avatar || UserAvatar} name={i.data.from}
				                     response={i.data.response}/>
			})}

			{notifications.length === 0 && <p>You have no notifications</p>}
		</>
	)
}

export default Notifications