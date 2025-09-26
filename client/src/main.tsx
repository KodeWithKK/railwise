import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "./components/layouts/root-page";
import HomePage from "./components/pages/home";
import LiveStatusPage from "./components/pages/live-status";
import PNRStatusPage from "./components/pages/pnr-status";
import SchedulePage from "./components/pages/schedule";
import SearchTrainPage from "./components/pages/search-trains";
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
