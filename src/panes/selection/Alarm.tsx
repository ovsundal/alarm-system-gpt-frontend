import {
  Button,
  Label,
  Slider,
  Switch,
  Typography,
} from "@equinor/eds-core-react";
import Card from "../../shared/Card";
import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { fetchWellMeasurements } from "../../api/fetchData";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IWellMeasurement } from "../../models/IWellMeasurement";

export const Alarm: React.FC<{
  selectedWellId: string;
  alarmIsManual: boolean;
  setAlarmIsManual: React.Dispatch<React.SetStateAction<boolean>>;
  alarmValues: number[];
  setAlarmValues: React.Dispatch<React.SetStateAction<number[]>>;
  setMeasurementData: React.Dispatch<React.SetStateAction<IWellMeasurement[]>>;
}> = ({
  selectedWellId,
  setAlarmIsManual,
  alarmIsManual,
  setAlarmValues,
  alarmValues,
  setMeasurementData,
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
                min={0}
                max={12}
                step={0.1}
                value={alarmValues}
                labelAlwaysOn={true}
                onChange={(
                  e: ChangeEvent<HTMLInputElement>,
                  values: number[],
                ) => changeAlarmValuesHandler(e, values, setAlarmValues)}
              />
            </>
          )}
        </SwitchAndSliderWrapper>
        <Button
          disabled={!selectedWellId}
          onClick={() =>
            SaveAndContinueButtonClickHandler(
              selectedWellId,
              navigate,
              setMeasurementData,
              alarmIsManual,
              alarmValues,
            )
          }
        >
          Save and continue
        </Button>
      </AlarmWrapper>
    </Card>
  );
};

const changeAlarmValuesHandler = (
  e: ChangeEvent<HTMLInputElement>,
  values: number[],
  setAlarmValues: React.Dispatch<React.SetStateAction<number[]>>,
) => setAlarmValues(values);

const SaveAndContinueButtonClickHandler = async (
  selectedWell: string,
  navigate: NavigateFunction,
  setMeasurementData: React.Dispatch<React.SetStateAction<IWellMeasurement[]>>,
  alarmIsManual: boolean,
  alarmValues: number[],
) => {
  const wellId = Number(selectedWell);
  let lowerAlarm: number | null = alarmValues[0];
  let upperAlarm: number | null = alarmValues[1];
  if (!alarmIsManual) {
    lowerAlarm = null;
    upperAlarm = null;
  }
  const result = await fetchWellMeasurements(wellId, lowerAlarm, upperAlarm);
  setMeasurementData(result);
  navigate("/visualization", { replace: true });
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
