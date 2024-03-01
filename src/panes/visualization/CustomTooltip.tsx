import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import React from "react";
import styled from "styled-components";

export const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipWrapper>
        <div>Start Time: {payload[0].payload.start_time} </div>
        {payload
          .filter((entry) => typeof entry.name === "string")
          .map((entry, index: number) => {
            return (
              <div key={index} style={{ color: entry.color }}>
                {entry.name}: {entry.value}
              </div>
            );
          })}
      </CustomTooltipWrapper>
    );
  } else {
    return null;
  }
};

const CustomTooltipWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #999;
  margin: 0;
  padding: 10px;
`;
