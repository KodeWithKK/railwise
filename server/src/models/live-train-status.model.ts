import mongoose, { Document, Schema } from "mongoose";

interface ILiveTrainStatus extends Document {
  key: string;
  data: any;
  timestamp: Date;
}

const liveTrainStatusSchema = new Schema<ILiveTrainStatus>({
  key: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

const LiveTrainStatus = mongoose.model<ILiveTrainStatus>(
  "LiveTrainStatus",
  liveTrainStatusSchema,
);

export default LiveTrainStatus;
