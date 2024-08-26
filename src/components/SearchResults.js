import React, { useState } from 'react';
import { Tracklist } from './Tracklist';


export function SearchResults(props) {
  const { tracklist, addTrack} = props
  return (
    <div>
      <h2>Results</h2>
      <Tracklist tracklist={tracklist} trackFunction={addTrack}/>
    </div>
  )
}