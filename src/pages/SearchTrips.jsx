// src/pages/SearchTrips.jsx
import React, { useState } from "react";
import { supabase } from "../hooks/useSupabase.js";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Flex,
  IconButton,
  useToast,
  Divider,
  Center,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaExchangeAlt, FaMapMarkerAlt, FaRegCalendarAlt, FaChair, FaRoute } from "react-icons/fa";
import { CalendarIcon } from "@chakra-ui/icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CityModal from "../components/CityModal.jsx";

export default function SearchTrips() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState("origin");

  const toast = useToast();

  const cardBg = useColorModeValue("gray.900", "gray.800");
  const inputBg = useColorModeValue("gray.800", "gray.700");
  const inputColor = useColorModeValue("white", "white");

  const openModal = (field) => {
    setCurrentField(field);
    setModalOpen(true);
  };

  const handleSelectLocation = (value) => {
    if (currentField === "origin") setOrigin(value);
    else setDestination(value);
    setModalOpen(false);
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = async () => {
    if (!origin.trim() || !destination.trim()) {
      toast({ title: "Enter origin & destination", status: "warning", duration: 3000 });
      return;
    }

    setLoading(true);

    let query = supabase
      .from("trips")
      .select("*")
      .ilike("origin", `%${origin}%`)
      .ilike("destination", `%${destination}%`);

    if (date) {
      const searchDate = date.toISOString().split("T")[0];
      query = query.eq("date_time::date", searchDate);
    }

    const { data, error } = await query.order("date_time", { ascending: true });
    setLoading(false);

    if (error) {
      toast({ title: "Error fetching trips", description: error.message, status: "error" });
      return;
    }

    setResults(data);
    if (data.length === 0) {
      toast({ title: "No rides found", status: "info", duration: 3000 });
    }
  };

  const getMapUrl = (trip) => {
    if (!trip.origin || !trip.destination) return null;
    const originQ = encodeURIComponent(trip.origin);
    const destQ = encodeURIComponent(trip.destination);
    const waypoints = trip.stops?.length ? `&waypoints=${encodeURIComponent(trip.stops.join("|"))}` : "";
    return `https://www.google.com/maps/dir/?api=1&origin=${originQ}&destination=${destQ}${waypoints}&travelmode=driving`;
  };

  return (
    <Box p={{ base: 5, md: 10 }} pt={{ base: 36, md: 40 }} maxW="900px" mx="auto">
      <Heading mb={2} textAlign="center" color="white">
        Need a ride?
      </Heading>
      <Text mb={6} textAlign="center" color="gray.400">
        Enter your origin and destination. Travel safely with verified drivers.
      </Text>

      {/* Search Card */}
      <Box bg={cardBg} p={6} borderRadius="xl" boxShadow="lg" mb={8}>
        <Flex gap={3} flexDirection={{ base: "column", md: "row" }} align={{ base: "stretch", md: "center" }}>
          <Input
            placeholder="From"
            value={origin}
            onClick={() => openModal("origin")}
            readOnly
            bg={inputBg}
            color={inputColor}
            cursor="pointer"
          />
          <IconButton
            icon={<FaExchangeAlt />}
            aria-label="Swap"
            onClick={handleSwap}
            mt={{ base: 2, md: 0 }}
            colorScheme="teal"
            borderRadius="full"
          />
          <Input
            placeholder="To"
            value={destination}
            onClick={() => openModal("destination")}
            readOnly
            bg={inputBg}
            color={inputColor}
            cursor="pointer"
          />
        </Flex>

        <HStack mt={4} spacing={3} flexWrap="wrap">
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button
                leftIcon={<CalendarIcon />}
                bg={inputBg}
                color={inputColor}
                borderRadius="lg"
                borderWidth="1px"
                _hover={{ bg: "gray.700" }}
              >
                {date ? date.toLocaleDateString() : "Leaving (optional)"}
              </Button>
            </PopoverTrigger>
            <PopoverContent w="fit-content" bg={cardBg}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <DayPicker mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button colorScheme="teal" onClick={handleSearch} px={6} py={5} fontWeight="bold">
            Find a ride
          </Button>
        </HStack>
      </Box>

      <Divider mb={8} />

      {/* Results */}
      {loading ? (
        <Center py={20}>
          <Spinner size="xl" color="teal.400" />
        </Center>
      ) : results.length > 0 ? (
        <VStack spacing={6} align="stretch">
          {results.map((trip) => {
            const mapUrl = getMapUrl(trip);
            return (
              <Box
                key={trip.id}
                bg={cardBg}
                p={5}
                borderRadius="xl"
                boxShadow="md"
                transition="all 0.3s ease"
                _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              >
                <Flex justify="space-between" flexDirection={{ base: "column", md: "row" }} align={{ base: "flex-start", md: "center" }} mb={2}>
                  <HStack spacing={3}>
                    <FaMapMarkerAlt color="#4FD1C5" />
                    <Text fontWeight="bold" color="white">
                      {trip.origin} → {trip.destination}
                    </Text>
                  </HStack>

                  <HStack spacing={2} mt={{ base: 2, md: 0 }}>
                    <FaChair color="#ED8936" />
                    <Text color="gray.300">{trip.seats_available} seats</Text>
                  </HStack>
                </Flex>

                {trip.stops?.length > 0 && (
                  <Text color="gray.400" mt={1}>
                    Stops: {trip.stops.join(", ")}
                  </Text>
                )}

                <HStack spacing={3} mt={1}>
                  <FaRegCalendarAlt color="#9F7AEA" />
                  <Text color="gray.300">{new Date(trip.date_time).toLocaleString()}</Text>
                </HStack>

                <Text color="gray.300" mt={2}>
                  Price: ${trip.price_per_seat}
                </Text>

                <HStack spacing={3} mt={3}>
                  {mapUrl && (
                    <Button
                      as="a"
                      href={mapUrl}
                      target="_blank"
                      leftIcon={<FaRoute />}
                      size="sm"
                      colorScheme="gray"
                      _hover={{ bg: "gray.700" }}
                    >
                      Preview route
                    </Button>
                  )}
                  <Button as={Link} to={`/trip/${trip.id}`} colorScheme="blue" size="sm" borderRadius="xl">
                    View Details
                  </Button>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      ) : (
        <Text textAlign="center" color="gray.500" mt={10}>
          No rides found.
        </Text>
      )}

      <CityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSelect={handleSelectLocation} />
    </Box>
  );
}
