// src/pages/CommunityGuidelines.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  Flex,
  Link,
} from "@chakra-ui/react";

export default function CommunityGuidelines() {
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "respect", label: "Respect and Safety" },
    { id: "content", label: "Content Guidelines" },
    { id: "behavior", label: "Prohibited Behavior" },
    { id: "reporting", label: "Reporting Violations" },
    { id: "moderation", label: "Moderation & Enforcement" },
    { id: "updates", label: "Updates to Guidelines" },
  ];

  const [activeId, setActiveId] = useState("");
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for navbar
      let currentId = sections[0].id;

      for (let section of sections) {
        const ref = sectionRefs.current[section.id];
        if (ref && ref.offsetTop <= scrollPosition) {
          currentId = section.id;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      pt={{ base: 32, md: 36 }}
      px={{ base: 4, md: 12 }}
      maxW="1200px"
      mx="auto"
      color="white"
      gap={10}
    >
      {/* Sidebar */}
      <Box
        w={{ base: "100%", md: "250px" }}
        mb={{ base: 8, md: 0 }}
        position={{ md: "sticky" }}
        top={{ md: "120px" }}
      >
        <Stack spacing={3} bg="gray.800" p={4} borderRadius="lg">
          {sections.map((section) => (
            <Link
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              cursor="pointer"
              fontWeight={activeId === section.id ? "bold" : "normal"}
              color={activeId === section.id ? "teal.300" : "gray.300"}
              _hover={{ color: "teal.400" }}
            >
              {section.label}
            </Link>
          ))}
        </Stack>
      </Box>

      {/* Main Content */}
      <Box flex="1">
        <Heading mb={2} textAlign="center">
          Community Guidelines
        </Heading>
        <Text fontSize="sm" color="gray.400" textAlign="center" mb={10}>
          Effective Date: December 2025
        </Text>

        <Stack spacing={10} bg="gray.900" p={10} borderRadius="xl" boxShadow="lg">
          {/* Introduction */}
          <Box id="intro" ref={(el) => (sectionRefs.current["intro"] = el)}>
            <Text>
              Welcome to HopIn! These Community Guidelines are designed to help
              maintain a safe, respectful, and inclusive environment for all
              members. By participating in our platform, you agree to follow these
              standards.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          {/* Respect and Safety */}
          <Box id="respect" ref={(el) => (sectionRefs.current["respect"] = el)}>
            <Heading size="md" mb={3}>
              Respect and Safety
            </Heading>
            <Text>
              Treat other members with respect. Harassment, threats, or
              discriminatory behavior is strictly prohibited. Ensure that your
              actions promote a safe and welcoming community.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          {/* Content Guidelines */}
          <Box id="content" ref={(el) => (sectionRefs.current["content"] = el)}>
            <Heading size="md" mb={3}>
              Content Guidelines
            </Heading>
            <Text>
              Only share content that is appropriate, accurate, and relevant to
              the platform. Prohibited content includes but is not limited to:
            </Text>
            <Text mt={2}>
              • Spam, scams, or misleading information  
              • Violent, hateful, or sexual content  
              • Intellectual property infringement  
              • Content that violates local laws or regulations
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          {/* Prohibited Behavior */}
          <Box id="behavior" ref={(el) => (sectionRefs.current["behavior"] = el)}>
            <Heading size="md" mb={3}>
              Prohibited Behavior
            </Heading>
            <Text>
              Examples of prohibited behavior include, but are not limited to:
            </Text>
            <Text mt={2}>
              • Harassment or bullying of any member  
              • Impersonating others or creating fake accounts  
              • Disrupting community interactions  
              • Attempting to bypass platform security or restrictions
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          {/* Reporting Violations */}
          <Box id="reporting" ref={(el) => (sectionRefs.current["reporting"] = el)}>
            <Heading size="md" mb={3}>
              Reporting Violations
            </Heading>
            <Text>
              If you witness or experience violations of these guidelines, you
              should report them immediately through the platform's reporting
              tools. HopIn reviews all reports carefully and takes appropriate
              action.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          {/* Moderation & Enforcement */}
          <Box id="moderation" ref={(el) => (sectionRefs.current["moderation"] = el)}>
            <Heading size="md" mb={3}>
              Moderation & Enforcement
            </Heading>
            <Text>
              HopIn may warn, suspend, or ban members who violate these guidelines.
              Enforcement actions are taken at the platform's discretion to ensure
              community safety and trust.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          {/* Updates to Guidelines */}
          <Box id="updates" ref={(el) => (sectionRefs.current["updates"] = el)}>
            <Heading size="md" mb={3}>
              Updates to Guidelines
            </Heading>
            <Text>
              We may update these guidelines periodically to reflect community
              needs or legal requirements. Continued use of the platform
              constitutes acceptance of any changes. Members will be notified
              of significant updates.
            </Text>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
