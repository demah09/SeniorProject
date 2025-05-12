import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ProfileCard from "../../Components/ProfileCard";
import "../../Styles/SelectClinic.css"; // Reused for layout & buttons
import HelpButton from "../../Components/HelpButton";
import translations from "../../i18n/translations";


const SelectDateTime = ({ lang, onLanguageChange }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const t = translations[lang] || translations.en;

  const FileNo = localStorage.getItem("FileNo");
  const Doc_ID = localStorage.getItem("Doctor_ID");
  const Clinic_ID = localStorage.getItem("Clinic_ID");

  const allTimeSlots = [
    "08:00:00", "09:00:00", "10:00:00", "11:00:00",
    "12:00:00" , "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00"
  ];

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate || !Doc_ID) return;

      const dateStr = selectedDate.toISOString().split("T")[0];

      try {
        const res = await axios.get("https://seniorproject-uq3g.onrender.com/api/booked-timeslots", {
          params: { doctor: Doc_ID, date: dateStr }
        });
        setBookedSlots(res.data);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, Doc_ID]);

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    if (!FileNo || !Doc_ID || !Clinic_ID) {
      alert("Missing doctor, clinic, or patient info in localStorage.");
      return;
    }

    const dateString = new Date(selectedDate).toISOString().split("T")[0];
    const datetime = `${dateString} ${selectedTime}`;

    try {
      await axios.post("https://seniorproject-uq3g.onrender.com/api/appointments", {
        FileNo,
        Doc_ID,
        Clinic_ID,
        datetime,
      });

      navigate("/success", {
        state: { message: "Appointment Booked" },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("This time slot has already been booked. Please choose another.");
      } else {
        console.error("Booking failed:", error);
        alert("Booking failed");
      }
    }
  };

  return (
    <div className="clinic-container">
      <ProfileCard
      lang={lang}
      onLanguageChange={onLanguageChange}
      />
      <HelpButton lang={lang}/>

      
      <div className="datetime-layout">
        {/* Calendar Box */}
        <div className="calendar-box">
          <h3 style={{ color: "#fff", marginBottom: "10px", textAlign: "center" }}>
            {t.Sdate}
          </h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
          />
        </div>

        {/* Time Slot Box */}
        <div className="timeslot-box">
          <h3 style={{ color: "#fff", marginBottom: "10px", textAlign: "center" }}>
          {selectedDate
            ? `${t.StimeFor} ${selectedDate.toDateString()}`
            : t.Stime}

          </h3>

          <div className="time-slot-scroll">
                        {allTimeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const now = new Date();
                let isPast = false;

                if (selectedDate) {
                  const selected = new Date(selectedDate);
                  const [hours, minutes, seconds] = slot.split(":").map(Number);
                  selected.setHours(hours, minutes, seconds, 0);

                  if (
                    selected.toDateString() === now.toDateString() &&
                    selected < now
                  ) {
                    isPast = true;
                  }
                }

                const disabled = isBooked || isPast;
                let reason = "";

                if (isPast) {
                  reason = "Time has already passed.";
                } else if (isBooked) {
                  reason = "Time slot already booked.";
                }

                return (
                  <div key={slot} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <button
                      disabled={disabled}
                      onClick={() => setSelectedTime(slot)}
                      className="clinic-button"
                      style={{
                        backgroundColor: selectedTime === slot
                          ? "#a9c8f3"
                          : disabled
                          ? "#ccc"
                          : undefined,
                        cursor: disabled ? "not-allowed" : "pointer",
                        color: disabled ? "#666" : "#000",
                        width: "200px",
                      }}
                      title={reason}
                    >
                      {slot}
                    </button>
                    {disabled && (
                      <p style={{ fontSize: "0.8rem", color: "#ffcc00", marginTop: "5px", textAlign: "center" }}>
                        {reason}
                      </p>
                    )}
                  </div>
                );
              })}


          </div>
        </div>
      </div>

      {/* Book Button */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button
          className="clinic-button"
          onClick={handleBook}
          style={{ padding: "12px 30px", fontWeight: "bold" }}
        >
          {t.Book}
        </button>
      </div>
    </div>
  );
};

export default SelectDateTime;
