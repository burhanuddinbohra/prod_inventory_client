import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Adjust the path as needed
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="container mx-auto ">
        <Navbar />
        <div className="mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
