import React from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IWellMeasurement } from "../../../models/IWellMeasurement";
import styled from "styled-components";
import * as d3 from "d3-scale";
import { extent } from "d3-array";
import { interpolateTurbo } from "d3-scale-chromatic";
import { ColorScaleLegend, LegendTicks } from "./CrossPlotHelper";
import { CustomTooltip } from "../CustomTooltip";

export const CrossPlot: React.FC<{
  wellMeasurementData: IWellMeasurement[];
  xAxisDimension: string;
}> = ({ wellMeasurementData, xAxisDimension }) => {
  const wellMeasurementDataWithoutPredictions = (
    wellMeasurementData as IWellMeasurement[]
  ).filter((dataPoint) => dataPoint.rpi != null);
  const colorScale = d3
    .scaleSequential()
    .domain(
      extent(wellMeasurementDataWithoutPredictions, (d) => d.start_time) as [
        number,
        number,
      ],
    )
    .interpolator(interpolateTurbo);
  const orderedWellMeasurementData = [
    ...wellMeasurementDataWithoutPredictions,
  ].sort((a, b) => Number(a.pressure) - Number(b.pressure));
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
          <XAxis
            type={"number"}
            dataKey={xAxisDimension}
            label={"Pressure, bar"}
            height={75}
            domain={[320, 420]}
          />
          <YAxis
            type={"number"}
            domain={[0, 2.2]}
            dataKey={"rpi"}
            label={{
              value: "RPI",
              angle: -90,
              position: "insideLeft",
              dy: 15,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            name={`RPI vs ${xAxisDimension}`}
            data={orderedWellMeasurementData}
          >
            {orderedWellMeasurementData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorScale(entry.start_time)} />
            ))}
          </Scatter>
          {renderPressureCorrelationLines(orderedWellMeasurementData)}
          <Legend
            content={() => (
              <div>
                <div>Time, hours</div>
                <ColorScaleLegend data={wellMeasurementData} />
                <LegendTicks min={1000} max={105000} numTicks={5} />
              </div>
            )}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const renderPressureCorrelationLines = (
  orderedWellMeasurementData: IWellMeasurement[],
) => {
  const strokeWidth = 4;
  const strokeDashArray = "4 4";
  const rpiData = orderedWellMeasurementData.map((dataPoint) => ({
    x: dataPoint.pressure,
    y: dataPoint.rpi_slope_1! * dataPoint.pressure + dataPoint.rpi_intercept_1!,
  }));
  return (
    <ReferenceLine
      label={{
        value: `R²: ${orderedWellMeasurementData[0].rpi_r_squared_1![0]}`,
        position: "top",
        dy: -15,
        fill: "black",
      }}
      stroke={"black"}
      segment={[
        { x: rpiData[0].x, y: rpiData[0].y },
        {
          x: rpiData[rpiData.length - 1].x,
          y: rpiData[rpiData.length - 1].y,
        },
      ]}
      strokeDasharray={strokeDashArray}
      strokeWidth={strokeWidth}
    />
  );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
