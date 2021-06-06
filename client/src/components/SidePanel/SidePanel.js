import React from "react";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import Chat from "./Chat/Chat";
import UserList from "./UserList";
import Options from "./Options/Options";
import WatchQueueAndHistory from "./WatchQueueAndHistory/WatchQueueAndHistory";
import { selectedTabStyles } from "../../shared/constants";

const SidePanel = ({ name, setName }) => {
  return (
    <Tabs isFitted variant="unstyled" bg="darkGrey">
      <TabList h="6vh">
        <Tab _selected={selectedTabStyles}>
          <span role="img" aria-label="chatbox emoji">
            💬
          </span>
        </Tab>
        <Tab _selected={selectedTabStyles}>
          <span role="img" aria-label="human siluet emoji">
            👤
          </span>
        </Tab>
        <Tab _selected={selectedTabStyles}>
          <span role="img" aria-label="eyes emoji">
            👀
          </span>
        </Tab>
        <Tab _selected={selectedTabStyles}>
          <span role="img" aria-label="gear emoji">
            ⚙
          </span>
        </Tab>
      </TabList>
      <TabPanels h="94vh">
        <TabPanel px={0} h="100%">
          <Chat />
        </TabPanel>
        <TabPanel px={0}>
          <UserList />
        </TabPanel>
        <TabPanel p={0}>
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
