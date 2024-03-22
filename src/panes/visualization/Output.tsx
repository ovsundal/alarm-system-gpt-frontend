import Card from "../../shared/Card";
import React, { useState } from "react";
import { Tabs } from "@equinor/eds-core-react";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import { CrossPlot } from "./cross-plot/CrossPlot";
import styled from "styled-components";
import { LlmResponse } from "./llm-response/LlmResponse";
import { PtaMetrics } from "./pta-metrics/PtaMetrics";
import { ILlmChatResponse } from "../../models/ILlmChatResponse";

export const Output: React.FC<{
  measurementData: IWellMeasurement[];
  llmChatResponseGraphData: ILlmChatResponse;
}> = ({ measurementData, llmChatResponseGraphData }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [showRpiAlarms, setShowRpiAlarms] = useState(false);
  const [showCpiAlarms, setShowCpiAlarms] = useState(false);
  const [showWpiAlarms, setShowWpiAlarms] = useState(false);
  const [showTrends, setShowTrends] = useState(true);
  const [showPis, setShowPis] = useState(true);
  const handleChange = (index: number) => {
    setActiveTab(index);
  };
  console.log(llmChatResponseGraphData);
  return (
    <Card>
      <Tabs activeTab={activeTab} onChange={handleChange}>
        <Tabs.List>
          <Tabs.Tab>LLM Response</Tabs.Tab>
          <Tabs.Tab>PTA metrics</Tabs.Tab>
          <Tabs.Tab>Cross-plot</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>
            <LlmResponse llmChatResponseGraphData={llmChatResponseGraphData} />
          </Tabs.Panel>
          <Tabs.Panel>
            <PtaMetrics
              showRpiAlarms={showRpiAlarms}
              showCpiAlarms={showCpiAlarms}
              showWpiAlarms={showWpiAlarms}
              showTrends={showTrends}
              showPis={showPis}
              setShowPis={setShowPis}
              setShowRpiAlarms={setShowRpiAlarms}
              setShowCpiAlarms={setShowCpiAlarms}
              setShowWpiAlarms={setShowWpiAlarms}
              setShowTrends={setShowTrends}
              measurementData={measurementData}
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
