const { isDBConnected } = require("../config/db");

exports.getHealth = (req, res) => {
  const db = isDBConnected();
  res.status(db ? 200 : 503).json({ status: db ? "ok" : "degraded", database: db ? "connected" : "disconnected", uptime: Math.round(process.uptime()) });
};
