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
  rpiLowerAlarm: number | null,
  rpiUpperAlarm: number | null,
  cpiLowerAlarm: number | null,
  cpiUpperAlarm: number | null,
  wpiLowerAlarm: number | null,
  wpiUpperAlarm: number | null,
) => {
  const response = await axios.get(
    `http://localhost:8000/api/reservoir/WellMeasurements/${wellId}/`,
    {
      params: {
        rpiLowerAlarm,
        rpiUpperAlarm,
        cpiLowerAlarm,
        cpiUpperAlarm,
        wpiLowerAlarm,
        wpiUpperAlarm,
      },
    },
  );
  return response.data as IWellMeasurement[];
};
