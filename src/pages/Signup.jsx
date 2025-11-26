// src/pages/Signup.jsx
import React, { useState } from "react";
import { supabase } from "../hooks/useSupabase.js";
import {
  Box,
  Input,
  Button,
  Stack,
  Heading,
  Text,
  Flex,
  Divider,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async () => {
    // Check passwords match
    if (password !== confirmPassword) {
      return toast({
        title: "Passwords do not match",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    setLoading(true);

    try {
      // Sign up user with Supabase
      const { data, error } = await supabase.auth.signUp(
        { email, password },
        { redirectTo: `${window.location.origin}/login` } // Optional auto-redirect after email verification
      );
      if (error) throw error;

      // Insert profile into database
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          email,
          is_admin: false,
          onboarding_complete: false, // Set onboarding as incomplete
        },
      ]);
      if (profileError) throw profileError;

      // Notify user to verify email
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });

      // Redirect to verify email page
      navigate("/verify-email", { state: { email } });

    } catch (err) {
      toast({
        title: "Signup failed",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justify="center" align="center" minH="calc(100vh - 80px)" px={4} bg={useColorModeValue("gray.50", "gray.900")}>
      <Box
        w="100%"
        maxW="420px"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Heading mb={1} size="lg" textAlign="center">
          Create your account
        </Heading>
        <Text mb={6} textAlign="center" color={useColorModeValue("gray.600", "gray.400")}>
          Sign up to get started
        </Text>

        <Stack spacing={4}>
          <Input
            placeholder="First name"
            size="lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last name"
            size="lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Email"
            size="lg"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            size="lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm password"
            size="lg"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleSignup}
            isLoading={loading}
            loadingText="Creating..."
          >
            Create account
          </Button>

          <Divider my={2} />
          <Text fontSize="sm" textAlign="center">
            Already a member?{" "}
            <Link to="/login" style={{ color: "#319795", fontWeight: 500 }}>
              Sign in
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}
