import React from "react";
import {useNavigate} from "react-router-dom";

const ModifyBtn = () => {
  const navigate = useNavigate();

  const styles = {
    modifyButton: {
      backgroundColor: "#356abf",
      color: "white",
      padding: "12px 24px",
      borderRadius: "25px",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s ease-in-out",
    },
  };

  const handleClick = () => {
    navigate("/modify-details");
  };

  return (
    <div>
      <button
        style={styles.modifyButton}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1f4d99")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#356abf")}
        onClick={handleClick}
      >
        Modify
      </button>
    </div>
  );
};

export default ModifyBtn;