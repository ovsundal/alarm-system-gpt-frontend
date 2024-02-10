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

export const Chart: React.FC<{ wellMeasurementData: IWellMeasurement[] }> = ({
  wellMeasurementData,
}) => {
  const hasLowerAlarm = wellMeasurementData.some(
    (measurement) => measurement.alarm_lower_limit != null,
  );
  const hasUpperAlarm = wellMeasurementData.some(
    (measurement) => measurement.alarm_upper_limit != null,
  );
  // const hasLowerAlarm = data.some((d) => d.cpi < 0);
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
          <XAxis dataKey="start_timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cpi"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="rpi"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="wpi"
            stroke="#ffc658"
            activeDot={{ r: 8 }}
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

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
