import {
  TramFront,
  Home,
  Search,
  Activity,
  ClipboardList,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { useState } from "react";
import "./styles.css";

function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">
              <TramFront size={24} color="white" />
            </div>
            <div>
              <h3 className="logo-text">RailWise</h3>
              <p className="logo-subtext">Smart Train Tracking</p>
            </div>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <Home size={18} /> Home
            </NavLink>
            <NavLink to="/search-trains" onClick={() => setIsMenuOpen(false)}>
              <Search size={18} /> Search Trains
            </NavLink>
            <NavLink to="/live-status" onClick={() => setIsMenuOpen(false)}>
              <Activity size={18} /> Live Status
            </NavLink>
            <NavLink to="/pnr-status" onClick={() => setIsMenuOpen(false)}>
              <ClipboardList size={18} /> PNR Status
            </NavLink>
            <NavLink to="/schedule" onClick={() => setIsMenuOpen(false)}>
              <Calendar size={18} /> Schedule
            </NavLink>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ to, children, onClick }: NavLinkProps) {
  const isActive = useLocation().pathname === to;

  return (
    <Link
      to={to}
      className={isActive ? "nav-link active" : "nav-link"}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default RootLayout;
