import React, { useState } from 'react';

export function SearchBar(props) {
  const [text, setText] = useState('')

  const handleTextChange = event => {
    setText(event.target.value)
  } 

  const handleSubmit = event => {

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
      <input type="submit" onSubmit="handleSubmit"/>
      <h2>{text}</h2>
    </form>
  )
}