import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import styled from "styled-components";

export const PerformanceIndicatorsGraph: React.FC<{
  wellMeasurementData: IWellMeasurement[];
}> = ({ wellMeasurementData }) => {
  const hasLowerAlarm = wellMeasurementData.some(
    (measurement) => measurement.alarm_lower_limit != null,
  );
  const hasUpperAlarm = wellMeasurementData.some(
    (measurement) => measurement.alarm_upper_limit != null,
  );
  return (
    <ChartWrapper>
      <ResponsiveContainer width={"100%"} height={500}>
        <LineChart
          data={wellMeasurementData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time_passed_hr"
            label={"Time, hr"}
            height={75}
            ticks={generateTicks(wellMeasurementData, 10)}
          />
          <YAxis domain={[0, 14]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cpi"
            stroke="#F68A04"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="rpi"
            stroke="#0B7DC6"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="wpi"
            stroke="#22A322"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          {hasUpperAlarm && (
            <Line
              type="monotone"
              dataKey="alarm_upper_limit"
              stroke="red"
              dot={false}
              strokeDasharray="5 5"
            />
          )}
          {hasLowerAlarm && (
            <Line
              type="monotone"
              dataKey="alarm_lower_limit"
              stroke="red"
              dot={false}
              strokeDasharray="5 5"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const generateTicks = (data: IWellMeasurement[], numTicks: number) => {
  const tickSpacing = Math.ceil(data.length / numTicks);
  const ticks = [];
  for (let i = 0; i < data.length; i += tickSpacing) {
    ticks.push(data[i].time_passed_hr);
  }
  return ticks;
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
