import React, { useEffect, useState, useContext } from "react";
import Avatar from "react-avatar";
import { Flex, Text } from "@chakra-ui/react";
import { SocketContext } from "../../store/contexts/SocketContext";

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
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Text fontSize="xl">Connected users:</Text>
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
            <Text>{userObj.name}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default UserList;
