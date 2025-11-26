// src/pages/OnboardingProfileDescription.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../hooks/useSupabase.js";
import { Box, Button, Flex, Heading, Input, Textarea, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function OnboardingProfileDescription() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const MAX_CHARS = 250;

  // Fetch current description if exists
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("profile_description")
        .eq("id", user.id)
        .single();
      if (profile?.profile_description) setDescription(profile.profile_description);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (description.trim().length === 0) {
      return toast({ title: "Description required", status: "warning", duration: 4000, isClosable: true });
    }

    if (description.length > MAX_CHARS) {
      return toast({ title: `Maximum ${MAX_CHARS} characters`, status: "warning", duration: 4000, isClosable: true });
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { error } = await supabase
        .from("profiles")
        .update({ profile_description: description, onboarding_complete: true })
        .eq("id", user.id);
      if (error) throw error;

      toast({ title: "Profile description saved!", status: "success", duration: 4000, isClosable: true });

      // Navigate to dashboard (end of onboarding)
      navigate("/dashboard");
    } catch (err) {
      toast({ title: "Error", description: err.message, status: "error", duration: 5000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="calc(100vh - 80px)" px={4}>
      <Box maxW="500px" w="100%" p={6} borderRadius="lg" boxShadow="md" bg="white">
        <Heading mb={4} size="md">Write your profile description</Heading>
        <Text mb={4} fontSize="sm" color="gray.600">
          Poparide members read profile descriptions when deciding who to carpool with.
        </Text>
        <Text mb={4} fontSize="xs" color="gray.400">
          e.g. I travel to visit friends or family on weekends.
        </Text>

        <Textarea
          placeholder="Tell others a bit about yourself..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb={4}
          size="lg"
          resize="vertical"
          maxLength={MAX_CHARS}
        />
        <Text fontSize="sm" color="gray.500" mb={4}>
          {description.length}/{MAX_CHARS} characters
        </Text>

        <Button colorScheme="blue" onClick={handleSave} isLoading={loading} loadingText="Saving...">
          Next
        </Button>
      </Box>
    </Flex>
  );
}
