import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "./layouts/root-page";
import HomePage from "./pages/home";
import LiveStatusPage from "./pages/live-status";
import PNRStatusPage from "./pages/pnr-status";
import SchedulePage from "./pages/schedule";
import SearchTrainPage from "./pages/search-trains";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="live-status" element={<LiveStatusPage />} />
          <Route path="pnr-status" element={<PNRStatusPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="search-trains" element={<SearchTrainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
