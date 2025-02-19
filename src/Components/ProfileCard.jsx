import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSlidersH, FaHome, FaSignOutAlt } from "react-icons/fa"; //Import Icons

const ProfileCard = ({ name, id, gender }) => {
  const navigate = useNavigate(); 

  //Function to navigate to the Update Info page
  const handleSettingsClick = () => {
    navigate("/update-info");
  };

  // Function to navigate to dashboard page
  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  //Function to navigate to Home.jsx (Logout)
  const handleLogoutClick = () => {
    navigate("/"); //  Redirect to Home page
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

  return (
    <div style={styles.profileCard}>
      <div style={styles.profileInfo}>
        <FaUserCircle style={styles.profilePic} />
        <div style={styles.profileDetails}>
          <h2>{name}</h2> 
          <p style={styles.profileText}>ID: {id}</p>
          <p style={styles.profileText}>{gender}</p>
        </div>
      </div>

      {/* Buttons Container (Home, Settings, Logout) */}
      <div style={styles.buttonsContainer}>
        {/* Home Button */}
        <button
          style={styles.buttonStyle}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          onClick={handleHomeClick} 
        >
          <FaHome />
        </button>

        {/* Settings Button */}
        <button
          style={styles.buttonStyle}
          onMouseOver={(e) => (e.target.style.transform = "rotate(90deg)")}
          onMouseOut={(e) => (e.target.style.transform = "rotate(0deg)")}
          onClick={handleSettingsClick} 
        >
          <FaSlidersH />
        </button>

        {/* Logout Button */}
        <button
          style={styles.buttonStyle}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          onClick={handleLogoutClick} 
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
