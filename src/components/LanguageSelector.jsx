// src/components/LanguageSelector.jsx
import React from "react";
import { Select, useColorModeValue } from "@chakra-ui/react";

// Props:
// - language: current language ("en" or "fr")
// - setLanguage: function to change language
export default function LanguageSelector({ language, setLanguage }) {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  return (
    <Select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      size="sm"
      w="140px"
      bg={bg}
      color={color}
      borderRadius="md"
      fontWeight="medium"
      _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
    </Select>
  );
}
