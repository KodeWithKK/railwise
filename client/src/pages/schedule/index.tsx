import { useState } from "react";
import { Calendar } from "lucide-react";
import FeaturePageLayout from "@/layouts/feature-page";
import "./styles.css";

function SchedulePage() {
  const [trainNumber, setTrainNumber] = useState("");

  const handleGetSchedule = () => {
    console.log("Getting train schedule:", trainNumber);
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
          <div className="input-field">
            <label htmlFor="train-number">Train Number</label>
            <input
              type="text"
              id="train-number"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              placeholder="e.g., 12001, 12002"
              className="train-input"
            />
          </div>

          {/* Get Schedule Button */}
          <button
            type="button"
            onClick={handleGetSchedule}
            className="schedule-button"
            disabled={!trainNumber.trim()}
          >
            <Calendar size={20} />
            Get Schedule
          </button>
        </div>
      </div>
    </FeaturePageLayout>
  );
}

export default SchedulePage;
