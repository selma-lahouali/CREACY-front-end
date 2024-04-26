// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
// import Home from "./pages/Home/Home.jsx";
// import Login from "./pages/Login/Login.jsx";
// import Register from "./pages/Register/Register.jsx";
// import MyShop from "./pages/MyShop/Shop/MyShop.jsx";
// import NavBar from "./components/NavBar/NavBar.jsx";
// import AddNewProd from "./pages/MyShop/AddNewProd/AddNewProd.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App></App>,
//   },
//   {
//     path: "/register",
//     element: <Register></Register>,
//   },
//   {
//     path: "/login",
//     element: <Login></Login>,
//   },
//   {
//     path: "/home",
//     element: <Home></Home>,
//   },
//   {
//     path: "/myShop",
//     element: <MyShop></MyShop>,
//   },
//   {
//     path: "/addNewProduct",
//     element: <AddNewProd></AddNewProd>,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//       <NavBar></NavBar>
//       <RouterProvider router={router} />

//   </React.StrictMode>
// );

import React, { useState } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import MyShop from "./pages/MyShop/Shop/MyShop.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import AddNewProd from "./pages/MyShop/AddNewProd/AddNewProd.jsx";
import DarkLightMode from "./components/DarkLightMode/DarkLightMode.jsx";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/myShop",
    element: <MyShop></MyShop>,
  },
  {
    path: "/addNewProduct",
    element: <AddNewProd></AddNewProd>,
  },
]);

const Main = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const themeVariables = {
    dark: {
      "--mainBleu": "#de870e",
      "--mediumBleu": "#2c8ff1",
      "--darkBleu": "#0d2e46",
      "--lightBleu": "#c0c692",
    },
    light: {
      "--mainBleu": "#6c757d",
      "--mediumBleu":"#adb5bd",
      "--darkBleu": "#4b5257",
      "--lightBleu": "#dee5ec",
    },
  };

  return (
    <React.StrictMode>
      <div style={themeVariables[theme]}>
        <NavBar></NavBar>
        <RouterProvider router={router} />
        <DarkLightMode onToggle={toggleTheme} />
      </div>
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);