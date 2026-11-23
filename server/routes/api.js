const express = require("express");
const rateLimit = require("express-rate-limit");
const { getPortfolio } = require("../controllers/portfolioController");
const { getHealth } = require("../controllers/healthController");
const { sendContactMessage } = require("../controllers/contactController");

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages sent. Please try again in a few minutes." },
});

router.get("/health", getHealth);
router.get("/portfolio", getPortfolio);
router.post("/contact", contactLimiter, sendContactMessage);

module.exports = router;
