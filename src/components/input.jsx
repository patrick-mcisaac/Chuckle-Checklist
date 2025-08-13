// on part 2 of chuckle creating a new one liner
import "../App.css"

// export function
export const UserInput = () => {
	//  store the users input with useState()
	const [userInput, setUserInput] = useState("")

	//  return a text input
	return (
		<>
			<input
				className="p-5 text-2xl"
				type="text"
				placeholder="New One Liner"
				onChange={e => console.log(e)}
			/>
		</>
	)
}
// create function to pass into onChange
