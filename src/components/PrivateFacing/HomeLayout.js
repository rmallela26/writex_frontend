//Layout for all protected pages
import { Outlet } from 'react-router-dom'
import HomeHeader from './HomeHeader'

const HomeLayout = () => {

  return (
    <>
        <HomeHeader />
        <div>
            <Outlet />
        </div>
    </>
  )
}

export default HomeLayout