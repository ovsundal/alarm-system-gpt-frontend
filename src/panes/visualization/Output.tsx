import Card from "../../shared/Card";
import React, { useState } from "react";
import { Switch, Tabs, Typography } from "@equinor/eds-core-react";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import { PerformanceIndicatorsGraph } from "./PerformanceIndicatorsGraph";
import { CrossPlot } from "./CrossPlot";
import styled from "styled-components";

export const Output: React.FC<{ measurementData: IWellMeasurement[] }> = ({
  measurementData,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const [showRpiAlarms, setShowRpiAlarms] = useState(true);
  const [showCpiAlarms, setShowCpiAlarms] = useState(true);
  const [showWpiAlarms, setShowWpiAlarms] = useState(true);
  const [showTrends, setShowTrends] = useState(true);
  const [showPis, setShowPis] = useState(true);
  const handleChange = (index: number) => {
    setActiveTab(index);
  };
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
      <Tabs activeTab={activeTab} onChange={handleChange}>
        <Tabs.List>
          <Tabs.Tab>Summary</Tabs.Tab>
          <Tabs.Tab>PTA metrics</Tabs.Tab>
          <Tabs.Tab>Cross-plot</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Panel one</Tabs.Panel>
          <Tabs.Panel>
            <Switch
              defaultChecked={true}
              label={"Show PIs"}
              onChange={() => setShowPis((prevState) => !prevState)}
            />
            <Switch
              defaultChecked={true}
              label={"RPI alarms"}
              onChange={() => setShowRpiAlarms((prevState) => !prevState)}
            />
            <Switch
              defaultChecked={true}
              label={"CPI alarms"}
              onChange={() => setShowCpiAlarms((prevState) => !prevState)}
            />
            <Switch
              defaultChecked={true}
              label={"WPI alarms"}
              onChange={() => setShowWpiAlarms((prevState) => !prevState)}
            />
            <Switch
              defaultChecked={true}
              label={"Show trends"}
              onChange={() => setShowTrends((prevState) => !prevState)}
            />
            <PerformanceIndicatorsGraph
              wellMeasurementData={measurementData}
              showTrends={showTrends}
              showPis={showPis}
              showRpiAlarms={showRpiAlarms}
              showWpiAlarms={showWpiAlarms}
              showCpiAlarms={showCpiAlarms}
            />
          </Tabs.Panel>
          <Tabs.Panel>
            <CrossPlotWrapper>
              <CrossPlot
                wellMeasurementData={measurementData}
                xAxisDimension={"temperature"}
              />
              <CrossPlot
                wellMeasurementData={measurementData}
                xAxisDimension={"pressure"}
              />
            </CrossPlotWrapper>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </Card>
  );
};

const CrossPlotWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
