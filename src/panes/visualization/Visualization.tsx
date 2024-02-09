import React from "react";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import { useLocation } from "react-router-dom";

export const Visualization = () => {
  const location = useLocation();
  const measurementData = location.state as { result: IWellMeasurement[] };
  return (
    <div>
      <h1>Data Visualization and Chat</h1>
    </div>
  );
};
