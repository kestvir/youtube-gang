import React, { useContext, useEffect, useRef } from "react";
import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SocketContext } from "../../../store/contexts/SocketContext";
import { FiCheck } from "react-icons/fi";
import { successMsg } from "../../../shared/constants";

const ChangeUsername = ({ name, setName }) => {
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const toast = useToast();
  const currentUsernameRef = useRef(null);

  useEffect(() => {
    if (!name || currentUsernameRef.current) return;
    currentUsernameRef.current = name;
  }, [name]);

  const submitNewUsername = (e) => {
    e.preventDefault();
    if (!currentUsernameRef.current || currentUsernameRef.current === name) {
      return;
    } else {
      socket.emit("changeName", name);
      toast(successMsg("Username changed successfully."));
      currentUsernameRef.current = name;
    }
  };

  const changeName = (e) => {
    const userInput = e.target.value;
    if (!userInput.length) return;
    setName(e.target.value);
  };

  return (
    <Flex my={3} flexDirection="column">
      <Text color="lighterGrey.400" textAlign="center">
        Hello, my name is:
      </Text>
      <form onSubmit={submitNewUsername}>
        <InputGroup w="100%">
          <Input
            required
            _focus={{ outline: "0" }}
            type="text"
            value={name}
            onChange={changeName}
            borderColor="lighterGrey.500"
            color="white"
          />
          <InputRightElement
            children={
              <IconButton
                type="submit"
                onClick={submitNewUsername}
                borderRadius="none"
                className="test"
                colorScheme="brand"
                aria-label="Submit new name"
                icon={<FiCheck />}
              />
            }
          ></InputRightElement>
        </InputGroup>
      </form>
    </Flex>
  );
};

export default ChangeUsername;
