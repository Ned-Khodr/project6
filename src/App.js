import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import React, { useState, useEffect } from 'react';
import { authenticate } from './access'



function App() {
  const initial = [
    {id: 4, name:"KNR", artist: "Vance Wilson", album: "McLaren 1-2",},
    {id: 12, name:"ANG", artist: "Rina Wells", album: "Spiral"},
    {id: 92, name:"Sonsio", artist: "Edward McLane", album: "Night Sky"},
    {id: 41, name:"Suffer", artist: "Kurt Dex N'Love", album: "Rapax"},
    {id: 29, name:"Invisible", artist: "Kayla Wurz", album: "McLaren 1-2"},
    {id: 23, name:"Damn Exit", artist: "Daniel Magnusson", album: "Spiral"},
    {id: 6, name:"Sideline", artist: "Max Chilton", album: "Rapax"},
    {id: 17, name:"Maximum Overdrive", artist: "Wes O'Donathan", album: "McLaren 1-2"},
    {id: 42, name:"The Answer", artist: "Juan Pablo Montoya", album: "Target 42"},
    {id: 66, name:"Iron Airline", artist: "Emily Hamlin", album: "Rapax"},
  ]

  const [results, setResults] = useState([])
  const [userPlaylist, setUserPlaylist] = useState([])

  const [_, setToken] = useState('')

  async function startup() {
    const newToken = await authenticate()
    setToken(newToken)
    sessionStorage.setItem('token', newToken)
  }

  useEffect(() => {
    if (!sessionStorage.getItem('flag')) {
      startup()
    }
  }, [])


  const accessToken = (sessionStorage.getItem('token'))

  const addTrack = newTrack => {
    setUserPlaylist(prev => !prev.some(track => track.id === newTrack.id) ? [...prev, newTrack] : prev)
  }

  const removeTrack = trackToRemove => {
    setUserPlaylist(prev => prev.filter(track => track.id !== trackToRemove.id))
  }

  const searchTrack = async (trackName) => {
    const searchName = trackName.replaceAll(' ', '+')
    const SEARCH_LIMIT = 50
    const SEARCH_OFFSET = 0
    const testLink2 = `https://api.spotify.com/v1/search?q=artist%3A${searchName}&type=track&limit=${SEARCH_LIMIT}&offset=${SEARCH_OFFSET}`
    try { 
      const response = await fetch(testLink2, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + accessToken,
        },
      })

      if (!response.ok) {
        console(response)
        throw new Error(`Response status: ${response.status}`)
      }

      const json = await response.json();
      const returnedTracks = json.tracks.items
      setResults([])
      if (returnedTracks.length !== 0) {
        setResults(refineResults(returnedTracks))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const refineResults = jsonData => {

    let refinedData = []
    for (let i=0; i<jsonData.length; i++) {
      refinedData.push(
        {
          id: jsonData[i].id,
          name: jsonData[i].name,
          artist: jsonData[i].artists[0].name,
          album: jsonData[i].album.name,
          uri: jsonData[i].uri
        }
      )
    }
    return refinedData
  }

  const savePlaylist = async (playlistName) => {
    const userID = await returnUsername()
    if (playlistName) {
      const playlistID = await createNewPlaylist(userID, playlistName)
      addToNewPlaylist(playlistID)
      setUserPlaylist([])     
    } else {
      alert('Playlist must have a name in order to save it')
    }
  }

  const returnUsername = async () => {
    try { 
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + accessToken,
        },
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json();
      return (json.id)

    } catch (error) {
      console.error(error.message)
    }
  }

  const createNewPlaylist = async (userID, playlistName) => {
    const link = `https://api.spotify.com/v1/users/${userID}/playlists`

    try { 
      const response = await fetch(link, {
        method: 'POST',
        body: JSON.stringify({
          name: playlistName,
          'description': 'N/A',
          public: false,
        }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + accessToken,
        },
      })

      if (!response.ok) {
        console.log(response.status);
        console.log(response.message);
      }
      const json = await response.json();
      return json.id

    } catch (error) {
      console.error(error.message)
    }
  } 

  const addToNewPlaylist = async (playlistID) => {

    if(userPlaylist.length === 0) {
      return false
    }

    const link = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
    const trackURIs = userPlaylist.map(track => track.uri)

    try {
      const response = await fetch(link, {
        method: 'POST',
        body: JSON.stringify({
          uris: trackURIs,
          position: 0
        }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + accessToken,
        },
      })
      if (!response.ok) {
        console.error(response)
      }
      // const json = await response.json();

    } catch(error) {
      console.log(error.message)
    }

  }


  return (
    <div className="App">
      <h1>Amira</h1>
      <SearchBar searchTrack={searchTrack}/>
      <SearchResults tracklist={results} addTrack={addTrack} />
      <Playlist tracklist={userPlaylist} removeTrack={removeTrack} savePlaylist={savePlaylist}/>
    </div>
  );
}

export default App;