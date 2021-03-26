import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";

const CopyRoomLink = () => {
  const copyRoomLink = () => {};
  const url = window.location.href;

  return (
    <Flex my={3} flexDirection="column">
      <Text textAlign="center">Invite your friends!</Text>
      <InputGroup w="100%">
        <Input type="text" value={window.location.href} readOnly />
        <InputRightElement
          children={
            <CopyToClipboard text={url}>
              <IconButton
                onClick={copyRoomLink}
                borderRadius="none"
                className="test"
                colorScheme="blue"
                aria-label="Copy room link"
                icon={<FiCopy />}
              />
            </CopyToClipboard>
          }
        ></InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default CopyRoomLink;
