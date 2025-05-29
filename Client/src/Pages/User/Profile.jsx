import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Spinner,
  Row,
  Col,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const email = JSON.parse(localStorage.getItem("user"))?.email;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/v1/user/profile/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setEditableUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile.");
        setLoading(false);
      });
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setEditableUser((prev) => ({ ...prev, [name]: val }));
  };

  const handleSave = () => {
    setSaving(true);
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/v1/user/Update-profile`, editableUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setEditableUser(res.data);
        setSaving(false);
        setEditMode(false);
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update profile.");
        setSaving(false);
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("loginChange"));
    navigate("/");
  };

  const handleVerifyEmail = () => {
    setShowOtpModal(true);
  };

  const handleOtpSubmit = () => {
    setOtpSubmitting(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/v1/user/verify-otp`, {
        email: editableUser.email,
        otp,
      })
      .then((res) => {
        setShowOtpModal(false);
        setOtp("");
        setUser({ ...user, emailVerified: true });
        setEditableUser({ ...editableUser, emailVerified: true });
        toast.success("Email verified successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid or expired OTP.");
      })
      .finally(() => setOtpSubmitting(false));
  };

  const handleGenderSelect = (gender) => {
    setEditableUser((prev) => ({ ...prev, gender }));
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container profile-con mb-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Profile</h2>
        <div className="d-flex gap-3">
          {!editMode && (
            <Button variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
              <BsPencilSquare /> Edit
            </Button>
          )}
          <Button variant="outline-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </Button>
        </div>
      </div>

      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="firstName"
                  value={editableUser.firstName || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="form-control-plaintext">{editableUser.firstName || "-"}</div>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="lastName"
                  value={editableUser.lastName || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="form-control-plaintext">{editableUser.lastName || "-"}</div>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>{" "}
          <Form.Text muted className="mx-4">
            Verified: {editableUser.emailVerified ? "Yes" : "No"}
          </Form.Text>
          {!editableUser.emailVerified && (
            <Button variant="warning" size="sm" className="ms-2 mb-1" onClick={handleVerifyEmail}>
              Verify Email
            </Button>
          )}
<div className="form-control-plaintext">{editableUser.email || "-"}</div>        </Form.Group>

        <Form.Group controlId="phone" className="mt-3">
          <Form.Label>Phone</Form.Label>
          {editMode ? (
            <Form.Control
              type="text"
              name="phone"
              value={editableUser.phone || ""}
              onChange={handleChange}
            />
          ) : (
            <div className="form-control-plaintext">{editableUser.phone || "-"}</div>
          )}
        </Form.Group>

        <Form.Group controlId="dateOfBirth" className="mt-3">
          <Form.Label>Date of Birth</Form.Label>
          {editMode ? (
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={editableUser.dateOfBirth?.split("T")[0] || ""}
              onChange={handleChange}
            />
          ) : (
            <div className="form-control-plaintext">
              {editableUser.dateOfBirth?.split("T")[0] || "-"}
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="gender" className="mt-3">
          <Form.Label>Gender</Form.Label>
          {editMode ? (
            <Dropdown onSelect={handleGenderSelect}>
              <Dropdown.Toggle variant="secondary" id="dropdown-gender">
                {editableUser.gender || "Select Gender"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="form-control-plaintext">{editableUser.gender || "-"}</div>
          )}
        </Form.Group>

        <Form.Group controlId="newsletter" className="mt-3">
          {editMode ? (
            <Form.Check
              type="checkbox"
              label="Subscribe to Newsletter"
              name="isSubscribedToNewsletter"
              checked={editableUser.isSubscribedToNewsletter || false}
              onChange={handleChange}
            />
          ) : (
            <Form.Label>
              Newsletter Subscription:{" "}
              {editableUser.isSubscribedToNewsletter ? "Yes" : "No"}
            </Form.Label>
          )}
        </Form.Group>

        {editMode && (
          <div className="d-flex justify-content-between mt-4">
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setEditableUser(user);
                setEditMode(false);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </Form>

      {/* OTP Modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Email Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter the 6-digit OTP sent to your email.</p>
          <Form.Control
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOtpSubmit} disabled={otpSubmitting}>
            {otpSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
