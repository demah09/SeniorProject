import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      try {
        console.log("Loading ssdMobilenetv1...");
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);

        console.log("Loading faceLandmark68Net...");
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

        console.log("Loading faceRecognitionNet...");
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

        console.log("All models loaded");

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus("Camera ready. Please click 'Capture Face'.");
      } catch (err) {
        console.error("Error loading models or accessing camera:", err);
        setStatus("Camera or model load error.");
      }
    };

    loadModels();
  }, []);

  const captureFace = async () => {
    if (!videoRef.current) return;

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection?.descriptor) {
      const descriptorArray = Array.from(detection.descriptor);
      onCapture(descriptorArray);
      setStatus("Face captured successfully.");
    } else {
      setStatus("No face detected. Try again.");
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="300" height="250" />
      <br />
      <button type="button" onClick={captureFace}>
        Capture Face
      </button>
      <p>{status}</p>
    </div>
  );
};

export default FaceRecognition;
