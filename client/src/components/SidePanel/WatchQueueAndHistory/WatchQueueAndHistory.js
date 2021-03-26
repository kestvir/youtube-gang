import React from "react";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import QueueOrHistory from "./QueueOrHistory";

const WatchQueueAndHistoryTabs = () => {
  return (
    <Tabs isFitted variant="unstyled">
      <TabList>
        <Tab _selected={{ color: "white", bg: "blue.500" }}>💃</Tab>
        <Tab _selected={{ color: "white", bg: "green.400" }}>🏜 </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <QueueOrHistory isQueue={true} />
        </TabPanel>
        <TabPanel>
          <QueueOrHistory isQueue={false} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default WatchQueueAndHistoryTabs;
