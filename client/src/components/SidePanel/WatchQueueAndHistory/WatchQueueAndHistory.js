import React from "react";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import QueueOrHistory from "./QueueOrHistory";
import { selectedTabStyles } from "../../../shared/constants";

const WatchQueueAndHistoryTabs = () => {
  return (
    <Tabs isFitted variant="unstyled">
      <TabList>
        <Tab color="white" _selected={selectedTabStyles}>
          Queue
        </Tab>
        <Tab color="white" _selected={selectedTabStyles}>
          History
        </Tab>
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
