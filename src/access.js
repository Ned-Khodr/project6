import {useEffect, useState} from 'react';


const CLIENT_ID = 'c37f5ccb59b1429597391b6b157b0642'
const REDIRECT_URI = "http://localhost:3000//callback"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const link = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

export function getURL() {
  return link
}

export function retreiveLink() {
  if (!sessionStorage.getItem('started')) {
    window.location.href = link
    sessionStorage.setItem('started', true)
  }
}

export function getAccessToken() {
  let accessToken;
  if (accessToken) {
    localStorage.setItem('token', accessToken)
    // return accessToken;
  }

  // check for an access token
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    // This clears the token & expiry so we can get a new token when it expires
    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/");
    localStorage.setItem('token', accessToken)
    // return accessToken;
  }
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