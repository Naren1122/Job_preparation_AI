import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./src/.env" });
}

const port = process.env.PORT || 5001;

// Start server only after DB connection is established
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
