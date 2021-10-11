import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";
import { toastMsg } from "../../../shared/constants";

const CopyRoomLink = () => {
  const toast = useToast();
  const url = window.location.href;

  const copyRoomLink = () => {
    toast(toastMsg("Room link copied.", "success"));
  };

  return (
    <Flex my={3} flexDirection="column">
      <Text color="lighterGrey.400" textAlign="center">
        Invite your friends!
      </Text>
      <InputGroup w="100%">
        <Input
          type="text"
          value={window.location.href}
          readOnly
          borderColor="lighterGrey.500"
          color="white"
          _focus={{ outline: "0" }}
        />
        <InputRightElement
          children={
            <CopyToClipboard text={url}>
              <IconButton
                onClick={copyRoomLink}
                borderRadius="none"
                className="test"
                colorScheme="brand"
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
