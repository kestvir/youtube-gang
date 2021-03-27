import React, { useState, useEffect } from "react";
import { Input, InputRightElement, InputGroup, Icon } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

const ChatMessageInput = ({ message, changeMessage, sendMessage }) => {
  const [sndMsgInputIconColor, setSndMsgInputIconColor] = useState(
    "lighterGrey.400"
  );
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);

  useEffect(() => {
    const correctSndMsgInputIconColor = () => {
      const trimmedMessageLength = message.trim().length;
      if (trimmedMessageLength && isInputOnFocus) {
        setSndMsgInputIconColor("brand.500");
      } else if (!trimmedMessageLength && !isInputOnFocus) {
        setSndMsgInputIconColor("lighterGrey.400");
      } else if (!trimmedMessageLength && isInputOnFocus)
        setSndMsgInputIconColor("lighterGrey.500");
    };

    correctSndMsgInputIconColor();
  }, [message, isInputOnFocus]);

  //   useEffect(() => {
  //     const trimmedMessage = message.trim();
  //     if (trimmedMessage) setIsMsgInputEmpty(false);
  //     else setIsMsgInputEmpty(true);
  //   }, [message]);;

  return (
    <InputGroup>
      <Input
        bg="lighterGrey.600"
        _hover={{ background: "lighterGrey.500" }}
        _focus={{ background: "lighterGrey.700" }}
        onFocus={() => setIsInputOnFocus(true)}
        onBlur={() => setIsInputOnFocus(false)}
        color="white"
        value={message}
        onChange={(e) => changeMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
        type="text"
        variant="filled"
        w="100%"
        placeholder="Send message"
        _placeholder={{ color: "lighterGrey.200" }}
      />
      <InputRightElement
        children={
          <Icon
            cursor="pointer"
            onClick={(e) => sendMessage(e)}
            as={FiSend}
            color={sndMsgInputIconColor}
          />
        }
      />
    </InputGroup>
  );
};

export default ChatMessageInput;
