import PanelHeader from "../PanelHeader";
import Notification from "../Notification";


const Notifications = () => {
	return (
		<>
			<PanelHeader name="Notifications"/>
			<Notification isSeen={false} timestamp={Math.round(new Date().getTime()/1000)} avatar="https://randomuser.me/api/portraits/women/33.jpg" name="whatever#dasdas"/>
			<Notification isSeen={true} timestamp={Math.round(new Date().getTime()/1000)} avatar="https://randomuser.me/api/portraits/women/33.jpg" name="whatever#dasdas"/>
		</>
	)
}

export default Notifications