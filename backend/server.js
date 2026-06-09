import dns from "dns";

// 🔥 FIX: DNS + IPv4 preference + reliable resolution
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

// Load env
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./src/.env" });
}

const port = process.env.PORT || 5001;

// Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    console.log("⚠️ Server will still start without DB...");
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();