import spinner from "../../img/tail-spin.svg";
import React from "react";

const Loading = () => {
	return (
		<div className="flex h-full w-full justify-center items-center">
			<img src={spinner} alt="chat" className="w-64"/>
		</div>
	)
}
export default Loading;