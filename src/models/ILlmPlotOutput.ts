import { ILlmWellMeasurement } from "./ILlmWellMeasurement";
import { ExtractDataParams } from "./ILlmChatResponse";

export interface ILlmPlotOutput {
  extract_data_params: ExtractDataParams;
  data_to_plot: ILlmWellMeasurement[];
  chat_response: string;
  alarm_response: string[];
  alarm_limits: {
    rpi: number[];
    cpi: number[];
    wpi: number[];
  };
  trend_response: string[];
}
