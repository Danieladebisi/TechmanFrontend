import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // Adjust as needed
import Swal from "sweetalert2";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const ADMIN_CREDENTIALS = {
  email: "uwaomaobinna20@gmail.com", // Replace with actual admin email
  password: "Micheal20", // Replace with actual admin password
};

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
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verify if the user is the admin
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting to Home...",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/adminDashboard"); // Redirect to Home
      } else {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Invalid admin credentials.",
        });
      }
    } catch (err) {
      let errorMessage = "Invalid email or password.";
      if (err.code === "auth/user-not-found") errorMessage = "User not found.";
      if (err.code === "auth/wrong-password") errorMessage = "Incorrect password.";
      if (err.code === "auth/too-many-requests")
        errorMessage = "Too many attempts. Try again later.";

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
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
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
