import React, { useState } from "react";
import { supabase } from "../hooks/useSupabase.js";
import { Box, Button, Flex, Image, Input, Text, useToast } from "@chakra-ui/react";

export default function DriverLicenseUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(null);
  const toast = useToast();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUploadAndVerify = async () => {
    if (!file) return toast({ title: "Select a file first", status: "warning" });

    setLoading(true);
    try {
      // 1️⃣ Upload to Supabase
      const fileExt = file.name.split(".").pop();
      const fileName = `license_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("driver-licenses")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("driver-licenses")
        .getPublicUrl(fileName);

      // 2️⃣ Call backend to verify
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-license`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: publicUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: "Verification complete", status: "success" });
        setVerified(data);
      } else {
        toast({ title: "Verification failed", status: "error", description: data.error });
      }
    } catch (err) {
      toast({ title: "Error", status: "error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" px={4} py={6}>
      <Box maxW="400px" w="100%" bg="white" p={6} borderRadius="lg" boxShadow="md">
        <Text mb={2}>Upload your driver license</Text>
        <Input type="file" accept="image/*" onChange={handleFileChange} mb={4} />
        {previewUrl && <Image src={previewUrl} boxSize="150px" mb={4} objectFit="cover" />}
        <Button colorScheme="teal" onClick={handleUploadAndVerify} isLoading={loading}>
          Upload & Verify
        </Button>

        {verified && (
          <Box mt={4}>
            <Text>Verification result:</Text>
            <pre>{JSON.stringify(verified, null, 2)}</pre>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
