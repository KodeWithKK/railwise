import {
  Activity,
  Calendar,
  Clock,
  FileMinus,
  MapPin,
  Search,
  User,
} from "lucide-react";
import { Link } from "react-router";
import "./styles.css";

function HomePage() {
  return (
    <>
      <main id="hero-section">
        <div className="hero-container">
          <div className="hero-badge">🚆 Real-Time Train Tracking</div>
          <h1 className="hero-title">
            Travel Smarter
            <br />
            <span className="hero-title-highlight">With RailWise</span>
          </h1>
          <p className="hero-description">
            Your ultimate companion for railway travel. Track trains in
            real-time, check PNR status, and plan your journey with confidence.
          </p>
          <div className="hero-actions">
            <a href="#smart-travel-section" className="btn-primary">
              Get Started →
            </a>
            <Link to="/live-status" className="btn-secondary">
              Track Train
            </Link>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section id="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon blue">
              <Clock />
            </div>
            <h3 className="stat-number">24/7</h3>
            <p className="stat-label">Real-time Updates</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <MapPin />
            </div>
            <h3 className="stat-number">1000+</h3>
            <p className="stat-label">Stations Covered</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">
              <User />
            </div>
            <h3 className="stat-number">50K+</h3>
            <p className="stat-label">Daily Users</p>
          </div>
        </div>
      </section>

      {/* Smart Travel Section */}
      <section id="smart-travel-section">
        <div className="smart-travel-container">
          <h2 className="section-title">
            Everything You Need for{" "}
            <span className="highlight">Smart Travel</span>
          </h2>
          <p className="section-description">
            Comprehensive railway information at your fingertips. From searching
            trains to tracking live status.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section">
        <div className="features-container">
          <Link
            to="/search-trains"
            className="feature-card feature-button green"
          >
            <div className="feature-header">
              <div className="feature-icon">
                <Search />
              </div>
              <div className="feature-badge">Search</div>
            </div>
            <h3 className="feature-title">Smart Train Search</h3>
            <p className="feature-description">
              Find trains between stations with detailed route information.
            </p>
            <button className="explore-btn">Explore →</button>
          </Link>

          <Link to="/live-status" className="feature-card feature-button blue">
            <div className="feature-header">
              <div className="feature-icon">
                <Activity />
              </div>
              <div className="feature-badge">Live</div>
            </div>
            <h3 className="feature-title">Live Train Status</h3>
            <p className="feature-description">
              Track your train in real-time with current location and delays.
            </p>
            <button className="explore-btn">Explore →</button>
          </Link>

          <Link to="/pnr-status" className="feature-card feature-button purple">
            <div className="feature-header">
              <div className="feature-icon">
                <FileMinus />
              </div>
              <div className="feature-badge">PNR</div>
            </div>
            <h3 className="feature-title">PNR Status Check</h3>
            <p className="feature-description">
              Check booking status, seat allocation, and passenger details.
            </p>
            <button className="explore-btn">Explore →</button>
          </Link>

          <Link to="/schedule" className="feature-card feature-button orange">
            <div className="feature-header">
              <div className="feature-icon">
                <Calendar />
              </div>
              <div className="feature-badge">Schedule</div>
            </div>
            <h3 className="feature-title">Train Schedule</h3>
            <p className="feature-description">
              View detailed schedules with station timings and availability.
            </p>
            <button className="explore-btn">Explore →</button>
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="final-cta-section">
        <div className="final-cta-container">
          <h2 className="final-cta-title">
            Ready to Transform Your Railway Experience?
          </h2>
          <p className="final-cta-description">
            Join thousands of travelers who trust RailWise for their railway
            journey planning.
          </p>
          <button className="final-cta-btn">Start Tracking Now →</button>
        </div>
      </section>
    </>
  );
}

export default HomePage;
