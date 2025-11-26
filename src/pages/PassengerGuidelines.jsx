// src/pages/PassengerGuidelines.jsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  SimpleGrid,
  Button,
  VStack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Link,
  Card,
  CardBody,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  InfoOutlineIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

export default function PassengerGuidelines() {
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const pageBg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      bg={pageBg}
      minH="100vh"
      p={{ base: 6, md: 12 }}
      pt={{ base: 32, md: 36 }}   // keeps content from touching navbar
      maxW="1000px"
      mx="auto"
    >
      {/* HEADER */}
      <Heading
        mb={2}
        textAlign="center"
        color={headingColor}
        fontWeight="bold"
      >
        Passenger Guidelines
      </Heading>

      <Text
        fontSize="sm"
        color={useColorModeValue("gray.600", "gray.400")}
        textAlign="center"
        mb={8}
      >
        Important information and best practices for requesting rides on HopIn.
      </Text>

      {/* MAIN CONTENT */}
      <Stack spacing={8}>
        {/* PROFILE COMPLETION */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md">
          <CardBody>
            <Heading size="md" mb={3} color={headingColor}>
              Before you request a ride
            </Heading>

            <Text mb={3} color={textColor}>
              To keep HopIn safe and reliable for everyone, please complete your profile:
            </Text>

            <List spacing={2} mb={4} color={textColor}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                Confirmed email
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                Clear profile picture (no sunglasses or other people)
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                Short profile description — who you are and your travel habits
              </ListItem>
            </List>

            <Button
              as={RouterLink}
              to="/onboarding-profile-picture"
              variant="outline"
              colorScheme="teal"
              size="sm"
            >
              Complete profile
            </Button>
          </CardBody>
        </Card>

        {/* 3-COLUMN GRID */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {/* BOOKING */}
          <Card bg={cardBg} borderRadius="lg" boxShadow="sm">
            <CardBody>
              <Heading size="sm" mb={3} color={headingColor}>
                How booking works
              </Heading>
              <Text color={textColor} mb={2}>
                Send a request or book directly depending on the trip:
              </Text>

              <List spacing={2} color={textColor}>
                <ListItem>
                  <ListIcon as={InfoOutlineIcon} color="orange.400" />
                  Some drivers require approval before accepting.
                </ListItem>
                <ListItem>
                  <ListIcon as={InfoOutlineIcon} color="orange.400" />
                  Once accepted, your seat is reserved and payment is processed.
                </ListItem>
              </List>
            </CardBody>
          </Card>

          {/* PAYMENT */}
          <Card bg={cardBg} borderRadius="lg" boxShadow="sm">
            <CardBody>
              <Heading size="sm" mb={3} color={headingColor}>
                Payment & refunds
              </Heading>

              <Text color={textColor} mb={2}>
                All payments are handled securely in the app.
              </Text>

              <Text color={textColor}>
                Refunds follow the driver’s cancellation policy.
              </Text>

              <Button
                as={RouterLink}
                to="/driver-cancellation"
                mt={3}
                size="sm"
                variant="ghost"
                colorScheme="teal"
              >
                Driver Cancellation Policy
              </Button>
            </CardBody>
          </Card>

          {/* RATINGS */}
          <Card bg={cardBg} borderRadius="lg" boxShadow="sm">
            <CardBody>
              <Heading size="sm" mb={3} color={headingColor}>
                Ratings & reputation
              </Heading>

              <Text color={textColor} mb={2}>
                Drivers rate passengers after each trip.
              </Text>

              <Text color={textColor}>
                Good ratings unlock trust and faster approvals.
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* SAFETY TIPS */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md">
          <CardBody>
            <Heading size="md" mb={3} color={headingColor}>
              Safety tips
            </Heading>

            <List spacing={3} color={textColor}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                Confirm pickup details with your driver in the app.
              </ListItem>

              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                Share your trip info with a trusted friend.
              </ListItem>

              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                Be on time — drivers rely on punctuality.
              </ListItem>

              <ListItem>
                <ListIcon as={WarningIcon} color="yellow.400" />
                If something feels wrong, cancel and report it via{" "}
                <Link as={RouterLink} to="/trust-and-safety" color="teal.400">
                  Trust & Safety
                </Link>
                .
              </ListItem>
            </List>
          </CardBody>
        </Card>

        {/* EXPECTATIONS */}
        <Card bg={cardBg} borderRadius="xl" boxShadow="md">
          <CardBody>
            <Heading size="md" mb={3} color={headingColor}>
              What we expect from passengers
            </Heading>

            <List spacing={2} color={textColor}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                Only request a trip if you're committed to going.
              </ListItem>

              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                All payments must be through the app.
              </ListItem>

              <ListItem>
                <ListIcon as={CheckCircleIcon} color="green.400" />
                Be respectful and keep the vehicle clean.
              </ListItem>
            </List>

            <Divider my={4} />

            <Text color={textColor} mb={3}>
              Learn more from our policies:
            </Text>

            <Stack direction={{ base: "column", md: "row" }} spacing={3}>
              <Button
                as={RouterLink}
                to="/terms-of-service"
                variant="outline"
                size="sm"
                colorScheme="teal"
              >
                Terms of Service
              </Button>

              <Button
                as={RouterLink}
                to="/privacy-policy"
                variant="outline"
                size="sm"
                colorScheme="teal"
              >
                Privacy Policy
              </Button>

              <Button
                as={RouterLink}
                to="/trust-and-safety"
                variant="outline"
                size="sm"
                colorScheme="teal"
              >
                Trust & Safety
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Box>
  );
}
