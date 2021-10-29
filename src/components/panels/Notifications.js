import PanelHeader from "../PanelHeader";
import Notification from "../Notification";
import {AuthContext, getProfile, getProfileByNickname} from "../../providers/authProvider";
import React from 'react'
import {getUserNotifications} from "../../utils/notification";
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
	}, [])


	return (
		<>
			<PanelHeader name="Notifications"/>
			{notifications.map(i => {
				return <Notification key={i.id} isSeen={false} timestamp={new Date(i.data.timestamp)}
				                     avatar={i.data.avatar || UserAvatar} name={i.data.from}
				                     response={i.data.response}/>
			})}

			<Notification isSeen={true} timestamp={Math.round(new Date().getTime() / 1000)}
			              avatar="https://randomuser.me/api/portraits/women/33.jpg" name="whatever#dasdas"/>
		</>
	)
}

export default Notifications