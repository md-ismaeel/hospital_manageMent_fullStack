import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from './Pages/Home/Home'
import { Layout } from './Layout/Layout'
import { Login } from './Pages/Login/Login'
import { Messages } from './Pages/Messages/Messages'
import { NewAdmin } from './Pages/NewAdmin/NewAdmin'
import { NewDoctors } from './Pages/NewDoctor/NewDoctors'
import { Doctors } from './Pages/Doctors/Doctors'



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
        {
          path: "adminRegister",
          element: <NewAdmin />
        },
        {
          path: "doctorRegister",
          element: <NewDoctors />
        },
        {
          path: "/message",
          element: <Messages />
        }, {
          path: "doctors",
          element: <Doctors />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
