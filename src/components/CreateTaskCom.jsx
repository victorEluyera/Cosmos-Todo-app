import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
// import "./Home.css";

function CreateTaskCom() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createTaskInputs, setCreateTaskInputs] = useState({
    title: "",
    description: "",
    date: "",
    importance: "",
  });
  const [createdTasks, setCreatedTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("allTasks")) || [];
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateTaskInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTaskInputs.status = false;
    setCreatedTasks([...createdTasks, createTaskInputs]);
  };

  localStorage.setItem("allTasks", JSON.stringify(createdTasks));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Task Title"
              name="title"
              value={createTaskInputs.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              size={"md"}
              value={createTaskInputs.description}
              name="description"
              placeholder={"Description about this task"}
              resize="none"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date Picker</FormLabel>
            <Input
              type={"date"}
              name="date"
              value={createTaskInputs.date}
              onChange={handleChange}
            />
          </FormControl>
          <Select
            placeholder="Importance"
            name="importance"
            value={createTaskInputs.importance}
            onChange={handleChange}
          >
            <option value={"low"}>Low</option>
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
          </Select>
          <br />
          <br />
          <Button
            bg={"#bc544b"}
            color={"white"}
            type={"submit"}
            onClick={onClose}
          >
            Add New Task
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default CreateTaskCom;
