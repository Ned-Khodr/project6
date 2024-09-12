import React, { useState } from 'react';

export function SearchBar(props) {
  const searchTrack = props.searchTrack
  const [text, setText] = useState('')

  const handleTextChange = event => {
    setText(event.target.value)
  } 

  const handleSubmit = event => {
    event.preventDefault()
    // const token = sessionStorage.getItem('token')
    // console.log(token)
    searchTrack(text)
  }

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="Search Tracks"
        placeholder="Search Tracks"
        value={text}
        onChange={handleTextChange}
      />
      <input type="submit"/>
    </form>
  )
}