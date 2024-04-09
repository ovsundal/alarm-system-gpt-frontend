import { ILlmPlotOutput } from "./ILlmPlotOutput";

export interface ILlmChatResponse {
  original_query: string;
  chat_response: string;
  plotting?: ILlmPlotOutput;
}

export type ExtractDataParams = {
  x_axis_dimension: string;
  y_axis_dimensions: string[];
  graph_description: string;
};
