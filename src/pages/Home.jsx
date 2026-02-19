import WhistleLogo from "../components/logo";
import { Calendar, Users, Star, Sparkles } from "lucide-react";
import { HiSparkles } from "react-icons/hi2";
import { FaCalendarCheck } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // 🔒 VALIDATION LOGIC ONLY (NO UI CHANGE)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // only digits

    if (value.length > 10) return;

    setPhone(value);

    if (value.length === 0) {
      setError("");
    } else if (!/^[6-9]/.test(value)) {
      setError("Invalid");
    } else if (value.length < 10) {
      setError("Invalid");
    } else {
      setError("");
    }
  };

  const isValid = phone.length === 10 && /^[6-9]/.test(phone);

  return (
    <>
      <main className="home">
        <section className="hero">

          {/* 🔐 TOP RIGHT BUTTON */}
          <div className="top-auth">
            <button onClick={() => setShowAuth(true)}>
              Sign In
            </button>
          </div>

          <div className="content">
            <WhistleLogo size={200} />

            <h1 className="title">
              Whistle
              <span className="icon">
                <HiSparkles />
              </span>
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
              <div className="feature">
                <Calendar />
                <span>Easy Booking</span>
              </div>
              <div className="feature">
                <Users />
                <span>Trusted Vendors</span>
              </div>
              <div className="feature">
                <Star />
                <span>Premium Events</span>
              </div>
              <div className="feature">
                <Sparkles />
                <span>Memorable Experience</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 🔐 AUTH MODAL */}
      {showAuth && (
        <div className="auth-modal" onClick={() => setShowAuth(false)}>
          <div className="auth-box" onClick={(e) => e.stopPropagation()}>

            <button
              className="close-btn"
              onClick={() => setShowAuth(false)}
            >
              <IoClose />
            </button>

            <h2>Welcome</h2>
            <p>Sign in to continue your experience</p>

            {/* OTP BUTTON */}
            <button
              className="auth-option otp"
              onClick={() => setShowOtpInput(!showOtpInput)}
            >
              <MdOutlinePhoneIphone />
              <span>Continue with OTP</span>
            </button>

            {/* OTP DROPDOWN */}
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

              <button
                className="send-otp"
                disabled={!isValid}
                onClick={() => {
                  if (isValid) {
                    alert("OTP Sent to +91 " + phone);
                  }
                }}
              >
                Send OTP
              </button>
            </div>

            {/* GOOGLE BUTTON */}
            <button className="auth-option google">
              <FcGoogle />
              <span>Continue with Google</span>
            </button>

          </div>
        </div>
      )}

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

        .home {
          height: 100svh;
          width: 100%;
          background:
            radial-gradient(circle at top, rgba(245,199,122,0.25), transparent 55%),
            linear-gradient(180deg, var(--violet-mid), var(--violet-dark), var(--black));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }

        /* 🔥 GLASS SIGN IN BUTTON */
        .top-auth {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .top-auth button {
          padding: 8px 20px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--gold);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(245, 199, 122, 0.15);
        }

        .top-auth button:hover {
          background: rgba(245, 199, 122, 0.15);
          border: 1px solid var(--gold);
          color: #fff;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 0 20px rgba(245, 199, 122, 0.4);
        }

        .top-auth button:active {
          transform: scale(0.95);
        }

        .content {
          max-width: 360px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 1s ease;
        }

        .title {
          font-family: "Playfair Display", serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          margin: 18px 0 10px;
          display: flex;
          gap: 10px;
          background: linear-gradient(135deg, var(--gold), #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .icon {
          color: var(--gold);
          animation: glow 2s infinite alternate;
        }

        .tagline {
          font-size: 0.95rem;
          margin-bottom: 24px;
          color: var(--text-muted);
        }

        .tagline span {
          color: var(--gold);
          font-weight: 600;
        }

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
          margin-bottom: 30px;
          transition: 0.3s;
        }

        .primary-btn:hover {
          transform: scale(1.05);
        }

        .features {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .feature svg {
          color: var(--gold);
          width: 18px;
        }

        /* MODAL */
        .auth-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .auth-box {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          padding: 30px;
          border-radius: 20px;
          width: 300px;
          text-align: center;
          position: relative;
          animation: fadeIn 0.4s ease;
        }

        .auth-box h2 {
          color: var(--gold);
          margin-bottom: 8px;
        }

        .auth-box p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .auth-option {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 999px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .auth-option svg {
          font-size: 18px;
        }

        .auth-option.otp {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--gold);
          color: var(--gold);
        }

        .auth-option.otp:hover {
          background: rgba(245,199,122,0.15);
          transform: scale(1.04);
        }

        .auth-option.google {
          background: rgba(255,255,255,0.9);
          color: #000;
        }

        .auth-option.google:hover {
          transform: scale(1.04);
          box-shadow: 0 0 12px rgba(255,255,255,0.4);
        }

        .otp-box {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .otp-box.active {
          max-height: 150px;
          margin-bottom: 12px;
        }

        .phone-input {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 10px;
          margin-bottom: 10px;
        }

        .code {
          color: var(--gold);
          margin-right: 8px;
          font-weight: 600;
        }

        .phone-input input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          width: 100%;
        }

        .send-otp {
          width: 100%;
          padding: 10px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, var(--gold), var(--gold-soft));
          color: #2b1c0f;
          font-weight: 600;
          cursor: pointer;
        }

        .send-otp:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 12px;
          background: none;
          border: none;
          color: var(--gold);
          font-size: 20px;
          cursor: pointer;
        }

        @keyframes fadeIn {
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