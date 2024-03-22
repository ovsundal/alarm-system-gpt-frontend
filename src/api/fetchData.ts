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

export const fetchSendMessage = async (message: string) => {
  const response = (
    await axios.post("http://localhost:8000/api/chat/Chat/", {
      user_prompt: message,
    })
  ).data as ChatResponse;
  console.log(response);
  return {
    position: "left",
    title: "Alarm Bot",
    date: new Date().getTime(),
    text: response.output.chat_response,
  } as Message;
};

export type Message = {
  position: "left" | "right";
  title: string;
  text: string;
  date: number;
};

type ChatResponse = {
  input: string;
  output: {
    extract_data_params: ExtractDataParams;
    data_to_plot: any[];
    original_query: string;
    chat_response: string;
  };
};

type ExtractDataParams = {
  well_name: string;
  x_axis_dimension: string;
  y_axis_dimensions: string[];
  graph_description: string;
};
