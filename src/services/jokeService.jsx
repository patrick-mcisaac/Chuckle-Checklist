import React from "react"
// function to post a new joke

export const postJoke = data => {
	return fetch("http://localhost:8088/jokes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})
}
