import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ⚠️ In production, replace "*" with your frontend domain
app.use(cors({ origin: "*" })); 
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 5000;
const ID_ANALYZER_API_KEY = process.env.ID_ANALYZER_API_KEY;

// Endpoint to verify driver license
app.post("/api/verify-license", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: "Image URL required" });

    const response = await axios.post(
      "https://api.idanalyzer.com/v2/driverlicense",
      { document: imageUrl, country: "CA" }, // country code for Canada
      {
        headers: {
          Authorization: `Bearer ${ID_ANALYZER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Only return essential info
    const { valid, first_name, last_name, dob } = response.data;
    return res.json({ valid, first_name, last_name, dob });
  } catch (err) {
    console.error("ID Analyzer error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Driver license verification failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
