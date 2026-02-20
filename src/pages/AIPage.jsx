import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { FaRobot, FaPaperPlane, FaLightbulb } from "react-icons/fa";

export default function AIPage() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi 👋 I'm your AI Event Assistant. Ask me anything about planning!" }
  ]);
  const [typing, setTyping] = useState(false);

  // 🧠 Enhanced AI Logic
  const generateResponse = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("wedding"))
      return "For a wedding: Choose a beach or luxury hall, floral decor, live music band, premium catering, and photography. Plan at least 2-3 months ahead.";

    if (msg.includes("birthday"))
      return "Birthday plan: Pick a theme, cake stage, balloons & LED decor, DJ/music, and games. For kids, add magic show or fun activities.";

    if (msg.includes("corporate"))
      return "Corporate event: Use conference hall, projector setup, formal catering, and schedule sessions with breaks. Keep it professional.";

    if (msg.includes("party"))
      return "Party setup: Lounge or rooftop venue, DJ, lighting, snacks, drinks, and dance floor.";

    if (msg.includes("budget"))
      return "Budget planning: 40% venue, 30% catering, 20% decor, 10% misc. Always keep 10% buffer for unexpected costs.";

    if (msg.includes("venue"))
      return "Venue ideas: Beach resort, banquet hall, farmhouse, rooftop lounge, or garden setup depending on your event type.";

    if (msg.includes("food") || msg.includes("catering"))
      return "Catering tips: Mix veg & non-veg options, starters + main course + desserts. Add live counters for premium feel.";

    if (msg.includes("decor"))
      return "Decor ideas: Floral themes, fairy lights, LED panels, minimal luxury setup, or theme-based decorations.";

    if (msg.includes("timeline") || msg.includes("plan"))
      return "Event timeline: Book venue → finalize budget → choose decor → arrange catering → confirm entertainment → final checklist.";

    if (msg.includes("guest"))
      return "Guest management: Send invites early, track RSVPs, arrange seating, and plan food based on guest count.";

    return "Start with selecting event type, then fix budget, venue, and services like decor, food, and entertainment. Ask me anything specific!";
  };

  // ⌨️ Typewriter Effect
  const typeWriter = (text, callback) => {
    let index = 0;
    let current = "";

    setTyping(true);

    const interval = setInterval(() => {
      current += text.charAt(index);
      index++;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = current;
        return updated;
      });

      if (index === text.length) {
        clearInterval(interval);
        setTyping(false);
        if (callback) callback();
      }
    }, 20); // speed
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    const botMsg = { type: "bot", text: "" };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");

    const response = generateResponse(input);

    setTimeout(() => {
      typeWriter(response);
    }, 400);
  };

  const quickPrompts = [
    "Wedding plan",
    "Birthday ideas",
    "Low budget event",
    "Best venues",
    "Food catering ideas",
    "Decoration styles"
  ];

  return (
    <div className="ai-page">

      {/* BACK */}
      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={18} />
        Back
      </button>

      {/* HEADER */}
      <div className="header">
        <h1><FaRobot /> AI Event Assistant</h1>
        <p>Ask anything about planning your event</p>
      </div>

      {/* CHAT */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        {typing && <div className="typing">AI is typing...</div>}
      </div>

      {/* QUICK PROMPTS */}
      <div className="quick-prompts">
        {quickPrompts.map((q, i) => (
          <button key={i} onClick={() => setInput(q)}>
            <FaLightbulb /> {q}
          </button>
        ))}
      </div>

      {/* INPUT */}
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about events, budget, venues..."
        />
        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>

      <style>{`
        :root {
          --bg: #06060b;
          --violet: #2b1b55;
          --gold: #f5c77a;
          --text: #f5f3ff;
          --muted: #b9b1da;
        }

        .ai-page {
          min-height: 100vh;
          padding: 80px 15px 20px;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(circle at top, rgba(245,199,122,0.15), transparent 55%),
            linear-gradient(180deg, var(--violet), var(--bg));
          color: var(--text);
        }

        .back-btn {
          position: fixed;
          top: 40px;
          left: 25px;
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

        .header {
          text-align: center;
          margin-bottom: 10px;
        }

        .header h1 {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          color: var(--gold);
        }

        .header p {
          font-size: 0.85rem;
          color: var(--muted);
        }

        .chat-box {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
        }

        .msg {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 0.9rem;
          animation: fadeIn 0.3s ease;
        }

        .msg.user {
          align-self: flex-end;
          background: linear-gradient(135deg, #f5c77a, #f8d99b);
          color: black;
        }

        .msg.bot {
          align-self: flex-start;
          background: rgba(255,255,255,0.08);
        }

        .typing {
          font-size: 0.75rem;
          color: var(--muted);
          padding-left: 10px;
        }

        .quick-prompts {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 10px 0;
        }

        .quick-prompts button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 999px;
          border: none;
          background: rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .input-box {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .input-box input {
          flex: 1;
          padding: 12px;
          border-radius: 999px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .input-box button {
          width: 45px;
          border-radius: 50%;
          border: none;
          background: var(--gold);
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
