// src/Components/AdCarousel.jsx
import React, { useEffect, useState } from "react";
import "../Styles/AdCarousel.css";
import fluShot from "../assets/flu-shot.png";
import doctorWelcome from "../assets/welcome-doctor.png";
import bloodDonation from "../assets/blood-donation.png";
import translations from "../i18n/translations";
const images = [fluShot, doctorWelcome, bloodDonation];

const AdCarousel = ({ lang }) => {
  const [current, setCurrent] = useState(0);
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-full-container">
      <p className="carousel-title"> {t.ann}</p>
      <div className="carousel-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`carousel-image ${index === current ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span key={index} className={`dot ${index === current ? "active" : ""}`}></span>
        ))}
      </div>
    </div>
  );
};

export default AdCarousel;
