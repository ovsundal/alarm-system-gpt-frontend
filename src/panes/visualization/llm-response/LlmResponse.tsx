import React from "react";
import { ILlmChatResponse } from "../../../models/ILlmChatResponse";

export const LlmResponse: React.FC<{
  llmChatResponseGraphData: ILlmChatResponse;
}> = ({ llmChatResponseGraphData }) => {
  console.log(llmChatResponseGraphData?.output?.data_to_plot);
  return <div>Panel one</div>;
};
