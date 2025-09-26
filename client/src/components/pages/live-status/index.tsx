import { useState } from "react";
import axios from "axios";
import {
  Activity,
  Search,
  MapPin,
  Clock,
  Navigation,
  Train,
  AlertCircle,
} from "lucide-react";
import FeaturePageLayout from "@/components/layouts/feature-page";
import "./styles.css";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface LocationInfo {
  label: string;
  message: string;
  hint?: string;
}

interface NextStoppageInfo {
  next_stoppage_title: string;
  next_stoppage: string;
  next_stoppage_time_diff: string;
  next_stoppage_delay: number;
}

interface LiveTrainApiData {
  train_number: string;
  train_name: string;
  status: string;
  delay: number;
  distance_from_source: number;
  total_distance: number;
  current_station_name: string;
  eta: string;
  etd: string;
  next_stoppage_info: NextStoppageInfo;
  current_location_info: LocationInfo[];
  upcoming_stations_count: number;
}

type LiveTrainData = LiveTrainApiData;

function LiveStatusPage() {
  const [trainNumber, setTrainNumber] = useState("");
  const [startDay, setStartDay] = useState("1"); // Default to today
  const [trainData, setTrainData] = useState<LiveTrainData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrainNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
    setTrainNumber(value);
  };

  const handleTrackTrain = async () => {
    if (!trainNumber.trim()) return;

    setIsLoading(true);
    setError(null);
    setTrainData(null);

    try {
      const response = await axios.get<ApiResponse<LiveTrainApiData>>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/irctc/live-train-status`,
        {
          params: {
            trainNumber: trainNumber,
            startDay: startDay,
          },
        }
      );

      if (response.data && response.data.success) {
        setTrainData(response.data.data);
      } else {
        setError(response.data?.message || "Failed to fetch train status");
      }
    } catch (err) {
      console.error("Live train status error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("Train not found or not running today");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to fetch train status. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "T":
        return "Running";
      case "C":
        return "Cancelled";
      case "D":
        return "Diverted";
      case "R":
        return "Rescheduled";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "T":
        return "running";
      case "C":
        return "cancelled";
      case "D":
        return "diverted";
      case "R":
        return "rescheduled";
      default:
        return "unknown";
    }
  };

  const getDelayColor = (delay: number) => {
    if (delay === 0) return "ontime";
    if (delay <= 15) return "slight-delay";
    if (delay <= 60) return "moderate-delay";
    return "major-delay";
  };

  const formatTime = (time: string) => {
    return time || "N/A";
  };

  const getProgressPercentage = (covered: number, total: number) => {
    return Math.min(Math.round((covered / total) * 100), 100);
  };

  return (
    <FeaturePageLayout
      icon={Activity}
      title="Live Train Status"
      description="Track your train in real-time"
    >
      {/* Track Train Section */}
      <div className="track-form-section">
        <h2 className="form-title">Track Train</h2>
        <p className="form-subtitle">
          Enter train number to get real-time status
        </p>

        <div className="form-container">
          {/* Train Number Input */}
          <div className="search-input-field">
            <input
              type="text"
              value={trainNumber}
              onChange={handleTrainNumberChange}
              placeholder="e.g., 12321"
              className="train-input"
            />
            <select
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              className="start-day-select"
            >
              <option value="0">Yesterday</option>
              <option value="1">Today</option>
              <option value="2">Tomorrow</option>
            </select>
            <button
              type="button"
              onClick={handleTrackTrain}
              className="track-button"
              disabled={!trainNumber.trim() || isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner" />
              ) : (
                <Search size={20} />
              )}
              {isLoading ? "Tracking..." : "Track Train"}
            </button>
          </div>
          <p className="demo-text">
            Enter any train number and select travel day to track live status
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-container">
          <div className="error-icon">
            <AlertCircle size={24} />
          </div>
          <div className="error-content">
            <h3>Train Not Found</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Live Status Results */}
      {trainData && (
        <div className="live-status-container">
          {/* Header Section */}
          <div className="status-header">
            <div className="header-content">
              <h2 className="status-title">
                <Train size={24} />
                {trainData.train_name}
              </h2>
              <div className="train-number-badge">{trainData.train_number}</div>
            </div>
            <div className="status-info">
              <div
                className={`train-status ${getStatusColor(trainData.status)}`}
              >
                {getStatusText(trainData.status)}
              </div>
              <div className={`delay-info ${getDelayColor(trainData.delay)}`}>
                {trainData.delay === 0
                  ? "On Time"
                  : `${trainData.delay}m delay`}
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="progress-card">
            <h3>
              <Navigation size={20} />
              Journey Progress
            </h3>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${getProgressPercentage(
                      trainData.distance_from_source,
                      trainData.total_distance
                    )}%`,
                  }}
                />
              </div>
              <div className="progress-stats">
                <span>{trainData.distance_from_source} km covered</span>
                <span>
                  {getProgressPercentage(
                    trainData.distance_from_source,
                    trainData.total_distance
                  )}
                  %
                </span>
                <span>{trainData.total_distance} km total</span>
              </div>
            </div>
          </div>

          {/* Current Location */}
          <div className="current-location-card">
            <h3>
              <MapPin size={20} />
              Current Location
            </h3>
            <div className="location-info">
              <div className="current-station">
                <span className="station-label">At Station:</span>
                <span className="station-name">
                  {trainData.current_station_name}
                </span>
              </div>
              <div className="timing-info">
                <div className="timing-item">
                  <span className="timing-label">ETA</span>
                  <span className="timing-value">
                    {formatTime(trainData.eta)}
                  </span>
                </div>
                <div className="timing-item">
                  <span className="timing-label">ETD</span>
                  <span className="timing-value">
                    {formatTime(trainData.etd)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Stoppage */}
          <div className="next-stoppage-card">
            <h3>
              <Clock size={20} />
              Next Stoppage
            </h3>
            <div className="next-stoppage-info">
              <div className="next-station">
                <span className="next-label">
                  {trainData.next_stoppage_info.next_stoppage_title}
                </span>
                <span className="next-station-name">
                  {trainData.next_stoppage_info.next_stoppage}
                </span>
              </div>
              <div className="next-timing">
                <span className="next-time">
                  {trainData.next_stoppage_info.next_stoppage_time_diff}
                </span>
                {trainData.next_stoppage_info.next_stoppage_delay > 0 && (
                  <span className="next-delay">
                    ({trainData.next_stoppage_info.next_stoppage_delay}m delay)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Location Updates */}
          <div className="location-updates-card">
            <h3>Recent Updates</h3>
            <div className="updates-list">
              {trainData.current_location_info.map((update, index) => (
                <div key={index} className="update-item">
                  <div className="update-time">{update.label}</div>
                  <div className="update-message">{update.message}</div>
                  {update.hint && (
                    <div className="update-hint">{update.hint}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="additional-info-card">
            <h3>Additional Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Upcoming Stations</span>
                <span className="info-value">
                  {trainData.upcoming_stations_count}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Distance Remaining</span>
                <span className="info-value">
                  {trainData.total_distance - trainData.distance_from_source} km
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </FeaturePageLayout>
  );
}

export default LiveStatusPage;
