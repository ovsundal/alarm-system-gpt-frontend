import React from "react";
import { ILlmPlotOutput } from "../../../models/ILlmPlotOutput";
import { CrossPlot } from "../cross-plot/CrossPlot";
import { IWellMeasurement } from "../../../models/IWellMeasurement";

export const LlmCrossPlotGraph: React.FC<{
  llmWellMeasurementData: ILlmPlotOutput;
}> = ({ llmWellMeasurementData }) => {
  return (
    <CrossPlot
      wellMeasurementData={
        llmWellMeasurementData.data_to_plot as IWellMeasurement[]
      }
      xAxisDimension={"pressure"}
    />
  );
};
