import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const VolumeAlert = ({ setMuted }) => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => {
    setMuted(true);
    setIsOpen(false);
  };

  const unmute = () => {
    setMuted(false);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      isCentered={true}
      onClose={onClose}
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enable volume?</ModalHeader>
        <ModalBody>Do you want to enable volume automatically?</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            No
          </Button>
          <Button onClick={unmute} colorScheme="red">
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VolumeAlert;
