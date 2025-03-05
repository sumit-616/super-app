import React from "react";
import Login from "./Components/Login";
import Genre from "./Components/Genre";
import Widget from "./Components/Widget";
import Movies from "./Components/Movies";
import { Toaster } from "react-hot-toast";
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
    },
    {
      path: "/movies",
      element: <Movies/>
    },
  ])

  return <>
    <RouterProvider router={router} />
  </>;
}

export default App;