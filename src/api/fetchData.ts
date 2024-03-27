import axios from "axios";
import { IWell } from "../models/IWell";
import { IWellMeasurement } from "../models/IWellMeasurement";
import { ILlmChatResponse } from "../models/ILlmChatResponse";

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

export const fetchSendMessage = async (
  message: string,
  rpiAlarmValues: number[],
  cpiAlarmValues: number[],
  wpiAlarmValues: number[],
) => {
  return (
    await axios.post("http://localhost:8000/api/chat/Chat/", {
      user_prompt: message,
      rpiAlarmValues,
      cpiAlarmValues,
      wpiAlarmValues,
    })
  ).data as ILlmChatResponse;
};
