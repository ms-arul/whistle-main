import { useNavigate } from "react-router-dom";

export default function ComboPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>✨ All-in-One Combo</h1>
      <p>Create complete event package instantly</p>

      <button onClick={() => alert("AI Combo Generated!")}>
        Generate Combo
      </button>
    </div>
  );
}
