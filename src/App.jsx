import "./App.css"
import React, { useEffect, useState } from "react"
import {
  getAllJokes,
  postJoke,
  patchJoke,
  deleteJokeRequest
} from "./services/jokeService.jsx"

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

  useEffect(() => {
    // store untold jokes
    const untold = allJokes.filter(joke => !joke.told)
    setUntoldJokes(untold)

    // Store Told Jokes
    const told = allJokes.filter(joke => joke.told)
    setToldJokes(told)
  }, [allJokes])

  // rerender when updated database
  useEffect(() => {
    if (buttonClicked === 0 || userInput === "") {
      ;("")
    } else {
      const data = {
        text: userInput,
        told: false
      }
      postJoke(data).then(() => getJokes())
      setUserInput("")
      setButtonClicked(0)
    }
  }, [buttonClicked])

  const updateTheJoke = joke => {
    const id = joke.id
    const data = {
      told: !joke.told
    }
    patchJoke(data, id).then(() => getJokes())
  }

  const deleteJoke = id => {
    deleteJokeRequest(id).then(() => getJokes())
  }

  return (
    <div className="grid grid-cols-[50vw] grid-rows-[10vh_1fr] place-content-center items-start justify-items-stretch rounded-[2rem] bg-white p-10 shadow-lg shadow-gray-700">
      <header className="flex flex-col border-b-5 border-b-[var(--pink-100)]">
        <h1 className="text-center text-4xl">Chuckle Checklist</h1>
        <h2 className="mb-2 ml-5 text-xl font-semibold">Add Joke</h2>
      </header>
      <main className="flex flex-col items-center self-start">
        <div className="flex w-[100%] justify-between p-5">
          <input
            className="rounded-2xl pl-5 text-xl shadow shadow-gray-500 focus:border-1 focus:shadow-none focus:outline-gray-400"
            type="text"
            value={userInput}
            placeholder="New One Liner"
            onChange={e => setUserInput(e.target.value)}
          />
          <button
            className="h-10 w-30 cursor-pointer rounded-2xl font-bold text-gray-900 shadow-sm shadow-gray-500 transition-all duration-250 hover:bg-green-500 hover:text-white hover:shadow-md hover:text-shadow-[0px_2px_2px] hover:text-shadow-gray-700"
            onClick={() => {
              setButtonClicked(buttonClicked + 1)
            }}
          >
            Add
          </button>
        </div>

        <section className="mt-5 flex w-[100%] items-start justify-evenly gap-20">
          <div className="w-[45%]">
            <header className="flex w-[100%] justify-between border-b-5 border-b-[var(--pink-100)] p-[0_.5rem]">
              <h2 className="text-xl font-semibold">Untold</h2>
              <p className="text-( text-2xl font-semibold text-[var(--pink-300)]">
                {untoldJokes.length}
              </p>
            </header>
            <ul className="mt-1 flex list-none flex-col">
              {untoldJokes.map(joke => {
                return (
                  <li
                    key={joke.id}
                    className="flex h-20 items-center justify-between border-b-[.1rem] border-dashed border-b-black text-left font-medium"
                  >
                    <span className="w-80 text-[1rem]">{joke.text}</span>
                    <button onClick={() => deleteJoke(joke.id)}>
                      <i className="fa-regular fa-trash-can cursor-pointer transition hover:scale-160 hover:text-red-700"></i>
                    </button>
                    <button onClick={() => updateTheJoke(joke)}>
                      <i className="fa-regular fa-face-laugh-beam cursor-pointer text-xl transition hover:scale-150 hover:text-[var(--green-100)] hover:text-shadow-gray-500 hover:text-shadow-xs"></i>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="w-[45%]">
            <header className="flex w-[100%] justify-between border-b-5 border-b-[var(--pink-100)] p-[0_.5rem]">
              <h2 className="text-xl font-semibold">Told</h2>
              <p className="text-2xl font-semibold text-[var(--green-100)]">
                {toldJokes.length}
              </p>
            </header>
            <ul className="mt-1 flex list-none flex-col">
              {toldJokes.map(joke => {
                return (
                  <li
                    key={joke.id}
                    className="flex h-20 items-center justify-between border-b-[.1rem] border-dashed border-b-black text-left font-medium"
                  >
                    <span className="w-80 text-[1rem]">{joke.text}</span>
                    <button onClick={() => deleteJoke(joke.id)}>
                      <i className="fa-regular fa-trash-can cursor-pointer transition hover:scale-160 hover:text-red-700"></i>
                    </button>
                    <button onClick={() => updateTheJoke(joke)}>
                      <i className="fa-regular fa-face-laugh-beam cursor-pointer text-xl transition hover:scale-150 hover:text-[var(--green-100)] hover:text-shadow-gray-500 hover:text-shadow-xs"></i>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}
