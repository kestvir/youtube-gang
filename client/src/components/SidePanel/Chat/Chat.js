import React, { useState, useEffect, useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { SocketContext } from "../../../store/contexts/SocketContext";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket)
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <Flex h="100%" flexDirection="column" justifyContent="space-between">
      <ChatMessages messages={messages} />
      <ChatMessageInput
        message={message}
        sendMessage={sendMessage}
        changeMessage={setMessage}
      />
    </Flex>
  );
};

export default Chat;
