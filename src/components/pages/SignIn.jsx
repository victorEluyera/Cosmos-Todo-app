import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./SignUp.css";

function SignIn() {
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("john")) || [];
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || {};
  });
  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState("");

  const handleOnchange = (event) => {
    const { value, name } = event.target;
    setSignInInput((prev) => ({ ...prev, [name]: value }));
  };

  const closeAlert = () => {
    setAlert("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const existUsers = registeredUsers.find(
      (user) =>
        user.email === signInInput.email &&
        user.password === signInInput.password
    );

    if (!existUsers) {
      setAlert("invalid inputs");
    } else {
      setCurrentUser(existUsers);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  };
  return (
    <div>
      <Box className="signUp">
        <Center>
          <Box w="100%" m="auto" bg="white" borderRadius="15px">
            <Flex>
              <Box
                w="50%"
                bg={"red"}
                borderRadius="15px"
                h={"auto"}
                color="white"
                textAlign={"start"}
                py="12"
                px="8"
              >
                <Heading> Login </Heading>
                <br />
                <Text fontSize={"sm"}>
                  Log in and start creating your next task
                </Text>
                <Text fontSize={"sm"}>
                  Do not have an account ?<span>Sign up</span>
                </Text>
              </Box>
              <Box w="50%" p="8" h={"auto"}>
                {alert === "invalid inputs" && (
                  <Alert status="error">
                    <AlertIcon />
                    Invalid Input
                    <CloseButton
                      onClick={closeAlert}
                      alignSelf="flex-start"
                      position="relative"
                      right={"-50px"}
                      top={0}
                    />
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Input
                      placeholder="Email"
                      name="email"
                      type={"email"}
                      value={setSignInInput.email}
                      onChange={handleOnchange}
                      isRequired
                    />
                    <Input
                      placeholder="Password"
                      name="password"
                      value={setSignInInput.password}
                      onChange={handleOnchange}
                      isRequired
                    />

                    <br />
                    <br />
                    <Button type="submit" bg={"red"} color="white">
                      Login
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Flex>
          </Box>
        </Center>
      </Box>
    </div>
  );
}

export default SignIn;
