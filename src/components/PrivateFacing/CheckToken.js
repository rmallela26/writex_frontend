const checkTokenThere = () => {
    //check if there is token
    const accessToken = sessionStorage.getItem("accessToken")
    if(!accessToken) return false
    else return true
}

const refreshToken = async () => {
    //check if can refresh token. return true if success, false if not
    const item = await fetch("http://localhost:3500/auth/refresh",  { credentials : "include" })
    if(item.status === 403 || item.status === 401) return false; //need to log in and get new refresh token
    else {
        console.log("YAYAYAYAYA")
        const response = await item.json()
        console.log(response)
        sessionStorage.setItem("accessToken", response.accessToken)
        return true
    }
}

const fetchRequest = async (path, method, body) => {

    let accessToken = sessionStorage.getItem("accessToken")

    try {
        //if body fetch with body included, otherwise don't
        var response
        if(body) {
            response = await fetch(path, {
                method: method,
                headers: new Headers({ 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }),
                body: JSON.stringify(body),
                credentials: "include"
            })
        } else {
            response = await fetch(path, {
                method: method,
                headers: new Headers({ 'Authorization': `Bearer ${accessToken}` }),
                credentials: "include"
            })
        }
        // var response = (body ? await fetch(path, {
        //     method: method,
        //     headers: new Headers({ 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }),
        //     body: JSON.stringify(body)
        // }) : await fetch(path, {
        //     method: method,
        //     headers: new Headers({ 'Authorization': `Bearer ${accessToken}` }),
        // }))

        // const response = await fetch(path, {
        //     method: method,
        //     headers: new Headers({ 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }),
        //     body: JSON.stringify(body)
        // })

        console.log(response)

        if(response.status === 403 || response.status === 401 || response.status === 400) { //expired
            const refreshRes = await refreshToken()
            if(!refreshRes) {
                // navigate('/login')
                console.log("saying refresh token expired")
                return
            }
            accessToken = sessionStorage.getItem("accessToken")
            try {
                response = await fetch(path, {
                    method: method,
                    headers: new Headers({ 'Authorization': `Bearer ${accessToken}` }),
                })
            } catch (err) {
                console.log(err)
            }
        } 
        // console.log("JSON::::")
        // console.log(await response.json())
        return response;
    } catch (err) {
        console.log(err)
    }
}

const checkGoogleToken = async (accessToken, setAccessToken) => {

    //check if token in state is there
    //if it isn't there get token from DB
    //check if the token is valid with fetch
    //set the token if needed if valid
    //otherwise request a refresh and set the new token in the DB and the state

    let newAccessToken = accessToken
    console.log("HEREE HEOFJAWOFJAW;OFJAWO;FJO")

    if(accessToken === '') { //get token from DB
        const response = await fetchRequest('http://localhost:3500/users/google-access', "GET")
        const items = await response.json()
        console.log("items:::")
        console.log(items)
        newAccessToken = items.accessToken
    }

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${newAccessToken}`)
    const resItems = await response.json()
    if(Object.hasOwn(resItems, 'error_description')) { //invalid token, need refresh
        console.log("items error desc :::")
        console.log(resItems.error_description)
        //get refresh token from DB
        const response = await fetchRequest('http://localhost:3500/users/google-refresh', "GET")
        const items = await response.json()
        const refreshToken = items.refreshToken

        //get access token from query
        const response2 = await fetchRequest('http://localhost:3500/auth/google-refresh', "POST", {
            refreshToken: refreshToken
        })
        if(response2.status === 401) {
            //navigate to google login
            setAccessToken("")
            return "";
        }
        const items2 = await response2.json()
        console.log("BEARSBEARSBEARS")
        console.log(items2)
        setAccessToken(items2.access_token)

        //set access token in db
        const response3 = await fetchRequest('http://localhost:3500/users/google-tokens', "POST", {
            accessToken: items2.access_token
        })
        return items2.access_token
    } else { //token is valid
        setAccessToken(newAccessToken)

        //set access token in db
        const response = await fetchRequest('http://localhost:3500/users/google-tokens', "POST", {
            accessToken: newAccessToken
        })
        return newAccessToken
    }
}

module.exports = {
    checkTokenThere,
    refreshToken,
    fetchRequest,
    checkGoogleToken
}