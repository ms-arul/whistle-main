import { useNavigate } from "react-router-dom";

export default function VenuePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>📍 Nearby Venues</h1>
      <p>Showing venues near you...</p>
    </div>
  );
}
