import React, { useContext } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { SocketContext } from "../../../store/contexts/SocketContext";

import ScrollToBottom from "react-scroll-to-bottom";
import SelfChatMessage from "./SelfChatMessage";
import OtherUsersChatMessage from "./OtherUsersChatMessage";

const ChatMessages = ({ messages }) => {
  const { state } = useContext(SocketContext);
  const { socket } = state;

  return (
    <ScrollToBottom className="scroll-items">
      <Flex flexDirection="column">
        {messages.map((messageObj, index) => {
          if (messageObj.userId === "admin") {
            return (
              <Text
                mx={2}
                key={index}
                textAlign="center"
                fontSize="sm"
                color="lighterGrey.400"
              >
                {messageObj.text}
              </Text>
            );
          } else if (messageObj.userId !== socket.id) {
            return (
              <OtherUsersChatMessage
                key={index}
                index={index}
                messageObj={messageObj}
              />
            );
          } else {
            return (
              <SelfChatMessage
                key={index}
                index={index}
                messageObj={messageObj}
              />
            );
          }
        })}
      </Flex>
    </ScrollToBottom>
  );
};

export default ChatMessages;
