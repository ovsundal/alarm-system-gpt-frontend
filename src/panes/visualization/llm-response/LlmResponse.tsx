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
  const formattedAlarmResponse =
    llmChatResponseGraphData.output.alarm_response.split("\n");
  return (
    <div>
      <Typography>
        {`User query that triggered this graph: 
        "${llmChatResponseGraphData.input}"`}
      </Typography>
      <ChartWrapper>
        <LlmPerformanceIndicatorGraph
          llmWellMeasurementData={llmChatResponseGraphData.output.data_to_plot}
          graphParameters={llmChatResponseGraphData.output.extract_data_params}
          alarmLimits={llmChatResponseGraphData.output.alarm_limits}
        />
      </ChartWrapper>
      <Typography variant={"h3"}>Graph description:</Typography>
      <Typography>
        {llmChatResponseGraphData.output.extract_data_params.graph_description}
      </Typography>
      <br />
      <br />
      <Typography variant={"h3"}>
        PIs out of alarm range at the following points:
      </Typography>
      {formattedAlarmResponse.map((alarmResponse, index) => (
        <Typography key={index}>{alarmResponse}</Typography>
      ))}
    </div>
  );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
