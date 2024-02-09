import { Radio, Table, Typography } from "@equinor/eds-core-react";
import { IWell } from "../../models/IWell";
import Card from "../../shared/Card";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

const headers = ["", "Well name"];

export const WellList: React.FC<{
  wells: IWell[];
  selectedWellId: string;
  setSelectedWellId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ wells, setSelectedWellId, selectedWellId }) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedWellId(event.target.id);
  };

  const onRowClick = (id: string) => {
    setSelectedWellId(id);
  };

  return (
    <Card>
      <TableWrapper>
        <Table.Caption>
          <Typography
            variant="h2"
            style={{
              marginBottom: "16px",
            }}
          >
            Available wells
          </Typography>
        </Table.Caption>
        <Table.Head>
          <Table.Row>
            {headers.map((name, index) => (
              <Table.Cell key={index}>{name}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {wells.map(({ name, id }) => (
            <TableRowWrapper
              $isSelected={selectedWellId === id.toString()}
              key={id}
              onClick={() => onRowClick(id.toString())}
            >
              <Table.Cell>
                <Radio
                  id={id.toString()}
                  checked={selectedWellId === id.toString()}
                  onChange={onChange}
                />
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
            </TableRowWrapper>
          ))}
        </Table.Body>
      </TableWrapper>
    </Card>
  );
};

const TableWrapper = styled(Table)`
  width: 100%;

  thead tr th:first-child {
    width: 50px; // Adjust this value to your needs
  }
`;

const TableRowWrapper = styled.tr<{ $isSelected: boolean }>`
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  ${({ $isSelected }) => $isSelected && `background-color: #d4f0d4;`}
`;
