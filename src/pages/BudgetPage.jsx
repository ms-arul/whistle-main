import { useNavigate } from "react-router-dom";

export default function BudgetPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>💰 Budget Planner</h1>
      <input placeholder="Enter Budget ₹" />
      <button>Split Budget</button>
    </div>
  );
}
