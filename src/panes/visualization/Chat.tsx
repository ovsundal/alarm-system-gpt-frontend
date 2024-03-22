import Card from "../../shared/Card";
import React, { useState } from "react";
import { Icon, Typography } from "@equinor/eds-core-react";
import "react-chat-elements/dist/main.css";
import { Input, MessageBox } from "react-chat-elements";
import styled from "styled-components";
import { send } from "@equinor/eds-icons";
import { fetchSendMessage } from "../../api/fetchData";
import { ILlmChatResponse } from "../../models/ILlmChatResponse";

type Message = {
  position: "left" | "right";
  title: string;
  text: string;
  date: number;
};
export const Chat: React.FC<{
  setLlmGraphData: React.Dispatch<React.SetStateAction<ILlmChatResponse>>;
}> = ({ setLlmGraphData }) => {
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
            handleKeyPress(
              e,
              message,
              setMessage,
              setMessageContainer,
              setLlmGraphData,
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
                  setLlmGraphData,
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
  setLlmGraphData: React.Dispatch<React.SetStateAction<ILlmChatResponse>>,
) => {
  if (e.key === "Enter") {
    handleSend(message, setMessage, setMessageContainer, setLlmGraphData);
  }
};

const handleSend = async (
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageContainer: React.Dispatch<React.SetStateAction<Message[]>>,
  setLlmGraphData: React.Dispatch<React.SetStateAction<ILlmChatResponse>>,
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
  const chatMessage = {
    position: "left",
    title: "Alarm Bot",
    date: new Date().getTime(),
    text: responseMessage.output!.chat_response,
  } as Message;
  setLlmGraphData(responseMessage);
  setMessageContainer((prevState) => [...prevState, chatMessage]);
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
