import React from "react";
import { Input, InputRightElement, InputGroup, Icon } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

const ChatMessageInput = ({ message, changeMessage, sendMessage }) => {
  return (
    <InputGroup>
      <Input
        value={message}
        onChange={(e) => changeMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
        type="text"
        variant="filled"
        w="100%"
        placeholder="Send message"
      />
      <InputRightElement
        children={
          <Icon
            cursor="pointer"
            onClick={(e) => sendMessage(e)}
            as={FiSend}
            color="gray.600"
          />
        }
      />
    </InputGroup>
  );
};

export default ChatMessageInput;
