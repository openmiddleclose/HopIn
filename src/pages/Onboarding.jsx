import React, { useState, useEffect } from "react";
import { supabase } from "../hooks/useSupabase.js";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Input,
  Select,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [role, setRole] = useState("");
  const [birthday, setBirthday] = useState({ day: "", month: "", year: "" });
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
      } else {
        setCurrentUser(user);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!role) {
      return toast({ title: "Role required", status: "error", duration: 3000 });
    }

    setLoading(true);
    const birthdayString = birthday.year && birthday.month && birthday.day
      ? `${birthday.year}-${birthday.month.padStart(2, "0")}-${birthday.day.padStart(2, "0")}`
      : null;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          role,
          birthday: birthdayString,
          gender,
          onboarding_complete: true
        })
        .eq("id", currentUser.id);

      if (error) throw error;

      toast({ title: "Profile completed!", status: "success", duration: 3000 });
      navigate("/dashboard");
    } catch (err) {
      toast({ title: "Error", description: err.message || "Something went wrong", status: "error", duration: 5000 });
    }
    setLoading(false);
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Box
        w="100%"
        maxW="480px"
        p={8}
        borderRadius="lg"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="lg"
      >
        <Heading mb={4} textAlign="center">Welcome to HopIn!</Heading>
        <Text mb={6} textAlign="center" color="gray.500">
          Let’s set up your profile before you start using HopIn.
        </Text>

        <Stack spacing={4}>
          {/* Role */}
          <Select placeholder="I will mostly..." value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="driver">Drive</option>
            <option value="passenger">Ride</option>
          </Select>

          {/* Birthday */}
          <Text>Birthday (optional)</Text>
          <Flex gap={2}>
            <Input
              placeholder="Month"
              maxLength={2}
              value={birthday.month}
              onChange={(e) => setBirthday({ ...birthday, month: e.target.value })}
            />
            <Input
              placeholder="Day"
              maxLength={2}
              value={birthday.day}
              onChange={(e) => setBirthday({ ...birthday, day: e.target.value })}
            />
            <Input
              placeholder="Year"
              maxLength={4}
              value={birthday.year}
              onChange={(e) => setBirthday({ ...birthday, year: e.target.value })}
            />
          </Flex>

          {/* Gender */}
          <Select placeholder="Gender (optional)" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>

          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Complete Profile
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
