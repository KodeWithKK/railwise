import { useState } from "react";
import axios from "axios";
import {
  FileText,
  Search,
  Clock,
  MapPin,
  Users,
  IndianRupee,
  Star,
  Train,
} from "lucide-react";
import FeaturePageLayout from "@/components/layouts/feature-page";
import "./styles.css";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface Passenger {
  number: number;
  bookingStatus: string;
  currentStatus: string;
  coach: string;
  berth: string;
}

interface Fare {
  bookingFare: number;
  ticketFare: number;
}

interface Ratings {
  overall: number;
  food: number;
  punctuality: number;
  cleanliness: number;
  ratingCount: number;
}

interface PNRApiData {
  pnr: string;
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  class: string;
  boardingPoint: string;
  chartPrepared: boolean;
  trainStatus: string;
  passengers: Passenger[];
  fare: Fare;
  ratings: Ratings;
  hasPantry: boolean;
}

type PNRData = PNRApiData;

function PNRStatusPage() {
  const [pnrNumber, setPnrNumber] = useState("");
  const [pnrData, setPnrData] = useState<PNRData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePnrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Only digits, max 10
    setPnrNumber(value);
  };

  const handleCheckStatus = async () => {
    if (pnrNumber.length !== 10) return;

    setIsLoading(true);
    setError(null);
    setPnrData(null);

    try {
      const response = await axios.get<ApiResponse<PNRApiData>>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/irctc/pnr-status/${pnrNumber}`
      );

      if (response.data && response.data.success && response.data.data) {
        setPnrData(response.data.data);
      } else {
        // Handle API response with success: false
        const errorMessage =
          response.data?.error ||
          response.data?.message ||
          "Failed to fetch PNR status";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("PNR status error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("PNR not found. Please check your PNR number.");
        } else if (err.response?.data?.error) {
          // Handle API error format: {"error": "message"}
          setError(err.response.data.error);
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to fetch PNR status. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    if (status.includes("CNF")) return "confirmed";
    if (status.includes("RAC")) return "rac";
    if (status.includes("WL") || status.includes("GNWL")) return "waiting";
    return "default";
  };

  return (
    <FeaturePageLayout
      icon={FileText}
      title="PNR Status"
      description="Check your booking status and passenger details"
    >
      {/* Search Section */}
      <div className="pnr-search-section">
        <h2 className="search-title">Check PNR Status</h2>
        <p className="search-subtitle">Enter your 10-digit PNR number</p>

        <div className="search-container">
          <div className="search-input-field">
            <input
              type="text"
              value={pnrNumber}
              onChange={handlePnrChange}
              placeholder="Enter 10-digit PNR number"
              className="pnr-search-input"
              maxLength={10}
            />
            <button
              type="button"
              onClick={handleCheckStatus}
              className="search-button"
              disabled={pnrNumber.length !== 10 || isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner" />
              ) : (
                <Search size={20} />
              )}
              {isLoading ? "Checking..." : "Check Status"}
            </button>
          </div>
          <p className="demo-text">
            Enter any valid 10-digit PNR number to check status
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* PNR Status Results */}
      {pnrData && (
        <div className="pnr-results-container">
          {/* Header Section */}
          <div className="result-header">
            <div className="header-content">
              <h2 className="result-title">
                <Train size={24} />
                {pnrData.trainName} ({pnrData.trainNumber})
              </h2>
              <div className="pnr-badge">PNR: {pnrData.pnr}</div>
            </div>
            <div className="journey-info">
              <div className="route">
                <MapPin size={16} />
                {pnrData.source} → {pnrData.destination}
              </div>
              <div className="journey-date">
                <Clock size={16} />
                {pnrData.journeyDate}
              </div>
            </div>
          </div>

          {/* Train Status */}
          {pnrData.trainStatus !== "Status not available" && (
            <div className="status-card">
              <h3>Train Status</h3>
              <p className="train-status">{pnrData.trainStatus}</p>
            </div>
          )}

          {/* Journey Details */}
          <div className="journey-details-card">
            <h3>Journey Details</h3>
            <div className="journey-grid">
              <div className="journey-item">
                <span className="label">Departure</span>
                <span className="value">{pnrData.departureTime}</span>
              </div>
              <div className="journey-item">
                <span className="label">Arrival</span>
                <span className="value">{pnrData.arrivalTime}</span>
              </div>
              <div className="journey-item">
                <span className="label">Duration</span>
                <span className="value">{pnrData.duration}</span>
              </div>
              <div className="journey-item">
                <span className="label">Class</span>
                <span className="value">{pnrData.class}</span>
              </div>
              <div className="journey-item">
                <span className="label">Boarding Point</span>
                <span className="value">{pnrData.boardingPoint}</span>
              </div>
              <div className="journey-item">
                <span className="label">Chart Prepared</span>
                <span
                  className={`value ${
                    pnrData.chartPrepared ? "chart-yes" : "chart-no"
                  }`}
                >
                  {pnrData.chartPrepared ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="passengers-card">
            <h3>
              <Users size={20} />
              Passenger Details
            </h3>
            <div className="passengers-list">
              {pnrData.passengers.map((passenger) => (
                <div key={passenger.number} className="passenger-item">
                  <div className="passenger-number">
                    Passenger {passenger.number}
                  </div>
                  <div className="passenger-details">
                    <div className="status-info">
                      <span className="booking-status">
                        Booking: {passenger.bookingStatus}
                      </span>
                      <span
                        className={`current-status ${getStatusColor(
                          passenger.currentStatus
                        )}`}
                      >
                        Current: {passenger.currentStatus}
                      </span>
                    </div>
                    {passenger.coach !== "N/A" && (
                      <div className="seat-info">
                        Coach: {passenger.coach} | Berth: {passenger.berth}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fare Details */}
          <div className="fare-card">
            <h3>
              <IndianRupee size={20} />
              Fare Details
            </h3>
            <div className="fare-grid">
              <div className="fare-item">
                <span className="label">Booking Fare</span>
                <span className="value">₹{pnrData.fare.bookingFare}</span>
              </div>
              <div className="fare-item">
                <span className="label">Ticket Fare</span>
                <span className="value">₹{pnrData.fare.ticketFare}</span>
              </div>
            </div>
          </div>

          {/* Train Ratings */}
          <div className="ratings-card">
            <h3>
              <Star size={20} />
              Train Ratings
            </h3>
            <div className="ratings-grid">
              <div className="rating-item">
                <span className="label">Overall</span>
                <div className="rating-value">
                  <Star size={16} fill="currentColor" />
                  {pnrData.ratings.overall}
                </div>
              </div>
              <div className="rating-item">
                <span className="label">Food</span>
                <div className="rating-value">
                  <Star size={16} fill="currentColor" />
                  {pnrData.ratings.food}
                </div>
              </div>
              <div className="rating-item">
                <span className="label">Punctuality</span>
                <div className="rating-value">
                  <Star size={16} fill="currentColor" />
                  {pnrData.ratings.punctuality}
                </div>
              </div>
              <div className="rating-item">
                <span className="label">Cleanliness</span>
                <div className="rating-value">
                  <Star size={16} fill="currentColor" />
                  {pnrData.ratings.cleanliness}
                </div>
              </div>
            </div>
            <div className="rating-count">
              Based on {pnrData.ratings.ratingCount.toLocaleString()} reviews
            </div>
            {pnrData.hasPantry && (
              <div className="pantry-info">🍽️ Pantry Car Available</div>
            )}
          </div>
        </div>
      )}
    </FeaturePageLayout>
  );
}

export default PNRStatusPage;
