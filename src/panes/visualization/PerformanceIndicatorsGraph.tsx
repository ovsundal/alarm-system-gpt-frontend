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
  Label,
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
  const cpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "cpi",
    CPI_GRAPH_COLOR,
    "cpi_alarm_lower_limit",
    "cpi_alarm_upper_limit",
  );
  const rpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "rpi",
    RPI_GRAPH_COLOR,
    "rpi_alarm_lower_limit",
    "rpi_alarm_upper_limit",
  );
  const wpiAlarmData = findIndicatorOutsideOfAlarmRanges(
    wellMeasurementData,
    "wpi",
    WPI_GRAPH_COLOR,
    "wpi_alarm_lower_limit",
    "wpi_alarm_upper_limit",
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
            dataKey="start_time"
            label={"Time, hr"}
            height={75}
            scale={"linear"}
            ticks={generateTicks(0, 114215, 10000)}
          />
          <YAxis />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          {showPis && renderPerformanceIndicators()}
          {showCpiAlarms &&
            renderAlarmLines(
              cpiAlarmData,
              "cpi_alarm_lower_limit",
              "cpi_alarm_upper_limit",
              CPI_GRAPH_COLOR,
            )}
          {showRpiAlarms &&
            renderAlarmLines(
              rpiAlarmData,
              "rpi_alarm_lower_limit",
              "rpi_alarm_upper_limit",
              RPI_GRAPH_COLOR,
            )}
          {showWpiAlarms &&
            renderAlarmLines(
              wpiAlarmData,
              "wpi_alarm_lower_limit",
              "wpi_alarm_upper_limit",
              WPI_GRAPH_COLOR,
            )}

          {showTrends && renderTrendLines(wellMeasurementData)}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const CustomLegend = () => {
  const dataToShowInLegend = [
    { name: "cpi", color: CPI_GRAPH_COLOR, type: "solid" },
    { name: "cpi_trend", color: CPI_GRAPH_COLOR, type: "dashed" },
    { name: "rpi", color: RPI_GRAPH_COLOR, type: "solid" },
    { name: "rpi_trend", color: RPI_GRAPH_COLOR, type: "dashed" },
    { name: "wpi", color: WPI_GRAPH_COLOR, type: "solid" },
    { name: "wpi_trend", color: WPI_GRAPH_COLOR, type: "dashed" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      {dataToShowInLegend.map((entry, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              marginRight: "5px",
              borderStyle: `${entry.type}`,
              borderColor: `${entry.color}`,
              width: "20px",
            }}
          />
          <span style={{ color: entry.color }}>{entry.name}</span>
        </div>
      ))}
    </div>
  );
};

function generateTicks(start: number, end: number, step: number): number[] {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

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
        dataKey={dataKeyLowerLimit}
        stroke={color}
        dot={false}
        strokeDasharray="5 5"
      />
    }
    {
      <Line
        type="monotone"
        dataKey={dataKeyUpperLimit}
        stroke={color}
        dot={false}
        strokeDasharray="5 5"
      />
    }
    {alarmData.map(({ x1, x2, y1, y2, color }, index) => (
      <ReferenceArea
        key={color + index}
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

const renderTrendLines = (wellMeasurements: IWellMeasurement[]) => {
  const strokeWidth = 4;
  const strokeDashArray = "4 4";
  return (
    <>
      <Line
        type="monotone"
        dataKey={(data) =>
          data.wpi_slope_1 * data.start_time + data.wpi_intercept_1
        }
        stroke={WPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={(data) =>
          data.cpi_slope_1 * data.start_time + data.cpi_intercept_1
        }
        stroke={CPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={(data) =>
          data.rpi_slope_1 * data.start_time + data.rpi_intercept_1
        }
        stroke={RPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <ReferenceArea x1={8860} x2={8870} y1={0.5} y2={1.9} stroke="black">
        <Label
          value={`R² cpi: ${wellMeasurements[0].cpi_r_squared_1![0]}`}
          position="insideBottomRight"
          stroke={"black"}
        />
        <Label
          value={`R² rpi: ${wellMeasurements[0].rpi_r_squared_1![0]}`}
          position="insideTopRight"
          stroke={"black"}
        />
        <Label
          value={`R² wpi: ${wellMeasurements[0].wpi_r_squared_1![0]}`}
          position="insideRight"
          stroke={"black"}
        />
      </ReferenceArea>
      <Line
        type="monotone"
        dataKey={(data) =>
          data.wpi_slope_2 * data.start_time + data.wpi_intercept_2
        }
        stroke={WPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={(data) =>
          data.cpi_slope_2 * data.start_time + data.cpi_intercept_2
        }
        stroke={CPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={(data) =>
          data.rpi_slope_2 * data.start_time + data.rpi_intercept_2
        }
        stroke={RPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <ReferenceArea x1={37876} x2={37886} y1={0.65} y2={2.15} stroke="black">
        <Label
          value={`R² cpi: ${wellMeasurements[4].cpi_r_squared_2![0]}`}
          position="insideBottomRight"
          stroke={"black"}
        />
        <Label
          value={`R² rpi: ${wellMeasurements[4].rpi_r_squared_2![0]}`}
          position="insideTopRight"
          stroke={"black"}
        />
        <Label
          value={`R² wpi: ${wellMeasurements[4].wpi_r_squared_2![0]}`}
          position="insideRight"
          stroke={"black"}
        />
      </ReferenceArea>
      <Line
        type="monotone"
        dataKey={(data) =>
          data.wpi_slope_3 * data.start_time + data.wpi_intercept_3
        }
        stroke={WPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={(data) =>
          data.cpi_slope_3 * data.start_time + data.cpi_intercept_3
        }
        stroke={CPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={(data) =>
          data.rpi_slope_3 * data.start_time + data.rpi_intercept_3
        }
        stroke={RPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <ReferenceArea x1={67760} x2={67770} y1={0.7} y2={1.45} stroke="black">
        <Label
          value={`R² rpi: ${wellMeasurements[11].rpi_r_squared_3![0]}`}
          position="insideTopRight"
          stroke={"black"}
        />
        <Label
          value={`R² wpi: ${wellMeasurements[11].wpi_r_squared_3![0]}`}
          position="insideRight"
          stroke={"black"}
        />
        <Label
          value={`R² cpi: ${wellMeasurements[11].cpi_r_squared_3![0]}`}
          position="insideBottomRight"
          stroke={"black"}
        />
        <Label
          value={`R² rpi: ${wellMeasurements[16].rpi_r_squared_4![0]}`}
          position="insideTopLeft"
          stroke={"black"}
        />
        <Label
          value={`R² wpi: ${wellMeasurements[16].wpi_r_squared_4![0]}`}
          position="insideLeft"
          stroke={"black"}
        />
        <Label
          value={`R² cpi: ${wellMeasurements[16].cpi_r_squared_4![0]}`}
          position="insideBottomLeft"
          stroke={"black"}
        />
      </ReferenceArea>
      <Line
        type="monotone"
        dataKey={(data) =>
          data.wpi_slope_4 * data.start_time + data.wpi_intercept_4
        }
        stroke={WPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={(data) =>
          data.cpi_slope_4 * data.start_time + data.cpi_intercept_4
        }
        stroke={CPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={(data) =>
          data.rpi_slope_4 * data.start_time + data.rpi_intercept_4
        }
        stroke={RPI_GRAPH_COLOR}
        dot={false}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDashArray}
      />
    </>
  );
};

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
