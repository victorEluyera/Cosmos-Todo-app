import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "./img/logo.png";
import profileAvatar from "./img/profile.png";
import "./NavBar.css";

function NavBar() {
  const [currentUser, setCurrentUser] =
    useState(() => {
      return JSON.parse(localStorage.getItem("currentUser"));
    }) || {};
  return (
    <>
      <div className="nav-container">
        <Box className="nav-sub-container">
          <Image src={logo} alt="Logo" boxSize={"80px"} />
          <Heading fontSize={"20px"} color="#bc544b">
            Todo App
          </Heading>
        </Box>
        <Box className="nav-sub-container">
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                >
                  {currentUser.username}
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          <Image
            src={profileAvatar}
            alt="Profile Picture"
            boxSize={"50px"}
            borderRadius={"full"}
          />
        </Box>
      </div>
      <Divider />
    </>
  );
}

export default NavBar;
