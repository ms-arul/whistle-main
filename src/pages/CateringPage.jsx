import { useNavigate } from "react-router-dom";

export default function CateringPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>🍽 Catering</h1>
      <button>South Indian</button>
      <button>North Indian</button>
    </div>
  );
}
