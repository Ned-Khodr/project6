// export const test = async () => {
  //   const generateRandomString = (length) => {
  //   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const values = crypto.getRandomValues(new Uint8Array(length));
  //   return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  // }
  
  // let codeVerifier  = generateRandomString(64);
  // console.log(codeVerifier)
  // sessionStorage.setItem('code_verifier', codeVerifier);

  // function sha256(plain) { 
  //     // returns promise ArrayBuffer
  //     const encoder = new TextEncoder();
  //     const data = encoder.encode(plain);
  //     return window.crypto.subtle.digest('SHA-256', data);
  // }

  // function base64urlencode(a) {
  //     // Convert the ArrayBuffer to string using Uint8 array.
  //     // btoa takes chars from 0-255 and base64 encodes.
  //     // Then convert the base64 encoded to base64url encoded.
  //     // (replace + with -, replace / with _, trim trailing =)
  //     return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
  //         .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  // }

  // async function pkce_challenge_from_verifier(v) {
  //     let hashed = await sha256(v);
  //     let base64encoded = base64urlencode(hashed);
  //     return base64encoded;
  // }
  
  // const hashed = await sha256(codeVerifier)
  // const inter = base64urlencode(hashed)
  // const codeChallenge = pkce_challenge_from_verifier(inter)
//   const codeVerifier = '66e8e4f022f07c2dddb1daedadf9db427eeae5eeb40523629e0d6f22'
//   sessionStorage.setItem('code_verifier', codeVerifier);
//   const codeChallenge = '8IK-d3obZZ1INKKYXM4IBXZQ8e9CYUlgm1Ek1AyUTnc'

//   const clientId = 'c37f5ccb59b1429597391b6b157b0642';
//   const redirectUri = 'http://localhost:3000//callback';
  
//   const scope = 'playlist-modify-private';
//   const authUrl = new URL("https://accounts.spotify.com/authorize")
  
//   // generated in the previous step
  
//   const params =  {
//     response_type: 'code',
//     client_id: clientId,
//     scope,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge,
//     redirect_uri: redirectUri,
//   }
  
//   if (!sessionStorage.getItem('started')) {
//     console.log('STARTED')
//     authUrl.search = new URLSearchParams(params).toString();
//     window.location.href = authUrl.toString();
//     console.log('STARTED')
//     sessionStorage.setItem('started', true)
//   }
//   const urlParams = new URLSearchParams(window.location.search);
//   let code = urlParams.get('code');
//   sessionStorage.setItem('code', code)
//   // console.log(code)\
  

//   const getToken = async () => {

//     // stored in the previous step
//     let codeV = sessionStorage.getItem('code_verifier');
//     console.log(codeV)
  
//     const payload = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         client_id: clientId,
//         grant_type: 'authorization_code',
//         code: sessionStorage.getItem('code'),
//         redirect_uri: redirectUri,
//         code_verifier: codeV,
//       }),
//     }
//     // console.log(payload.body)
//     let url = 'https://accounts.spotify.com/api/token'
//     try {
//       const body = await fetch(url, payload);
//       const response = await body.json();
//       if (response.ok) {
//         console.error('error response', response);
//         throw new Error('HTTP status ' + response.status + ': ' + response.error + ":" + response.error_description);
//       } else {
//         console.log(response)
//         // return response
//       }
//       console.log(response.access_token)
//       sessionStorage.setItem('access_token', response.access_token);
//     } catch (error) {
//       console.log(error.message)
//     }
//   }
//   if (!sessionStorage.getItem('access_token')) {
//     getToken()
//   }
// }












































































// export async function authenticate(){
//   const clientId = 'c37f5ccb59b1429597391b6b157b0642';
//   const redirectUri = 'http://localhost:3000//callback';

//   const generateRandomString = (length) => {
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const values = crypto.getRandomValues(new Uint8Array(length));
//     return values.reduce((acc, x) => acc + possible[x % possible.length], "");
//   }
  
//   let codeVerifier = generateRandomString(128);

//   const generateCodeChallenge = async (plain) => {
//     const encoder = new TextEncoder()
//     const data = encoder.encode(plain)
//     const encoded = await window.crypto.subtle.digest('SHA-256', data)
//     return btoa(String.fromCharCode(...new Uint8Array(encoded)))
//       .replace(/=/g, '')
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_');
//   }

//   generateCodeChallenge(codeVerifier).then(codeChallenge => {
//     let state = generateRandomString(16);
//     let scope = 'playlist-modify-public playlist-modify-private';
  
//     localStorage.setItem('code-verifier', codeVerifier);
//     localStorage.setItem('test', 3)
//     console.log(localStorage.getItem('code-verifier'))
//     console.log(localStorage.getItem('test'))
  
//     let args = new URLSearchParams({
//       response_type: 'code',
//       client_id: clientId,
//       scope: scope,
//       redirect_uri: redirectUri,
//       state: state,
//       code_challenge_method: 'S256',
//       code_challenge: codeChallenge
//     });

//     if (!sessionStorage.getItem('started')) {
//       window.location = 'https://accounts.spotify.com/authorize?' + args;
//       sessionStorage.setItem('started', true)
//     }
//   });
  
// };


// export function redirectToken(){
//   const urlParams = new URLSearchParams(window.location.search);
//   let code = urlParams.get('code');
//   let codeVerifier = localStorage.getItem('code_verifier');
//   console.log(codeVerifier)
//   console.log(localStorage.getItem('code-verifier'))
//   console.log(localStorage.getItem('test'))
//   const redirectUri = 'http://localhost:3000//callback';
//   const clientId = "c37f5ccb59b1429597391b6b157b0642";
//   let body = new URLSearchParams({
//     grant_type: 'authorization_code',
//     code: code,
//     redirect_uri: redirectUri,
//     client_id: clientId,
//     code_verifier: codeVerifier
//   });
//   const response = fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: body
//   })
//   .then(response => {
//     if (!response.ok) {
//       console.error('error response', response);
//       response.json().then(json => {
//           console.error('error body json', json);
//           throw new Error('HTTP status ' + response.status + ': ' + json.error + ":" + json.error_description);
//       });
//     throw new Error('HTTP status ' + response.status);
//   }
//     return response.json();
//   })
//   .then(data => {
//     localStorage.setItem('access-token', data.access_token);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// };





















// import {useEffect, useState} from 'react';


// export const test = async () => {
//   const generateRandomString = (length) => {
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const values = crypto.getRandomValues(new Uint8Array(length));
//     return values.reduce((acc, x) => acc + possible[x % possible.length], "");
//   }
  
//   const codeVerifier  = generateRandomString(64);
//   console.log(codeVerifier)

//   const sha256 = async (plain) => {
//     const encoder = new TextEncoder()
//     const data = encoder.encode(plain)
//     return window.crypto.subtle.digest('SHA-256', data)
//   }

//   const base64encode = (input) => {
//     return btoa(String.fromCharCode(...new Uint8Array(input)))
//       .replace(/=/g, '')
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_');
//   }

//   const hashed = await sha256(codeVerifier)
//   const codeChallenge = base64encode(hashed);
//   console.log(codeChallenge)


//   const clientId = 'c37f5ccb59b1429597391b6b157b0642';
//   const redirectUri = 'http://localhost:3000//callback';

//   const scope = 'playlist-modify-public playlist-modify-private';
//   const authUrl = new URL("https://accounts.spotify.com/authorize")

//   // generated in the previous step
//   window.localStorage.setItem('code_verifier', codeVerifier);

//   const params =  {
//     response_type: 'code',
//     client_id: clientId,
//     scope,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge,
//     redirect_uri: redirectUri,
//   }

//   if (!sessionStorage.getItem('started')) {
//     authUrl.search = new URLSearchParams(params).toString();
//     window.location.href = authUrl.toString();
//     sessionStorage.setItem('started', true)
//     const urlParams = new URLSearchParams(window.location.search);
//     let code = urlParams.get('code');
//     sessionStorage.setItem('code', code)
//     console.log(code)
//   }


//   const GRANT_TYPE = "authorization_code";
//   const CODE = sessionStorage.getItem('code');
//   const REDIRECT_URI = 'http://localhost:3000//callback';
//   const CLIENT_ID = 'c37f5ccb59b1429597391b6b157b0642';
//   const CODE_VERIFIER = window.localStorage.getItem('code_verifier')
//   const CONTENT_TYPE = "application/x-www-form-urlencoded"

//   const link = `https://accounts.spotify.com/api/token`

//   const getAccessToken = async () => {
//     const VERIFIER = window.localStorage.getItem("code_verifier")

//     const params = new URLSearchParams();
//     params.append("client_id", CLIENT_ID);
//     params.append("grant_type", GRANT_TYPE);
//     params.append("code", CODE);
//     params.append("redirect_uri", REDIRECT_URI);
//     params.append("code_verifier", VERIFIER);
//     console.log(GRANT_TYPE)
//     console.log(CODE)
//     console.log(REDIRECT_URI)
//     console.log(CLIENT_ID)
//     console.log(CODE_VERIFIER)
//     console.log(CONTENT_TYPE)
    
//     try {
//      const response = await fetch(link, {
//       method: 'POST',
//       headers: {
//         "Content-Type": CONTENT_TYPE
//       },
//       body: params
//      })

//     if (!response.ok) {
//       console.log('THIS IS THE ERROR')
//       console.error('error response', response);
//       response.json().then(json => {
//           console.error('error body json', json);
//           throw new Error('HTTP status ' + response.status + ': ' + json.error + ":" + json.error_description);
//       });
//       throw new Error('HTTP status ' + response.status);
//     }
//       const json = await response.json();
//       console.log(json)
//       return json

//     } catch (error) {
//       console.log('THIS IS NOT THE ERROR')
//       console.log(error.message)
//     }
//   }
//   getAccessToken()
// }

//   getAccessToken()




// // }


// const startup = () => {}





































  // import {useEffect, useState} from 'react';


  // const CLIENT_ID = 'c37f5ccb59b1429597391b6b157b0642'
  // const REDIRECT_URI = "http://localhost:3000//callback"
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  // const RESPONSE_TYPE = "token"
  
  // const link = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
  
  // export function getURL() {
  //   return link
  // }
  
  // export function retreiveLink() {
  //   if (!sessionStorage.getItem('started')) {
  //     window.location.href = link
  //     sessionStorage.setItem('started', true)
  //   }
  // }
  
  // export function getAccessToken() {
  //   let accessToken;
  //   if (accessToken) {
  //     localStorage.setItem('token', accessToken)
  //     // return accessToken;
  //   }
  
  //   // check for an access token
  //   const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  //   const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  
  //   if (accessTokenMatch && expiresInMatch) {
  //     accessToken = accessTokenMatch[1];
  //     const expiresIn = Number(expiresInMatch[1]);
  //     // This clears the token & expiry so we can get a new token when it expires
  //     window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
  //     window.history.pushState("Access Token", null, "/");
  //     localStorage.setItem('token', accessToken)
  //     // return accessToken;
  //   }
  // }
  
  
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