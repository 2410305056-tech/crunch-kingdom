import express from "express";
import cors from "cors";
import { getFlavors, getFlavorById, getQuadPresets, getDispatchStatus } from "./controllers/productController.js";
import { createOrder } from "./controllers/orderController.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "HEALTHY",
    brand: "Crunch Kingdom Reserve",
    version: "2.0.0",
    decibelSpec: 76.4
  });
});

// Catalog routes
app.get("/api/flavors", getFlavors);
app.get("/api/flavors/:id", getFlavorById);
app.get("/api/crate/presets", getQuadPresets);
app.get("/api/dispatch/status", getDispatchStatus);

// Order route
app.post("/api/orders", createOrder);

app.listen(PORT, () => {
  console.log(`✦ Crunch Kingdom Reserve Engine online at http://localhost:${PORT}`);
  console.log(`✦ Calibrated endpoints ready: /api/flavors, /api/crate/presets, /api/orders`);
});

