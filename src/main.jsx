import React from "react";
import ReactDOM from "react-dom/client";
import { Store } from "./redux/Store";
import { Provider } from "react-redux";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import MyShop from "./pages/MyShop/Shop/MyShop.jsx";
import AddNewProd from "./pages/MyShop/AddNewProd/AddNewProd.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import SingelProductPage from "./pages/MyShop/SingelProductPage/SingelProductPage.jsx";
import UpdateProduct from "./pages/MyShop/ManageProducts/UpdateProduct/UpdateProduct.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import CreatShop from "./pages/MyShop/CreatShop/CreatShop.jsx";
import ManageProduct from "./pages/MyShop/ManageProducts/ManageProduct/ManageProduct.jsx";
import SettingPage from "./pages/SettingPage/SettingPage.jsx";
import Profil from "./pages/Profil/Profil.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar></NavBar>,
    children: [
      {
        path: "/",
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
        path: "creatShop",
        element: <CreatShop></CreatShop>,
      },
      {
        path: "myShop/:_id",
        element: <SingelProductPage></SingelProductPage>,
      },
      {
        path: "addNewProduct",
        element: <AddNewProd></AddNewProd>,
      },
      {
        path: "manageProducts",
        element: <ManageProduct></ManageProduct>,
      },
      {
        path: "updateProduct/:_id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "settings",
        element: <SettingPage></SettingPage>,
      },

      {
        path: "contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "profil",
        element: <Profil></Profil>,
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

  {
    path: "*",
    element: <NotFound></NotFound>,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
