import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "react-avatar";

const SelfChatMessage = ({ index, messageObj }) => {
  return (
    <Flex key={index} justifyContent="flex-end" alignItems="center" my={4}>
      <Box borderRadius="full" background="yellow" px={2} py={1.5} maxW="200px">
        {messageObj.text}
      </Box>
      <Text fontSize="sm" mx={2}>
        {messageObj.name}
      </Text>
      <Avatar size="40" round={true} name={messageObj.name} />
    </Flex>
  );
};

export default SelfChatMessage;
