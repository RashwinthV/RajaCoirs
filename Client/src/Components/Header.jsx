import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  FaHome,
  FaInfoCircle,
  FaBoxOpen,
  FaIndustry,
  FaPhone,
  FaUserCircle,
  FaImages,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Header.css";

const Header = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [users, setusers] = useState("");

  const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setusers(user);
    setIsLoggedin(!!user);
  };

  useEffect(() => {
    checkLogin();

    const onStorageChange = (e) => {
      if (e.key === "user") {
        checkLogin();
      }
    };

    window.addEventListener("storage", onStorageChange);

    const onLoginChange = () => {
      checkLogin();
    };
    window.addEventListener("loginChange", onLoginChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("loginChange", onLoginChange);
    };
  }, []);

  return (
    <>
      {/* Top navbar for desktop/tablet */}
      <header className="d-none d-md-block">
        <Navbar expand="lg" bg="success" variant="dark" className="shadow-sm fixed-top ">
          <Container className="header">
            <Navbar.Brand href="/">
              <img
                src="/vite.svg"
                width="40"
                height="40"
                className="d-inline-block align-top me-3"
                alt="Coir Industry"
              />
              Shri Raja Coirs
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto align-items-center d-flex fw-bold gap-5">
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/infrastructure">Infrastructure</Nav.Link>
                <Nav.Link href="/gallery">Gallery</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                {isLoggedin ? (
                  <Nav.Link
                    href="/profile"
                    className="d-flex align-items-center"
                  >
                    <FaUserCircle size={18} className="me-1" />{" "}
                    {users.firstName}
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/login" className="d-flex align-items-center">
                    <FaUserCircle size={18} className="me-1" /> Login
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Mobile view: Top bar */}
      <div className="d-md-none bg-success text-white d-flex justify-content-between align-items-center px-3 py-2 shadow-sm fixed-top">
        <a
          href="/"
          className="fw-bold text-white text-center"
          style={{ textDecoration: "none" }}
        >
          <img
            src="/vite.svg"
            width="40"
            height="40"
            className="d-inline-block align-top me-3"
            alt="Coir Industry"
          />
          Shri Raja Coirs
        </a>
        <div className="d-flex align-items-center p-2">
          <a
            href={isLoggedin ? "/profile" : "/login"}
            className="text-white d-flex align-items-center text-decoration-none"
          >
            <FaUserCircle size={24} className="me-2" />
            <span>{isLoggedin ? `${users.firstName} ` : "Login"}</span>
          </a>
        </div>
      </div>

      {/* Push mobile bottom nav down due to fixed top bar */}
      <div style={{ height: "48px" }} className="d-md-none" />

      {/* Bottom nav for mobile */}
      <nav className="mobile-bottom-nav d-md-none bg-success text-white fixed-bottom d-flex justify-content-around py-2">
        <a href="/" className="text-white text-center">
          <FaHome size={20} />
          <br />
          Home
        </a>
        <a href="/about" className="text-white text-center">
          <FaInfoCircle size={20} />
          <br />
          About
        </a>
        <a href="/products" className="text-white text-center">
          <FaBoxOpen size={20} />
          <br />
          Products
        </a>
        <a href="/gallery" className="text-white text-center">
          <FaImages size={20} />
          <br />
          Gallery
        </a>
        <a href="/infrastructure" className="text-white text-center">
          <FaIndustry size={20} />
          <br />
          Infra
        </a>
        <a href="/contact" className="text-white text-center">
          <FaPhone size={20} />
          <br />
          Contact
        </a>
      </nav>
    </>
  );
};

export default Header;
