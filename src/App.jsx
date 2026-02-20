import { Routes, Route, Navigate } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground"; // ✅ add this

import Home from "./pages/Home";
import Booking from "./pages/Booking";

import ComboPage from "./pages/ComboPage";
import PlannerPage from "./pages/PlannerPage";
import AIPage from "./pages/AIPage";
import BudgetPage from "./pages/BudgetPage";
import ThemePage from "./pages/ThemePage";
import VenuePage from "./pages/VenuePage";
import HallPage from "./pages/HallPage";
import MusicPage from "./pages/MusicPage";
import CateringPage from "./pages/CateringPage";
import DecorPage from "./pages/DecorPage";

export default function App() {
  return (
    <>
      {/* 🌌 GLOBAL BACKGROUND */}
      <AnimatedBackground />

      {/* 🌐 ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/combo" element={<ComboPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/ai" element={<AIPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/theme" element={<ThemePage />} />
        <Route path="/venues" element={<VenuePage />} />
        <Route path="/hall" element={<HallPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/catering" element={<CateringPage />} />
        <Route path="/decor" element={<DecorPage />} />

        {/* ⚠️ KEEP THIS ALWAYS LAST */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
