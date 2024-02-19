import { Tabs } from "@equinor/eds-core-react";
import React, { useEffect, useState } from "react";
import { Selection } from "./selection/Selection";
import { Visualization } from "./visualization/Visualization";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { IWellMeasurement } from "../models/IWellMeasurement";
import {
  CPI_DEFAULT_ALARM_VALUES,
  RPI_DEFAULT_ALARM_VALUES,
  WPI_DEFAULT_ALARM_VALUES,
} from "../shared/constants";

export const Panes = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedWellId, setSelectedWellId] = useState("");
  const [alarmIsManual, setAlarmIsManual] = useState(false);
  const [rpiAlarmValues, setRpiAlarmValues] = useState(
    RPI_DEFAULT_ALARM_VALUES,
  );
  const [cpiAlarmValues, setCpiAlarmValues] = useState(
    CPI_DEFAULT_ALARM_VALUES,
  );
  const [wpiAlarmValues, setWpiAlarmValues] = useState(
    WPI_DEFAULT_ALARM_VALUES,
  );
  const [measurementData, setMeasurementData] = useState(
    [] as IWellMeasurement[],
  );
  const navigate = useNavigate();
  const path = useLocation().pathname;

  useSetActiveTab(path, setActiveTab);
  return (
    <Tabs
      activeTab={activeTab}
      onChange={(tabIdClicked: number) =>
        onTabClick(navigate, setActiveTab, tabIdClicked)
      }
    >
      <Tabs.List>
        <Tabs.Tab>Well selection and alarm settings</Tabs.Tab>
        <Tabs.Tab>Data visualization and chat</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>
          <Selection
            selectedWellId={selectedWellId}
            setSelectedWellId={setSelectedWellId}
            alarmIsManual={alarmIsManual}
            setAlarmIsManual={setAlarmIsManual}
            setMeasurementData={setMeasurementData}
            rpiAlarmValues={rpiAlarmValues}
            setRpiAlarmValues={setRpiAlarmValues}
            cpiAlarmValues={cpiAlarmValues}
            setCpiAlarmValues={setCpiAlarmValues}
            wpiAlarmValues={wpiAlarmValues}
            setWpiAlarmValues={setWpiAlarmValues}
          />
        </Tabs.Panel>
        <Tabs.Panel>
          <Visualization measurementData={measurementData} />
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
};

const onTabClick = (
  navigate: NavigateFunction,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>,
  tabIdClicked: number,
) => {
  if (tabIdClicked === 0) {
    navigate("/selection", { replace: true });
  } else if (tabIdClicked === 1) {
    navigate("/visualization", { replace: true });
  }
  setActiveTab(tabIdClicked);
};

const useSetActiveTab = (
  path: string,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>,
) =>
  useEffect(() => {
    if (path === "/selection") {
      setActiveTab(0);
    } else if (path === "/visualization") {
      setActiveTab(1);
    }
  }, [path, setActiveTab]);
