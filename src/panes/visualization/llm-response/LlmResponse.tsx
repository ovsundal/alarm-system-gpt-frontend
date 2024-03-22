import React from "react";
import { ILlmChatResponse } from "../../../models/ILlmChatResponse";
import { Typography } from "@equinor/eds-core-react";
import styled from "styled-components";
import { LlmPerformanceIndicatorGraph } from "./LlmPerformanceIndicatorGraph";

export const LlmResponse: React.FC<{
  llmChatResponseGraphData: ILlmChatResponse;
}> = ({ llmChatResponseGraphData }) => {
  if (llmChatResponseGraphData?.output?.data_to_plot == null) {
    return <Typography>No data to plot</Typography>;
  }
  return (
    <div>
      <Typography>
        {`User query that triggered this graph: 
        "${decodeURIComponent(llmChatResponseGraphData.input!)}"`}
      </Typography>
      <ChartWrapper>
        <LlmPerformanceIndicatorGraph
          llmWellMeasurementData={llmChatResponseGraphData.output.data_to_plot}
          graphParameters={llmChatResponseGraphData.output.extract_data_params}
        />
      </ChartWrapper>
      <Typography>
        Graph description:{" "}
        {llmChatResponseGraphData.output.extract_data_params.graph_description}
      </Typography>
    </div>
  );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
