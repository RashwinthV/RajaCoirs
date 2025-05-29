import React, { useState } from "react";
import {Dropdown,
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    subscribe: false,
  });
 const navigate=useNavigate()
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password validation state
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 6 && password.length <= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[\W_]/.test(password),
    };
    setPasswordValid(validations);

    const strength = Object.values(validations).filter(Boolean).length * 20; // 0 to 100 scale
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: val });

    if (name === "password") {
      validatePassword(val);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();


  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/newuser/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Registration successful!");
      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        subscribe: false,
      });
      navigate("/login")
    } else {
      toast.error(data.message || "Registration failed!");
    }
  } catch (error) {
    toast.error("Network or server error!");
    console.error(error);
  }
};


  return (
    <Container className="register-container p-3 rounded mt-5 shadow-sm mb-5 ">
      <h2 className="text-center mb-4 text-success">Create an Account</h2>
      {submitted && <Alert variant="success">Registered successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Password Field with Eye Icon and Validation */}
        <Form.Group controlId="password" className="mb-3 position-relative">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "40px",
              cursor: "pointer",
              color: "#6c757d",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <ProgressBar
            now={passwordStrength}
            variant={
              passwordStrength < 40
                ? "danger"
                : passwordStrength < 80
                ? "warning"
                : "success"
            }
            className="mt-2"
          />
          <div className="mt-2 small">
            <div style={{ color: passwordValid.length ? "green" : "red" }}>
              • 6-12 characters
            </div>
            <div style={{ color: passwordValid.uppercase ? "green" : "red" }}>
              • At least one uppercase letter
            </div>
            <div style={{ color: passwordValid.lowercase ? "green" : "red" }}>
              • At least one lowercase letter
            </div>
            <div style={{ color: passwordValid.number ? "green" : "red" }}>
              • At least one number
            </div>
            <div style={{ color: passwordValid.symbol ? "green" : "red" }}>
              • At least one special character
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="phone" className="mb-3">
          <Form.Label>Phone Number *</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dateOfBirth" className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />
        </Form.Group>

       <Form.Group controlId="gender" className="mb-3">
  <Form.Label>Gender</Form.Label>
  <Dropdown>
    <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
      {form.gender || "Select Gender"}
    </Dropdown.Toggle>

    <Dropdown.Menu className="w-100">
      {["Male", "Female", "Other"].map((option) => (
        <Dropdown.Item
          key={option}
          onClick={() => setForm({ ...form, gender: option })}
        >
          {option}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
</Form.Group>


        <Form.Group controlId="subscribe" className="mb-4">
          <Form.Check
            type="checkbox"
            name="subscribe"
            checked={form.subscribe}
            onChange={handleChange}
            label="Subscribe to our newsletter"
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;