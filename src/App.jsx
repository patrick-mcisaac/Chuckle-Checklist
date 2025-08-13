import "./App.css"
import { useState } from "react"

export const App = () => {
	const [userInput, setUserInput] = useState()

	return (
		<>
			<div>Hello World!</div>
			<input
				className="p-5 text-2xl"
				type="text"
				placeholder="New One Liner"
				onChange={e => setUserInput(e.target.value)}
			/>
		</>
	)
}
