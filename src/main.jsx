import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/reset.scss";
import "./styles/styles.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/rent-a-ride/" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
