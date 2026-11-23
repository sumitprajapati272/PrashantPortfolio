const Portfolio = require("../models/Portfolio");
const seedData = require("../data/portfolio.seed");
const { isDBConnected } = require("../config/db");

const SECTIONS = ["profile", "previousEducation", "values", "skillGroups", "projects", "journey", "certificates", "futureGoals"];

const pickSections = (source) => Object.fromEntries(SECTIONS.map((key) => [key, source[key]]));

/** Insert or replace the portfolio document with the seed data. */
async function seedPortfolio() {
  await Portfolio.findOneAndUpdate({ key: "main" }, { key: "main", ...seedData }, { upsert: true, new: true, setDefaultsOnInsert: true });
}

/** Create the portfolio document the first time the server starts against an empty database. */
async function seedIfEmpty() {
  if ((await Portfolio.countDocuments({ key: "main" })) === 0) {
    await seedPortfolio();
    return true;
  }
  return false;
}

/** Read the portfolio from MongoDB; fall back to the bundled seed data if the database is unreachable. */
async function loadPortfolio() {
  if (isDBConnected()) {
    const doc = await Portfolio.findOne({ key: "main" }).lean();
    if (doc) return { source: "mongodb", data: pickSections(doc) };
  }
  return { source: "seed-fallback", data: pickSections(seedData) };
}

module.exports = { seedPortfolio, seedIfEmpty, loadPortfolio };
