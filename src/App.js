import Store from './components/PrivateFacing/Store'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/PublicFacing/Layout'
import Public from './components/PublicFacing/Public'
import Login from './components/PublicFacing/Login'
import Register from './components/PublicFacing/Register'
import HomeLayout from './components/PrivateFacing/HomeLayout'
import Home from './components/PrivateFacing/Home'
import Essays from './components/PrivateFacing/Essays'
import Activities from './components/PrivateFacing/Activities'
import Calendar from './components/PrivateFacing/Deadlines'
import GoogleLoginPage from './components/PublicFacing/GoogleLoginPage'

function App() {

  return (
    <Store className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="google-login" element={<GoogleLoginPage />} />
          <Route path="register" element={<Register />} />

        </Route>

        <Route path="/home" element={<HomeLayout />} >
            <Route index element={<Home />} />

            <Route path="essays">
              <Route index element={<Essays />} />
            </Route>

            <Route path="activities">
              <Route index element={<Activities />} />
            </Route>

            <Route path="calendar">
              <Route index element={<Calendar />} />
            </Route>

          </Route>
      </Routes>
    </Store>
  );
}

export default App;
