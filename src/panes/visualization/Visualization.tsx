import React, { useEffect } from "react";
import { IWellMeasurement } from "../../models/IWellMeasurement";
import styled from "styled-components";
import { Chat } from "./Chat";
import { Output } from "./Output";
import Card from "../../shared/Card";
import { Typography } from "@equinor/eds-core-react";
import { ILlmPlotOutput } from "../../models/ILlmPlotOutput";
import { useNavigate } from "react-router-dom";

export const Visualization: React.FC<{
  selectedWellName: string;
  measurementData: IWellMeasurement[];
  setLlmPlotOutput: React.Dispatch<React.SetStateAction<ILlmPlotOutput>>;
  llmPlotOutput: ILlmPlotOutput;
  rpiAlarmValues: number[];
  cpiAlarmValues: number[];
  wpiAlarmValues: number[];
}> = ({
  measurementData,
  setLlmPlotOutput,
  llmPlotOutput,
  rpiAlarmValues,
  cpiAlarmValues,
  wpiAlarmValues,
  selectedWellName,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedWellName === "") {
      navigate("/selection");
    }
  }, [selectedWellName]);
  return (
    <VisualizationWrapper>
      <Chat
        selectedWellName={selectedWellName}
        setLlmPlotOutput={setLlmPlotOutput}
        rpiAlarmValues={rpiAlarmValues}
        cpiAlarmValues={cpiAlarmValues}
        wpiAlarmValues={wpiAlarmValues}
      />
      {(measurementData && measurementData.length > 0 && (
        <Output
          selectedWellName={selectedWellName}
          measurementData={measurementData}
          llmPlotOutput={llmPlotOutput}
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
