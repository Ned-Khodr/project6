import React, { useEffect } from 'react';

export function Track(props) {
  const { id, name, artist, trackFunction } = props

  const handleClick = () => {
    trackFunction(props)
  }

  const symbol = trackFunction.name === "addTrack" ? "+" : "-"
  console.log(trackFunction)

  return (
    <div>
      <li>
        <button onClick={handleClick}>{symbol}</button>
        <h4>{name}</h4>
        <h4>{artist}</h4>
      </li>
    </div>
  )
} 