import { useNavigate } from "react-router-dom";

export default function MusicPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>🎵 Music & DJ</h1>
      <button>Book DJ</button>
    </div>
  );
}
