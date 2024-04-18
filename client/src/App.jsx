import * as React from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Write } from "./pages/Write";
import Single from "./pages/Single";
import './style.scss'
import Profile from "./pages/Profile";

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: '/',
        element:<Home />
      },
      {
        path: '/post/:id',
        element:<Single />
      },
      {
        path: '/write',
        element:<Write />
      },
      {
        path: '/profile',
        element:<Profile />
      },
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
    <div className="container">
      <RouterProvider router={router} />
    </div>
  </div>
  );
}

export default App;
