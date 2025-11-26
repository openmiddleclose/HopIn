import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  Link as ChakraLink,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCar, FaHome, FaTree } from "react-icons/fa";

export default function Sustainability() {
  const topRoutes = [
    { from: "Toronto", to: "Ottawa" },
    { from: "Montreal", to: "Quebec City" },
    { from: "Vancouver", to: "Whistler" },
    { from: "Calgary", to: "Edmonton" },
    { from: "Halifax", to: "Dartmouth" },
    { from: "Ottawa", to: "Montreal" },
    { from: "Toronto", to: "Niagara Falls" },
    { from: "Vancouver", to: "Victoria" },
  ];

  const impactStats = [
    {
      icon: FaCar,
      label: "Greenhouse gases from 9,563 passenger vehicles driven for one year",
      gradient: "linear(to-br, teal.500, teal.700)",
    },
    {
      icon: FaHome,
      label: "CO₂ emissions from 8,544 homes' electricity use for one year",
      gradient: "linear(to-br, orange.400, orange.600)",
    },
    {
      icon: FaTree,
      label: "Carbon sequestered by 41,125 acres of forest in one year",
      gradient: "linear(to-br, green.400, green.600)",
    },
  ];

  // Dark mode colors
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const smallTextColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      w="full"
      bg={bgColor}
      minH="100vh"
      pt={{ base: "140px", md: "160px" }}
      px={{ base: 4, md: 8 }}
      fontFamily="Inter, sans-serif"
      color={textColor}
    >
      {/* HEADER */}
      <VStack spacing={4} textAlign="center" mb={12} maxW="3xl" mx="auto">
        <Heading fontSize={{ base: "3xl", md: "4xl" }} color={headingColor}>
          HopIn Sustainability
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
          Smart carpooling for a cleaner, greener future. Every ride with HopIn reduces your carbon footprint.
        </Text>
      </VStack>

      {/* IMPACT STATS */}
      <VStack spacing={6} mb={12} maxW="6xl" mx="auto">
        <VStack spacing={2} textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color={headingColor}>
            Our collective impact
          </Text>
          <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="extrabold" color="teal.500">
            41,000 metric tons
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium" color={textColor}>
            of CO₂ emissions avoided since 2015
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
          {impactStats.map((stat, idx) => (
            <Card
              key={idx}
              as={motion.div}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              p={6}
              bgGradient={stat.gradient}
              borderRadius="2xl"
              shadow="xl"
              color="white"
              textAlign="center"
            >
              <VStack spacing={4}>
                <Icon as={stat.icon} w={12} h={12} />
                <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>
                  {stat.label}
                </Text>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>

      {/* METHODOLOGY */}
      <Card
        p={6}
        mb={12}
        bg={cardBg}
        borderRadius="2xl"
        shadow="lg"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Heading size="md" color={headingColor}>
            How we calculate impact
          </Heading>
          <Text color={textColor}>
            HopIn estimates carbon savings per ride using the following model:
          </Text>
          <List spacing={2} color={textColor} textAlign="left" maxW="lg" mx="auto">
            <ListItem>
              <Text as="span" fontWeight="bold">T:</Text> Time period for calculation (year, month, or single trip)
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">Pass.km:</Text> Passenger kilometers traveled via HopIn
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">Occupancy:</Text> Average vehicle occupancy (1.62 passengers)
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">CO₂ Emission:</Text> Average CO₂ emitted per km per vehicle: 251g
            </ListItem>
          </List>
        </VStack>
      </Card>

      {/* REDUCING IMPACT */}
      <Card
        p={6}
        mb={12}
        bg={cardBg}
        borderRadius="2xl"
        shadow="lg"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Heading size="lg" color={headingColor}>
            How HopIn helps the planet
          </Heading>
          <VStack spacing={3}>
            <Text color={textColor}>Carpooling reduces the number of vehicles on the road, saving fuel and lowering emissions.</Text>
            <Text color={textColor}>The more passengers per car, the less carbon dioxide each person produces.</Text>
            <Text color={textColor}>Thousands of HopIn rides every day add up to a meaningful impact on our environment.</Text>
            <Text color={textColor}>Choosing HopIn means you’re making a sustainable choice for a cleaner, greener future.</Text>
          </VStack>
        </VStack>
      </Card>

      {/* ADDITIONAL RESOURCES */}
      <Card p={6} mb={12} bg={cardBg} borderRadius="2xl" shadow="lg" textAlign="center">
        <VStack spacing={3}>
          <Heading size="md" color={headingColor}>
            Learn more
          </Heading>
          <VStack spacing={2}>
            <ChakraLink href="https://www.footprintnetwork.org/" isExternal color="teal.500">
              Global Footprint Network – Calculate your ecological footprint
            </ChakraLink>
            <ChakraLink href="https://www.canada.ca/en/services/environment/weather/climatechange.html" isExternal color="teal.500">
              Government of Canada – Climate Change Plan
            </ChakraLink>
            <ChakraLink href="https://www.un.org/en/climatechange/paris-agreement" isExternal color="teal.500">
              United Nations – Paris Agreement
            </ChakraLink>
            <ChakraLink href="https://www.nationalgeographic.com/environment/article/before-the-flood" isExternal color="teal.500">
              National Geographic – Climate Change Documentaries
            </ChakraLink>
          </VStack>
          <Text mt={2} color={textColor}>
            Have suggestions? DM us on Instagram <ChakraLink href="https://instagram.com/HopIn" isExternal color="teal.500">@HopIn</ChakraLink>.
          </Text>
        </VStack>
      </Card>

      {/* CALL TO ACTION */}
      <HStack spacing={4} justify="center" wrap="wrap" mb={12}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/search-trips">
            <Button colorScheme="teal" size="lg">Find a ride</Button>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/create-trip">
            <Button colorScheme="teal" variant="outline" size="lg">Post a trip</Button>
          </Link>
        </motion.div>
      </HStack>

      {/* TOP HOPIN ROUTES */}
      <Box mb={12}>
        <Heading size="md" mb={6} textAlign="center" color={headingColor}>
          Popular HopIn Routes
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {topRoutes.map((route, index) => (
            <Card
              key={index}
              as={motion.div}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              borderRadius="2xl"
              shadow="lg"
              bg={cardBg}
              p={4}
              textAlign="center"
            >
              <CardBody>
                <Text fontWeight="bold">{route.from} → {route.to}</Text>
                <Text fontSize="sm" color={smallTextColor}>Frequently traveled by HopIn members</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
