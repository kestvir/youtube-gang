import React from "react";
import { Icon, Heading, Flex, Button, Box, Text } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io";
import styles from "./Instructions.module.css";

const Instructions = () => {
  const focusSearchOrSubmitInput = () => {
    document.getElementById("searchOrSubmitInput").focus();
  };

  return (
    <Box mt={4} position="relative">
      <Flex py={6} px={14} justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column" alignItems="center">
          <Icon w={16} h={16} as={FiSearch} />
          <Heading size="lg" py={4}>
            Search for a YouTube video
          </Heading>
          <Button
            alignSelf="center"
            colorScheme="blue"
            onClick={focusSearchOrSubmitInput}
          >
            Search
          </Button>
        </Flex>
        <div className={styles["vertical-divider"]}>
          <strong>OR</strong>
        </div>
        <Flex flexDirection="column" alignItems="center">
          <Icon w={16} h={16} as={IoLogoYoutube} />
          <Heading size="lg" pt={4}>
            Paste a YouTube video link
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Instructions;
