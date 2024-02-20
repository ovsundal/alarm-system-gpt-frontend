import React from "react";
import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import styled from "styled-components";
import * as d3 from "d3-scale";
import { extent } from "d3-array";
import { interpolateTurbo } from "d3-scale-chromatic";

export const CrossPlot: React.FC<{
  wellMeasurementData: IWellMeasurement[];
  xAxisDimension: string;
}> = ({ wellMeasurementData, xAxisDimension }) => {
  const wellMeasurementDataWithoutPredictions = wellMeasurementData.filter(
    (dataPoint) => dataPoint.rpi != null,
  );
  const colorScale = d3
    .scaleSequential()
    .domain(
      extent(wellMeasurementDataWithoutPredictions, (d) => d.start_time) as [
        number,
        number,
      ],
    )
    .interpolator(interpolateTurbo);
  let orderedWellMeasurementData: IWellMeasurement[];

  if (xAxisDimension === "temperature") {
    orderedWellMeasurementData = [
      ...wellMeasurementDataWithoutPredictions,
    ].sort((a, b) => Number(a.temperature) - Number(b.temperature));
  } else {
    orderedWellMeasurementData = [
      ...wellMeasurementDataWithoutPredictions,
    ].sort((a, b) => Number(a.pressure) - Number(b.pressure));
  }
  return (
    <ChartWrapper>
      <ResponsiveContainer width={"100%"} height={500}>
        <ScatterChart
          data={orderedWellMeasurementData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDimension} label={xAxisDimension} height={75} />
          <YAxis dataKey={"rpi"} label={"RPI"} />
          <Tooltip />
          <Scatter
            name={`RPI vs ${xAxisDimension}`}
            data={orderedWellMeasurementData}
          >
            {orderedWellMeasurementData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorScale(entry.start_time)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
