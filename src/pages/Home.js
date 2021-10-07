import React from 'react'
import Background from "../img/5197264.svg";
import Chat from "../img/Chat.svg"
import {Link} from 'react-router-dom'


const Home = () => {
	return (
		<div className="flex h-full">
			{/* LEFT PANEL */}
			<img className="xl:w-3/5 lg:w-2/5 h-screen w-0  md:object-cover" src={Background} alt="test"/>

			{/* RIGHT PANEL */}
			<div className="xl:w-2/5 lg:w-3/5 w-full pl-5 pr-5 bg-gray-100 text-center flex">
				<div className="m-auto">
					{/* TEXT */}
					<img src={Chat} alt="chat" className="aspect-h-1 m-auto max-w-md mb-5 lg:mb-10"/>
					<div className="pb-10">
						<div className="text-4xl lg:text-6xl text-primary font-extrabold">
							It's happening now
						</div>
						<div className="text-4xl lg:text-6xl text-primary ">
							Join WHATEVER today
						</div>
						<div className="text-lg mt-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Architecto
							dolorum eaque enim, ipsa molestias necessitatibus officia. Adipisci aliquam aut dicta
							doloribus, eos excepturi explicabo incidunt molestiae recusandae. Dolorem, ducimus, nam.
						</div>
					</div>
					{/* BUTTONS */}
					<div className="flex">
						<Link to={'/login'} className="w-1/2 mr-3 ml-3 items-center justify-center px-10 py-3 border border-transparent
						text-base font-medium rounded-md text-white bg-action hover:bg-actionH
						md:py-4 md:text-lg md:px-10 mb-3 cursor-pointer">
							Login
						</Link>
						<Link to={'/register'} className="w-1/2 mr-3 ml-3 items-center justify-center px-8 py-3 border border-transparent
						text-base font-medium rounded-md text-primary bg-gray-200 hover:bg-gray-300
						md:py-4 md:text-lg md:px-10 mb-3 cursor-pointer">
							Register
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;