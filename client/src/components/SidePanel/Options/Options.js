import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import ChangeUsername from "./ChangeUsername";
import CopyRoomLink from "./CopyRoomLink";

const Options = ({ name, setName }) => {
  const history = useHistory();
  return (
    <Flex flexDirection="column">
      <ChangeUsername name={name} setName={setName} />
      <CopyRoomLink />
      <Button
        mt={3}
        colorScheme="lighterGrey"
        onClick={() => history.push("/")}
      >
        Leave room
      </Button>
    </Flex>
  );
};

export default Options;
