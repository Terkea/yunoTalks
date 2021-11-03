import PanelHeader from "../PanelHeader";
import svg from "../../img/4365500.svg";
import React from "react";
import {AuthContext} from "../../providers/authProvider";
import Loading from "./Loading";


const HomePanel = () => {
	const {state} = React.useContext(AuthContext)
	if (state.profile.nickname) {
		return (
			<>
				<PanelHeader name="Homepage"/>
				<div className="flex flex-col h-full w-full justify-center items-center">
					<img src={svg} alt="chat" className="md:w-1/3 w-48"/>
					<p className="text-center mr-50 text-xl md:text-2xl md:ml-5 font-bold md:block group-hover:block pl-6">
						Hello {state.profile.nickname}, we are delighted to see you again!
					</p>
					<p className="text-center mr-50 p-5 text-md md:text-md md:ml-5 font-bold md:block group-hover:block pl-6">
						Our crew is constantly working to guarantee that <br/> you have a positive experience on our platform.
					</p>

				</div>
			</>)
	} else {
		return <Loading/>
	}

}

export default HomePanel