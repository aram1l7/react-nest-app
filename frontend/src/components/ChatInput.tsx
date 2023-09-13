import React, { useState } from "react";
import { Button, Container, Form } from "semantic-ui-react";

function ChatInput({
  sendMessage,
}: {
  sendMessage: (messageInput: string) => void;
}) {
  const [messageInput, setMessageInput] = useState<string>("");

  return (
    <Container className="chat-input-wrapper">
      <Form>
        <Form.Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        
          placeholder="Write to the chat"
        />
        <Button
          disabled={messageInput.length === 0}
          color="green"
          size="small"
          onClick={() => {
            sendMessage(messageInput);
            setMessageInput("");
          }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ChatInput;
