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
import {
  CPI_GRAPH_COLOR,
  RPI_GRAPH_COLOR,
  WPI_GRAPH_COLOR,
} from "../../shared/constants";

type AlarmArea = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  color: string;
};

export const PerformanceIndicatorsGraph: React.FC<{
  wellMeasurementData: IWellMeasurement[];
  showRpiAlarms: boolean;
  showWpiAlarms: boolean;
  showCpiAlarms: boolean;
  showTrends: boolean;
  showPis: boolean;
}> = ({
  wellMeasurementData,
  showRpiAlarms,
  showTrends,
  showPis,
  showWpiAlarms,
  showCpiAlarms,
}) => {
  const rpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "rpi",
    RPI_GRAPH_COLOR,
    "rpi_alarm_lower_limit",
    "rpi_alarm_upper_limit",
  );
  const cpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "cpi",
    CPI_GRAPH_COLOR,
    "cpi_alarm_lower_limit",
    "cpi_alarm_upper_limit",
  );
  const wpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "wpi",
    WPI_GRAPH_COLOR,
    "wpi_alarm_lower_limit",
    "wpi_alarm_upper_limit",
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
          {showPis && renderPerformanceIndicators()}
          {showRpiAlarms &&
            renderAlarmLines(
              alarmData,
              "rpi_alarm_lower_limit",
              "rpi_alarm_upper_limit",
              RPI_GRAPH_COLOR,
            )}
          {showCpiAlarms &&
            renderAlarmLines(
              alarmData,
              "cpi_alarm_lower_limit",
              "cpi_alarm_upper_limit",
              CPI_GRAPH_COLOR,
            )}
          {showWpiAlarms &&
            renderAlarmLines(
              alarmData,
              "wpi_alarm_lower_limit",
              "wpi_alarm_upper_limit",
              WPI_GRAPH_COLOR,
            )}

          {showTrends && bestFitLines()}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const renderPerformanceIndicators = () => (
  <>
    <Line
      type="monotone"
      dataKey="cpi"
      stroke={CPI_GRAPH_COLOR}
      activeDot={{ r: 8 }}
      strokeWidth={2}
    />
    <Line
      type="monotone"
      dataKey="rpi"
      stroke={RPI_GRAPH_COLOR}
      activeDot={{ r: 8 }}
      strokeWidth={2}
    />
    <Line
      type="monotone"
      dataKey="wpi"
      stroke={WPI_GRAPH_COLOR}
      activeDot={{ r: 8 }}
      strokeWidth={2}
    />
  </>
);

const renderAlarmLines = (
  alarmData: AlarmArea[],
  dataKeyLowerLimit: string,
  dataKeyUpperLimit: string,
  color: string,
) => (
  <>
    {
      <Line
        type="monotone"
        // dataKey="rpi_alarm_lower_limit"
        dataKey={dataKeyLowerLimit}
        stroke={color}
        dot={false}
        strokeDasharray="5 5"
      />
    }
    {
      <Line
        type="monotone"
        // dataKey="rpi_alarm_upper_limit"
        dataKey={dataKeyUpperLimit}
        stroke={color}
        dot={false}
        strokeDasharray="5 5"
      />
    }
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
  </>
);

const bestFitLines = () => (
  <>
    <Line
      type="monotone"
      dataKey={"wpi_trend"}
      stroke="#22A322"
      dot={false}
      strokeDasharray="5 5"
    />
    <Line
      type="monotone"
      dataKey={"rpi_trend"}
      stroke="#0B7DC6"
      dot={false}
      strokeDasharray="5 5"
    />
    <Line
      type="monotone"
      dataKey={"cpi_trend"}
      stroke="#F68A04"
      dot={false}
      strokeDasharray="5 5"
    />
  </>
);

const createAlarmArea = (
  dataPoint: IWellMeasurement,
  performanceIndicator: keyof IWellMeasurement,
  alarmColor: string,
  x1: number,
  x2: number,
): AlarmArea | null => {
  if (dataPoint[performanceIndicator]! > dataPoint.rpi_alarm_upper_limit!) {
    return {
      y1: dataPoint.rpi_alarm_upper_limit!,
      y2: dataPoint[performanceIndicator]!,
      x1,
      x2,
      color: alarmColor,
    } as AlarmArea;
  }

  if (dataPoint[performanceIndicator]! < dataPoint.rpi_alarm_lower_limit!) {
    return {
      y1: dataPoint[performanceIndicator]!,
      y2: dataPoint.rpi_alarm_lower_limit!,
      x1,
      x2,
      color: alarmColor,
    } as AlarmArea;
  }

  return null;
};

const findIndicatorOutsideOfAlarmRanges = (
  data: IWellMeasurement[],
  performanceIndicator: keyof IWellMeasurement,
  alarmColor: string,
  dataKeyLowerAlarm: string,
  dataKeyUpperAlarm: string,
) => {
  if (
    data.length === 0 ||
    data[0][dataKeyLowerAlarm as keyof IWellMeasurement] == null ||
    data[0][dataKeyUpperAlarm as keyof IWellMeasurement] == null
  ) {
    return [];
  }

  const alarmAreas = [] as AlarmArea[];

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
