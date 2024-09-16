import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data.errors) {
        // Collect validation error messages
        const errorMessages = err.response.data.errors
          .map((err) => err.msg)
          .join(", ");
        alert(`Validation errors: ${errorMessages}`);
      } else {
        // Show generic error message
        alert(
          "Login failed: " + (err.response?.data?.message || "Unknown error")
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label>Email</label>
          <input
            className="w-full p-2 border"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            className="w-full p-2 border"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
