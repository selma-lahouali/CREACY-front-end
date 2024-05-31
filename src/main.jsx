import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./components/i18n/i18n.js";
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
import Cart from "./pages/Cart/Cart.jsx";
import UpdateProductDescription from "./pages/MyShop/ManageProducts/UpdateProductDescription/UpdateProductDescription.jsx";
import Stripe from "./pages/Stripe/Stripe.jsx";
import Order from "./pages/Order/Order.jsx";
import Chat from "./pages/Chat/Chat.jsx";
import SingleShop from "./pages/SingleShop/SingleShop.jsx";
import MyShopSettings from "./pages/MyShop/MyShopSettings/MyShopSettings.jsx";

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
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "myShop",
        element: <MyShop></MyShop>,
      },
      {
        path: "singleShop/:_id",
        element: <SingleShop></SingleShop>,
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
        path: "UpdateProductDescription/:_id",
        element: <UpdateProductDescription></UpdateProductDescription>,
      },
      {
        path: "shopSettings",
        element: <MyShopSettings></MyShopSettings>,
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
      {
        path: "order",
        element: <Order></Order>,
      },
      {
        path: "payment",
        element: <Stripe></Stripe>,
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

  {
    path: "chat",
    element: <Chat></Chat>,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
