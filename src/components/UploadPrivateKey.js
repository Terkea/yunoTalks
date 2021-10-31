import React from 'react'

const UploadPrivateKey = ({text}) => {
	const refInput = React.useRef(null)

	return (
		<>
			<div className="flex justify-center items-center w-full">
				<label
					onClick={() => refInput.current.click()}
					className="bg-chatAction text-gray-100 text-center font-medium rounded-md
								border border-transparent items-center justify-center px-8 py-3
								hover:bg-actionH cursor-pointer"
				>
					{text}
				</label>
			</div>
			<input ref={refInput} style={{opacity: 0}}
			       accept="image/png, image/jpeg" type="file" name="privateKey"
			/>
		</>
	)
}

export default UploadPrivateKey