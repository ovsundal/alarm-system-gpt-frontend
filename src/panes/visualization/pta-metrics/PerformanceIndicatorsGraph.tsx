import React from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IWellMeasurement } from "../../../models/IWellMeasurement";
import styled from "styled-components";
import {
  CPI_GRAPH_COLOR,
  RPI_GRAPH_COLOR,
  WPI_GRAPH_COLOR,
} from "../../../shared/constants";
import { CustomTooltip } from "../CustomTooltip";

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
            ticks={generateTicks(0, 40000, 5000)}
          />
          <YAxis
            dataKey={"rpi"}
            label={{
              value: "Relative metric, unit",
              angle: -90,
              position: "insideLeft",
              dy: 50,
            }}
            domain={[0.6, 1.1]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={
              <CustomLegend
                showRpiAlarms={showRpiAlarms}
                showWpiAlarms={showWpiAlarms}
                showCpiAlarms={showCpiAlarms}
              />
            }
          />
          {showPis && renderPerformanceIndicators()}
          {showCpiAlarms &&
            renderAlarmLines(
              "cpi_alarm_lower_limit",
              "cpi_alarm_upper_limit",
              CPI_GRAPH_COLOR,
            )}
          {showRpiAlarms &&
            renderAlarmLines(
              "rpi_alarm_lower_limit",
              "rpi_alarm_upper_limit",
              RPI_GRAPH_COLOR,
            )}
          {showWpiAlarms &&
            renderAlarmLines(
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

const CustomLegend = ({
  showRpiAlarms,
  showWpiAlarms,
  showCpiAlarms,
}: {
  showRpiAlarms: boolean;
  showWpiAlarms: boolean;
  showCpiAlarms: boolean;
}) => {
  let dataToShowInLegend = [
    { name: "cpi", color: CPI_GRAPH_COLOR, type: "solid" },
    { name: "cpi_trend", color: CPI_GRAPH_COLOR, type: "dashed" },
    { name: "rpi", color: RPI_GRAPH_COLOR, type: "solid" },
    { name: "rpi_trend", color: RPI_GRAPH_COLOR, type: "dashed" },
    { name: "wpi", color: WPI_GRAPH_COLOR, type: "solid" },
    { name: "wpi_trend", color: WPI_GRAPH_COLOR, type: "dashed" },
  ];
  if (showCpiAlarms) {
    dataToShowInLegend = [
      ...dataToShowInLegend,
      {
        name: "cpi_alarm",
        color: CPI_GRAPH_COLOR,
        type: "dotted",
      },
    ];
  }
  if (showRpiAlarms) {
    dataToShowInLegend = [
      ...dataToShowInLegend,
      {
        name: "rpi_alarm",
        color: RPI_GRAPH_COLOR,
        type: "dotted",
      },
    ];
  }
  if (showWpiAlarms) {
    dataToShowInLegend = [
      ...dataToShowInLegend,
      {
        name: "wpi_alarm",
        color: WPI_GRAPH_COLOR,
        type: "dotted",
      },
    ];
  }
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
  dataKeyLowerLimit: string,
  dataKeyUpperLimit: string,
  color: string,
) => {
  const strokeDashArray = "1 2";
  return (
    <>
      {
        <Line
          type="monotone"
          dataKey={dataKeyLowerLimit}
          stroke={color}
          dot={false}
          strokeDasharray={strokeDashArray}
        />
      }
      {
        <Line
          type="monotone"
          dataKey={dataKeyUpperLimit}
          stroke={color}
          dot={false}
          strokeDasharray={strokeDashArray}
        />
      }
    </>
  );
};

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
      <ReferenceArea x1={3052} x2={3062} y1={0.5} y2={1.9} stroke="black">
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
    </>
  );
};

const ChartWrapper = styled.div`
  width: 100%;
  height: 500px;
`;
