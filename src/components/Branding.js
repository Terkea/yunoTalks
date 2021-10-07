import React from 'react';
import {AuthContext} from '../providers/authProvider'


const Branding = () => {
	const {state} = React.useContext(AuthContext);
	const {profile} = state;

	return (
		<div className="header p-4 flex flex-row items-center flex-none">
			{/* IF THE PROFILE IS NOT LOADED THEN DISPLAY A SKELETON */}
			{profile.avatar ?
				<div
					className="w-18 h-18 relative flex flex-shrink-0"
					style={{filter: "invert(100%)"}}
				>
					<img
						alt="#"
						className="rounded-full w-full h-full object-cover"
						src="https://avatars.githubusercontent.com/u/11928943?s=400&u=0375a0975e4fca5b6025625b89e4ccf49ee465ff&v=4"
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
}
export default Branding;