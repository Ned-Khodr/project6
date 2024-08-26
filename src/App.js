import logo from './logo.svg';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import React, { useState } from 'react';

function App() {
  const [results, setResults] = useState([])
  const [userPlaylist, setUserPlaylist] = useState([])
  return (
    <div className="App">
      <h1>Amira</h1>
      <SearchBar/>
      <SearchResults/>
      <Playlist/>
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