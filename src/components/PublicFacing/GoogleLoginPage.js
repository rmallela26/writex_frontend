import { useEffect, useContext } from "react"
import { Context } from "../PrivateFacing/Store"
import  { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
const { checkTokenThere, fetchRequest } = require('../PrivateFacing/CheckToken')


const GoogleLoginPage = () => {
  const [accessToken, setAccessToken] = useContext(Context);
  const navigate = useNavigate();  

  useEffect(() => {
    if(!checkTokenThere()) {
        console.log("navigating to /login")
        navigate('/login')
        return
    } 
  }, [])

  const login = useGoogleLogin({
    onSuccess: async({ code }) => {
        const tokens  = await fetchRequest('http://localhost:3500/auth/google', "POST", { "code": code })
        const myTokens = await tokens.json() //returns refresh and access tokens

        setAccessToken(myTokens.access_token)

        //save the tokens in the DB
        const response = await fetchRequest('http://localhost:3500/users/google-tokens', "POST", {
            accessToken: myTokens.access_token,
            refreshToken: myTokens.refresh_token
        })
    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/drive.file'
  });


  const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            console.log(typeof(code))
            const tokens = await fetch('http://localhost:3500/auth/google', {
                method: "POST",
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(
                    { "code": code }
                )
            })
            
            const myTokens = await tokens.json()
            console.log(myTokens);

        },
        flow: 'auth-code',
    });

    const googleRefresh = async () => {
        //SHOULD REFRESH BE HERE I DON'T THINK SO
        const refresh = '1//01B6rpvbuVgfOCgYIARAAGAESNwF-L9IrACJc7O_pVb2RvpTYJ_fd9fRSdejwgQHZy1bKqzw3XnYtJhuSGMIQViIZEKCpu5kmPYY'
        const tokens = await fetch('http://localhost:3500/auth/google-refresh', {
            method: "POST",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(
                { "refreshToken": refresh }
            )
        })

        console.log("===========================")
        console.log(tokens)

        const myTokens = await tokens.json()
        console.log(myTokens)
        console.log("=========BEARS==============")
    }
  
    // if(googleUser.length === 0) {

    if(accessToken !== '') navigate('/home')
    const content = (
        <main className="main-login">
            <div className="login-container">
                {/* <h1 className="login-title" >Login</h1> */}
                <h1 className="login-title" style={{ marginBottom: "40px" }}>Login with Google</h1>
                <p className="google-description">Please login with google below so WriteX can create documents for you.</p>
                <div className="button-outer">
                    <div className="button-container" onClick={login}>
                        <img id="google-image" src={require("../../google.jpeg")} width={"45px"} height={"45px"}/>
                        <div className="google-text-container">
                            <p className="google-login-text">Login with Google</p>
                        </div>
                    </div>
                </div>
                {/* <button 
                    className="google-button"
                    type="button"
                    onClick={login}
                >Login with Google</button> */}
            </div>
        </main>
    )

    return content

    //     return (
    //         <>
    //             <button 
    //                 type="button"
    //                 onClick={googleLogin}
    //             >login with google</button>
    //             <button 
    //                 type="button"
    //                 onClick={googleRefresh}
    //             >refresh tokens</button>
    //         </>
    //     )
    // } else {
    //     console.log(googleUser)
    //     navigate("/home");
    // }
    
  
}

export default GoogleLoginPage