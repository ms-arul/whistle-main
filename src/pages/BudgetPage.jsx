import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

import {
  FaRupeeSign,
  FaBuilding,
  FaUtensils,
  FaPalette,
  FaMusic,
  FaMagic,
  FaUsers,
  FaDownload,
  FaRedo,
} from "react-icons/fa";

export default function BudgetPage() {
  const navigate = useNavigate();

  const [budget, setBudget] = useState("");
  const [guests, setGuests] = useState(50);
  const [split, setSplit] = useState(null);

  // 🔄 AUTO CALCULATE
  useEffect(() => {
    if (budget) calculateBudget();
  }, [budget]);

  const calculateBudget = () => {
    const total = parseInt(budget);
    if (!total) return;

    setSplit({
      venue: Math.round(total * 0.4),
      catering: Math.round(total * 0.3),
      decor: Math.round(total * 0.15),
      entertainment: Math.round(total * 0.1),
      misc: Math.round(total * 0.05),
    });
  };

  const reset = () => {
    setBudget("");
    setSplit(null);
    setGuests(50);
  };

  // 💡 AI TIP
  const getTip = () => {
    if (!budget) return "Enter your budget to get smart suggestions";

    const b = parseInt(budget);

    if (b < 50000)
      return "Keep it simple: focus on food and basic venue.";
    if (b < 200000)
      return "Balanced event: good venue + decor + entertainment.";
    return "Luxury event: premium everything with full experience!";
  };

  // 📥 EXPORT
  const downloadPlan = () => {
    if (!split) return;

    const content = `
Event Budget Plan

Total Budget: ₹${budget}

Venue: ₹${split.venue}
Catering: ₹${split.catering}
Decor: ₹${split.decor}
Entertainment: ₹${split.entertainment}
Misc: ₹${split.misc}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "budget-plan.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="budget-page">

      {/* 🔙 BACK */}
      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={18} />
        Back
      </button>

      {/* TITLE */}
      <h1 className="title">
        <FaRupeeSign /> Budget Planner
      </h1>

      {/* INPUT SECTION */}
      <div className="input-box">

        <input
          type="number"
          placeholder="Enter Budget ₹"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <div className="guest-box">
          <FaUsers />
          <input
            type="range"
            min="10"
            max="500"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <span>{guests} guests</span>
        </div>

      </div>

      {/* AI TIP */}
      <div className="tip-box">
        💡 {getTip()}
      </div>

      {/* RESULT */}
      {split && (
        <>
          {/* SUMMARY */}
          <div className="summary">
            <div>
              <p>Total Budget</p>
              <h2>₹{budget}</h2>
            </div>
            <div>
              <p>Per Person</p>
              <h2>₹{Math.round(budget / guests)}</h2>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div className="result">

            {[
              { label: "Venue", value: split.venue, icon: <FaBuilding />, percent: 40 },
              { label: "Catering", value: split.catering, icon: <FaUtensils />, percent: 30 },
              { label: "Decor", value: split.decor, icon: <FaPalette />, percent: 15 },
              { label: "Entertainment", value: split.entertainment, icon: <FaMusic />, percent: 10 },
              { label: "Misc", value: split.misc, icon: <FaMagic />, percent: 5 },
            ].map((item, i) => (
              <div className="item" key={i}>
                {item.icon}
                <div className="info">
                  <p>{item.label}</p>
                  <span>₹{item.value} • {item.percent}%</span>
                  <div className="bar">
                    <div style={{ width: item.percent + "%" }} />
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* ACTIONS */}
          <div className="actions">
            <button onClick={downloadPlan}>
              <FaDownload /> Export
            </button>

            <button onClick={reset}>
              <FaRedo /> Reset
            </button>
          </div>
        </>
      )}

      <style>{`
        :root {
          --bg: #06060b;
          --violet: #2b1b55;
          --gold: #f5c77a;
          --text: #f5f3ff;
          --muted: #b9b1da;
        }

        .budget-page {
          min-height: 100vh;
          padding: 80px 20px;
          background:
            radial-gradient(circle at top, rgba(245,199,122,0.15), transparent 55%),
            linear-gradient(180deg, var(--violet), var(--bg));
          color: var(--text);
        }

        .back-btn {
          position: fixed;
          top: 15px;
          left: 15px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,0,0,0.4);
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
        }

        .title {
          text-align: center;
          color: var(--gold);
          font-size: 1.8rem;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .input-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        input {
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .guest-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tip-box {
          margin: 15px 0;
          padding: 12px;
          border-radius: 12px;
          background: rgba(245,199,122,0.1);
          color: var(--gold);
        }

        .summary {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .summary h2 {
          color: var(--gold);
        }

        .item {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
        }

        .info {
          flex: 1;
        }

        .bar {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
          margin-top: 4px;
        }

        .bar div {
          height: 100%;
          background: var(--gold);
          border-radius: 10px;
        }

        .actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .actions button {
          flex: 1;
          padding: 10px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #f5c77a, #f8d99b);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
