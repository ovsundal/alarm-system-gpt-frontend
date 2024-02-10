import Card from "../../shared/Card";
import React from "react";
import { Typography } from "@equinor/eds-core-react";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import { Chart } from "./Chart";

export const Output: React.FC<{ measurementData: IWellMeasurement[] }> = ({
  measurementData,
}) => {
  return (
    <Card>
      <Typography
        variant="h2"
        style={{
          marginBottom: "16px",
        }}
      >
        Outputs
      </Typography>
      <Chart wellMeasurementData={measurementData} />
    </Card>
  );
};
