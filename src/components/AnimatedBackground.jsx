import {
  FaMusic,
  FaUtensils,
  FaPalette,
  FaBuilding,
  FaTheaterMasks,
  FaCalendarAlt,
  FaStar,
  FaMagic,
} from "react-icons/fa";

const icons = [
  FaMusic,
  FaUtensils,
  FaPalette,
  FaBuilding,
  FaTheaterMasks,
  FaCalendarAlt,
  FaMagic,
];

export default function AnimatedBackground() {
  return (
    <>
      <div className="bg-container">
        {/* FLOATING ICONS */}
        {[...Array(20)].map((_, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={i}
              className="icon"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 15}s`,
                animationDelay: `${Math.random() * 10}s`,
                fontSize: `${20 + Math.random() * 25}px`,
              }}
            >
              <Icon />
            </div>
          );
        })}

        {/* GLOW PARTICLES */}
        {[...Array(25)].map((_, i) => (
          <span
            key={"p" + i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* SPARKLES */}
        {[...Array(15)].map((_, i) => (
          <div
            key={"s" + i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <FaStar />
          </div>
        ))}
      </div>

      <style>{`
        .bg-container {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          background: radial-gradient(circle at top, rgba(245,199,122,0.1), transparent 60%),
                      radial-gradient(circle at bottom, rgba(255,150,200,0.08), transparent 70%);
        }

        /* ICONS */
        .icon {
          position: absolute;
          color: rgba(255, 215, 150, 0.35);
          animation: floatUp linear infinite, rotateSlow linear infinite;
          filter: drop-shadow(0 0 10px rgba(255, 200, 120, 0.6));
        }

        @keyframes floatUp {
          0% {
            transform: translateY(120vh) scale(0.8);
            opacity: 0;
          }
          10% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% {
            transform: translateY(-120vh) scale(1.4);
            opacity: 0;
          }
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* PARTICLES */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255,255,255,0.6);
          animation: drift infinite ease-in-out;
        }

        @keyframes drift {
          0% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate(20px, -30px);
            opacity: 1;
          }
          100% {
            transform: translate(-20px, 20px);
            opacity: 0.2;
          }
        }

        /* SPARKLES */
        .sparkle {
          position: absolute;
          color: rgba(255,255,255,0.5);
          font-size: 10px;
          animation: twinkle 2.5s infinite ease-in-out;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }

        /* EXTRA GLOW WAVE */
        .bg-container::after {
          content: "";
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background: radial-gradient(circle, rgba(255,255,255,0.05), transparent 60%);
          animation: pulse 10s infinite linear;
        }

        @keyframes pulse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
