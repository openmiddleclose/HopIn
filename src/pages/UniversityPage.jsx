import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Card,
  CardBody,
  SimpleGrid,
  Avatar,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

// Mock testimonials
const allTestimonials = [
  {
    name: "Sophia Martinez",
    date: "2 days ago",
    text: "Really enjoyed my first carpool from campus! Easy booking, friendly driver, and comfy ride.",
  },
  {
    name: "Liam Johnson",
    date: "5 days ago",
    text: "Found the app super useful for getting to my internship on time. Highly recommend for students!",
  },
  {
    name: "Ava Chen",
    date: "1 week ago",
    text: "Safe and convenient rides. The email verification process was quick and straightforward.",
  },
  {
    name: "Noah Patel",
    date: "4 days ago",
    text: "Posting a trip was simple, and I made a few connections along the way. Great experience overall!",
  },
  {
    name: "Emma Brown",
    date: "3 days ago",
    text: "Love the student discounts and the way the app is tailored for university travel. Definitely a time-saver.",
  },
  {
    name: "Oliver Smith",
    date: "6 days ago",
    text: "Had a smooth ride to Montreal. The driver was friendly and punctual. Will definitely use again.",
  },
  {
    name: "Isabella Lee",
    date: "1 week ago",
    text: "Verified my university email quickly and got my badge. Made booking rides much faster.",
  },
];

// Mock new member names for notifications
const newMembers = [
  "John Doe",
  "Alice Smith",
  "Michael Brown",
  "Emily Johnson",
  "David Lee",
  "Sophia Kim",
  "Daniel Wilson",
  "Olivia Martinez",
];

export default function UniversityPage() {
  const navigate = useNavigate();
  const { universityName } = useParams();
  const toast = useToast();

  // Dynamic state
  const [members, setMembers] = useState(1200);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const cardBg = useColorModeValue("gray.50", "gray.700");
  const highlightText = useColorModeValue("teal.600", "teal.300");
  const secondaryText = useColorModeValue("gray.600", "gray.300");

  const displayedTestimonials = showAllTestimonials ? allTestimonials : allTestimonials.slice(0, 3);

  // Simulate member count increasing and showing notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const increase = Math.floor(Math.random() * 3); // 0-2 new members
      if (increase > 0) {
        setMembers((prev) => prev + increase);

        // Show a toast notification for a new member
        const newMemberName = newMembers[Math.floor(Math.random() * newMembers.length)];
        toast({
          title: `${newMemberName} just joined!`,
          status: "info",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <Box
      p={{ base: 4, md: 6 }}
      maxW="900px"
      mx="auto"
      pt={{ base: "140px", md: "160px" }}
      fontFamily="Inter, sans-serif"
    >
      {/* University header */}
      <VStack spacing={3} mb={8} textAlign="center">
        <Heading size="2xl">{universityName}</Heading>
        <Text fontSize="lg" color={secondaryText} fontWeight="medium">
          {members.toLocaleString()} students joined
        </Text>
        <Text fontSize="md" fontWeight="semibold" color={highlightText}>
          Save $5 on your first ride* by verifying your university email
        </Text>
        <Button
          colorScheme="teal"
          size="md"
          mt={2}
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
          onClick={() => navigate("/login")}
        >
          Sign in to verify your email
        </Button>
      </VStack>

      <Divider mb={8} />

      {/* Info Section */}
      <Box mb={8}>
        <Heading size="lg" mb={3}>
          Carpooling made for {universityName} students
        </Heading>
        <Text fontSize="md" color={secondaryText} lineHeight="tall">
          Convenient, secure, and student-first: verify your student email, get your badge, and ride with classmates on Canada’s biggest carpooling app.
        </Text>
      </Box>

      {/* Rides Section */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <Card
          bg={cardBg}
          p={4}
          borderRadius="xl"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
        >
          <CardBody>
            <Heading size="md" mb={2}>Rides from {universityName}</Heading>
            <Text color={secondaryText}>See available rides leaving from your campus.</Text>
            <Button
              colorScheme="teal"
              size="sm"
              mt={3}
              onClick={() => navigate("/search-trips")}
            >
              Find a ride
            </Button>
          </CardBody>
        </Card>
        <Card
          bg={cardBg}
          p={4}
          borderRadius="xl"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
        >
          <CardBody>
            <Heading size="md" mb={2}>Rides to {universityName}</Heading>
            <Text color={secondaryText}>Find rides going to your campus.</Text>
            <Button
              colorScheme="teal"
              size="sm"
              mt={3}
              onClick={() => navigate("/search-trips")}
            >
              Find a ride
            </Button>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* How it works */}
      <Box mb={8}>
        <Heading size="lg" mb={4}>How it works</Heading>
        <HStack spacing={6} flexWrap="wrap">
          <Card
            flex="1"
            minW="250px"
            mb={4}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >
            <CardBody>
              <Heading size="md" mb={2}>For passengers</Heading>
              <Text color={secondaryText}>Find a ride, book, and go. Affordable, convenient, and safe.</Text>
              <Button
                colorScheme="orange"
                size="sm"
                mt={3}
                onClick={() => navigate("/search-trips")}
              >
                Find a ride
              </Button>
            </CardBody>
          </Card>
          <Card
            flex="1"
            minW="250px"
            mb={4}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >
            <CardBody>
              <Heading size="md" mb={2}>For drivers</Heading>
              <Text color={secondaryText}>Fill your seats with friendly passengers to cover your costs.</Text>
              <Button
                colorScheme="orange"
                size="sm"
                mt={3}
                onClick={() => navigate("/create-trip")}
              >
                Post a trip
              </Button>
            </CardBody>
          </Card>
        </HStack>
      </Box>

      {/* Testimonials */}
      <Box mb={8}>
        <Heading size="lg" mb={4}>What people say about us</Heading>
        <VStack spacing={4} align="stretch">
          {displayedTestimonials.map((t, idx) => (
            <Card
              key={idx}
              shadow="sm"
              borderRadius="xl"
              bg={cardBg}
              _hover={{ shadow: "md" }}
            >
              <CardBody>
                <HStack spacing={3} mb={2}>
                  <Avatar name={t.name} size="sm" />
                  <Box>
                    <Text fontWeight="bold">{t.name}</Text>
                    <Text fontSize="sm" color={secondaryText}>{t.date}</Text>
                  </Box>
                </HStack>
                <Text color={secondaryText}>{t.text}</Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
        <Button
          colorScheme="teal"
          size="sm"
          mt={4}
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
          onClick={() => setShowAllTestimonials(!showAllTestimonials)}
        >
          {showAllTestimonials ? "Load Less" : "Load More"}
        </Button>
      </Box>

      {/* Final CTA */}
      <Box textAlign="center" mb={12}>
        <Heading size="lg" mb={4}>We’d love to have you carpool with us!</Heading>
        <HStack justify="center" spacing={4} flexWrap="wrap">
          <Button
            colorScheme="teal"
            onClick={() => navigate("/search-trips")}
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >
            Find a ride
          </Button>
          <Text fontWeight="bold" color={secondaryText}>or</Text>
          <Button
            colorScheme="orange"
            onClick={() => navigate("/create-trip")}
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >
            Post a trip
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
