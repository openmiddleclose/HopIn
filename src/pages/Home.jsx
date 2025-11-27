// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  HStack,
  SimpleGrid,
  Stack,
  Container,
  Avatar,
  Spinner,
  VStack,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  Image,
  Icon,
  useToast,
  Link,
} from "@chakra-ui/react";
import { StarIcon, CalendarIcon, InfoIcon, CheckCircleIcon, TimeIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import TripCard from "../components/TripCard.jsx";
import { supabase } from "../hooks/useSupabase.js";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { motion } from "framer-motion";
import CityModal from "../components/CityModal.jsx"; 

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionVStack = motion(VStack);
const MotionImage = motion(Image);

export default function Home() {
  const navigate = useNavigate();
  const toast = useToast();

  const [trips, setTrips] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [reviews, setReviews] = useState([]);
  const [reviewsLimit, setReviewsLimit] = useState(4);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const headingColor = useColorModeValue("gray.800", "white");
  const inputBg = useColorModeValue("white", "gray.700");
  const inputColor = useColorModeValue("gray.800", "white");
  const inputBorder = useColorModeValue("gray.200", "gray.600");
  const heroBgGradient = useColorModeValue(
    "linear(to-r, teal.500, green.400)",
    "linear(to-r, teal.700, green.600)"
  );
  const driverSectionBg = useColorModeValue(
    "linear(to-r, #f5f0e1, #eae3d2)",
    "linear(to-r, gray.700, gray.800)"
  );
  const featuresBg = useColorModeValue("gray.50", "gray.900");
  const ctaBgGradient = useColorModeValue(
    "linear(to-r, green.400, teal.500)",
    "linear(to-r, teal.600, green.600)"
  );

  // Fetch trips
  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);

      if (!error) setTrips(data);
    };

    fetchTrips();
  }, []);

  // Mock reviews
  useEffect(() => {
    setLoadingReviews(true);
    const mockReviews = [
      { id: 1, name: "Lara G.", date: new Date(), rating: 5, text: "First time using HopIn and it was amazing! Smooth booking and friendly drivers." },
      { id: 2, name: "Tom H.", date: new Date(), rating: 4, text: "Very convenient for weekend trips. I saved a lot on travel costs." },
      { id: 3, name: "Amina K.", date: new Date(), rating: 5, text: "HopIn makes commuting fun and social. Met some great people!" },
      { id: 4, name: "Carlos V.", date: new Date(), rating: 4, text: "Reliable service and easy-to-use app. Definitely recommending to friends." },
      { id: 5, name: "Priya S.", date: new Date(), rating: 5, text: "Love the flexibility and safety features. Makes carpooling stress-free." },
      { id: 6, name: "Jaden R.", date: new Date(), rating: 3, text: "Good experience overall, but sometimes trips fill up too fast." },
      { id: 7, name: "Sofia L.", date: new Date(), rating: 5, text: "Great app! Drivers are verified and rides are affordable." },
      { id: 8, name: "Ethan M.", date: new Date(), rating: 4, text: "I’ve saved money and met interesting people. HopIn is a game-changer!" },
    ];
    setReviews(mockReviews.slice(0, reviewsLimit));
    setLoadingReviews(false);
  }, [reviewsLimit]);

  // Search function
  const handleSearch = () => {
    if (!from) {
      return toast({
        title: "Please select a departure city",
        status: "warning",
        position: "top"
      });
    }

    if (!to) {
      return toast({
        title: "Please select a destination city",
        status: "warning",
        position: "top"
      });
    }

    if (!date) {
      return toast({
        title: "Please select a date",
        status: "warning",
        position: "top"
      });
    }

    const searchDate = date.toISOString().split("T")[0];

    navigate(`/search-trips?from=${from}&to=${to}&date=${searchDate}`);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatAnimation = {
    animate: { y: [0, -5, 0], transition: { yoyo: Infinity, duration: 3, ease: "easeInOut" } },
  };

  return (
    <Box fontFamily="'Cinzel', serif" pt="120px">

      {/* HERO SECTION */}
      <MotionFlex
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        bgGradient={heroBgGradient}
        color="white"
        py={{ base: 20, md: 28 }}
        px={{ base: 4, md: 12 }}
      >
        {/* HERO LEFT */}
        <MotionBox
          flex="1"
          textAlign={{ base: "center", md: "left" }}
          mb={{ base: 10, md: 0 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4} textShadow="0 2px 4px rgba(0,0,0,0.3)">
            Carpooling for everyone
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} mb={6} maxW="2xl" fontWeight="semibold">
            Join thousands of people who choose HopIn to carpool between cities.
          </Text>

          {/* INPUTS */}
          <HStack spacing={3} maxW="900px" w="full" mb={4} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
            <Input
              placeholder="From"
              value={from}
              readOnly
              onClick={() => setIsFromModalOpen(true)}
              bg={inputBg}
              color={inputColor}
              borderRadius="lg"
              boxShadow="md"
              borderWidth="1px"
              borderColor={inputBorder}
            />
            <Input
              placeholder="To"
              value={to}
              readOnly
              onClick={() => setIsToModalOpen(true)}
              bg={inputBg}
              color={inputColor}
              borderRadius="lg"
              boxShadow="md"
              borderWidth="1px"
              borderColor={inputBorder}
            />

            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Button
                  leftIcon={<CalendarIcon />}
                  bg={inputBg}
                  color={inputColor}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={inputBorder}
                  boxShadow="md"
                >
                  {date
                    ? date.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent w="fit-content" bg={useColorModeValue("white", "gray.800")} color={textColor}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <DayPicker mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Button colorScheme="orange" size="md" borderRadius="lg" shadow="md" onClick={handleSearch}>
              Find a Ride
            </Button>
          </HStack>

          <Button
            variant="outline"
            borderColor="white"
            color="white"
            mt={2}
            size="md"
            borderRadius="lg"
            onClick={() => navigate("/create-trip")}
          >
            Post a Trip
          </Button>
        </MotionBox>

        {/* HERO RIGHT */}
        <MotionBox flex="1" display="flex" justifyContent="center">
          <MotionImage
            src="/images/carpool-hero.png"
            alt="Carpool Hero"
            borderRadius="xl"
            boxShadow="2xl"
            maxH={{ base: "200px", md: "400px" }}
            objectFit="contain"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
          />
        </MotionBox>
      </MotionFlex>

      {/* CITY MODALS */}
      <CityModal
        isOpen={isFromModalOpen}
        onClose={() => setIsFromModalOpen(false)}
        onSelect={(city) => {
          setFrom(city);
          setIsFromModalOpen(false);
        }}
      />
      <CityModal
        isOpen={isToModalOpen}
        onClose={() => setIsToModalOpen(false)}
        onSelect={(city) => {
          setTo(city);
          setIsToModalOpen(false);
        }}
      />

      {/* DRIVER PROMO SECTION */}
      <MotionFlex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        bgGradient={driverSectionBg}
        color={useColorModeValue("gray.800", "gray.100")}
        py={{ base: 16, md: 28 }}
        px={{ base: 6, md: 12 }}
        borderRadius="xl"
        mt={12}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MotionBox flex="1" mb={{ base: 8, md: 0 }}>
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4}>
            Be a driver
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} mb={6} maxW="2xl" fontWeight="semibold">
            Drivers save an average of <b>$250</b> every month by carpooling with HopIn. Share your seats and earn while
            helping others travel.
          </Text>
          <HStack spacing={4} flexWrap="wrap">
            <Button colorScheme="orange" size="md" borderRadius="lg" shadow="md" onClick={() => navigate("/create-trip")}>
              Post your trip
            </Button>
            <Button
              variant="outline"
              borderColor={useColorModeValue("gray.800", "gray.300")}
              color={useColorModeValue("gray.800", "gray.300")}
              size="md"
              borderRadius="lg"
              onClick={() => navigate("/drivers")}
            >
              Find out more
            </Button>
          </HStack>
        </MotionBox>

        <MotionBox flex="1" display="flex" justifyContent="center">
          <MotionImage
            src="/images/driver-logo.png"
            alt="Driver Logo"
            borderRadius="xl"
            boxShadow="2xl"
            maxH={{ base: "150px", md: "300px" }}
            objectFit="contain"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
          />
        </MotionBox>
      </MotionFlex>

      {/* FEATURES SECTION */}
      <Box py={16} px={6} bg={featuresBg}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign="center">
          {[
            { title: "Safe rides with verified drivers", desc: "We verify every driver's license so you ride with peace of mind.", icon: InfoIcon },
            { title: "Super easy to book", desc: "Find a ride, book in minutes, and travel for less — all online.", icon: CheckCircleIcon },
            { title: "Be a driver", desc: "Earn by sharing seats on trips you were already going to take.", icon: TimeIcon },
          ].map((feature, idx) => (
            <MotionBox
              key={idx}
              p={6}
              bg={cardBg}
              shadow="md"
              borderRadius="xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              <Icon as={feature.icon} w={10} h={10} color="teal.400" mb={3} />
              <Heading fontSize="xl" mb={2} color={headingColor}>
                {feature.title}
              </Heading>
              <Text color={textColor}>{feature.desc}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>

      {/* POPULAR RIDES */}
      <MotionBox py={16} px={6} initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <Heading textAlign="center" mb={10} color="teal.400" fontSize={{ base: "2xl", md: "3xl" }}>
          Popular Rides
        </Heading>
        <Container maxW="container.xl">
          {trips.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </SimpleGrid>
          ) : (
            <Text textAlign="center" color={textColor}>
              No trips available at the moment.
            </Text>
          )}
        </Container>
      </MotionBox>

      {/* TESTIMONIALS */}
      <Box py={16} px={6} bg={featuresBg}>
        <Heading textAlign="center" mb={10} fontSize={{ base: "2xl", md: "3xl" }} color={headingColor}>
          What people say about us
        </Heading>
        {loadingReviews ? (
          <Flex justify="center">
            <Spinner size="lg" />
          </Flex>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {reviews.map((r, idx) => (
                <MotionVStack
                  key={r.id}
                  bg={cardBg}
                  p={5}
                  shadow="md"
                  borderRadius="xl"
                  spacing={4}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                >
                  <Flex align="center" w="full">
                    <Avatar name={r.name} size="sm" mr={3} />
                    <Box>
                      <Text fontWeight="bold" color={headingColor}>
                        {r.name}
                      </Text>
                      <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
                        {new Date(r.date).toLocaleDateString()}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>{[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} color={i <= r.rating ? "orange.400" : "gray.300"} />)}</Flex>
                  <Text color={textColor} textAlign="center">
                    {r.text}
                  </Text>
                </MotionVStack>
              ))}
            </SimpleGrid>

            <Flex justify="center" mt={6} gap={4}>
              {reviewsLimit < 8 && (
                <Button onClick={() => setReviewsLimit(reviewsLimit + 4)} colorScheme="orange">
                  Load More
                </Button>
              )}
              {reviewsLimit > 4 && (
                <Button onClick={() => setReviewsLimit(reviewsLimit - 4)} variant="outline" colorScheme="orange">
                  Load Less
                </Button>
              )}
            </Flex>
          </>
        )}
      </Box>

      {/* CALL TO ACTION */}
      <MotionFlex
        direction="column"
        align="center"
        justify="center"
        bgGradient={ctaBgGradient}
        color="white"
        py={16}
        px={6}
        textAlign="center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading mb={4} fontSize={{ base: "2xl", md: "4xl" }}>
          We’d love to have you carpool with us!
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mb={6} maxW="2xl" fontWeight="semibold">
          Join thousands of people who share rides and travel smarter.
        </Text>

        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Button colorScheme="orange" size="lg" borderRadius="lg" onClick={() => navigate("/search-trips")}>
            Find a Ride
          </Button>

          <Button
            variant="outline"
            borderColor="white"
            color="white"
            size="lg"
            borderRadius="lg"
            onClick={() => navigate("/create-trip")}
          >
            Post a Trip
          </Button>
        </Stack>
      </MotionFlex>

    </Box>
  );
}
