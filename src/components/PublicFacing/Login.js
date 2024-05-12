//login page
import { useState, useEffect } from "react"
import  { useNavigate } from 'react-router-dom'
import { fetchRequest, refreshToken } from "../PrivateFacing/CheckToken"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [incorrect, setIncorrect] = useState(false)

  const navigate = useNavigate()

  const navigator = async () => {
    //check if we have a google access token in the DB
    //if we do, route to home, otherwise route to google login

    const response = await fetchRequest('http://localhost:3500/users/google-access', "GET")
    const item = await response.json()

    // item.accessToken = "" //REMOVE THIS

    if(item.accessToken === "") navigate('/google-login')
    else navigate('/home')
    return
  }

  useEffect(() => {
    const tryRefresh = async () => { //should be able to directly route to home since if we logged in before, we must have logged into google also
      const res = await refreshToken()
      if(res) navigator()
      return
    }

    tryRefresh()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const newItem = await fetch("http://localhost:3500/auth/refresh", {credentials: 'include'})
    // const newRes = await newItem.json()
    // console.log(newRes)

    try {
      const item = await fetch("http://localhost:3500/auth", {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          username,
          password
        }),
        credentials: "include"
      })

      const response = await item.json()
      if(item.status === 401) {
        console.log("Unauthorized")
        //present username or password incorrect message
        setIncorrect(true)
      }
      else if(item.status === 200) {
        console.log(response)
        //save access token into session storage
        sessionStorage.setItem("accessToken", response.accessToken)

        //redirect to home page
        navigator()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="main-login">
      <div className="login-container">
        <div className="title-and-error">
          <h1 className="login-title" style={!incorrect ? {marginBottom: "50px"} : {}}>Login</h1>
          <div className="error" style={!incorrect ? {display: "none"} : {}}>
            <div className="error-box-container">
              <p className="error-text">Error: Incorrect username or password</p>
            </div>
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            className="username"
            type="text"
            autoFocus
            required
            name="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="password"
            type="password"
            name="Password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-button-container">
            <button 
              className="login-button"
              type="submit"
            >Login</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login