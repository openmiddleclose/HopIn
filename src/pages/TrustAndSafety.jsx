// src/pages/TrustAndSafety.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  Divider,
  Link as ChakraLink,
  Icon,
  Textarea,
  Select,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { supabase } from "../hooks/useSupabase.js";
import {
  FaCheckCircle,
  FaUserShield,
  FaEye,
  FaMoneyCheckAlt,
  FaCarSide,
  FaShieldAlt,
  FaHandsHelping,
} from "react-icons/fa";

export default function TrustAndSafety() {
  const [reportReason, setReportReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userReports, setUserReports] = useState([]);
  const [userTrips, setUserTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");
  const toast = useToast();

  const sections = [
    {
      icon: FaCheckCircle,
      title: "We verify all our drivers",
      text: "We verify every driver’s license using biometrics to ensure it’s valid and not expired, helping prevent fraud and scams.",
      link: { label: "More about verification", href: "#" },
      gradient: "linear(to-br, teal.400, teal.600)",
    },
    {
      icon: FaUserShield,
      title: "You choose who you travel with",
      text: "You can see a member’s profile, including their name, photo, reviews, and more before booking with them.",
      link: { label: "How bookings work", href: "#" },
      gradient: "linear(to-br, orange.400, orange.500)",
    },
    {
      icon: FaEye,
      title: "We monitor activity closely",
      text: "Automated checks monitor community activity, and we enforce strict safety policies, including zero tolerance for abuse, harassment, and dangerous driving.",
      link: { label: "How we keep you safe", href: "#" },
      gradient: "linear(to-br, green.400, green.500)",
    },
    {
      icon: FaMoneyCheckAlt,
      title: "Your money is safe with us",
      text: "All rides are booked through our secure system, with payments held for 4 days in case of disputes and processed by trusted providers like Stripe and PayPal.",
      link: { label: "How payments work", href: "#" },
      gradient: "linear(to-br, teal.300, teal.500)",
    },
    {
      icon: FaCarSide,
      title: "You're covered under regular car insurance",
      text: "HopIn follows provincial carpooling laws that let drivers share empty seats to cover costs, so they’re usually covered by their regular car insurance.",
      link: { label: "More on carpooling laws", href: "#" },
      gradient: "linear(to-br, blue.300, blue.500)",
    },
    {
      icon: FaShieldAlt,
      title: "You’re protected from scams",
      text: "Use our secure booking system to prevent scams and fraud—always book and pay through the HopIn app or website to ensure everyone's safety.",
      link: { label: "How to avoid scams & phishing", href: "#" },
      gradient: "linear(to-br, purple.300, purple.500)",
    },
    {
      icon: FaHandsHelping,
      title: "We're here to help",
      text: "Our friendly support team is available 7 days a week to make sure you have a positive experience.",
      link: { label: "Find answers to your questions in our help centre", href: "#" },
      gradient: "linear(to-br, pink.300, pink.500)",
    },
  ];

  const faqs = [
    "How do I book a trip?",
    "How are prices calculated?",
    "Can passengers cancel?",
    "Can I pay cash?",
    "How do I verify my ID?",
    "How do payouts work?",
    "More answers in our help centre",
  ];

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");

  // Fetch reports submitted by current user
  const fetchUserReports = async () => {
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("reports")
      .select("*, trip_id(*)")
      .eq("reporter_id", userId)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setUserReports(data);
  };

  // Fetch trips for current user
  const fetchUserTrips = async () => {
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("driver_id", userId)
      .order("date_time", { ascending: false });

    if (!error) setUserTrips(data || []);
  };

  useEffect(() => {
    fetchUserReports();
    fetchUserTrips();

    // Real-time subscription for reports
    const subscription = supabase
      .channel("public:reports")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reports" },
        (payload) => {
          // Only show reports by the current user
          supabase.auth.getUser().then((user) => {
            const userId = user?.data?.user?.id;
            if (payload.new.reporter_id === userId) {
              setUserReports((prev) => [payload.new, ...prev]);
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleSubmitReport = async () => {
    if (!reportReason.trim()) {
      toast({ title: "Please provide a reason", status: "warning", duration: 3000, isClosable: true });
      return;
    }

    setSubmitting(true);
    try {
      const user = await supabase.auth.getUser();
      const reporter_id = user?.data?.user?.id;

      if (!reporter_id) throw new Error("You must be logged in to submit a report.");

      const { error } = await supabase.from("reports").insert([
        {
          reporter_id,
          reason: reportReason.trim(),
          trip_id: selectedTrip || null,
        },
      ]);

      if (error) throw error;

      setReportReason("");
      setSelectedTrip("");
      toast({ title: "Report submitted", status: "success", duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: "Error", description: err.message, status: "error", duration: 5000, isClosable: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} pt={{ base: 120, md: 140 }} maxW="7xl" mx="auto" bg={bgColor}>
      {/* HEADER */}
      <VStack spacing={4} textAlign="center" mb={12} maxW="3xl" mx="auto">
        <Heading fontSize={{ base: "3xl", md: "4xl" }} color={headingColor}>
          Trust & Safety
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
          Your safety is our top priority when using HopIn.
        </Text>
      </VStack>

      {/* SECTIONS */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={12}>
        {sections.map((sec, idx) => (
          <Card
            key={idx}
            p={6}
            borderRadius="2xl"
            shadow="xl"
            bgGradient={sec.gradient}
            color="white"
            as={motion.div}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CardBody textAlign="center">
              <Icon as={sec.icon} w={12} h={12} mb={4} />
              <Heading size="md" mb={2}>
                {sec.title}
              </Heading>
              <Text mb={2}>{sec.text}</Text>
              <ChakraLink href={sec.link.href} fontWeight="bold" color="white" textDecoration="underline">
                {sec.link.label}
              </ChakraLink>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* FAQ */}
      <Card p={6} borderRadius="2xl" shadow="lg" mb={12} bg={cardBg}>
        <Heading size="md" mb={4} color={headingColor} textAlign="center">
          Frequently asked questions
        </Heading>
        <VStack spacing={2} align="start">
          {faqs.map((faq, idx) => (
            <ChakraLink key={idx} href="#" color="teal.500">
              {faq}
            </ChakraLink>
          ))}
        </VStack>
      </Card>

      {/* REPORT SUBMISSION */}
      <Card p={6} borderRadius="2xl" shadow="lg" mb={12} bg={cardBg}>
        <Heading size="md" mb={4} color={headingColor} textAlign="center">
          Submit a Report
        </Heading>

        <Select
          placeholder="Link report to a trip (optional)"
          mb={3}
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
        >
          {userTrips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.origin} → {trip.destination} | {new Date(trip.date_time).toLocaleDateString()}
            </option>
          ))}
        </Select>

        <Textarea
          placeholder="Describe the issue or report..."
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          mb={3}
        />
        <Button colorScheme="red" onClick={handleSubmitReport} isLoading={submitting}>
          Submit Report
        </Button>

        {/* User's past reports */}
        {userReports.length > 0 && (
          <Box mt={6}>
            <Heading size="sm" mb={2} color={headingColor}>
              Your Previous Reports
            </Heading>
            <VStack spacing={2} align="stretch">
              {userReports.map((rep) => (
                <Card key={rep.id} p={3} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="md">
                  <Text fontSize="sm">{rep.reason}</Text>
                  {rep.trip_id && (
                    <Text fontSize="xs" color="gray.500">
                      Related Trip: {rep.trip_id.origin} → {rep.trip_id.destination}
                    </Text>
                  )}
                  <Text fontSize="xs" color="gray.500">
                    Submitted: {new Date(rep.created_at).toLocaleString()} | Status: {rep.resolved ? "Resolved" : "Pending"}
                  </Text>
                </Card>
              ))}
            </VStack>
          </Box>
        )}
      </Card>

      <Divider my={8} />

      {/* CALL TO ACTION */}
      <VStack spacing={4} align="center">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Link to="/search-trips">
            <Button colorScheme="teal" size="lg" w="full">
              Find a ride
            </Button>
          </Link>
          <Link to="/create-trip">
            <Button colorScheme="teal" variant="outline" size="lg" w="full">
              Post a trip
            </Button>
          </Link>
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
