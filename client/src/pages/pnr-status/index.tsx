import { useState } from "react";
import { FileText } from "lucide-react";
import FeaturePageLayout from "@/layouts/feature-page";
import "./styles.css";

function PNRStatusPage() {
  const [pnrNumber, setPnrNumber] = useState("");

  const handleCheckStatus = () => {
    console.log("Checking PNR status:", pnrNumber);
  };

  const handlePnrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Only digits, max 10
    setPnrNumber(value);
  };

  return (
    <FeaturePageLayout
      icon={FileText}
      title="PNR Status"
      description="Check your booking status and passenger details"
    >
      {/* Check PNR Status Section */}
      <div className="pnr-form-section">
        <h2 className="form-title">Check PNR Status</h2>
        <p className="form-subtitle">Enter your 10-digit PNR number</p>

        <div className="form-container">
          {/* PNR Number Input */}
          <div className="input-field">
            <label htmlFor="pnr-number">PNR Number</label>
            <input
              type="text"
              id="pnr-number"
              value={pnrNumber}
              onChange={handlePnrChange}
              placeholder="Enter 10-digit PNR number"
              className="pnr-input"
              maxLength={10}
            />
            <p className="demo-text">Try demo PNR: 1234567890 or 9876543210</p>
          </div>

          {/* Check Status Button */}
          <button
            type="button"
            onClick={handleCheckStatus}
            className="check-button"
            disabled={pnrNumber.length !== 10}
          >
            <FileText size={20} />
            Check Status
          </button>
        </div>
      </div>
    </FeaturePageLayout>
  );
}

export default PNRStatusPage;
