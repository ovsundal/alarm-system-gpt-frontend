import Card from "../../shared/Card";
import React, { useState } from "react";
import { Tabs, Typography } from "@equinor/eds-core-react";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import { PerformanceIndicatorsGraph } from "./PerformanceIndicatorsGraph";
import { CrossPlot } from "./CrossPlot";
import styled from "styled-components";

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
          <Tabs.Tab>PTA metrics</Tabs.Tab>
          <Tabs.Tab>Cross-plot</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>Panel one</Tabs.Panel>
          <Tabs.Panel>
            <PerformanceIndicatorsGraph wellMeasurementData={measurementData} />
          </Tabs.Panel>
          <Tabs.Panel>
            <CrossPlotWrapper>
              <CrossPlot
                wellMeasurementData={measurementData}
                xAxisDimension={"T_58hr"}
              />
              <CrossPlot
                wellMeasurementData={measurementData}
                xAxisDimension={"P_58hr"}
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
