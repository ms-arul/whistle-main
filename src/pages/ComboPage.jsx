import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaMagic,
  FaCalendarCheck,
  FaUtensils,
  FaMusic,
  FaPalette,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import AnimatedBackground from "../components/AnimatedBackground";

export default function ComboPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(false);

    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <>
      {/* 🔥 BACKGROUND */}
      <AnimatedBackground />

      <main className="page">

        {/* 🔙 BACK BUTTON */}
        <div className="top-bar">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>

        {/* 💎 CARD */}
        <section className="container">

          <h1 className="title">
            AI Combo
           
          </h1>

          <p className="subtitle">
            Designed for Life’s <span>Biggest Moments</span>
          </p>

          {/* FEATURES */}
          <div className="features">
            <div className="feature">
              <FaCalendarCheck />
              <span>Venue & Date</span>
            </div>
            <div className="feature">
              <FaUtensils />
              <span>Catering</span>
            </div>
            <div className="feature">
              <FaMusic />
              <span>Entertainment</span>
            </div>
            <div className="feature">
              <FaPalette />
              <span>Decoration</span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            className="primary-btn"
            onClick={handleGenerate}
            disabled={loading}
          >
            <FaMagic />
            <span>{loading ? "Generating..." : "Generate Combo"}</span>
          </button>

          {/* RESULT */}
          {generated && (
            <div className="result">
              <FaCheckCircle />
              <span>Your perfect event combo is ready!</span>
            </div>
          )}

        </section>
      </main>

      <style>{`
        :root {
          --black: #06060b;
          --violet-dark: #120b2e;
          --violet-mid: #2b1b55;
          --gold: #f5c77a;
          --gold-soft: #f8d99b;
          --text-main: #f5f3ff;
          --text-muted: #b9b1da;
        }

        /* PAGE */
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          z-index: 1;
        }

        /* BACK BUTTON */
        .top-bar {
          position: absolute;
          top: 40px;
          left: 25px;
          z-index: 5;
        }

        .top-bar button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          color: var(--gold);
          cursor: pointer;
          transition: 0.3s;
        }

        .top-bar button:hover {
          background: rgba(245,199,122,0.2);
          transform: scale(1.08);
        }

        /* CONTAINER */
        .container {
          max-width: 380px;
          width: 100%;
          padding: 32px 28px;
          border-radius: 24px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.12);
          text-align: center;
          position: relative;
          transform: translateY(-20px);
          animation: fadeUp 0.8s ease;
        }

        /* GLOW EFFECT */
        .container::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          background: radial-gradient(circle, rgba(245,199,122,0.15), transparent 70%);
          z-index: -1;
        }

        /* TITLE */
        .title {
          font-family: "Playfair Display", serif;
          font-size: 2.2rem;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--gold), #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .icon {
          color: var(--gold);
          animation: glow 2s infinite alternate;
        }

        /* SUBTITLE */
        .subtitle {
          font-size: 0.9rem;
          margin-bottom: 25px;
          color: var(--text-muted);
        }

        .subtitle span {
          color: var(--gold);
          font-weight: 600;
        }

        /* FEATURES */
        .features {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 20px 0 25px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          color: var(--text-main);
          padding: 6px 0;
        }

        .feature svg {
          color: var(--gold);
          width: 18px;
        }

        /* BUTTON */
        .primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 30px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, var(--gold), var(--gold-soft));
          color: #2b1c0f;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 0 15px rgba(245,199,122,0.4);
        }

        .primary-btn:hover {
          transform: scale(1.07);
          box-shadow: 0 0 30px rgba(245,199,122,0.8);
        }

        .primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* RESULT */
        .result {
          margin-top: 18px;
          padding: 14px;
          border-radius: 14px;
          background: rgba(245,199,122,0.15);
          border: 1px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--text-main);
          animation: fadeUp 0.6s ease;
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          from { text-shadow: 0 0 5px var(--gold); }
          to { text-shadow: 0 0 20px var(--gold); }
        }
      `}</style>
    </>
  );
}
