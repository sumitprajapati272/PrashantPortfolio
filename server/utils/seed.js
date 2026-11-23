// Usage: npm run seed   (overwrites the portfolio document in MongoDB with data/portfolio.seed.js)
require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const { seedPortfolio } = require("./portfolioStore");

(async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set. Copy .env.example to .env and fill it in.");
    process.exit(1);
  }
  try {
    await connectDB(process.env.MONGODB_URI);
    await seedPortfolio();
    console.log("Portfolio data seeded into MongoDB.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
