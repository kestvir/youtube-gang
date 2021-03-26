import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "react-avatar";

const OtherUsersChatMessage = ({ index, messageObj }) => {
  return (
    <Flex key={index} justifyContent="flex-start" alignItems="center" my={4}>
      <Avatar size="40" round={true} name={messageObj.name} />
      <Text fontSize="sm" mx={2}>
        {messageObj.name}
      </Text>
      <Box borderRadius="full" background="yellow" px={2} py={1.5} maxW="200px">
        {messageObj.text}
      </Box>
    </Flex>
  );
};

export default OtherUsersChatMessage;
