// src/components/CityModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";

const canadianCities = [
  {
    city: "Toronto",
    landmarks: [
      "CN Tower",
      "Royal Ontario Museum",
      "Ripley’s Aquarium",
      "Distillery District",
      "Art Gallery of Ontario",
      "Toronto Pearson International Airport (YYZ)",
      "Silver Dart Drive, Mississauga, ON, Canada",
      "Toronto Premium Outlets, Steeles Avenue, Halton Hills, ON, Canada",
      "Toronto Islands, St Lawrence-East Bayfront-The Islands, ON, Canada",
      "Toronto Zoo, Meadowvale Road, Scarborough, ON, Canada"
    ]
  },
  { city: "Montreal", landmarks: ["Old Montreal", "Notre-Dame Basilica", "Mount Royal", "Biodome", "Saint Joseph’s Oratory"] },
  { city: "Vancouver", landmarks: ["Stanley Park", "Granville Island", "Capilano Suspension Bridge", "Gastown", "Vancouver Aquarium"] },
  { city: "Calgary", landmarks: ["Calgary Tower", "Heritage Park", "Calgary Zoo", "Stephen Avenue", "Olympic Plaza"] },
  { city: "Edmonton", landmarks: ["West Edmonton Mall", "Fort Edmonton Park", "Royal Alberta Museum", "Telus World of Science", "Edmonton Valley Zoo"] },
  { city: "Ottawa", landmarks: ["Parliament Hill", "Rideau Canal", "National Gallery of Canada", "ByWard Market", "Canadian War Museum"] },
  { city: "Quebec City", landmarks: ["Château Frontenac", "Old Quebec", "Montmorency Falls", "Plains of Abraham", "Petit Champlain"] },
  { city: "Winnipeg", landmarks: ["The Forks", "Assiniboine Park", "Canadian Museum for Human Rights", "Esplanade Riel"] },
  { city: "Halifax", landmarks: ["Citadel Hill", "Peggy’s Cove", "Halifax Waterfront", "Maritime Museum of the Atlantic"] },
  { city: "Victoria", landmarks: ["Butchart Gardens", "Royal BC Museum", "BC Legislature Buildings", "Inner Harbour"] },
  { city: "Banff", landmarks: ["Banff National Park", "Lake Louise", "Sulphur Mountain", "Peyto Lake"] },
  { city: "Whistler", landmarks: ["Whistler Blackcomb", "Peak‑2‑Peak Gondola", "Lost Lake", "Whistler Village"] },
  { city: "Jasper", landmarks: ["Jasper National Park", "Columbia Icefield", "Maligne Lake"] },
  { city: "Saskatoon", landmarks: ["Wanuskewin Heritage Park", "Meewasin Valley Trail"] },
  { city: "Regina", landmarks: ["Royal Saskatchewan Museum", "Wascana Centre"] },
  { city: "St. John’s", landmarks: ["Signal Hill", "Cape Spear", "St. John’s Harbour"] },
  { city: "Niagara Falls", landmarks: ["Niagara Falls", "Skylon Tower", "Fallsview Casino"] },
  { city: "Thunder Bay", landmarks: ["Fort William Historical Park", "Sleeping Giant Lookout", "Kakabeka Falls"] },
  { city: "Kelowna", landmarks: ["Okanagan Lake", "Myra Canyon", "Knox Mountain Park"] },
  { city: "Victoria (PEI)", landmarks: ["Confederation Bridge", "Victoria-by-the-Sea", "Green Gables"] },
  { city: "Churchill", landmarks: ["Churchill Northern Studies Centre", "Churchill River", "Polar Bear Tours"] },
  { city: "Yellowknife", landmarks: ["Great Slave Lake", "Aurora Borealis Viewing", "Old Town Yellowknife"] },
  { city: "Whitehorse", landmarks: ["Miles Canyon", "SS Klondike", "Yukon Wildlife Preserve"] },
  { city: "Sault Ste. Marie", landmarks: ["Agawa Canyon", "Canadian Bushplane Heritage Centre"] },
  { city: "Charlottetown", landmarks: ["Province House", "Peake’s Wharf", "Victoria Row"] },
  { city: "Fredericton", landmarks: ["Beaverbrook Art Gallery", "Old Government House", "Kings Landing"] },
  { city: "Moncton", landmarks: ["Magnetic Hill", "Hopewell Rocks", "Tide-Flowing Bridge"] },
  { city: "Kingston", landmarks: ["Fort Henry", "Kingston Waterfront", "The Rideau Canal Locks"] },
  { city: "London, Ontario", landmarks: ["Victoria Park", "Budweiser Gardens", "Fanshawe Pioneer Village"] },
  { city: "Gatineau", landmarks: ["Parliament Hill (across river)", "Canadian Museum of History", "Gatineau Park"] },
  { city: "Barrie", landmarks: ["Kempenfelt Bay", "Spirit Catcher Sculpture", "Sunnidale Park"] },
  { city: "Windsor", landmarks: ["Point Pelee National Park", "Windsor Waterfront", "Caesars Windsor"] },
  { city: "Hamilton", landmarks: ["Royal Botanical Gardens", "Dundurn Castle", "Niagara Escarpment (Waterfalls)"] },
  { city: "Lethbridge", landmarks: ["High Level Bridge", "Nikka Yuko Japanese Garden", "Galt Museum"] },
  { city: "Prince George", landmarks: ["Northern Lights Estate Winery", "Prince George Railway & Forestry Museum"] },
  { city: "Kamloops", landmarks: ["Kenna Cartwright Nature Park", "Rivers Trail", "Secwepemc Museum & Heritage Park"] },
  { city: "Red Deer", landmarks: ["Heritage Ranch", "Bower Ponds", "Mickelson National Golf Club"] },
  { city: "Saguenay", landmarks: ["Saguenay Fjord", "Parc National du Fjord-du-Saguenay"] },
  { city: "Trois‑Rivières", landmarks: ["Old Prison of Trois‑Rivières", "Borealis Museum", "Trois‑Rivières Waterfront"] }
];

export default function CityModal({ isOpen, onClose, onSelect }) {
  const [search, setSearch] = useState("");

  const filteredCities = canadianCities.filter(
    (c) =>
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.landmarks.some((l) => l.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCustomSelect = () => {
    if (search.trim() !== "") {
      onSelect(search.trim());
      onClose();
      setSearch("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCustomSelect();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select City or Landmark</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Search city or landmark or enter custom..."
            mb={4}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {search.trim() && (
            <Button
              size="sm"
              mb={4}
              colorScheme="blue"
              onClick={handleCustomSelect}
            >
              Use "{search.trim()}"
            </Button>
          )}
          <VStack spacing={3} align="stretch">
            {filteredCities.map((c, idx) => (
              <VStack key={idx} align="stretch" borderBottom="1px solid #eee" pb={2}>
                <Text fontWeight="bold">{c.city}</Text>
                {c.landmarks.map((l, li) => (
                  <Button
                    key={li}
                    size="sm"
                    variant="ghost"
                    justifyContent="flex-start"
                    onClick={() => {
                      onSelect(`${c.city} - ${l}`);
                      onClose();
                    }}
                  >
                    {l}
                  </Button>
                ))}
              </VStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
