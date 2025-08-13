import "./App.css"
import React, { useEffect, useState } from "react"
import { postJoke } from "./services/jokeService.jsx"

export const App = () => {
	const [userInput, setUserInput] = useState("")
	const [buttonClicked, setButtonClicked] = useState(0)
	useEffect(() => {
		if (buttonClicked === 0 || userInput === "") {
			;("")
		} else {
			const data = {
				text: userInput,
				told: false
			}
			postJoke(data)
			setUserInput("")
			setButtonClicked(0)
		}
	}, [buttonClicked])

	return (
		<>
			<div>Hello World!</div>
			<input
				className="p-5 text-2xl"
				type="text"
				value={userInput}
				placeholder="New One Liner"
				onChange={e => setUserInput(e.target.value)}
			/>

			<div>
				<p></p>
				<button
					className=""
					onClick={() => {
						setButtonClicked(buttonClicked + 1)
					}}>
					Post Joke
				</button>
			</div>
		</>
	)
}
