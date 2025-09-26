import { useState } from "react";
import axios from "axios";
import {
  Search,
  ArrowUpDown,
  Train,
  Clock,
  AlertCircle,
  ChevronRight,
  Zap,
} from "lucide-react";
import SearchableDropdown from "@/components/searchable-dropdown";
import FeaturePageLayout from "@/layouts/feature-page";
import { stations } from "@/data/railway-stations-list";
import "./styles.css";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface Train {
  trainNumber: string;
  trainName: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  expectedArrival: string;
  expectedDeparture: string;
  delay: string;
  platform: string;
}

interface SearchTrainApiData {
  source: string;
  destination: string;
  hours: string;
  trainCount: number;
  trains: Train[];
}

function SearchTrainPage() {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [hours, setHours] = useState("4");
  const [searchData, setSearchData] = useState<SearchTrainApiData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearch = async () => {
    if (!fromStation || !toStation) {
      setError("Please select both source and destination stations");
      return;
    }

    if (fromStation === toStation) {
      setError("Source and destination stations cannot be the same");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchData(null);

    try {
      const response = await axios.get<ApiResponse<SearchTrainApiData>>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/irctc/search-train`,
        {
          params: {
            source: fromStation,
            destination: toStation,
            hours: hours,
          },
        }
      );

      if (response.data && response.data.success) {
        setSearchData(response.data.data);
      } else {
        setError(response.data?.message || "Failed to fetch train data");
      }
    } catch (err) {
      console.error("Search train error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("No trains found for the selected route and time");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to search trains. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStationName = (code: string) => {
    const station = stations.find((s) => s.stnCode === code);
    return station ? `${station.stnName} (${station.stnCity})` : code;
  };

  const formatTime = (time: string) => {
    return time || "N/A";
  };

  const getDelayStatus = (delay: string) => {
    if (delay === "00:00") return "ontime";
    return "delayed";
  };

  const formatDelay = (delay: string) => {
    if (delay === "00:00") return "On Time";
    const [hours, minutes] = delay.split(":");
    if (hours === "00") return `${parseInt(minutes)}m late`;
    return `${parseInt(hours)}h ${parseInt(minutes)}m late`;
  };

  return (
    <FeaturePageLayout
      icon={Search}
      title="Search Trains"
      description="Find trains between any two stations"
    >
      {/* Search Form Section */}
      <div className="search-form-section">
        <h2 className="form-title">Search Trains</h2>
        <p className="form-subtitle">
          Enter your travel details to find available trains
        </p>

        <div className="form-container">
          {/* Station Selection Row */}
          <div className="station-row">
            <SearchableDropdown
              id="from-station"
              label="From Station"
              placeholder="Search source station..."
              value={fromStation}
              onChange={setFromStation}
              stations={stations}
            />

            <button
              type="button"
              onClick={handleSwapStations}
              className="swap-button"
              aria-label="Swap stations"
            >
              <ArrowUpDown size={20} />
            </button>

            <SearchableDropdown
              id="to-station"
              label="To Station"
              placeholder="Search destination station..."
              value={toStation}
              onChange={setToStation}
              stations={stations}
            />
          </div>

          {/* Hours Selection */}
          <div className="hours-field">
            <label htmlFor="hours">Search Hours</label>
            <select
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="hours-select"
            >
              <option value="2">2 hours</option>
              <option value="4">4 hours</option>
              <option value="6">6 hours</option>
              <option value="8">8 hours</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner" />
            ) : (
              <Search size={20} />
            )}
            {isLoading ? "Searching..." : "Search Trains"}
          </button>

          <p className="demo-text">
            Try demo: NDLS → GKP (found) or NDLS → CSMT (not found)
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
            <h3>Search Error</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchData && (
        <div className="search-results-container">
          {/* Results Header */}
          <div className="results-header">
            <div className="header-content">
              <h2 className="results-title">
                <Train size={24} />
                Search Results
              </h2>
              <div className="train-count-badge">
                {searchData.trainCount} trains found
              </div>
            </div>
            <div className="route-info">
              <div className="route-details">
                <span className="route-text">
                  {getStationName(searchData.source)} →{" "}
                  {getStationName(searchData.destination)}
                </span>
              </div>
              <div className="search-params">
                <span>{searchData.hours} hour search window</span>
              </div>
            </div>
          </div>

          {/* Train List */}
          <div className="trains-list-card">
            <h3>
              <Zap size={20} />
              Available Trains
            </h3>
            <div className="trains-list">
              {searchData.trains.map((train, index) => (
                <div
                  key={`${train.trainNumber}-${index}`}
                  className="train-item"
                >
                  <div className="train-row">
                    <div className="train-info">
                      <div className="train-header">
                        <h4 className="train-name">{train.trainName}</h4>
                        <span className="train-number">
                          #{train.trainNumber}
                        </span>
                      </div>
                      <div className="timing-row">
                        <div className="time-group">
                          <div className="time-label">Departure</div>
                          <div className="time-info">
                            <Clock size={16} />
                            <span className="scheduled-time">
                              {formatTime(train.scheduledDeparture)}
                            </span>
                            {train.expectedDeparture !==
                              train.scheduledDeparture && (
                              <span className="expected-time">
                                → {formatTime(train.expectedDeparture)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="journey-arrow">
                          <ChevronRight size={20} />
                        </div>

                        <div className="time-group">
                          <div className="time-label">Arrival</div>
                          <div className="time-info">
                            <Clock size={16} />
                            <span className="scheduled-time">
                              {formatTime(train.scheduledArrival)}
                            </span>
                            {train.expectedArrival !==
                              train.scheduledArrival && (
                              <span className="expected-time">
                                → {formatTime(train.expectedArrival)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="train-status">
                      <div
                        className={`delay-status ${getDelayStatus(
                          train.delay
                        )}`}
                      >
                        {formatDelay(train.delay)}
                      </div>
                      {train.platform && (
                        <div className="platform-info">
                          Platform {train.platform}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search Summary */}
          <div className="search-summary-card">
            <h3>Search Summary</h3>
            <div className="summary-stats">
              <div className="summary-stat">
                <span className="stat-label">Trains Found</span>
                <span className="stat-value">{searchData.trainCount}</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Search Window</span>
                <span className="stat-value">{searchData.hours} hours</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">On Time</span>
                <span className="stat-value">
                  {searchData.trains.filter((t) => t.delay === "00:00").length}
                </span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Delayed</span>
                <span className="stat-value">
                  {searchData.trains.filter((t) => t.delay !== "00:00").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </FeaturePageLayout>
  );
}

export default SearchTrainPage;
