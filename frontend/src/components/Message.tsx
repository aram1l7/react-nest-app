import React, { useEffect, useRef, useState } from "react";
import { beautifyDate, generateAvatar } from "../utils";
import { MessageType } from "../types/message";

function Message({
  username,
  message,
}: {
  username: string;
  message: MessageType;
}) {
  const messageRef = useRef<HTMLSpanElement>(null);

  const [timestamp, setTimestamp] = useState<string>(
    beautifyDate(message.timestamp)
  );

  const updateTimestamp = () => {
    if (messageRef.current) {
      setTimestamp(beautifyDate(message.timestamp));
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer: any = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateTimestamp();
          observer.unobserve(messageRef.current);
        }
      });
    }, options);

    observer.observe(messageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [message.timestamp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(beautifyDate(message.timestamp));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`message ${
        message.username === username ? "my-message" : "member-message"
      }`}
    >
      {message.username !== username && (
        <div className="name-wrapper">
          <div className="img-wrapper">
            <img src={generateAvatar(message.username.charAt(0))} />
          </div>
          <span>{message.username}</span>
        </div>
      )}
      <div
        style={{
          position: message.username === username ? "static" : "relative",
          textAlign: message.username === username ? "right" : "left",
        }}
      >
        <p className="message-info">{message.message}</p>
        <span ref={messageRef} className="date-send">
          {timestamp}
        </span>
      </div>
    </div>
  );
}

export default Message;
