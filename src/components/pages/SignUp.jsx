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
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const isDesktop = useMediaQuery({ minWidth: 792 });
  const isMobile = useMediaQuery({ maxWidth: 667 });
  const navigate = useNavigate();

  const goToLogin = (e) => {
    navigate("/");
  };

  const [signUpInput, setSignUpInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showAlert, setShowAlert] = useState("");
  const [registerUsers, setRegisterUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("registeredUsers")) || [];
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setSignUpInput((prev) => ({ ...prev, [name]: value }));
  };

  const closeAlert = () => {
    setShowAlert("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existUsers = registerUsers.find(
      (users) => users.email === signUpInput.email
    );
    if (existUsers) {
      setShowAlert("existUsers");
    } else if (signUpInput.password !== signUpInput.confirmPassword) {
      setShowAlert("passwords not correct");
    } else {
      setRegisterUsers([...registerUsers, signUpInput]);
    }
  };
  localStorage.setItem("registeredUsers", JSON.stringify(registerUsers));
  return (
    <>
      <Box className={isDesktop ? "signUp" : ""}>
        <Center>
          <Box
            w={isDesktop ? "80%" : "100%"}
            m="auto"
            bg="white"
            borderRadius="15px"
          >
            <Flex
              direction={isDesktop ? "row" : "column"}
              justifyContent={isMobile && "space-between"}
              h={isMobile && "100vh"}
            >
              <Box
                w={isDesktop ? "50%" : "100%"}
                p="8"
                h={isDesktop ? "auto" : ""}
              >
                {showAlert === "existUsers" && (
                  <Alert status="error">
                    <AlertIcon />
                    Users Already Exist
                    <CloseButton
                      onClick={closeAlert}
                      alignSelf="flex-start"
                      position="relative"
                      right={"-50px"}
                      top={0}
                    />
                  </Alert>
                )}

                {showAlert === "passwords not correct" && (
                  <Alert status="warning">
                    <AlertIcon />
                    Incorrect Passwords{" "}
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
                      placeholder="Username"
                      name="username"
                      value={setSignUpInput.username}
                      onChange={handleOnchange}
                      isRequired
                    />
                    <Input
                      placeholder="Email"
                      type={"email"}
                      name="email"
                      value={setSignUpInput.email}
                      onChange={handleOnchange}
                      isRequired
                    />
                    <Input
                      placeholder="Password"
                      name="password"
                      type={"password"}
                      value={setSignUpInput.password}
                      onChange={handleOnchange}
                      isRequired
                    />
                    <Input
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      type={"password"}
                      value={setSignUpInput.confirmPassword}
                      onChange={handleOnchange}
                      isRequired
                    />
                    <br />
                    <br />
                    <Button type="submit" bg={"#bc544b"} color="white">
                      Sign Up
                    </Button>
                  </Stack>
                </form>
              </Box>
              <Box
                w={isDesktop ? "50%" : "100%"}
                bg={"#bc544b"}
                borderRadius="15px"
                h={isDesktop ? "auto" : "50vh"}
                color="white"
                textAlign={"start"}
                py="12"
                px="8"
              >
                <Heading> Sign Up </Heading>
                <br />
                <Text fontSize={"sm"}>
                  Register and create an account on Todo List. Write your tasks
                  anytime and anywhere
                </Text>
                <Text fontSize={"md"}>
                  Already have an account ?{" "}
                  <Text
                    display={"inline"}
                    fontWeight={"extrabold"}
                    onClick={goToLogin}
                  >
                    Login
                  </Text>
                </Text>
              </Box>
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
}

export default SignUp;
