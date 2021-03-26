import React from "react";
import { generate as generateRandomUsername } from "canihazusername";
import { Flex, Heading, Button } from "@chakra-ui/react";

function Home({ history }) {
  function createAndJoinRoom() {
    const roomID = generateRandomUsername();
    history.push(`/room/${roomID}`);
  }

  return (
    <Flex
      bg="gray.900"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Heading as="h1" size="2xl" pb="2">
        Youtube 2gether!
      </Heading>
      <Button colorScheme="blue" size="lg" onClick={createAndJoinRoom}>
        Create Room
      </Button>
    </Flex>
  );
}

export default Home;
