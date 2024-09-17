export const authenticate = async () => {
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
  
  const codeVerifier  = '66e8e4f022f07c2dddb1daedadf9db427eeae5eeb40523629e0d6f22'
  window.sessionStorage.setItem('code_verifier', codeVerifier);
  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed);
  
  const clientId = 'c37f5ccb59b1429597391b6b157b0642';
  const redirectUri = 'http://localhost:3000//callback';
  
  const scope = 'playlist-modify-private playlist-modify-public';
  const authUrl = new URL("https://accounts.spotify.com/authorize")
  
  
  const params =  {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }
  
  if (!window.sessionStorage.getItem('started')) {
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
    window.sessionStorage.setItem('started', true)
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  const getToken = async code => {

    // stored in the previous step
    let codeVerifier = sessionStorage.getItem('code_verifier');
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
        scope: scope,
      }),
    }

    const url = 'https://accounts.spotify.com/api/token'
    try {
      const body = await fetch(url, payload);
      const response = await body.json();
      if (!response.access_token) {
        console.error('error response', response);
        throw new Error('HTTP status ' + response.status + ': ' + response.error + ":" + response.error_description);
      } else {
        // console.log(response)
        sessionStorage.setItem('access_token', response.access_token);
        window.sessionStorage.setItem('flag', true)
        return response.access_token
      }
    } catch (error) {
      console.log(error.message)
    } 
  }
  if(!sessionStorage.getItem('flag', true)) {
    const token = await getToken(code)
    return token
  }
}


