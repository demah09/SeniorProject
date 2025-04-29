import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import { FaChevronRight } from "react-icons/fa";
import HelpButton from "../Components/HelpButton";
import translations from "../i18n/translations";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AdCarousel from "../Components/AdCarousel";

const Home = ({ lang }) => {
  const navigate = useNavigate();
  const t = translations[lang] || translations.en;

  return (
    <div className="home-container">
      <HelpButton lang={lang} />

      <h1 className="welcome-text">{t.welcome}</h1>

      <div className="buttons-container">
        <button className="home-button" onClick={() => navigate("/register")}>
          {t.register} <FaChevronRight className="icon" />
        </button>
        <button className="home-button" onClick={() => navigate("/login/face-recognition")}>
          {t.login} <FaChevronRight className="icon" />
        </button>
      </div>

      <div className="carousel-wrapper">
        <AdCarousel lang={lang} />
      </div>
    </div>
  );
};

export default Home;
