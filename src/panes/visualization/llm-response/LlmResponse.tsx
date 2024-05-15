import React from "react";
import { Typography } from "@equinor/eds-core-react";
import styled from "styled-components";
import { LlmPerformanceIndicatorGraph } from "./LlmPerformanceIndicatorGraph";
import { ILlmPlotOutput } from "../../../models/ILlmPlotOutput";
import { LlmCrossPlotGraph } from "./LlmCrossPlotGraph";

export const LlmResponse: React.FC<{
  llmPlotOutput: ILlmPlotOutput;
}> = ({ llmPlotOutput }) => {
  if (Object.keys(llmPlotOutput).length === 0) {
    return <Typography>No data to plot</Typography>;
  }
  const x_dimension = llmPlotOutput.extract_data_params.x_axis_dimension;
  return (
    <div>
      <Typography variant={"h3"}>
        {"AI agent assisted graph for " + llmPlotOutput.well_name}
      </Typography>
      {x_dimension === "start_time" && (
        <PerformanceIndicatorResponse llmPlotOutput={llmPlotOutput} />
      )}
      {x_dimension === "pressure" && (
        <CrossPlotResponse llmPlotOutput={llmPlotOutput} />
      )}
    </div>
  );
};

const PerformanceIndicatorResponse: React.FC<{
  llmPlotOutput: ILlmPlotOutput;
}> = ({ llmPlotOutput }) => (
  <>
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
    <TrendAndAlarmWrapper>
      <div>
        <Typography variant={"h3"}>Trends</Typography>
        {llmPlotOutput.trend_response.map((trend, index) => (
          <Typography key={index}>{trend}</Typography>
        ))}
      </div>
      <div>
        <Typography variant={"h3"}>
          PIs out of alarm range at the following points:
        </Typography>
        {llmPlotOutput.alarm_response.map((alarmResponse, index) => (
          <Typography key={index}>{alarmResponse}</Typography>
        ))}
      </div>
    </TrendAndAlarmWrapper>
  </>
);

const CrossPlotResponse: React.FC<{
  llmPlotOutput: ILlmPlotOutput;
}> = ({ llmPlotOutput }) => (
  <ChartWrapper>
    <LlmCrossPlotGraph llmWellMeasurementData={llmPlotOutput} />
  </ChartWrapper>
);

const ChartWrapper = styled.div`
  width: 100%;
  height: 550px;
`;

const TrendAndAlarmWrapper = styled.div`
  display: flex;
  gap: 150px;
`;
