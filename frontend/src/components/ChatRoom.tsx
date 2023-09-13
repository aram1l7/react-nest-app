import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatInput from "./ChatInput";
import { Container } from "semantic-ui-react";
import Message from "./Message";
import { MessageType } from "../types/message";

const ChatRoom = ({ username }: { username: string }) => {
  const [messages, setMessages] = useState<any>([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    const requestChatHistory = () => {
      socket.emit("requestChatHistory");
    };

    socket.on("message", (message: MessageType) => {
      console.log(message, "message");

      setMessages((prevMessages: MessageType[]) => [...prevMessages, message]);
    });

   

    socket.on("chatHistory", (history: MessageType[]) => {
      setMessages(history);
    });

    requestChatHistory();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (messageInput: string) => {
    const message = {
      username,
      message: messageInput,
    };
    socket.emit("message", message);
  };

  console.log(messages, "messages");

  return (
    <Container className="chat-wrapper">
      <h3>Group chat</h3>
      <div className="messages-wrapper">
        {messages.length > 0 &&
          messages.map((message: MessageType, index: number) => {
            return (
              <Message key={index} username={username} message={message} />
            );
          })}
      </div>

      <ChatInput
        sendMessage={(messageInput: string) => handleSendMessage(messageInput)}
      />
    </Container>
  );
};

export default ChatRoom;
