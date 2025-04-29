import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/UpdateInfo.css";
import ProfileCard from "../Components/ProfileCard";
import HelpButton from "../Components/HelpButton";
import translations from "../i18n/translations";

const UpdateInfo = ({ lang, onLanguageChange }) => {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fileNo: "",
    idIqama: "",
    firstName: "",
    secondName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    emergencyContact: "",
    gender: "",
  });

  const loggedInEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://seniorproject-uq3g.onrender.com/api/patient/${loggedInEmail}`);
        const data = response.data;
        setFormData({
          fileNo: data.FileNo,
          idIqama: data.ID_Iqama,
          firstName: data.FirstName,
          secondName: data.SecondName,
          lastName: data.LastName,
          dob: data.DOB,
          email: data.Email,
          phone: data.PhoneNumber || "",
          emergencyContact: data.EmergencyContact || "",
          gender: data.Gender,
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchUserData();
  }, [loggedInEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://seniorproject-uq3g.onrender.com/api/patient/${loggedInEmail}`, {
        email: formData.email,
        phone: formData.phone,
        emergency_contact: formData.emergencyContact,
      });
      navigate("/success", { state: { message: "Profile updated successfully!" } });
    } catch (error) {
      console.error("Error updating patient info:", error);
    }
  };

  return (
    <div className="update-page">
      <div className="profile-card-container">
        <ProfileCard name={`${formData.firstName} ${formData.secondName}`} id={formData.idIqama} gender={formData.gender} lang={lang}
      onLanguageChange={onLanguageChange}/>
        <HelpButton lang={lang}/>
      </div>

      <div className="update-container">
        <form className="update-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>{t.idIqama}</label>
            <input type="text" name="idIqama" value={formData.idIqama} readOnly />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t.firstName}</label>
              <input type="text" name="firstName" value={formData.firstName} readOnly />
            </div>
            <div className="form-group">
              <label>{t.secondName}</label>
              <input type="text" name="secondName" value={formData.secondName} readOnly />
            </div>
            <div className="form-group">
              <label>{t.lastName}</label>
              <input type="text" name="lastName" value={formData.lastName} readOnly />
            </div>
          </div>

          <div className="form-group">
            <label>{t.dob}</label>
            <input type="date" name="dob" value={formData.dob} readOnly />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t.email}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t.phone} </label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t.emergencyContact} </label>
              <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="update-button">{t.update}</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfo;
