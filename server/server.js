
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

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfoliofrontend-e4858.web.app",
  "https://portfoliofrontend-e4858.firebaseapp.com",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "20kb" }));

app.use("/api", apiRoutes);
app.use("/api", notFound);

// Serve React frontend in production
if (isProduction) {
  app.use(express.static(clientDist));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.use(errorHandler);

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await connectDB(process.env.MONGODB_URI);
      console.log("MongoDB connected.");

      if (await seedIfEmpty()) {
        console.log("Empty database detected: portfolio data seeded.");
      }
    } catch (error) {
      console.warn(
        `MongoDB connection failed (${error.message}). Serving bundled portfolio data instead.`,
      );
    }
  } else {
    console.warn(
      "MONGODB_URI is not set. Serving bundled portfolio data instead.",
    );
  }

  const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`),
  );

  server.on("error", (error) => {
    console.error(
      error.code === "EADDRINUSE"
        ? `Port ${PORT} is already in use. Change PORT in .env or stop the other process.`
        : error.message,
    );

    process.exit(1);
  });
}

if (require.main === module) start();

module.exports = app;
