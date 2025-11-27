// src/components/Navbar.jsx
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
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { translate } from "../utils/translate.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { language } = useLanguage();

  const menuBg = useColorModeValue("white", "gray.800");
  const menuItemHoverBg = useColorModeValue("gray.100", "gray.700");
  const menuItemColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      bg="teal.500"
      color="white"
      boxShadow="lg"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="1000"
    >
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={3}
        wrap="wrap"
        maxW="1200px"
        mx="auto"
      >
        {/* LEFT — Logo on desktop, HopIn text on mobile */}
        <Flex align="center" gap={2}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            {/* Desktop Logo */}
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
              display={{ base: "none", md: "block" }}
            />
            {/* Mobile HopIn text */}
            <Text
              fontFamily="'Bevan', cursive"
              fontSize="2xl"
              fontWeight="bold"
              display={{ base: "block", md: "none" }}
            >
              <span style={{ color: "azure" }}>Hop</span>
              <span style={{ color: "black" }}>In</span>
            </Text>
          </Link>
        </Flex>

        {/* CENTER — HopIn text always visible */}
        <Flex flex="1" justify="center" px={4} minW={{ base: 0, md: "auto" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Text
              fontFamily="'Bevan', cursive"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              textAlign="center"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              textShadow="0 2px 4px rgba(0,0,0,0.3)"
              cursor="pointer"
            >
              <span style={{ color: "azure" }}>Hop</span>
              <span style={{ color: "black" }}>In</span>
            </Text>
          </Link>
        </Flex>

        {/* RIGHT — Full desktop nav */}
        <Flex align="center" display={{ base: "none", md: "flex" }} gap={4}>
          <Link to="/"><Button variant="ghost" color="white">{translate("Home", language)}</Button></Link>
          <Link to="/search-trips"><Button variant="ghost" color="white">{translate("Search Trips", language)}</Button></Link>
          <Link to="/create-trip"><Button variant="ghost" color="white">{translate("Create Trip", language)}</Button></Link>

          <Menu>
            <MenuButton as={Button} variant="ghost" color="white" rightIcon={<ChevronDownIcon />}>
              {translate("How it works", language)}
            </MenuButton>
            <MenuList bg={menuBg} border="1px solid white" color={menuItemColor}>
              <Link to="/drivers"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("For Drivers", language)}</MenuItem></Link>
              <Link to="/passengers"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("For Passengers", language)}</MenuItem></Link>
              <Link to="/passenger-guidelines"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("Passenger Guidelines", language)}</MenuItem></Link>
              <Link to="/students"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("For Students", language)}</MenuItem></Link>
              <Link to="/trust-and-safety"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("Trust & Safety", language)}</MenuItem></Link>
              <Link to="/sustainability"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("Sustainability", language)}</MenuItem></Link>
            </MenuList>
          </Menu>

          <Link to="/dashboard"><Button variant="ghost" color="white">{translate("Dashboard", language)}</Button></Link>
          <Link to="/login"><Button variant="outline" color="white" borderColor="white">{translate("Login", language)}</Button></Link>
          <Link to="/signup"><Button variant="solid" color="teal.500" bg="white" _hover={{ bg: "gray.200" }}>{translate("Signup", language)}</Button></Link>
        </Flex>

        {/* MOBILE HAMBURGER — aligned right of mobile HopIn text */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={toggleMenu}
          variant="outline"
          color="white"
          borderColor="white"
          aria-label="Toggle navigation"
          ml="auto" // pushes hamburger to far right
        />
      </Flex>

      {/* MOBILE COLLAPSE */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          display={{ base: "block", md: "none" }}
          bg="teal.600"
          p={3}
          borderRadius="md"
        >
          <Link to="/"><Button w="100%" variant="ghost" color="white">{translate("Home", language)}</Button></Link>
          <Link to="/search-trips"><Button w="100%" variant="ghost" color="white">{translate("Search Trips", language)}</Button></Link>
          <Link to="/create-trip"><Button w="100%" variant="ghost" color="white">{translate("Create Trip", language)}</Button></Link>

          <Menu isLazy>
            <MenuButton as={Button} w="100%" variant="ghost" rightIcon={<ChevronDownIcon />}>
              {translate("How it works", language)}
            </MenuButton>
            <MenuList bg={menuBg} color={menuItemColor} border="1px solid white">
              <Link to="/drivers"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("For Drivers", language)}</MenuItem></Link>
              <Link to="/passengers"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("For Passengers", language)}</MenuItem></Link>
              <Link to="/passenger-guidelines"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("Passenger Guidelines", language)}</MenuItem></Link>
              <Link to="/students"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("For Students", language)}</MenuItem></Link>
              <Link to="/trust-and-safety"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("Trust & Safety", language)}</MenuItem></Link>
              <Link to="/sustainability"><MenuItem _hover={{ bg: menuItemHoverBg }}>{translate("Sustainability", language)}</MenuItem></Link>
            </MenuList>
          </Menu>

          <Link to="/dashboard"><Button w="100%" variant="ghost" color="white">{translate("Dashboard", language)}</Button></Link>
          <Link to="/login"><Button w="100%" variant="outline" mt={2} color="white" borderColor="white">{translate("Login", language)}</Button></Link>
          <Link to="/signup"><Button w="100%" mt={2} variant="solid" color="teal.500" bg="white" _hover={{ bg: "gray.200" }}>{translate("Signup", language)}</Button></Link>
        </Box>
      </Collapse>
    </Box>
  );
}
