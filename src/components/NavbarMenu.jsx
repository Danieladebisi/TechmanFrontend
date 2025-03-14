import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../assets/Tech Mansion_Logo.png";
import { Link } from "react-router-dom";
import "./NavbarMenu.css";

function NavbarMenu({ admin, onLogout }) {
  return (
    <Navbar expand="lg" className="bg-teal-500 shadow-lg">
      <Container fluid>
        <Navbar.Brand href="/compare">
          <img
            src={Logo}
            width="200"
            height="80"
            className="d-inline-block align-top"
            alt="Techmansion logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0 gap-5" navbarScroll>
            {/* <Link to="/" className="nav-link" style={{ color: "#3d85c6" }}>
              Home
            </Link> */}

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
