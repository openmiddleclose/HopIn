// src/pages/CreateTrip.jsx
import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Heading,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
  Checkbox,
  RadioGroup,
  Radio,
  Textarea,
  Text,
  useToast,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  Tag,
  TagCloseButton,
  TagLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Link,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { supabase } from "../hooks/useSupabase.js";
import CityModal from "../components/CityModal.jsx";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// Stops modal
function StopsModal({ isOpen, onClose, onSave, initialStops = [] }) {
  const [input, setInput] = useState("");
  const [stops, setStops] = useState(initialStops);

  const addStop = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setStops((s) => [...s, trimmed]);
    setInput("");
  };

  const removeStop = (index) => setStops((s) => s.filter((_, i) => i !== index));

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white" borderRadius="2xl" overflow="hidden">
        <ModalHeader>Add Stops</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack mb={4}>
            <Input
              placeholder="Enter stop"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addStop()}
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.600" }}
              _focus={{ bg: "gray.600", borderColor: "teal.400" }}
              transition="0.2s"
            />
            <IconButton
              aria-label="Add stop"
              icon={<AddIcon />}
              onClick={addStop}
              _hover={{ bg: "teal.600" }}
              colorScheme="teal"
            />
          </HStack>
          <HStack wrap="wrap" spacing={2}>
            {stops.length ? (
              stops.map((s, i) => (
                <Tag key={i} size="md" borderRadius="full" colorScheme="teal" variant="solid">
                  <TagLabel>{s}</TagLabel>
                  <TagCloseButton onClick={() => removeStop(i)} />
                </Tag>
              ))
            ) : (
              <Text color="gray.400">No stops added</Text>
            )}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} _hover={{ bg: "gray.700" }}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={() => onSave(stops)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function CreateTrip() {
  const toast = useToast();
  const navigate = useNavigate();

  // Driver verification check
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    const checkVerification = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_driver_verified")
        .eq("id", userId)
        .single();

      if (!profile?.is_driver_verified) {
        toast({
          title: "Driver verification required",
          description: "Please upload your license before creating a trip.",
          status: "warning",
        });
        navigate("/upload-license");
      } else {
        setVerified(true);
      }
    };
    checkVerification();
  }, [navigate, toast]);

  // Trip fields
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showCityModal, setShowCityModal] = useState(false);
  const [currentField, setCurrentField] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [returnTrip, setReturnTrip] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [recurringType, setRecurringType] = useState("none");
  const [recurringDays, setRecurringDays] = useState([]);
  const [recurringEveryX, setRecurringEveryX] = useState(7);

  const [seats, setSeats] = useState(3);
  const [price, setPrice] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [calculatingPrice, setCalculatingPrice] = useState(false);

  const [luggage, setLuggage] = useState("none");
  const [backRowMax, setBackRowMax] = useState("2");
  const [winterTires, setWinterTires] = useState(false);
  const [bikes, setBikes] = useState(false);
  const [skis, setSkis] = useState(false);
  const [pets, setPets] = useState(false);

  const [description, setDescription] = useState("");
  const [agree, setAgree] = useState(false);

  const [stopsModalOpen, setStopsModalOpen] = useState(false);
  const [stops, setStops] = useState([]);

  const [loading, setLoading] = useState(false);

  // Open City Modal
  const openCityModal = (field) => {
    setCurrentField(field);
    setShowCityModal(true);
  };

  // City select callback
  const handleSelectCity = (value) => {
    if (currentField === "origin") setOrigin(value);
    else setDestination(value);
    setShowCityModal(false);
  };

  // Weekday toggling
  const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const toggleWeekDay = (day) => {
    setRecurringDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const mapPreviewUrl = useMemo(() => {
    if (!origin || !destination) return null;
    const originQ = encodeURIComponent(origin);
    const destQ = encodeURIComponent(destination);
    const waypoints = stops.length ? `&waypoints=${encodeURIComponent(stops.join("|"))}` : "";
    return `https://www.google.com/maps/dir/?api=1&origin=${originQ}&destination=${destQ}${waypoints}&travelmode=driving`;
  }, [origin, destination, stops]);

  const suggestPrice = async () => {
    if (!origin || !destination) {
      toast({ title: "Origin & destination required", status: "warning" });
      return;
    }

    setCalculatingPrice(true);
    try {
      const suggested = 25 + Math.floor(Math.random() * 50);
      setSuggestedPrice(suggested);
      setPrice(suggested);
      toast({
        title: "Suggested price calculated",
        description: `$${suggested} CAD`,
        status: "success",
      });
    } catch (err) {
      toast({ title: "Error calculating price", status: "error", description: err.message });
    } finally {
      setCalculatingPrice(false);
    }
  };

  const handleCreateTrip = async () => {
    if (!agree) {
      toast({ title: "Agree to rules first", status: "warning" });
      return;
    }
    if (!origin || !destination || !date || !time) {
      toast({ title: "Fill origin, destination, date & time", status: "warning" });
      return;
    }

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const driver_id = userData?.user?.id;

      const date_time = `${date}T${time}:00Z`;
      const return_date_time = returnTrip ? `${returnDate}T${returnTime}:00Z` : null;

      const extras = { winterTires, bikes, skis, pets, luggage, backRowMax };

      const { error } = await supabase.from("trips").insert([
        {
          driver_id,
          origin,
          destination,
          date_time,
          return_date_time,
          seats_available: seats,
          price_per_seat: price,
          recurring_type: recurringType !== "none" ? recurringType : null,
          recurring_days: recurringDays.length ? recurringDays : null,
          recurring_every_x: recurringType === "every_x_days" ? recurringEveryX : null,
          stops: stops.length ? stops : null,
          extras,
          luggage,
          back_row: backRowMax,
          winter_tires: winterTires,
          bikes,
          skis,
          pets,
          description,
          map_preview_url: mapPreviewUrl,
          suggested_price: suggestedPrice,
        },
      ]);

      if (error) {
        toast({ title: "Error creating trip", status: "error", description: error.message });
      } else {
        toast({ title: "Trip created", status: "success" });
        // Reset all
        setOrigin("");
        setDestination("");
        setDate("");
        setTime("");
        setReturnTrip(false);
        setReturnDate("");
        setReturnTime("");
        setSeats(3);
        setPrice("");
        setSuggestedPrice(null);
        setStops([]);
        setRecurringType("none");
        setRecurringDays([]);
        setRecurringEveryX(7);
        setLuggage("none");
        setBackRowMax("2");
        setWinterTires(false);
        setBikes(false);
        setSkis(false);
        setPets(false);
        setDescription("");
        setAgree(false);
      }
    } catch (err) {
      toast({ title: "Unexpected error", status: "error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={{ base: 5, md: 10 }} pt={{ base: 36, md: 40 }} maxW="900px" mx="auto" color="white">
      <Heading mb={4} textAlign="center">Post a Trip</Heading>
      <Text mb={6} color="gray.400" textAlign="center">
        Cover your driving costs by filling your seats when you’re driving from A to B.
      </Text>

      <Stack spacing={6} bg="gray.900" p={6} borderRadius="xl" boxShadow="lg">
        {/* Origin & Destination */}
        <FormControl>
          <FormLabel>Origin</FormLabel>
          <Input
            placeholder="Enter origin"
            value={origin}
            onClick={() => openCityModal("origin")}
            readOnly
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
            _focus={{ bg: "gray.700", borderColor: "teal.400" }}
            transition="0.2s"
            cursor="pointer"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Destination</FormLabel>
          <Input
            placeholder="Enter destination"
            value={destination}
            onClick={() => openCityModal("destination")}
            readOnly
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
            _focus={{ bg: "gray.700", borderColor: "teal.400" }}
            transition="0.2s"
            cursor="pointer"
          />
        </FormControl>

        {/* Stops */}
        <FormControl>
          <FormLabel>Stops?</FormLabel>
          <HStack>
            <Button size="sm" onClick={() => setStopsModalOpen(true)} _hover={{ bg: "teal.600" }} transition="0.2s">
              Add stops
            </Button>
            <Text color="gray.400">{stops.length ? `${stops.length} stop(s)` : "No stops"}</Text>
          </HStack>
        </FormControl>

        {/* Schedule */}
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Departure Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} bg="gray.800" _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700", borderColor: "teal.400" }} transition="0.2s" />
          </FormControl>

          <FormControl>
            <FormLabel>Time</FormLabel>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} bg="gray.800" _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700", borderColor: "teal.400" }} transition="0.2s" />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb={0}>Return trip?</FormLabel>
            <Switch isChecked={returnTrip} onChange={(e) => setReturnTrip(e.target.checked)} colorScheme="teal" />
          </FormControl>
        </HStack>

        {returnTrip && (
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Return Date</FormLabel>
              <Input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} bg="gray.800" _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700", borderColor: "teal.400" }} transition="0.2s" />
            </FormControl>
            <FormControl>
              <FormLabel>Return Time</FormLabel>
              <Input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} bg="gray.800" _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700", borderColor: "teal.400" }} transition="0.2s" />
            </FormControl>
          </HStack>
        )}

        {/* Recurring */}
        <FormControl>
          <FormLabel>Recurring</FormLabel>
          <RadioGroup value={recurringType} onChange={setRecurringType}>
            <HStack>
              <Radio value="none" colorScheme="teal">One-time</Radio>
              <Radio value="weekly" colorScheme="teal">Weekly</Radio>
              <Radio value="every_x_days" colorScheme="teal">Every X days</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        {recurringType === "weekly" && (
          <HStack wrap="wrap" spacing={2}>
            {weekDays.map((d) => (
              <Button
                key={d}
                size="sm"
                variant={recurringDays.includes(d) ? "solid" : "outline"}
                colorScheme="teal"
                onClick={() => toggleWeekDay(d)}
                _hover={{ opacity: 0.8 }}
                transition="0.2s"
              >
                {d.toUpperCase()}
              </Button>
            ))}
          </HStack>
        )}

        {recurringType === "every_x_days" && (
          <FormControl maxW="200px">
            <FormLabel>Every how many days?</FormLabel>
            <NumberInput min={1} value={recurringEveryX} onChange={(v) => setRecurringEveryX(Number(v))}>
              <NumberInputField bg="gray.800" _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700", borderColor: "teal.400" }} transition="0.2s" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        )}

        {/* Seats & price */}
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Empty seats</FormLabel>
            <NumberInput min={1} max={7} value={seats} onChange={(v) => setSeats(Number(v))}>
              <NumberInputField bg="gray.800" _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700", borderColor: "teal.400" }} transition="0.2s" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>New drivers: up to 3 seats.</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Price per seat (CAD)</FormLabel>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} bg="gray.800" _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700", borderColor: "teal.400" }} transition="0.2s" />
            <HStack mt={2}>
              <Button size="sm" onClick={suggestPrice} isLoading={calculatingPrice} _hover={{ bg: "teal.600" }} transition="0.2s">
                Suggest price
              </Button>
              {suggestedPrice && <Text color="green.400">Suggested: ${suggestedPrice}</Text>}
            </HStack>
          </FormControl>
        </HStack>

        {/* Extras */}
        <FormControl>
          <FormLabel>Extras</FormLabel>
          <HStack wrap="wrap">
            <Checkbox isChecked={winterTires} onChange={(e) => setWinterTires(e.target.checked)}>Winter tires</Checkbox>
            <Checkbox isChecked={bikes} onChange={(e) => setBikes(e.target.checked)}>Bikes</Checkbox>
            <Checkbox isChecked={skis} onChange={(e) => setSkis(e.target.checked)}>Skis</Checkbox>
            <Checkbox isChecked={pets} onChange={(e) => setPets(e.target.checked)}>Pets</Checkbox>
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>Back row seating</FormLabel>
          <Select value={backRowMax} onChange={(e) => setBackRowMax(e.target.value)} maxW="200px" bg="gray.800" _hover={{ bg: "gray.700" }} _focus={{ bg: "gray.700", borderColor: "teal.400" }} transition="0.2s">
            <option value="2">Max 2</option>
            <option value="3">Max 3</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Exact pickup/drop-off points..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
            _focus={{ bg: "gray.700", borderColor: "teal.400" }}
            transition="0.2s"
          />
        </FormControl>

        <FormControl>
          <Checkbox isChecked={agree} onChange={(e) => setAgree(e.target.checked)}>
            I agree to{" "}
            <Link as={RouterLink} to="/driver-cancellation" color="teal.400" textDecor="underline">
              Driver Cancellation Policy
            </Link>
            ,{" "}
            <Link as={RouterLink} to="/terms-of-service" color="teal.400" textDecor="underline">
              Terms of Service
            </Link>
            , and{" "}
            <Link as={RouterLink} to="/privacy-policy" color="teal.400" textDecor="underline">
              Privacy Policy
            </Link>
            .
          </Checkbox>
        </FormControl>

        <HStack justify="space-between">
          <Button
            colorScheme="gray"
            variant="outline"
            onClick={() => window.open(mapPreviewUrl || "about:blank", "_blank")}
            isDisabled={!mapPreviewUrl}
            _hover={{ bg: "gray.700" }}
            transition="0.2s"
          >
            Preview route
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleCreateTrip}
            isLoading={loading}
            isDisabled={!verified} // disabled if driver is not verified yet
            _hover={{ bg: "teal.600" }}
            transition="0.2s"
          >
            Create Trip
          </Button>
        </HStack>
      </Stack>

      {/* Modals */}
      <StopsModal
        isOpen={stopsModalOpen}
        onClose={() => setStopsModalOpen(false)}
        initialStops={stops}
        onSave={(s) => {
          setStops(s);
          setStopsModalOpen(false);
        }}
      />

      <CityModal
        isOpen={showCityModal}
        onSelect={handleSelectCity}
        onClose={() => setShowCityModal(false)}
      />
    </Box>
  );
}
