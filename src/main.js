import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Details from "./Components/Details";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(App, {}),
    },
    {
        path: "/second",
        element: _jsx(Details, {}), // Replace 'SuccessPage' with the component you want to render on the next page
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(RouterProvider, { router: router }) }));
