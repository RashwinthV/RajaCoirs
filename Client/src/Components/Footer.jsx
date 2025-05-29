import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/footer.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-auto">
      <Container>
        {/* Social Links */}
        <Row className="justify-content-center mb-5">
          <Col xs="auto" className="d-flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-light social-icon"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-light social-icon"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-light social-icon"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-light social-icon"
            >
              <FaLinkedinIn size={20} />
            </a>
          </Col>
        </Row>

        {/* Main Footer Content */}
        <Row className="align-items-start">
          <Col md={6}>
            {/* Horizontal nav for md+ */}
            <ul className="list-unstyled d-none d-md-flex flex-wrap gap-3">
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-decoration-none text-light">
                  About
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-decoration-none text-light">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/products" className="text-decoration-none text-light">
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/infrastructure"
                  className="text-decoration-none text-light"
                >
                  Infrastructure
                </a>
              </li>
              <li>
                <a href="/contact" className="text-decoration-none text-light">
                  Contact
                </a>
              </li>
            </ul>

            {/* Vertical nav for mobile */}
            <ul className="list-unstyled d-md-none">
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-decoration-none text-light">
                  About
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-decoration-none text-light">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/products" className="text-decoration-none text-light">
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/infrastructure"
                  className="text-decoration-none text-light"
                >
                  Infrastructure
                </a>
              </li>
              <li>
                <a href="/contact" className="text-decoration-none text-light">
                  Contact
                </a>
              </li>
            </ul>
          </Col>
<hr className="d-md-none custom-hr" />
          <Row className=" text-md-start mt-3">
            <Col xs={12} md={4} className="mb-2">
              <p>
                <FaEnvelope className="me-2" />  info@coirindustry.com
              </p>
            </Col>
            <Col xs={12} md={4} className="mb-2">
              <p>
                <FaPhoneAlt className="me-2" />  +91 98765 43210
              </p>
            </Col>
            <Col xs={12} md={4} className="mb-2">
              <p>
                <FaMapMarkerAlt className="me-2" /> Coimbatore, Tamil Nadu,
                India
              </p>
            </Col>
          </Row>
        </Row>

        <hr className="border-light" />
        <p className="text-center custom-rights">
          &copy; {new Date().getFullYear()} Coir Industry. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
