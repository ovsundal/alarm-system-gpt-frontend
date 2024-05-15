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
            label={
              xAxisDimension === "temperature"
                ? "Temperature, C\u00B0"
                : "Pressure, bar"
            }
            height={75}
            domain={xAxisDimension === "temperature" ? [52, 70] : [320, 420]}
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
          {renderPressureCorrelationLines()}
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

const renderPressureCorrelationLines = () => {
  const strokeWidth = 4;
  const strokeDashArray = "4 4";

  return (
    <>
      <ReferenceLine
        label={{
          value: "R²: 0.935",
          position: "right",
          dx: -50,
          fill: "black",
        }}
        stroke={"black"}
        segment={[
          { x: 334.72, y: 1.228 },
          { x: 364.01, y: 0.59 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
      <ReferenceLine
        label={{
          value: "R²: 0.002",
          position: "right",
          dy: 20,
          dx: -140,
          fill: "blue",
        }}
        stroke={"blue"}
        segment={[
          { x: 323.29, y: 1.701 },
          { x: 415.7, y: 1.732 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
      <ReferenceLine
        label={{
          value: "R²: 0.891",
          position: "center",
          dy: -30,
          dx: -10,
          fill: "green",
        }}
        stroke={"green"}
        segment={[
          { x: 323.29, y: 2.09 },
          { x: 398.34, y: 1.29 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
      <ReferenceLine
        label={{
          value: "R²: 0.211",
          position: "center",
          dy: 30,
          dx: 10,
          fill: "red",
        }}
        stroke={"red"}
        segment={[
          { x: 398.34, y: 1.244 },
          { x: 410.3, y: 1.404 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
