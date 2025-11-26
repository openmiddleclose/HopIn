// src/pages/Passengers.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Card,
  CardBody,
  Stack,
  HStack,
  Icon,
  Flex,
  Circle,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ArrowRight,
  CreditCard,
  ShieldCheck,
  Star,
  MapPin,
  DollarSign,
  Smile,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Passengers() {
  const navigate = useNavigate();

  // Step data
  const steps = [
    {
      num: "1",
      title: "Find a ride",
      text: "Search by origin, destination, and departure time.",
      icon: MapPin,
      iconColor: "teal.500",
    },
    {
      num: "2",
      title: "Book your seat",
      text: "Pay online securely using your credit or debit card.",
      icon: DollarSign,
      iconColor: "orange.400",
    },
    {
      num: "3",
      title: "Enjoy the drive",
      text: "Meet the driver at a pickup location and enjoy the ride.",
      icon: Smile,
      iconColor: "purple.500",
    },
  ];

  // Dark/light themed colors
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const circleBg = useColorModeValue("orange.500", "orange.400");

  return (
    <Box
      w="full"
      bg={bgColor}
      pt={{ base: "140px", md: "160px" }}
      pb={24}
      px={{ base: 4, md: 8 }}
      fontFamily="Inter, sans-serif"
      color={textColor}
    >
      {/* Hero Section */}
      <Box
        bg={useColorModeValue("teal.50", "gray.800")}
        py={{ base: 12, md: 20 }}
        px={6}
        mb={16}
        borderRadius="2xl"
        textAlign="center"
      >
        <VStack spacing={4} maxW="3xl" mx="auto">
          <Heading fontSize={{ base: "3xl", md: "4xl" }} color={headingColor}>
            For Passengers
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
            Get a ride with someone in their car — it’s affordable, convenient, and safe.
          </Text>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              size="lg"
              colorScheme="teal"
              rightIcon={<ArrowRight size={20} />}
              onClick={() => navigate("/search-trips")}
            >
              Find a ride
            </Button>
          </motion.div>
        </VStack>
      </Box>

      {/* Steps Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={20} maxW="6xl" mx="auto">
        {steps.map((s, i) => (
          <Card
            key={i}
            p={6}
            shadow="xl"
            borderRadius="2xl"
            bg={cardBg}
            as={motion.div}
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            textAlign="center"
          >
            <CardBody>
              <Flex justify="center" mb={4}>
                <Circle size="50px" bg={circleBg} color="white" fontWeight="bold" fontSize="lg">
                  {s.num}
                </Circle>
              </Flex>

              <Icon as={s.icon} w={12} h={12} color={s.iconColor} mb={3} />

              <Heading fontSize="xl" mb={2} color={headingColor}>
                {s.title}
              </Heading>

              <Text color={textColor} fontSize="sm">
                {s.text}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Info Sections */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} mb={20} maxW="5xl" mx="auto">
        <Stack spacing={4}>
          <HStack spacing={4}>
            <Icon as={CreditCard} w={8} h={8} color="teal.500" />
            <Heading fontSize="2xl" color={headingColor}>
              Book and pay online
            </Heading>
          </HStack>

          <Text color={textColor}>
            Reserve your seats, meet the driver, and go. <br />
            We accept all major credit and debit cards. <br />
            Drivers are paid securely after the trip.
          </Text>
        </Stack>

        <Stack spacing={4}>
          <HStack spacing={4}>
            <Icon as={ShieldCheck} w={8} h={8} color="teal.500" />
            <Heading fontSize="2xl" color={headingColor}>
              Travel safely
            </Heading>
          </HStack>

          <Text color={textColor}>
            We verify every driver's license and monitor activity closely. <br />
            You choose who you carpool with. <br />
            Report and block other members directly in the app. <br />
            Customer support is available 7 days a week.
          </Text>
        </Stack>

        <Stack spacing={4}>
          <HStack spacing={4}>
            <Icon as={Star} w={8} h={8} color="teal.500" />
            <Heading fontSize="2xl" color={headingColor}>
              Review your driver
            </Heading>
          </HStack>

          <Text color={textColor}>
            Leave a star rating and review for your driver. <br />
            Receive reviews from drivers. <br />
            Provide feedback about your ride experience.
          </Text>
        </Stack>

        <Stack spacing={4}>
          <HStack spacing={4}>
            <Icon as={ShieldCheck} w={8} h={8} color="teal.500" />
            <Heading fontSize="2xl" color={headingColor}>
              Your safety is our priority
            </Heading>
          </HStack>

          <Text color={textColor}>
            HopIn is designed to ensure your safety at all times.
          </Text>

          <Button
            variant="outline"
            size="lg"
            colorScheme="teal"
            onClick={() => navigate("/trust-and-safety")}
          >
            How we keep you safe
          </Button>
        </Stack>
      </SimpleGrid>

      {/* Final CTA */}
      <VStack spacing={6} maxW="3xl" mx="auto" textAlign="center">
        <Heading fontSize="3xl" color={headingColor}>
          Join thousands of passengers today!
        </Heading>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            size="lg"
            rightIcon={<ArrowRight size={20} />}
            colorScheme="teal"
            onClick={() => navigate("/search-trips")}
          >
            Find a ride
          </Button>
        </motion.div>
      </VStack>
    </Box>
  );
}
