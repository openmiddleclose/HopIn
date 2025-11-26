// src/components/AuthForm.jsx
import React, { useState } from "react";
import { Box, Input, Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast({ title: "Signup Error", description: error.message, status: "error" });
    } else {
      toast({ title: "Signup Successful! Check your email to confirm.", status: "success" });
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login Error", description: error.message, status: "error" });
    } else {
      toast({ title: "Login Successful!", status: "success" });
    }
    setLoading(false);
  };

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} bg="gray.800" borderRadius="md">
      <FormControl mb={3}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" w="full" mb={2} onClick={handleSignup} isLoading={loading}>
        Sign Up
      </Button>
      <Button colorScheme="blue" w="full" onClick={handleLogin} isLoading={loading}>
        Log In
      </Button>
    </Box>
  );
}
