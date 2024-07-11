//console.log("Hello, world!");
//console.log("Developing in the dev branch.");
//console.log("Another change in the dev branch.");
//console.log("This change is in the main branch.");
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { promises as fs } from "fs";
import pg from "pg";
import Shoe from "../react/src/components/Shoe";

dotenv.config();
const { Pool } = pg;
// PostgreSQL pool configuration
const pool = new Pool({
  user: "postgres",
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: "postgres",
  port: 5432,
});

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get("/socks", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const socks = await collection.find({}).toArray();
    res.json(socks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("No shoes for you! ☹");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/socks", async (req, res) => {
  try {
     
    console.log(
      "....."
    );
    // Simulate creating a user
    const { username, email } = req.body;
    if (!username || !email) {
      // Bad request if username or email is missing
      return res
        .status(400)
        .send({ error: "Username and email are required." });
    }

    // Respond with the created user information and a 201 Created status
    res.status(201).send({
      status: "success",
      location: "http://localhost:3000/users/1234", // This URL should point to the newly created user
      message: "User created successfully.",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("No shoes for you! ☹");
  }
});

app.delete("/shoe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting sock with ID:", id);
    res.status(200).send("Shoe deleted successfully");
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send(" Error deleting shoe");
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    console.log("Updating email for user with ID:", id);
    res.status(200).send({
      status: "success",
      data: email, // This URL should point to the newly created user
      message: "User updated successfully.",
    });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Error deleting shoe");
  }
});

app.post("/shoe/search", async (req, res) => {
  try {
    const { color } = req.body;

    // MongoDB query to find socks based on color
    const socks = await Shoe.find({ color: color }).exec();

    res.json(socks); // Respond with the found socks (can be an empty array if none found)
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send(" Error searching for shoes");
  }
});

// Route handler to delete a sock by ID
app.delete("/shoes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // MongoDB query to delete sock by ID
    const deletedSock = await Sock.findByIdAndDelete(id).exec();

    if (!deletedSock) {
      return res.status(404).send("Shoe not found");
    }

    res.status(200).send("Sock deleted successfully");
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error deleting sock");
  }
});

// Endpoint to add a new sock
app.post("/socks", async (req, res) => {
  try {
    const { brand, color, size, material, condition, additionalFeatures } =
      req.body;

    // Validate required fields
    if (!brand || !color || !size || !material || !condition) {
      return res
        .status(400)
        .json({
          error:
            "Please provide all required fields: brand, color, size, material, condition",
        });
    }

    const newSock = {
      brand,
      color,
      size,
      material,
      sockDetails: {
        condition,
        additionalFeatures,
      },
    };

    const result = await collection.insertOne(newSock);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something's not right... Error adding shoe");
  }
});

app.post("/socks/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT uid FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ uid: result.rows[0].uid });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
