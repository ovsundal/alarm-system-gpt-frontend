import { Switch, Typography } from "@equinor/eds-core-react";
import React from "react";
import { PerformanceIndicatorsGraph } from "./PerformanceIndicatorsGraph";
import { IWellMeasurement } from "../../../models/IWellMeasurement";

export const PtaMetrics: React.FC<{
  showRpiAlarms: boolean;
  showCpiAlarms: boolean;
  showWpiAlarms: boolean;
  showTrends: boolean;
  showPis: boolean;
  measurementData: IWellMeasurement[];
  setShowPis: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRpiAlarms: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCpiAlarms: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWpiAlarms: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTrends: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  setShowPis,
  setShowRpiAlarms,
  setShowWpiAlarms,
  setShowCpiAlarms,
  setShowTrends,
  showRpiAlarms,
  showTrends,
  showWpiAlarms,
  showPis,
  showCpiAlarms,
  measurementData,
}) => {
  return (
    <>
      <Switch
        defaultChecked={true}
        label={"Show PIs"}
        onChange={() => setShowPis((prevState) => !prevState)}
      />
      <Switch
        defaultChecked={false}
        label={"RPI alarms"}
        onChange={() => setShowRpiAlarms((prevState) => !prevState)}
      />
      <Switch
        defaultChecked={false}
        label={"CPI alarms"}
        onChange={() => setShowCpiAlarms((prevState) => !prevState)}
      />
      <Switch
        defaultChecked={false}
        label={"WPI alarms"}
        onChange={() => setShowWpiAlarms((prevState) => !prevState)}
      />
      <Switch
        defaultChecked={true}
        label={"Show trends"}
        onChange={() => setShowTrends((prevState) => !prevState)}
      />
      <Typography variant={"h3"}>
        PTA-metrics graph for {measurementData[0].well_name}
      </Typography>
      <PerformanceIndicatorsGraph
        wellMeasurementData={measurementData}
        showTrends={showTrends}
        showPis={showPis}
        showRpiAlarms={showRpiAlarms}
        showWpiAlarms={showWpiAlarms}
        showCpiAlarms={showCpiAlarms}
      />
    </>
  );
};
