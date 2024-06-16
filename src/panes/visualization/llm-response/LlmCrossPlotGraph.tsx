import React from "react";
import { ILlmPlotOutput } from "../../../models/ILlmPlotOutput";
import { CrossPlot } from "../cross-plot/CrossPlot";
import { IWellMeasurement } from "../../../models/IWellMeasurement";

export const LlmCrossPlotGraph: React.FC<{
  llmWellMeasurementData: ILlmPlotOutput;
}> = ({ llmWellMeasurementData }) => (
  <CrossPlot
    wellMeasurementData={
      llmWellMeasurementData.data_to_plot as IWellMeasurement[]
    }
    xAxisDimension={"pressure"}
    yAxisDimension={
      llmWellMeasurementData.extract_data_params.y_axis_dimensions[0]
    }
  />
);
