import mongoose, { Document, Schema } from "mongoose";

interface IPNRStatus extends Document {
  key: string;
  data: any;
  timestamp: Date;
}

const pnrStatusSchema = new Schema<IPNRStatus>({
  key: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

const PNRStatus = mongoose.model<IPNRStatus>("PNRStatus", pnrStatusSchema);

export default PNRStatus;
