import { useEffect, useState } from "react"

export const Input = ({ postJoke, getJokes }) => {
  const [userInput, setUserInput] = useState("")
  const [buttonClicked, setButtonClicked] = useState(0)
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

  return (
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
  )
}
