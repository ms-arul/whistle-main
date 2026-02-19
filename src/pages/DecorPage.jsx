import { useNavigate } from "react-router-dom";

export default function DecorPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>🎨 Decorations</h1>
      <button>Stage Setup</button>
      <button>Lighting</button>
    </div>
  );
}
