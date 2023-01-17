import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import CreateTaskCom from "../CreateTaskCom";
import NavBar from "../NavBar";
import { currentUser } from "../Store.jsx";
import TaskCard from "../TaskCard";
import "./Home.css";

function Home() {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const location = useLocation();
  const isDesktop = useMediaQuery({ minWidth: 792 });
  const isMobile = useMediaQuery({ maxWidth: 667 });
  const toast = useToast();
  const toastIdRef = useRef();
  const [createTaskInputs, setCreateTaskInputs] = useState({
    title: "",
    description: "",
    date: "",
    importance: "",
  });
  const [createdTasks, setCreatedTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("allTasks")) || [];
  });

  // onchange of the input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateTaskInputs((prev) => ({ ...prev, [name]: value }));
  };

  // when submitting the task created
  const handleSubmit = (event) => {
    event.preventDefault();
    const uniqueId = Date.now() + Math.random();
    createTaskInputs.status = false;
    createTaskInputs.id = uniqueId;
    createTaskInputs.user = currentUser.email;
    // createTaskInputs.user=
    const check =
      createTaskInputs.title &&
      createTaskInputs.date &&
      createTaskInputs.description &&
      createTaskInputs.importance;
    if (check === "") {
      toastIdRef.current = toast({
        description: "all Input must be filled",
        status: "warning",
        duration: 5000,
        position: "top",
      });
    } else {
      setCreatedTasks([...createdTasks, createTaskInputs]);
      setCreateTaskInputs({
        title: "",
        description: "",
        date: "",
        importance: "",
        id: "",
        status: false,
        user: "",
      });
      onCloseModal();
    }
  };

  localStorage.setItem("allTasks", JSON.stringify(createdTasks));

  // to click make the status change to complete
  const hanleCompleteTask = (targetId) => {
    const completeTask = createdTasks.map((task) => {
      if (task.id == targetId) {
        task.status = true;
      }
      return task;
    });
    setCreatedTasks(completeTask);
  };

  // to delete task
  const handleDeleteTask = (targetId) => {
    const deleteTask = createdTasks.filter((task) => task.id !== targetId);
    setCreatedTasks(deleteTask);
  };

  const sortedTask = createdTasks.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <Box w={"auto"}>
      <NavBar />
      <Tabs
        orientation="vertical"
        variant={"soft-rounded"}
        colorScheme={"red"}
        color={"gray"}
      >
        {isMobile && (
          <Icon
            as={BiMenu}
            onClick={onOpenDrawer}
            className="menu-button"
            fontSize={"50px"}
          >
            Open
          </Icon>
        )}
        {isMobile && (
          <Drawer
            placement={"left"}
            onClose={onCloseDrawer}
            isOpen={isOpenDrawer}
            size={"xs"}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px" textAlign={"center"}>
                Tasks Management
              </DrawerHeader>
              <DrawerBody>
                <TabList p={"5"} w="80%">
                  <Tab>All Task</Tab>
                  <Tab>In Progress</Tab>
                  <Tab>Completed</Tab>
                  <Tab>Today</Tab>
                  <Tab>Tommorow</Tab>
                  <Tab>Month</Tab>
                </TabList>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
        {isDesktop && (
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
        )}
        {isDesktop && (
          <div>
            <Divider orientation="vertical" />
          </div>
        )}
        <TabPanels>
          <TabPanel>
            <Box display={"flex"} alignItems={"baseline"}>
              <Heading fontSize={"5xl"} color={"#bc544b"}>
                All Tasks
              </Heading>
              <Text fontSize={"xl"} p={"5px"}>
                {`(${
                  createdTasks.filter((task) => task.user === currentUser.email)
                    .length
                })`}
              </Text>
            </Box>
            <Box mt={"5"}>
              <SimpleGrid spacing={4} minChildWidth="250px">
                {sortedTask.map(
                  (task) =>
                    task.user === currentUser.email && (
                      <TaskCard
                        title={task.title}
                        id={task.id}
                        date={task.date}
                        description={task.description}
                        importance={task.importance}
                        status={task.status}
                        hanleCompleteTask={hanleCompleteTask}
                        handleDeleteTask={handleDeleteTask}
                        key={task.id}
                      />
                    )
                )}
              </SimpleGrid>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              In Progress
            </Heading>
            <Box mt={"5"}>
              <SimpleGrid spacing={4} minChildWidth="250px">
                {" "}
                {sortedTask.map(
                  (task) =>
                    task.status === false &&
                    task.user === currentUser.email && (
                      <TaskCard
                        title={task.title}
                        id={task.id}
                        date={task.date}
                        description={task.description}
                        importance={task.importance}
                        status={task.status}
                        hanleCompleteTask={hanleCompleteTask}
                        handleDeleteTask={handleDeleteTask}
                        key={task.id}
                      />
                    )
                )}
              </SimpleGrid>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              Completed
            </Heading>
            <Box mt={"5"}>
              <SimpleGrid spacing={4} minChildWidth="250px">
                {sortedTask.map(
                  (task) =>
                    task.status === true &&
                    task.user === currentUser.email && (
                      <TaskCard
                        title={task.title}
                        id={task.id}
                        date={task.date}
                        description={task.description}
                        importance={task.importance}
                        status={task.status}
                        hanleCompleteTask={hanleCompleteTask}
                        handleDeleteTask={handleDeleteTask}
                        key={task.id}
                      />
                    )
                )}
              </SimpleGrid>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              Today
            </Heading>
            <Box mt={"5"}>
              <SimpleGrid spacing={4} minChildWidth="250px">
                {" "}
                {sortedTask.map(
                  (task) =>
                    task.date === new Date().toISOString().substring(0, 10) &&
                    task.user === currentUser.email && (
                      <TaskCard
                        title={task.title}
                        id={task.id}
                        date={task.date}
                        description={task.description}
                        importance={task.importance}
                        status={task.status}
                        hanleCompleteTask={hanleCompleteTask}
                        handleDeleteTask={handleDeleteTask}
                        key={task.id}
                      />
                    )
                )}
              </SimpleGrid>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              Tomorrow
            </Heading>
            <Box mt={"5"}>
              <SimpleGrid spacing={4} minChildWidth="250px">
                {" "}
                {sortedTask.map(
                  (task) =>
                    task.date ===
                      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                        .toISOString()
                        .substring(0, 10) &&
                    task.user === currentUser.email && (
                      <TaskCard
                        title={task.title}
                        id={task.id}
                        date={task.date}
                        description={task.description}
                        importance={task.importance}
                        status={task.status}
                        hanleCompleteTask={hanleCompleteTask}
                        handleDeleteTask={handleDeleteTask}
                        key={task.id}
                      />
                    )
                )}
              </SimpleGrid>
            </Box>
          </TabPanel>
          <TabPanel>
            <Heading fontSize={"5xl"} color={"#bc544b"}>
              Month
            </Heading>
            <Box mt={"5"}>
              <SimpleGrid spacing={4} minChildWidth="250px">
                {" "}
                {sortedTask.map(
                  (task) =>
                    new Date(task.date).getMonth() == new Date().getMonth() &&
                    task.user === currentUser.email && (
                      <TaskCard
                        title={task.title}
                        id={task.id}
                        date={task.date}
                        description={task.description}
                        importance={task.importance}
                        status={task.status}
                        hanleCompleteTask={hanleCompleteTask}
                        handleDeleteTask={handleDeleteTask}
                        key={task.id}
                      />
                    )
                )}
              </SimpleGrid>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="deskstop-create-button">
        <Button p={"7"} onClick={onOpenModal} bg={"#bc544b"} color="white">
          + New Tasks
        </Button>
        <Modal isOpen={isOpenModal} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <CreateTaskCom
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                createTaskInputs={createTaskInputs}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </Box>
  );
}

export default Home;
