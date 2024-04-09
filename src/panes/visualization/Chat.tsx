import Card from "../../shared/Card";
import React, { useState } from "react";
import { Icon, Typography } from "@equinor/eds-core-react";
import "react-chat-elements/dist/main.css";
import { Input, MessageBox } from "react-chat-elements";
import styled from "styled-components";
import { send } from "@equinor/eds-icons";
import { fetchSendMessage } from "../../api/fetchData";
import { ILlmPlotOutput } from "../../models/ILlmPlotOutput";

type Message = {
  position: "left" | "right";
  title: string;
  text: string;
  date: number;
};
export const Chat: React.FC<{
  selectedWellName: string;
  setLlmPlotOutput: React.Dispatch<React.SetStateAction<ILlmPlotOutput>>;
  rpiAlarmValues: number[];
  cpiAlarmValues: number[];
  wpiAlarmValues: number[];
}> = ({
  setLlmPlotOutput,
  rpiAlarmValues,
  cpiAlarmValues,
  wpiAlarmValues,
  selectedWellName,
}) => {
  const [message, setMessage] = useState("");
  const [messageContainer, setMessageContainer] = useState<Message[]>([
    {
      position: "left",
      title: "Alarm Bot",
      text: "Hi there, ask me anything about the data",
      date: new Date().getTime(),
    },
  ]);
  return (
    <CardWrapper>
      <HeaderText>Chat for {selectedWellName}</HeaderText>
      <ChatWindowWrapper>
        <MessageWrapper>
          {messageContainer.map((message, index) => (
            // @ts-ignore
            <MessageBox
              key={index}
              position={message.position}
              type={"text"}
              title={message.title}
              text={message.text}
              date={message.date}
            />
          ))}
        </MessageWrapper>
        <Input
          placeholder="Type here..."
          maxHeight={100}
          maxlength={500}
          onKeyPress={(e: React.KeyboardEvent) =>
            handleKeyPress(
              e,
              message,
              setMessage,
              setMessageContainer,
              setLlmPlotOutput,
              rpiAlarmValues,
              cpiAlarmValues,
              wpiAlarmValues,
              selectedWellName,
            )
          }
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          rightButtons={
            <Icon
              data={send}
              size={18}
              onClick={() =>
                handleSend(
                  message,
                  setMessage,
                  setMessageContainer,
                  setLlmPlotOutput,
                  rpiAlarmValues,
                  cpiAlarmValues,
                  wpiAlarmValues,
                  selectedWellName,
                )
              }
            />
          }
        />
      </ChatWindowWrapper>
    </CardWrapper>
  );
};

const handleKeyPress = (
  e: React.KeyboardEvent,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageContainer: React.Dispatch<React.SetStateAction<Message[]>>,
  setLlmGraphData: React.Dispatch<React.SetStateAction<ILlmPlotOutput>>,
  rpiAlarmValues: number[],
  cpiAlarmValues: number[],
  wpiAlarmValues: number[],
  selectedWellName: string,
) => {
  if (e.key === "Enter") {
    handleSend(
      message,
      setMessage,
      setMessageContainer,
      setLlmGraphData,
      rpiAlarmValues,
      cpiAlarmValues,
      wpiAlarmValues,
      selectedWellName,
    );
  }
};

const handleSend = async (
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageContainer: React.Dispatch<React.SetStateAction<Message[]>>,
  setLlmPlotOutput: React.Dispatch<React.SetStateAction<ILlmPlotOutput>>,
  rpiAlarmValues: number[],
  cpiAlarmValues: number[],
  wpiAlarmValues: number[],
  selectedWellName: string,
) => {
  if (message.trim() === "") {
    return;
  }
  const validatedMessage = message.trim();
  setMessage("");

  setMessageContainer((prevState) => [
    ...prevState,
    {
      position: "right",
      title: "Me",
      text: validatedMessage,
      date: new Date().getTime(),
    },
  ]);
  const responseMessage = await fetchSendMessage(
    validatedMessage,
    rpiAlarmValues,
    cpiAlarmValues,
    wpiAlarmValues,
    selectedWellName,
  );
  const chatMessage = {
    position: "left",
    title: "Alarm Bot",
    date: new Date().getTime(),
    text: responseMessage.chat_response,
  } as Message;
  if (responseMessage.plotting != null) {
    setLlmPlotOutput(responseMessage.plotting);
  }
  setMessageContainer((prevState) => [...prevState, chatMessage]);
};

const CardWrapper = styled(Card)`
  background-color: #f5f5f5;
  min-height: 750px;
`;
const HeaderText = styled(Typography).attrs({
  variant: "h2",
})`
  margin-bottom: 16px;
`;

const ChatWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 93%;
`;
const MessageWrapper = styled.div`
  margin-bottom: 10px;
`;
