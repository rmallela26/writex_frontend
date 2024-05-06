//header component for public layout 
//will contain the nav bar for register and login
import '../../public.css'
import { Link } from 'react-router-dom'

const PublicHeader = () => {
  const content = (
    <header className="pub-header">
        <div className="header-container">
            <h1 id="nav-bar-title">WriteX</h1>
            <nav id="navigation">
                <ul className="nav-buttons">
                    <li>
                        <Link className="nav-links" to="/login">Login</Link>
                    </li>
                    <li> 
                        <Link className='nav-links' to="/register">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  )

  return content
}

export default PublicHeader