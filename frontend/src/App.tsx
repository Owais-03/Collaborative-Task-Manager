import './App.css'
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Home from './components/pages/Home'
import Container from "@mui/material/Container";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import Profile from './components/pages/Profile';
import ForgetPassword from './components/auth/ForgetPassword';
import "bootstrap/dist/css/bootstrap.min.css";
import Tasks from './components/pages/Tasks';
import UserProtected from './components/auth/UserProtected';

const appRouter = createBrowserRouter([
    {
    path: "/",
    element: <Home />,
  },
   {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"/forget-password",
    element:<ForgetPassword/>
  },
  {
    path: "/profile",
    element: <UserProtected><Profile /></UserProtected>
  },
  {
   path:'/task-manager',
   element: <UserProtected><Tasks/></UserProtected>
  },
   {
    path: "*",
    element: <ErrorPage />
  }
])

function App() {
  return (
    <>
      <Container
      maxWidth='xl'
      className="z-50 bg-white p-0 rounded-xl h-screen" //w-screen bg-gradient-to-l from-gray-100 via-orange-100 "
      sx={{
        paddingLeft: "0 !important",
        paddingRight: "0 !important",
      }}

    >
      <RouterProvider router={appRouter} />
    </Container>
    </>
  )
}

export default App
