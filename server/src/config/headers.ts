import * as dotenv from "dotenv";

dotenv.config();

export const rapidApiHeaders = {
  "x-rapidapi-key": process.env.RAPID_API_KEY,
  "x-rapidapi-host": process.env.RAPID_API_HOST,
};
