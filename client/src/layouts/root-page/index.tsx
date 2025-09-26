import {
  TramFront,
  Home,
  Search,
  Activity,
  ClipboardList,
  Calendar,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import "./styles.css";

function RootLayout() {
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
          <div className="nav-menu">
            <NavLink to="/">
              <Home size={18} /> Home
            </NavLink>
            <NavLink to="/search-trains">
              <Search size={18} /> Search Trains
            </NavLink>
            <NavLink to="/live-status">
              <Activity size={18} /> Live Status
            </NavLink>
            <NavLink to="/pnr-status">
              <ClipboardList size={18} /> PNR Status
            </NavLink>
            <NavLink to="/schedule">
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
}

function NavLink({ to, children }: NavLinkProps) {
  const isActive = useLocation().pathname === to;

  return (
    <Link to={to} className={isActive ? "nav-link active" : "nav-link"}>
      {children}
    </Link>
  );
}

export default RootLayout;
