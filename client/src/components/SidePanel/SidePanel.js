import React from "react";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import Chat from "./Chat/Chat";
import UserList from "./UserList";
import Options from "../Options/Options";
import WatchQueueAndHistory from "./WatchQueueAndHistory/WatchQueueAndHistory";

const SidePanel = ({ name, setName }) => {
  return (
    <Tabs isFitted variant="unstyled">
      <TabList h="6vh">
        <Tab _selected={{ color: "white", bg: "blue.500" }}>💬</Tab>
        <Tab _selected={{ color: "white", bg: "green.400" }}>👤</Tab>
        <Tab _selected={{ color: "white", bg: "green.400" }}>👀</Tab>
        <Tab _selected={{ color: "white", bg: "green.400" }}>⚙</Tab>
      </TabList>
      <TabPanels h="94vh">
        <TabPanel h="100%">
          <Chat />
        </TabPanel>
        <TabPanel>
          <UserList />
        </TabPanel>
        <TabPanel px={0}>
          <WatchQueueAndHistory />
        </TabPanel>
        <TabPanel>
          <Options name={name} setName={setName} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SidePanel;
