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
    return getAllJokes().then((jokeArr) => setAllJokes(jokeArr))
  }

  // store all jokes
  useEffect(() => {
    getJokes()
  }, [])

  // store untold jokes
  useEffect(() => {
    const untold = allJokes.filter((joke) => !joke.told)
    setUntoldJokes(untold)
  }, [allJokes])

  // Store Told Jokes
  useEffect(() => {
    const told = allJokes.filter((joke) => joke.told)
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
      postJoke(data).then(() => getJokes())
      setUserInput("")
      setButtonClicked(0)
    }
  }, [buttonClicked])

  // rerender when updated database

  return (
    <div className="grid grid-cols-[50vw] grid-rows-[10vh_1fr] place-content-center items-start justify-items-stretch bg-white p-10">
      <header className="flex flex-col border-b-5 border-b-pink-100">
        <h1 className="text-center text-4xl">Chuckle Checklist</h1>
        <h2 className="mb-2 ml-5 text-xl font-semibold">Add Joke</h2>
      </header>
      <main className="flex flex-col items-center self-start">
        <div className="flex w-[100%] justify-between p-3">
          <input
            className="text-2xl"
            type="text"
            value={userInput}
            placeholder="New One Liner"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="h-10 w-30 cursor-pointer rounded-2xl border-2 border-green-100 font-bold text-green-100 shadow-sm shadow-cyan-400 hover:border-0 hover:bg-green-500 hover:text-white"
            onClick={() => {
              setButtonClicked(buttonClicked + 1)
            }}
          >
            Add
          </button>
        </div>

        <section className="mt-5 flex w-[100%] items-start justify-evenly gap-40">
          <div className="w-[35%]">
            <header className="flex w-[100%] justify-between border-b-5 border-b-pink-100 p-[0_1rem]">
              <h2 className="text-xl font-semibold">Untold</h2>
              <p className="text-2xl font-semibold text-pink-100">
                {untoldJokes.length}
              </p>
            </header>
            <ul className="flex list-none flex-col">
              {untoldJokes.map((joke) => {
                return (
                  <li
                    key={joke.id}
                    className="mt-5 border-b-[.1rem] border-dashed border-b-black pb-3"
                  >
                    {joke.text}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="w-[35%]">
            <header className="flex w-[100%] justify-between border-b-5 border-b-pink-100 p-[0_1rem]">
              <h2 className="text-xl font-semibold">Told</h2>
              <p className="text-2xl font-semibold text-green-600">
                {toldJokes.length}
              </p>
            </header>
            <ul className="flex list-none flex-col">
              {toldJokes.map((joke) => {
                return (
                  <li
                    key={joke.id}
                    className="mt-5 border-b-[.1rem] border-dashed border-b-black pb-3"
                  >
                    {joke.text}
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

// mark jokes as told Fulfilled Chuckles
