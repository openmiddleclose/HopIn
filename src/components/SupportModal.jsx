// src/components/SupportModal.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Box,
  Text,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { supabase, getCurrentUser } from "../hooks/useSupabase.js";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

export default function SupportModal({ tripId, isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("question");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [newMessageIds, setNewMessageIds] = useState([]);
  const [user, setUser] = useState(null);
  const chatEndRef = useRef(null);
  const toast = useToast();

  // Scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch tickets/messages
  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("trip_id", tripId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      const formatted = data.flatMap((ticket) => {
        const arr = [{ sender: "user", text: ticket.message, id: ticket.id }];
        if (ticket.ai_reply) arr.push({ sender: "ai", text: ticket.ai_reply, id: ticket.id + "-ai" });
        if (ticket.admin_reply) arr.push({ sender: "admin", text: ticket.admin_reply, id: ticket.id + "-admin" });
        return arr;
      });

      // Find new messages
      const newIds = formatted
        .filter((msg) => !chat.some((c) => c.id === msg.id))
        .map((msg) => msg.id);

      setChat(formatted);
      setNewMessageIds(newIds);

      scrollToBottom();
    }
  };

  // Subscribe to new tickets in real-time
  useEffect(() => {
    if (!isOpen) return;

    fetchTickets();

    const subscription = supabase
      .channel("support-tickets-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "support_tickets",
          filter: `trip_id=eq.${tripId}`,
        },
        () => fetchTickets()
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [tripId, isOpen]);

  const submitTicket = async () => {
    if (!user) return toast({ title: "Please log in", status: "warning" });
    if (!message) return toast({ title: "Enter a message", status: "warning" });

    setLoading(true);

    try {
      const { data: ticket, error } = await supabase
        .from("support_tickets")
        .insert([{ user_id: user.id, trip_id: tripId, message, type }])
        .select()
        .single();

      if (error) throw error;

      setChat((prev) => [...prev, { sender: "user", text: ticket.message, id: ticket.id }]);
      setMessage("");
      scrollToBottom();

      toast({ title: "Ticket submitted!", status: "success" });
    } catch (e) {
      console.error(e);
      toast({ title: "Error submitting ticket", status: "error" });
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Support Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2} align="stretch" mb={4} maxH="300px" overflowY="auto">
            <AnimatePresence>
              {chat.length === 0 && <Text>No messages yet. Submit your question!</Text>}
              {chat.map((msg) => (
                <MotionBox
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  bg={
                    msg.sender === "user"
                      ? "blue.600"
                      : msg.sender === "ai"
                      ? "gray.700"
                      : "teal.600"
                  }
                  color="white"
                  p={2}
                  borderRadius="md"
                  alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                  position="relative"
                >
                  <Text>{msg.text}</Text>
                  {newMessageIds.includes(msg.id) && (
                    <Badge position="absolute" top="-2" right="-2" colorScheme="yellow">
                      New
                    </Badge>
                  )}
                </MotionBox>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </VStack>

          <FormControl mb={3}>
            <FormLabel>Type</FormLabel>
            <Input value={type} onChange={(e) => setType(e.target.value)} />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Message</FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here..."
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={submitTicket} isLoading={loading} loadingText="Submitting...">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
