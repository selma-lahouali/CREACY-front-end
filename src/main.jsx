import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import MyShop from "./pages/MyShop/Shop/MyShop.jsx";
import AddNewProd from "./pages/MyShop/AddNewProd/AddNewProd.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

const router = createBrowserRouter([
  {
    path: "/main",
    element: <NavBar></NavBar>,
    children: [
      {
        path: "test",
        element: <App></App>,
      },
      {
        path: "home",
        element: <Home></Home>,
      },
      {
        path: "myShop",
        element: <MyShop></MyShop>,
      },
      {
        path: "addNewProduct",
        element: <AddNewProd></AddNewProd>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
