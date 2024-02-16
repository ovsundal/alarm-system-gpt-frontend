import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import styled from "styled-components";

type alarmArea = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  color: string;
};

export const PerformanceIndicatorsGraph: React.FC<{
  wellMeasurementData: IWellMeasurement[];
}> = ({ wellMeasurementData }) => {
  const hasLowerAlarm = wellMeasurementData.some(
    (measurement) => measurement.alarm_lower_limit != null,
  );
  const hasUpperAlarm = wellMeasurementData.some(
    (measurement) => measurement.alarm_upper_limit != null,
  );

  const rpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "rpi",
    "#0B7DC6",
  );
  const cpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "cpi",
    "#F68A04",
  );
  const wpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "wpi",
    "#22A322",
  );

  const alarmData = [...rpiAlarmData, ...cpiAlarmData, ...wpiAlarmData];
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
          <XAxis dataKey="start_time" label={"Time, hr"} height={75} />
          <YAxis />
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
          {alarmData.map(({ x1, x2, y1, y2, color }, index) => (
            <ReferenceArea
              key={index}
              x1={x1}
              x2={x2}
              y1={y1}
              y2={y2}
              fill={color}
              fillOpacity={0.2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const createAlarmArea = (
  dataPoint: IWellMeasurement,
  performanceIndicator: keyof IWellMeasurement,
  alarmColor: string,
  x1: number,
  x2: number,
): alarmArea | null => {
  if (dataPoint[performanceIndicator]! > dataPoint.alarm_upper_limit!) {
    return {
      y1: dataPoint.alarm_upper_limit!,
      y2: dataPoint[performanceIndicator]!,
      x1,
      x2,
      color: alarmColor,
    };
  }

  if (dataPoint[performanceIndicator]! < dataPoint.alarm_lower_limit!) {
    return {
      y1: dataPoint[performanceIndicator]!,
      y2: dataPoint.alarm_lower_limit!,
      x1,
      x2,
      color: alarmColor,
    };
  }

  return null;
};

const findIndicatorOutsideOfAlarmRanges = (
  data: IWellMeasurement[],
  performanceIndicator: keyof IWellMeasurement,
  alarmColor: string,
) => {
  if (
    data.length === 0 ||
    data[0].alarm_lower_limit == null ||
    data[0].alarm_upper_limit == null
  ) {
    return [];
  }

  const alarmAreas = [] as alarmArea[];

  data.forEach((dataPoint, index) => {
    const x1 =
      index === 0 ? data[index].start_time : data[index - 1].start_time;
    const x2 =
      index === data.length - 1
        ? data[index].start_time
        : data[index + 1].start_time;

    const alarmArea = createAlarmArea(
      dataPoint,
      performanceIndicator,
      alarmColor,
      x1,
      x2,
    );

    if (alarmArea) {
      alarmAreas.push(alarmArea);
    }
  });

  return alarmAreas;
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
