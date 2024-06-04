import logo from "./logo.svg";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import LoginPage from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import CartDetails from "./components/CartDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Products" element={<ProductDetails />} />
        <Route path="/Products/Cart" element={<CartDetails />} />
      </Routes>
    </div>
  );
}

export default App;
