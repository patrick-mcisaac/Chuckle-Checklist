export const ToldList = ({ joke, deleteJoke, updateTheJoke }) => {
  return (
    <li className="flex h-20 items-center justify-between border-b-[.1rem] border-dashed border-b-black text-left font-medium">
      <span className="w-80 text-[1rem]">{joke.text}</span>
      <button onClick={() => deleteJoke(joke.id)}>
        <i className="fa-regular fa-trash-can cursor-pointer transition hover:scale-160 hover:text-red-700"></i>
      </button>
      <button onClick={() => updateTheJoke(joke)}>
        <i className="fa-regular fa-face-laugh-beam cursor-pointer text-xl transition hover:scale-150 hover:text-[var(--green-100)] hover:text-shadow-gray-500 hover:text-shadow-xs"></i>
      </button>
    </li>
  )
}
