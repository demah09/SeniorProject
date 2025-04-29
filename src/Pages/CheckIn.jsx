import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../Components/ProfileCard";
import "../Styles/CheckIn.css";
import HelpButton from "../Components/HelpButton";
import translations from "../i18n/translations";

const CheckIn = ({ lang, onLanguageChange }) => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const fileNo = localStorage.getItem("FileNo");
    if (!fileNo) return;

    axios
      .get(`https://seniorproject-uq3g.onrender.com/api/appointments/${fileNo}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const handleCheckIn = (apptId) => {
    axios
      .put(`https://seniorproject-uq3g.onrender.com/api/appointment/${apptId}`, {
        status: "Checked In",
      })
      .then(() => {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.Appt_ID === apptId ? { ...appt, Status: "Checked In" } : appt
          )
        );
      })
      .catch((err) => console.error("Check-in failed:", err));
  };

  const isCheckInAllowed = (apptTime, status) => {
    if (status === "Checked In") return false;
    const now = new Date();
    const apptDate = new Date(apptTime);
    const diffMs = apptDate - now;
    return diffMs > 0 && diffMs <= 60 * 60 * 1000; // within 1 hour
  };

  return (
    <div className="check-in-container">
      <ProfileCard lang={lang} onLanguageChange={onLanguageChange} />
      <HelpButton lang={lang} />

      <div className="appointments-container">
        {appointments.length === 0 ? (
          <p className="no-appointments">{t.NoApp}</p>
        ) : (
          <>
            <p className="notice-banner">
              Note: You can only check in starting 1 hour before your appointment.
            </p>

            {appointments.map((appt) => {
              const apptTime = new Date(appt.DOA);
              const canCheckIn = isCheckInAllowed(apptTime, appt.Status);

              return (
                <div key={appt.Appt_ID} className="appointment-card">
                  <h3>Clinic Location</h3>
                  <p>
                    {appt.ClinicName} Department, {appt.Floor} Floor, Room{" "}
                    {appt.Office}
                  </p>

                  <h3>Appointment Date and Time</h3>
                  <p>{apptTime.toLocaleString()}</p>

                  <h3>Doctor Name and Speciality</h3>
                  <p>
                    {appt.Name}, {appt.Specialization}
                  </p>

                  {appt.Status === "Checked In" ? (
                    <div className="checked-in-badge">✔ Checked In</div>
                  ) : (
                    <div className="button-container">
                      <button
                        className="check-in-button"
                        disabled={!canCheckIn}
                        title={
                          !canCheckIn
                            ? "Check-in is allowed only 1 hour before your appointment"
                            : ""
                        }
                        onClick={() => handleCheckIn(appt.Appt_ID)}
                      >
                        Check-in
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
