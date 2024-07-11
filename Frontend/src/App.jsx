import { Provider, useSelector } from "react-redux"
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Login } from "./Page/Login/Login"
import { Layout } from "./Layout/Layout"
import { Home } from "./Page/Home/Home"

function App() {
  const { user } = useSelector((state) => state.userSlice)

  const router = createBrowserRouter([
    {
      path: 'login',
      element: <Login />
    },
    {
      path: '/',
      element: <Layout />,

      children: [
        {
          path: 'home',
          element: <Home />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
