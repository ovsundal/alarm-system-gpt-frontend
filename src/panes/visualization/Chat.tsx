import Card from "../../shared/Card";
import React from "react";
import { Typography } from "@equinor/eds-core-react";

export const Chat: React.FC = () => {
  return (
    <Card>
      <Typography
        variant="h2"
        style={{
          marginBottom: "16px",
        }}
      >
        Chat
      </Typography>
    </Card>
  );
};
