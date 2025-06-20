import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../Layouts/Dashboard";
import Main from "../Layouts/Main";
import AboutUs from "../Pages/FooterComponents/AboutUs";
import ContactUs from "../Pages/FooterComponents/ContactUs";
import Event from "../Pages/FooterComponents/Event";
import News from "../Pages/FooterComponents/News";
import Login from "../Pages/Login/Login";
import NotFound from "../Pages/Shared/NotFound";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "../Pages/Home/Home";
import AllProductPage from "../Pages/products/AllProductPage";
import OrderConfirmed from "../Pages/Dashboard/OrderConfirmed";
import PlaceOrder from "../Pages/Home/PlaceOrder";
import SingleProductCard from "./../Pages/SingleProductCard/SingleProductCard";
import Prp from "./../Pages/products/Prp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "place-order",
    element: (
      <PrivateRoute>
        <PlaceOrder />
      </PrivateRoute>
    ),
  },

  {
    path: "/",
    element: <Main></Main>,
    children: [
     
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },

      {
        path: "product-request",
        element: (
          <PrivateRoute>
            <Prp />
          </PrivateRoute>
        ),
      },

      {
        path: "/products/category",
        element: <AllProductPage />,
      },

      {
        path: "products/:id",
        element: <SingleProductCard />,
      },

      {
        path: "events",
        element: <Event></Event>,
      },

      {
        path: "news",
        element: <News></News>,
      },
      {
        path: "contactUs",
        element: <ContactUs />,
      },

      {
        path: "about-us",
        element: <AboutUs />,
      },

      {
        path: "order-confirmed",
        element: <OrderConfirmed />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <Dashboard />{" "}
      </PrivateRoute>
    ),
    children: [],
  },

  {
    path: "*", // Match any unrecognized path
    element: <NotFound></NotFound>, // Replace "NotFound" with your own component
  },
]);
