// src/components/TripCard.jsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Badge,
  Button,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function TripCard({ trip }) {
  const navigate = useNavigate();

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      p={5}
      bg="white"
      shadow="sm"
      _hover={{
        shadow: "2xl",
        transform: "scale(1.03)",
        transition: "all 0.3s ease-in-out",
      }}
      cursor="pointer"
      onClick={() => navigate(`/trip/${trip.id}`)}
    >
      {/* Header: Route + Seats */}
      <Flex justify="space-between" align="center" mb={3}>
        <Heading fontSize="lg" color="teal.600">
          {trip.origin} → {trip.destination}
        </Heading>
        <Badge
          borderRadius="full"
          px={3}
          py={1}
          colorScheme={trip.seats_available > 0 ? "green" : "red"}
          fontWeight="bold"
          fontSize="0.8em"
        >
          {trip.seats_available > 0
            ? `${trip.seats_available} seats`
            : "Full"}
        </Badge>
      </Flex>

      <Divider mb={4} borderColor="gray.200" />

      {/* Details */}
      <HStack justify="space-between" mb={4}>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.500">
            🗓 Date & Time
          </Text>
          <Text fontWeight="bold" color="gray.800">
            {new Date(trip.date_time).toLocaleString()}
          </Text>
        </VStack>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.500">
            💰 Price
          </Text>
          <Text fontWeight="bold" color="teal.600">
            ${trip.price_per_seat}
          </Text>
        </VStack>
      </HStack>

      {/* Action */}
      <Button
        colorScheme="orange"
        size="md"
        width="full"
        fontWeight="bold"
        _hover={{ bg: "orange.500", transform: "scale(1.02)" }}
        onClick={(e) => {
          e.stopPropagation(); // prevent card click navigation
          navigate(`/trip/${trip.id}`);
        }}
      >
        View / Book Trip
      </Button>
    </Box>
  );
}
