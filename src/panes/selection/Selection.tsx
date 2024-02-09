import React, { useEffect } from "react";
import { fetchWellData } from "../../api/fetchData";
import { IWell } from "../../models/IWell";
import { WellList } from "./WellList";
import styled from "styled-components";

export const Selection: React.FC<{
  selectedWell: string;
  setSelectedWell: React.Dispatch<React.SetStateAction<string>>;
}> = ({ selectedWell, setSelectedWell }) => {
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
        selectedWell={selectedWell}
        setSelectedWell={setSelectedWell}
      />
    </SelectionWrapper>
  );
};

const SelectionWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
