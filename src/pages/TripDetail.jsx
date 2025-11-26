// src/pages/TripDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../hooks/useSupabase.js";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  Textarea,
  Select,
  Badge,
  useToast,
  HStack,
  Avatar,
  Divider,
} from "@chakra-ui/react";

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [booking, setBooking] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const toast = useToast();
  const chatEndRef = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data?.user || null);
    };
    getUser();
  }, []);

  // Fetch trip and real-time updates
  useEffect(() => {
    const fetchTrip = async () => {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) setTrip(data);
    };
    fetchTrip();

    const tripSub = supabase
      .channel(`public:trips:id=eq.${id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "trips", filter: `id=eq.${id}` },
        (payload) => setTrip((t) => ({ ...(t || {}), ...payload.new }))
      )
      .subscribe();

    return () => supabase.removeChannel(tripSub);
  }, [id]);

  // Fetch user's booking
  useEffect(() => {
    if (!currentUser) return;
    const fetchBooking = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .eq("trip_id", id)
        .eq("passenger_id", currentUser.id)
        .maybeSingle();
      setBooking(data || null);
    };
    fetchBooking();
  }, [id, currentUser]);

  // Fetch accepted passenger count
  useEffect(() => {
    const fetchAcceptedCount = async () => {
      const { count } = await supabase
        .from("bookings")
        .select("*", { count: "exact" })
        .eq("trip_id", id)
        .eq("status", "accepted");
      setAcceptedCount(count || 0);
    };
    fetchAcceptedCount();
  }, [id]);

  // Fetch average rating
  useEffect(() => {
    const fetchRating = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("rating")
        .eq("trip_id", id);
      if (data?.length) {
        const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
        setAverageRating(avg.toFixed(1));
      } else setAverageRating(null);
    };
    fetchRating();
  }, [id, messages]);

  // Check if user has reviewed
  useEffect(() => {
    if (!currentUser) return;
    const checkReview = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("trip_id", id)
        .eq("reviewer_id", currentUser.id)
        .maybeSingle();
      setHasReviewed(!!data);
    };
    checkReview();
  }, [id, currentUser]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("trip_id", id)
        .order("created_at", { ascending: true });
      setMessages(data || []);
    };
    fetchMessages();

    const msgSub = supabase
      .channel(`public:messages:trip_id=eq.${id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `trip_id=eq.${id}` },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => supabase.removeChannel(msgSub);
  }, [id]);

  // BOOK a trip
  const handleBook = async () => {
    if (!currentUser) return toast({ title: "Please log in", status: "warning" });
    if (!trip) return;
    if (trip.seats_available <= 0) return toast({ title: "No seats available", status: "error" });

    const { error } = await supabase.from("bookings").insert([{ trip_id: id, passenger_id: currentUser.id, status: "pending" }]);
    if (!error) {
      toast({ title: "Booking created", description: "Pending driver confirmation", status: "success" });
      setTrip((t) => ({ ...t, seats_available: t.seats_available - 1 }));
    } else toast({ title: "Booking failed", description: error.message, status: "error" });
  };

  // CANCEL booking
  const handleCancelBooking = async () => {
    if (!booking) return;
    const { error } = await supabase.from("bookings").delete().eq("id", booking.id);
    if (!error) {
      toast({ title: "Booking canceled", status: "success" });
      setBooking(null);
      setTrip((t) => ({ ...t, seats_available: t.seats_available + 1 }));
    } else toast({ title: "Cancel failed", description: error.message, status: "error" });
  };

  // SUBMIT review
  const handleSubmitReview = async () => {
    if (!currentUser || hasReviewed) return;
    const { error } = await supabase.from("reviews").insert([{ trip_id: id, reviewer_id: currentUser.id, reviewee_id: trip.driver_id, rating, comment: reviewComment }]);
    if (!error) {
      setReviewComment("");
      setRating(5);
      setHasReviewed(true);
      toast({ title: "Review submitted", status: "success" });
    }
  };

  // SEND message
  const handleSendMessage = async () => {
    if (!currentUser || !newMessage) return;
    const { error } = await supabase.from("messages").insert([
      {
        sender_id: currentUser.id,
        receiver_id: trip.driver_id,
        trip_id: id,
        message_text: newMessage,
        sender_name: currentUser.user_metadata?.full_name || "You",
        sender_avatar: currentUser.user_metadata?.avatar_url || "",
      },
    ]);
    if (!error) setNewMessage("");
  };

  // SUBMIT report
  const handleSubmitReport = async () => {
    if (!currentUser || !reportReason) return toast({ title: "Enter a reason", status: "warning" });
    const { error } = await supabase.from("reports").insert([{ trip_id: id, reporter_id: currentUser.id, reported_id: trip.driver_id, reason: reportReason }]);
    if (!error) {
      setReportReason("");
      toast({ title: "Report submitted", status: "success" });
    }
  };

  if (!trip) return <Text>Loading...</Text>;
  const isDriver = currentUser?.id === trip.driver_id;

  return (
    <Box pt="80px" px={8} pb={8}>
      {/* pt pushes content below navbar */}
      <Heading mb={4}>Trip Details</Heading>
      <Text fontWeight="bold" mb={2}>{trip.origin} → {trip.destination}</Text>
      <Text mb={1}>Date: {new Date(trip.date_time).toLocaleString()}</Text>
      <Text mb={1}>Seats Available: <Badge colorScheme={trip.seats_available > 0 ? "green" : "red"}>{trip.seats_available}</Badge></Text>
      <Text mb={1}>Accepted Passengers: <Badge colorScheme="blue">{acceptedCount}</Badge></Text>
      {averageRating && <Text mb={1}>Driver Rating: <Badge colorScheme="yellow">{averageRating} ⭐</Badge></Text>}
      <Text mb={4}>Price per Seat: ${trip.price_per_seat}</Text>

      {!isDriver && !booking && <Button colorScheme="teal" mb={4} onClick={handleBook}>Book Trip</Button>}
      {!isDriver && booking && (
        <Box mb={4}>
          <Heading size="sm" mb={2}>Your Booking</Heading>
          <Text mb={2}>Status: {booking.status}</Text>
          {(booking.status === "pending" || booking.status === "accepted") && (
            <Button colorScheme="red" onClick={handleCancelBooking}>Cancel Booking</Button>
          )}
        </Box>
      )}

      {isDriver && <Box mb={6}><Heading size="md" mb={3}>Passenger Bookings</Heading><DriverBookings tripId={id} /></Box>}

      <Divider mb={6} />

      {/* Chat */}
      <Box mb={8}>
        <Heading size="md" mb={2}>Chat</Heading>
        <VStack spacing={2} align="stretch">
          {messages.length === 0 && <Text fontSize="sm" color="gray.500">No messages yet.</Text>}
          {messages.map((msg) => (
            <HStack key={msg.id} p={2} bg={msg.sender_id === currentUser?.id ? "teal.100" : "gray.100"} borderRadius="md">
              <Avatar size="sm" src={msg.sender_avatar} name={msg.sender_name} />
              <Box>
                <Text fontSize="sm">{msg.sender_name}</Text>
                <Text>{msg.message_text}</Text>
                <Text fontSize="xs" color="gray.500">{new Date(msg.created_at).toLocaleTimeString()}</Text>
              </Box>
            </HStack>
          ))}
          <div ref={chatEndRef} />
          <HStack mt={2}>
            <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} />
            <Button colorScheme="teal" onClick={handleSendMessage}>Send</Button>
          </HStack>
        </VStack>
      </Box>

      <Divider mb={6} />

      {/* Report */}
      <Box mb={8}>
        <Heading size="md" mb={2}>Report Driver / Trip</Heading>
        <Textarea placeholder="Enter reason..." value={reportReason} onChange={(e) => setReportReason(e.target.value)} mb={2} />
        <Button colorScheme="red" onClick={handleSubmitReport}>Submit Report</Button>
      </Box>

      <Divider mb={6} />

      {/* Rating */}
      {!isDriver && !hasReviewed && (
        <Box mb={8}>
          <Heading size="md" mb={2}>Submit Rating & Review</Heading>
          <Select value={rating} onChange={(e) => setRating(Number(e.target.value))} mb={2}>
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Good</option>
            <option value={3}>3 - Average</option>
            <option value={2}>2 - Poor</option>
            <option value={1}>1 - Very Poor</option>
          </Select>
          <Textarea placeholder="Write a comment..." value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} mb={2} />
          <Button colorScheme="teal" onClick={handleSubmitReview}>Submit Review</Button>
        </Box>
      )}
    </Box>
  );
}

/* DRIVER BOOKINGS COMPONENT */
function DriverBookings({ tripId }) {
  const [bookings, setBookings] = useState([]);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: bData } = await supabase.from("bookings").select("*").eq("trip_id", tripId).order("created_at", { ascending: true });
      setBookings(bData || []);
      const passengerIds = (bData || []).map((b) => b.passenger_id);
      if (passengerIds.length) {
        const { data: pData } = await supabase.from("profiles").select("id, full_name, avatar_url").in("id", passengerIds);
        const profileMap = {};
        pData?.forEach((p) => (profileMap[p.id] = p));
        setProfiles(profileMap);
      }
    };
    fetchBookings();
  }, [tripId]);

  return (
    <VStack align="stretch" spacing={3}>
      {bookings.length === 0 && <Text fontSize="sm" color="gray.500">No passenger bookings yet.</Text>}
      {bookings.map((b) => {
        const profile = profiles[b.passenger_id];
        return (
          <Box key={b.id} p={3} borderWidth="1px" borderRadius="md">
            <HStack spacing={3}>
              {profile?.avatar_url && <Avatar size="sm" src={profile.avatar_url} />}
              <Text>Passenger: {profile?.full_name || b.passenger_id}</Text>
            </HStack>
            <Text>Status: {b.status}</Text>
            {b.status === "accepted" && <Badge colorScheme="green">Accepted</Badge>}
            {b.status === "pending" && <Badge colorScheme="yellow">Pending</Badge>}
            {b.status === "rejected" && <Badge colorScheme="red">Rejected</Badge>}
            {b.status === "canceled" && <Badge colorScheme="gray">Canceled</Badge>}
          </Box>
        );
      })}
    </VStack>
  );
}
