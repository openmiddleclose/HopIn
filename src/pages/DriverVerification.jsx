// src/pages/DriverVerification.jsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  useToast,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { supabase } from "../hooks/useSupabase.js";
import { useNavigate } from "react-router-dom";

export default function DriverVerification() {
  const toast = useToast();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) {
      toast({ title: "Please select a file", status: "warning" });
      return;
    }

    setUploading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}_license.${fileExt}`;
      const filePath = `licenses/${fileName}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("licenses")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Update profile with license URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ license_url: filePath })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast({
        title: "License uploaded!",
        description: "Your license is pending verification.",
        status: "success",
      });

      // Optional: redirect back to CreateTrip
      navigate("/create-trip");
    } catch (err) {
      toast({ title: "Upload failed", description: err.message, status: "error" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box p={{ base: 5, md: 10 }} pt={{ base: 28, md: 36 }} maxW="600px" mx="auto" color="white">
      <VStack spacing={6} align="stretch">
        <Heading mb={2}>Driver Verification</Heading>
        <Text color="gray.400">
          To post trips, you need to verify your driver’s license. Upload a valid license below.
        </Text>

        <Input type="file" accept="image/*" onChange={handleFileChange} bg="gray.800" color="white" />
        {preview && <Image src={preview} alt="License Preview" borderRadius="md" mt={2} />}

        <Button
          colorScheme="teal"
          onClick={handleUpload}
          isLoading={uploading}
          loadingText="Uploading..."
        >
          Submit for Verification
        </Button>

        <Text color="gray.400" fontSize="sm">
          After submission, our team will review your license. Once approved, you can post trips.
        </Text>
      </VStack>
    </Box>
  );
}
