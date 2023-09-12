import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ChatRoom = ({ username }: { username: string }) => {
  const [messages, setMessages] = useState<any>([]);
  const [messageInput, setMessageInput] = useState("");
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message, "message");

      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    const message = {
      username,
      message: messageInput,
    };
    socket.emit("message", message);
    setMessageInput("");
  };

  console.log(messages, "messages");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
