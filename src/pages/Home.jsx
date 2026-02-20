import WhistleLogo from "../components/logo";
import { Calendar, Users, Star, Sparkles } from "lucide-react";
import { HiSparkles } from "react-icons/hi2";
import { FaCalendarCheck } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Home() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) return;

    setPhone(value);

    if (value.length === 0) setError("");
    else if (!/^[6-9]/.test(value)) setError("Invalid");
    else if (value.length < 10) setError("Invalid");
    else setError("");
  };

  const isValid = phone.length === 10 && /^[6-9]/.test(phone);

  return (
    <>
      {/* 🔥 BACKGROUND */}
      <AnimatedBackground />

      <main className="home">
        <section className="hero">

          {/* SIGN IN */}
          <div className="top-auth">
            <button onClick={() => setShowAuth(true)}>Sign In</button>
          </div>

          <div className="content">
            <WhistleLogo size={200} />

            <h1 className="title">
              <span className="gradient-text">Whistle</span>
              <HiSparkles className="spark-icon" />
            </h1>

            <p className="tagline">
              Designed for Life’s <span>Biggest Moments</span>
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/booking")}
            >
              <FaCalendarCheck />
              <span>Book Your Event</span>
            </button>

            {/* FEATURES */}
            <div className="features">
              {[
                { icon: <Calendar />, text: "Easy Booking" },
                { icon: <Users />, text: "Trusted Vendors" },
                { icon: <Star />, text: "Premium Events" },
                { icon: <Sparkles />, text: "Memorable Experience" },
              ].map((f, i) => (
                <div className="feature" key={i}>
                  {f.icon}
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* AUTH MODAL */}
      {showAuth && (
        <div className="auth-modal" onClick={() => setShowAuth(false)}>
          <div className="auth-box" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={() => setShowAuth(false)}>
              <IoClose />
            </button>

            <h2>Welcome</h2>
            <p>Sign in to continue your experience</p>

            <button
              className="auth-option otp"
              onClick={() => setShowOtpInput(!showOtpInput)}
            >
              <MdOutlinePhoneIphone />
              <span>Continue with OTP</span>
            </button>

            <div className={`otp-box ${showOtpInput ? "active" : ""}`}>
              <div className="phone-input">
                <span className="code">+91</span>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              {error && <p className="error">{error}</p>}

              <button
                className="send-otp"
                disabled={!isValid}
                onClick={() => {
                  if (isValid) alert("OTP Sent to +91 " + phone);
                }}
              >
                Send OTP
              </button>
            </div>

            <button className="auth-option google">
              <FcGoogle />
              <span>Continue with Google</span>
            </button>

          </div>
        </div>
      )}

      {/* STYLES */}
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

        /* FIXED BACKGROUND ISSUE */
        .home {
          height: 100svh;
          background: transparent; /* ✅ IMPORTANT */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .hero {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .top-auth {
          position: absolute;
          top: 40px;
          right: 25px;
        }

        .top-auth button {
          padding: 8px 20px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          color: var(--gold);
          cursor: pointer;
          transition: 0.3s;
        }

        .top-auth button:hover {
          background: rgba(245,199,122,0.2);
          transform: scale(1.08);
        }

        .content {
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeUp 1s ease;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--gold), white);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .spark-icon {
          color: var(--gold);
          animation: pulse 2s infinite;
        }

        .tagline {
          color: var(--text-muted);
        }

        .tagline span {
          color: var(--gold);
        }

        .primary-btn {
          margin: 25px 0;
          padding: 14px 30px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, var(--gold), var(--gold-soft));
          cursor: pointer;
          font-weight: 600;
          display: flex;
          gap: 10px;
          align-items: center;
          transition: 0.3s;
          box-shadow: 0 0 15px rgba(245,199,122,0.4);
        }

        .primary-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 30px rgba(245,199,122,0.8);
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .feature {
          display: flex;
          gap: 12px;
          align-items: center;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
        }

        .feature:nth-child(1) { animation-delay: 0.3s; }
        .feature:nth-child(2) { animation-delay: 0.5s; }
        .feature:nth-child(3) { animation-delay: 0.7s; }
        .feature:nth-child(4) { animation-delay: 0.9s; }

        .feature svg {
          color: var(--gold);
        }

        /* MODAL */
        .auth-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .auth-box {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(25px);
          padding: 30px;
          border-radius: 20px;
          width: 300px;
          animation: scaleIn 0.4s ease;
        }

        .error {
          color: #ff6b6b;
          font-size: 12px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>
    </>
  );
}
