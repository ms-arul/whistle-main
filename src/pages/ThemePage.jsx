import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import {
  FaCrown,
  FaBolt,
  FaLeaf,
  FaRandom,
  FaHeart,
  FaPalette,
  FaSearch,
} from "react-icons/fa";

export default function ThemePage() {
  const navigate = useNavigate();

  const allThemes = [
    {
      name: "Royal",
      icon: <FaCrown />,
      desc: "Luxury decor, chandeliers, gold theme",
      colors: ["#f5c77a", "#800020", "#fff"],
      tag: "Trending",
    },
    {
      name: "Neon",
      icon: <FaBolt />,
      desc: "Glow lights, DJ vibe, neon colors",
      colors: ["#00ffff", "#ff00ff", "#000"],
      tag: "Popular",
    },
    {
      name: "Traditional",
      icon: <FaLeaf />,
      desc: "Cultural decor, flowers, warm lighting",
      colors: ["#ff9933", "#138808", "#fff"],
      tag: "",
    },
    {
      name: "Minimal",
      icon: <FaPalette />,
      desc: "Clean white aesthetic, simple decor",
      colors: ["#ffffff", "#dddddd", "#000"],
      tag: "Modern",
    },
  ];

  const [themes, setThemes] = useState(allThemes);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  // 🔍 SEARCH
  const handleSearch = (val) => {
    setSearch(val);
    setThemes(
      allThemes.filter((t) =>
        t.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  // ❤️ FAVORITE
  const toggleFav = (theme) => {
    if (favorites.includes(theme.name)) {
      setFavorites(favorites.filter((f) => f !== theme.name));
    } else {
      setFavorites([...favorites, theme.name]);
    }
  };

  // 🎲 RANDOM
  const randomTheme = () => {
    const rand = allThemes[Math.floor(Math.random() * allThemes.length)];
    setSelected(rand);
  };

  return (
    <div className="theme-page">

      {/* 🔙 BACK */}
      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={18} />
        Back
      </button>

      {/* TITLE */}
      <h1 className="title">🎭 Theme Generator</h1>

      {/* SEARCH */}
      <div className="search-box">
        <FaSearch />
        <input
          placeholder="Search theme..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* CARDS */}
      <div className="grid">
        {themes.map((t, i) => (
          <div
            key={i}
            className={`card ${selected?.name === t.name ? "active" : ""}`}
            onClick={() => setSelected(t)}
          >
            {t.tag && <span className="badge">{t.tag}</span>}

            <div className="icon">{t.icon}</div>
            <h2>{t.name}</h2>
            <p>{t.desc}</p>

            {/* COLORS */}
            <div className="colors">
              {t.colors.map((c, i) => (
                <span key={i} style={{ background: c }} />
              ))}
            </div>

            {/* FAVORITE */}
            <button
              className={`fav ${favorites.includes(t.name) ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFav(t);
              }}
            >
              <FaHeart />
            </button>
          </div>
        ))}
      </div>

      {/* RANDOM */}
      <button className="random-btn" onClick={randomTheme}>
        <FaRandom /> Surprise Me
      </button>

      {/* PREVIEW */}
      {selected && (
        <div className="preview">
          <h2>{selected.name} Theme</h2>

          <div className="preview-box">
            <p>{selected.desc}</p>
          </div>

          <div className="ai">
            💡 AI Tip: Use matching outfits, lighting & decor for consistency
          </div>

          <button
            className="apply-btn"
            onClick={() => navigate("/planner")}
          >
            Apply Theme
          </button>
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

        .theme-page {
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
          gap: 6px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
        }

        .title {
          text-align: center;
          color: var(--gold);
          margin-bottom: 20px;
        }

        .search-box {
          display: flex;
          gap: 8px;
          align-items: center;
          background: rgba(255,255,255,0.08);
          padding: 10px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .search-box input {
          flex: 1;
          border: none;
          background: transparent;
          color: white;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .card {
          padding: 15px;
          border-radius: 18px;
          background: rgba(255,255,255,0.05);
          text-align: center;
          position: relative;
          transition: 0.3s;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card.active {
          border: 1px solid var(--gold);
        }

        .badge {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 0.6rem;
          background: var(--gold);
          color: black;
          padding: 2px 6px;
          border-radius: 6px;
        }

        .colors {
          display: flex;
          justify-content: center;
          gap: 5px;
          margin-top: 8px;
        }

        .colors span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .fav {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: none;
          border: none;
          color: white;
        }

        .fav.active {
          color: red;
        }

        .random-btn {
          margin: 20px auto;
          display: block;
          padding: 10px 20px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #f5c77a, #f8d99b);
          cursor: pointer;
        }

        .preview {
          margin-top: 20px;
          text-align: center;
        }

        .preview-box {
          background: rgba(255,255,255,0.08);
          padding: 15px;
          border-radius: 15px;
        }

        .ai {
          margin-top: 10px;
          color: var(--gold);
        }

        .apply-btn {
          margin-top: 10px;
          padding: 10px 20px;
          border-radius: 999px;
          border: none;
          background: var(--gold);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
