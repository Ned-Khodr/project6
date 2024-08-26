import logo from './logo.svg';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import React, { useState, useEffect } from 'react';


function App() {
  const initial = [
    {id: 4, name:"KNR", artist: "Vance Wilson", album: "McLaren 1-2"},
    {id: 12, name:"ANG", artist: "Rina Wells", album: "Spiral"},
    {id: 92, name:"Sonsio", artist: "Edward McLane", album: "Night Sky"},
    {id: 41, name:"Suffer", artist: "Kurt Dex N'Love", album: "Rapax"},
    {id: 29, name:"Invisible", artist: "Kayla Wurz", album: "McLaren 1-2"},
    {id: 41, name:"Sweet Victory", artist: "Carl Lassana", album: "Spiral"},
    {id: 6, name:"Sideline", artist: "Max Chilton", album: "Rapax"},
    {id: 17, name:"Maximum Overdrive", artist: "Wes O'Donathan", album: "McLaren 1-2"},
    {id: 42, name:"The Answer", artist: "Juan Pablo Montoya", album: "Target 42"},
    {id: 66, name:"Iron Airline", artist: "Emily Hamlin", album: "Rapax"},
    
  ]

  const [results, setResults] = useState(initial)
  const [userPlaylist, setUserPlaylist] = useState([])

  const addTrack = newTrack => {
    setUserPlaylist(prev => !prev.some(track => track.id === newTrack.id) ? [...prev, newTrack] : prev)
  }

  const removeTrack = trackToRemove => {
    setUserPlaylist(prev => prev.filter(track => track.id !== trackToRemove.id))
  }

  const searchTrack = trackName => {
    setResults(initial)
    setResults(prev => prev.filter(track => track.name.toLowerCase().includes(trackName.toLowerCase())))
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
      <SearchBar searchTrack={searchTrack}/>
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