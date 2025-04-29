import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./Pages/Home"; 
import Register from "./Pages/Register";
import LoginEmail from "./Pages/Login/LoginEmail";
import LoginOtp from "./Pages/Login/LoginOtp";
import LoginFace from "./Pages/Login/LoginFace"; // ✅ Correct file and import!
import Dashboard from "./Pages/Dashboard";
import CheckIn from "./Pages/CheckIn";
import SuccessMessage from "./Components/SuccessMessage";
import ModifyApp from "./Pages/ModifyApp";
import ModifyApp2 from "./Pages/ModifyApp2";
import UpdateInfo from "./Pages/UpdateInfo";
import SelectClinic from "./Pages/BookApp/SelectClinic";
import SelectDoctor from "./Pages/BookApp/SelectDoc";
import SelectDateTime from "./Pages/BookApp/SelectDateTime";

// Language Toggle
import LanguageToggle from "./Components/LanguageToggle";
import translations from "./i18n/translations";

function App() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  return (
    <Router>
      <InnerApp lang={lang} setLang={setLang} />
    </Router>
  );
}

function InnerApp({ lang, setLang }) {
  const location = useLocation();

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      {["/", "/login/email", "/login/otp"].includes(location.pathname) && (
        <LanguageToggle onLanguageChange={setLang} />
      )}

      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/register" element={<Register lang={lang} onLanguageChange={setLang} />} />
        <Route path="/login/email" element={<LoginEmail lang={lang} />} />
        <Route path="/login/otp" element={<LoginOtp lang={lang} />} />
        <Route path="/login/face-recognition" element={<LoginFace lang={lang} />} /> {/* ✅ Corrected */}
        <Route path="/dashboard" element={<Dashboard lang={lang} onLanguageChange={setLang} />} />
        <Route path="/check-in" element={<CheckIn lang={lang} onLanguageChange={setLang} />} />
        <Route path="/modify-app" element={<ModifyApp lang={lang} onLanguageChange={setLang} />} />
        <Route path="/modify-details" element={<ModifyApp2 lang={lang} onLanguageChange={setLang} />} />
        <Route path="/update-info" element={<UpdateInfo lang={lang} onLanguageChange={setLang} />} />
        <Route path="/select-clinic" element={<SelectClinic lang={lang} onLanguageChange={setLang} />} />
        <Route path="/select-doctor" element={<SelectDoctor lang={lang} onLanguageChange={setLang} />} />
        <Route path="/select-datetime" element={<SelectDateTime lang={lang} onLanguageChange={setLang} />} />
        <Route path="/success" element={<SuccessMessage lang={lang} onLanguageChange={setLang} />} />
      </Routes>
    </div>
  );
}

export default App;
