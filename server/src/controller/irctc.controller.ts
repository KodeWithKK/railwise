import axios from "axios";

import { rapidApiHeaders } from "../config/headers";
import LiveTrainStatus from "../models/live-train-status.model";
import PNRStatus from "../models/pnr-status.model";
import SearchTrain from "../models/search-train.model";
import TrainSchedule from "../models/train-schedule.model";
import { asyncHandler } from "../utils/async-handler";

// Cache expiration times in milliseconds
const CACHE_EXPIRATION = {
  searchTrains: 60 * 60 * 1000, // 1 hours
  liveTrainStatus: 60 * 1000, // 1 minutes
  pnrStatus: 60 * 60 * 1000, // 1 hour
  trainSchedule: 60 * 60 * 1000, // 1 hours
};

export const searchTrains = asyncHandler(async (req, res) => {
  const { source, destination, hours } = req.query;

  if (!source || !destination || !hours) {
    return res
      .status(400)
      .json({ error: "Source, destination, and hours are required" });
  }

  const key = `${source}_${destination}_${hours}`;

  try {
    const cached = await SearchTrain.findOne({ key });
    if (
      cached &&
      Date.now() - cached.timestamp.getTime() < CACHE_EXPIRATION.searchTrains
    ) {
      return res.status(200).json(cached.data);
    }

    const response = await axios.request({
      method: "GET",
      url: "https://irctc-api2.p.rapidapi.com/liveStation",
      params: { source, destination, hours },
      headers: rapidApiHeaders,
    });

    await SearchTrain.findOneAndUpdate(
      { key },
      { data: response.data, timestamp: Date.now() },
      { upsert: true, new: true },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getLiveTrainStatus = asyncHandler(async (req, res) => {
  const { trainNumber, startDay } = req.query;

  if (!trainNumber || !startDay) {
    return res
      .status(400)
      .json({ error: "Train number and start day are required" });
  }

  const key = `${trainNumber}_${startDay}`;

  try {
    const cached = await LiveTrainStatus.findOne({ key });
    if (
      cached &&
      Date.now() - cached.timestamp.getTime() < CACHE_EXPIRATION.liveTrainStatus
    ) {
      return res.status(200).json(cached.data);
    }

    const response = await axios.request({
      method: "GET",
      url: "https://irctc-api2.p.rapidapi.com/liveTrain",
      params: { trainNumber, startDay },
      headers: rapidApiHeaders,
    });

    await LiveTrainStatus.findOneAndUpdate(
      { key },
      { data: response.data, timestamp: Date.now() },
      { upsert: true, new: true },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getPNRStatus = asyncHandler(async (req, res) => {
  const { pnr } = req.params;

  if (!pnr) {
    return res.status(400).json({ error: "PNR number is required" });
  }

  const key = pnr;

  try {
    const cached = await PNRStatus.findOne({ key });
    if (
      cached &&
      Date.now() - cached.timestamp.getTime() < CACHE_EXPIRATION.pnrStatus
    ) {
      return res.status(200).json(cached.data);
    }

    const response = await axios.request({
      method: "GET",
      url: "https://irctc-api2.p.rapidapi.com/pnrStatus",
      params: { pnr },
      headers: rapidApiHeaders,
    });

    await PNRStatus.findOneAndUpdate(
      { key },
      { data: response.data, timestamp: Date.now() },
      { upsert: true, new: true },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getTrainSchedule = asyncHandler(async (req, res) => {
  const { trainNumber } = req.params;

  if (!trainNumber) {
    return res.status(400).json({ error: "Train number is required" });
  }

  const key = trainNumber;

  try {
    const cached = await TrainSchedule.findOne({ key });
    if (
      cached &&
      Date.now() - cached.timestamp.getTime() < CACHE_EXPIRATION.trainSchedule
    ) {
      return res.status(200).json(cached.data);
    }

    const response = await axios.request({
      method: "GET",
      url: "https://irctc-api2.p.rapidapi.com/trainSchedule",
      params: { trainNumber },
      headers: rapidApiHeaders,
    });

    await TrainSchedule.findOneAndUpdate(
      { key },
      { data: response.data, timestamp: Date.now() },
      { upsert: true, new: true },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
