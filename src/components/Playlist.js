import React, { useState } from 'react';
import { Tracklist } from './Tracklist';


export function Playlist({ tracks }) {
  return (
    <div>
      <h2>MyPlaylist</h2>
      <Tracklist />
      <button>Save to Spotify</button>
    </div>
  )
}