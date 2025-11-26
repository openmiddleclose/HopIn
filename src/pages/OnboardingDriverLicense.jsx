// src/pages/OnboardingDriverLicense.jsx
import React, { useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OnboardingDriverLicense() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const MAX_FILE_SIZE_MB = 10;

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

  // Upload license to Supabase
  const uploadLicense = async () => {
    if (!file) return null;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not found");

    const fileExt = file.name.split(".").pop();
    const fileName = `driver_license_${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("driver-licenses")
      .upload(fileName, file, { upsert: true });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("driver-licenses")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  // Verify license using backend
  const verifyLicense = async (licenseUrl) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/verify-license`,
        { imageUrl: licenseUrl }
      );
      return response.data.valid;
    } catch (err) {
      console.error("Verification error:", err.response?.data || err.message);
      return false;
    }
  };

  // Handle verification process
  const handleVerify = async () => {
    if (!file) {
      toast({ title: "Upload your license first", status: "warning" });
      return;
    }

    setLoading(true);
    try {
      // 1. Upload license to Supabase
      const licenseUrl = await uploadLicense();

      // 2. Verify with backend
      const isVerified = await verifyLicense(licenseUrl);

      if (!isVerified) {
        toast({
          title: "Verification failed",
          status: "error",
          description: "Your license could not be verified.",
        });
        setLoading(false);
        return;
      }

      // 3. Update Supabase profile
      const { data: { user } } = await supabase.auth.getUser();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ is_driver_verified: true })
        .eq("id", user.id);
      if (updateError) throw updateError;

      toast({
        title: "License verified!",
        status: "success",
        description: "You can now post trips.",
      });

      navigate("/dashboard");
    } catch (err) {
      toast({ title: "Error", description: err.message, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="calc(100vh - 80px)" px={4}>
      <Box maxW="400px" w="100%" p={6} borderRadius="lg" boxShadow="md" bg="white">
        <Heading mb={4} size="md">Upload your driver license</Heading>
        <Text mb={4} fontSize="sm" color="gray.600">
          We need to verify your driving license before you can post trips.
        </Text>

        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            borderRadius="md"
            boxSize="200px"
            mb={2}
            objectFit="cover"
          />
        )}

        <Input type="file" accept="image/*" onChange={handleFileChange} mb={4} />

        <Button colorScheme="teal" onClick={handleVerify} isDisabled={loading} width="100%">
          {loading ? <Spinner size="sm" mr={2} /> : null} Verify & Continue
        </Button>
      </Box>
    </Flex>
  );
}
