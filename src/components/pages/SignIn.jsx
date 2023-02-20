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
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignIn() {
  const isDesktop = useMediaQuery({ minWidth: 792 });
  const isMobile = useMediaQuery({ maxWidth: 667 });
  const navigate = useNavigate();
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("registeredUsers")) || [];
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
    }
  };

  useEffect(() => {
    if (Object.keys(currentUser).length !== 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/home");
      window.location.reload();
    }
  });
  return (
    <div>
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
                bg={"#bc544b"}
                borderRadius="15px"
                h={isDesktop ? "auto" : "50vh"}
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
                  Do not have an account ?
                  <Text
                    display={"inline"}
                    fontWeight={"extrabold"}
                    onClick={() => navigate("/signUp")}
                  >
                    {" "}
                    Sign up
                  </Text>
                </Text>
              </Box>
              <Box
                w={isDesktop ? "50%" : "100%"}
                p="8"
                h={isDesktop ? "auto" : ""}
              >
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
                    <Button type="submit" bg={"#bc544b"} color="white">
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
