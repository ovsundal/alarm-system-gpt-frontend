import { ILlmWellMeasurement } from "./ILlmWellMeasurement";

export interface ILlmChatResponse {
  input?: string;
  output?: ChatOutput;
}

type ChatOutput = {
  extract_data_params: ExtractDataParams;
  data_to_plot: ILlmWellMeasurement[];
  original_query: string;
  chat_response: string;
  alarm_limits: {
    rpi_alarms: number[];
    cpi_alarms: number[];
    wpi_alarms: number[];
  };
};

export type ExtractDataParams = {
  well_name: string;
  x_axis_dimension: string;
  y_axis_dimensions: string[];
  graph_description: string;
};
