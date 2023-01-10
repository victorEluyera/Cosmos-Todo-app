import {
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CreateTaskCom from "../CreateTaskCom";
import NavBar from "../NavBar";
import "./Home.css";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <NavBar />
      <Tabs
        orientation="vertical"
        variant={"soft-rounded"}
        colorScheme={"red"}
        color={"gray"}
      >
        <TabList p={"5"} w="20%">
          <Text fontSize={"sm"} textAlign={"center"}>
            Tasks Management
          </Text>
          <Tab>All Task</Tab>
          <Tab>In Progress</Tab>
          <Tab>Completed</Tab>
          <Tab>Today</Tab>
          <Tab>Tommorow</Tab>
          <Tab>Month</Tab>
        </TabList>
        <div>
          <Divider orientation="vertical" />
        </div>
        <TabPanels>
          <TabPanel display={"flex"} alignItems={"baseline"}>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              All Tasks
            </Heading>
            <Text fontSize={"xl"} p={"5px"}>
              (0)
            </Text>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              In Progress
            </Heading>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              Completed
            </Heading>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              Today
            </Heading>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              Tommorow
            </Heading>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              Month
            </Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="create-button">
        <Button p={"7"} onClick={onOpen} bg={"#bc544b"} color="white">
          + New Tasks
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <CreateTaskCom />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
