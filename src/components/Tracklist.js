import React, { useState } from 'react';
import { Track } from './Track';

export function Tracklist(props) {

  const { tracklist, trackFunction} = props

  if (tracklist.length === 0) {
    return <ul></ul>
  }

  return (
    <div>
      <ul>
        {tracklist.map(track => (
          <Track
            key={track.id}
            id={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
            trackFunction={trackFunction}
          />
        ))}
      </ul>
    </div>
  )
}