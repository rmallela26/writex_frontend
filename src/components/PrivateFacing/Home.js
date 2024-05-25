//Home page
import { Context } from './Store'
import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { createDoc } from './CreateDoc'
import Thumbnail from './Thumbnail'
const { checkTokenThere, refreshToken, fetchRequest, checkGoogleToken } = require('./CheckToken')

const Home = () => {

  // //replace with fetch call to api (and place inside useref)
  // const collegesRef = useRef(['University of Pennsylvania', 'University of Michigan', 'Yale', 'Stanford']) //modify so that it is an object with an id and college name
  const navigate = useNavigate() //use for checking if we have access token and allowing user to sign in again 

  //make fetch api call inside the useref and make sure it is not calling at every render
  const [search, setSearch] = useState('')
  const [colleges, setColleges] = useState([])
  const [filteredColleges, setFilteredColleges] = useState([])

  const [thumbnails, setThumbnails] = useState([])
  const [numColleges, setNumColleges] = useState(0)

  useEffect(() => { //load all colleges when this page renders first time

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
          fetchItems()
        }
      } else {
        console.log("inside other else")
        fetchItems()
      }
    }

    // if(!checkTokenThere()) {
    //   navigate('/login')
    //   return
    // }
    
    let accessToken = sessionStorage.getItem("accessToken")

    const fetchItems = async () => {
      try {

        const response = await fetchRequest("http://localhost:3500/colleges/college-names", "GET")
        if(!response) {
          navigate('/login')
          return
        }
        const items = await response.json()
        // const response = await fetch("http://localhost:3500/colleges/college-names", {
        //   method: "GET",
        //   headers: new Headers({ 'Authorization': `Bearer ${accessToken}` }),
        // })
        // // const response = await fetch('http://localhost:3500/colleges/college-names')
        // if(response.status === 403) {
        //   if(!refreshToken) {
        //     navigate('/login')
        //     return
        //   }
        //   accessToken = sessionStorage.getItem("accessToken")
        //   try {
        //     const response = await fetch("http://localhost:3500/colleges/college-names", {
        //       method: "GET",
        //       headers: new Headers({ 'Authorization': `Bearer ${accessToken}` }),
        //     })
        //   } catch (err) {
        //     console.log(err)
        //   }
        // }
        
        // const items = await response.json();
        setColleges(items);
        setFilteredColleges(items)

        try { //should be valid, no need to error check since checked above
          // const response = await fetch("http://localhost:3500/users", {
          //   method: "GET",
          //   headers: new Headers({ 'Authorization': `Bearer ${accessToken}` }),
          // })

          const response = await fetchRequest("http://localhost:3500/users", "GET")
          if(!response) {
            navigate('/login')
            return
          }
          if(response.status === 400) throw new Error('bad username')
          const items = await response.json()
          
          const arr = []

          for(const ind in items.colleges) {
            arr.push(items.colleges[ind].name)
          }
          setThumbnails(arr.sort())
          setNumColleges(arr.length)
        } catch (err) {
          console.log(err)
        }

      } catch (err) {
        console.log(err);
      }
    }
    token();
  }, [])

  useEffect(() => {
    const filterColleges = async () => {
      try {
        setFilteredColleges((colleges).filter((college) => ((college.name.name.toLowerCase()).includes(search.toLowerCase()))))
      } catch (err) {
        console.log(err);
      }
    }
    console.log(search)
    filterColleges();
  }, [search, colleges])

  const inputRef = useRef(null);
  const [item, setItem] = useState({}) //.name, .id

  const [accessToken, setAccessToken] = useContext(Context);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const makeUpdates = async () => {
      if(Object.keys(item).length === 0) return; //check if item is empty
      else if (thumbnails.includes(item.name)) return; //we already have this college
      setNumColleges(numColleges+1)
      
      console.log("starting")
      //start spinner effect to show loading
      setLoading(true)

      //request full info on this college (send id parameter)
      // const response = await fetch(`http://localhost:3500/one-college?id=${item.id}`)
      // const collegeObj = await response.json()

      //create google doc for this college
      console.log(accessToken)
      const res = await checkGoogleToken(accessToken, setAccessToken)
      if(res === "") {
        console.log("navigating to google login")
        navigate('/google-login')
        return
      }
      const docId = await createDoc(item.name, res, item.id)
      if(!docId) {
        navigate('/login')
        return
      }

      //add college name and google doc id pair to user in DB
      const response = await fetchRequest("http://localhost:3500/users/add", "PATCH", {
        "college": {
          "name": item.name,
          "id": docId
        }
      })

      console.log((await response.json()))

      //add thumbnail (picture (from wikipedia), college name, location, maybe one sentence description from wikipedia)
      setThumbnails([...thumbnails, item.name].sort())
    }

    makeUpdates().then(() => {
        //end spinner effect
        console.log("done")
        setLoading(false)
      }
    );
  }, [item])

  const [deletedCollege, setDeletedCollege] = useState('')

  useEffect(() => {
    const makeDeletion = async () => {
      if(deletedCollege === '') return;
      setNumColleges(numColleges-1)
      const res = await fetchRequest('http://localhost:3500/users/delete', "PATCH", {
        college: deletedCollege
      })

      //delete college from display
      const arr = thumbnails.filter(str => str !== deletedCollege)
      setThumbnails(arr)
    }

    makeDeletion();
  }, [deletedCollege])

  const createKey = (input) => {
  
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  const content = (
    <main className={loading ? "loading-overlay" : ""}>
      <section className="search-area-cotainer">
        <form className="search-colleges" onSubmit={(e) => {e.preventDefault()}}>
          <input
            ref={inputRef}
            id="searchbar"
            type="search"
            placeholder="Add college"
            name="Add college"
            value={search}
            autoComplete='off'
            onChange={(e) => setSearch(e.target.value)}
          />
          <section className="search-results">
            <ul id='list'>
              {(filteredColleges).map((college) => (
                <li className='college' onClick={() => {
                  inputRef.current.focus()
                  console.log("clicked")
                  }} key={college.id} onMouseDown={() => {setItem({name: college.name.name, id: college.name._id})}}>
                  {college.name.name}
                </li>
              ))}
            </ul>
          </section>
        </form>
      </section>
      <section className='college-thumbnails'>
        <p className='college-number'>{numColleges} {numColleges === 1 ? "College" : "Colleges"}</p>
        <ul className='colleges-list'>
          {thumbnails.map((thumbnail) => (
            <Thumbnail 
              key={createKey(thumbnail)}
              name={thumbnail} 
              setter={setDeletedCollege}
            />
          ))}
        </ul>
      </section>
    </main>
  )

  return content
}

export default Home