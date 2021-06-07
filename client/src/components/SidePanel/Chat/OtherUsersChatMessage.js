import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "react-avatar";

const OtherUsersChatMessage = ({ messageObj }) => {
  return (
    <Flex justifyContent="flex-start" alignItems="center" p={4}>
      <Avatar size="40" round={true} name={messageObj.name} />
      <Text fontWeight="600" fontSize="sm" mx={2.5} color="lighterGrey.200">
        {messageObj.name}
      </Text>
      <Box
        background="almostBlack"
        paddingX="10px"
        paddingY="5px"
        borderRadius="25px"
        maxW="200px"
      >
        <Text color="white">{messageObj.text}</Text>
      </Box>
    </Flex>
  );
};

export default OtherUsersChatMessage;
