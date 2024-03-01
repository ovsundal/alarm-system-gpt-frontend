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

  return <LegendWrapper $colorGradient={colorGradient} />;
};

const LegendWrapper = styled.div<{ $colorGradient: string }>`
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, ${(props) => props.$colorGradient});
`;

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
