// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  IconButton,
  Divider,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { translate } from "../utils/translate.js";

export default function Footer() {
  const bg = useColorModeValue("gray.900", "gray.900");
  const textColor = useColorModeValue("gray.300", "gray.300");
  const headingColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.700", "gray.700");

  const { language, setLanguage } = useLanguage();

  // Social media links
  const socialLinks = [
    { icon: FaFacebook, url: "https://facebook.com" },
    { icon: FaTwitter, url: "https://x.com" },
    { icon: FaInstagram, url: "https://instagram.com" },
    { icon: FaLinkedin, url: "https://linkedin.com" },
    { icon: FaTiktok, url: "https://tiktok.com" },
  ];

  return (
    <Box
      bg={bg}
      color={textColor}
      pt={16}
      pb={12}
      px={{ base: 6, md: 16 }}
      borderTop="1px solid"
      borderColor={borderColor}
      boxShadow="0 -2px 12px rgba(0,0,0,0.5)"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        wrap="wrap"
        gap={{ base: 10, md: 24 }}
        mb={10}
      >
        {/* Brand */}
        <VStack align="flex-start" spacing={3} minW="200px">
          <Text fontWeight="bold" color={headingColor} fontSize="2xl">
            HopIn
          </Text>

          <Link to="/careers">
            <Text _hover={{ color: "white" }}>{translate("We're hiring!", language)}</Text>
          </Link>

          <Link to="/download">
            <Text _hover={{ color: "white" }}>{translate("Download our app", language)}</Text>
          </Link>

          <Link to="/signup">
            <Text _hover={{ color: "white" }}>{translate("Sign up", language)}</Text>
          </Link>

          <Link to="/login">
            <Text _hover={{ color: "white" }}>{translate("Log in", language)}</Text>
          </Link>
        </VStack>

        {/* How it works */}
        <VStack align="flex-start" spacing={3} minW="200px">
          <Text fontWeight="bold" color={headingColor} fontSize="lg">
            {translate("How it works", language)}
          </Text>

          <Link to="/passengers">
            <Text _hover={{ color: "white" }}>{translate("Passengers", language)}</Text>
          </Link>

          <Link to="/drivers">
            <Text _hover={{ color: "white" }}>{translate("Drivers", language)}</Text>
          </Link>

          <Link to="/trust-and-safety">
            <Text _hover={{ color: "white" }}>{translate("Trust & Safety", language)}</Text>
          </Link>

          <Link to="/students">
            <Text _hover={{ color: "white" }}>{translate("For Students", language)}</Text>
          </Link>
        </VStack>

        {/* Connect */}
        <VStack align="flex-start" spacing={4} minW="200px">
          <Text fontWeight="bold" color={headingColor} fontSize="lg">
            {translate("Connect with us", language)}
          </Text>

          {/* Social Icons */}
          <HStack spacing={4}>
            {socialLinks.map(({ icon: Icon, url }, idx) => (
              <IconButton
                key={idx}
                as="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                icon={<Icon />}
                aria-label="social-icon"
                variant="ghost"
                color="gray.300"
                fontSize="xl"
                _hover={{
                  color: "white",
                  transform: "scale(1.2)",
                  transition: "0.2s",
                }}
              />
            ))}
          </HStack>

          {/* Language selector */}
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            size="sm"
            bg="gray.800"
            borderColor="gray.600"
            color="white"
            w="150px"
            _hover={{ borderColor: "white" }}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </Select>
        </VStack>
      </Flex>

      <Divider borderColor="gray.700" mb={6} />

      {/* Bottom Row */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        fontSize="sm"
        gap={{ base: 4, md: 0 }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Text>
          © {new Date().getFullYear()} HopIn.{" "}
          {translate("All rights reserved.", language)}
        </Text>

        <HStack spacing={6}>
          <Link to="/privacy-policy">
            <Text _hover={{ color: "white" }}>
              {translate("Privacy Policy", language)}
            </Text>
          </Link>

          <Link to="/terms-of-service">
            <Text _hover={{ color: "white" }}>
              {translate("Terms of Service", language)}
            </Text>
          </Link>

          <Link to="/help-center">
            <Text _hover={{ color: "white" }}>
              {translate("Help Center", language)}
            </Text>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
