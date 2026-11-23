const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("./config/db");
const { seedIfEmpty } = require("./utils/portfolioStore");
const { permissionsPolicy } = require("./middleware/securityHeaders");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const apiRoutes = require("./routes/api");

const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;
const clientDist = path.resolve(__dirname, "../client/dist");

const app = express();
app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: false,
    hsts: isProduction ? { maxAge: 63072000 } : false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }),
);
app.use(permissionsPolicy);
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));

app.use("/api", apiRoutes);
app.use("/api", notFound);

// In production Express also serves the built React app.
if (isProduction) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => res.sendFile(path.join(clientDist, "index.html")));
}

app.use(errorHandler);

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await connectDB(process.env.MONGODB_URI);
      console.log("MongoDB connected.");
      if (await seedIfEmpty()) console.log("Empty database detected: portfolio data seeded.");
    } catch (error) {
      console.warn(`MongoDB connection failed (${error.message}). Serving bundled portfolio data instead.`);
    }
  } else {
    console.warn("MONGODB_URI is not set. Serving bundled portfolio data instead.");
  }
  const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  server.on("error", (error) => {
    console.error(error.code === "EADDRINUSE" ? `Port ${PORT} is already in use. Change PORT in .env or stop the other process.` : error.message);
    process.exit(1);
  });
}

if (require.main === module) start();

module.exports = app;
