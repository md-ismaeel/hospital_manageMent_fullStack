import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from './Page/Home/Home'
import { Layout } from './Layout/Layout'
import { Login } from './Page/Login/Login'

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <Home />
        },
        {}
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
