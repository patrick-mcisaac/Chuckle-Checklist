import { useEffect, useState } from "react"
import { UntoldList } from "./UntoldList.jsx"

export const Untold = ({ deleteJoke, updateTheJoke, allJokes }) => {
  const [untoldJokes, setUntoldJokes] = useState([])
  useEffect(() => {
    const untold = allJokes.filter(joke => !joke.told)
    setUntoldJokes(untold)
  }, [allJokes])

  return (
    <div className="w-[45%]">
      <header className="flex w-[100%] justify-between border-b-5 border-b-[var(--pink-100)] p-[0_.5rem]">
        <h2 className="text-xl font-semibold">Untold</h2>
        <p className="text-( text-2xl font-semibold text-[var(--pink-300)]">
          {untoldJokes ? untoldJokes.length : 0}
        </p>
      </header>
      <ul className="mt-1 flex list-none flex-col">
        {untoldJokes?.map(joke => {
          return (
            <UntoldList
              deleteJoke={deleteJoke}
              updateTheJoke={updateTheJoke}
              key={joke.id}
              joke={joke}
            />
          )
        })}
      </ul>
    </div>
  )
}
