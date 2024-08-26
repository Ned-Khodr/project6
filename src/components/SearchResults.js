import React, { useState } from 'react';
import { Tracklist } from './Tracklist';


export function SearchResults({ tracks }) {
  return (
    <div>
      <h2>Results</h2>
      <Tracklist />
    </div>
  )
}