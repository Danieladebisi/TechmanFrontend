import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // Adjust as needed
import Swal from "sweetalert2";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
  
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You will be redirected shortly...",
        timer: 2000,
        showConfirmButton: false,
      });
  
      setTimeout(() => {
        navigate("/");
      }, 2000);
  
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
      });
    }
  };  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        {/* Header */}
        <div
          className="card-header text-center text-white"
          style={{
            background: "linear-gradient(to right,rgb(235, 227, 238),rgb(243, 237, 237))",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <img
                      src={Logo}
                      width="180"
                      height="60"
                      className="d-inline-block align-top"
                      alt="Techmansion logo"
                    />
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
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>

            {/* Forgot Password */}
            <p className="text-center text-muted">
              <a href="#" className="text-decoration-none">
                Forgot Password?
              </a>
            </p>

            {/* Login Button */}
            <button type="submit" className="btn btn-lg w-100 text-white shadow" 
              style={{ background: "#3871b1" }}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
