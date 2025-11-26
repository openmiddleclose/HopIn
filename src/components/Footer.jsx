// src/components/Footer.jsx
import React, { useState } from "react";
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

export default function Footer() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("gray.900", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const [language, setLanguage] = useState("en");

  const texts = {
    en: {
      brand: "HopIn",
      hiring: "🚀 We're hiring!",
      download: "Download our app",
      signup: "Sign up",
      login: "Log in",
      howItWorks: "How it works",
      passengers: "Passengers",
      drivers: "Drivers",
      trust: "Trust & Safety",
      students: "For students",
      events: "Events & festivals",
      news: "News",
      blog: "Blog",
      about: "About",
      impact: "Impact",
      locations: "Locations",
      connect: "Connect with us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      help: "Help",
    },
    fr: {
      brand: "HopIn",
      hiring: "🚀 Nous recrutons !",
      download: "Téléchargez notre appli",
      signup: "S'inscrire",
      login: "Se connecter",
      howItWorks: "Comment ça marche",
      passengers: "Passagers",
      drivers: "Chauffeurs",
      trust: "Confiance & sécurité",
      students: "Pour les étudiants",
      events: "Événements & festivals",
      news: "Actualités",
      blog: "Blog",
      about: "À propos",
      impact: "Impact",
      locations: "Lieux",
      connect: "Connectez-vous avec nous",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      help: "Aide",
    },
  };

  const t = texts[language];

  return (
    <Box
      bg={bg}
      color={textColor}
      mt={20}
      pt={14}
      pb={10}
      px={{ base: 6, md: 16 }}
      borderTop="1px solid"
      borderColor={borderColor}
    >
      {/* Main Footer Layout */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="flex-start"
        wrap="wrap"
        gap={{ base: 10, md: 20 }}
        mb={10}
      >
        {/* Column 1 */}
        <VStack align="flex-start" spacing={3} minW="180px">
          <Text fontWeight="bold" color={headingColor} fontSize="xl">
            {t.brand}
          </Text>
          <Link href="#">{t.hiring}</Link>
          <Link href="#">{t.download}</Link>
          <Link href="#">{t.signup}</Link>
          <Link href="#">{t.login}</Link>
        </VStack>

        {/* Column 2 */}
        <VStack align="flex-start" spacing={3} minW="180px">
          <Text fontWeight="bold" color={headingColor} fontSize="lg">
            {t.howItWorks}
          </Text>
          <Link href="#">{t.passengers}</Link>
          <Link href="#">{t.drivers}</Link>
          <Link href="#">{t.trust}</Link>
          <Link href="#">{t.students}</Link>
          <Link href="#">{t.events}</Link>
          <Link href="#">{t.news}</Link>
          <Link href="#">{t.blog}</Link>
          <Link href="#">{t.about}</Link>
          <Link href="#">{t.impact}</Link>
          <Link href="#">{t.locations}</Link>
        </VStack>

        {/* Column 3 */}
        <VStack align="flex-start" spacing={4} minW="180px">
          <Text fontWeight="bold" color={headingColor} fontSize="lg">
            {t.connect}
          </Text>

          <HStack spacing={3}>
            <IconButton as="a" href="#" aria-label="Facebook" icon={<FaFacebook />} variant="ghost" />
            <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter />} variant="ghost" />
            <IconButton as="a" href="#" aria-label="Instagram" icon={<FaInstagram />} variant="ghost" />
            <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin />} variant="ghost" />
            <IconButton as="a" href="#" aria-label="TikTok" icon={<FaTiktok />} variant="ghost" />
          </HStack>

          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            size="sm"
            mt={2}
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="md"
            fontWeight="medium"
            w="140px"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </Select>
        </VStack>
      </Flex>

      <Divider mb={6} />

      {/* Bottom Bar */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        fontSize="sm"
        textAlign={{ base: "center", md: "left" }}
        gap={{ base: 4, md: 0 }}
      >
        <Text>© {new Date().getFullYear()} HopIn. All rights reserved.</Text>

        <HStack spacing={6}>
          <Link href="#">{t.privacy}</Link>
          <Link href="#">{t.terms}</Link>
          <Link href="#">{t.help}</Link>
        </HStack>
      </Flex>
    </Box>
  );
}
