import { Tabs } from "@equinor/eds-core-react";
import React, { useEffect, useState } from "react";
import { Selection } from "./selection/Selection";
import { Visualization } from "./visualization/Visualization";
import { useLocation, useNavigate } from "react-router-dom";

export const Panes = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/selection") {
      setActiveTab(0);
    } else if (path === "/visualization") {
      setActiveTab(1);
    }
  }, [location.pathname]);

  const handleChange = (index: number) => {
    if (index === 0) {
      navigate("/selection", { replace: true });
    } else if (index === 1) {
      navigate("/visualization", { replace: true });
    }
    setActiveTab(index);
  };

  return (
    <Tabs activeTab={activeTab} onChange={handleChange}>
      <Tabs.List>
        <Tabs.Tab>Well selection and alarm settings</Tabs.Tab>
        <Tabs.Tab>Data visualization and chat</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel>
          <Selection />
        </Tabs.Panel>
        <Tabs.Panel>
          <Visualization />
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
};
