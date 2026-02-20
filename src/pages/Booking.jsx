import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

import {
  FaBuilding,
  FaMusic,
  FaUtensils,
  FaPalette,
  FaMagic,
  FaCalendarAlt,
  FaWallet,
  FaTheaterMasks,
  FaMapMarkerAlt,
  FaRobot,
} from "react-icons/fa";

export default function Booking() {
  const navigate = useNavigate();

  const handleComboClick = () => {
    const event = prompt("✨ What kind of event are you planning?");
    if (event) alert(`🎉 Creating a ${event} combo for you!`);
    navigate("/combo");
  };

  return (
    <>
      {/* ✅ BACKGROUND (ONLY ONCE) */}
      <AnimatedBackground />

      <div className="booking">

        {/* 🔙 BACK */}
        <button className="back-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="title">Book Your Event</h1>
        <p className="subtitle">Everything you need in one place</p>

        <div className="cards">

          <div className="card combo" onClick={handleComboClick}>
            <div className="icon-box"><FaMagic /></div>
            <h2>All-in-One Combo</h2>
            <p>Smart package with all services</p>
          </div>

          <div className="card" onClick={() => navigate("/planner")}>
            <div className="icon-box"><FaCalendarAlt /></div>
            <h2>Event Planner</h2>
            <p>Plan step-by-step with date & guests</p>
          </div>

          <div className="card" onClick={() => navigate("/ai")}>
            <div className="icon-box"><FaRobot /></div>
            <h2>AI Assistant</h2>
            <p>Get smart event suggestions instantly</p>
          </div>

          <div className="card" onClick={() => navigate("/budget")}>
            <div className="icon-box"><FaWallet /></div>
            <h2>Budget Planner</h2>
            <p>Plan events within your budget</p>
          </div>

          <div className="card" onClick={() => navigate("/theme")}>
            <div className="icon-box"><FaTheaterMasks /></div>
            <h2>Theme Generator</h2>
            <p>Discover trending event themes</p>
          </div>

          <div className="card" onClick={() => navigate("/venues")}>
            <div className="icon-box"><FaMapMarkerAlt /></div>
            <h2>Nearby Venues</h2>
            <p>Find top places near you</p>
          </div>

          <div className="card" onClick={() => navigate("/hall")}>
            <div className="icon-box"><FaBuilding /></div>
            <h2>Hall Booking</h2>
            <p>Luxury halls for all events</p>
          </div>

          <div className="card" onClick={() => navigate("/music")}>
            <div className="icon-box"><FaMusic /></div>
            <h2>Music & DJ</h2>
            <p>Top DJs & live performances</p>
          </div>

          <div className="card" onClick={() => navigate("/catering")}>
            <div className="icon-box"><FaUtensils /></div>
            <h2>Catering</h2>
            <p>Premium food experience</p>
          </div>

          <div className="card" onClick={() => navigate("/decor")}>
            <div className="icon-box"><FaPalette /></div>
            <h2>Decorations</h2>
            <p>Beautiful themes & styling</p>
          </div>

        </div>

        <style>{`
          :root {
            --black: #06060b;
            --violet-dark: #120b2e;
            --violet-mid: #2b1b55;
            --gold: #f5c77a;
            --text-main: #f5f3ff;
            --text-muted: #b9b1da;
          }

          .booking {
            position: relative;
            z-index: 1;
            min-height: 100vh;
            padding: 100px 15px 40px;
            text-align: center;
            background: transparent;
            color: var(--text-main);
          }

          .back-btn {
            position: fixed;
            top: 45px;
            left: 20px;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            padding: 10px 16px;
            border-radius: 999px;
            cursor: pointer;
          }

          .title {
            font-family: "Playfair Display", serif;
            font-size: clamp(1.8rem, 5vw, 2.5rem);
            background: linear-gradient(135deg, var(--gold), #fff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .subtitle {
            color: var(--text-muted);
            margin-bottom: 30px;
            font-size: 0.9rem;
          }

          .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 15px;
            max-width: 1100px;
            margin: auto;
          }

          .card {
            padding: 20px 15px;
            border-radius: 18px;
            background: linear-gradient(135deg, #2b1b55, #120b2e);
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.05);
            backdrop-filter: blur(12px);
          }

          .card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 8px 25px rgba(0,0,0,0.4);
          }

          .icon-box {
            width: 45px;
            height: 45px;
            margin: 0 auto 10px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(245,199,122,0.1);
            color: var(--gold);
            font-size: 18px;
          }

          .card h2 {
            color: var(--gold);
            font-size: 1rem;
            margin-bottom: 6px;
          }

          .card p {
            font-size: 0.75rem;
            color: var(--text-muted);
          }

          .combo {
            border: 1px solid rgba(245,199,122,0.4);
            box-shadow: 0 0 15px rgba(245,199,122,0.2);
          }

          .combo:hover {
            box-shadow: 0 0 30px rgba(245,199,122,0.6);
          }
        `}</style>

      </div>
    </>
  );
}
