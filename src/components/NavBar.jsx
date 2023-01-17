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
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./img/logo.png";
import profileAvatar from "./img/profile.png";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] =
    useState(() => {
      return JSON.parse(localStorage.getItem("currentUser"));
    }) || {};

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleNavigateProfile = () => {
    if (location.pathname === "/home") {
      navigate("/profile");
    } else {
      navigate("/home");
    }
  };
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
                  color="#bc544b"
                  bg={"white"}
                >
                  {currentUser.username}
                </MenuButton>
                <MenuList color={"#bc544b"}>
                  <MenuItem onClick={handleNavigateProfile}>
                    {location.pathname === "/home" ? "Profile" : "Home"}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          <Image
            src={
              currentUser.previewUrl ? currentUser.previewUrl : profileAvatar
            }
            alt="Profile Picture"
            boxSize={"50px"}
            objectFit="cover"
            borderRadius={"full"}
            mx="2"
          />
        </Box>
      </div>
      <Divider />
    </>
  );
}

export default NavBar;
