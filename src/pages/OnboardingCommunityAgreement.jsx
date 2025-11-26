// src/pages/OnboardingCommunityAgreement.jsx
import React, { useState } from "react";
import { supabase } from "../hooks/useSupabase.js";
import { Box, Button, Flex, Heading, Text, Checkbox, Stack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function OnboardingCommunityAgreement() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleAgree = async () => {
    if (!agreed) {
      return toast({
        title: "Agreement required",
        description: "You must agree to continue.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // Update user profile to mark onboarding complete and agreement accepted
      const { error } = await supabase
        .from("profiles")
        .update({ onboarding_complete: true, community_agreement: true })
        .eq("id", user.id);
      if (error) throw error;

      toast({
        title: "Onboarding completed!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // Navigate to main dashboard
      navigate("/dashboard");
    } catch (err) {
      toast({ title: "Error", description: err.message, status: "error", duration: 5000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="calc(100vh - 80px)" px={4}>
      <Box maxW="600px" w="100%" p={6} borderRadius="lg" boxShadow="md" bg="white">
        <Heading mb={4} size="md">Community Agreement</Heading>
        <Text mb={4} fontSize="sm" color="gray.600">
          When using Poparide, we ask you to agree and adhere to the following guiding principles to ensure a safe and reliable experience for all:
        </Text>
        <Stack spacing={2} mb={4}>
          <Text>• Safety First – We create a safe and secure space for all interactions between members.</Text>
          <Text>• Respectful Shared Spaces – We acknowledge each other's needs and strive for positive interactions.</Text>
          <Text>• Shared Transportation Costs – We share rides and costs to make travel more affordable.</Text>
          <Text>• Cash-Free Payments – We use Poparide’s secure booking system.</Text>
          <Text>• Prompt and Clear Communication – We communicate quickly and provide clear information.</Text>
          <Text>• Punctuality and Flexibility – We respect each other's time and adjust when necessary.</Text>
        </Stack>

        <Checkbox isChecked={agreed} onChange={(e) => setAgreed(e.target.checked)} mb={4}>
          I agree to the Poparide Community Agreement, Terms of Service, and Privacy Policy
        </Checkbox>

        <Button colorScheme="blue" onClick={handleAgree} isLoading={loading} loadingText="Submitting...">
          I Agree
        </Button>
      </Box>
    </Flex>
  );
}
