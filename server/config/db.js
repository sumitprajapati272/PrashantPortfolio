const mongoose = require("mongoose");

async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  return mongoose.connection;
}

const isDBConnected = () => mongoose.connection.readyState === 1;

module.exports = { connectDB, isDBConnected };
