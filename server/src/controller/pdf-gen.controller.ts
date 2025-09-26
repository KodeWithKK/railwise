import axios from "axios";

import { rapidApiHeaders } from "../config/headers";
import { asyncHandler } from "../utils/async-handler";

export const searchTrains = asyncHandler(async (req, res) => {
  const { source, destination, hours } = req.query;

  if (!source || !destination || !hours) {
    return res
      .status(400)
      .json({ error: "Source, destination, and hours are required" });
  }
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://irctc-api2.p.rapidapi.com/liveStation",
      params: { source, destination, hours },
      headers: rapidApiHeaders,
    });
    return res.status(200).json(response.data);
  } catch (error) {
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

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://irctc-api2.p.rapidapi.com/liveTrain",
      params: { trainNumber, startDay },
      headers: rapidApiHeaders,
    });
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getPNRStatus = asyncHandler(async (req, res) => {
  const { pnr } = req.params;

  if (!pnr) {
    return res.status(400).json({ error: "PNR number is required" });
  }

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://irctc-api2.p.rapidapi.com/pnrStatus",
      params: { pnr },
      headers: rapidApiHeaders,
    });
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getTrainSchedule = asyncHandler(async (req, res) => {
  const { trainNumber } = req.params;

  if (!trainNumber) {
    return res.status(400).json({ error: "Train number is required" });
  }

  try {
    const response = await axios.request({
      method: "GET",
      url: "https://irctc-api2.p.rapidapi.com/trainSchedule",
      params: { trainNumber },
      headers: rapidApiHeaders,
    });
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
