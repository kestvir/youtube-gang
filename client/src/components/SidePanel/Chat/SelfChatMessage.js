import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "react-avatar";

const SelfChatMessage = ({ messageObj }) => {
  return (
    <Flex justifyContent="flex-end" alignItems="center" my={4}>
      <Box background="transparent" maxW="200px">
        <Text color="white">{messageObj.text}</Text>
      </Box>
      <Text fontWeight="600" fontSize="sm" mx={2.5} color="lighterGrey.200">
        {messageObj.name}
      </Text>
      <Avatar size="40" round={true} name={messageObj.name} />
    </Flex>
  );
};

export default SelfChatMessage;
