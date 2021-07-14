import React from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useRef,} from 'react'
import {ModalContext} from "../providers/modalProvider";


const Modal = () => {
	// the dialog component has to have a default focus by default
	// otherwise it will throw an error
	// a fix for that is adding a ref to the button
	// and initialising the dialog with the initialFocus property to that ref
	const completeButtonRef = useRef(null)

	const {state, dispatch} = React.useContext(ModalContext);
	const {isOpen, content, title} = state;

	if (isOpen) {
		return (
			<>
				<Transition appear show={isOpen} as={Fragment}>
					<Dialog
						initialFocus={completeButtonRef}
						as="div"
						className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-60"
						onClose={() => dispatch({type: 'REMOVE_MODAL'})}
					>
						<div className="min-h-screen px-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed inset-0"/>
							</Transition.Child>

							{/* This element is to trick the browser into centering the modal contents. */}
							<span
								className="inline-block h-screen align-middle"
								aria-hidden="true"
							>
			              &#8203;
			            </span>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div
									className={`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle
								transition-all transform bg-white shadow-xl rounded-2xl`}>
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										{title.toUpperCase()}
										<div>X</div>
									</Dialog.Title>

									<div>
										<div ref={completeButtonRef} className="mt-5 mb-5">
											{content}
										</div>
									</div>

								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</>)
	} else return null;
}

export default Modal;