import React from "react";
import Login from "./Components/Login";
import Genre from "./Components/Genre";
import Widget from "./Components/Widget";
import { Toaster } from "react-hot-toast";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/genre",
      element: <Genre />
    },
    {
      path: "/widget",
      element: <Widget />
    }
  ])

  return <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>;
}

export default App;