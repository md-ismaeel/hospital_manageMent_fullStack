import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./Page/Login/Login";
import { Layout } from "./Layout/Layout";
import { Home } from "./Page/Home/Home";
import { AboutUs } from "./Page/AboutUs/AboutUs";
import { Appointment } from "./Page/Appointment/Appointment";
import { Register } from "./Page/Register/Register";
import { ToastContainer } from 'react-toastify';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "/appointment",
          element: <Appointment />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      <ToastContainer position='center' />
    </RouterProvider>
  )
}

export default App;
