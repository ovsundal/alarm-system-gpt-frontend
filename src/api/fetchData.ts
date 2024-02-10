import axios from "axios";
import { IWell } from "../models/IWell";
import { IWellMeasurement } from "../models/IWellMeasurement";

export const fetchWellData = async () => {
  const response = await axios.get(
    "http://localhost:8000/api/reservoir/Wells/",
  );

  return response.data as IWell[];
};

export const fetchWellMeasurements = async (
  wellId: number,
  alarmLower: number | null,
  alarmUpper: number | null,
) => {
  const response = await axios.get(
    `http://localhost:8000/api/reservoir/WellMeasurements/${wellId}/`,
    {
      params: {
        lowerAlarm: alarmLower,
        upperAlarm: alarmUpper,
      },
    },
  );
  return response.data as IWellMeasurement[];
};
