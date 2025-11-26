import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Box p={8}>
      <Heading>About Hopin</Heading>
      <Text mt={4}>This is the about page.</Text>
      <Button mt={4} as={Link} to="/">
        Go Home
      </Button>
    </Box>
  );
}
