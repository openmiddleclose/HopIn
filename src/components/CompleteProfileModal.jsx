// src/components/CompleteProfileModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Avatar,
  Text,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "@/supabaseClient";

export default function CompleteProfileModal({ isOpen, onClose, user }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleAvatarUpload = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      setUploadedUrl(data.publicUrl);
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleSubmit = async () => {
    if (!fullName || !phone || !dob || !emergencyContact) {
      toast({
        title: "Missing fields",
        description: "Please complete all information.",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone_number: phone,
        date_of_birth: dob,
        emergency_contact: emergencyContact,
        avatar_url: uploadedUrl || null,
        profile_completed: true,
      })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        status: "error",
        duration: 3500,
      });
      return;
    }

    toast({
      title: "Profile completed!",
      status: "success",
      duration: 3000,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Complete Your Profile</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <VStack spacing={4}>

            {/* Avatar */}
            <Avatar size="xl" src={uploadedUrl} />
            <FormControl>
              <FormLabel>Profile Photo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAvatarFile(file);
                  handleAvatarUpload(file);
                }}
              />
            </FormControl>

            {/* Full Name */}
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>

            {/* Phone */}
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                placeholder="e.g. +1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>

            {/* DOB */}
            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </FormControl>

            {/* Emergency Contact */}
            <FormControl isRequired>
              <FormLabel>Emergency Contact</FormLabel>
              <Input
                placeholder="Name + Phone"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={loading}
            w="full"
          >
            Save & Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
