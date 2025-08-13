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
		<div className="grid grid-rows-2 -mt-20 place-content-center grid-cols-[75vw] justify-items-stretch items-end">
			<header className="border-b-5 border-b-pink-100 flex flex-col gap-8 pb-0">
				<h1 className="text-center text-4xl">Chuckle Checklist</h1>
				<h2 className="text-xl font-semibold ml-5 mb-2">Add Joke</h2>
			</header>
			<main className="flex flex-col items-center mt-10">
				<div className="flex justify-between w-[100%]">
					<input
						className="text-2xl"
						type="text"
						value={userInput}
						placeholder="New One Liner"
						onChange={e => setUserInput(e.target.value)}
					/>
					<button
						className="border-green-100 rounded-2xl border-2 p-[1rem_3rem] text-green-100 font-bold"
						onClick={() => {
							setButtonClicked(buttonClicked + 1)
						}}>
						Add
					</button>
				</div>

				<section className="flex justify-evenly gap-40 w-[100%] mt-20 items-start">
					<div className="w-[30%]">
						<header className="border-b-5 border-b-pink-100 w-[100%]">
							<h2 className="text-xl font-semibold">Untold</h2>
							<p>{untoldJokes.length} untold jokes</p>
						</header>
						<ul>
							{untoldJokes.map(joke => {
								return <li key={joke.id}>{joke.text}</li>
							})}
						</ul>
					</div>

					<div className="w-[30%]">
						<header className="border-b-5 border-b-pink-100 w-[100%]">
							<h2 className="text-xl font-semibold">Told</h2>
							<p>{toldJokes.length} told jokes</p>
						</header>
						<ul>
							{toldJokes.map(joke => {
								return <li key={joke.id}>{joke.text}</li>
							})}
						</ul>
					</div>
				</section>
			</main>
		</div>
	)
}
