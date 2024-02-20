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
import {
  CPI_DEFAULT_ALARM_VALUES,
  RPI_DEFAULT_ALARM_VALUES,
  WPI_DEFAULT_ALARM_VALUES,
} from "../../shared/constants";

export const Alarm: React.FC<{
  selectedWellId: string;
  alarmIsManual: boolean;
  setAlarmIsManual: React.Dispatch<React.SetStateAction<boolean>>;
  setMeasurementData: React.Dispatch<React.SetStateAction<IWellMeasurement[]>>;
  rpiAlarmValues: number[];
  setRpiAlarmValues: React.Dispatch<React.SetStateAction<number[]>>;
  cpiAlarmValues: number[];
  setCpiAlarmValues: React.Dispatch<React.SetStateAction<number[]>>;
  wpiAlarmValues: number[];
  setWpiAlarmValues: React.Dispatch<React.SetStateAction<number[]>>;
}> = ({
  selectedWellId,
  setAlarmIsManual,
  alarmIsManual,
  setMeasurementData,
  rpiAlarmValues,
  setCpiAlarmValues,
  setRpiAlarmValues,
  wpiAlarmValues,
  setWpiAlarmValues,
  cpiAlarmValues,
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
            Set alarm ranges
          </Typography>
          <Switch
            onChange={() => setAlarmIsManual((prevState) => !prevState)}
            checked={alarmIsManual}
            label={alarmIsManual ? "Manual" : "Automatic"}
          />
          {alarmIsManual && (
            <AlarmSliderWrapper>
              <div>
                <Label label="RPI" />
                <Slider
                  defaultChecked={false}
                  min={0}
                  max={6}
                  step={0.1}
                  value={rpiAlarmValues}
                  labelAlwaysOn={true}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement>,
                    values: number[],
                  ) => changeAlarmValuesHandler(e, values, setRpiAlarmValues)}
                />
              </div>
              <div>
                <Label label="CPI" />
                <Slider
                  defaultChecked={false}
                  min={0}
                  max={6}
                  step={0.1}
                  value={cpiAlarmValues}
                  labelAlwaysOn={true}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement>,
                    values: number[],
                  ) => changeAlarmValuesHandler(e, values, setCpiAlarmValues)}
                />
              </div>
              <div>
                <Label label="WPI" />
                <Slider
                  defaultChecked={false}
                  min={0}
                  max={6}
                  step={0.1}
                  value={wpiAlarmValues}
                  labelAlwaysOn={true}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement>,
                    values: number[],
                  ) => changeAlarmValuesHandler(e, values, setWpiAlarmValues)}
                />
              </div>
            </AlarmSliderWrapper>
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
              rpiAlarmValues,
              cpiAlarmValues,
              wpiAlarmValues,
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
  rpiAlarmValues: number[],
  cpiAlarmValues: number[],
  wpiAlarmValues: number[],
) => {
  const wellId = Number(selectedWell);
  let [rpiLower, rpiUpper] = RPI_DEFAULT_ALARM_VALUES;
  let [wpiLower, wpiUpper] = WPI_DEFAULT_ALARM_VALUES;
  let [cpiLower, cpiUpper] = CPI_DEFAULT_ALARM_VALUES;

  if (alarmIsManual) {
    rpiLower = rpiAlarmValues[0];
    rpiUpper = rpiAlarmValues[1];
    cpiLower = cpiAlarmValues[0];
    cpiUpper = cpiAlarmValues[1];
    wpiLower = wpiAlarmValues[0];
    wpiUpper = wpiAlarmValues[1];
  }
  const result = await fetchWellMeasurements(
    wellId,
    rpiLower,
    rpiUpper,
    cpiLower,
    cpiUpper,
    wpiLower,
    wpiUpper,
  );
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

const AlarmSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  div > label {
    justify-content: center;
  }
`;
