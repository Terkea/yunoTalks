import {signOut} from '../providers/authProvider'
import {useHistory} from 'react-router-dom'

const Logout = () => {
	const history = useHistory();
	signOut().then(() => {
		history.push('/')
	})
	return ('')
}

export default Logout;