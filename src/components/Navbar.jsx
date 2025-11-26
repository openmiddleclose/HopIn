import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Navbar() {
  return (
    <Box
      bg="teal.500"
      p={4}
      color="white"
      boxShadow="lg"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="1000"
    >
      <Flex justify="space-between" align="center">

        {/* LEFT — APP LOGO */}
        <Link to="/">
          <Image
            src="/images/bunny-logo.png"
            alt="App Logo"
            width="100px"
            height="auto"
            cursor="pointer"
            border="3px solid black"
            borderRadius="12px"
            boxShadow="0 0 10px rgba(255,255,255,0.6)"
            transition="0.3s ease"
            _hover={{
              transform: "scale(1.1)",
              boxShadow: "0 0 18px rgba(255,255,255,0.9)",
            }}
          />
        </Link>

        {/* RIGHT — NAV LINKS */}
        <Flex gap={4} align="center">
          <Link to="/">
            <Button variant="ghost" color="white">Home</Button>
          </Link>

          <Link to="/search-trips">
            <Button variant="ghost" color="white">Search Trips</Button>
          </Link>

          <Link to="/create-trip">
            <Button variant="ghost" color="white">Create Trip</Button>
          </Link>

          {/* ⭐ HOW IT WORKS MENU ⭐ */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              color="white"
              rightIcon={<ChevronDownIcon />}
            >
              How it works
            </MenuButton>

            <MenuList
              bg="teal.600"
              border="1px solid white"
              color="white"
            >
              <Link to="/drivers">
                <MenuItem
                  bg="teal.600"
                  _hover={{ bg: "teal.700", color: "white" }}
                >
                  For Drivers
                </MenuItem>
              </Link>

              <Link to="/passengers">
                <MenuItem
                  bg="teal.600"
                  _hover={{ bg: "teal.700", color: "white" }}
                >
                  For Passengers
                </MenuItem>
              </Link>

              {/* ⭐ NEW NAV ITEM: Passenger Guidelines ⭐ */}
              <Link to="/passenger-guidelines">
                <MenuItem
                  bg="teal.600"
                  _hover={{ bg: "teal.700", color: "white" }}
                >
                  Passenger Guidelines
                </MenuItem>
              </Link>

              <Link to="/students">
                <MenuItem
                  bg="teal.600"
                  _hover={{ bg: "teal.700", color: "white" }}
                >
                  For Students
                </MenuItem>
              </Link>

              <Link to="/trust-and-safety">
                <MenuItem
                  bg="teal.600"
                  _hover={{ bg: "teal.700", color: "white" }}
                >
                  Trust & Safety
                </MenuItem>
              </Link>

              <Link to="/sustainability">
                <MenuItem
                  bg="teal.600"
                  _hover={{ bg: "teal.700", color: "white" }}
                >
                  Sustainability
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>

          <Link to="/dashboard">
            <Button variant="ghost" color="white">Dashboard</Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" color="white" borderColor="white">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              variant="solid"
              color="teal.500"
              bg="white"
              _hover={{ bg: "gray.200" }}
            >
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>

      {/* CENTERED APP NAME */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        pointerEvents="none"
      >
        <Link to="/" style={{ textDecoration: "none", pointerEvents: "auto" }}>
          <Text
            fontFamily="'Bevan', cursive"
            fontSize="3xl"
            fontWeight="bold"
            textShadow="0 2px 4px rgba(0,0,0,0.3)"
            cursor="pointer"
            _hover={{ transform: "scale(1.05)" }}
            transition="0.2s"
          >
            <span style={{ color: "azure" }}>Hop</span>
            <span style={{ color: "black" }}>In</span>
          </Text>
        </Link>
      </Box>
    </Box>
  );
}
