// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Link,
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
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { translate } from "../utils/translate.js";

export default function Footer() {
  const bg = useColorModeValue("gray.900", "gray.900");
  const textColor = useColorModeValue("gray.300", "gray.300");
  const headingColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.700", "gray.700");

  const { language, setLanguage } = useLanguage();

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

          <Link href="#" _hover={{ color: "white" }}>
            {translate("We're hiring!", language)}
          </Link>
          <Link href="#" _hover={{ color: "white" }}>
            {translate("Download our app", language)}
          </Link>
          <Link href="/signup" _hover={{ color: "white" }}>
            {translate("Sign up", language)}
          </Link>
          <Link href="/login" _hover={{ color: "white" }}>
            {translate("Log in", language)}
          </Link>
        </VStack>

        {/* How it works */}
        <VStack align="flex-start" spacing={3} minW="200px">
          <Text fontWeight="bold" color={headingColor} fontSize="lg">
            {translate("How it works", language)}
          </Text>

          <Link href="/passengers" _hover={{ color: "white" }}>
            {translate("Passengers", language)}
          </Link>

          <Link href="/drivers" _hover={{ color: "white" }}>
            {translate("Drivers", language)}
          </Link>

          <Link href="/trust-and-safety" _hover={{ color: "white" }}>
            {translate("Trust & Safety", language)}
          </Link>

          <Link href="/students" _hover={{ color: "white" }}>
            {translate("For Students", language)}
          </Link>
        </VStack>

        {/* Connect */}
        <VStack align="flex-start" spacing={4} minW="200px">
          <Text fontWeight="bold" color={headingColor} fontSize="lg">
            {translate("Connect with us", language)}
          </Text>

          <HStack spacing={4}>
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok].map(
              (Icon, idx) => (
                <IconButton
                  key={idx}
                  as="a"
                  href="#"
                  icon={<Icon />}
                  aria-label="icon"
                  variant="ghost"
                  color="gray.300"
                  fontSize="xl"
                  _hover={{ color: "white", transform: "scale(1.2)", transition: "0.2s" }}
                />
              )
            )}
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
        <Text>© {new Date().getFullYear()} HopIn. {translate("All rights reserved.", language)}</Text>

        <HStack spacing={6}>
          <Link href="/privacy-policy" _hover={{ color: "white" }}>
            {translate("Privacy Policy", language)}
          </Link>

          <Link href="/terms-of-service" _hover={{ color: "white" }}>
            {translate("Terms of Service", language)}
          </Link>

          <Link href="/help" _hover={{ color: "white" }}>
            {translate("Help Center", language)}
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
