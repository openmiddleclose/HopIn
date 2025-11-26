// src/pages/PrivacyPolicy.jsx
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

export default function PrivacyPolicy() {
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "registration", label: "Registration" },
    { id: "cookies", label: "Cookies & Tracking" },
    { id: "security", label: "Data Security" },
    { id: "compliance", label: "Safety & Legal Compliance" },
    { id: "logfiles", label: "Log Files & Device Data" },
    { id: "serviceemails", label: "Mandatory Service Communications" },
    { id: "marketing", label: "Marketing Communications" },
    { id: "accountclosure", label: "Closing Your Account" },
    { id: "datadeletion", label: "Data Deletion Requests" },
    { id: "identity", label: "Identity Verification" },
    { id: "android", label: "Android App Permissions" },
    { id: "updates", label: "Policy Updates" },
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
    handleScroll(); // initial check
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
          Privacy Policy
        </Heading>
        <Text fontSize="sm" color="gray.400" textAlign="center" mb={10}>
          Effective Date: December 2025
        </Text>

        <Stack spacing={10} bg="gray.900" p={10} borderRadius="xl" boxShadow="lg">
          {/* Sections */}
          <Box id="intro" ref={(el) => (sectionRefs.current["intro"] = el)}>
            <Text>
              HopIn Online Inc. (“HopIn”, “we”, “us”, “our”) is committed to
              protecting the privacy of everyone using our platform. This Privacy
              Policy explains what information we collect, how it is used, and the
              choices available to you when interacting with our services.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="registration" ref={(el) => (sectionRefs.current["registration"] = el)}>
            <Heading size="md" mb={3}>
              Information Collected During Registration
            </Heading>
            <Text>
              When creating an account, we collect details such as your name,
              email address, and contact information. These details help secure
              your account, allow us to verify your identity, and enable important
              service-related communication.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="cookies" ref={(el) => (sectionRefs.current["cookies"] = el)}>
            <Heading size="md" mb={3}>
              Cookies & Tracking Technologies
            </Heading>
            <Text mb={3}>
              Cookies are small files stored on your device to enhance your
              experience. HopIn uses cookies to:
            </Text>
            <Text>
              • Keep your session active  
              • Save your app preferences  
              • Improve navigation speed and overall performance  
              • Understand general usage patterns to enhance our platform  
            </Text>
            <Text mt={3}>
              You may disable cookies in your browser settings; however, some
              features may not function properly without them.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="security" ref={(el) => (sectionRefs.current["security"] = el)}>
            <Heading size="md" mb={3}>
              Data Security
            </Heading>
            <Text>
              We use industry-standard safeguards to protect your information
              against unauthorized access or misuse. Although no system can be
              guaranteed 100% secure, we routinely update and monitor our
              security practices. You may contact us if you have questions about
              how your data is protected.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="compliance" ref={(el) => (sectionRefs.current["compliance"] = el)}>
            <Heading size="md" mb={3}>
              Safety, Compliance & Legal Requirements
            </Heading>
            <Text mb={3}>
              We may share certain information when legally required or when
              necessary to:
            </Text>
            <Text>
              • Respond to legal or regulatory requests  
              • Assist law enforcement  
              • Prevent fraud, abuse, or misuse of the platform  
              • Enforce our Terms of Service  
              • Protect the rights, safety, and wellbeing of our community  
            </Text>
            <Text mt={4}>
              When permitted, we will notify Members if their information must be
              disclosed.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="logfiles" ref={(el) => (sectionRefs.current["logfiles"] = el)}>
            <Heading size="md" mb={3}>
              Log Files & Device Data
            </Heading>
            <Text>
              Like most online platforms, we automatically record technical data
              such as IP addresses, browser type, device information, access
              timestamps, and actions taken within the platform. This information
              helps us improve performance, troubleshoot issues, and maintain a
              safer environment.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="serviceemails" ref={(el) => (sectionRefs.current["serviceemails"] = el)}>
            <Heading size="md" mb={3}>
              Mandatory Service Communications
            </Heading>
            <Text>
              Some notifications — including security alerts, account-related
              messages, or significant platform updates — are necessary for
              operation of the service and cannot be opted out of.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="marketing" ref={(el) => (sectionRefs.current["marketing"] = el)}>
            <Heading size="md" mb={3}>
              Marketing Communications
            </Heading>
            <Text>
              You may unsubscribe from marketing emails at any time by using the
              “unsubscribe” link included in each promotional message.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="accountclosure" ref={(el) => (sectionRefs.current["accountclosure"] = el)}>
            <Heading size="md" mb={3}>
              Closing Your Account
            </Heading>
            <Text>
              You may close your HopIn account at any time from your account
              settings. After closure, your account enters a brief retention
              period, allowing you to restore it before permanent deletion.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="datadeletion" ref={(el) => (sectionRefs.current["datadeletion"] = el)}>
            <Heading size="md" mb={3}>
              Requesting Data Deletion
            </Heading>
            <Text>
              You may request full deletion of your data. Once completed, this
              action is permanent and cannot be reversed.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="identity" ref={(el) => (sectionRefs.current["identity"] = el)}>
            <Heading size="md" mb={3}>
              Identity Verification
            </Heading>
            <Text>
              For security and safety, HopIn may require identity verification.
              Our verification provider may capture images of your government ID
              or biometric data solely for verification purposes. Biometric data
              is securely processed and automatically deleted after a limited
              retention period.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="android" ref={(el) => (sectionRefs.current["android"] = el)}>
            <Heading size="md" mb={3}>
              Android App Permissions & Data
            </Heading>
            <Text>
              If you use the HopIn Android app, certain device-specific data —
              such as phone number or app activity — may be collected according to
              Google Play policies. Your phone number is only shared with Members
              you are scheduled to travel with. Activity data is never shared with
              third parties.
            </Text>
          </Box>

          <Divider borderColor="gray.700" />

          <Box id="updates" ref={(el) => (sectionRefs.current["updates"] = el)}>
            <Heading size="md" mb={3}>
              Updates to This Privacy Policy
            </Heading>
            <Text>
              We may update this Privacy Policy to reflect improvements, legal
              requirements, or new features. When changes occur, we will notify
              you and update the effective date above. Continued use of the
              platform signifies acceptance of the updated terms.
            </Text>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
