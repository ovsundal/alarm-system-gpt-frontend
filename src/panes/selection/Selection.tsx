import React, { useEffect } from "react";
import { fetchWellData } from "../../api/fetchData";
import { IWell } from "../../models/IWell";
import { WellList } from "./WellList";
import styled from "styled-components";
import { Alarm } from "./Alarm";
import { IWellMeasurement } from "../../models/IWellMeasurement";

export const Selection: React.FC<{
  selectedWellId: string;
  setSelectedWellId: React.Dispatch<React.SetStateAction<string>>;
  alarmIsManual: boolean;
  setAlarmIsManual: React.Dispatch<React.SetStateAction<boolean>>;
  alarmValues: number[];
  setAlarmValues: React.Dispatch<React.SetStateAction<number[]>>;
  setMeasurementData: React.Dispatch<React.SetStateAction<IWellMeasurement[]>>;
}> = ({
  selectedWellId,
  setSelectedWellId,
  alarmIsManual,
  setAlarmIsManual,
  setAlarmValues,
  alarmValues,
  setMeasurementData,
}) => {
  const [wells, setWells] = React.useState([] as IWell[]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchWellData();
      setWells(response);
    };

    getData();
  }, []);
  return (
    <SelectionWrapper>
      <WellList
        wells={wells}
        selectedWellId={selectedWellId}
        setSelectedWellId={setSelectedWellId}
      />
      <Alarm
        selectedWellId={selectedWellId}
        alarmIsManual={alarmIsManual}
        setAlarmIsManual={setAlarmIsManual}
        alarmValues={alarmValues}
        setAlarmValues={setAlarmValues}
        setMeasurementData={setMeasurementData}
      />
    </SelectionWrapper>
  );
};

const SelectionWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
`;
