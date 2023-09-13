import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatInput from "./ChatInput";
import { Container } from "semantic-ui-react";
import { beautifyDate, generateAvatar } from "../../utils";

type Message = {
  timestamp: Date;
  username: string;
  message: string;
};

const ChatRoom = ({ username }: { username: string }) => {
  const [messages, setMessages] = useState<any>([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("message", (message: Message) => {
      console.log(message, "message");

      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

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
          messages.map((ele: Message, index: number) => {
            return (
              <div
                key={index} // using index as key because not stored in db with ids and no crud functionality is needed
                className={`message ${
                  ele.username === username ? "my-message" : "member-message"
                }`}
              >
                {ele.username !== username && (
                  <div className="name-wrapper">
                    <div className="img-wrapper">
                      <img src={generateAvatar(ele.username.charAt(0))} />
                    </div>
                    <span>{ele.username}</span>
                  </div>
                )}
                <div style={{position: ele.username === username ? 'static' : 'relative'}}>
                  <p>{ele.message}</p>
                  <span className="date-send">
                    {beautifyDate(ele.timestamp)}
                  </span>
                </div>
              </div>
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
