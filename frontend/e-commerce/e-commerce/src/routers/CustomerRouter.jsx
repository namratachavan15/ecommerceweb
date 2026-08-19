import React from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../customer/components/Navigation/NavigationPage";
import HomePage from "../customer/components/pages/HomePage/HomePage";
import Cart from "../customer/components/Cart/Cart";
import FooterPage from "../customer/components/Footer/FooterPage";
import Product from "../customer/components/Product/Product";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Order/Order";
import OrderDetails from "../customer/components/Order/OrderDetails";
import PaymentSuccess from "../customer/components/Payment/PaymentSuccess";
import SearchResult from "../customer/components/pages/HomePage/SearchResult";
import ProfilePage from "../customer/components/pages/HomePage/ProfilePage";

const CustomerRouter = () => {
  return (
    <div>
      <Navigation />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* PRODUCTS */}
        <Route
          path="/:lavelOne/:lavelTwo/:lavelThree"
          element={<Product />}
        />

        <Route
          path="/product/:productId"
          element={<ProductDetails />}
        />

        {/* CART */}
        <Route path="/cart" element={<Cart />} />

        {/* CHECKOUT */}
        <Route path="/checkout" element={<Checkout />} />

        {/* ORDERS */}
        <Route path="/account/order" element={<Order />} />

        <Route
          path="/account/order/:orderId"
          element={<OrderDetails />}
        />

        {/* PAYMENT */}
        <Route
          path="/payment/:orderId"
          element={<PaymentSuccess />}
        />

        {/* SEARCH */}
        <Route
          path="/search-results"
          element={<SearchResult />}
        />

        {/* PROFILE */}
        <Route
          path="/account/profile"
          element={<ProfilePage />}
        />

      </Routes>

      <FooterPage />
    </div>
  );
};

export default CustomerRouter;