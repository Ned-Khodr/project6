import logo from './logo.svg';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import React, { useState, useEffect } from 'react';
import { getAccessToken, getURL, retreiveLink } from './access'


function App() {
  const initial = [
    {id: 4, name:"KNR", artist: "Vance Wilson", album: "McLaren 1-2"},
    {id: 12, name:"ANG", artist: "Rina Wells", album: "Spiral"},
    {id: 92, name:"Sonsio", artist: "Edward McLane", album: "Night Sky"},
    {id: 41, name:"Suffer", artist: "Kurt Dex N'Love", album: "Rapax"},
    {id: 29, name:"Invisible", artist: "Kayla Wurz", album: "McLaren 1-2"},
    {id: 23, name:"Sweet Victory", artist: "Carl Lassana", album: "Spiral"},
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

  const searchTrack = async (trackName, token) => {
    console.log(token)
    const searchName = trackName.replaceAll(' ', '+')
    console.log(searchName)
    const SEARCH_LIMIT = 50
    const SEARCH_OFFSET = 0
    const testLink = 'https://api.spotify.com/v1/artists/21E3waRsmPlU7jZsS13rcj'
    const testLink2 = `https://api.spotify.com/v1/search?q=artist%3A${searchName}&type=track&limit=50&offset=0`
    try { 
      const response = await fetch(testLink2, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token,
        },
        // withCredentials: true,    
        // crossorigin: true,    
        // mode: 'no-cors',   
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const json = await response.json();
      console.log(json.tracks.items)
      const returnedTracks = json.tracks.items
      setResults([])
      if (returnedTracks.length !== 0) {
        setResults(refineResults(returnedTracks))
      }
    } catch (error) {
      console.error(error.message)
    }
    // setResults(jsonParse(json))
    // setResults(initial)
    // setResults(prev => prev.filter(track => track.name.toLowerCase().includes(trackName.toLowerCase())))
  }

  const refineResults = jsonData => {
    console.log(jsonData[0].id)
    console.log(jsonData[0].name)
    console.log(jsonData[0].artists[0].name)
    console.log(jsonData[0].album.name)

    const test = {
      id: jsonData[0].id,
      name: jsonData[0].name,
      artist: jsonData[0].artists[0].name,
      album: jsonData[0].album.name,
    }
    console.log(test)
    console.log(jsonData)

    let refinedData = []
    for (let i=0; i<jsonData.length; i++) {
      refinedData.push(
        {
          id: jsonData[i].id,
          name: jsonData[i].name,
          artist: jsonData[i].artists[0].name,
          album: jsonData[i].album.name,
        }
      )
    }
    console.log(refinedData)
    return refinedData
  }
// export async function getData() {
//   try {
//     const response = await fetch(link, {    
//       method: 'GET',    
//       withCredentials: true,    
//       crossorigin: true,    
//       mode: 'no-cors',       
//     });

//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.error(error.message);
//   }
// }


  const doubleTrack = newTrack => {
    addTrack(newTrack)
    addTrack(newTrack)
    addTrack(newTrack)
    addTrack(newTrack)
    addTrack(newTrack)
  }

  // const [accessToken, setAccessToken] = useState(null);
  // setAccessToken()

  useEffect(() => doubleTrack({id: 18, name:"WLE", artist: "Rina Wells",}),[])
  useEffect(() => retreiveLink(),[])
  useEffect(() => getAccessToken(),[])

  // useEffect(() => {
  //   async function fetchData() {
  //   if(accessToken != null) {
  //   setUser(await getUserData(accessToken));
  //   }
  //   }
  //   fetchData();
  //   }, [accessToken]);

  const CLIENT_ID = 'c37f5ccb59b1429597391b6b157b0642'
  const REDIRECT_URI = "http://localhost:3000//callback"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"


  // const emergency = "http://192.168.1.25:3000/callback"


  return (
    <div className="App">
      {/* <h1>{localStorage.getItem('token')}</h1> */}
      <h1>Amira</h1>
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Check</a>
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