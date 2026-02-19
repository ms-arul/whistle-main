import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import {
  FaMapMarkerAlt,
  FaStar,
  FaSearch,
  FaHeart,
  FaFilter,
} from "react-icons/fa";

export default function VenuePage() {
  const navigate = useNavigate();

  const allVenues = [
    {
      name: "Beach Resort",
      location: "ECR, Chennai",
      rating: 4.5,
      price: "₹2L - ₹5L",
      type: "Resort",
    },
    {
      name: "Grand Banquet Hall",
      location: "T Nagar",
      rating: 4.2,
      price: "₹1L - ₹3L",
      type: "Hall",
    },
    {
      name: "Green Garden Venue",
      location: "OMR",
      rating: 4.6,
      price: "₹80K - ₹2L",
      type: "Garden",
    },
    {
      name: "Luxury Convention Center",
      location: "Velachery",
      rating: 4.8,
      price: "₹3L - ₹8L",
      type: "Hall",
    },
  ];

  const [venues, setVenues] = useState(allVenues);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [activeVenue, setActiveVenue] = useState(null);

  // 🔍 SEARCH
  const handleSearch = (val) => {
    setSearch(val);
    filterVenues(val, filter);
  };

  // 🎯 FILTER
  const handleFilter = (type) => {
    setFilter(type);
    filterVenues(search, type);
  };

  const filterVenues = (searchText, type) => {
    let filtered = allVenues;

    if (searchText) {
      filtered = filtered.filter((v) =>
        v.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (type !== "All") {
      filtered = filtered.filter((v) => v.type === type);
    }

    setVenues(filtered);
  };

  // ❤️ FAVORITE
  const toggleFav = (venue) => {
    if (favorites.includes(venue.name)) {
      setFavorites(favorites.filter((f) => f !== venue.name));
    } else {
      setFavorites([...favorites, venue.name]);
    }
  };

  return (
    <div className="venue-page">

      {/* 🔙 BACK */}
      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={18} />
        Back
      </button>

      <h1 className="title">📍 Nearby Venues</h1>

      {/* SEARCH */}
      <div className="search-box">
        <FaSearch />
        <input
          placeholder="Search venue..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* FILTER */}
      <div className="filters">
        {["All", "Hall", "Resort", "Garden"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => handleFilter(f)}
          >
            <FaFilter /> {f}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid">
        {venues.map((v, i) => (
          <div
            key={i}
            className="card"
            onClick={() => setActiveVenue(v)}
          >
            <h2>{v.name}</h2>
            <p><FaMapMarkerAlt /> {v.location}</p>
            <p><FaStar /> {v.rating}</p>
            <p>{v.price}</p>

            <button
              className={`fav ${favorites.includes(v.name) ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFav(v);
              }}
            >
              <FaHeart />
            </button>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {activeVenue && (
        <div className="popup" onClick={() => setActiveVenue(null)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>

            <h2>{activeVenue.name}</h2>
            <p><FaMapMarkerAlt /> {activeVenue.location}</p>
            <p><FaStar /> {activeVenue.rating}</p>
            <p>{activeVenue.price}</p>

            <div className="ai">
              💡 Best for weddings, parties & corporate events
            </div>

            <button
              className="apply-btn"
              onClick={() => navigate("/planner")}
            >
              Select Venue
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
        }

        .venue-page {
          min-height: 100vh;
          padding: 80px 20px;
          background: linear-gradient(180deg, var(--violet), var(--bg));
          color: var(--text);
        }

        .back-btn {
          position: fixed;
          top: 15px;
          left: 15px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(0,0,0,0.4);
          color: white;
        }

        .title {
          text-align: center;
          color: var(--gold);
          margin-bottom: 20px;
        }

        .search-box {
          display: flex;
          gap: 10px;
          padding: 10px;
          background: rgba(255,255,255,0.08);
          border-radius: 12px;
          margin-bottom: 10px;
        }

        .filters {
          display: flex;
          gap: 8px;
          margin-bottom: 15px;
        }

        .filters button {
          padding: 6px 10px;
          border-radius: 999px;
          border: none;
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .filters .active {
          background: var(--gold);
          color: black;
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
          position: relative;
          cursor: pointer;
          transition: 0.3s;
        }

        .card:hover {
          transform: scale(1.05);
        }

        .fav {
          position: absolute;
          bottom: 8px;
          right: 8px;
        }

        .fav.active {
          color: red;
        }

        /* POPUP */
        .popup {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-box {
          background: rgba(255,255,255,0.08);
          padding: 25px;
          border-radius: 20px;
          width: 280px;
          text-align: center;
          backdrop-filter: blur(20px);
        }

        .apply-btn {
          margin-top: 10px;
          padding: 10px;
          border-radius: 999px;
          background: var(--gold);
          border: none;
        }
      `}</style>
    </div>
  );
}
