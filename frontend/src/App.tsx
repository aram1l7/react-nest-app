import React, { useState } from "react";
import { Button, Input, Modal } from "semantic-ui-react";
import io from "socket.io-client";
import ChatRoom from "./components/ChatRoom";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";

function App() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const handleJoinChat = () => {
    const newSocket = io("http://localhost:3000");
    console.log(newSocket, "socket");

    newSocket.on("connect", () => {
      newSocket.emit("join", username);
      setShowLoginModal(false);

      setSocket(newSocket);
    });

    newSocket.on("registrationError", (error: string) => {
      console.log(error, "error");

      setSocket(null);
      setError(error);
      newSocket.disconnect();
      setShowLoginModal(true);
    });
  };
  return (
    <div>
      <Modal
        size="mini"
        closeOnEscape={false}
        closeOnDimmerClick={false}
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
      >
        <Modal.Header>Enter username</Modal.Header>
        <Modal.Content>
          <Input
            style={{ width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            error={!!error}
          />
          {!!error && (
            <span style={{ color: "red", fontSize: "13px" }}>{error}</span>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleJoinChat()} positive>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
      {socket && <ChatRoom username={username} />}
    </div>
  );
}

export default App;
