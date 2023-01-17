import {
  Box,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { FaFlag } from "react-icons/fa";
import { ImBin, ImCheckmark, ImCheckmark2 } from "react-icons/im";

function TaskCard({
  title,
  description,
  date,
  importance,
  hanleCompleteTask,
  id,
  status,
  handleDeleteTask,
}) {
  const [filledIcon, setFilledIcon] = useState(false);
  const handlefillIcon = (id) => {
    hanleCompleteTask(id);
    setFilledIcon(true);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <Box display={"flex"} justifyContent={"space-between"} mb="5">
            <Heading size="x"> {title}</Heading>
            <Icon as={ImBin} onClick={() => handleDeleteTask(id)} />
          </Box>

          <Text fontSize={"xs"}>{description} </Text>
        </CardHeader>

        <CardFooter display={"flex"} alignItems={"end"}>
          <Icon as={AiFillClockCircle} mx="1" />
          <Text fontSize={"xs"} mb={"-0.5"}>
            {date}{" "}
          </Text>
          <Icon
            as={FaFlag}
            mx="2"
            color={
              importance == "high"
                ? "red"
                : importance == "medium"
                ? "orange"
                : "green"
            }
          />
          <Icon
            as={
              filledIcon == false && status == false
                ? ImCheckmark2
                : ImCheckmark
            }
            onClick={() => handlefillIcon(id)}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default TaskCard;
