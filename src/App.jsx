import "./App.css"
import React, { useEffect, useState } from "react"
import {
  getAllJokes,
  postJoke,
  patchJoke,
  deleteJokeRequest
} from "./services/jokeService.jsx"
import { Input } from "./components/Input.jsx"
import { Untold } from "./components/Untold.jsx"
import { Told } from "./components/Told.jsx"

export const App = () => {
  const [allJokes, setAllJokes] = useState([])

  // function to retrieve the jokes from database
  const getJokes = () => {
    return getAllJokes().then(jokeArr => setAllJokes(jokeArr))
  }

  // store all jokes
  useEffect(() => {
    getJokes()
  }, [])

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
        <Input postJoke={postJoke} getJokes={getJokes} />

        <section className="mt-5 flex w-[100%] items-start justify-evenly gap-20">
          <Untold
            deleteJoke={deleteJoke}
            updateTheJoke={updateTheJoke}
            allJokes={allJokes}
          />

          <Told
            allJokes={allJokes}
            deleteJoke={deleteJoke}
            updateTheJoke={updateTheJoke}
          />
        </section>
      </main>
    </div>
  )
}
