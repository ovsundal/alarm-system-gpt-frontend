import React from "react";
import { Typography } from "@equinor/eds-core-react";
import styled from "styled-components";
import { LlmPerformanceIndicatorGraph } from "./LlmPerformanceIndicatorGraph";
import { ILlmPlotOutput } from "../../../models/ILlmPlotOutput";

export const LlmResponse: React.FC<{
  llmPlotOutput: ILlmPlotOutput;
}> = ({ llmPlotOutput }) => {
  if (Object.keys(llmPlotOutput).length === 0) {
    return <Typography>No data to plot</Typography>;
  }
  const formattedAlarmResponse = llmPlotOutput.alarm_response.split("\n");
  return (
    <div>
      <ChartWrapper>
        <LlmPerformanceIndicatorGraph
          llmWellMeasurementData={llmPlotOutput.data_to_plot}
          graphParameters={llmPlotOutput.extract_data_params}
          alarmLimits={llmPlotOutput.alarm_limits}
        />
      </ChartWrapper>
      <Typography variant={"h3"}>Graph description:</Typography>
      <Typography>
        {llmPlotOutput.extract_data_params.graph_description}
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
