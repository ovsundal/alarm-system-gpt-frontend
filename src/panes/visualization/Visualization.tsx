import React from "react";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import styled from "styled-components";
import { Chat } from "./Chat";
import { Output } from "./Output";
import Card from "../../shared/Card";
import { Typography } from "@equinor/eds-core-react";
import { ILlmChatResponse } from "../../models/ILlmChatResponse";

export const Visualization: React.FC<{
  measurementData: IWellMeasurement[];
  setLlmGraphData: React.Dispatch<React.SetStateAction<ILlmChatResponse>>;
  llmChatResponseGraphData: ILlmChatResponse;
}> = ({ measurementData, setLlmGraphData, llmChatResponseGraphData }) => {
  return (
    <VisualizationWrapper>
      <Chat setLlmGraphData={setLlmGraphData} />
      {(measurementData && measurementData.length > 0 && (
        <Output
          measurementData={measurementData}
          llmChatResponseGraphData={llmChatResponseGraphData}
        />
      )) || <NoDataComponent />}
    </VisualizationWrapper>
  );
};

const NoDataComponent = () => (
  <Card>
    <Typography
      variant="h2"
      style={{
        marginBottom: "16px",
      }}
    >
      No data
    </Typography>
  </Card>
);

const VisualizationWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 16px;
`;
