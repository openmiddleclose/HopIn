// src/pages/DriverCancellationPolicy.jsx
import React from "react";
import { Box, Flex } from "@chakra-ui/react";

/* -------------------------------------------------------------------------- */
/*                             MAIN PAGE COMPONENT                            */
/* -------------------------------------------------------------------------- */

export default function DriverCancellationPolicy() {
  const sections = [
    "Overview",
    "How Drivers Can Cancel",
    "What Happens After a Cancellation",
    "Cancellation Limits",
    "Avoiding Cancellations",
  ];

  return (
    <Box
      bg="gray.900"
      minH="100vh"
      px={{ base: 4, md: 10 }}
      py={{ base: 32, md: 40 }} // fixes navbar overlap
      color="gray.100"
    >
      <Flex maxW="7xl" mx="auto" gap={10}>
        {/* --------------------- LEFT SIDEBAR --------------------- */}
        <Box
          display={{ base: "none", lg: "block" }}
          position="sticky"
          top="140px"
          minW="260px"
          bg="gray.800"
          border="1px solid"
          borderColor="gray.700"
          borderRadius="xl"
          p={6}
          h="fit-content"
          shadow="xl"
        >
          <h3 className="text-xl font-semibold text-white mb-4">On this page</h3>
          <ul className="space-y-3 text-gray.300 text-sm">
            {sections.map((s, i) => (
              <li key={i}>
                <a
                  href={`#${s.replace(/\s+/g, "-")}`}
                  className="hover:text-white transition"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </Box>

        {/* ---------------------------- MAIN CONTENT ---------------------------- */}
        <Box
          flex="1"
          bg="gray.800"
          borderRadius="2xl"
          shadow="2xl"
          border="1px solid"
          borderColor="gray.700"
          p={{ base: 6, md: 10 }}
        >
          {/* Title */}
          <Box textAlign="center" mb={8}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Driver Cancellation Policy
            </h1>
            <p className="text-gray.400 text-sm mt-2">
              Last updated: November 24, 2025
            </p>
          </Box>

          {/* -------- Overview -------- */}
          <Section id="Overview" title="Overview">
            Consistency and reliability are essential to keeping the HopIn community
            running smoothly. When a driver cancels after passengers have already booked,
            it can interrupt travel plans and reduce confidence in the platform. This
            policy explains how cancellations should be handled and the expectations that
            apply when a driver needs to withdraw from a confirmed trip.
          </Section>

          {/* -------- How Drivers Can Cancel -------- */}
          <Section id="How-Drivers-Can-Cancel" title="How Drivers Can Cancel">
            <p className="mb-4">
              If you need to withdraw from a scheduled trip, you can cancel through the
              HopIn dashboard by opening the trip page and selecting{" "}
              <strong>Cancel Trip</strong>. The system will guide you through the process.
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>A short explanation is required so passengers understand why.</li>
              <li>
                A message will be sent to all affected passengers to notify them of the
                change.
              </li>
            </ul>
          </Section>

          {/* -------- What Happens After a Cancellation -------- */}
          <Section
            id="What-Happens-After-a-Cancellation"
            title="What Happens After a Cancellation"
          >
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                Passengers will automatically receive a full refund for their booking,
                including fees.
              </li>
              <li>
                A cancellation will be recorded on your driver profile so riders can make
                informed decisions.
              </li>
              <li>
                In some cases, our team may review the reason for cancellation to confirm
                whether it counts toward your limit.
              </li>
            </ul>
          </Section>

          {/* -------- Cancellation Limits -------- */}
          <Section id="Cancellation-Limits" title="Cancellation Limits">
            <p className="mb-4">
              To maintain reliability, HopIn places limits on how often a driver can
              cancel confirmed trips:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Drivers may cancel one confirmed trip every 6 months without penalty.</li>
              <li>
                Further cancellations within the same period may result in temporary
                restrictions on posting or accepting passengers.
              </li>
              <li>
                Repeated or unjustified cancellations may lead to account review or
                suspension.
              </li>
            </ul>
          </Section>

          {/* -------- Avoiding Cancellations -------- */}
          <Section id="Avoiding-Cancellations" title="Avoiding Cancellations">
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Only publish trips that you are confident you can complete.</li>
              <li>Accept passengers whose plans align with your timing and route.</li>
              <li>
                Avoid posting tentative or uncertain trips, as these often result in
                cancellations.
              </li>
            </ul>

            <p className="text-gray-300 mt-3">
              For additional expectations across the platform, please review our{" "}
              <strong>Terms of Service</strong> and <strong>Community Guidelines</strong>.
            </p>
          </Section>

          {/* Footer */}
          <Box textAlign="center" mt={12} color="gray.400" fontSize="sm">
            By choosing to drive with HopIn, you agree to follow this policy.
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                           REUSABLE SECTION BLOCK                           */
/* -------------------------------------------------------------------------- */

function Section({ id, title, children }) {
  return (
    <Box id={id} mb={12}>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </Box>
  );
}
