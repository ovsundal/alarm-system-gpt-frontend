import { TooltipProps } from "recharts";
import React from "react";
import styled from "styled-components";
import { interpolateTurbo } from "d3-scale-chromatic";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import { extent } from "d3-array";

export const ColorScaleLegend: React.FC<{ data: IWellMeasurement[] }> = ({
  data,
}) => {
  // Calculate the min and max start_time values
  const [minStartTime, maxStartTime] = extent(data, (d) => d.start_time) as [
    number,
    number,
  ];

  // Normalize a value within a given range
  const normalize = (value: number, min: number, max: number) =>
    (value - min) / (max - min);

  // Create the color gradient
  const colorGradient = data
    .map((d) =>
      interpolateTurbo(normalize(d.start_time, minStartTime, maxStartTime)),
    )
    .join(",");

  return <LegendWrapper colorGradient={colorGradient} />;
};

const LegendWrapper = styled.div<{ colorGradient: string }>`
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, ${(props) => props.colorGradient});
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;

export const CustomTooltip = (props: TooltipProps<number, string>) => {
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
        <p>{`Pressure : ${additionalData.payload.pressure}`}</p>
        <p>{`Predicted_temperature_y : ${additionalData.payload.temperature_predicted_rpi}`}</p>
        <p>{`Predicted_pressure_y : ${additionalData.payload.pressure_predicted_rpi}`}</p>
      </TooltipWrapper>
    );
  }

  return null;
};

export const LegendTicks: React.FC<{
  min: number;
  max: number;
  numTicks: number;
}> = ({ min, max, numTicks }) => {
  // Calculate the tick values
  const tickValues = Array.from(
    { length: numTicks },
    (_, i) => min + (max - min) * (i / (numTicks - 1)),
  );

  // Normalize a value within a given range
  const normalize = (value: number, min: number, max: number) =>
    (value - min) / (max - min);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {tickValues.map((value, index) => (
        <div key={index} style={{ textAlign: "center", position: "relative" }}>
          <div
            style={{
              width: "1px",
              height: "10px",
              backgroundColor: interpolateTurbo(normalize(value, min, max)),
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12px",
              marginLeft: "-7px",
              width: "100%",
            }}
          >
            {value.toFixed(0)}
          </div>
        </div>
      ))}
    </div>
  );
};

const TooltipWrapper = styled.div`
  background-color: white;
  border: 1px solid grey;
  padding: 5px;
`;
