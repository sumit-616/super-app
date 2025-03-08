import React from "react";
import Login from "./Components/Login";
import Genre from "./Components/Genre";
import Widget from "./Components/Widget";
import Movies from "./Components/Movies";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  [
    { path: "/", element: <Login /> },
    { path: "/genre", element: <Genre /> },
    { path: "/widget", element: <Widget /> },
    { path: "/movies", element: <Movies /> },
  ],
  {
    basename: "/super-app/", // Ensures routing works on localhost and GitHub Pages
  }
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
