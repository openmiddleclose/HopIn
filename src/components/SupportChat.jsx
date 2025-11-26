// src/components/SupportChat.jsx
import React, { useEffect, useState } from "react";
import { Box, IconButton, Text, Badge, useDisclosure } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import SupportModal from "./SupportModal.jsx";
import { supabase, getCurrentUser } from "../hooks/useSupabase.js";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

export default function SupportChat({ tripId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch current user and listen for auth changes
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

  // Listen for new support tickets or replies to update unread count
  useEffect(() => {
    if (!tripId) return;

    const subscription = supabase
      .channel("support-tickets-notify")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "support_tickets",
          filter: `trip_id=eq.${tripId}`,
        },
        () => setUnreadCount((count) => count + 1)
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [tripId]);

  // Reset unread count when modal opens
  const handleOpen = () => {
    setUnreadCount(0);
    onOpen();
  };

  return (
    <>
      <AnimatePresence>
        {user ? (
          // Floating Chat Button for logged-in users
          <MotionBox
            position="fixed"
            bottom="20px"
            right="20px"
            zIndex="1000"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <Box position="relative">
              <IconButton
                icon={<ChatIcon />}
                colorScheme="teal"
                onClick={handleOpen}
                borderRadius="full"
                boxShadow="lg"
                aria-label="Open Support Chat"
              />
              {unreadCount > 0 && (
                <Badge
                  position="absolute"
                  top="-2"
                  right="-2"
                  borderRadius="full"
                  bg="red.500"
                  color="white"
                  fontSize="0.7em"
                  px={2}
                >
                  {unreadCount}
                </Badge>
              )}
            </Box>
          </MotionBox>
        ) : (
          // Floating login prompt for non-logged-in users
          <MotionBox
            position="fixed"
            bottom="20px"
            right="20px"
            zIndex="1000"
            bg="gray.700"
            color="white"
            p={3}
            borderRadius="md"
            boxShadow="lg"
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Text fontSize="sm">
              <Link to="/login" style={{ color: "#319795", fontWeight: 500 }}>
                Log in to chat with support
              </Link>
            </Text>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      {user && <SupportModal isOpen={isOpen} onClose={onClose} tripId={tripId} />}
    </>
  );
}
