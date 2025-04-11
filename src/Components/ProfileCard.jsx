import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSlidersH, FaHome, FaSignOutAlt } from "react-icons/fa";

const ProfileCard = () => {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail"); //Get logged-in email
    if (!email) return;

    axios
      .get(`http://localhost:5001/api/patient/${email}`)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => console.error("Failed to fetch patient:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); //Clear email
    navigate("/"); // Send to homepage 
  };

  const styles = {
    profileCard: {
      width: "100%",
      maxWidth: "100%",
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      borderRadius: "0px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease-in-out",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
    },
    profileInfo: {
      display: "flex",
      alignItems: "center",
    },
    profilePic: {
      fontSize: "60px",
      color: "white",
    },
    profileDetails: {
      marginLeft: "15px",
    },
    profileText: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.8)",
    },
    buttonsContainer: {
      display: "flex",
      gap: "15px",
    },
    buttonStyle: {
      background: "none",
      border: "none",
      fontSize: "22px",
      cursor: "pointer",
      color: "white",
      transition: "transform 0.2s ease-in-out",
    },
  };

  if (!patient) return null;

  return (
    <div style={styles.profileCard}>
      <div style={styles.profileInfo}>
        <FaUserCircle style={styles.profilePic} />
        <div style={styles.profileDetails}>
          <h2>{patient.FirstName} {patient.LastName}</h2>
          <p style={styles.profileText}>ID: {patient.FileNo}</p>
          <p style={styles.profileText}>{patient.Gender === "M" ? "Male" : "Female"}</p>
        </div>
      </div>

      <div style={styles.buttonsContainer}>
        <button
          style={styles.buttonStyle}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          onClick={() => navigate("/dashboard")}
        >
          <FaHome />
        </button>

        <button
          style={styles.buttonStyle}
          onMouseOver={(e) => (e.target.style.transform = "rotate(90deg)")}
          onMouseOut={(e) => (e.target.style.transform = "rotate(0deg)")}
          onClick={() => navigate("/update-info")}
        >
          <FaSlidersH />
        </button>

        <button
          style={styles.buttonStyle}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
