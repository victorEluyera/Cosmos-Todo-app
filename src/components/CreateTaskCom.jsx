import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

function CreateTaskCom({ handleChange, handleSubmit, createTaskInputs }) {
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
          <Button bg={"#bc544b"} color={"white"} type={"submit"}>
            Add New Task
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default CreateTaskCom;
