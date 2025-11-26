import React, { useState } from "react";
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
  MenuItem,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

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
      {/* TOP BAR */}
      <Flex justify="space-between" align="center">
        {/* LEFT — LOGO */}
        <Link to="/">
          <Image
            src="/images/bunny-logo.png"
            alt="App Logo"
            width="80px"
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

        {/* HAMBURGER BUTTON — MOBILE ONLY */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={toggleMenu}
          variant="outline"
          color="white"
          borderColor="white"
          aria-label="Toggle navigation"
        />

        {/* RIGHT — FULL NAV (DESKTOP ONLY) */}
        <Flex
          gap={4}
          align="center"
          display={{ base: "none", md: "flex" }}
        >
          <Link to="/">
            <Button variant="ghost" color="white">Home</Button>
          </Link>

          <Link to="/search-trips">
            <Button variant="ghost" color="white">Search Trips</Button>
          </Link>

          <Link to="/create-trip">
            <Button variant="ghost" color="white">Create Trip</Button>
          </Link>

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              color="white"
              rightIcon={<ChevronDownIcon />}
            >
              How it works
            </MenuButton>
            <MenuList bg="teal.600" border="1px solid white" color="white">
              <Link to="/drivers">
                <MenuItem bg="teal.600" _hover={{ bg: "teal.700" }}>
                  For Drivers
                </MenuItem>
              </Link>

              <Link to="/passengers">
                <MenuItem bg="teal.600" _hover={{ bg: "teal.700" }}>
                  For Passengers
                </MenuItem>
              </Link>

              <Link to="/passenger-guidelines">
                <MenuItem bg="teal.600" _hover={{ bg: "teal.700" }}>
                  Passenger Guidelines
                </MenuItem>
              </Link>

              <Link to="/students">
                <MenuItem bg="teal.600" _hover={{ bg: "teal.700" }}>
                  For Students
                </MenuItem>
              </Link>

              <Link to="/trust-and-safety">
                <MenuItem bg="teal.600" _hover={{ bg: "teal.700" }}>
                  Trust & Safety
                </MenuItem>
              </Link>

              <Link to="/sustainability">
                <MenuItem bg="teal.600" _hover={{ bg: "teal.700" }}>
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
            <Button variant="solid" color="teal.500" bg="white" _hover={{ bg: "gray.200" }}>
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>

      {/* MOBILE NAV — COLLAPSIBLE */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          mt={4}
          display={{ base: "block", md: "none" }}
          bg="teal.600"
          p={3}
          borderRadius="md"
        >
          <Link to="/">
            <Button w="100%" variant="ghost" color="white">Home</Button>
          </Link>

          <Link to="/search-trips">
            <Button w="100%" variant="ghost" color="white">Search Trips</Button>
          </Link>

          <Link to="/create-trip">
            <Button w="100%" variant="ghost" color="white">Create Trip</Button>
          </Link>

          {/* MOBILE DROPDOWN */}
          <Menu isLazy>
            <MenuButton
              as={Button}
              w="100%"
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
            >
              How it works
            </MenuButton>
            <MenuList bg="teal.600" border="1px solid white">
              <Link to="/drivers"><MenuItem>For Drivers</MenuItem></Link>
              <Link to="/passengers"><MenuItem>For Passengers</MenuItem></Link>
              <Link to="/passenger-guidelines"><MenuItem>Passenger Guidelines</MenuItem></Link>
              <Link to="/students"><MenuItem>For Students</MenuItem></Link>
              <Link to="/trust-and-safety"><MenuItem>Trust & Safety</MenuItem></Link>
              <Link to="/sustainability"><MenuItem>Sustainability</MenuItem></Link>
            </MenuList>
          </Menu>

          <Link to="/dashboard">
            <Button w="100%" variant="ghost" color="white">Dashboard</Button>
          </Link>

          <Link to="/login">
            <Button w="100%" variant="outline" mt={2} color="white" borderColor="white">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              w="100%"
              mt={2}
              variant="solid"
              color="teal.500"
              bg="white"
              _hover={{ bg: "gray.200" }}
            >
              Signup
            </Button>
          </Link>
        </Box>
      </Collapse>

      {/* CENTERED APP NAME */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        pointerEvents="none"
        display={{ base: "none", md: "block" }}
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
