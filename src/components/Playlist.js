import React, { useState, useEffect } from 'react';
import { Tracklist } from './Tracklist';
import '../css/Playlist.css'


export function Playlist(props) {
  const { tracklist, removeTrack } = props

  const [playlistName, setPlaylistName] = useState('')

  const handleNameChange = event => {
    setPlaylistName(event.target.value)
  } 


  return (
    <div>
      <input 
        id='nameInput'
        type="text" 
        placeholder='Playlist Name' 
        value={playlistName}
        onChange={handleNameChange}
      />
      <Tracklist tracklist={tracklist} trackFunction={removeTrack}/>
      <button>Save to Spotify</button>
    </div>
  )
}