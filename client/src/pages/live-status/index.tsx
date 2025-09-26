import { useState } from "react";
import { Activity } from "lucide-react";
import FeaturePageLayout from "@/layouts/feature-page";
import "./styles.css";

function LiveStatusPage() {
  const [trainNumber, setTrainNumber] = useState("");

  const handleTrackTrain = () => {
    console.log("Tracking train:", trainNumber);
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

          {/* Track Button */}
          <button
            type="button"
            onClick={handleTrackTrain}
            className="track-button"
            disabled={!trainNumber.trim()}
          >
            <Activity size={20} />
            Track Train
          </button>
        </div>
      </div>
    </FeaturePageLayout>
  );
}

export default LiveStatusPage;
