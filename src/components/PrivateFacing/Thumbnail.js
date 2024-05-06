import { FaTrashAlt } from 'react-icons/fa'
import { fetchRequest } from './CheckToken'
import { useEffect, useState } from 'react'

const Thumbnail = ({ name, setter }) => {

  const [logo, setLogo] = useState('')

  useEffect(() => {
    const getLogo = async () => {
      let param = name
      param = param.split(' ').join('_')
      
      const response = await fetchRequest(`http://localhost:3500/colleges/logo?name=${param}`, "GET")
      const items = await response.json()

      console.log(items)

      // if(items.logo === "none") setLogo('../../logo-alt.jpeg')
      setLogo(items.logo)

    }

    getLogo()
  }, [])

  const handleClick = (collegeDeleted) => {
    setter(collegeDeleted)
    console.log(`${collegeDeleted} deleted`)
  }

  return (
    <div className="thumbnail-container">
      <section className="thumbnail">
        <img className='logo' src={(logo === "none" ? require('../../logo-alt.jpeg') : logo)} alt={require('../../logo-alt.jpeg')} width="100" height="100" />
        {/* <img className='logo' src={"//upload.wikimedia.org/wikipedia/en/thumb/b/bc/University_of_Southern_California_seal.svg/150px-University_of_Southern_California_seal.svg.png"} alt="" width="100" height="100" /> */}
        {/* <img className='logo' src={require('../../UPenn_shield_with_banner.svg.png')} alt="" width="100" height="100" /> */}
        <h1 className="thumbnail-college-name">{name}</h1>
        <FaTrashAlt className='delete-button' role='button' onClick={() => handleClick(name)} />
      </section>
    </div>
  )
}

export default Thumbnail