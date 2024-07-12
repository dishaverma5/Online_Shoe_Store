import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
})); // Enable CORS for specific origin
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = 3000;

// Endpoint to fetch all shoes
app.get("/shoes", async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const shoesCollection = db.collection("shoes");
    const shoes = await shoesCollection.find({}).toArray();
    res.json(shoes);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error fetching shoes.");
  }
});

// Endpoint to search for shoes by criteria
app.post("/shoes/search", async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const shoesCollection = db.collection("shoes");
    const { category, name } = req.body;
    let query = {};
    if (category) query.category = category;
    if (name) query.name = { $regex: name, $options: "i" };
    const shoes = await shoesCollection.find(query).toArray();
    res.json(shoes);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error searching for shoes.");
  }
});

// Endpoint to create an order
app.post("/orders", async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const ordersCollection = db.collection("orders");
    const { cart, total, paymentInfo, shippingInfo } = req.body;
    const newOrder = {
      cart,
      total,
      paymentInfo,
      shippingInfo,
      createdAt: new Date(),
    };
    const result = await ordersCollection.insertOne(newOrder);
    res.status(201).send(result.ops[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error creating order.");
  }
});

// Endpoint to fetch all orders (for admin purposes)
app.get("/orders", async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const ordersCollection = db.collection("orders");
    const orders = await ordersCollection.find({}).toArray();
    res.json(orders);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error fetching orders.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
