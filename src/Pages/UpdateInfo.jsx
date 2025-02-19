import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/UpdateInfo.css";
import ProfileCard from "../Components/ProfileCard"; 

const UpdateInfo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "12987652",
    firstName: "Demah",
    secondName: "Raid",
    lastName: "Alburaikan",
    dob: "2002-10-20",
    email: "",
    phone: "",
    emergencyContact: "",
    gender: "Female",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigate("/success", { state: { message: "Profile updated successfully!" } });
  };

  return (
    <div className="update-page">
      {/* ✅ Profile Section - Moved outside the update-container */}
      <div className="profile-card-container">
        <ProfileCard name="Demah Raid" id="12987652" gender="Female" />
      </div>

      {/* ✅ Update Form - Now properly aligned below profile */}
      <div className="update-container">
        <form className="update-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>ID / Iqama</label>
            <input type="text" name="id" value={formData.id} readOnly />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} readOnly />
            </div>
            <div className="form-group">
              <label>Second Name</label>
              <input type="text" name="secondName" value={formData.secondName} readOnly />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} readOnly />
            </div>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} readOnly />
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

          

          <button type="submit" className="update-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfo;