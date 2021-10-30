import React from 'react';
import {AuthContext} from '../providers/authProvider'
import UserAvatar from '../img/anonymous_user.png'
import Loading from "./panels/Loading";


const Branding = () => {
	const {state} = React.useContext(AuthContext);
	const {profile} = state;

	if (profile) {
		return (
			<div className="header p-4 flex flex-row items-center flex-none">
				{/* IF THE PROFILE IS NOT LOADED THEN DISPLAY A SKELETON */}
				{profile.avatar ?
					<div
						className="w-18 h-18 relative flex flex-shrink-0"
					>
						<img
							alt="#"
							className="rounded-full h-16 w-16"
							src={state.profile.avatar || UserAvatar}
						/>
					</div>
					:
					<div className="relative flex flex-shrink-0">
						<div className="animate-pulse">
							<div className="rounded-full bg-primary w-16 h-16"></div>
						</div>
					</div>
				}

				{profile.nickname ?
					<p className="text-lg font-bold hidden md:block group-hover:block pl-6">
						{profile.nickname}
					</p>
					:
					<div className="rounded-lg p-4 max-w-sm w-full mx-auto pl-6">
						<div className="animate-pulse">
							<div className="h-4 bg-primary rounded w-3/4"/>
						</div>
					</div>
				}
			</div>
		)
	} else {
		return <Loading/>
	}

}
export default Branding;