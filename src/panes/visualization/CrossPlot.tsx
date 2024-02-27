import React from "react";
import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  TooltipProps,
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
  console.log(wellMeasurementData);
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
          <XAxis
            type={"number"}
            dataKey={xAxisDimension}
            label={xAxisDimension}
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
          {xAxisDimension === "temperature" &&
            renderTemperatureCorrelationLines()}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const renderTemperatureCorrelationLines = () => {
  const strokeWidth = 4;
  const strokeDashArray = "4 4";

  return (
    <>
      <ReferenceLine
        stroke={"red"}
        segment={[
          { x: 52.4, y: 1.396 },
          { x: 69.74, y: 1.221 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
      <ReferenceLine
        stroke={"green"}
        segment={[
          { x: 54.41, y: 1.395 },
          { x: 66.85, y: 2.096 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
      <ReferenceLine
        stroke={"green"}
        segment={[
          { x: 54.41, y: 1.395 },
          { x: 66.85, y: 2.096 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
      <ReferenceLine
        stroke={"blue"}
        segment={[
          { x: 52.74, y: 1.686 },
          { x: 60.46, y: 1.738 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
      <ReferenceLine
        stroke={"black"}
        segment={[
          { x: 60.61, y: 1.128 },
          { x: 67.06, y: 0.569 },
        ]}
        strokeDasharray={strokeDashArray}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    // const additionalData: Payload<number, string> = payload[0];
    const additionalData: any = payload[0];

    return (
      <TooltipWrapper>
        <p>{`Start time : ${additionalData.payload["start_time"]}`}</p>
        <p>{`RPI : ${additionalData.payload["rpi"]}`}</p>
        <p>{`Trend1_temperature : ${additionalData.payload["temperature_intercept_1"]}`}</p>
        {/* Add more data here */}
        <p>{`Temperature : ${additionalData.payload.temperature}`}</p>
      </TooltipWrapper>
    );
  }

  return null;
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;

const TooltipWrapper = styled.div`
  background-color: white;
  border: 1px solid grey;
  padding: 5px;
`;
