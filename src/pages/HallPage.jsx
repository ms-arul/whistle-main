import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaStar,
  FaCrown,
  FaArrowLeft,
  FaBuilding,
  FaRobot,
} from "react-icons/fa";

export default function HallPage() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const halls = [
    { id: 1, name: "Royal Grand Hall", location: "Chennai", capacity: 500, price: 150000, rating: 4.8, img: "/halls/hall1.jpg" },
    { id: 2, name: "Golden Palace", location: "Coimbatore", capacity: 300, price: 90000, rating: 4.5, img: "/halls/hall2.jpg" },
    { id: 3, name: "Elite Convention", location: "Madurai", capacity: 800, price: 220000, rating: 4.9, img: "/halls/hall3.jpg" },
    { id: 4, name: "Crystal Hall", location: "Trichy", capacity: 200, price: 70000, rating: 4.2, img: "/halls/hall4.jpg" },
    { id: 5, name: "Diamond Arena", location: "Chennai", capacity: 600, price: 180000, rating: 4.7, img: "/halls/hall5.jpg" },
    { id: 6, name: "Silver Banquet", location: "Madurai", capacity: 350, price: 110000, rating: 4.4, img: "/halls/hall6.jpg" },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const filteredHalls = halls.filter((hall) => {
    return (
      (!filterLocation || hall.location === filterLocation) &&
      (!filterPrice || hall.price <= parseInt(filterPrice))
    );
  });

  const aiSuggestion =
    filteredHalls.length > 0
      ? filteredHalls.reduce((best, hall) =>
          hall.price < best.price ? hall : best
        )
      : halls[0];

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="hall-page">

      {/* BACK */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      {/* TITLE */}
      <h1 className="title">
        <FaBuilding /> Hall Booking
      </h1>

      {/* FILTERS */}
      <div className="filters">
        <select onChange={(e) => setFilterLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option>Chennai</option>
          <option>Coimbatore</option>
          <option>Madurai</option>
          <option>Trichy</option>
        </select>

        <select onChange={(e) => setFilterPrice(e.target.value)}>
          <option value="">Any Price</option>
          <option value="100000">Below 1L</option>
          <option value="200000">Below 2L</option>
        </select>
      </div>

      {/* AI */}
      <div className="ai-box">
        <FaRobot /> AI Suggests: <b>{aiSuggestion.name}</b>
      </div>

      {/* GRID */}
      <div className="hall-grid">
        {filteredHalls.map((hall, index) => (
          <div key={hall.id} className="hall-card" style={{ animationDelay: `${index * 0.1}s` }}>

            {hall.id === aiSuggestion.id && (
              <div className="tag">
                <FaCrown /> Best Choice
              </div>
            )}

            <div
              className={`fav ${favorites.includes(hall.id) ? "active" : ""}`}
              onClick={() => toggleFavorite(hall.id)}
            >
              <FaHeart />
            </div>

            <div className="image-wrapper">
              <img src={hall.img} alt={hall.name} />
            </div>

            <h2>{hall.name}</h2>

            <div className="info">
              <span><FaMapMarkerAlt /> {hall.location}</span>
              <span><FaUsers /> {hall.capacity}</span>
            </div>

            {/* RATING */}
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(hall.rating) ? "star active" : "star"} />
              ))}
              <span>{hall.rating}</span>
            </div>

            <p className="price">₹{hall.price.toLocaleString()}</p>

            <input
              type="date"
              min={today}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <button
              className="book-btn"
              onClick={() => {
                if (!selectedDate) return alert("Select date first");
                alert(`Booked ${hall.name}`);
              }}
            >
              Book Now
            </button>

          </div>
        ))}
      </div>

      {/* STYLES */}
      <style>{`
        :root {
          --black: #06060b;
          --violet-dark: #120b2e;
          --violet-mid: #2b1b55;
          --gold: #f5c77a;
        }

        .hall-page {
          min-height: 100vh;
          padding: 80px 20px;
          background: linear-gradient(180deg, var(--violet-mid), var(--black));
          color: white;
        }

        .back-btn {
          position: fixed;
          top: 15px;
          left: 15px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(0,0,0,0.5);
          color: white;
          display: flex;
          gap: 6px;
        }

        .title {
          display: flex;
          justify-content: center;
          gap: 10px;
          font-size: 2rem;
          color: var(--gold);
        }

        .filters {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 20px 0;
        }

        select {
          padding: 8px;
          border-radius: 10px;
        }

        .ai-box {
          text-align: center;
          color: var(--gold);
          margin-bottom: 20px;
        }

        .hall-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .hall-card {
          position: relative;
          padding: 15px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(15px);
          transition: 0.4s;
          animation: fadeUp 0.6s ease forwards;
        }

        .hall-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 10px 40px rgba(245,199,122,0.2);
        }

        .image-wrapper {
          overflow: hidden;
          border-radius: 12px;
        }

        .image-wrapper img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          transition: 0.4s;
        }

        .hall-card:hover img {
          transform: scale(1.1);
        }

        .fav {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        .fav.active {
          color: red;
          transform: scale(1.2);
        }

        .tag {
          position: absolute;
          top: 10px;
          left: 10px;
          background: linear-gradient(45deg, gold, orange);
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.7rem;
        }

        .rating .star {
          opacity: 0.3;
        }

        .rating .star.active {
          color: gold;
          opacity: 1;
        }

        .price {
          font-weight: bold;
          margin: 10px 0;
        }

        input {
          width: 100%;
          padding: 6px;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .book-btn {
          width: 100%;
          padding: 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--gold), #fff);
          border: none;
          font-weight: bold;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
