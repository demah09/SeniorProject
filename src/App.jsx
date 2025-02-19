import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; 
import Register from "./Pages/Register";
import LoginEmail from "./Pages/Login/LoginEmail";
import LoginOtp from "./Pages/Login/LoginOtp";
import LoginFaceRecognition from "./Pages/Login/LoginFaceRecognition";
import Dashboard from "./Pages/Dashboard";
import CheckIn from "./Pages/CheckIn";
import SuccessMessage from "./Components/SuccessMessage";
import ModifyApp from "./Pages/ModifyApp";
import ModifyApp2 from "./Pages/ModifyApp2";
import UpdateInfo from "./Pages/UpdateInfo";
//adding this comment to test github commits


function App() {
  return (
    <> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>} />
          
          {/* Correct path for login steps */}
          <Route path="/login/email" element={<LoginEmail />} />
          <Route path="/login/otp" element={<LoginOtp />} />
          <Route path="/login/face-recognition" element={<LoginFaceRecognition />} />

          {/* Once user is Logged in */}
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path = "/check-in" element={<CheckIn/>}/>
          <Route path = "/modify-app" element={<ModifyApp/>}/>
          <Route path = "/modify-details" element={<ModifyApp2/>}/>
          <Route path = "/update-info" element={<UpdateInfo/>}/>

          {/* Single Route for All Success Messages */}
        <Route path="/success" element={<SuccessMessage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
