import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../NavBar";
import { allUsers } from "../Store";

function Profile() {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || {};
  });

  const [profileInput, setProfileInput] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
    confirmPassword: currentUser.confirmPassword,
    file: null,
    previewUrl: currentUser.previewUrl,
  });
  const toast = useToast();

  const toastIdRef = useRef();
  useEffect(() => {
    if (!profileInput.file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setProfileInput({ ...profileInput, previewUrl: fileReader.result });
    };
    fileReader.readAsDataURL(profileInput.file);
  }, [profileInput.file]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name == "file") {
      setProfileInput({
        ...profileInput,
        file: event.target.files[0],
        previewUrl: null,
      });
    } else {
      setProfileInput({ ...profileInput, [name]: value });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const editUser = allUsers.findIndex(
      (user) => user.email == currentUser.email
    );

    if (profileInput.password == profileInput.confirmPassword) {
      currentUser.previewUrl = profileInput.previewUrl;
      allUsers[editUser] = profileInput;
      setCurrentUser(profileInput);
      console.log(allUsers);
      window.location.reload();
    } else {
      toastIdRef.current = toast({
        description: "passwords and Confirm Password must be the same",
        status: "warning",
        duration: 5000,
        position: "top",
      });
    }
  };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("registeredUsers", JSON.stringify(allUsers));
  return (
    <div>
      <NavBar />
      <Box>
        <Box w="300px" m={"7"} color={"#bc445b"}>
          <Heading m={"5"}>Profile</Heading>
          <Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {profileInput.previewUrl && (
                  <Image
                    src={profileInput.previewUrl}
                    alt="Preview"
                    borderRadius="full"
                    objectFit="cover"
                    boxSize="100px"
                  />
                )}
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept="image/*"
                  title=""
                />

                <Input
                  type={"text"}
                  placeholder={"Update Username"}
                  value={profileInput.username}
                  onChange={handleChange}
                  name="username"
                />
                <Input
                  type={"email"}
                  placeholder={"Update Email"}
                  value={profileInput.email}
                  onChange={handleChange}
                  name="email"
                />

                <Input
                  type={"password"}
                  placeholder={"Leave Password blank to keep the same"}
                  onChange={handleChange}
                  name="password"
                />
                <Input
                  type={"password"}
                  placeholder={"Leave Password blank to keep the same"}
                  onChange={handleChange}
                  name="confirmPassword"
                />
                <Button type="submit" color={"white"} bg={"#bc445b"}>
                  Update Profile
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
