import React from "react"
// function to post a new joke

const url = "http://localhost:8088/jokes"

export const postJoke = data => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export const getAllJokes = async () => {
  return fetch(url).then(res => res.json())
}

// patch jokes if told or not
export const patchJoke = (data, id) => {
  return fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export const deleteJokeRequest = id => {
  return fetch(`${url}/${id}`, {
    method: "DELETE"
  })
}
