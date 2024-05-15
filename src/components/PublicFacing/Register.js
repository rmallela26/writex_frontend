import React from 'react'
import { useState } from 'react'

const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    //communciate with api
  }

  return (
    <main className="h-screen bg-cover bg-[url('../../6289efcc9a52f65ff46e8400_white-gradient.png')]">
      <div className='shadow-md mt-28 bg-slate-200 w-1/4 rounded-lg flex-col'>
        <p className='text-2xl mt-7 mb-4 font-sans font-semibold flex justify-center'>Sign up</p>
        <form className='flex flex-col items-center' onSubmit={(e) => handleSubmit(e)}>
          <input 
              className='h-10 bg-slate-100 w-10/12 p-2 m-3 border-none shadow-md rounded-md'
              type="text"
              autoFocus
              required
              name="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className='h-10 bg-slate-100 w-10/12 p-2 m-3 border-none shadow-md rounded-md'
              type="password"
              name="Password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className='h-10 bg-slate-100 w-10/12 p-2 m-3 border-none shadow-md rounded-md'
              type="password"
              name="Password"
              placeholder="Confirm password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <p className={`mb-7 w-10/12 pl-2 text-red-500 ${password === confirmPass ? 'invisible' : 'visible'} items-start`}>Passwords do not match</p>
            <button type='submit' className='h-10 w-40 bg-slate-400 mb-10'>Create Account</button>
        </form>
      </div>
    </main>
  )
}

export default Register