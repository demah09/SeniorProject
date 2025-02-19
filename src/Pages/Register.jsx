import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    secondName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    emergencyContact: "",
    gender: "Female",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login/face-recognition"); 
  };

  return (
    <div className="register-container">
      <h2>Please Fill All Required Fields</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID / Iqama</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Second Name</label>
            <input type="text" name="secondName" value={formData.secondName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Emergency Contact</label>
            <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <div className="gender-option">
              <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
              <label>Female</label>
            </div>
            <div className="gender-option">
              <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
              <label>Male</label>
            </div>
          </div>
        </div>

        <button type="submit" className="next-button">Next</button>
      </form>
    </div>
  );
};

export default Register;