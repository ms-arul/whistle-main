import { useNavigate } from "react-router-dom";

export default function ThemePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>🎭 Theme Generator</h1>
      <button>Royal</button>
      <button>Neon</button>
      <button>Traditional</button>
    </div>
  );
}
