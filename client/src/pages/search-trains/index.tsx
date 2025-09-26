import { useState } from "react";
import { Search, ArrowUpDown, Calendar } from "lucide-react";
import FeaturePageLayout from "@/layouts/feature-page";
import "./styles.css";

function SearchTrainPage() {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [travelDate, setTravelDate] = useState("September 26th, 2025");

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearch = () => {
    console.log("Searching trains:", { fromStation, toStation, travelDate });
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
            <div className="station-field">
              <label htmlFor="from-station">From Station</label>
              <select
                id="from-station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="station-select"
              >
                <option value="">Select source station</option>
                <option value="mumbai">Mumbai Central</option>
                <option value="delhi">New Delhi</option>
                <option value="bangalore">Bangalore City</option>
                <option value="kolkata">Howrah Junction</option>
                <option value="chennai">Chennai Central</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleSwapStations}
              className="swap-button"
              aria-label="Swap stations"
            >
              <ArrowUpDown size={20} />
            </button>

            <div className="station-field">
              <label htmlFor="to-station">To Station</label>
              <select
                id="to-station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="station-select"
              >
                <option value="">Select destination station</option>
                <option value="mumbai">Mumbai Central</option>
                <option value="delhi">New Delhi</option>
                <option value="bangalore">Bangalore City</option>
                <option value="kolkata">Howrah Junction</option>
                <option value="chennai">Chennai Central</option>
              </select>
            </div>
          </div>

          {/* Travel Date Row */}
          <div className="date-row">
            <label htmlFor="travel-date">Travel Date</label>
            <div className="date-input-container">
              <Calendar size={20} />
              <input
                type="text"
                id="travel-date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="date-input"
                readOnly
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="search-button"
          >
            <Search size={20} />
            Search Trains
          </button>
        </div>
      </div>
    </FeaturePageLayout>
  );
}

export default SearchTrainPage;
