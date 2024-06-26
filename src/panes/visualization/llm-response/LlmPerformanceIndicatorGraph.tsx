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
import React from "react";
import { ILlmWellMeasurement } from "../../../models/ILlmWellMeasurement";
import {
  CPI_GRAPH_COLOR,
  RPI_GRAPH_COLOR,
  WPI_GRAPH_COLOR,
} from "../../../shared/constants";
import { ExtractDataParams } from "../../../models/ILlmChatResponse";
import { CustomTooltip } from "../CustomTooltip";

export const LlmPerformanceIndicatorGraph: React.FC<{
  llmWellMeasurementData: ILlmWellMeasurement[];
  graphParameters: ExtractDataParams;
  alarmLimits: {
    rpi: number[];
    cpi: number[];
    wpi: number[];
  };
}> = ({ llmWellMeasurementData, graphParameters, alarmLimits }) => {
  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <LineChart
        data={llmWellMeasurementData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={graphParameters.x_axis_dimension}
          label={
            graphParameters.x_axis_dimension === "start_time"
              ? "Time, hr"
              : "Pressure, bar"
          }
          height={75}
          scale={"linear"}
          ticks={generateTicks(0, 28000, 5000)}
        />
        <YAxis
          dataKey={graphParameters.y_axis_dimensions[0]}
          label={{
            value: graphParameters.y_axis_dimensions.join(", "),
            angle: -90,
            position: "insideLeft",
            dy: 50,
          }}
          domain={[0.6, 1.1]}
        />
        <Tooltip content={<CustomTooltip />} />
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
        {graphParameters.y_axis_dimensions.includes("cpi") &&
          renderAlarmLimits(CPI_GRAPH_COLOR, alarmLimits.cpi)}
        {graphParameters.y_axis_dimensions.includes("rpi") &&
          renderAlarmLimits(RPI_GRAPH_COLOR, alarmLimits.rpi)}
        {graphParameters.y_axis_dimensions.includes("wpi") &&
          renderAlarmLimits(WPI_GRAPH_COLOR, alarmLimits.wpi)}
        <Legend
          content={
            <CustomLegend parameters={graphParameters.y_axis_dimensions} />
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

function generateTicks(start: number, end: number, step: number): number[] {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

const renderAlarmLimits = (color: string, alarmLimits: number[]) => {
  const strokeDashArray = "1 2";
  return (
    <>
      <Line
        type="monotone"
        dataKey={() => alarmLimits[0]}
        stroke={color}
        dot={false}
        strokeDasharray={strokeDashArray}
      />
      <Line
        type="monotone"
        dataKey={() => alarmLimits[1]}
        stroke={color}
        dot={false}
        strokeDasharray={strokeDashArray}
      />
    </>
  );
};

const CustomLegend: React.FC<{ parameters: string[] }> = ({ parameters }) => {
  let dataToShowInLegend = [];
  if (parameters.includes("cpi")) {
    dataToShowInLegend.push({
      name: "cpi",
      color: CPI_GRAPH_COLOR,
      type: "solid",
    });
    dataToShowInLegend.push({
      name: "cpi-alarm",
      color: CPI_GRAPH_COLOR,
      type: "dashed",
    });
  }
  if (parameters.includes("rpi")) {
    dataToShowInLegend.push({
      name: "rpi",
      color: RPI_GRAPH_COLOR,
      type: "solid",
    });
    dataToShowInLegend.push({
      name: "rpi-alarm",
      color: RPI_GRAPH_COLOR,
      type: "dashed",
    });
  }
  if (parameters.includes("wpi")) {
    dataToShowInLegend.push({
      name: "wpi",
      color: WPI_GRAPH_COLOR,
      type: "solid",
    });
    dataToShowInLegend.push({
      name: "wpi-alarm",
      color: WPI_GRAPH_COLOR,
      type: "dashed",
    });
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
