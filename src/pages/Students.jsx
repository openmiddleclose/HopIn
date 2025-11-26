import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  VStack,
  Flex,
  Button,
  Divider,
  Card,
  CardBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const [search, setSearch] = useState("");
  const [requestSchool, setRequestSchool] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // Complete list of universities and colleges
  const schools = [
    { name: "Acadia University", members: 10, verified: true },
    { name: "Alberta University of the Arts", members: 0, verified: false },
    { name: "Algoma University", members: 1364, verified: false },
    { name: "Algonquin College", members: 1133, verified: false },
    { name: "Assiniboine College", members: 0, verified: false },
    { name: "Banff Centre", members: 4, verified: false },
    { name: "BCIT", members: 151, verified: false },
    { name: "Bishop's University", members: 0, verified: false },
    { name: "Bow Valley College", members: 93, verified: false },
    { name: "Brandon University", members: 3, verified: false },
    { name: "Brock University", members: 391, verified: true },
    { name: "Cambrian College", members: 273, verified: false },
    { name: "Canadore College", members: 93, verified: false },
    { name: "Cape Breton University", members: 86, verified: false },
    { name: "Capilano University", members: 116, verified: false },
    { name: "Carleton University", members: 1541, verified: true },
    { name: "Centennial College", members: 794, verified: false },
    { name: "Concordia University", members: 1367, verified: true },
    { name: "Conestoga College", members: 4524, verified: false },
    { name: "Dalhousie University", members: 352, verified: true },
    { name: "Dawson College", members: 41, verified: false },
    { name: "Douglas College", members: 61, verified: false },
    { name: "Durham College", members: 431, verified: false },
    { name: "Emily Carr University", members: 20, verified: false },
    { name: "Fanshawe College", members: 2375, verified: false },
    { name: "Fleming College", members: 46, verified: false },
    { name: "George Brown College", members: 485, verified: false },
    { name: "Georgian College", members: 816, verified: false },
    { name: "HEC Montréal", members: 257, verified: false },
    { name: "Humber College", members: 289, verified: false },
    { name: "Kwantlen Polytechnic University", members: 259, verified: false },
    { name: "Lakehead University", members: 228, verified: false },
    { name: "Lambton College", members: 1081, verified: false },
    { name: "Langara College", members: 77, verified: false },
    { name: "Laurentian University", members: 483, verified: false },
    { name: "Loyalist College", members: 358, verified: false },
    { name: "MacEwan University", members: 134, verified: false },
    { name: "McGill University", members: 1938, verified: true },
    { name: "McMaster University", members: 821, verified: true },
    { name: "Memorial University", members: 233, verified: false },
    { name: "Mohawk College", members: 1164, verified: false },
    { name: "Mount Allison University", members: 6, verified: false },
    { name: "Mount Royal University", members: 211, verified: false },
    { name: "Niagara College", members: 26, verified: false },
    { name: "Nipissing University", members: 17, verified: false },
    { name: "Northern Alberta Institute of Technology", members: 90, verified: false },
    { name: "OCAD University", members: 12, verified: false },
    { name: "Okanagan College", members: 141, verified: false },
    { name: "Ontario Tech University", members: 251, verified: false },
    { name: "Queen's University", members: 5113, verified: true },
    { name: "Red River College", members: 12, verified: false },
    { name: "Royal Military College", members: 59, verified: false },
    { name: "Ryerson University / Toronto Metropolitan University", members: 767, verified: false },
    { name: "Saint Mary's University", members: 48, verified: false },
    { name: "Seneca College", members: 1008, verified: false },
    { name: "Sheridan College", members: 642, verified: false },
    { name: "Simon Fraser University", members: 623, verified: false },
    { name: "Southern Alberta Institute of Technology", members: 250, verified: false },
    { name: "St. Clair College", members: 554, verified: false },
    { name: "St. Francis Xavier University", members: 18, verified: false },
    { name: "St Lawrence College", members: 875, verified: false },
    { name: "University of Alberta", members: 1660, verified: true },
    { name: "University of British Columbia", members: 1025, verified: true },
    { name: "University of Calgary", members: 478, verified: true },
    { name: "University of Guelph", members: 483, verified: true },
    { name: "University of Manitoba", members: 136, verified: true },
    { name: "University of New Brunswick", members: 258, verified: true },
    { name: "University of Ottawa", members: 3628, verified: true },
    { name: "University of Toronto", members: 1336, verified: true },
    { name: "University of Victoria", members: 233, verified: true },
    { name: "University of Waterloo", members: 2218, verified: true },
    { name: "University of Windsor", members: 1117, verified: true },
    { name: "Western University", members: 3964, verified: true },
    { name: "Wilfrid Laurier University", members: 757, verified: true },
    { name: "York University", members: 849, verified: true },
  ];

  const filteredSchools = schools.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRequestSubmit = () => {
    console.log("Requested School:", requestSchool);
    setRequestSchool("");
    onClose();
  };

  return (
    <Box p={6} maxWidth="800px" mx="auto" pt="140px" fontFamily="Inter, sans-serif">
      <Heading size="2xl" mb={2} textAlign="center">
        Students
      </Heading>
      <Text fontSize="lg" mb={4} textAlign="center" color="gray.600">
        Carpooling for students is easy, safe, and reliable.
      </Text>
      <Text fontSize="md" fontWeight="bold" color="green.500" mb={8} textAlign="center">
        Receive a $5 discount when you verify your student email
      </Text>

      <Heading size="md" mb={2}>Join a school</Heading>
      <Text color="gray.600" mb={4}>
        Click your school below to join by verifying your student email.
      </Text>

      <Input
        placeholder="Find your school"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={6}
        bg="white"
      />

      <VStack spacing={4} align="stretch">
        {filteredSchools.map((s, i) => (
          <Card
            key={i}
            shadow="sm"
            borderRadius="lg"
            _hover={{ shadow: "md", cursor: "pointer" }}
            onClick={() => navigate(`/students/${encodeURIComponent(s.name)}`)}
          >
            <CardBody>
              <Flex justify="space-between" align="center">
                <Flex align="center">
                  <Text fontWeight="medium">{s.name}</Text>
                  {s.verified && (
                    <CheckCircle2 size={20} color="#38A169" style={{ marginLeft: 8 }} />
                  )}
                </Flex>
                <Text fontWeight="bold" color="teal.500">{s.members} members</Text>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </VStack>

      <Divider my={8} />

      <Box textAlign="center">
        <Text mb={4} fontSize="lg" fontWeight="semibold">
          Don’t see your school in the list?
        </Text>
        <Button colorScheme="teal" size="md" onClick={onOpen}>
          Request to add your school
        </Button>
      </Box>

      {/* Request Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request School</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>School Name</FormLabel>
              <ChakraInput
                placeholder="Enter your school name"
                value={requestSchool}
                onChange={(e) => setRequestSchool(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleRequestSubmit}>
              Submit Request
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
