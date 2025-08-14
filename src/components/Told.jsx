import { useEffect, useState } from "react"
import { ToldList } from "./ToldList.jsx"

export const Told = ({
  allJokes,

  deleteJoke,
  updateTheJoke
}) => {
  const [toldJokes, setToldJokes] = useState([])

  useEffect(() => {
    const told = allJokes.filter(joke => joke.told)
    setToldJokes(told)
  }, [allJokes])

  return (
    <div className="w-[45%]">
      <header className="flex w-[100%] justify-between border-b-5 border-b-[var(--pink-100)] p-[0_.5rem]">
        <h2 className="text-xl font-semibold">Told</h2>
        <p className="text-2xl font-semibold text-[var(--green-100)]">
          {toldJokes.length}
        </p>
      </header>
      <ul className="mt-1 flex list-none flex-col">
        {toldJokes?.map(joke => {
          return (
            <ToldList
              deleteJoke={deleteJoke}
              joke={joke}
              updateTheJoke={updateTheJoke}
              key={joke.id}
            />
          )
        })}
      </ul>
    </div>
  )
}
