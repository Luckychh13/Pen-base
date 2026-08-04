import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Footer from './components/Footer/Footer'

function App() {

  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoader(false))
  }, [])

  return !loader ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <h4>Loading...</h4>
  )
}

export default App