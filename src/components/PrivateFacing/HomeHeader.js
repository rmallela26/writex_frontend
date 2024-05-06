//header component for layout
import { Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { checkTokenThere } from './CheckToken'

const HomeHeader = () => {

  const [displayLogout, setDisplayLogout] = useState(false)  

  const logout = async () => {
    //make logout fetch request
    //remove access token from storage if it's there
    //navigate to login page

    const res = await fetch('http://localhost:3500/auth/logout', {
        method: "POST",
        credentials: 'include'
    })

    if(checkTokenThere()) {
        sessionStorage.removeItem("accessToken")
    }

    window.location.href = '/login'
    return
  }  

  const toggleDisplay = () => {
    if(displayLogout) setDisplayLogout(false)
    else setDisplayLogout(true)
  }

  const content = (
    <header className="home-top">
        <div className="header-container">
            <h1 id="nav-bar-title">WriteX</h1>
            <nav id="navigation">
                <ul className="nav-buttons">
                    <li className='nav-item'>
                        <Link className="nav-links" to="/home">Home</Link> 
                        {/* to should be /home or just / because home is already there? */}
                    </li>
                    <li className='nav-item'> 
                        <Link className='nav-links' to="/home/essays">Essays</Link>
                    </li>
                    <li className='nav-item'> 
                        <Link className='nav-links' to="/home/activities">Activities</Link>
                    </li>
                    <li className='nav-item'> 
                        <Link className='nav-links' to="/home/calendar">Calendar</Link>
                    </li>
                    <li className='nav-item'>
                        <div className='profile-container'>
                            <div className='dropdown-container'>
                                <img 
                                    className='profile-pic'
                                    src={require('../../profile-pic.jpeg')} 
                                    width={"20px"}
                                    height={"20px"}
                                />
                                <FaChevronDown 
                                className='down-arrow' 
                                onClick={toggleDisplay}
                                style={{transform: (displayLogout ? "rotate(180deg)" : "" )}} />
                            </div>
                            <div className='logout-container' style={{display: (displayLogout ? "flex" : "none")}} onClick={logout}>
                                <p className='logout-text'>Logout</p>
                            </div>
                        </div>
                    </li>
                </ul>
                {/* <div className='profile-container'>
                    <img 
                        className='profile-pic'
                        src={require('../../profile-pic.jpeg')} 
                        width={"20px"}
                        height={"20px"}
                    />
                    <div className='dropdown-container'>
                        <FaChevronDown className='down-arrow' />
                        <div className='logout-container'>
                            <p className='logout-text'>Logout</p>
                        </div>
                    </div>
                </div> */}
            </nav>
        </div>
    </header>
  )

  return content
}

export default HomeHeader