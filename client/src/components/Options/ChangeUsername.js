import React, { useContext } from "react";
import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { SocketContext } from "../../store/contexts/SocketContext";
import { FiCheck } from "react-icons/fi";

const ChangeUsername = ({ name, setName }) => {
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const submitNewUsername = (e) => {
    e.preventDefault();
    socket.emit("change name", name);
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
