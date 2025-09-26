import mongoose, { Document, Schema } from "mongoose";

interface ISearchTrain extends Document {
  key: string;
  data: any;
  timestamp: Date;
}

const searchTrainSchema = new Schema<ISearchTrain>({
  key: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

const SearchTrain = mongoose.model<ISearchTrain>(
  "SearchTrain",
  searchTrainSchema,
);

export default SearchTrain;
