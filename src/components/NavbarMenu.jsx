import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import "./NavbarMenu.css";

function NavbarMenu({ admin, onLogout }) {
  // State to store logged-in user details
  // const [user, setUser] = useState(null);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // // Handle Login
  // const handleLogin = (e) => {
  //   e.preventDefault();
    
  //   // Simulated login (Replace with real API)
  //   if (email === "user@example.com" && password === "password123") {
  //     setUser({
  //       name: "Obinna",
  //       image: "https://i.pravatar.cc/50", // Replace with actual user image from API
  //     });
  //   } else {
  //     alert("Invalid credentials!");
  //   }
  // };

  return (
    <Navbar expand="lg" className="bg-teal-500 shadow-lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={Logo}
            width="110"
            height="50"
            className="d-inline-block align-top"
            alt="Techmansion logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0 gap-5" navbarScroll>
            <Link to="/" className="nav-link" style={{ color: "#3d85c6" }}>
              Home
            </Link>

            <Link to="/compare" className="nav-link" style={{ color: "#3d85c6" }}>
              Compare
            </Link>
            
            <a
              href="https://techmansion.tech/"
              style={{ color: "#3d85c6" }}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              News
            </a>
            <a
              href="https://techmansion.tech/about-tech-mansion/"
              style={{ color: "#3d85c6" }}
              target="_self"
              rel="noopener noreferrer"
              className="nav-link"
            >
              About
            </a>
            <Link to="/contact" className="nav-link" style={{ color: "#3d85c6" }}>
              Contact
            </Link>

            {/* NavDropdown for Login / User */}
            {/* <NavDropdown
              title={
                user ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={user.image}
                      alt="User"
                      className="rounded-circle w-8 h-8 object-cover"
                    />
                    <span style={{ color: "#3d85c6",  marginLeft: "1em" }}>{user.name}</span>
                  </div>
                ) : (
                  <span style={{ color: "#3d85c6" }}>Login</span>
                )
              }
              id="navbarDropdown"
            >
              {admin && (
                <Form className="p-3" onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="secondary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              ) : (
                <NavDropdown.Item onClick={() => setUser(null)}>
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>*/}
          </Nav> 

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
