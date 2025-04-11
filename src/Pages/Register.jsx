import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ID_Iqama: "",
    FirstName: "",
    SecondName: "",
    LastName: "",
    DOB: "",
    Email: "",
    Phone_No: "",
    Emergency_Contact: "",
    Gender: "F",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5001/api/register", formData);
      setSuccess("Registration successful!");
      navigate("/login/face-recognition");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Please Fill All Required Fields</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID / Iqama</label>
          <input type="text" name="ID_Iqama" value={formData.ID_Iqama} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Second Name</label>
            <input type="text" name="SecondName" value={formData.SecondName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="Phone_No" value={formData.Phone_No} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Emergency Contact</label>
            <input type="tel" name="Emergency_Contact" value={formData.Emergency_Contact} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <div className="gender-option">
              <input type="radio" name="Gender" value="F" checked={formData.Gender === "F"} onChange={handleChange} />
              <label>Female</label>
            </div>
            <div className="gender-option">
              <input type="radio" name="Gender" value="M" checked={formData.Gender === "M"} onChange={handleChange} />
              <label>Male</label>
            </div>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="next-button">Next</button>
      </form>
    </div>
  );
};

export default Register;
