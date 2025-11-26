import React, { useEffect, useState } from "react";
import { supabase } from "../hooks/useSupabase.js";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";

export default function Chat({ tripId, receiverId, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("trip_id", tripId)
        .order("created_at", { ascending: true });
      if (!error) setMessages(data);
    };

    fetchMessages();

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `trip_id=eq.${tripId}` },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [tripId]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;

    await supabase.from("messages").insert([
      {
        trip_id: tripId,
        sender_id: userId,
        receiver_id: receiverId,
        message_text: newMsg,
      },
    ]);

    setNewMsg("");
  };

  return (
    <VStack spacing={2} align="stretch" border="1px solid #ccc" p={4} borderRadius="md">
      <Box maxH="200px" overflowY="auto">
        {messages.map((msg) => (
          <Text key={msg.id} fontWeight={msg.sender_id === userId ? "bold" : "normal"}>
            {msg.message_text}
          </Text>
        ))}
      </Box>
      <Box display="flex" gap={2}>
        <Input
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </VStack>
  );
}
