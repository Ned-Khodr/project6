import React, { useState } from 'react';
import { Track } from './Track';

export function Tracklist({ tracks }) {
  return (
    <div>
      <ul>
        <Track/>
      </ul>
    </div>
  )
}