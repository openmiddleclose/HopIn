import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Divider,
  Link as ChakraLink,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LegalCompliant() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const linkColor = useColorModeValue("teal.500", "teal.200");

  return (
    <Box
      bg={bgColor}
      minH="100vh"
      pt={{ base: 36, md: 40 }} // increased top padding for navbar
      pb={{ base: 16, md: 24 }} // added bottom padding
      px={{ base: 4, md: 8 }}
    >
      <Container maxW="5xl">
        {/* HEADER */}
        <VStack spacing={6} mb={12} textAlign="center">
          <Heading fontSize={{ base: "3xl", md: "4xl" }} color={headingColor}>
            Legal & Compliant
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
            HopIn operates under provincial carpooling regulations to ensure safety and legality.
          </Text>
        </VStack>

        <Divider mb={10} />

        {/* FAQ SECTION */}
        <VStack spacing={10} align="start">
          <Box>
            <Heading fontSize="2xl" mb={3} color={headingColor}>
              Is it legal to carpool on HopIn?
            </Heading>
            <Text color={textColor} fontWeight="medium" mb={4}>
              Updated over a year ago
            </Text>
            <Text color={textColor} mb={3}>
              <strong>General definition of carpool:</strong> A carpool with HopIn is defined as a driver offering their empty seats to passengers heading in the same direction and sharing the trip's costs without turning a profit.
            </Text>
            <Text color={textColor} mb={3}>
              This is very different from ride-hailing companies like Uber and Lyft. These companies offer a service where a person hails a driver on-demand to get them from A to B, and the driver receives financial compensation, turning a profit. This is closer to a taxi service and falls within different legislation.
            </Text>
          </Box>

          <Box>
            <Heading fontSize="xl" mb={3} color={headingColor}>
              Legality of carpooling in Canada
            </Heading>
            <Text color={textColor} mb={3}>
              In Canada, carpooling is regulated at the provincial level. In general, provincial law allows the act of carpooling based on the following rules:
            </Text>
            <VStack spacing={1.5} align="start" pl={4} mb={4}>
              <Text color={textColor}>• The trip is driver-directed, meaning the driver decides on the trip’s origin, destination and dates based on their own schedule.</Text>
              <Text color={textColor}>• The driver and passenger share a trip with a common origin and destination.</Text>
              <Text color={textColor}>• The driver does no more than one return trip a day.</Text>
              <Text color={textColor}>• The driver receives contributions towards their costs and does not turn a profit.</Text>
              <Text color={textColor}>• The maximum seating capacity of the vehicle is one of a van or minivan (this differs between provinces).</Text>
            </VStack>

            <Text color={textColor} mb={3}>
              Below are links to the carpooling laws for each Canadian province:
            </Text>
            <Stack spacing={1.5} pl={4}>
              <ChakraLink href="#" color={linkColor}>Alberta: Traffic Safety Act, p23</ChakraLink>
              <ChakraLink href="#" color={linkColor}>British Columbia: Passenger Transportation Act, section 1 (2)</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Manitoba: Highway Traffic Act, no info available</ChakraLink>
              <ChakraLink href="#" color={linkColor}>New Brunswick: Motor Carrier Act, section 1</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Newfoundland and Labrador: Motor Carrier Regulations, section 2 (j)</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Northwest Territories: Motor Vehicles Act, no info available</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Nova Scotia: Motor Carrier Act, section 2 (l)</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Ontario: Bill 213, Better for People, Smarter for Business Act</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Québec: LOI CONCERNANT LE TRANSPORT RÉMUNÉRÉ DE PERSONNES PAR AUTOMOBILE, 2019, c. 18, sec. III.</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Saskatchewan: Traffic Safety Act, no info available</ChakraLink>
            </Stack>
          </Box>

          <Box>
            <Heading fontSize="xl" mb={3} color={headingColor}>
              Related Articles
            </Heading>
            <Stack spacing={1.5} pl={4}>
              <ChakraLink href="#" color={linkColor}>How to set a price for your trip</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Can I use HopIn with a rental vehicle?</ChakraLink>
              <ChakraLink href="#" color={linkColor}>What insurance do I need for carpooling?</ChakraLink>
              <ChakraLink href="#" color={linkColor}>What is the difference between HopIn and Uber?</ChakraLink>
              <ChakraLink href="#" color={linkColor}>Do I need a class 4 license to drive on HopIn in British Columbia?</ChakraLink>
            </Stack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
