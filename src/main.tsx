import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Details from "./Components/Details";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/second", // Define the path for the next page
    element: <Details />, // Replace 'SuccessPage' with the component you want to render on the next page
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
