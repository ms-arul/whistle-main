import { useNavigate } from "react-router-dom";

export default function AIPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>🤖 AI Assistant</h1>
      <input placeholder="Ask something..." />
      <button>Generate Idea</button>
    </div>
  );
}
