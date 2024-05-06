import DocItem from "./DocItem"
import { useEffect, useState } from "react"
import { checkTokenThere, refreshToken, fetchRequest } from "./CheckToken"
import { useNavigate } from "react-router-dom"

const Essays = () => {

  const navigate = useNavigate()
  const [docs, setDocs] = useState([])
  console.log("hwofwofjwof")
  // const docs = []
  const myDocs = []

  useEffect(() => {
    // const needToReturn = false
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
      console.log("INSIDE GET DOCS")
      const response = await fetchRequest("http://localhost:3500/users", "GET")
      if(!response) {
        navigate('/login')
        return
      }
      //REMOVE
      if(response.status === 400) throw new Error('bad username')
      const items = await response.json()
      console.log(items.colleges[0])
      const arr = []
      for(const ind in items.colleges) {
        arr.push({
          name: items.colleges[ind].name,
          docId: items.colleges[ind].id
        })
      }

      setDocs(arr)
    }

    token()
    console.log(myDocs)
  }, [])


  //Mich, UT Austin, Penn
  // const docIds = ["1G5jqNlbc3pSkXVxnqHDoQaUP_tObhheBJlD8882pF5g", "1mTv8twW7HkcQO5LxVCYSN_B-U4Ko4d8WOaY4k35eSVI", "1BCaVdX0t5QXDmtRppMlTxtNlZNrGkFAQ4PksCeGaeXs"]

  // const docs = [
  //   {
  //     name: "University of Michigan",
  //     docId: "1G5jqNlbc3pSkXVxnqHDoQaUP_tObhheBJlD8882pF5g"
  //   },
  //   {
  //     name: "University of Texas at Austin",
  //     docId: "1mTv8twW7HkcQO5LxVCYSN_B-U4Ko4d8WOaY4k35eSVI"
  //   },
  //   {
  //     name: "University of Pennsylvania",
  //     docId: "1BCaVdX0t5QXDmtRppMlTxtNlZNrGkFAQ4PksCeGaeXs"
  //   },
  //   {
  //     name: "Purdue University",
  //     docId: "11bKCg1jxJ0jue0jeX79sSFnVjVV2BSu7kTncfLSEhaE"
  //   },
  //   {
  //     name: "Yale University",
  //     docId: "1DEUJ7zrhNzol5PkZKLvsBDoHIpOyIjOazRcKY53l1kA"
  //   },
  //   {
  //     name: "Johns Hopkins University",
  //     docId: "1gEzBgkoJafgy0cmmIzRKbbmEku2nVdf03IaXYO01KMU"
  //   },
  //   {
  //     name: "Columbia University",
  //     docId: "1uACpynVhGf8noKKzS72JJ3R-uFPer3U8I2UMAWSx7DA"
  //   }
  // ]

  return (
    <main>
      <section className="top-image" />
      {/* <DocItem name="University of Michigan" id="1G5jqNlbc3pSkXVxnqHDoQaUP_tObhheBJlD8882pF5g" /> */}
      <section className="docs-container">
        {docs.map((doc) => (
          <DocItem key={docs.findIndex(x => x === doc)} name={doc.name} id={doc.docId} extension={"Essays"} />
        ))}
      </section>
    </main>
  )
}

export default Essays