// src/pages/OnboardingProfilePicture.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../hooks/useSupabase.js";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Image,
  Text,
  useToast,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function OnboardingProfilePicture() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();
  const MAX_FILE_SIZE_MB = 10;

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.600", "gray.300");

  // Fetch existing profile picture if available
  useEffect(() => {
    const fetchProfilePicture = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("profile_picture")
        .eq("id", user.id)
        .single();
      if (profile?.profile_picture) setProfilePictureUrl(profile.profile_picture);
    };
    fetchProfilePicture();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Only image files are allowed (jpeg, png, etc.)",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > MAX_FILE_SIZE_MB) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${MAX_FILE_SIZE_MB} MB`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  // Upload to Supabase storage
  const handleUpload = async () => {
    if (!file) {
      toast({ title: "No file selected", status: "warning", duration: 4000, isClosable: true });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const fileExt = file.name.split(".").pop();
      const fileName = `profile_${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(fileName);

      setProfilePictureUrl(publicUrlData.publicUrl);

      // Update profile in Supabase
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ profile_picture: publicUrlData.publicUrl })
        .eq("id", user.id);
      if (profileError) throw profileError;

      toast({ title: "Profile picture uploaded!", status: "success", duration: 4000, isClosable: true });
    } catch (err) {
      toast({ title: "Upload failed", description: err.message, status: "error", duration: 5000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  // Complete onboarding
  const handleNext = async () => {
    if (!profilePictureUrl) {
      toast({ title: "Please upload a profile picture first", status: "warning", duration: 4000, isClosable: true });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ onboarding_complete: true })
        .eq("id", user.id);
      if (updateError) throw updateError;

      toast({ title: "Onboarding completed!", status: "success", duration: 4000, isClosable: true });
      navigate("/dashboard");
    } catch (err) {
      toast({ title: "Error", description: err.message, status: "error", duration: 5000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg={bgColor}
      px={4}
    >
      <Box
        maxW="400px"
        w="100%"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg={boxBgColor}
      >
        <Heading mb={4} size="lg" textAlign="center" color={headingColor}>
          Complete Your Profile
        </Heading>
        <Text mb={4} fontSize="sm" color={textColor} textAlign="center">
          Upload a clear selfie without sunglasses, pets, or other people.
        </Text>

        <VStack spacing={4}>
          {profilePictureUrl && (
            <Image
              src={previewUrl || profilePictureUrl}
              alt="Profile Preview"
              borderRadius="full"
              boxSize="150px"
              objectFit="cover"
            />
          )}

          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            size="sm"
            bg={useColorModeValue("gray.100", "gray.700")}
            borderColor={useColorModeValue("gray.300", "gray.600")}
          />

          <Button
            colorScheme="teal"
            w="full"
            onClick={handleUpload}
            isLoading={loading}
            loadingText="Uploading..."
          >
            Upload Picture
          </Button>

          <Button
            colorScheme="blue"
            w="full"
            onClick={handleNext}
            isLoading={loading}
            loadingText="Processing..."
          >
            Complete Onboarding
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
