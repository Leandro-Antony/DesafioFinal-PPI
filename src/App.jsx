import Login from "./screens/login/Login.jsx";
import Sign_in from "./screens/sign-in/Sign_in.jsx";
import Shop from "./screens/shop/Shop.jsx";
import Cart from "./screens/Cart/Cart.jsx";

import { BrowserRouter, Route, Routes, Link } from "react-router";

import { CartProvider } from "./services/CartContext.jsx";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-in" element={<Sign_in />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
