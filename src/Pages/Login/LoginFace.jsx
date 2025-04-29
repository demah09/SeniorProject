import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/LoginFace.css";
import * as faceapi from "face-api.js";

const LoginFace = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("Please look at the camera...");
  const [loading, setLoading] = useState(true);

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

      // ✅ Only start scanning when video is playing
      video.addEventListener('playing', async () => {
        const canvas = document.getElementById('overlay');
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const interval = setInterval(async () => {
          // ✅ Check if still inside /login/face-recognition before scanning
          if (!window.location.pathname.includes("/login/face-recognition")) {
            clearInterval(interval); // Stop scanning if user navigated away
            return;
          }

          const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);

          if (detections.length > 0) {
            const descriptor = Array.from(detections[0].descriptor);
            try {
              const response = await axios.post("https://seniorproject-uq3g.onrender.com/api/facial-login", { descriptor });

              if (response.status === 200 && response.data && response.data.Email) {
                localStorage.setItem("Email", response.data.Email);
                localStorage.setItem("FirstName", response.data.FirstName || "");

                setMessage("Face recognized! Redirecting to Email...");
                clearInterval(interval); //Stop scanning immediately

                setTimeout(() => {
                  navigate("/login/email");
                }, 1500);
              }
            } catch (error) {
              console.error("Error during face login:", error);
              setMessage("Face not recognized. Please try again.");
            }
          }
        }, 1500);

        //Clean up interval properly when component unmounts
        return () => clearInterval(interval);
      });
    };

    loadModelsAndStartCamera();
  }, [navigate]);

  return (
    <div className="face-login-container">
      <h2>Face Recognition Login</h2>

      <div className="video-wrapper">
        <video id="video-feed" autoPlay muted ref={videoRef} />
        <canvas id="overlay" ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }} />
      </div>

      <p>{message}</p>

      {loading && <div className="spinner"></div>}
    </div>
  );
};

export default LoginFace;
