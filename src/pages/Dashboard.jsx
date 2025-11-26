// src/pages/Dashboard.jsx
import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { supabase } from "../hooks/useSupabase.js";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Spinner,
  Center,
  useColorModeValue,
  SimpleGrid,
  Button,
  Avatar,
  Flex,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaChair, FaRegCalendarAlt, FaRoute, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

export default function Dashboard({ currentUser, setCurrentUser }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [page, setPage] = useState(1);
  const [totalTrips, setTotalTrips] = useState(0);
  const tripsPerPage = 5;

  const cardBg = useColorModeValue("gray.900", "gray.800");
  const textColor = useColorModeValue("white", "white");
  const subTextColor = useColorModeValue("gray.300", "gray.400");

  const fileInputRef = useRef();
  const toast = useToast();

  // Fetch trips with server-side pagination
  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error, count } = await supabase
        .from("trips")
        .select("*, driver_relation(id,name,avatar_url)", { count: "exact" })
        .order("date_time", { ascending: false })
        .range((page - 1) * tripsPerPage, page * tripsPerPage - 1);

      if (error) throw error;

      setTrips(data || []);
      setTotalTrips(count || 0);
    } catch (err) {
      toast({
        title: "Error fetching trips",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [page, tripsPerPage, toast]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  // Google Maps URL
  const getMapUrl = (trip) => {
    if (!trip.origin || !trip.destination) return null;
    const originQ = encodeURIComponent(trip.origin);
    const destQ = encodeURIComponent(trip.destination);
    const waypoints = trip.stops?.length ? `&waypoints=${encodeURIComponent(trip.stops.join("|"))}` : "";
    return `https://www.google.com/maps/dir/?api=1&origin=${originQ}&destination=${destQ}${waypoints}&travelmode=driving`;
  };

  // Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileExt = file.name.split(".").pop();
    const fileName = `${currentUser.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { publicURL, error: urlError } = supabase.storage.from("avatars").getPublicUrl(filePath);
      if (urlError) throw urlError;

      const { error: updateError } = await supabase.from("profiles").update({ avatar_url: publicURL }).eq("id", currentUser.id);
      if (updateError) throw updateError;

      setCurrentUser({ ...currentUser, avatar_url: publicURL });

      // Update trips where current user is driver
      setTrips((prev) =>
        prev.map((t) =>
          t.driver_relation && t.driver_relation.id === currentUser.id
            ? { ...t, driver_relation: { ...t.driver_relation, avatar_url: publicURL } }
            : t
        )
      );

      toast({ title: "Avatar updated", status: "success", duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: "Error updating avatar", description: err.message || "Something went wrong", status: "error", duration: 5000, isClosable: true });
    }
  };

  // Debounced search
  const handleSearchChange = debounce((value) => setSearch(value), 300);

  // Filter & sort trips
  const filteredTrips = useMemo(() => {
    let list = trips;
    const now = new Date();

    if (filter === "upcoming") list = list.filter((t) => new Date(t.date_time) >= now);
    if (filter === "past") list = list.filter((t) => new Date(t.date_time) < now);
    if (search.trim()) {
      list = list.filter(
        (t) =>
          t.origin.toLowerCase().includes(search.toLowerCase()) ||
          t.destination.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "date_asc":
        list = list.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
        break;
      case "date_desc":
        list = list.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
        break;
      case "price_asc":
        list = list.sort((a, b) => a.price_per_seat - b.price_per_seat);
        break;
      case "price_desc":
        list = list.sort((a, b) => b.price_per_seat - a.price_per_seat);
        break;
      default:
        break;
    }

    return list;
  }, [trips, filter, search, sort]);

  const totalPages = Math.ceil(totalTrips / tripsPerPage);

  if (loading) return <Center py={20}><Spinner size="xl" color="teal.400" /></Center>;

  return (
    <Box p={{ base: 5, md: 10 }} pt={{ base: 36, md: 40 }}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap">
        <HStack spacing={4}>
          <Box
            position="relative"
            cursor="pointer"
            role="group"
            onClick={() => fileInputRef.current.click()}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)", shadow: "lg" }}
          >
            <Avatar name={currentUser?.name || "Driver"} src={currentUser?.avatar_url || ""} size="md" />
            <Box
              position="absolute"
              bottom={0}
              right={0}
              bg="teal.500"
              color="white"
              p={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
              opacity={0}
              transition="opacity 0.2s"
              _groupHover={{ opacity: 1 }}
            >
              Edit
            </Box>
            <Input type="file" accept="image/*" ref={fileInputRef} display="none" onChange={handleAvatarChange} />
          </Box>
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            {getGreeting()}, {currentUser?.name || "Driver"} 👋
          </Text>
        </HStack>
        <Button as={Link} to="/create-trip" leftIcon={<FaPlus />} colorScheme="teal" borderRadius="xl">
          Create Trip
        </Button>
      </Flex>

      <Heading mb={6} textAlign="center" color={textColor}>
        Dashboard
      </Heading>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={6}>
        {[
          { label: "Total Trips", value: totalTrips },
          { label: "Upcoming Trips", value: trips.filter((t) => new Date(t.date_time) >= new Date()).length },
          { label: "Total Seats Available", value: trips.reduce((acc, t) => acc + (t.seats_available || 0), 0) },
        ].map((card, idx) => (
          <Box
            key={idx}
            bg={cardBg}
            p={5}
            borderRadius="xl"
            textAlign="center"
            boxShadow="md"
            transition="all 0.2s"
            _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
          >
            <Text color={subTextColor}>{card.label}</Text>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              {card.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Filter/Search/Sort */}
      <Flex gap={3} mb={6} flexWrap="wrap">
        <Button size="sm" colorScheme={filter === "upcoming" ? "teal" : "gray"} onClick={() => setFilter("upcoming")}>
          Upcoming
        </Button>
        <Button size="sm" colorScheme={filter === "past" ? "teal" : "gray"} onClick={() => setFilter("past")}>
          Past
        </Button>
        <Input
          placeholder="Search by origin or destination"
          onChange={(e) => handleSearchChange(e.target.value)}
          maxW="300px"
          bg={cardBg}
          color={textColor}
          _placeholder={{ color: subTextColor }}
        />
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          maxW="200px"
          bg={cardBg}
          color={textColor}
        >
          <option value="date_desc">Date Desc</option>
          <option value="date_asc">Date Asc</option>
          <option value="price_desc">Price Desc</option>
          <option value="price_asc">Price Asc</option>
        </Select>
      </Flex>

      {/* Trips */}
      {filteredTrips.length === 0 ? (
        <Text textAlign="center" color={subTextColor}>
          No trips found.
        </Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {filteredTrips.map((trip) => {
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
                {trip.driver_relation && (
                  <HStack spacing={3} mb={2}>
                    <Avatar size="sm" src={trip.driver_relation.avatar_url || ""} name={trip.driver_relation.name} />
                    <Text color={subTextColor}>{trip.driver_relation.name}</Text>
                  </HStack>
                )}
                <HStack justify="space-between" flexWrap="wrap">
                  <HStack spacing={3}>
                    <FaMapMarkerAlt color="#4FD1C5" />
                    <Text fontWeight="bold" color={textColor}>
                      {trip.origin} → {trip.destination}
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    <FaChair color="#ED8936" />
                    <Text color={subTextColor}>{trip.seats_available || 0} seats</Text>
                  </HStack>
                </HStack>
                {trip.stops?.length > 0 && (
                  <Text color={subTextColor} mt={2}>
                    Stops: {trip.stops.join(", ")}
                  </Text>
                )}
                <HStack spacing={3} mt={2}>
                  <FaRegCalendarAlt color="#9F7AEA" />
                  <Text color={subTextColor}>{new Date(trip.date_time).toLocaleString()}</Text>
                </HStack>
                <Text color={subTextColor} mt={2}>
                  Price: ${trip.price_per_seat}
                </Text>
                {mapUrl && (
                  <Box mt={3}>
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                      <Button leftIcon={<FaRoute />} size="sm" colorScheme="gray" _hover={{ bg: "gray.700" }} borderRadius="xl">
                        Preview Route
                      </Button>
                    </a>
                  </Box>
                )}
              </Box>
            );
          })}
          <Flex justify="center" gap={3} mt={4} flexWrap="wrap">
            <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <Text alignSelf="center">
              {page} / {totalPages}
            </Text>
            <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </Flex>
        </VStack>
      )}
    </Box>
  );
}
