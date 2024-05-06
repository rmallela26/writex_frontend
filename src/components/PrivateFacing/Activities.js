//activites tab
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { checkTokenThere, refreshToken, fetchRequest, checkGoogleToken } from "./CheckToken"
import { createActivitiesDoc } from "./CreateActivitiesDoc"
import { Context } from './Store'
import DocItem from "./DocItem"

const Activities = () => {

  const navigate = useNavigate()
  const [activities, setActivities] = useState([])
  const names = ["Common App Honors", "Common App Activities", "UC Activities"]
  const [accessToken, setAccessToken] = useContext(Context);

  useEffect(() => {
    const token = async () => {
      if(!checkTokenThere()) {
        console.log("here")
        const res = await refreshToken()
        if(!res) {
          console.log("refresh expired")
          navigate('/login')
          // needToReturn = true
          return
        } else {
          console.log("inside else")
          getDocs()
        }
      } else {
        console.log("inside other else")
        getDocs()
      }
    }

    const getDocs = async () => {
      // const id = await createActivitiesDoc("Common App Honors", res)
      // const newId = await createActivitiesDoc("Common App Activities", res)
      
      const response = await fetchRequest("http://localhost:3500/users/activities", "GET")
      console.log(response)
      if(!response) {
        navigate('/login')
        return
      }
      const items = await response.json()
      console.log("items activities::")
      console.log((items.activities).length)
      if((items.activities).length === 0) { //need to initialize activities lists for common app
        const res = await checkGoogleToken(accessToken, setAccessToken)
        const honorsId = await createActivitiesDoc("Common App Honors", res)
        const actsId = await createActivitiesDoc("Common App Activities", res)

        const response = await fetchRequest("http://localhost:3500/users/activities", "POST", {
          activities: [honorsId, actsId]
        }) 
      }

      setActivities(items.activities)
    }

    token()
  }, [])

  return (
    <div>
      <main>
        <section className="top-image" />
        <section className="docs-container">
          {activities.map((activity) => (
            <DocItem 
              key={activities.findIndex(x => x === activity)} 
              name={names[activities.findIndex(x => x === activity)]} 
              id={activity } 
              extension={"List"}  
            />
          ))}
        </section>
      </main>
    </div>
  )
}

export default Activities