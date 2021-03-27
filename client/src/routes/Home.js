import React from "react";
import { generate as generateRandomUsername } from "canihazusername";
import { Flex, Heading, Button, Text } from "@chakra-ui/react";
import { MdBrandingWatermark } from "react-icons/md";

function Home({ history }) {
  function createAndJoinRoom() {
    const roomID = generateRandomUsername();
    history.push(`/room/${roomID}`);
  }

  return (
    <Flex
      bg="almostBlack"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Flex>
        <Heading color="white" size="4xl">
          Youtube
        </Heading>
        <Heading color="brand.400" size="4xl">
          Gang
        </Heading>
      </Flex>
      <Button mt={3} colorScheme="brand" size="lg" onClick={createAndJoinRoom}>
        Create a room
      </Button>
    </Flex>
  );
}

export default Home;
