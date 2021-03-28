import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SocketContext } from "../../store/contexts/SocketContext";
import { FiCheck } from "react-icons/fi";
import { successMsg } from "../shared/constants";

const ChangeUsername = ({ name, setName }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const toast = useToast();
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current && name.trim().length) {
      setCurrentUsername(name);
      firstRenderRef.current = false;
    }
  }, [name]);

  const submitNewUsername = (e) => {
    e.preventDefault();
    if (currentUsername === name) return;
    socket.emit("change name", name);
    toast(successMsg("Username changed successfully."));
    setCurrentUsername(name);
  };
  const changeName = (e) => {
    const userInput = e.target.value.trim();
    if (userInput.length) setName(userInput);
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
            value={currentUsername}
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
