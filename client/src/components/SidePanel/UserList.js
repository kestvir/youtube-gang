import React, { useEffect, useState, useContext } from "react";
import Avatar from "react-avatar";
import { Flex, Text } from "@chakra-ui/react";
import { SocketContext } from "../../store/contexts/SocketContext";
import ScrollToBottom from "react-scroll-to-bottom";

const UserList = () => {
  const { state } = useContext(SocketContext);
  const { socket } = state;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  return (
    <ScrollToBottom className="scroll-items">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text color="lighterGrey.400" fontSize="xl">
          Connected users:
        </Text>
        {users.map((userObj) => {
          return (
            <Flex
              key={userObj.id}
              my={3}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar size="80" round={true} name={userObj.name} />
              <Text color="lightestGrey">{userObj.name}</Text>
            </Flex>
          );
        })}
      </Flex>
    </ScrollToBottom>
  );
};

export default UserList;
