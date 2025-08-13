import "./App.css"
import React, { useEffect, useState } from "react"
import { getAllJokes, postJoke } from "./services/jokeService.jsx"

export const App = () => {
	const [userInput, setUserInput] = useState("")
	const [buttonClicked, setButtonClicked] = useState(0)
	const [allJokes, setAllJokes] = useState([])
	const [untoldJokes, setUntoldJokes] = useState([])
	const [toldJokes, setToldJokes] = useState([])

	// function to retrieve the jokes from database
	const getJokes = () => {
		return getAllJokes().then(jokeArr => setAllJokes(jokeArr))
	}

	// store all jokes
	useEffect(() => {
		getJokes()
	}, [])

	// store untold jokes
	useEffect(() => {
		const untold = allJokes.filter(joke => !joke.told)
		setUntoldJokes(untold)
	}, [allJokes])

	// Store Told Jokes
	useEffect(() => {
		const told = allJokes.filter(joke => joke.told)
		setToldJokes(told)
	}, [allJokes])

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
			<header>
				<h1>Chuckle Checklist</h1>
			</header>
			<main>
				<h2>Add Joke</h2>

				<div>
					<input
						className="p-5 text-2xl"
						type="text"
						value={userInput}
						placeholder="New One Liner"
						onChange={e => setUserInput(e.target.value)}
					/>
					<button
						className=""
						onClick={() => {
							setButtonClicked(buttonClicked + 1)
						}}>
						Add
					</button>
				</div>

				<section>
					<div>
						<h2>Untold</h2>
						<p>{untoldJokes.length} untold jokes</p>
						<ul>
							{untoldJokes.map(joke => {
								return <li key={joke.id}>{joke.text}</li>
							})}
						</ul>
					</div>

					<div>
						<h2>Told</h2>
						<p>{toldJokes.length} told jokes</p>
						<ul>
							{toldJokes.map(joke => {
								return <li key={joke.id}>{joke.text}</li>
							})}
						</ul>
					</div>
				</section>
			</main>
		</>
	)
}
