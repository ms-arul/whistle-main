import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { ArrowLeft } from "lucide-react";

import {
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaLightbulb,
} from "react-icons/fa";

import { MdCelebration } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

export default function PlannerPage() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [guests, setGuests] = useState(50);
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [venue, setVenue] = useState("");
  const [notes, setNotes] = useState("");
  const [showModal, setShowModal] = useState(false);

  const estimatedBudget = guests * 800;

  const getSuggestion = () => {
    if (!type) return "Select event type to unlock smart ideas";

    if (type.includes("Wedding"))
      return "Beach resort, luxury decor, live music";
    if (type.includes("Birthday"))
      return "Theme party, DJ, cake stage";
    if (type.includes("Corporate"))
      return "Conference hall, formal catering";
    if (type.includes("Party"))
      return "Lounge venue, DJ, lighting";

    return "Custom setup with flexible venue";
  };

  const venues = [
    "Beach Resort",
    "Luxury Hall",
    "Garden Venue",
    "Banquet Hall",
    "Farmhouse",
  ];

  const handleSubmit = () => {
    if (!type) {
      alert("Please select event type");
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <main className="planner">

        {/* 🔙 BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={18} />
          Back
        </button>

        {/* TITLE */}
        <h1 className="title">
          <HiSparkles /> Smart Event Planner
        </h1>

        {/* GRID */}
        <div className="grid">

          {/* LEFT */}
          <div className="section">
            <label><FaCalendarAlt /> Event Date</label>
            <Calendar onChange={setDate} value={date} />

            <label><MdCelebration /> Event Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Choose event</option>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Corporate</option>
              <option>Party</option>
            </select>
          </div>

          {/* RIGHT */}
          <div className="section">
            <label><FaUsers /> Guests: {guests}</label>
            <input
              type="range"
              min="10"
              max="500"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />

            <label><FaRupeeSign /> Budget</label>
            <input
              type="number"
              placeholder={`₹${estimatedBudget}`}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

            <label><FaMapMarkerAlt /> Venue</label>
            <select value={venue} onChange={(e) => setVenue(e.target.value)}>
              <option value="">Choose venue</option>
              {venues.map((v, i) => (
                <option key={i}>{v}</option>
              ))}
            </select>

            <textarea
              placeholder="Additional requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* AI Suggestions */}
            <div className="ai-box">
              <FaLightbulb />
              <p>{getSuggestion()}</p>
            </div>

            <button className="plan-btn" onClick={handleSubmit}>
              <HiSparkles /> Plan Event
            </button>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <IoClose className="close" onClick={() => setShowModal(false)} />

            <h2><MdCelebration /> Event Summary</h2>

            <div className="summary">
              <p><FaCalendarAlt /> {date.toDateString()}</p>
              <p><MdCelebration /> {type}</p>
              <p><FaUsers /> {guests} Guests</p>
              <p><FaRupeeSign /> ₹{budget || estimatedBudget}</p>
              <p><FaMapMarkerAlt /> {venue || "Not selected"}</p>
              <p>{notes || "No notes added"}</p>
            </div>

            <button className="done-btn" onClick={() => setShowModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --bg: #06060b;
          --violet: #2b1b55;
          --gold: #f5c77a;
          --text: #f5f3ff;
          --muted: #b9b1da;
        }

        .planner {
          min-height: 100vh;
          padding: 80px 20px 30px;
          background: linear-gradient(180deg, var(--violet), var(--bg));
          color: var(--text);
        }

        /* BACK BUTTON */
        .back-btn {
          position: fixed;
          top: 15px;
          left: 15px;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
        }

        .title {
          text-align: center;
          margin-bottom: 25px;
          font-size: 1.8rem;
          color: var(--gold);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--muted);
        }

        input, select, textarea {
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: rgba(255,255,255,0.07);
          color: white;
        }

        textarea {
          height: 80px;
        }

        input[type="range"] {
          accent-color: #f5c77a;
        }

        .ai-box {
          display: flex;
          gap: 10px;
          background: rgba(245,199,122,0.1);
          padding: 10px;
          border-radius: 12px;
          color: var(--gold);
          align-items: center;
        }

        .plan-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
          padding: 14px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #f5c77a, #f8d99b);
          cursor: pointer;
          font-weight: 600;
        }

        /* MODAL */
        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-box {
          background: #111;
          padding: 25px;
          border-radius: 20px;
          width: 300px;
          position: relative;
          text-align: center;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          color: var(--gold);
        }

        .summary p {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px 0;
        }

        .done-btn {
          margin-top: 10px;
          padding: 10px 20px;
          border-radius: 999px;
          border: none;
          background: var(--gold);
          cursor: pointer;
        }

        @media(max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
