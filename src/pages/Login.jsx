// src/pages/Login.jsx
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    setLoading(true);

    try {
      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin, email_confirmed, onboarding_complete")
        .eq("id", authData.user.id)
        .single();
      if (profileError) throw profileError;

      // Check email verification
      if (!profile.email_confirmed) {
        toast({
          title: "Email not verified",
          description: "Please verify your email before logging in.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        navigate("/verify-email");
        return;
      }

      // Check onboarding completion
      if (!profile.onboarding_complete) {
        navigate("/onboarding");
        return;
      }

      // Redirect based on admin status
      profile.is_admin ? navigate("/admin-dashboard") : navigate("/dashboard");

    } catch (err) {
      toast({
        title: "Login failed",
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
      <Box w="100%" maxW="420px" p={8} borderRadius="lg" boxShadow="lg" bg={useColorModeValue("white", "gray.800")}>
        <Heading mb={2} size="lg" textAlign="center">
          Welcome back
        </Heading>
        <Text mb={6} textAlign="center" color={useColorModeValue("gray.600", "gray.400")}>
          Sign in to continue
        </Text>

        <Stack spacing={4}>
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

          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleLogin}
            isLoading={loading}
            loadingText="Logging in..."
          >
            Log in
          </Button>

          <Divider my={2} />
          <Text fontSize="sm" textAlign="center">
            New here?{" "}
            <Link to="/signup" style={{ color: "#319795", fontWeight: 500 }}>
              Create an account
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}
