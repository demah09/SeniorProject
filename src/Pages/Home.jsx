import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import { FaChevronRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="welcome-text">WELCOME</h1>
      <div className="buttons-container">
        <button className="home-button" onClick={() => navigate("/Register")}> 
          Register <FaChevronRight className="icon" />
        </button>
        <button className="home-button" onClick={()=>navigate("/login/email")}> Login <FaChevronRight className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Home;