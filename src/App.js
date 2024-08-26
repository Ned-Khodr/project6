import logo from './logo.svg';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import React, { useState, useEffect } from 'react';

function App() {
  const [results, setResults] = useState([
    {id: 4, name:"KNR", artist: "Vance Wilson",},
    {id: 12, name:"ANG", artist: "Rina Wells",},
    {id: 92, name:"Sonsio", artist: "Edward McLane",},
    {id: 41, name:"Suffer", artist: "Kurt Dex N'Love",},
    {id: 29, name:"Invisible", artist: "Kayla Wurz",},
    {id: 41, name:"Sweet Victory", artist: "Carl Lassana",},
    {id: 6, name:"Sideline", artist: "Max Chilton",},
    {id: 17, name:"Maximum Overdrive", artist: "Wes O'Donathan",},
    {id: 42, name:"The Answer", artist: "Juan Pablo Montoya",},
    {id: 66, name:"Iron Airline", artist: "Emily Hamlin",},
    
  ])
  const [userPlaylist, setUserPlaylist] = useState([])

  const addTrack = newTrack => {
    setUserPlaylist(prev => !prev.some(track => track.id === newTrack.id) ? [...prev, newTrack] : prev)
  }

  const removeTrack = trackToRemove => {
    setUserPlaylist(prev => prev.filter(track => track.id !== trackToRemove.id))
  }

  // const doubleTrack = newTrack => {
  //   addTrack(newTrack)
  //   addTrack(newTrack)
  //   addTrack(newTrack)
  //   addTrack(newTrack)
  //   addTrack(newTrack)
  // }

  // useEffect(() => doubleTrack({id: 18, name:"WLE", artist: "Rina Wells",}))
  

  return (
    <div className="App">
      <h1>Amira</h1>
      <SearchBar/>
      <SearchResults tracklist={results} addTrack={addTrack}/>
      <Playlist tracklist={userPlaylist} removeTrack={removeTrack}/>
    </div>
  );
}

export default App;


/* <div style={{display: 'flex', flexDirection: 'row'}}> 
    <div> 
        <Component1 /> 
    </div> 
    <div> 
        <Component2 /> 
    </div> 
</div> */