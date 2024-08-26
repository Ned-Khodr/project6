import React, { useState, useEffect } from 'react';
import { Tracklist } from './Tracklist';


export function Playlist(props) {
  const { tracklist, removeTrack } = props

  return (
    <div>
      <h2>MyPlaylist</h2>
      <Tracklist tracklist={tracklist} trackFunction={removeTrack}/>
      <button>Save to Spotify</button>
    </div>
  )
}