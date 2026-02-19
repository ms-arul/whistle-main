import { useNavigate } from "react-router-dom";

export default function PlannerPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>📅 Event Planner</h1>
      <input type="date" />
      <input placeholder="Guests count" />
      <button>Plan Event</button>
    </div>
  );
}
