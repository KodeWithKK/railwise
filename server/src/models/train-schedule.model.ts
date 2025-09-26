import mongoose, { Document, Schema } from "mongoose";

interface ITrainSchedule extends Document {
  key: string;
  data: any;
  timestamp: Date;
}

const trainScheduleSchema = new Schema<ITrainSchedule>({
  key: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

const TrainSchedule = mongoose.model<ITrainSchedule>(
  "TrainSchedule",
  trainScheduleSchema,
);

export default TrainSchedule;
