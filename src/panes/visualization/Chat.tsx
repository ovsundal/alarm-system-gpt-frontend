import Card from "../../shared/Card";
import React, { useState } from "react";
import { Typography } from "@equinor/eds-core-react";
import "react-chat-elements/dist/main.css";
import { Input, MessageBox } from "react-chat-elements";
import styled from "styled-components";
import { Icon } from "@equinor/eds-core-react";
import { send } from "@equinor/eds-icons";
import { fetchSendMessage } from "../../api/fetchData";

export type Message = {
  position: "left" | "right";
  title: string;
  text: string;
  date: number;
};
export const Chat: React.FC = () => {
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
      <HeaderText>Chat</HeaderText>
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
            handleKeyPress(e, message, setMessage, setMessageContainer)
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
                handleSend(message, setMessage, setMessageContainer)
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
) => {
  if (e.key === "Enter") {
    handleSend(message, setMessage, setMessageContainer);
  }
};

const handleSend = async (
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageContainer: React.Dispatch<React.SetStateAction<Message[]>>,
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
  const responseMessage = await fetchSendMessage(validatedMessage);

  setMessageContainer((prevState) => [...prevState, responseMessage]);
};

const CardWrapper = styled(Card)`
  background-color: #f5f5f5;
  height: 750px;
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
const MessageWrapper = styled.div``;
