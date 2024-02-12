import Card from "../../shared/Card";
import React, { useState } from "react";
import { Tabs, Typography } from "@equinor/eds-core-react";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import { PerformanceIndicatorsGraph } from "./PerformanceIndicatorsGraph";

export const Output: React.FC<{ measurementData: IWellMeasurement[] }> = ({
  measurementData,
}) => {
  const [activeTab, setActiveTab] = useState(1);
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
          <Tabs.Tab>Performance Indicators</Tabs.Tab>
          <Tabs.Tab>Cross-plot</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels conditionalRender>
          <Tabs.Panel>Panel one</Tabs.Panel>
          <Tabs.Panel>
            <PerformanceIndicatorsGraph wellMeasurementData={measurementData} />
          </Tabs.Panel>
          <Tabs.Panel>Panel four</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </Card>
  );
};
