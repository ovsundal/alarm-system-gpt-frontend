import {
  Button,
  Label,
  Slider,
  Switch,
  Typography,
} from "@equinor/eds-core-react";
import Card from "../../shared/Card";
import React from "react";
import styled from "styled-components";
import { fetchWellMeasurements } from "../../api/fetchData";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const Alarm: React.FC<{
  selectedWellId: string;
  alarmIsManual: boolean;
  setAlarmIsManual: React.Dispatch<React.SetStateAction<boolean>>;
  alarmValues: number[];
  setAlarmValues: React.Dispatch<React.SetStateAction<number[]>>;
}> = ({
  selectedWellId,
  setAlarmIsManual,
  alarmIsManual,
  setAlarmValues,
  alarmValues,
}) => {
  const navigate = useNavigate();
  return (
    <Card>
      <AlarmWrapper>
        <SwitchAndSliderWrapper>
          <Typography
            variant="h2"
            style={{
              marginBottom: "16px",
            }}
          >
            Alarm
          </Typography>
          <Switch
            onChange={() => setAlarmIsManual((prevState) => !prevState)}
            checked={alarmIsManual}
            label={alarmIsManual ? "Manual" : "Automatic"}
          />
          {alarmIsManual && (
            <>
              <Label label=" Set lower and upper envelope limit" />
              <Slider
                value={alarmValues}
                labelAlwaysOn={true}
                onChange={() =>
                  changeAlarmValuesHandler(alarmValues, setAlarmValues)
                }
              />
            </>
          )}
        </SwitchAndSliderWrapper>
        <Button
          disabled={!selectedWellId}
          onClick={() =>
            SaveAndContinueButtonClickHandler(selectedWellId, navigate)
          }
        >
          Save and continue
        </Button>
      </AlarmWrapper>
    </Card>
  );
};

const changeAlarmValuesHandler = (
  value: number[],
  setAlarmValues: React.Dispatch<React.SetStateAction<number[]>>,
) => setAlarmValues(value);

const SaveAndContinueButtonClickHandler = async (
  selectedWell: string,
  navigate: NavigateFunction,
) => {
  const result = await fetchWellMeasurements(Number(selectedWell));

  navigate("/visualization", { replace: true, state: { result } });
};

const SwitchAndSliderWrapper = styled.div`
  width: 60%;
`;

const AlarmWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: baseline;

  & > :last-child {
    margin-left: auto;
  }
`;
