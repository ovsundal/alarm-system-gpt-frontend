import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
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

export const LlmPerformanceIndicatorGraph: React.FC<{
  llmWellMeasurementData: ILlmWellMeasurement[];
  graphParameters: ExtractDataParams;
}> = ({ llmWellMeasurementData, graphParameters }) => {
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
          label={graphParameters.x_axis_dimension}
          height={75}
          scale={"linear"}
        />
        <YAxis
          dataKey={graphParameters.y_axis_dimensions[0]}
          label={{
            value: graphParameters.y_axis_dimensions.join(", "),
            angle: -90,
            position: "insideLeft",
            dy: 50,
          }}
          domain={[0, 2.2]}
        />
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
        <Legend
          content={
            <CustomLegend parameters={graphParameters.y_axis_dimensions} />
          }
        />
      </LineChart>
    </ResponsiveContainer>
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
  }
  if (parameters.includes("rpi")) {
    dataToShowInLegend.push({
      name: "rpi",
      color: RPI_GRAPH_COLOR,
      type: "solid",
    });
  }
  if (parameters.includes("wpi")) {
    dataToShowInLegend.push({
      name: "wpi",
      color: WPI_GRAPH_COLOR,
      type: "solid",
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
