// src/pages/TermsOfService.jsx
import React from "react";
import { Box, Flex } from "@chakra-ui/react";

export default function TermsOfService() {
  const sections = [
    "Introduction",
    "Key Terms",
    "Updates to These Terms",
    "Member Responsibilities",
    "Acceptable Conduct",
    "Use of the Platform",
    "Bookings & Payments",
    "Cancellations & Attendance",
    "Driver Requirements",
    "Referral Program",
    "Community Expectations",
    "Privacy",
    "Limitation of Liability",
    "Account Suspension or Termination",
  ];

  return (
    <Box
      bg="gray.900"
      minH="100vh"
      px={{ base: 4, md: 10 }}
      // ⬇⬇⬇ PUSH DOWN BELOW NAVBAR
      py={{ base: 32, md: 40 }}
    >
      <Flex maxW="7xl" mx="auto" gap={10}>
        
        {/* ========== LEFT SIDEBAR (TOC) — DESKTOP ONLY ========== */}
        <Box
          display={{ base: "none", lg: "block" }}
          position="sticky"
          top="140px"
          minW="260px"
          h="fit-content"
          bg="gray.800"
          border="1px solid"
          borderColor="gray.700"
          borderRadius="xl"
          p={5}
          shadow="xl"
        >
          <h3 className="text-xl font-semibold text-white mb-3">On this page</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            {sections.map((s, i) => (
              <li key={i}>
                <a
                  href={`#${s.replace(/\s+/g, "-")}`}
                  className="hover:text-white transition duration-200"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </Box>

        {/* ================== MAIN CONTENT ================== */}
        <Box
          flex="1"
          bg="gray.800"
          borderRadius="2xl"
          shadow="2xl"
          p={{ base: 6, md: 10 }}
          border="1px solid"
          borderColor="gray.700"
          color="gray.100"
        >
          {/* Title */}
          <Box textAlign="center" mb={6}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Terms of Service
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Last updated: November 24, 2025
            </p>
          </Box>

          {/* INTRO */}
          <Section id="Introduction" title="Introduction">
            HopIn is a platform that connects people traveling in the same direction
            so they can share available seats and reduce travel costs. These Terms
            describe how our service works, the responsibilities of all members, and
            the rules that help maintain a safe and respectful community.
          </Section>

          {/* KEY TERMS */}
          <Section
            id="Key-Terms"
            title="Key Terms"
            listItems={[
              { term: "Member", description: "Anyone with an active HopIn account." },
              { term: "Driver", description: "A Member offering a ride to other travelers." },
              { term: "Passenger", description: "A Member booking a seat in a Driver’s vehicle." },
              { term: "Trip", description: "A planned route and schedule shared by a Driver." },
              { term: "Booking", description: "A confirmed seat reserved by a Passenger." },
              { term: "Contribution", description: "A shared-cost payment toward trip expenses." },
              { term: "Service Fee", description: "A small platform fee added during checkout." },
              { term: "Payout", description: "Funds transferred to a Driver after a trip is completed." },
            ]}
          />

          {/* UPDATES */}
          <Section id="Updates-to-These-Terms" title="Updates to These Terms">
            We may revise these Terms from time to time to reflect improvements,
            legal changes, or new platform features. When updates are made, we will
            revise the “Last updated” date. Continuing to use HopIn means you accept
            the updated Terms.
          </Section>

          {/* RESPONSIBILITIES */}
          <Section
            id="Member-Responsibilities"
            title="Member Responsibilities"
            listItems={[
              "Provide accurate information when creating or updating your profile.",
              "Communicate clearly and respectfully with Drivers and Passengers.",
              "Keep trip details honest, complete, and up to date.",
              "Report issues, unsafe behavior, or concerns to HopIn’s support team.",
            ]}
          />

          {/* CONDUCT */}
          <Section
            id="Acceptable-Conduct"
            title="Acceptable Conduct"
            listItems={[
              "Follow local laws, driving regulations, and safety requirements.",
              "Do not use HopIn for commercial transportation or profit-seeking activity.",
              "Harassment, discrimination, or abusive behavior is strictly prohibited.",
              "Members must be at least 18 years old.",
            ]}
          />

          {/* USE OF PLATFORM */}
          <Section id="Use-of-the-Platform" title="Use of the Platform">
            HopIn supports cost-sharing between travelers. It is not a ride-hailing
            service and should not be used to operate a commercial transportation
            business. All payments must be processed through HopIn for transparency
            and member safety.
          </Section>

          {/* BOOKINGS & PAYMENTS */}
          <Section
            id="Bookings-&-Payments"
            title="Bookings & Payments"
            listItems={[
              "All payments are processed securely through Stripe.",
              "Cash payments or private side deals are not permitted.",
              "Payout times may vary depending on the driver's bank or region.",
              "Service fees may apply during bookings and payouts.",
            ]}
          />

          {/* CANCELLATIONS */}
          <Section
            id="Cancellations-&-Attendance"
            title="Cancellations & Attendance"
          >
            Respect for other members’ time is essential. Frequent cancellations,
            chronic lateness, or repeated no-shows may result in account limitations
            or suspension if they negatively affect the community.
          </Section>

          {/* DRIVER REQUIREMENTS */}
          <Section
            id="Driver-Requirements"
            title="Driver Requirements"
            listItems={[
              "Drivers must hold a valid driver's license.",
              "Drivers must maintain insurance suitable for ridesharing or carpooling.",
              "Drivers are responsible for operating their vehicle safely at all times.",
            ]}
          />

          {/* REFERRAL */}
          <Section id="Referral-Program" title="Referral Program">
            HopIn may offer referral rewards from time to time. Eligibility criteria,
            reward amounts, and rules may change or be discontinued without notice.
          </Section>

          {/* COMMUNITY */}
          <Section id="Community-Expectations" title="Community Expectations">
            HopIn aims to maintain a welcoming and safe environment for everyone.
            Aggressive behavior, unsafe driving, or actions that undermine trust may
            result in account restrictions or removal.
          </Section>

          {/* PRIVACY */}
          <Section id="Privacy" title="Privacy">
            By using HopIn, you agree to our Privacy Policy explaining how we collect
            and protect your information.
          </Section>

          {/* LIABILITY */}
          <Section id="Limitation-of-Liability" title="Limitation of Liability">
            HopIn provides a platform for coordinating shared travel. We do not
            control member actions or driving behavior. To the extent allowed by law,
            we limit our liability for issues arising from member interactions or
            third-party events.
          </Section>

          {/* TERMINATION */}
          <Section
            id="Account-Suspension-or-Termination"
            title="Account Suspension or Termination"
          >
            We may suspend or terminate an account if safety concerns arise, Terms
            are violated, or behavior negatively impacts the community.
          </Section>

          <Box textAlign="center" mt={12} color="gray.400" fontSize="sm">
            By using HopIn, you acknowledge that you have read and agree to these Terms of Service.
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

/* -------------------- REUSABLE SECTION COMPONENT -------------------- */
function Section({ id, title, children, listItems }) {
  return (
    <Box id={id} mb={10}>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
        {title}
      </h2>

      {listItems ? (
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          {listItems.map((item, idx) => {
            if (typeof item === "string") return <li key={idx}>{item}</li>;
            return (
              <li key={idx}>
                <strong className="text-white">{item.term}:</strong>{" "}
                {item.description}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-300 leading-relaxed">{children}</p>
      )}
    </Box>
  );
}
