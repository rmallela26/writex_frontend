import { Outlet } from 'react-router-dom'
import PublicHeader from './PublicHeader'

const Layout = () => {
  return (
    <>
        <PublicHeader />
        <div className='main-container'>
            <Outlet />
        </div>
    </>
  )
}

export default Layout