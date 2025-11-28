// src/pages/Careers.jsx
import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function Careers() {
  return (
    <Box
      minH="60vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={6}
      pt={{ base: 28, md: 32 }}   // pushes content BELOW navbar
    >
      <VStack spacing={4} textAlign="center" maxW="600px">
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
          Careers
        </Heading>

        <Text fontSize={{ base: "md", md: "lg" }} color="gray.500">
          🚧 This page is currently under construction.
        </Text>

        <Text fontSize={{ base: "md", md: "lg" }} color="gray.400">
          We’re working hard to bring exciting opportunities to you.
        </Text>
      </VStack>
    </Box>
  );
}
