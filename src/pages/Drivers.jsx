import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Container,
  Card,
  CardBody,
  Stack,
  Divider,
  Icon,
  Flex,
  Circle,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaCarSide, FaMoneyCheckAlt, FaMapMarkedAlt } from "react-icons/fa";

export default function Drivers() {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Post a trip",
      desc: "Enter your origin, destination, schedule, and price.",
      icon: FaMapMarkedAlt,
    },
    {
      title: "Receive bookings",
      desc: "Passengers pay online in advance to ensure commitment.",
      icon: FaMoneyCheckAlt,
    },
    {
      title: "Meet & drive",
      desc: "Cover your gas, insurance, and other expenses.",
      icon: FaCarSide,
    },
  ];

  const rules = [
    {
      title: "Be reliable",
      desc: "Only post a trip if you’re sure you’re driving and show up on time.",
    },
    {
      title: "No cash",
      desc: "All passengers pay online and you receive a payout after the trip.",
    },
    {
      title: "Drive safely",
      desc: "Stick to the speed limit and do not use your phone while driving.",
    },
  ];

  const infoSections = [
    {
      title: "Reliable passengers",
      texts: [
        "Passengers pay in advance and are committed to showing up.",
        "If a passenger cancels within 24 hours of departure, you get 50% of the payment.",
        "If a passenger doesn’t show up, you get 100% of the payment.",
      ],
    },
    {
      title: "Get paid after every trip",
      texts: [
        "Receive money automatically after each and every trip.",
        "Get paid in your bank account or PayPal.",
        "No need to carry cash.",
      ],
    },
    {
      title: "Legal & compliant",
      texts: [
        "HopIn operates under provincial carpooling regulations.",
        "Cover your gas, insurance, and maintenance costs.",
        "Carpool using your regular car insurance.",
      ],
      button: {
        label: "More info",
        variant: "outline",
        colorScheme: "orange",
        onClick: () => navigate("/legal-compliant"),
      },
    },
    {
      title: "Your safety is our priority",
      texts: ["HopIn is designed to ensure your safety at all times."],
      button: {
        label: "How we keep you safe",
        variant: "outline",
        colorScheme: "orange",
        onClick: () => navigate("/trust-and-safety"),
      },
    },
  ];

  // Dark mode colors
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const circleBg = useColorModeValue("orange.500", "orange.400");
  const iconColor = useColorModeValue("teal.500", "teal.200");

  return (
    <Box
      fontFamily="'Cinzel', serif"
      bg={bgColor}
      minH="100vh"
      pt={{ base: 28, md: 36 }}
      px={{ base: 4, md: 8 }}
    >
      <Container maxW="7xl">
        {/* HEADER */}
        <VStack spacing={4} mb={12} textAlign="center">
          <Heading fontSize={{ base: "3xl", md: "4xl" }} color={headingColor}>
            For drivers
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
            Cover your costs when you’re already driving from A to B.
          </Text>
        </VStack>

        {/* STEP CARDS */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
          {steps.map((step, idx) => (
            <Card
              key={idx}
              p={6}
              borderRadius="2xl"
              shadow="xl"
              bg={cardBg}
              textAlign="center"
            >
              <Flex justify="center" mb={4}>
                <Circle
                  size="50px"
                  bg={circleBg}
                  color="white"
                  fontWeight="bold"
                  fontSize="lg"
                >
                  {idx + 1}
                </Circle>
              </Flex>
              <Icon as={step.icon} w={12} h={12} color={iconColor} mb={3} />
              <Heading fontSize="xl" mb={2} color={headingColor}>
                {step.title}
              </Heading>
              <Text color={textColor}>{step.desc}</Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* HEADING FOR RULES */}
        <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={6} textAlign="center" color={headingColor}>
          Rules when posting a trip
        </Heading>

        {/* RULES WHEN POSTING A TRIP */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
          {rules.map((rule, idx) => (
            <Card
              key={idx}
              p={6}
              borderRadius="2xl"
              shadow="xl"
              bg={cardBg}
              textAlign="center"
            >
              <Heading fontSize="xl" mb={2} color={headingColor}>
                {rule.title}
              </Heading>
              <Text color={textColor}>{rule.desc}</Text>
            </Card>
          ))}
        </SimpleGrid>

        <Stack align="center" mb={16}>
          <Button
            colorScheme="orange"
            size="lg"
            onClick={() => navigate("/create-trip")}
          >
            Post a trip
          </Button>
        </Stack>

        {/* INFO SECTIONS */}
        <VStack spacing={8} mb={12}>
          {infoSections.map((section, idx) => (
            <Card key={idx} p={6} borderRadius="2xl" shadow="xl" bg={cardBg} w="full">
              <CardBody>
                <Heading fontSize="2xl" mb={4} color={headingColor}>
                  {section.title}
                </Heading>
                {section.texts.map((text, i) => (
                  <Text key={i} mb={2} color={textColor}>
                    {text}
                  </Text>
                ))}
                {section.button && (
                  <Button
                    mt={4}
                    variant={section.button.variant}
                    colorScheme={section.button.colorScheme}
                    onClick={section.button.onClick}
                  >
                    {section.button.label}
                  </Button>
                )}
              </CardBody>
            </Card>
          ))}
        </VStack>

        {/* CTA */}
        <Box textAlign="center" py={12}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            mb={4}
            color={headingColor}
          >
            We’d love to have you carpool with us!
          </Heading>
          <Button
            colorScheme="orange"
            size="lg"
            onClick={() => navigate("/create-trip")}
          >
            Post a trip
          </Button>
        </Box>

        <Divider my={8} />
      </Container>
    </Box>
  );
}
