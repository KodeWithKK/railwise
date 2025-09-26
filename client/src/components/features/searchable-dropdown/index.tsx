import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import "./styles.css";

type Station = {
  stnCode: string;
  stnName: string;
  stnCity: string;
};

interface SearchableDropdownProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  stations: Station[];
}

function SearchableDropdown({
  id,
  label,
  placeholder,
  value,
  onChange,
  stations,
}: SearchableDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const station = stations.find((s) => s.stnCode === value);
      setSearchQuery(station ? `${station.stnName} (${station.stnCode})` : "");
    } else {
      setSearchQuery("");
    }
  }, [value, stations]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStations = stations.filter((station) => {
    if (searchQuery.length < 2) return false;
    const query = searchQuery.toLowerCase();
    return (
      station.stnName.toLowerCase().includes(query) ||
      station.stnCode.toLowerCase().includes(query) ||
      station.stnCity.toLowerCase().includes(query)
    );
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.length >= 2);

    if (query.length < 2) {
      onChange("");
    }
  };
  const handleStationSelect = (station: Station) => {
    setSearchQuery(`${station.stnName} (${station.stnCode})`);
    setShowSuggestions(false);
    onChange(station.stnCode);
  };

  return (
    <div className="station-field" ref={dropdownRef}>
      <label htmlFor={id}>{label}</label>
      <div className="searchable-dropdown">
        <input
          id={id}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="station-input"
          autoComplete="off"
        />
        <ChevronDown className="dropdown-icon" size={20} />

        {showSuggestions && filteredStations.length > 0 && (
          <div className="suggestions-list">
            {filteredStations.slice(0, 10).map((station) => (
              <div
                key={station.stnCode}
                className="suggestion-item"
                onClick={() => handleStationSelect(station)}
              >
                <div className="station-info">
                  <span className="station-name">{station.stnName}</span>
                  <span className="station-code">({station.stnCode})</span>
                </div>
                <span className="station-city">{station.stnCity}</span>
              </div>
            ))}
            {filteredStations.length > 10 && (
              <div className="more-results">
                +{filteredStations.length - 10} more results
              </div>
            )}
          </div>
        )}

        {showSuggestions &&
          searchQuery.length >= 2 &&
          filteredStations.length === 0 && (
            <div className="suggestions-list">
              <div className="no-results">No stations found</div>
            </div>
          )}
      </div>
    </div>
  );
}

export default SearchableDropdown;
