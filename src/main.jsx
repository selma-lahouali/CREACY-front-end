import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/Store";
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
import ManageProducts from "./pages/MyShop/ManageProducts/ManageProducts.jsx";

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
        path: "myShop/:_id",
        element: <SingelProductPage></SingelProductPage>,
      },
      {
        path: "addNewProduct",
        element: <AddNewProd></AddNewProd>,
      },
      {
        path: "manageProducts/:_id",
        element: <ManageProducts></ManageProducts>,
      },
      {
        path: "manageProducts",
        element: <ManageProducts></ManageProducts>,
      },
      {
        path: "contactUs",
        element: <ContactUs></ContactUs>,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
