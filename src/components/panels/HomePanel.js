import PanelHeader from "../PanelHeader";

const HomePanel = () => {
	return (
		<>
			<PanelHeader name="Homepage"/>
			<div className="text-center pt-20 text-3xl font-bold hidden md:block group-hover:block pl-6">
				<p>Good to see you again!</p>
			</div>
		</>
	)
}

export default HomePanel