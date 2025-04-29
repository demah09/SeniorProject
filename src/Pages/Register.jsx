import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Register.css";
import HelpButton from "../Components/HelpButton";
import translations from "../i18n/translations";
import LanguageToggle from "../Components/LanguageToggle";
import * as faceapi from "face-api.js";

const Register = ({ lang, onLanguageChange }) => {
  const navigate = useNavigate();
  const t = translations[lang] || translations.en;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [captureStatus, setCaptureStatus] = useState("No face captured yet");
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

  useEffect(() => {
    const loadModelsAndStartCamera = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.getElementById('video-feed');
      video.srcObject = stream;
      video.play();

      const canvas = document.getElementById('overlay');
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      video.addEventListener('play', () => {
        const interval = setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }, 100);

        return () => clearInterval(interval);
      });
    };

    loadModelsAndStartCamera();
  }, []);

  const captureFace = async () => {
    const video = document.getElementById('video-feed');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    const detection = await faceapi.detectSingleFace(canvas).withFaceLandmarks().withFaceDescriptor();
    if (detection) {
      setFaceDescriptor(Array.from(detection.descriptor));
      setCaptureStatus("Face captured successfully!");
    } else {
      setCaptureStatus("No face detected, try again!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!faceDescriptor) {
      setError("Please capture your face first!");
      return;
    }

    try {
      await axios.post("https://seniorproject-uq3g.onrender.com/api/register", {
        ...formData,
        faceDescriptor,
      });
      setSuccess(t.successMsg); 

      localStorage.removeItem("Email");
      localStorage.removeItem("FirstName");
      localStorage.removeItem("FacialId");
      


      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(t.failMsg);
    }
  };

  return (
    <>
      <LanguageToggle onLanguageChange={onLanguageChange} />
      <div className="register-container">
        <HelpButton lang={lang} />
        <h2>{t.registerHeading}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t.idIqama}</label>
            <input type="text" name="ID_Iqama" value={formData.ID_Iqama} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t.firstName}</label>
              <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t.secondName}</label>
              <input type="text" name="SecondName" value={formData.SecondName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>{t.lastName}</label>
              <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>{t.dob}</label>
            <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t.email}</label>
              <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t.phone}</label>
              <input type="tel" name="Phone_No" value={formData.Phone_No} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t.emergencyContact}</label>
              <input type="tel" name="Emergency_Contact" value={formData.Emergency_Contact} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
              <label>{t.gender}</label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                required
                className="gender-select"
              >
                <option value="" disabled>Select Gender</option>
                <option value="F">{t.female}</option>
                <option value="M">{t.male}</option>
              </select>
            </div>



          {/* Face Capture Section */}
          <div className="capture-section">
            <div style={{ position: "relative", width: "320px", height: "240px" }}>
              <video
                id="video-feed"
                width="320"
                height="240"
                autoPlay
                muted
                ref={videoRef}
                style={{ position: "absolute", top: 0, left: 0, borderRadius: "12px", border: "1px solid black" }}
              />
              <canvas
                id="overlay"
                width="320"
                height="240"
                ref={canvasRef}
                style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
              />
            </div>

            <button type="button" onClick={captureFace} className="capture-button">Capture Face</button>
            <p>{captureStatus}</p>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="next-button">{t.register}</button>
        </form>
      </div>
    </>
  );
};

export default Register;
