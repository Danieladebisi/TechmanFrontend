import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in both email and password.",
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });
  
      // Successful login
      if (response.data?.success && response.status === 200) {
        localStorage.setItem("adminEmail", response.data.data?.email);
        localStorage.setItem("adminToken", response.data.data?.token);
  
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting...",
          timer: 1500,
          showConfirmButton: false,
        });
  
        navigate("/adminDashboard");
      } else {
        throw new Error("Invalid login response.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.statusMessage || error.message || "Login failed. Please try again.";
  
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        {/* Header */}
        <div
          className="card-header text-center text-white"
          style={{
            background: "linear-gradient(to right, rgb(235, 227, 238), rgb(243, 237, 237))",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <img src={Logo} width="180" height="60" alt="Techmansion logo" />
        </div>

        {/* Body */}
        <div className="card-body">
          <h5 className="text-center text-secondary">ADMIN LOGIN</h5>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-3 input-group">
              <span className="input-group-text bg-gradient text-black">
                <FaUser />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
                aria-label="Email Address"
              />
            </div>

            {/* Password Field */}
            <div className="mb-3 input-group">
              <span className="input-group-text bg-gradient text-black">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
                aria-label="Password"
              />
            </div>

            {/* Forgot Password */}
            <p className="text-center text-muted">
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </Link>
            </p>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-lg w-100 text-white shadow"
              style={{ background: "#3871b1" }}
              disabled={loading}>{loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <a style={{ textDecoration: "none", textAlign: "right" }} href="https://techmansion.tech/privacy-policy/">
          ⏪ Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Login;
