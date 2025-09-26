import { useState } from "react";
import axios from "axios";
import {
  Calendar,
  Search,
  MapPin,
  Clock,
  Train,
  Filter,
  Utensils,
  Building2,
  Cross,
  AlertCircle,
  Info,
} from "lucide-react";
import FeaturePageLayout from "@/layouts/feature-page";
import "./styles.css";

interface StationScheduleItem {
  station_name: string;
  station_code: string;
  state_name?: string;
  day: number;
  std_min: number;
  lat?: string;
  lng?: string;
  stop: boolean;
  platform_number: number;
  food_available?: boolean;
  hotel_available?: boolean;
  hospital_available?: boolean;
}

type ScheduleData = StationScheduleItem[];

function SchedulePage() {
  const [trainNumber, setTrainNumber] = useState("");
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showStopsOnly, setShowStopsOnly] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleTrainNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
    setTrainNumber(value);
  };

  const handleGetSchedule = async () => {
    if (!trainNumber.trim()) return;

    setIsLoading(true);
    setError(null);
    setScheduleData(null);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/irctc/train-schedule/${trainNumber}`
      );

      // API might return { success: boolean, data: [...], message?: string, error?: string }
      if (response.data && response.data.success && response.data.data) {
        setScheduleData(response.data.data as ScheduleData);
      } else {
        const msg =
          response.data?.error ||
          response.data?.message ||
          "Train schedule not found";
        setError(msg);
      }
    } catch (err) {
      console.error("Train schedule error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("Train schedule not found");
        } else if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to fetch train schedule. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (stdMin: number) => {
    const hours = Math.floor(stdMin / 60);
    const minutes = stdMin % 60;
    const period = hours >= 24 ? " +1" : hours >= 48 ? " +2" : "";
    const displayHours = hours % 24;
    return `${displayHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}${period}`;
  };

  const formatDuration = (fromMin: number, toMin: number) => {
    const diffMin = toMin - fromMin;
    const hours = Math.floor(diffMin / 60);
    const minutes = diffMin % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const filteredStations = scheduleData
    ? scheduleData.filter((station) => {
        const dayFilter = selectedDay ? station.day === selectedDay : true;
        const stopFilter = showStopsOnly ? station.stop : true;
        return dayFilter && stopFilter;
      })
    : [];

  const uniqueDays = scheduleData
    ? [...new Set(scheduleData.map((station) => station.day))].sort()
    : [];

  const getTotalStops = () => {
    return scheduleData
      ? scheduleData.filter((station) => station.stop).length
      : 0;
  };

  const getTotalDuration = () => {
    if (!scheduleData || scheduleData.length < 2) return "N/A";
    const start = scheduleData[0].std_min;
    const end = scheduleData[scheduleData.length - 1].std_min;
    return formatDuration(start, end);
  };

  const getSourceDestination = () => {
    if (!scheduleData || scheduleData.length < 2)
      return { source: "N/A", destination: "N/A" };
    return {
      source: scheduleData[0].station_name,
      destination: scheduleData[scheduleData.length - 1].station_name,
    };
  };

  return (
    <FeaturePageLayout
      icon={Calendar}
      title="Train Schedule"
      description="View detailed train schedules and seat availability"
    >
      {/* Get Train Schedule Section */}
      <div className="schedule-form-section">
        <h2 className="form-title">Get Train Schedule</h2>
        <p className="form-subtitle">
          Enter train number to view complete schedule and availability
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
            <button
              type="button"
              onClick={handleGetSchedule}
              className="schedule-button"
              disabled={!trainNumber.trim() || isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner" />
              ) : (
                <Search size={20} />
              )}
              {isLoading ? "Loading..." : "Get Schedule"}
            </button>
          </div>
          <p className="demo-text">
            Try demo train: 12321 (with schedule) or 00000 (not found)
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
            <h3>Schedule Not Found</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Schedule Results */}
      {scheduleData && (
        <div className="schedule-container">
          {/* Header Section */}
          <div className="schedule-header">
            <div className="header-content">
              <h2 className="schedule-title">
                <Train size={24} />
                Train Schedule
              </h2>
              <div className="train-number-badge">Train {trainNumber}</div>
            </div>
            <div className="route-info">
              <div className="route-details">
                <span className="route-text">
                  {getSourceDestination().source} →{" "}
                  {getSourceDestination().destination}
                </span>
              </div>
              <div className="journey-stats">
                <span>{getTotalStops()} stops</span>
                <span>•</span>
                <span>{getTotalDuration()}</span>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="filters-card">
            <h3>
              <Filter size={20} />
              Filters
            </h3>
            <div className="filters-container">
              <div className="filter-group">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={showStopsOnly}
                    onChange={(e) => setShowStopsOnly(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Show stops only
                </label>
              </div>
              <div className="filter-group">
                <label htmlFor="day-select">Day:</label>
                <select
                  id="day-select"
                  value={selectedDay || ""}
                  onChange={(e) =>
                    setSelectedDay(
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                  className="day-select"
                >
                  <option value="">All days</option>
                  {uniqueDays.map((day) => (
                    <option key={day} value={day}>
                      Day {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule List */}
          <div className="schedule-list-card">
            <h3>
              <MapPin size={20} />
              Station Schedule ({filteredStations.length} stations)
            </h3>
            <div className="stations-list">
              {filteredStations.map((station, index) => (
                <div
                  key={`${station.station_code}-${index}`}
                  className={`station-item ${
                    station.stop ? "is-stop" : "no-stop"
                  }`}
                >
                  <div className="station-row">
                    <div className="station-left">
                      <div className="station-name-row">
                        <h4 className="station-name">{station.station_name}</h4>
                        <span className="station-code">
                          ({station.station_code})
                        </span>
                        {station.stop && (
                          <div className="stop-indicator">●</div>
                        )}
                      </div>
                      <div className="station-meta-row">
                        <div className="time-display">
                          <Clock size={14} />
                          <span className="arrival-time">
                            {formatTime(station.std_min)}
                          </span>
                        </div>
                        <span className="day-badge">D{station.day}</span>
                        {station.state_name && (
                          <span className="state-name">
                            {station.state_name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="station-right">
                      {station.stop && station.platform_number > 0 && (
                        <div className="platform-badge">
                          P{station.platform_number}
                        </div>
                      )}
                      <div className="amenities-compact">
                        {station.food_available && (
                          <div
                            className="amenity-compact"
                            title="Food Available"
                          >
                            <Utensils size={14} />
                          </div>
                        )}
                        {station.hotel_available && (
                          <div
                            className="amenity-compact"
                            title="Hotel Available"
                          >
                            <Building2 size={14} />
                          </div>
                        )}
                        {station.hospital_available && (
                          <div
                            className="amenity-compact"
                            title="Hospital Available"
                          >
                            <Cross size={14} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="summary-card">
            <h3>
              <Info size={20} />
              Journey Summary
            </h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Total Stations</span>
                <span className="summary-value">{scheduleData.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Stops</span>
                <span className="summary-value">{getTotalStops()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Duration</span>
                <span className="summary-value">{getTotalDuration()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Journey Days</span>
                <span className="summary-value">{uniqueDays.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </FeaturePageLayout>
  );
}

export default SchedulePage;
